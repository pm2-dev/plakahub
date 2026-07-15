import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destek | PlakaHub",
  description:
    "PlakaHub destek merkezi — sık sorulan sorular, iletişim bilgileri ve yardım.",
};

export default function SupportPage() {
  return (
    <div className="bg-white pt-28 pb-20">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        <header className="mb-14 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Destek Merkezi
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            Size nasıl yardımcı olabiliriz?
          </p>
        </header>

        <div className="space-y-12">
          <Section title="Sık Sorulan Sorular">
            <div className="space-y-6">
              <Faq question="PlakaHub nedir?">
                PlakaHub, araç sahiplerini plaka numarası üzerinden birbirine
                bağlayan bir iletişim platformudur. Plakanızı kaydederek diğer
                kullanıcıların size ulaşmasını sağlayabilirsiniz.
              </Faq>

              <Faq question="Hesabımı nasıl oluşturabilirim?">
                Mobil uygulamayı indirdikten sonra e-posta adresiniz ile kayıt
                olabilirsiniz. Kayıt sonrası e-posta doğrulaması yapmanız
                gerekmektedir.
              </Faq>

              <Faq question="Plakamı nasıl eklerim?">
                Profil sayfanızdan plaka ekleme bölümüne giderek plaka
                numaranızı girebilirsiniz. Plaka sahipliğinizi doğrulamak için
                aracınızın ruhsat fotoğrafını yüklemeniz istenecektir.
              </Faq>

              <Faq question="Bilgilerim kimler tarafından görülür?">
                Giriş yapmamış kullanıcılar sosyal medya hesaplarınızı
                maskelenmiş olarak görür. Tam bilgileriniz sadece kayıtlı ve
                giriş yapmış kullanıcılara gösterilir.
              </Faq>

              <Faq question="Birini nasıl engelleyebilirim?">
                Mesajlaşma ekranında veya kullanıcının profilinde bulunan
                engelleme seçeneğini kullanarak istenmeyen kişileri
                engelleyebilirsiniz.
              </Faq>

              <Faq question="Hesabımı nasıl silebilirim?">
                Mobil uygulamada Profil sayfasının alt kısmında bulunan
                &ldquo;Hesabımı Sil&rdquo; butonunu kullanarak hesabınızı kalıcı
                olarak silebilirsiniz. Tüm verileriniz anında sunucularımızdan
                kaldırılır.
              </Faq>

              <Faq question="Bildirimleri nasıl kapatırım?">
                Cihazınızın ayarlarından PlakaHub uygulamasının bildirim
                izinlerini yönetebilirsiniz.
              </Faq>
            </div>
          </Section>

          <Section title="İletişim">
            <p>
              Sorularınız, önerileriniz veya sorun bildirmek için aşağıdaki
              kanallardan bize ulaşabilirsiniz:
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <a
                href="mailto:iletisim@plakahub.com"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 hover:border-blue-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 shrink-0"
                >
                  <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                  <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                </svg>
                iletisim@plakahub.com
              </a>

              <a
                href="https://instagram.com/plakahub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 hover:border-blue-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 shrink-0"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
                @plakahub
              </a>
            </div>
          </Section>

          <Section title="Yanıt Süreleri">
            <p>
              E-posta ile iletilen destek taleplerine en geç 48 saat içinde yanıt
              verilmektedir. Acil durumlarda lütfen e-posta konu satırına
              &ldquo;ACİL&rdquo; yazınız.
            </p>
          </Section>

          <Section title="Uygulama Gereksinimleri">
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-5 py-3 font-medium text-slate-900 bg-slate-50">
                      iOS
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      iOS 16.0 veya üzeri
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-5 py-3 font-medium text-slate-900 bg-slate-50">
                      Android
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      Android 8.0 (API 26) veya üzeri
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 font-medium text-slate-900 bg-slate-50">
                      İnternet
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      Aktif internet bağlantısı gereklidir
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Yasal">
            <p>Uygulama politikalarımız hakkında detaylı bilgi için:</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/privacy"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
              >
                Gizlilik Politikası
              </a>
              <a
                href="/terms"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
              >
                Kullanım Koşulları
              </a>
            </div>
          </Section>
        </div>
      </article>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-slate-900">{title}</h2>
      <div className="text-base leading-7 text-slate-600">{children}</div>
    </section>
  );
}

function Faq({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 transition-colors open:bg-blue-50 open:border-blue-200">
      <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 group-open:text-blue-800">
        <span className="flex items-center justify-between">
          {question}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180 group-open:text-blue-600"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {children}
      </p>
    </details>
  );
}
