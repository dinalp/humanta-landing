export interface StoryPanel {
  title: string;
  description: string;
  highlightPhrase: string;
  image: string;
  imageAlt: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  subtitle: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
