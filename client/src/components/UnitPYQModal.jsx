import React from 'react';
import { X, FileText, CheckCircle2 } from 'lucide-react';
import UnitPYQSection from './UnitPYQSection';

export default function UnitPYQModal({
  isOpen,
  onClose,
  chapterId,
  chapterName,
  subjectId,
  subjectCode = 'DC',
  subjectName = 'Distributed Computing',
  onPyqCompleted,
  onNavigateToQuiz
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3 bg-gradient-to-r from-emerald-50/70 via-white to-amber-50/40 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black shadow-xs shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-lg bg-gray-900 text-white font-black text-[11px] tracking-wide">
                  {subjectCode}
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 font-extrabold text-[11px]">
                  Step 3/4 • PYQ Practice
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight truncate mt-0.5">
                {chapterName?.replace(/^Unit \d+:\s*/, '')} — Module PYQs
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <UnitPYQSection
            chapterId={chapterId}
            chapterName={chapterName}
            subjectId={subjectId}
            subjectCode={subjectCode}
            subjectName={subjectName}
            onPyqCompleted={(chId, resData) => {
              if (onPyqCompleted) onPyqCompleted(chId, resData);
            }}
            onNavigateToQuiz={(chId) => {
              onClose();
              if (onNavigateToQuiz) onNavigateToQuiz(chId);
            }}
          />
        </div>
      </div>
    </div>
  );
}
