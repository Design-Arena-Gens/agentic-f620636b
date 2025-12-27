"use client";

import { useState } from "react";
import type { CodeSnippet } from "@/data/chapters";

type Props = {
  snippet: CodeSnippet;
};

export function CodeBlock({ snippet }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.source);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy snippet", error);
    }
  };

  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-900/70 shadow-inner">
      <div className="flex items-center justify-between border-b border-slate-700/40 px-4 py-2 text-xs uppercase tracking-wide text-slate-300">
        <span className="font-semibold text-slate-100">{snippet.title}</span>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-slate-500/40 px-2 py-0.5 text-[10px] font-medium text-slate-400">
            {snippet.language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md bg-slate-800 px-2 py-1 text-[11px] font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-slate-200">
        <code>{snippet.source}</code>
      </pre>
    </div>
  );
}

