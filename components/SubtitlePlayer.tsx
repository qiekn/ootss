"use client";

export interface SubtitleItem {
  character: string;
  marker: string;
  comment: string;
  text: string;
}

export interface SubtitleEntry {
  name: string;
  items: SubtitleItem[];
  audioSrc: string;
}

interface SubtitlePlayerProps {
  entry: SubtitleEntry;
}

export default function SubtitlePlayer({ entry }: SubtitlePlayerProps) {
  return (
    <section className="w-full max-w-6xl rounded-3xl border border-white/15 bg-black/20 px-8 py-10 shadow-2xl">
      <div className="mb-10 flex justify-center">
        <audio
          controls
          preload="metadata"
          src={entry.audioSrc}
          className="w-full max-w-3xl"
        />
      </div>

      <div className="flex flex-col items-center gap-10">
        {entry.items.map((item, index) => (
          <div key={`${entry.name}-${index}`} className="w-full text-center">
            {item.comment && (
              <p className="mx-auto mb-8 max-w-5xl font-sans text-xl italic leading-relaxed text-yellow-300">
                {item.comment}
              </p>
            )}

            <p className="subtitle-game-text mx-auto max-w-5xl whitespace-pre-line">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
