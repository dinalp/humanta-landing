"use client";

import Script from "next/script";

const PROJECT_ID = "MMzQ6ua96gJtL5DcS7iV";

const SCENES = [
  { elementId: "us-hero", lazyLoad: false },
  { elementId: "us-cta", lazyLoad: true },
];

export function UnicornSDK() {
  return (
    <Script
      src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.5/dist/unicornStudio.umd.js"
      strategy="afterInteractive"
      onLoad={() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const US = (window as any).UnicornStudio;
        if (!US) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 3);

        SCENES.forEach(({ elementId, lazyLoad }) => {
          const el = document.getElementById(elementId);
          if (!el) return;

          US.addScene({
            elementId,
            projectId: PROJECT_ID,
            scale: 1,
            dpi: dpr,
            fps: 60,
            lazyLoad,
            production: true,
          }).catch(() => {
            // Scene may fail silently on some browsers
          });
        });
      }}
    />
  );
}
