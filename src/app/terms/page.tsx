import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | PlakaHub",
  description:
    "PlakaHub kullanım koşulları — platformumuzu kullanırken uymanız gereken kurallar ve yükümlülükler.",
};

export default function TermsPage() {
  return (
    <div className="bg-white pt-28 pb-20">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        <header className="mb-14 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Kullanım Koşulları
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            Son güncelleme:{" "}
            {new Date().toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </header>

        <div className="space-y-12">
          <Section number="1" title="Hizmetin Amacı">
            <p>
              PlakaHub, trafikteki araç sahiplerinin birbirleriyle iletişim
              kurmasını kolaylaştıran bir sosyal platformdur.
            </p>
          </Section>

          <Section number="2" title="Kullanıcı Yükümlülükleri">
            <p>
              Kullanıcılar, sadece kendilerine ait veya yetkili oldukları plaka
              numaralarını sisteme kaydetmekle yükümlüdür. Yanlış veya başkasına
              ait plaka kaydı tespiti durumunda hesaplar yönetici (Admin)
              tarafından askıya alınabilir.
            </p>
          </Section>

          <Section number="3" title="İletişim ve Topluluk Kuralları">
            <p>
              Mesajlaşma (Chat) özelliği üzerinden tehdit, hakaret, zorbalık
              veya yasa dışı içerik paylaşımı kesinlikle yasaktır. Kullanıcılar,
              rahatsız edici buldukları plakaları engelleyebilir veya şikayet
              edebilir.
            </p>
            <p className="mt-3">
              Kural ihlali yapan kullanıcılar platformdan kalıcı olarak
              uzaklaştırılır{" "}
              <span className="font-semibold text-slate-800">
                (Zero Tolerance Policy)
              </span>
              .
            </p>
          </Section>

          <Section number="4" title="Hizmet Kesintileri">
            <p>
              PlakaHub, sistem bakımı veya güncellemeler nedeniyle hizmette
              yaşanabilecek geçici kesintilerden sorumlu tutulamaz.
            </p>
          </Section>

          <Section number="5" title="İletişim">
            <p>
              Kullanım koşullarıyla ilgili sorularınız için bize aşağıdaki
              adresten ulaşabilirsiniz:
            </p>
            <a
              href="mailto:support@plakahub.com"
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 hover:border-blue-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
              </svg>
              support@plakahub.com
            </a>
          </Section>
        </div>
      </article>
    </div>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
          {number}
        </span>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      </div>
      <div className="pl-11 text-base leading-7 text-slate-600">
        {children}
      </div>
    </section>
  );
}
