import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedButton } from "@/components/AnimatedButton";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "Free",
      desc: "Perfect for individuals and side projects.",
      features: ["1,000 queries per month", "Standard response speed", "Community support", "Basic API access"],
      button: "Start for Free",
      variant: "outline" as const
    },
    {
      name: "Pro",
      price: "$49",
      period: "/mo",
      desc: "For professional developers and growing teams.",
      features: ["100,000 queries per month", "Priority response speed", "Email support", "Full API & Webhooks", "Custom system prompts"],
      button: "Get Started",
      variant: "primary" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Mission-critical AI for large organizations.",
      features: ["Unlimited queries", "Zero-latency SLA", "24/7 Phone & Slack support", "Dedicated Account Manager", "On-premise deployment options"],
      button: "Get Access",
      variant: "secondary" as const
    }
  ];

  const faqs = [
    { q: "Can I cancel my subscription at any time?", a: "Yes, you can cancel your Pro or Enterprise subscription at any time from your billing dashboard. Your access will continue until the end of your current billing cycle." },
    { q: "What counts as a query?", a: "A query is defined as a single inference request to our API or web interface, regardless of token length up to your plan's maximum context window." },
    { q: "Do you offer discounts for non-profits or education?", a: "Yes, we offer a 50% discount for verified educational institutions and non-profit organizations. Contact sales to apply." },
    { q: "How secure is my data?", a: "We employ end-to-end encryption and adhere to SOC2 Type II standards. Your data is never used to train our base models without explicit opt-in." },
    { q: "Can I upgrade from Pro to Enterprise later?", a: "Absolutely. You can upgrade seamlessly at any time, and we will prorate the cost of your existing Pro subscription." }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-40 pb-20 px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-6">
          Simple, Transparent <span className="text-cyan-400">Pricing</span>
        </h1>
        <p className="text-xl text-gray-400 font-sans max-w-2xl mx-auto">
          Scale your intelligence infrastructure predictably. No hidden fees.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="py-10 container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-panel p-8 rounded-3xl relative flex flex-col ${tier.popular ? 'border-cyan-500 shadow-[0_0_30px_rgba(0,255,255,0.15)] transform md:-translate-y-4' : 'border-white/10'}`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-black font-orbitron font-bold text-xs uppercase tracking-wider px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="font-orbitron text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-gray-400 text-sm mb-6 h-10">{tier.desc}</p>
              
              <div className="mb-8">
                <span className="text-5xl font-orbitron font-black text-white">{tier.price}</span>
                {tier.period && <span className="text-gray-400 text-lg">{tier.period}</span>}
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300 font-sans text-sm">{feat}</span>
                  </li>
                ))}
              </ul>
              
              <AnimatedButton 
                as="a" 
                href="https://nirpesh-ai.lovable.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                variant={tier.variant}
                className="w-full"
              >
                {tier.button}
              </AnimatedButton>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 container mx-auto px-4 max-w-3xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
        
        <div className="glass-panel p-6 md:p-10 rounded-2xl border border-white/10">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10">
                <AccordionTrigger className="text-left font-orbitron font-bold text-white hover:text-cyan-400 hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 font-sans leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
}
