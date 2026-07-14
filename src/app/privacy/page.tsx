import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | PlakaHub",
  description:
    "PlakaHub gizlilik politikası — verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu öğrenin.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white pt-28 pb-20">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        <header className="mb-14 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Gizlilik Politikası
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            Son güncelleme: {new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </header>

        <div className="space-y-12">
          <Section number="1" title="Toplanan Veriler">
            <p>
              Uygulamamıza kayıt olurken e-posta adresiniz, şifreniz, plaka
              numaranız ve isteğe bağlı olarak sosyal medya (Instagram, X,
              TikTok) kullanıcı adlarınız toplanmaktadır. Ayrıca bildirim
              gönderebilmek için cihazınıza ait anonim Push Token bilgisi
              saklanmaktadır.
            </p>
          </Section>

          <Section number="2" title="Verilerin Kullanımı">
            <p>
              Toplanan veriler, uygulamanın temel işlevi olan plaka sorgulama,
              kullanıcılar arası mesajlaşma (chat) ve profil gösterimi için
              kullanılır. Mesajlaşma içerikleriniz şifrelenmiş
              veritabanlarımızda güvenle saklanır ve sadece mesajlaştığınız kişi
              tarafından görüntülenebilir.
            </p>
          </Section>

          <Section number="3" title="Veri Görünürlüğü ve Maskeleme">
            <p>
              Misafir kullanıcılar (giriş yapmayanlar) sosyal medya
              hesaplarınızı sadece maskelenmiş (örneğin:{" "}
              <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-600">
                ah***ub
              </span>
              ) olarak görür. Tam kullanıcı adınız sadece uygulamaya kayıtlı ve
              giriş yapmış kullanıcılara gösterilir.
            </p>
          </Section>

          <Section number="4" title="Üçüncü Taraflarla Paylaşım">
            <p>
              PlakaHub, kullanıcı verilerini kesinlikle üçüncü taraf reklam
              şirketlerine satmaz veya pazarlamaz.
            </p>
          </Section>

          <Section number="5" title="Hesap ve Veri Silme">
            <p>
              Kullanıcılar diledikleri zaman mobil uygulama içerisindeki Profil
              sayfasından veya destek ekibimize ulaşarak hesaplarını ve tüm
              sohbet geçmişlerini kalıcı olarak silebilirler.
            </p>
            <p className="mt-3">
              Silme işlemi (Cascade Delete) ile bağlantılı tüm verileriniz —
              plakalar, sosyal profiller, sohbetler ve mesajlar —
              sunucularımızdan anında yok edilir.
            </p>
          </Section>

          <Section number="6" title="İletişim">
            <p>
              Veri talepleriniz, sorularınız veya hesap silme istekleriniz için
              bize aşağıdaki adresten ulaşabilirsiniz:
            </p>
            <a
              href="mailto:iletisim@plakahub.com"
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
              iletisim@plakahub.com
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
