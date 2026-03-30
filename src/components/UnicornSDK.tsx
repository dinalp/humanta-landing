"use client";

import Script from "next/script";

export function UnicornSDK() {
  return (
    <Script
      src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.5/dist/unicornStudio.umd.js"
      strategy="afterInteractive"
      onLoad={() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any;
        if (w.UnicornStudio) w.UnicornStudio.init();
      }}
    />
  );
}
