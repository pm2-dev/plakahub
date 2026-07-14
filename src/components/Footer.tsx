import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-4 border-[#006FDF] bg-[#0a1628]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-[#006FDF] font-bold uppercase">
          &copy; {new Date().getFullYear()} PlakaHub
        </p>
        <nav className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="text-sm text-white/60 font-bold uppercase hover:text-[#FFC812] transition-colors"
          >
            Gizlilik
          </Link>
          <span className="text-[#006FDF]">|</span>
          <Link
            href="/terms"
            className="text-sm text-white/60 font-bold uppercase hover:text-[#FFC812] transition-colors"
          >
            Kosullar
          </Link>
          <span className="text-[#006FDF]">|</span>
          <Link
            href="/nasil-calisir"
            className="text-sm text-white/60 font-bold uppercase hover:text-[#FFC812] transition-colors"
          >
            Nasil Calisir
          </Link>
        </nav>
      </div>
    </footer>
  );
}
