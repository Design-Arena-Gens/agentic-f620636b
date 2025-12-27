"use client";

type Props = {
  query: string;
  onChange: (value: string) => void;
};

export function SearchBar({ query, onChange }: Props) {
  return (
    <label className="group relative block">
      <span className="sr-only">Search topics</span>
      <input
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by topic, keyword, or library..."
        className="w-full rounded-xl border border-slate-600/60 bg-slate-900/70 px-12 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
      />
      <svg
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition group-focus-within:text-sky-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.803 5.803a7.5 7.5 0 0 0 10 10Z"
        />
      </svg>
    </label>
  );
}

