import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} PlakaHub. Tüm hakları saklıdır.
        </p>
        <nav className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="text-sm text-slate-500 transition-colors hover:text-blue-700"
          >
            Gizlilik Politikası
          </Link>
          <span className="text-slate-300">·</span>
          <Link
            href="/terms"
            className="text-sm text-slate-500 transition-colors hover:text-blue-700"
          >
            Kullanım Koşulları
          </Link>
        </nav>
      </div>
    </footer>
  );
}
