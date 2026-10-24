import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Sparkles, 
  Search, 
  Filter, 
  BookOpen, 
  Flame, 
  Award,
  Layers,
  Lightbulb,
  Check
} from 'lucide-react';
import { STRIVER_STEPS } from '../../data/striverSheetData';

export default function StriverSheetTab({ solvedIds, onToggleSolved, onSelectHint }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [openSteps, setOpenSteps] = useState({ 1: true, 2: true, 3: true }); // Step 1, 2, 3 open by default

  const toggleStep = (stepNumber) => {
    setOpenSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const expandAll = () => {
    const all = {};
    STRIVER_STEPS.forEach(s => { all[s.step] = true; });
    setOpenSteps(all);
  };

  const collapseAll = () => {
    setOpenSteps({});
  };

  // Calculate total problems across all Striver steps
  let totalStriverProblems = 0;
  let totalSolvedStriver = 0;

  STRIVER_STEPS.forEach(s => {
    s.topics.forEach(t => {
      t.problems.forEach(p => {
        totalStriverProblems++;
        if (solvedIds.includes(p.id)) {
          totalSolvedStriver++;
        }
      });
    });
  });

  const completionPercent = Math.round((totalSolvedStriver / Math.max(totalStriverProblems, 1)) * 100);

  return (
    <div className="space-y-6">
      {/* 1. Header Overview & Progress Bar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-300/40 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-gray-950 font-black text-[11px] shadow-2xs">
              STRUCTURED ROADMAP
            </span>
            <span className="text-xs font-extrabold text-gray-500">
              Topic-Wise Question Sequence
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            DSA Sheet ⚡
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Master algorithmic problem solving step-by-step from language basics to Dynamic Programming & Graphs.
          </p>
        </div>

        {/* DSA Sheet Completion Stats */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs min-w-[240px]">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-gray-500">DSA Sheet Completion</span>
            <span className="text-amber-600 font-black text-sm">{completionPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-400 rounded-full transition-all duration-300"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-400 font-semibold mt-2 text-right">
            {totalSolvedStriver} of {totalStriverProblems} Problems Solved
          </p>
        </div>
      </div>

      {/* 2. Controls Toolbar: Search, Difficulty Filters & Accordion Expanders */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems, patterns, or companies (e.g. Kadane, Two Sum, Google)..."
            className="w-full bg-white border border-gray-200 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-400 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
          {/* Difficulty Filter */}
          <div className="bg-gray-100 p-1 rounded-xl flex items-center gap-1 border border-gray-200/60">
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-white text-gray-950 shadow-2xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Quick Accordion Toggles */}
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold transition-colors shadow-2xs"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold transition-colors shadow-2xs"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* 3. Steps Accordion List */}
      <div className="space-y-4">
        {STRIVER_STEPS.map((stepItem) => {
          const isOpen = openSteps[stepItem.step] || Boolean(searchQuery.trim());

          // Count step problems and step solved
          let stepTotal = 0;
          let stepSolved = 0;
          stepItem.topics.forEach(t => {
            t.problems.forEach(p => {
              stepTotal++;
              if (solvedIds.includes(p.id)) stepSolved++;
            });
          });

          // Filter problems within step
          const filteredTopics = stepItem.topics.map(topic => {
            const matchingProblems = topic.problems.filter(p => {
              const matchDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
              const matchSearch = !searchQuery.trim() ||
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.hint && p.hint.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (p.companies && p.companies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())));
              return matchDifficulty && matchSearch;
            });
            return {
              ...topic,
              problems: matchingProblems
            };
          }).filter(t => t.problems.length > 0);

          if (searchQuery.trim() && filteredTopics.length === 0) {
            return null;
          }

          return (
            <div 
              key={stepItem.step}
              className="bg-white rounded-3xl border border-gray-200/90 shadow-xs overflow-hidden transition-all"
            >
              {/* Step Header Toggle */}
              <div
                onClick={() => toggleStep(stepItem.step)}
                className="p-5 sm:p-6 bg-white hover:bg-gray-50/70 transition-colors cursor-pointer flex items-center justify-between gap-4 select-none"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-2xs ${
                    stepSolved === stepTotal && stepTotal > 0
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-300 text-gray-950'
                  }`}>
                    {stepSolved === stepTotal && stepTotal > 0 ? (
                      <Check className="w-5 h-5 stroke-[3]" />
                    ) : (
                      stepItem.step
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-black text-gray-900 tracking-tight">
                        {stepItem.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold">
                        {stepSolved}/{stepTotal} Solved
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium truncate mt-0.5">
                      {stepItem.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:block w-28 bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-400 h-full rounded-full transition-all"
                      style={{ width: `${Math.round((stepSolved / Math.max(stepTotal, 1)) * 100)}%` }}
                    />
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Step Content: Topics and Problems */}
              {isOpen && (
                <div className="p-5 sm:p-6 pt-0 border-t border-gray-100 space-y-5 bg-[#FAFAFC]/50">
                  {filteredTopics.map((topic, tIdx) => (
                    <div key={tIdx} className="space-y-2.5">
                      <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider pt-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{topic.name}</span>
                        <span className="text-[10px] text-gray-400 font-bold lowercase">
                          ({topic.problems.length} problems)
                        </span>
                      </h4>

                      <div className="space-y-2">
                        {topic.problems.map((prob) => {
                          const isSolved = solvedIds.includes(prob.id);
                          const diffColor = 
                            prob.difficulty === 'Easy' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
                            prob.difficulty === 'Medium' ? 'text-orange-700 bg-orange-50 border-orange-200' :
                            'text-rose-700 bg-rose-50 border-rose-200';

                          return (
                            <div
                              key={prob.id}
                              className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                isSolved 
                                  ? 'bg-emerald-50/40 border-emerald-200/90' 
                                  : 'bg-white hover:bg-gray-50 border-gray-200/70 shadow-3xs'
                              }`}
                            >
                              {/* Left: Checkbox + Title + Meta */}
                              <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                                <button
                                  type="button"
                                  onClick={() => onToggleSolved(prob.id)}
                                  className="mt-0.5 sm:mt-0 text-gray-400 hover:text-emerald-600 transition-colors shrink-0"
                                  title={isSolved ? "Mark as unsolved" : "Mark as solved"}
                                >
                                  {isSolved ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-gray-300 hover:text-gray-500" />
                                  )}
                                </button>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <a
                                      href={prob.leetcode_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`text-xs sm:text-sm font-extrabold hover:text-amber-600 transition-colors flex items-center gap-1.5 group/title ${
                                        isSolved ? 'line-through text-gray-400 hover:text-gray-600' : 'text-gray-900'
                                      }`}
                                      title={`Open "${prob.title}" on LeetCode`}
                                    >
                                      <span>{prob.title}</span>
                                      <ExternalLink className="w-3 h-3 text-gray-400 group-hover/title:text-amber-500 opacity-60 group-hover/title:opacity-100 transition-all" />
                                    </a>

                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black border ${diffColor}`}>
                                      {prob.difficulty}
                                    </span>
                                  </div>

                                  {/* Company Badges & Hint Preview */}
                                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    {prob.companies && prob.companies.map((comp, cIdx) => (
                                      <span
                                        key={cIdx}
                                        className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600"
                                      >
                                        {comp}
                                      </span>
                                    ))}
                                    {prob.hint && (
                                      <span className="text-[11px] text-gray-400 font-medium truncate max-w-sm hidden md:inline-block">
                                        💡 {prob.hint}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Right: Hint + LeetCode Link */}
                              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                {prob.hint && (
                                  <button
                                    type="button"
                                    onClick={() => onSelectHint(prob)}
                                    className="px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-amber-50 hover:border-amber-200 text-xs font-bold text-gray-600 hover:text-amber-800 transition-colors flex items-center gap-1"
                                    title="View problem approach hint"
                                  >
                                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                    <span>Hint</span>
                                  </button>
                                )}

                                <a
                                  href={prob.leetcode_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  className="px-3.5 py-1.5 rounded-xl bg-gray-950 hover:bg-[#FFA116] hover:text-gray-950 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-2xs group"
                                  title={`Solve "${prob.title}" directly on LeetCode`}
                                >
                                  <span>Solve on LeetCode</span>
                                  <ExternalLink className="w-3 h-3 text-amber-300 group-hover:text-gray-950 transition-colors" />
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
