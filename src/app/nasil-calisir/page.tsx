"use client";

import Link from "next/link";
import { useI18n } from "@/i18n";

export default function HowItWorksPage() {
  const { t } = useI18n();

  const steps = [
    { num: "01", title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc, color: "#006FDF" },
    { num: "02", title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc, color: "#FFC812" },
    { num: "03", title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc, color: "#006FDF" },
    { num: "04", title: t.howItWorks.step4Title, desc: t.howItWorks.step4Desc, color: "#FFC812" },
  ];

  return (
    <div className="min-h-screen bg-[#0a1628] pt-24 pb-16">
      {/* Hero */}
      <section className="text-center px-4 pb-16">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#006FDF]">
          {t.howItWorks.badge}
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FFC812] uppercase whitespace-pre-line">
          {t.howItWorks.title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm sm:text-base text-[#006FDF]">
          {t.howItWorks.subtitle}
        </p>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-4xl px-4 grid gap-6 sm:grid-cols-2">
        {steps.map((step) => (
          <div
            key={step.num}
            className="border-4 bg-[#112240] p-8 transition-colors hover:border-[#FFC812]"
            style={{ borderColor: step.color }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-3xl font-extrabold"
                style={{ color: step.color }}
              >
                {step.num}
              </span>
              <div className="flex-1 h-[2px]" style={{ backgroundColor: step.color, opacity: 0.3 }} />
            </div>
            <h3 className="text-xl font-extrabold text-white uppercase mb-3">
              {step.title}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="px-4 mt-16">
        <div className="mx-auto max-w-4xl border-4 border-[#FFC812] bg-[#112240] px-8 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FFC812] uppercase">
            {t.howItWorks.ctaTitle}
          </h2>
          <p className="mt-4 text-sm text-[#006FDF]">
            {t.howItWorks.ctaSubtitle}
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 border-4 border-[#FFC812] px-8 py-4 text-sm font-extrabold text-[#FFC812] uppercase hover:bg-[#FFC812] hover:text-[#0a1628] transition-colors"
          >
            {t.howItWorks.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
