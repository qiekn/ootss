import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Image from "next/image";
import { notFound } from "next/navigation";
import SubtitlePlayer, {
  type SubtitleEntry,
} from "@/components/SubtitlePlayer";

interface LevelFrontmatter {
  title?: string;
  subtitles?: string[];
}

interface SubtitleJson {
  name: string;
  items: {
    character: string;
    marker: string;
    comment: string;
    text: string;
  }[];
}

const levelsDir = path.join(process.cwd(), "data", "levels");
const subtitlesDir = path.join(process.cwd(), "data", "subtitles");

function getLevelNames(): string[] {
  if (!fs.existsSync(levelsDir)) {
    return [];
  }

  return fs
    .readdirSync(levelsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) =>
      fs.existsSync(path.join(levelsDir, entry.name, "index.mdx")),
    )
    .map((entry) => entry.name);
}

function readLevel(levelName: string) {
  const mdxPath = path.join(levelsDir, levelName, "index.mdx");

  if (!fs.existsSync(mdxPath)) {
    return null;
  }

  const raw = fs.readFileSync(mdxPath, "utf8");
  const parsed = matter(raw);

  return {
    frontmatter: parsed.data as LevelFrontmatter,
    content: parsed.content,
  };
}

function readSubtitle(name: string): SubtitleEntry | null {
  const jsonPath = path.join(subtitlesDir, `${name}.json`);

  if (!fs.existsSync(jsonPath)) {
    console.warn(`Subtitle JSON not found: ${jsonPath}`);
    return null;
  }

  const raw = fs.readFileSync(jsonPath, "utf8");
  const json = JSON.parse(raw) as SubtitleJson;

  return {
    ...json,
    audioSrc: `/sound/subtitles/${json.name}.ogg`,
  };
}

export function generateStaticParams(): { levelName: string }[] {
  const params = getLevelNames().map((levelName) => ({ levelName }));
  return params;
}

export default async function LevelPage({
  params,
}: {
  params: Promise<{ levelName: string }>;
}) {
  const { levelName } = await params;
  const level = readLevel(levelName);

  if (!level) {
    notFound();
  }

  const title = level.frontmatter.title ?? levelName;
  const subtitleNames = level.frontmatter.subtitles ?? [];

  const subtitles = subtitleNames
    .map((name) => readSubtitle(name))
    .filter((entry): entry is SubtitleEntry => entry !== null);

  return (
    <main className="min-h-screen bg-naysayer px-6 py-12 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <h1 className="mb-8 text-center font-title text-6xl">{title}</h1>

        <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20">
          <Image
            src={`/images/levels/${levelName}.webp`}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <section className="flex w-full flex-col items-center gap-8 font-oss">
          {subtitles.length > 0 ? (
            subtitles.map((entry) => (
              <SubtitlePlayer key={entry.name} entry={entry} />
            ))
          ) : (
            <p className="text-white/50">No subtitles configured.</p>
          )}
        </section>
      </div>
    </main>
  );
}
