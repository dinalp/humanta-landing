import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  employees?: string;
  notes?: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Write to Airtable
    let airtableId: string | undefined;
    let airtableError: string | undefined;
    try {
      const airtableResult = await writeToAirtable(body);
      airtableId = airtableResult?.id;
    } catch (err) {
      airtableError = err instanceof Error ? err.message : String(err);
      console.error("Airtable write failed:", airtableError);
    }

    // Send Slack notification
    let slackOk = false;
    try {
      await sendSlackNotification(body);
      slackOk = true;
    } catch (err) {
      console.error("Slack notification failed:", err);
    }

    return NextResponse.json({
      success: true,
      airtable: airtableId ? "ok" : airtableError || "skipped",
      slack: slackOk ? "ok" : "failed",
    });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

async function writeToAirtable(data: ContactPayload) {
  const pat = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  if (!pat || pat === "your_personal_access_token_here") {
    console.warn("Airtable PAT not configured, skipping write.");
    return null;
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName!)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pat}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Name: data.name,
              Company: data.company,
              Email: data.email,
              ...(data.phone ? { Phone: data.phone } : {}),
              ...(data.employees ? { Employees: data.employees } : {}),
              ...(data.notes ? { Notes: data.notes } : {}),
              Status: "New",
              Submitted: new Date().toISOString(),
            },
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    const errBody = await res.text();
    console.error("Airtable error:", res.status, errBody);
    throw new Error(`Airtable ${res.status}: ${errBody}`);
  }

  const result = await res.json();
  return result.records?.[0];
}

async function sendSlackNotification(data: ContactPayload) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("Slack webhook not configured, skipping notification.");
    return;
  }

  const lines = [
    `*New lead from humanta.co*`,
    `*Name:* ${data.name}`,
    `*Company:* ${data.company}`,
    `*Email:* ${data.email}`,
    `*Phone:* ${data.phone || "Not provided"}`,
    `*Employees:* ${data.employees || "Not provided"}`,
  ];

  if (data.notes) {
    lines.push(`*Notes:* ${data.notes}`);
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: lines.join("\n") }),
  });

  if (!res.ok) {
    console.error("Slack notification failed:", res.status);
  }
}
