"use client";

import { useMemo, useState } from "react";
import { chapters } from "@/data/chapters";
import type { Chapter, Topic } from "@/data/chapters";
import { CodeBlock } from "./CodeBlock";
import { SearchBar } from "./SearchBar";

type ChapterWithMatches = Chapter & {
  topics: Topic[];
};

const ebookChapters: Chapter[] = chapters;

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function EbookPage() {
  const [query, setQuery] = useState("");
  const [activeChapter, setActiveChapter] = useState(
    ebookChapters[0]?.id ?? "foundation",
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filteredChapters = useMemo<ChapterWithMatches[]>(() => {
    if (!normalizedQuery) {
      return ebookChapters.map((chapter) => ({
        ...chapter,
        topics: chapter.topics,
      }));
    }

    return ebookChapters
      .map((chapter) => {
        const chapterMatches =
          chapter.title.toLowerCase().includes(normalizedQuery) ||
          chapter.description.toLowerCase().includes(normalizedQuery) ||
          chapter.interviewTips.some((tip) =>
            tip.toLowerCase().includes(normalizedQuery),
          );

        const topics = chapter.topics.filter((topic) => {
          if (topic.title.toLowerCase().includes(normalizedQuery)) return true;
          if (topic.summary.toLowerCase().includes(normalizedQuery)) return true;
          if (
            topic.takeaways?.some((item) =>
              item.toLowerCase().includes(normalizedQuery),
            )
          ) {
            return true;
          }
          if (
            topic.checklist?.some((item) =>
              item.toLowerCase().includes(normalizedQuery),
            )
          ) {
            return true;
          }
          if (
            topic.snippet?.source.toLowerCase().includes(normalizedQuery) ||
            topic.snippet?.title.toLowerCase().includes(normalizedQuery)
          ) {
            return true;
          }
          return false;
        });

        if (chapterMatches && topics.length === 0) {
          return {
            ...chapter,
            topics: chapter.topics,
          };
        }

        if (topics.length > 0) {
          return {
            ...chapter,
            topics,
          };
        }

        return null;
      })
      .filter(Boolean) as ChapterWithMatches[];
  }, [normalizedQuery]);

  const highlight = (text: string) => {
    if (!normalizedQuery) {
      return text;
    }

    const pattern = new RegExp(`(${escapeRegExp(normalizedQuery)})`, "ig");
    const parts = text.split(pattern);

    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <mark
          key={`${part}-${index}`}
          className="rounded-sm bg-sky-400/30 px-0.5 text-sky-100"
        >
          {part}
        </mark>
      ) : (
        <span key={`${part}-${index}`}>{part}</span>
      ),
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:flex-row lg:px-10">
        <aside className="lg:sticky lg:top-10 lg:h-[calc(100vh-5rem)] lg:w-72">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
            <div className="mb-6 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                Machine Learning Interview E-Book
              </p>
              <h1 className="text-2xl font-bold text-slate-50">
                Launchpad: ML Systems Interview
              </h1>
              <p className="text-sm text-slate-400">
                Your rapid prep companion for the final countdown. Built for
                hands-on ML engineers and applied scientists.
              </p>
            </div>
            <SearchBar query={query} onChange={setQuery} />
            <nav className="mt-6 space-y-2">
              {ebookChapters.map((chapter) => (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  onClick={() => setActiveChapter(chapter.id)}
                  className={`block rounded-xl px-4 py-2 text-sm transition ${
                    activeChapter === chapter.id
                      ? "bg-sky-500/20 text-sky-100 ring-1 ring-sky-400/60"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-100"
                  }`}
                >
                  {chapter.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 space-y-14">
          {filteredChapters.map((chapter) => (
            <section
              key={chapter.id}
              id={chapter.id}
              className="scroll-mt-16 rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl ring-1 ring-white/5"
            >
              <div className="flex flex-col gap-3 border-b border-slate-800 pb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-sky-300/80">
                  {chapter.id.replaceAll("-", " ")}
                </span>
                <h2 className="text-3xl font-bold text-slate-50">
                  {highlight(chapter.title)}
                </h2>
                <p className="text-base leading-relaxed text-slate-300">
                  {highlight(chapter.description)}
                </p>
                <div className="mt-2 rounded-xl border border-sky-500/20 bg-sky-500/10 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-200">
                    Interview hits
                  </h3>
                  <ul className="mt-2 grid gap-2 text-sm text-slate-100 sm:grid-cols-2">
                    {chapter.interviewTips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                        <span>{highlight(tip)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 space-y-10">
                {chapter.topics.map((topic) => (
                  <article
                    key={topic.id}
                    className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-6 shadow-inner"
                  >
                    <div className="flex flex-col gap-2 border-b border-slate-800/70 pb-4">
                      <h3 className="text-xl font-semibold text-slate-100">
                        {highlight(topic.title)}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-300">
                        {highlight(topic.summary)}
                      </p>
                    </div>
                    <div className="mt-4 space-y-5">
                      {topic.takeaways && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                            Key takeaways
                          </h4>
                          <ul className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                            {topic.takeaways.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                <span>{highlight(item)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {topic.checklist && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                            Checklist
                          </h4>
                          <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
                            {topic.checklist.map((item) => (
                              <li key={item}>{highlight(item)}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {topic.snippet && <CodeBlock snippet={topic.snippet} />}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {filteredChapters.length === 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-10 text-center">
              <h3 className="text-lg font-semibold text-slate-100">
                No matches found
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Adjust your search query or explore the table of contents on the
                left.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
