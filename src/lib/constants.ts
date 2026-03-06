import type { StoryPanel, Step, PricingPlan, FAQItem } from "@/types";

// Navigation
export const NAV_LINKS = [
  { label: "What we do", href: "#what-we-do" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Plans", href: "#plans" },
] as const;

// Hero
export const HERO_CONTENT = {
  tagline: "Make human connection company policy",
  headline: "Humanta",
  description:
    "Turn a slice of your recognition budget into a Spark \u2014 guaranteed, off\u2011screen experiences for employees and someone they love. Whether it\u2019s a signature dinner or a bucket-list activity, it\u2019s curated, booked, and managed end\u2011to\u2011end with zero lift from HR.",
  ctaLabel: "Start now",
  ctaHref: "#plans",
} as const;

// Story panels — rewritten copy focused on HR/People leaders
// Visual structure stays (text + image panels), copy is punchier and ICP-focused
export const STORY_PANELS: StoryPanel[] = [
  {
    title: "Your people are drifting apart",
    description:
      "As work becomes more automated, the human spark is the first thing to fade. Companies are doubling down on AI and efficiency, often leaving teams feeling like inputs in a system rather than people.",
    highlightPhrase: "the human spark",
    image: "/images/story/panel-1.png",
    imageAlt:
      "A person standing still while others rush past, representing workplace disconnection",
  },
  {
    title: "Real connection can\u2019t be Slacked",
    description:
      "As screens dominate and burnout rises, the relationships that actually sustain us are being squeezed to the margins. The moments that build trust and loyalty happen offline, over shared experiences.",
    highlightPhrase: "happens offline",
    image: "/images/story/panel-2.png",
    imageAlt:
      "Two people having an intimate conversation over a meal, representing genuine connection",
  },
  {
    title: "Humanta makes it effortless",
    description:
      "We curate the city\u2019s best dining and experiences for your team to share with someone they love. You set the parameters \u2014 we handle curation, booking, and everything in between.",
    highlightPhrase: "effortless",
    image: "/images/story/panel-3.png",
    imageAlt:
      "A couple laughing together at a premium dining experience, representing the Humanta outcome",
  },
];

// How It Works — 4 steps from humanta.co
export const HOW_IT_WORKS_STEPS: Step[] = [
  {
    number: 1,
    title: "Set the cadence",
    description:
      "Allocate Sparks (experience credits) quarterly, annually, or as manager-led rewards. You control the budget and eligibility; we handle everything else.",
  },
  {
    number: 2,
    title: "We curate the match",
    description:
      "You set the parameters; we curate the match. Our platform learns their preferences and hand-picks the ideal dining or activity experience.",
  },
  {
    number: 3,
    title: "They live the moment",
    description:
      "They get the perfect night out without the scrolling; you get the data on who\u2019s engaging.",
  },
  {
    number: 4,
    title: "Measure the impact",
    description:
      "Track engagement, redemption rates, and employee sentiment. See the ROI of investing in human connection.",
  },
];

// Pricing plans from humanta.co
export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Essential",
    subtitle: "Per redeemed spark",
    features: [
      "Personalisation Quiz to match your team member to their type of night",
      "Set Menu Dinner for 2 + Welcome drink + 2 Person Experience",
      "Analytics and Reporting",
    ],
    ctaLabel: "Get in touch",
    ctaHref: "#contact",
  },
  {
    name: "Pilot Package \u2014 Sydney",
    subtitle: "10 Humanta Sparks",
    features: [
      "All of the previous",
      "10 Spark package",
      "Flexible plan updates and modifications",
    ],
    ctaLabel: "Get in touch",
    ctaHref: "#contact",
  },
];

// FAQ from humanta.co
export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What exactly is included in a Humanta Spark?",
    answer:
      "Each Spark is a fully prepaid, premium experience for two. Employees use their credit to unlock one of three tracks: a Signature Dinner (foodie focus), a Hero Experience (activity focus), or a Classic Combo (dinner + activity). We use smart curation to match their vibe, then book and pay for everything end-to-end.",
  },
  {
    question: "How much work is required from HR?",
    answer:
      "Next to none. You set the rules (who receives Sparks and how often), and we handle the execution. Employees complete a quick vibe check, and our engine curates, books, and pays for the entire experience. No reimbursements, no coordination \u2014 just results.",
  },
  {
    question: "Do employees get a choice, or is it a surprise?",
    answer:
      "It\u2019s the best of both worlds: Curated Choice. Our engine matches them to a personalised shortlist of experiences based on their vibe. They can select their favourite or hit \u2018Shuffle\u2019 to see new options instantly. It eliminates decision fatigue while ensuring they get a night they actually want.",
  },
  {
    question: "How do you control spend and avoid everyone redeeming at once?",
    answer:
      "Spend is strictly capped at the limit you set. You control the cadence (e.g., quarterly drops or spot rewards) and the validity period for every Spark. This naturally staggers redemptions, ensuring you never exceed your budget and avoiding operational bottlenecks.",
  },
  {
    question:
      "What happens if someone needs to reschedule or a booking falls through?",
    answer:
      "Life happens. We handle the logistics. Our team manages the rebooking process end-to-end. While we always advocate for flexibility, we are bound by the venue\u2019s specific cancellation policy. If a change is made within a penalty window (e.g. 24 hours), standard fees apply. We handle that communication directly with the employee, ensuring HR stays out of the weeds.",
  },
  {
    question: "Who is Humanta for?",
    answer:
      "It\u2019s for leaders who know that the best way to engage their team is to get them offline. Humanta is built for companies that value real connection over generic perks. Whether it\u2019s a company-wide pulse, a work anniversary, or a manager-led spot reward, it\u2019s for teams that want recognition to feel genuinely human again.",
  },
];

// CTA Banner
export const CTA_CONTENT = {
  headline: "Ready to keep and attract the best talent?",
  description:
    "Your current team, old team and new team won\u2019t stop talking about it",
  ctaLabel: "Let\u2019s Talk",
  ctaHref: "#contact",
} as const;

// Footer
export const FOOTER_LINKS = [
  { label: "What we do", href: "#what-we-do" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Plans", href: "#plans" },
  { label: "FAQ", href: "#faq" },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/humanta",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/humanta.co",
    icon: "instagram",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@humanta.co",
    icon: "tiktok",
  },
] as const;

export const FOOTER_CONTENT = {
  tagline:
    "We believe your competitive edge will increasingly come from how human it feels to work for you.",
  email: "hello@humanta.co",
  privacyHref: "/privacy",
} as const;
