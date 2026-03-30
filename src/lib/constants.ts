import type { FAQItem } from "@/types";

// Navigation
export const NAV_LINKS = [
  { label: "Sparks", href: "#sparks" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
] as const;

// Hero
export const HERO_CONTENT = {
  tagline: "The human connection layer for companies",
  headlineLine1: "The human connection",
  headlineLine2: "layer for companies",
  description:
    "Curated experiences for your team and a loved one, cleverly matched to who they are and managed end to end with no admin for you.",
  ctaLabel: "Talk to us",
  ctaHref: "/contact",
} as const;

// FAQ
export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What exactly is included in a Humanta Spark?",
    answer:
      "Each Spark is a curated experience for two. Your employee completes a quick vibe check, and we match them with a dining and experience combination from our venue network. We book and manage everything end-to-end. They just show up.",
  },
  {
    question: "How much work is required from HR?",
    answer:
      "Next to none. You set the rules: who receives Sparks and how often. We handle everything else. No reimbursements, no coordination, no chasing receipts.",
  },
  {
    question: "Do employees get a choice, or is it a surprise?",
    answer:
      "Both. We match them to a personalised recommendation based on their vibe preferences. They can lock it in or shuffle for a new option. It removes decision fatigue while making sure they get something they actually want.",
  },
  {
    question: "How do you control spend?",
    answer:
      "Spend is capped at the limit you set. You control the cadence: quarterly allocations, spot rewards, or whatever fits your programme. Sparks have a 12-month validity with full rollover, so there\u2019s no rush and no budget surprises.",
  },
  {
    question: "What happens if someone needs to reschedule?",
    answer:
      "We handle it. Our team manages rebooking end-to-end. We\u2019re bound by each venue\u2019s cancellation policy, but we handle that communication directly with the employee so HR stays out of the weeds.",
  },
  {
    question: "Who is Humanta for?",
    answer:
      "Companies with 20\u2013100 employees who compete on culture, not just compensation. If you\u2019re spending money on gift cards or discount portals and wondering whether anyone actually cares, Humanta is the upgrade.",
  },
];

// CTA Banner
export const CTA_CONTENT = {
  headline: "Ready to make recognition actually mean something?",
  description:
    "Your current team, former team, and future hires will all hear about it.",
  ctaLabel: "Talk to us",
  ctaHref: "/contact",
} as const;

// Footer
export const FOOTER_LINKS = [
  { label: "Sparks", href: "#sparks" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/humanta/",
    icon: "linkedin",
  },
] as const;

export const FOOTER_CONTENT = {
  tagline:
    "Your competitive edge will increasingly come from how human it feels to work for you.",
  email: "dinal@humanta.co",
  privacyHref: "/privacy",
} as const;

// Contact page
export const CONTACT_CONTENT = {
  headline: "Get in touch",
  description:
    "Tell us about your team and we\u2019ll be in touch within 24 hours.",
  email: "dinal@humanta.co",
  linkedin: "https://www.linkedin.com/company/humanta/",
} as const;
