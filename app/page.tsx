import Link from "next/link";

export default function Home() {
  return (
    /* 
      Let me explain those class names:
      - min-h-screen: at least viewport height (you can remove this to see the different, try it!)
      - bg-naysayer: best known from Jonathan Blow's compiler livestreams
      - flex, items-center, justify-center: enable Flexbox layout and vertically + horizontally center
    */
    <main className="min-h-screen bg-naysayer px-6 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-10 text-center">
        <h1 className="font-title text-6xl leading-none sm:text-7xl lg:text-8xl">
          Order of the Sinking Star
        </h1>

        {/* the menu below title */}
        <nav className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/levels"
            className="rounded-lg border border-white/20 px-6 py-3 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            Levels
          </Link>

          <Link
            href="/levels/heroes1_1"
            className="rounded-lg border border-white/20 px-6 py-3 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            Test Level
          </Link>
        </nav>
      </div>
    </main>
  );
}
