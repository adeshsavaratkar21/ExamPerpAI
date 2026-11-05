import React, { useRef } from 'react';
import {
  Printer,
  Download,
  RefreshCw,
  Loader2,
  Sparkles,
  AlertCircle,
  Sigma,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Bookmark,
  Calendar,
  GraduationCap
} from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

/* ─── Helper to ensure math strings are KaTeX-rendered ─────────────────── */
function renderWithMath(rawText) {
  if (!rawText || typeof rawText !== 'string') return '';
  let text = rawText.trim();
  // If text has LaTeX notation (\frac, \sum, \sigma, etc.) and isn't enclosed in $, wrap it
  if (/\\[a-zA-Z]+/.test(text) && !text.includes('$')) {
    text = `$${text}$`;
  }
  return text;
}

/* ─── Authentic Sticky Note with Tape Accent ─────────────────────────── */
function StickyNote({ icon: Icon, color, label, items }) {
  const palette = {
    yellow: {
      card: 'bg-[#FEFCE8] border-amber-300 text-amber-950 shadow-sm',
      tape: 'bg-amber-200/80 border-amber-300/60',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
      iconColor: 'text-amber-700'
    },
    pink: {
      card: 'bg-[#FFF1F2] border-rose-300 text-rose-950 shadow-sm',
      tape: 'bg-rose-200/80 border-rose-300/60',
      badge: 'bg-rose-100 text-rose-900 border-rose-300',
      iconColor: 'text-rose-700'
    },
    blue: {
      card: 'bg-[#F0F7FF] border-sky-300 text-sky-950 shadow-sm',
      tape: 'bg-sky-200/80 border-sky-300/60',
      badge: 'bg-sky-100 text-sky-900 border-sky-300',
      iconColor: 'text-sky-700'
    },
    green: {
      card: 'bg-[#F0FDF4] border-emerald-300 text-emerald-950 shadow-sm',
      tape: 'bg-emerald-200/80 border-emerald-300/60',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      iconColor: 'text-emerald-700'
    },
  };

  const scheme = palette[color] || palette.yellow;

  return (
    <div className={`relative rounded-2xl border p-4 sm:p-5 transition-transform duration-200 ${scheme.card}`}>
      {/* Tape accent strip on top center */}
      <div 
        className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-sm border ${scheme.tape} backdrop-blur-xs shadow-2xs rotate-[-1deg]`} 
        aria-hidden="true"
      />

      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-black/5">
        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${scheme.badge}`}>
          <Icon className={`w-3.5 h-3.5 ${scheme.iconColor}`} />
        </div>
        <span 
          className="text-xs sm:text-sm font-black tracking-wide uppercase"
          style={{ fontFamily: 'var(--font-caveat, "Caveat", cursive)', fontSize: '1.1rem' }}
        >
          {label}
        </span>
      </div>

      {Array.isArray(items) ? (
        <ul className="space-y-2.5 pl-1">
          {items.map((item, i) => {
            const strVal = typeof item === 'string' ? item : JSON.stringify(item);
            return (
              <li 
                key={i} 
                className="text-xs sm:text-sm leading-relaxed flex items-start gap-2"
                style={{ fontFamily: 'var(--font-kalam, "Kalam", cursive)' }}
              >
                <span className="text-amber-500 font-bold select-none mt-0.5">•</span>
                <div className="flex-1 min-w-0">
                  <MarkdownRenderer 
                    content={renderWithMath(strVal)} 
                    className="prose-xs max-w-none text-current"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div 
          className="text-xs sm:text-sm leading-relaxed"
          style={{ fontFamily: 'var(--font-kalam, "Kalam", cursive)' }}
        >
          <MarkdownRenderer 
            content={renderWithMath(items)} 
            className="prose-xs max-w-none text-current"
          />
        </div>
      )}
    </div>
  );
}

/* ─── Full-Width Authentic Ruled Notebook Paper ───────────────────────── */
function FullWidthNotebookPaper({ chapterName, subjectName, children }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="w-full relative rounded-3xl overflow-hidden border border-[#E2DDD3] notebook-sheet-container">
      {/* Red vertical double margin divider */}
      <div
        className="absolute top-0 bottom-0 left-[72px] sm:left-[84px] w-[2px] bg-rose-400/50 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 bottom-0 left-[75px] sm:left-[87px] w-[1px] bg-rose-300/30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Realistic punched notebook binder holes */}
      <div className="absolute top-12 left-5 sm:left-6 notebook-hole" aria-hidden="true" />
      <div className="absolute top-1/2 -translate-y-1/2 left-5 sm:left-6 notebook-hole" aria-hidden="true" />
      <div className="absolute bottom-16 left-5 sm:left-6 notebook-hole" aria-hidden="true" />

      {/* Notebook Content Canvas */}
      <div className="pl-24 sm:pl-28 pr-6 sm:pr-10 py-7 sm:py-9">
        {/* Notebook Top Stamp & Date Line */}
        <div className="border-b-2 border-gray-300/80 pb-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold mb-1" style={{ fontFamily: 'var(--font-kalam, "Kalam", cursive)' }}>
                <GraduationCap className="w-4 h-4 text-indigo-700" />
                <span>Semester 5 University Examination · High-Yield Sheet</span>
              </div>
              <h1 
                className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight leading-tight"
                style={{ fontFamily: 'var(--font-caveat, "Caveat", cursive)' }}
              >
                {chapterName}
              </h1>
              <p 
                className="text-sm sm:text-base font-bold text-indigo-900 mt-0.5"
                style={{ fontFamily: 'var(--font-caveat, "Caveat", cursive)' }}
              >
                Subject: {subjectName}
              </p>
            </div>

            <div 
              className="text-right sm:text-right shrink-0 text-xs sm:text-sm text-gray-600 font-bold"
              style={{ fontFamily: 'var(--font-kalam, "Kalam", cursive)' }}
            >
              <div className="flex items-center sm:justify-end gap-1.5 text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Date: {currentDate}</span>
              </div>
              <span className="inline-block px-2.5 py-0.5 mt-1 rounded-md bg-amber-100 text-amber-900 text-xs font-black">
                Page 1 of 1 · Complete Summary
              </span>
            </div>
          </div>
        </div>

        {/* Inner Content */}
        {children}
      </div>
    </div>
  );
}

/* ─── Main RevisionSheetTab Component ─────────────────────────────────── */
export default function RevisionSheetTab({
  chapterId,
  chapterName,
  subjectName,
  revisionData,
  loading,
  isGenerating,
  errorMsg,
  isModuleCompleted,
  onGenerate,
}) {
  const printRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  /* 1 — Loading State */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-9 h-9 rounded-full border-4 border-gray-200 border-t-amber-500 animate-spin" />
        <p className="text-xs font-bold text-gray-600">Loading authentic handwritten revision sheet...</p>
      </div>
    );
  }

  /* 2 — Error State */
  if (errorMsg) {
    return (
      <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 flex flex-col items-center gap-3 text-center">
        <AlertCircle className="w-8 h-8 text-rose-500" />
        <p className="text-sm font-bold text-rose-800">{errorMsg}</p>
        <button
          onClick={() => onGenerate(false)}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl transition-all cursor-pointer shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Generating Sheet
        </button>
      </div>
    );
  }

  /* 3 — Not Yet Generated State */
  if (!revisionData) {
    return (
      <div className="flex flex-col items-center gap-5 py-16 text-center px-6 student-card bg-white">
        <div className="relative">
          <div className="w-18 h-18 rounded-3xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-4xl shadow-xs">
            📝
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 text-gray-950" />
          </div>
        </div>

        <div className="max-w-md">
          <h3 
            className="text-xl sm:text-2xl font-black text-gray-900 mb-1.5"
            style={{ fontFamily: 'var(--font-caveat, "Caveat", cursive)' }}
          >
            Handwritten 1-Page Revision Sheet
          </h3>
          <p 
            className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed"
            style={{ fontFamily: 'var(--font-kalam, "Kalam", cursive)' }}
          >
            Synthesize an authentic notebook-style cram sheet for <strong>{chapterName}</strong> with all mathematical derivations, KaTeX formulas, mnemonics, and university question patterns.
          </p>
        </div>

        <button
          onClick={() => onGenerate(false)}
          disabled={isGenerating}
          className="inline-flex items-center gap-2.5 py-3.5 px-8 rounded-2xl bg-amber-400 hover:bg-amber-500 text-gray-950 font-black text-xs sm:text-sm shadow-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating Handwritten Sheet...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Revision Sheet
            </>
          )}
        </button>
      </div>
    );
  }

  /* 4 — Render Full-Width Handwritten Sheet */
  const sheet = revisionData;

  return (
    <div className="space-y-4">
      {/* Top Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-lg shadow-xs">
            📝
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-gray-900 leading-tight">
              {chapterName} · Revision Sheet
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium">{subjectName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onGenerate(true)}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
            title="Regenerate this revision sheet with fresh insights"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            Regenerate
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-black shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Export clean 1-page printable revision document"
          >
            <Printer className="w-3.5 h-3.5 text-amber-300" />
            Print PDF
          </button>
        </div>
      </div>

      {/* The Printable Notebook Sheet Canvas */}
      <div ref={printRef} id="revision-sheet-print" className="w-full">
        <FullWidthNotebookPaper
          chapterName={chapterName}
          subjectName={subjectName}
        >
          {/* Section 1: Key Formulas & Relations (Rendered with KaTeX Math) */}
          {sheet.formulas && sheet.formulas.length > 0 && (
            <div className="mb-6">
              <StickyNote
                icon={Sigma}
                color="blue"
                label="📐 Key Formulas, Complexities & Mathematical Relations"
                items={sheet.formulas}
              />
            </div>
          )}

          {/* Section 2: Main Handwritten Body Markdown */}
          {sheet.summary_md && (
            <div
              className="mb-6 p-4 sm:p-5 rounded-2xl bg-white/70 border border-gray-200/60 shadow-2xs"
              style={{ fontFamily: 'var(--font-kalam, "Kalam", cursive)' }}
            >
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
                <Bookmark className="w-4 h-4 text-indigo-700" />
                <h2 
                  className="text-lg sm:text-xl font-black text-gray-900"
                  style={{ fontFamily: 'var(--font-caveat, "Caveat", cursive)' }}
                >
                  Core Concepts & Mathematical Derivations
                </h2>
              </div>

              <MarkdownRenderer
                content={renderWithMath(sheet.summary_md)}
                className="text-xs sm:text-sm leading-loose text-gray-800"
                components={{
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-base sm:text-lg font-black text-indigo-950 mt-4 mb-2 border-b border-gray-200 pb-1"
                      style={{ fontFamily: 'var(--font-caveat, "Caveat", cursive)' }}
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-sm sm:text-base font-bold text-gray-900 mt-3 mb-1"
                      style={{ fontFamily: 'var(--font-caveat, "Caveat", cursive)' }}
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className="text-xs sm:text-sm leading-relaxed text-gray-800 my-1.5"
                      style={{ fontFamily: 'var(--font-kalam, "Kalam", cursive)' }}
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li
                      className="text-xs sm:text-sm leading-relaxed my-1"
                      style={{ fontFamily: 'var(--font-kalam, "Kalam", cursive)' }}
                      {...props}
                    />
                  ),
                }}
              />
            </div>
          )}

          {/* Section 3: 2-Column Grid for Mnemonics & Exam Pitfalls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Mnemonics */}
            {sheet.mnemonics && sheet.mnemonics.length > 0 && (
              <StickyNote
                icon={Lightbulb}
                color="yellow"
                label="💡 Mnemonics & Memory Hooks"
                items={sheet.mnemonics}
              />
            )}

            {/* Pitfalls & Traps */}
            {sheet.pitfalls && sheet.pitfalls.length > 0 && (
              <StickyNote
                icon={AlertTriangle}
                color="pink"
                label="⚠️ Common Exam Pitfalls & Traps"
                items={sheet.pitfalls}
              />
            )}
          </div>

          {/* Section 4: High-Probability University Exam Questions */}
          {sheet.exam_questions && sheet.exam_questions.length > 0 && (
            <div className="mb-2">
              <StickyNote
                icon={CheckCircle2}
                color="green"
                label="🎯 High-Probability University Exam Questions"
                items={sheet.exam_questions}
              />
            </div>
          )}
        </FullWidthNotebookPaper>
      </div>
    </div>
  );
}
