export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Humanta",
    url: "https://humanta.co",
    logo: "https://humanta.co/logos/humanta-mark-black.png",
    description:
      "Humanta is the human connection layer for companies. We turn recognition budgets into curated dining and experience moments, matched to personality, booked end-to-end.",
    email: "contact@humanta.co",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sydney",
      addressCountry: "AU",
    },
    sameAs: ["https://www.linkedin.com/company/humanta/"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FAQJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "We already do gift cards. Why would we switch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gift cards disappear into someone\u2019s grocery shop and nobody thinks about them again. A Spark is quality time with a loved one and a memory that stays with them. Their partner associates positive feelings with the company. Two people walk away as advocates. That\u2019s a fundamentally different return on the same budget.",
        },
      },
      {
        "@type": "Question",
        name: "How much admin does this create for our People team?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "None. Your People team sets the programme up once: budget, eligibility, cadence. From there, managers nominate in 2 minutes and employees claim in 5. We handle venue booking, dietary requirements, timing, and logistics. Your team gets feedback data back without doing any of the work.",
        },
      },
      {
        "@type": "Question",
        name: "What does it cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each Spark sits within the range most companies already spend on gift cards and ad-hoc bonuses. The difference is what you get back. We\u2019ll walk you through pricing on a call so we can tailor it to your team size and cadence.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a minimum commitment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer a 10-Spark pilot so you can see the impact before committing further. No lock-in contracts. Sparks are valid for 12 months with full rollover, so there\u2019s no pressure to use them immediately.",
        },
      },
      {
        "@type": "Question",
        name: "What data do we actually get back?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "After every Spark, we collect employee sentiment, an eNPS-style score, and (with permission) photos from the experience. You get a quarterly one-page narrative showing how recognition is landing across your team.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly can we get started?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most teams are live within a week. We handle onboarding, set up your programme parameters, and brief your managers. The first Sparks can go out the same week.",
        },
      },
      {
        "@type": "Question",
        name: "We\u2019re not all based in Sydney. Can we still use it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We\u2019re currently live across Sydney\u2019s best precincts. If the majority of your team is Sydney-based, we\u2019re a great fit. We\u2019re expanding into new cities. Talk to us about your situation and we\u2019ll let you know what\u2019s possible.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
