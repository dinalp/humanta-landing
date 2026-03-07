import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-heading font-semibold text-3xl md:text-4xl text-brand-text text-center mb-16">
          How Humanta Works
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-brand-accent text-white rounded-full flex items-center justify-center text-xl font-semibold mb-4">
                {step.number}
              </div>
              <h3 className="font-heading font-semibold text-brand-text text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-brand-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
