import { FAQ_ITEMS } from "@/lib/constants";

export function FAQ() {
  return (
    <section id="faq" className="bg-brand-dark py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-heading font-semibold text-3xl md:text-4xl text-white text-center mb-16">
          Everything you need to know
        </h2>

        <div>
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="border-b border-brand-border">
              <div className="font-heading font-medium text-lg text-white py-5">
                {item.question}
              </div>
              <div className="text-white/70 font-body text-base pb-5">
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
