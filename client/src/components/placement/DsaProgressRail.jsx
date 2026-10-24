import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Target, 
  Sparkles, 
  Layers, 
  ExternalLink, 
  RefreshCw,
  TrendingUp,
  BarChart3,
  Code2,
  ChevronRight
} from 'lucide-react';
import { STRIVER_STEPS } from '../../data/striverSheetData';

export default function DsaProgressRail({ studentProfile, onNavigateTab }) {
  // Solved IDs from localStorage
  const [solvedIds, setSolvedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('examprep_striver_solved');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ["s1_4", "s1_6", "s1_14", "s2_1", "s3_1", "s3_11", "s3_14", "s6_4"];
  });

  // Synced LeetCode Data from localStorage
  const [leetcodeData, setLeetcodeData] = useState(() => {
    try {
      const saved = localStorage.getItem('examprep_leetcode_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const [activeView, setActiveView] = useState('sheet'); // 'sheet' | 'leetcode'

  // Listen for storage events or custom updates when user checks problems in DSA Sheet
  useEffect(() => {
    const handleStorageUpdate = () => {
      try {
        const savedSolved = localStorage.getItem('examprep_striver_solved');
        if (savedSolved) setSolvedIds(JSON.parse(savedSolved));
        const savedLC = localStorage.getItem('examprep_leetcode_data');
        if (savedLC) setLeetcodeData(JSON.parse(savedLC));
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener('examprep_dsa_solved_changed', handleStorageUpdate);
    const interval = setInterval(handleStorageUpdate, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('examprep_dsa_solved_changed', handleStorageUpdate);
      clearInterval(interval);
    };
  }, []);

  // Compute total, easy, medium, hard counts across DSA Sheet
  let totalSheetProblems = 0;
  let totalEasy = 0;
  let totalMedium = 0;
  let totalHard = 0;

  let solvedEasy = 0;
  let solvedMedium = 0;
  let solvedHard = 0;

  const topicProgress = [];

  STRIVER_STEPS.forEach((step) => {
    let stepTotal = 0;
    let stepSolved = 0;

    step.topics.forEach((t) => {
      t.problems.forEach((p) => {
        totalSheetProblems++;
        stepTotal++;

        const isSolved = solvedIds.includes(p.id);
        if (isSolved) stepSolved++;

        if (p.difficulty === 'Easy') {
          totalEasy++;
          if (isSolved) solvedEasy++;
        } else if (p.difficulty === 'Medium') {
          totalMedium++;
          if (isSolved) solvedMedium++;
        } else if (p.difficulty === 'Hard') {
          totalHard++;
          if (isSolved) solvedHard++;
        }
      });
    });

    topicProgress.push({
      step: step.step,
      title: step.title.replace(/^Step \d+:\s*/, ''),
      total: stepTotal,
      solved: stepSolved,
      pct: Math.round((stepSolved / Math.max(stepTotal, 1)) * 100)
    });
  });

  const totalCovered = solvedIds.length;
  const totalRemainder = Math.max(totalSheetProblems - totalCovered, 0);
  const overallPercent = Math.round((totalCovered / Math.max(totalSheetProblems, 1)) * 100);

  const easyRemainder = Math.max(totalEasy - solvedEasy, 0);
  const mediumRemainder = Math.max(totalMedium - solvedMedium, 0);
  const hardRemainder = Math.max(totalHard - solvedHard, 0);

  const easyPct = Math.round((solvedEasy / Math.max(totalEasy, 1)) * 100);
  const mediumPct = Math.round((solvedMedium / Math.max(totalMedium, 1)) * 100);
  const hardPct = Math.round((solvedHard / Math.max(totalHard, 1)) * 100);

  // LeetCode stats fallback
  const lcTotal = leetcodeData?.total_solved || totalCovered;
  const lcEasy = leetcodeData?.easy_solved || solvedEasy;
  const lcMed = leetcodeData?.medium_solved || solvedMedium;
  const lcHard = leetcodeData?.hard_solved || solvedHard;

  return (
    <aside className="w-84 bg-white border-l border-gray-200/80 p-4 flex flex-col gap-4 shrink-0 h-screen sticky top-0 overflow-y-auto scrollbar-thin">
      
      {/* 1. Header: DSA & Placement Tracker */}
      <div className="pb-3 border-b border-gray-100 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-gray-950 font-black shadow-xs">
              ⚡
            </div>
            <div>
              <h3 className="font-black text-gray-950 text-xs tracking-tight">
                DSA Practice Tracker
              </h3>
              <p className="text-[10px] text-gray-400 font-semibold">
                Questions Covered & Remainder
              </p>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black border border-amber-200">
            {overallPercent}% Complete
          </span>
        </div>
      </div>

      {/* 2. Top Metric Cards: Questions Covered Till Date & Questions Remainder */}
      <div className="grid grid-cols-2 gap-2.5 shrink-0">
        {/* Covered Till Date */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-white border border-emerald-200/80 relative overflow-hidden shadow-3xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
              Covered
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl font-black text-emerald-700 tracking-tight">
              {totalCovered}
            </span>
            <span className="text-[11px] font-bold text-emerald-600/80">
              / {totalSheetProblems}
            </span>
          </div>
          <p className="text-[10px] font-semibold text-emerald-700 mt-1">
            Solved till date
          </p>
        </div>

        {/* Remainder Left */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 via-amber-50/50 to-white border border-amber-200/80 relative overflow-hidden shadow-3xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800">
              Remainder
            </span>
            <Target className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl font-black text-amber-800 tracking-tight">
              {totalRemainder}
            </span>
            <span className="text-[11px] font-bold text-amber-600">
              Left
            </span>
          </div>
          <p className="text-[10px] font-semibold text-amber-700 mt-1">
            To clear sheet
          </p>
        </div>
      </div>

      {/* 3. Overall Sheet Completion Bar */}
      <div className="p-3.5 rounded-2xl bg-[#F8F9FC] border border-gray-100 shrink-0">
        <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
          <span className="text-gray-600 text-[11px]">Roadmap Completion</span>
          <span className="text-amber-700 font-black">{totalCovered} of {totalSheetProblems} Solved</span>
        </div>
        <div className="w-full h-2.5 bg-gray-200/80 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-gray-400 font-semibold mt-2">
          <span>{overallPercent}% finished</span>
          <span>{totalRemainder} questions to go</span>
        </div>
      </div>

      {/* 4. Question Difficulty Breakdown: EASY, MEDIUM, HARD */}
      <div className="space-y-3 shrink-0">
        <div className="flex items-center justify-between px-0.5">
          <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-gray-400" />
            <span>Difficulty Breakdown</span>
          </h4>
          <span className="text-[10px] font-bold text-gray-400">
            Solved • Left
          </span>
        </div>

        {/* EASY CARD */}
        <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-2 hover:bg-emerald-50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-black text-emerald-950">
                Easy Questions
              </span>
            </div>
            <div className="flex items-baseline gap-1 text-xs">
              <span className="font-black text-emerald-800">{solvedEasy}</span>
              <span className="text-[11px] font-semibold text-emerald-600">/ {totalEasy}</span>
              <span className="text-[10px] font-bold text-gray-400 ml-1">
                ({easyRemainder} left)
              </span>
            </div>
          </div>
          
          <div className="w-full h-2 bg-emerald-200/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${easyPct}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-semibold text-emerald-700">
            <span>Fundamentals & Syntax</span>
            <span className="font-extrabold">{easyPct}% covered</span>
          </div>
        </div>

        {/* MEDIUM CARD */}
        <div className="p-3 rounded-2xl bg-orange-50/50 border border-orange-200/70 space-y-2 hover:bg-orange-50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span className="text-xs font-black text-orange-950">
                Medium Questions
              </span>
            </div>
            <div className="flex items-baseline gap-1 text-xs">
              <span className="font-black text-orange-800">{solvedMedium}</span>
              <span className="text-[11px] font-semibold text-orange-600">/ {totalMedium}</span>
              <span className="text-[10px] font-bold text-gray-400 ml-1">
                ({mediumRemainder} left)
              </span>
            </div>
          </div>
          
          <div className="w-full h-2 bg-orange-200/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${mediumPct}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-semibold text-orange-700">
            <span>Interview Core & Patterns</span>
            <span className="font-extrabold">{mediumPct}% covered</span>
          </div>
        </div>

        {/* HARD CARD */}
        <div className="p-3 rounded-2xl bg-rose-50/50 border border-rose-200/70 space-y-2 hover:bg-rose-50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="text-xs font-black text-rose-950">
                Hard Questions
              </span>
            </div>
            <div className="flex items-baseline gap-1 text-xs">
              <span className="font-black text-rose-800">{solvedHard}</span>
              <span className="text-[11px] font-semibold text-rose-600">/ {totalHard}</span>
              <span className="text-[10px] font-bold text-gray-400 ml-1">
                ({hardRemainder} left)
              </span>
            </div>
          </div>
          
          <div className="w-full h-2 bg-rose-200/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-rose-500 rounded-full transition-all duration-300"
              style={{ width: `${hardPct}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-semibold text-rose-700">
            <span>Top Product Companies</span>
            <span className="font-extrabold">{hardPct}% covered</span>
          </div>
        </div>
      </div>

      {/* 5. LeetCode Profile Live Snapshot */}
      {leetcodeData ? (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-gray-900 to-[#1E2030] text-white shrink-0 shadow-md border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FFA116]/20 border border-[#FFA116]/40 flex items-center justify-center font-black text-[#FFA116] text-xs">
                ⚡
              </div>
              <div>
                <span className="text-xs font-black text-white block leading-tight">
                  @{leetcodeData.username}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  Rank #{Number(leetcodeData.ranking || 120000).toLocaleString()}
                </span>
              </div>
            </div>
            <a
              href={leetcodeData.profile_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              title="Open LeetCode Profile"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center pt-2 border-t border-white/10 text-xs">
            <div className="bg-white/5 rounded-xl p-1.5">
              <span className="text-[9px] uppercase font-bold text-emerald-400 block">Easy</span>
              <span className="font-black text-white">{leetcodeData.easy_solved || 0}</span>
            </div>
            <div className="bg-white/5 rounded-xl p-1.5">
              <span className="text-[9px] uppercase font-bold text-orange-400 block">Med</span>
              <span className="font-black text-white">{leetcodeData.medium_solved || 0}</span>
            </div>
            <div className="bg-white/5 rounded-xl p-1.5">
              <span className="text-[9px] uppercase font-bold text-rose-400 block">Hard</span>
              <span className="font-black text-white">{leetcodeData.hard_solved || 0}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/80 shrink-0 text-center">
          <p className="text-xs font-extrabold text-amber-950">Link Your LeetCode Account</p>
          <p className="text-[10px] text-amber-800 font-medium mt-0.5">
            Sync total solved counts from LeetCode directly into this panel.
          </p>
        </div>
      )}

      {/* 6. Step-by-Step Topic Coverage Mini Checklist */}
      <div className="space-y-2 pt-2 border-t border-gray-100 flex-1">
        <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 px-0.5">
          Topic-Wise Coverage
        </h4>

        <div className="space-y-1.5 overflow-y-auto max-h-56 pr-1 scrollbar-thin">
          {topicProgress.map((tp) => (
            <div 
              key={tp.step}
              className="p-2 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 border border-gray-100 transition-colors flex items-center justify-between text-xs"
            >
              <div className="min-w-0 flex-1 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-md bg-white border border-gray-200 flex items-center justify-center text-[10px] font-black text-gray-700 shrink-0">
                    {tp.step}
                  </span>
                  <span className="font-bold text-gray-800 text-[11px] truncate">
                    {tp.title}
                  </span>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      tp.pct === 100 ? 'bg-emerald-500' : tp.pct > 0 ? 'bg-amber-400' : 'bg-transparent'
                    }`}
                    style={{ width: `${tp.pct}%` }}
                  />
                </div>
              </div>

              <span className="text-[10px] font-black text-gray-500 shrink-0">
                {tp.solved}/{tp.total}
              </span>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
}
