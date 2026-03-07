"use client";

import { useRef } from "react";
import Image from "next/image";
import { STORY_PANELS } from "@/lib/constants";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

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
  const containerRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.matchMedia({
        // Desktop: pinned panels with cross-fade and clip-path reveals
        "(min-width: 768px)": () => {
          const panels =
            gsap.utils.toArray<HTMLElement>(".story-panel");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinContainerRef.current,
              pin: true,
              scrub: 1,
              start: "top top",
              end: "+=300%",
            },
          });

          // Panel 0 is already visible; animate panels 1 and 2
          for (let i = 1; i < panels.length; i++) {
            // Fade out previous panel text
            tl.to(
              panels[i - 1].querySelector(".panel-text"),
              { opacity: 0, duration: 0.3 }
            );
            // Fade in current panel
            tl.to(panels[i], { opacity: 1, duration: 0.3 }, "<");
            // Fade in current panel text with slight y offset
            tl.from(
              panels[i].querySelector(".panel-text")!,
              { opacity: 0, y: 30, duration: 0.3 },
              "<0.1"
            );
            // Clip-path reveal on image
            tl.fromTo(
              panels[i].querySelector(".panel-image")!,
              { clipPath: "circle(0% at 50% 50%)" },
              { clipPath: "circle(100% at 50% 50%)", duration: 0.5 },
              "<"
            );
            // Pause between panels
            tl.to({}, { duration: 0.2 });
          }

          ScrollTrigger.refresh();
        },

        // Mobile: simple fade/slide reveals
        "(max-width: 767px)": () => {
          const mobilePanels =
            gsap.utils.toArray<HTMLElement>(".story-panel-mobile");

          mobilePanels.forEach((el) => {
            gsap.from(el, {
              y: 40,
              opacity: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              },
            });
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="what-we-do" className="bg-brand-dark">
      {/* Mobile: stacked panels (visible below md) */}
      <div className="md:hidden py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          {STORY_PANELS.map((panel) => (
            <div
              key={panel.title}
              className="story-panel-mobile flex flex-col-reverse gap-10 items-center"
              style={{ opacity: 0 }}
            >
              {/* Text side */}
              <div>
                <h2 className="font-heading font-semibold text-2xl text-white mb-4">
                  {panel.title}
                </h2>
                <p className="font-body text-white/70 text-base leading-relaxed">
                  <HighlightedText
                    text={panel.description}
                    highlight={panel.highlightPhrase}
                  />
                </p>
              </div>

              {/* Image side */}
              <div className="relative overflow-hidden rounded-2xl aspect-[3/2] w-full">
                <Image
                  src={panel.image}
                  alt={panel.imageAlt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: pinned container (hidden below md) */}
      <div
        className="hidden md:block relative h-screen"
        ref={pinContainerRef}
      >
        {STORY_PANELS.map((panel, index) => (
          <div
            key={panel.title}
            className="story-panel absolute inset-0 flex items-center"
            style={{ opacity: index === 0 ? 1 : 0 }}
          >
            <div className="max-w-6xl mx-auto px-6 flex gap-16 items-center">
              {/* Text side */}
              <div className="w-1/2 panel-text">
                <h2 className="font-heading font-semibold text-3xl lg:text-4xl text-white mb-4">
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
              <div className="w-1/2 relative overflow-hidden rounded-2xl aspect-[3/2]">
                <div
                  className="panel-image w-full h-full"
                  style={{
                    clipPath:
                      index === 0
                        ? "circle(100% at 50% 50%)"
                        : "circle(0% at 50% 50%)",
                  }}
                >
                  <Image
                    src={panel.image}
                    alt={panel.imageAlt}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
