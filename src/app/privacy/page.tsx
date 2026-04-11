import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Humanta Pty Ltd collects, uses, and protects your personal information when using our platform and services.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Humanta",
    description:
      "How Humanta Pty Ltd collects, uses, and protects your personal information when using our platform and services.",
    url: "https://humanta.co/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar forceDark />
      <main className="min-h-screen bg-white pt-24 md:pt-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <h1 className="font-heading font-bold text-[36px] md:text-[44px] lg:text-[48px] text-[#1A1A1A] leading-[1.1] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#9CA3AF] text-sm mb-12">Humanta Pty Ltd</p>

          <div className="space-y-8 text-[#6B7280] text-[15px] md:text-base leading-[1.7]">
            <div className="space-y-4">
              <p>
                Humanta Pty Ltd (&ldquo;Humanta&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;, &ldquo;our&rdquo;) provides its website,
                platform and related services (together, the
                &ldquo;Services&rdquo;).
              </p>
              <p>
                This Privacy Policy explains in general terms how Humanta may
                collect, use and otherwise handle information in connection with
                the Services.
              </p>
              <p>
                By accessing or using the Services, you acknowledge that you
                have read and understood this Privacy Policy. If you do not
                agree, you should discontinue use of the Services.
              </p>
              <p>
                If you have any questions, you may contact us at{" "}
                <a
                  href="mailto:hello@humanta.co"
                  className="text-[#F26B3A] hover:underline"
                >
                  hello@humanta.co
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-heading font-semibold text-[22px] md:text-[24px] text-[#1A1A1A] mb-4">
                Collection of Information
              </h2>
              <div className="space-y-4">
                <p>
                  Humanta may collect personal information and other information
                  in connection with the provision of the Services. This may
                  include information provided directly by users, information
                  provided by organisations using the Services, and information
                  collected automatically through use of the Website or
                  platform.
                </p>
                <p>
                  Such information may include names, contact details,
                  organisational information, booking or nomination details,
                  communications, technical data, usage data, device information
                  and other information reasonably required to operate or improve
                  the Services.
                </p>
                <p>
                  Humanta may also use cookies, log files and similar
                  technologies to collect and handle information about how the
                  Services are accessed and used.
                </p>
                <p>
                  Where payments are processed through third party providers,
                  Humanta may receive limited transactional information but does
                  not generally store full payment card details. Third party
                  providers handle payment information in accordance with their
                  own terms and policies.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-heading font-semibold text-[22px] md:text-[24px] text-[#1A1A1A] mb-4">
                Use of Information
              </h2>
              <div className="space-y-4">
                <p>
                  Humanta may collect, use and otherwise handle information for
                  any purpose connected with operating, supplying, maintaining,
                  supporting, improving or developing the Services.
                </p>
                <p>
                  This may include facilitating bookings, nominations, rewards or
                  related activities, communicating with users or organisations,
                  administering accounts, analysing usage, ensuring platform
                  functionality, enforcing terms, managing risk, and protecting
                  Humanta&apos;s rights and interests.
                </p>
                <p>
                  Humanta may also use information in aggregated, de-identified
                  or anonymised form for analytics, reporting, product
                  development, commercial purposes or any other lawful purpose.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-heading font-semibold text-[22px] md:text-[24px] text-[#1A1A1A] mb-4">
                Disclosure of Information
              </h2>
              <div className="space-y-4">
                <p>
                  Humanta may disclose information to service providers,
                  contractors, partners and related entities who assist in
                  providing or supporting the Services.
                </p>
                <p>
                  Information may also be disclosed to organisations that
                  administer access to the Services, to venues or providers
                  where required to facilitate a booking or reward, or where
                  Humanta considers disclosure reasonably necessary to operate
                  its business.
                </p>
                <p>
                  Humanta may disclose information where required or permitted by
                  law, or where Humanta considers it necessary to protect its
                  legal rights, property, users or the integrity of the
                  Services.
                </p>
                <p>
                  Humanta does not undertake to restrict disclosures beyond what
                  it considers reasonably appropriate for its business
                  operations.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-heading font-semibold text-[22px] md:text-[24px] text-[#1A1A1A] mb-4">
                Storage and Security
              </h2>
              <div className="space-y-4">
                <p>
                  Humanta may store and handle information in Australia or in
                  other locations where its systems or service providers operate.
                </p>
                <p>
                  Humanta takes steps it considers reasonable in the
                  circumstances to protect information from unauthorised access,
                  misuse or disclosure.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-heading font-semibold text-[22px] md:text-[24px] text-[#1A1A1A] mb-4">
                Access and Corrections
              </h2>
              <div className="space-y-4">
                <p>
                  Individuals may request access to or correction of personal
                  information held by Humanta. Humanta may require verification
                  of identity before responding and may decline or limit requests
                  at its discretion, including where permitted by law or where
                  the request is impractical, unreasonable or would impact the
                  privacy or rights of others.
                </p>
                <p>
                  Humanta may retain information for as long as it considers
                  reasonably necessary for business, operational or legal
                  purposes, including in backup systems.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-heading font-semibold text-[22px] md:text-[24px] text-[#1A1A1A] mb-4">
                Third Party Services
              </h2>
              <p>
                The Services may integrate with or link to third party
                platforms. Humanta is not responsible for the privacy practices
                of third parties, and this Privacy Policy does not apply to
                information handled by them.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-semibold text-[22px] md:text-[24px] text-[#1A1A1A] mb-4">
                Changes
              </h2>
              <p>
                Humanta may amend this Privacy Policy at any time by publishing
                an updated version on the Website. Continued use of the Services
                after any update constitutes acceptance of the revised Privacy
                Policy.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
