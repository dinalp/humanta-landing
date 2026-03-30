import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductTiles } from "@/components/ProductTiles";
import { Story } from "@/components/Story";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { SocialProof } from "@/components/SocialProof";
import { FAQ } from "@/components/FAQ";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <ProductTiles />
        <HowItWorks />
        <Pricing />
        <SocialProof />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
