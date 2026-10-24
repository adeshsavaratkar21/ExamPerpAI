import React, { useState } from 'react';
import { 
  Network, 
  Cpu, 
  Database, 
  Boxes, 
  Code, 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  FileText,
  Search,
  ExternalLink
} from 'lucide-react';
import { CORE_SUBJECTS_DATA } from '../../data/coreSubjectsData';
import AdvancedTopicVisual from './AdvancedTopicVisual';

const SUBJECT_LIST = [
  { id: 'ccn', label: 'CCN (Computer Networks)', icon: Network, code: 'CCN' },
  { id: 'os', label: 'OS (Operating Systems)', icon: Cpu, code: 'OS' },
  { id: 'dbms', label: 'DBMS (Database Systems)', icon: Database, code: 'DBMS' },
  { id: 'oops', label: 'OOPs (Object Oriented)', icon: Boxes, code: 'OOPS' },
  { id: 'sql', label: 'SQL (Relational Queries)', icon: Code, code: 'SQL' }
];

export default function CoreSubjectsTab() {
  const [selectedSubjectId, setSelectedSubjectId] = useState('ccn');
  const [viewMode, setViewMode] = useState('concepts'); // 'concepts' | 'interview'
  const [openQA, setOpenQA] = useState({ 0: true }); // first Q&A open by default
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');

  const currentSubject = CORE_SUBJECTS_DATA[selectedSubjectId] || CORE_SUBJECTS_DATA.ccn;

  const toggleQA = (idx) => {
    setOpenQA(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const filteredTopics = currentSubject.keyTopics.filter(t => 
    !filterQuery.trim() ||
    t.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.summary.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.points.some(p => p.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  const filteredQA = currentSubject.interviewQA.filter(item =>
    !filterQuery.trim() ||
    item.q.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.a.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Subject Navigation Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {SUBJECT_LIST.map((subj) => {
          const Icon = subj.icon;
          const isSelected = selectedSubjectId === subj.id;

          return (
            <button
              key={subj.id}
              onClick={() => {
                setSelectedSubjectId(subj.id);
                setFilterQuery('');
                setOpenQA({ 0: true });
              }}
              className={`px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all whitespace-nowrap border shrink-0 ${
                isSelected
                  ? 'bg-amber-400 text-gray-950 border-amber-400 shadow-sm scale-102'
                  : 'bg-white text-gray-700 hover:text-gray-950 hover:bg-gray-50 border-gray-200/90 shadow-3xs'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                isSelected ? 'bg-gray-950 text-amber-300' : 'bg-gray-100 text-gray-600'
              }`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span>{subj.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Selected Subject Header Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-gray-200/90 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border ${currentSubject.badgeColor}`}>
                {currentSubject.code} MASTER SHEET
              </span>
              <span className="text-xs text-gray-400 font-bold">
                Technical Interview Essential
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {currentSubject.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1 max-w-3xl leading-relaxed">
              {currentSubject.overview}
            </p>
          </div>

          {/* Mode Switcher: Concepts vs Interview Q&A */}
          <div className="bg-gray-100 p-1 rounded-2xl flex items-center gap-1 border border-gray-200/80 shrink-0 self-start md:self-center">
            <button
              onClick={() => setViewMode('concepts')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                viewMode === 'concepts'
                  ? 'bg-white text-gray-950 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>Core Concepts ({currentSubject.keyTopics.length})</span>
            </button>
            <button
              onClick={() => setViewMode('interview')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                viewMode === 'interview'
                  ? 'bg-white text-gray-950 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
              <span>Interview Q&A ({currentSubject.interviewQA.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Input inside subject */}
        <div className="mt-5 pt-5 border-t border-gray-100 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 translate-y-0.5" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={`Filter ${currentSubject.code} topics or questions...`}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-2 pl-9 pr-4 text-xs font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* 3. CORE CONCEPTS VIEW */}
      {viewMode === 'concepts' && (
        <div className="space-y-4">
          {filteredTopics.map((topic, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-3xs space-y-4 hover:border-gray-300 transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 tracking-tight">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">
                      {topic.summary}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(topic.points.join('\n'), `topic_${idx}`)}
                  className="px-2.5 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 text-xs font-bold flex items-center gap-1 transition-colors"
                  title="Copy bullet points"
                >
                  {copiedIndex === `topic_${idx}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2 text-xs text-gray-700">
                {topic.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* High-Tech Visual Interactive Diagram or IDE Code Block */}
              <AdvancedTopicVisual
                topicTitle={topic.title}
                codeSnippet={topic.codeSnippet}
                subjectCode={currentSubject.code}
              />
            </div>
          ))}
        </div>
      )}

      {/* 4. TECHNICAL INTERVIEW Q&A VIEW */}
      {viewMode === 'interview' && (
        <div className="space-y-4">
          {filteredQA.map((item, qIdx) => {
            const isOpen = openQA[qIdx];

            return (
              <div 
                key={qIdx}
                className="bg-white rounded-3xl border border-gray-200/90 shadow-3xs overflow-hidden transition-all"
              >
                <div
                  onClick={() => toggleQA(qIdx)}
                  className="p-5 sm:p-6 bg-white hover:bg-gray-50/70 transition-colors cursor-pointer flex items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      Q{qIdx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-gray-900 leading-snug">
                      {item.q}
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {isOpen && (
                  <div className="p-5 sm:p-6 pt-0 border-t border-gray-100 bg-[#FAFAFC]/60">
                    <div className="pt-4 flex items-start justify-between gap-3">
                      <div className="text-xs sm:text-sm text-gray-800 font-medium whitespace-pre-line leading-relaxed flex-1">
                        {item.a}
                      </div>

                      <button
                        onClick={() => handleCopy(item.a, `qa_${qIdx}`)}
                        className="px-2.5 py-1.5 rounded-xl border border-gray-200 hover:bg-white text-gray-500 text-xs font-bold flex items-center gap-1 transition-colors shrink-0 self-start"
                        title="Copy answer"
                      >
                        {copiedIndex === `qa_${qIdx}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
