import Image from "next/image";
import { HERO_CONTENT } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/images/hero/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Tagline */}
        <p className="font-body text-sm md:text-base uppercase tracking-widest text-white/70 mb-6">
          {HERO_CONTENT.tagline}
        </p>

        {/* Headline */}
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8">
          {HERO_CONTENT.headline}
        </h1>

        {/* Description */}
        <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          {HERO_CONTENT.description}
        </p>

        {/* CTA */}
        <a
          href={HERO_CONTENT.ctaHref}
          className="inline-block bg-brand-accent text-brand-text px-8 py-4 rounded-full text-lg font-medium hover:bg-brand-accent/90 transition-colors"
        >
          {HERO_CONTENT.ctaLabel}
        </a>
      </div>
    </section>
  );
}
