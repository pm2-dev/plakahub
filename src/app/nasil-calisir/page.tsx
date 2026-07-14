import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nasil Calisir | PlakaHub",
  description:
    "PlakaHub nasil calisir? Plaka sorgulama, sahiplenme, sosyal profil baglama ve mesajlasma adimlarini ogrenin.",
};

const steps = [
  {
    num: "01",
    title: "SORGULA",
    description:
      "Herhangi bir plakayi arat. Plaka sahiplenilmisse, kullanicinin sosyal medya hesaplarini aninda goruntule.",
    color: "#006FDF",
  },
  {
    num: "02",
    title: "SAHIPLEN",
    description:
      "Mobil uygulamayi indirerek saniyeler icinde kendi plakani uzerine kaydet. Aracinin dijital profilini olustur.",
    color: "#FFC812",
  },
  {
    num: "03",
    title: "BAGLA",
    description:
      "Instagram, X ve TikTok hesaplarini profiline entegre et. Seni bulmak isteyenlerin dogrudan hesaplarina ulasmasini sagla.",
    color: "#006FDF",
  },
  {
    num: "04",
    title: "MESAJLAS",
    description:
      "Trafikte iletisime gecmek istedigin plakaya dogrudan uygulama uzerinden mesaj gonder. Anlik bildirimlerle haberdar ol.",
    color: "#FFC812",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] pt-24 pb-16">
      {/* Hero */}
      <section className="text-center px-4 pb-16">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#006FDF]">
          &gt; NASIL CALISIR
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#FFC812] uppercase">
          TRAFIKTEKI YENI
          <br />
          SOSYAL AGIN
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm sm:text-base text-[#006FDF]">
          PlakaHub ile aracin sadece bir tasit degil, dijital dunyadaki yeni kimligi.
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
              {step.description}
            </p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="px-4 mt-16">
        <div className="mx-auto max-w-4xl border-4 border-[#FFC812] bg-[#112240] px-8 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FFC812] uppercase">
            ILK SORGUNU YAP
          </h2>
          <p className="mt-4 text-sm text-[#006FDF]">
            &gt; Bir plaka numarasi gir, sonucu aninda gor_
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 border-4 border-[#FFC812] px-8 py-4 text-sm font-extrabold text-[#FFC812] uppercase hover:bg-[#FFC812] hover:text-[#0a1628] transition-colors"
          >
            &gt; PLAKA SORGULA
          </Link>
        </div>
      </section>
    </div>
  );
}
