import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
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
    const airtableResult = await writeToAirtable(body);

    // Send Slack notification
    await sendSlackNotification(body);

    return NextResponse.json({ success: true, id: airtableResult?.id });
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
              Email: data.email,
              Phone: data.phone || "",
              Employees: data.employees || undefined,
              Notes: data.notes || "",
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
    throw new Error("Failed to write to Airtable");
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

  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "New lead from humanta.co",
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Name*\n${data.name}` },
        { type: "mrkdwn", text: `*Email*\n${data.email}` },
        {
          type: "mrkdwn",
          text: `*Phone*\n${data.phone || "Not provided"}`,
        },
        {
          type: "mrkdwn",
          text: `*Employees*\n${data.employees || "Not provided"}`,
        },
      ],
    },
  ];

  if (data.notes) {
    blocks.push({
      type: "section",
      fields: [{ type: "mrkdwn", text: `*Notes*\n${data.notes}` }],
    });
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blocks }),
  });

  if (!res.ok) {
    console.error("Slack notification failed:", res.status);
  }
}
