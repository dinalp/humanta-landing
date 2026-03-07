import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <HowItWorks />
        <Pricing />
        {/* FAQ, CTA Banner, and Footer added in Plan 03 */}
      </main>
    </>
  );
}
