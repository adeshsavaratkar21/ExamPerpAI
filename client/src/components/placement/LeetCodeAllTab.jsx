import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Filter, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  Lock, 
  Unlock, 
  Flame, 
  Layers, 
  Code2, 
  Tag, 
  Lightbulb, 
  X,
  ArrowUpDown
} from 'lucide-react';
import api from '../../services/api';

const TOP_TAGS = [
  'All Tags',
  'Array',
  'String',
  'Hash Table',
  'Dynamic Programming',
  'Math',
  'Sorting',
  'Greedy',
  'Depth-First Search',
  'Binary Search',
  'Database',
  'Bit Manipulation',
  'Matrix',
  'Tree',
  'Two Pointers',
  'Breadth-First Search',
  'Heap (Priority Queue)',
  'Binary Tree',
  'Stack',
  'Prefix Sum',
  'Graph Theory',
  'Sliding Window',
  'Backtracking',
  'Linked List',
  'Recursion',
  'Trie',
  'Divide and Conquer',
  'Union Find'
];

export default function LeetCodeAllTab({ onSelectHint }) {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All Tags');
  const [selectedAccess, setSelectedAccess] = useState('All'); // 'All' | 'Free' | 'Premium'
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Solved' | 'Unsolved'
  const [jumpId, setJumpId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [selectedProblemForHint, setSelectedProblemForHint] = useState(null);

  // Solved state tracking persisted in localStorage
  const [solvedSet, setSolvedSet] = useState(() => {
    try {
      const saved = localStorage.getItem('examprep_leetcode_all_solved');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
    return new Set([1, 2, 3, 20, 21, 53, 70, 121, 141, 206, 226]); // Popular starter solved items
  });

  // Load all 4,095 problems
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        // Try direct public asset fetch first (instant & zero backend overhead)
        const res = await fetch('/data/leetcode_4095.json');
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setProblems(data);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Public fetch failed, falling back to backend API:', e);
      }

      // Fallback: Backend API
      try {
        const apiRes = await api.getLeetCodeAllProblems({ full: true });
        if (apiRes.data && apiRes.data.problems && isMounted) {
          setProblems(apiRes.data.problems);
        }
      } catch (err) {
        console.error('Failed to load all LeetCode problems:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, []);

  // Toggle solved status
  const toggleSolved = (id) => {
    setSolvedSet(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem('examprep_leetcode_all_solved', JSON.stringify(Array.from(next)));
      window.dispatchEvent(new Event('examprep_dsa_solved_changed'));
      return next;
    });
  };

  // Jump directly to a question ID
  const handleJump = (e) => {
    e.preventDefault();
    const clean = jumpId.trim();
    if (!clean) return;
    setSearchQuery(clean);
    setCurrentPage(1);
  };

  // Filter & Search
  const filteredProblems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return problems.filter(p => {
      // 1. Search Query (ID, Title, or Tag)
      if (q) {
        const idMatch = String(p.id).toLowerCase() === q || String(p.id).includes(q);
        const titleMatch = p.title && p.title.toLowerCase().includes(q);
        const tagMatch = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
        if (!idMatch && !titleMatch && !tagMatch) return false;
      }

      // 2. Difficulty
      if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) {
        return false;
      }

      // 3. Access (Free vs Premium)
      if (selectedAccess === 'Free' && p.paid) return false;
      if (selectedAccess === 'Premium' && !p.paid) return false;

      // 4. Topic Tag
      if (selectedTag !== 'All Tags') {
        if (!p.tags || !p.tags.includes(selectedTag)) return false;
      }

      // 5. Solved Status
      const isSolved = solvedSet.has(p.id);
      if (statusFilter === 'Solved' && !isSolved) return false;
      if (statusFilter === 'Unsolved' && isSolved) return false;

      return true;
    });
  }, [problems, searchQuery, selectedDifficulty, selectedAccess, selectedTag, statusFilter, solvedSet]);

  // Pagination calculation
  const totalItems = filteredProblems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedProblems = useMemo(() => {
    const start = (validCurrentPage - 1) * pageSize;
    return filteredProblems.slice(start, start + pageSize);
  }, [filteredProblems, validCurrentPage, pageSize]);

  // Overall counts for summary pills
  const totalSolvedCount = solvedSet.size;
  const completionPercentage = problems.length > 0 
    ? Math.round((totalSolvedCount / problems.length) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Progress */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-300/40 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-gray-950 font-black text-[11px] shadow-2xs">
              OFFICIAL LEETCODE REPOSITORY
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-gray-900 text-amber-300 font-black text-[11px] shadow-2xs">
              4,095 QUESTIONS
            </span>
            <span className="text-xs font-extrabold text-gray-500">
              Complete Worldwide Problemset
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            LeetCode ⚡
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1 max-w-2xl">
            Every official problem from #1 Two Sum up to #4,095, categorized by difficulty, real-time acceptance rate, and algorithmic topic tags with direct solving links.
          </p>
        </div>

        {/* Global Progress Indicator */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs min-w-[240px] shrink-0">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-gray-500">Solved Out Of 4,095</span>
            <span className="text-amber-600 font-black text-sm">
              {totalSolvedCount} / 4,095 ({completionPercentage}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(completionPercentage, 1)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 mt-2">
            <span>Easy: 974</span>
            <span>Med: 2,135</span>
            <span>Hard: 986</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Control Bar: Search, Jump, Filters */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Main Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by problem # (e.g. 1, 4095), title (e.g. Two Sum), or topic..."
              className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs sm:text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200/50 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Jump to Problem Number */}
          <form onSubmit={handleJump} className="flex items-center gap-2">
            <div className="relative">
              <input
                type="number"
                min="1"
                max="4095"
                value={jumpId}
                onChange={(e) => setJumpId(e.target.value)}
                placeholder="Jump to # (e.g. 150)"
                className="w-36 px-3 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2.5 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Go
            </button>
          </form>

          {/* Items Per Page */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold self-end md:self-auto">
            <span>Show:</span>
            {[25, 50, 100].map(size => (
              <button
                key={size}
                onClick={() => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                  pageSize === size
                    ? 'bg-amber-400 text-gray-950 shadow-2xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Row: Difficulty, Access, Tags, Solved Status */}
        <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-gray-100 text-xs font-bold">
          {/* Difficulty Chips */}
          <span className="text-gray-400 text-[11px] uppercase tracking-wider mr-1">Difficulty:</span>
          {[
            { label: 'All (4,095)', val: 'All' },
            { label: 'Easy (974)', val: 'Easy', color: 'emerald' },
            { label: 'Medium (2,135)', val: 'Medium', color: 'amber' },
            { label: 'Hard (986)', val: 'Hard', color: 'rose' }
          ].map(d => (
            <button
              key={d.val}
              onClick={() => {
                setSelectedDifficulty(d.val);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedDifficulty === d.val
                  ? 'bg-gray-950 text-white shadow-2xs'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {d.label}
            </button>
          ))}

          <span className="w-px h-4 bg-gray-200 mx-1" />

          {/* Access Filter (Free vs Premium) */}
          <span className="text-gray-400 text-[11px] uppercase tracking-wider mr-1">Access:</span>
          {['All', 'Free', 'Premium'].map(acc => (
            <button
              key={acc}
              onClick={() => {
                setSelectedAccess(acc);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedAccess === acc
                  ? 'bg-amber-400 text-gray-950 shadow-2xs'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {acc === 'Free' ? 'Free (3,308)' : acc === 'Premium' ? 'Premium (787)' : 'All Access'}
            </button>
          ))}

          <span className="w-px h-4 bg-gray-200 mx-1" />

          {/* Solved Status */}
          <span className="text-gray-400 text-[11px] uppercase tracking-wider mr-1">Status:</span>
          {['All', 'Solved', 'Unsolved'].map(st => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                statusFilter === st
                  ? 'bg-amber-400 text-gray-950 shadow-2xs'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {st}
            </button>
          ))}

          <span className="w-px h-4 bg-gray-200 mx-1" />

          {/* Topic Tags Dropdown */}
          <div className="flex items-center gap-1.5 ml-auto">
            <Tag className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={selectedTag}
              onChange={(e) => {
                setSelectedTag(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-amber-400"
            >
              {TOP_TAGS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. Problems List & Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        {/* Table Header Bar */}
        <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-200/70 flex items-center justify-between text-xs font-bold text-gray-500">
          <div className="flex items-center gap-3">
            <span className="w-6 text-center">Status</span>
            <span className="w-16"># ID</span>
            <span>Problem Title & Concept</span>
          </div>
          <div className="hidden sm:flex items-center gap-8">
            <span className="w-20 text-center">Difficulty</span>
            <span className="w-20 text-center">Acceptance</span>
            <span className="w-24 text-right pr-4">Action</span>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-10 h-10 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-gray-700">Loading complete 4,095 LeetCode problem library...</p>
            <p className="text-xs text-gray-400">Indexed with difficulty ratings, acceptance rates, and algorithmic tags.</p>
          </div>
        ) : paginatedProblems.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <p className="text-sm font-bold text-gray-700">No problems match your current search or filters.</p>
            <p className="text-xs text-gray-400">Try clearing your search query or setting the difficulty to "All".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('All');
                setSelectedTag('All Tags');
                setSelectedAccess('All');
                setStatusFilter('All');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-amber-400 text-gray-950 text-xs font-black shadow-xs hover:bg-amber-300 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {paginatedProblems.map((prob) => {
              const isSolved = solvedSet.has(prob.id);

              return (
                <div
                  key={prob.id}
                  className={`px-6 py-3.5 flex items-center justify-between gap-4 transition-colors hover:bg-amber-50/30 ${
                    isSolved ? 'bg-emerald-50/20' : ''
                  }`}
                >
                  {/* Left: Checkbox, ID, Title, Tags */}
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    {/* Mark Solved Checkbox */}
                    <button
                      onClick={() => toggleSolved(prob.id)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                        isSolved
                          ? 'bg-emerald-500 text-white shadow-2xs'
                          : 'border-2 border-gray-300 hover:border-amber-400 bg-white text-transparent'
                      }`}
                      title={isSolved ? "Mark as Unsolved" : "Mark as Solved"}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    {/* ID */}
                    <span className="w-16 font-mono text-xs font-bold text-gray-400 shrink-0">
                      #{prob.id}
                    </span>

                    {/* Title & Metadata */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href={prob.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs sm:text-sm font-extrabold hover:text-amber-600 transition-colors flex items-center gap-1.5 ${
                            isSolved ? 'text-gray-500 line-through decoration-emerald-500/60' : 'text-gray-900'
                          }`}
                        >
                          <span className="truncate">{prob.title}</span>
                          <ExternalLink className="w-3 h-3 text-gray-400 hover:text-amber-600 shrink-0" />
                        </a>

                        {/* Paid Lock Badge */}
                        {prob.paid && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-black flex items-center gap-0.5">
                            <Lock className="w-2.5 h-2.5" />
                            Premium
                          </span>
                        )}
                      </div>

                      {/* Topic Tags */}
                      {prob.tags && prob.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          {prob.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              onClick={() => {
                                setSelectedTag(tag);
                                setCurrentPage(1);
                              }}
                              className="px-2 py-0.5 rounded-md bg-gray-100 hover:bg-amber-100 text-gray-600 hover:text-amber-900 text-[10px] font-bold cursor-pointer transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                          {prob.tags.length > 3 && (
                            <span 
                              className="text-[10px] text-gray-400 font-bold"
                              title={prob.tags.slice(3).join(', ')}
                            >
                              +{prob.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Difficulty, Acceptance, Actions */}
                  <div className="flex items-center gap-4 sm:gap-8 shrink-0">
                    {/* Difficulty Badge */}
                    <div className="w-20 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-black inline-block ${
                        prob.difficulty === 'Easy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : prob.difficulty === 'Medium'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {prob.difficulty}
                      </span>
                    </div>

                    {/* Acceptance Rate */}
                    <div className="hidden sm:block w-20 text-center font-mono text-xs font-bold text-gray-500">
                      {prob.acceptance || '--'}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {/* AI Hint Trigger */}
                      <button
                        onClick={() => setSelectedProblemForHint(prob)}
                        className="p-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors"
                        title="AI Approach & Hint"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>

                      {/* Solve on LeetCode Link */}
                      <a
                        href={prob.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-black text-xs flex items-center gap-1 shadow-2xs transition-colors"
                      >
                        <span>Solve</span>
                        <ExternalLink className="w-3 h-3 text-amber-300" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. Pagination Footer */}
        <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-gray-500">
          <div>
            Showing <span className="text-gray-900">{totalItems === 0 ? 0 : (validCurrentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="text-gray-900">{Math.min(validCurrentPage * pageSize, totalItems)}</span> of{' '}
            <span className="text-gray-900 font-black">{totalItems.toLocaleString()}</span> questions
          </div>

          <div className="flex items-center gap-1.5">
            {/* First Page */}
            <button
              disabled={validCurrentPage === 1}
              onClick={() => setCurrentPage(1)}
              className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 transition-colors"
              title="First Page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            {/* Prev Page */}
            <button
              disabled={validCurrentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 transition-colors"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Indicator */}
            <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-gray-900 font-extrabold">
              Page {validCurrentPage} of {totalPages}
            </span>

            {/* Next Page */}
            <button
              disabled={validCurrentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 transition-colors"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Last Page */}
            <button
              disabled={validCurrentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 transition-colors"
              title="Last Page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. AI Hint & Concept Modal */}
      {selectedProblemForHint && (
        <div className="fixed inset-0 z-50 bg-gray-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-300 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-400 text-gray-950 font-black">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                    PROBLEM #{selectedProblemForHint.id}
                  </span>
                  <h3 className="text-base font-black text-gray-900">
                    {selectedProblemForHint.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedProblemForHint(null)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  selectedProblemForHint.difficulty === 'Easy'
                    ? 'bg-emerald-100 text-emerald-800'
                    : selectedProblemForHint.difficulty === 'Medium'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {selectedProblemForHint.difficulty}
                </span>
                <span className="text-xs font-bold text-gray-600">
                  Acceptance: {selectedProblemForHint.acceptance}
                </span>
              </div>
              <p className="text-xs text-gray-700 font-medium leading-relaxed">
                <strong>Algorithmic Focus:</strong> {selectedProblemForHint.tags?.join(', ') || 'General Problem Solving'}.
              </p>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                💡 <strong>Strategy:</strong> Consider time complexity constraints first. For {selectedProblemForHint.tags?.[0] || 'this problem'}, check if a hash map, two-pointer pass, or sliding window can reduce an O(N²) brute-force solution to optimal O(N) or O(N log N).
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedProblemForHint(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50"
              >
                Close
              </button>
              <a
                href={selectedProblemForHint.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-gray-950 text-white text-xs font-black flex items-center gap-1.5 hover:bg-gray-800 shadow-xs"
              >
                <span>Open on LeetCode</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
