import type { Metadata } from "next";
import Link from "next/link";
import { Search, Car, Link as LinkIcon, MessageSquare, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Nasıl Çalışır | PlakaHub",
  description:
    "PlakaHub nasıl çalışır? Plaka sorgulama, sahiplenme, sosyal profil bağlama ve mesajlaşma adımlarını öğrenin.",
};

const steps = [
  {
    icon: Search,
    color: "bg-blue-600",
    ring: "bg-blue-100",
    title: "Sorgula ve Keşfet",
    description:
      "Sistemdeki herhangi bir plakayı aratın. Plaka sahiplenilmişse, kullanıcının maskelenmiş sosyal medya hesaplarını anında görüntüleyin.",
  },
  {
    icon: Car,
    color: "bg-orange-500",
    ring: "bg-orange-100",
    title: "Plakanı Sahiplen",
    description:
      "Mobil uygulamamızı indirerek saniyeler içinde kendi plakanızı üzerinize kaydedin. Aracınızın dijital profilini oluşturun.",
  },
  {
    icon: LinkIcon,
    color: "bg-purple-600",
    ring: "bg-purple-100",
    title: "Ağlarını Bağla",
    description:
      "Instagram, X ve TikTok hesaplarınızı profiline entegre edin. Sizi bulmak isteyenlerin doğrudan onaylı hesaplarınıza ulaşmasını sağlayın.",
  },
  {
    icon: MessageSquare,
    color: "bg-emerald-600",
    ring: "bg-emerald-100",
    title: "Anında Mesajlaş",
    description:
      "Trafikte iletişime geçmek istediğiniz plakaya doğrudan uygulama üzerinden iMessage kalitesinde mesaj gönderin. Anlık bildirimlerle haberdar olun.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-50 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(148,163,184,0.15),transparent)]" />

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Nasıl Çalışır
          </p>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 md:text-7xl">
            Trafikteki Yeni
            <br />
            Sosyal Ağınız.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
            PlakaHub ile aracınız sadece bir taşıt değil, dijital dünyadaki yeni
            kimliğiniz. İşte sistemin çalışma mantığı.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="group rounded-3xl bg-white p-10 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${step.ring}`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.color}`}>
                      <Icon className="h-5 w-5 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-300">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-slate-900 px-8 py-16 text-center sm:px-16 sm:py-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Hemen İlk Sorgunuzu Yapın
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
            Bir plaka numarası girin, sonucu anında görün.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-slate-900 transition-all duration-200 hover:bg-slate-100"
          >
            Plaka Sorgula
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
