import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import matter from "gray-matter";
import { getAssetPath } from "@/lib/path";

interface LevelItem {
  levelName: string;
  title: string;
  previewSrc: string;
}

const levelsDir = path.join(process.cwd(), "data", "levels");

function getLevels(): LevelItem[] {
  if (!fs.existsSync(levelsDir)) {
    return [];
  }

  return fs
    .readdirSync(levelsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) =>
      fs.existsSync(path.join(levelsDir, entry.name, "index.mdx")),
    )
    .map((entry) => {
      const levelName = entry.name;
      const mdxPath = path.join(levelsDir, levelName, "index.mdx");

      const raw = fs.readFileSync(mdxPath, "utf8");
      const parsed = matter(raw);

      const title =
        typeof parsed.data.title === "string" ? parsed.data.title : levelName;

      return {
        levelName,
        title,
        previewSrc: getAssetPath(`/images/levels/${levelName}.webp`),
      };
    })
    .sort((a, b) => a.levelName.localeCompare(b.levelName));
}

export function generateStaticParams() {
  return [];
}

export default function LevelsPage() {
  const levels = getLevels();

  return (
    <main className="min-h-screen bg-naysayer px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <h1 className="font-title text-6xl">Levels</h1>
          <p className="max-w-2xl text-white/60">
            All available Order of the Sinking Star levels.
          </p>
        </div>

        {levels.length === 0 ? (
          <p className="text-center text-white/50">No levels found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {levels.map((level) => (
              <Link
                key={level.levelName}
                href={`/levels/${level.levelName}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-black/20 transition hover:border-white/30 hover:bg-white/10"
              >
                <div className="relative aspect-video w-full bg-black/30">
                  <Image
                    src={level.previewSrc}
                    alt={level.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h2 className="font-title text-3xl">{level.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
