import React, { useState, useEffect, useMemo } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  Target, 
  Sparkles, 
  ExternalLink, 
  BarChart3, 
  Code2, 
  Tag
} from 'lucide-react';

const TOTAL_LEETCODE = 4095;
const TOTAL_EASY = 974;
const TOTAL_MEDIUM = 2135;
const TOTAL_HARD = 986;

const POPULAR_LEETCODE_TOPICS = [
  { name: 'Array', total: 2273 },
  { name: 'String', total: 895 },
  { name: 'Hash Table', total: 843 },
  { name: 'Math', total: 710 },
  { name: 'Dynamic Programming', total: 684 },
  { name: 'Sorting', total: 540 },
  { name: 'Greedy', total: 483 },
  { name: 'Binary Search', total: 356 },
  { name: 'Depth-First Search', total: 349 },
  { name: 'Database', total: 310 },
  { name: 'Matrix', total: 285 },
  { name: 'Tree', total: 270 },
  { name: 'Two Pointers', total: 263 },
  { name: 'Graph Theory', total: 190 },
  { name: 'Stack', total: 182 },
  { name: 'Sliding Window', total: 175 }
];

export default function DsaProgressRail({ studentProfile, onNavigateTab }) {
  // Solved LeetCode Question IDs from localStorage (4,095 catalog)
  const [solvedIds, setSolvedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('examprep_leetcode_all_solved');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [1, 2, 3, 20, 21, 53, 70, 121, 141, 206, 226]; // Initial sample
  });

  // Synced LeetCode Profile Data (e.g. @Adesh_21)
  const [leetcodeData, setLeetcodeData] = useState(() => {
    try {
      const saved = localStorage.getItem('examprep_leetcode_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  // Problem metadata map: id -> { difficulty, tags }
  const [problemMap, setProblemMap] = useState(null);

  // Load problem metadata for accurate difficulty & topic mapping
  useEffect(() => {
    let isMounted = true;
    fetch('/data/leetcode_4095.json')
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        const map = new Map();
        data.forEach(p => {
          map.set(Number(p.id), {
            difficulty: p.difficulty,
            tags: p.tags || []
          });
        });
        setProblemMap(map);
      })
      .catch(err => {
        console.warn('Could not load /data/leetcode_4095.json for rail:', err);
      });

    return () => { isMounted = false; };
  }, []);

  // Listen for storage events or updates when user checks problems in LeetCode Tab
  useEffect(() => {
    const handleStorageUpdate = () => {
      try {
        const savedLCAll = localStorage.getItem('examprep_leetcode_all_solved');
        if (savedLCAll) setSolvedIds(JSON.parse(savedLCAll));
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

  // Calculate difficulty counts from solved questions
  const { solvedEasy, solvedMedium, solvedHard, topicSolvedCounts } = useMemo(() => {
    let easy = 0;
    let med = 0;
    let hard = 0;
    const tagCounts = {};

    if (problemMap) {
      solvedIds.forEach(id => {
        const info = problemMap.get(Number(id));
        if (info) {
          if (info.difficulty === 'Easy') easy++;
          else if (info.difficulty === 'Medium') med++;
          else if (info.difficulty === 'Hard') hard++;

          info.tags.forEach(t => {
            tagCounts[t] = (tagCounts[t] || 0) + 1;
          });
        }
      });
    }

    // Merge with synced live LeetCode handle counts if available and higher
    if (leetcodeData) {
      easy = Math.max(easy, leetcodeData.easy_solved || 0);
      med = Math.max(med, leetcodeData.medium_solved || 0);
      hard = Math.max(hard, leetcodeData.hard_solved || 0);
    }

    return {
      solvedEasy: easy,
      solvedMedium: med,
      solvedHard: hard,
      topicSolvedCounts: tagCounts
    };
  }, [solvedIds, problemMap, leetcodeData]);

  // Overall LeetCode Progress
  const totalCovered = Math.max(solvedIds.length, (solvedEasy + solvedMedium + solvedHard));
  const totalRemainder = Math.max(TOTAL_LEETCODE - totalCovered, 0);
  const overallPercent = Math.min(Math.round((totalCovered / TOTAL_LEETCODE) * 100), 100);

  const easyRemainder = Math.max(TOTAL_EASY - solvedEasy, 0);
  const mediumRemainder = Math.max(TOTAL_MEDIUM - solvedMedium, 0);
  const hardRemainder = Math.max(TOTAL_HARD - solvedHard, 0);

  const easyPct = Math.round((solvedEasy / TOTAL_EASY) * 100);
  const mediumPct = Math.round((solvedMedium / TOTAL_MEDIUM) * 100);
  const hardPct = Math.round((solvedHard / TOTAL_HARD) * 100);

  return (
    <aside className="w-84 bg-white border-l border-gray-200/80 p-4 flex flex-col gap-4 shrink-0 h-screen sticky top-0 overflow-y-auto scrollbar-thin">
      
      {/* 1. Header: LeetCode Practice Tracker */}
      <div className="pb-3 border-b border-gray-100 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-gray-950 font-black shadow-xs">
              ⚡
            </div>
            <div>
              <h3 className="font-black text-gray-950 text-xs tracking-tight">
                LeetCode Practice Tracker
              </h3>
              <p className="text-[10px] text-gray-400 font-semibold">
                Questions Covered & Remainder (4,095 Qs)
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
              / {TOTAL_LEETCODE}
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
            To clear library
          </p>
        </div>
      </div>

      {/* 3. Overall LeetCode Completion Bar */}
      <div className="p-3.5 rounded-2xl bg-[#F8F9FC] border border-gray-100 shrink-0">
        <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
          <span className="text-gray-600 text-[11px]">LeetCode Library Completion</span>
          <span className="text-amber-700 font-black">{totalCovered} of {TOTAL_LEETCODE} Solved</span>
        </div>
        <div className="w-full h-2.5 bg-gray-200/80 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(overallPercent, 0.5)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-gray-400 font-semibold mt-2">
          <span>{overallPercent}% finished</span>
          <span>{totalRemainder} questions to go</span>
        </div>
      </div>

      {/* 4. Question Difficulty Breakdown: EASY, MEDIUM, HARD (out of 4,095) */}
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
              <span className="text-[11px] font-semibold text-emerald-600">/ {TOTAL_EASY}</span>
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
              <span className="text-[11px] font-semibold text-orange-600">/ {TOTAL_MEDIUM}</span>
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
              <span className="text-[11px] font-semibold text-rose-600">/ {TOTAL_HARD}</span>
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

      {/* 6. Topic-Wise Coverage Mini Checklist */}
      <div className="space-y-2 pt-2 border-t border-gray-100 flex-1">
        <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 px-0.5 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-gray-400" />
          <span>Topic-Wise Coverage</span>
        </h4>

        <div className="space-y-1.5 overflow-y-auto max-h-56 pr-1 scrollbar-thin">
          {POPULAR_LEETCODE_TOPICS.map((topic) => {
            const solved = topicSolvedCounts[topic.name] || 0;
            const pct = Math.round((solved / topic.total) * 100);

            return (
              <div 
                key={topic.name}
                className="p-2 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 border border-gray-100 transition-colors flex items-center justify-between text-xs"
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-gray-800 text-[11px] truncate">
                      {topic.name}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        pct === 100 ? 'bg-emerald-500' : pct > 0 ? 'bg-amber-400' : 'bg-transparent'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <span className="text-[10px] font-black text-gray-500 shrink-0">
                  {solved}/{topic.total}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </aside>
  );
}
