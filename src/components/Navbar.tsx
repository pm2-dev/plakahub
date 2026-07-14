import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full border-b-4 border-[#FFC812] bg-[#0a1628]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#FFC812] uppercase">
          [PlakaHub]
        </Link>

        <a
          href="#indir"
          className="inline-flex items-center gap-2 border-2 border-[#FFC812] bg-transparent px-4 py-2 text-sm font-bold text-[#FFC812] uppercase tracking-wider hover:bg-[#FFC812] hover:text-[#0a1628] transition-colors"
        >
          &gt; INDIR
        </a>
      </div>
    </nav>
  );
}
