import Image from "next/image";
import { STORY_PANELS } from "@/lib/constants";

function HighlightedText({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) {
  const index = text.indexOf(highlight);
  if (index === -1) return <>{text}</>;

  const before = text.slice(0, index);
  const after = text.slice(index + highlight.length);

  return (
    <>
      {before}
      <span className="text-brand-accent font-semibold">{highlight}</span>
      {after}
    </>
  );
}

export function Story() {
  return (
    <section id="what-we-do" className="bg-brand-dark py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 space-y-20 lg:space-y-32">
        {STORY_PANELS.map((panel, index) => (
          <div
            key={panel.title}
            className={`flex flex-col-reverse gap-10 md:gap-16 items-center ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Text side */}
            <div className="md:w-1/2">
              <h2 className="font-heading font-semibold text-2xl md:text-3xl lg:text-4xl text-white mb-4">
                {panel.title}
              </h2>
              <p className="font-body text-white/70 text-base md:text-lg leading-relaxed">
                <HighlightedText
                  text={panel.description}
                  highlight={panel.highlightPhrase}
                />
              </p>
            </div>

            {/* Image side */}
            <div className="md:w-1/2">
              <Image
                src={panel.image}
                alt={panel.imageAlt}
                width={600}
                height={400}
                className="rounded-2xl object-cover w-full"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
