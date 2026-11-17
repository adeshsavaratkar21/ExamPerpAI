import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Folder,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader2,
  ArrowRight,
  Filter
} from 'lucide-react';
import api from '../services/api';

export default function UnitPYQSection({
  chapterId,
  chapterName,
  subjectId,
  subjectCode = 'DC',
  subjectName = 'Distributed Computing',
  onPyqCompleted,
  onNavigateToQuiz
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'add_paper'
  const [selectedFilter, setSelectedFilter] = useState('All'); // 'All' | '10M' | '5M'
  const [expandedQId, setExpandedQId] = useState(null);
  const [markingDone, setMarkingDone] = useState(false);
  const [pyqDone, setPyqDone] = useState(false);

  // Upload Paper Form State
  const [uploadFile, setUploadFile] = useState(null);
  const [examYear, setExamYear] = useState('2024');
  const [examSession, setExamSession] = useState('End-Semester');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  // Path Import State
  const [pathInput, setPathInput] = useState('');
  const [isImportingPath, setIsImportingPath] = useState(false);

  const fileInputRef = useRef(null);

  const fetchOverview = async () => {
    if (!chapterId) return;
    setLoading(true);
    setUploadError('');
    try {
      const res = await api.getChapterPYQOverview(chapterId);
      setData(res.data);
      setPyqDone(res.data.pyq_done || false);
    } catch (err) {
      console.error('Failed to load chapter PYQ overview:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chapterId) {
      fetchOverview();
      setActiveTab('questions');
      setUploadSuccess('');
      setUploadError('');
    }
  }, [chapterId]);

  const questions = data?.questions || [];

  const filteredQuestions = questions.filter(q => {
    if (selectedFilter === '10M') return (q.marks || 0) >= 10;
    if (selectedFilter === '5M') return (q.marks || 0) <= 6 && (q.marks || 0) > 2;
    return true;
  });

  const handleMarkPracticed = async () => {
    if (markingDone || !chapterId) return;
    setMarkingDone(true);
    try {
      const res = await api.markChapterPYQPracticed(chapterId);
      setPyqDone(true);
      if (onPyqCompleted) {
        onPyqCompleted(chapterId, res.data);
      }
    } catch (err) {
      console.error('Failed to mark PYQ practiced:', err);
    } finally {
      setMarkingDone(false);
    }
  };

  const handleFileUpload = async (e) => {
    e?.preventDefault();
    if (!uploadFile) {
      setUploadError('Please choose a PDF question paper file first.');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    setUploadSuccess('');

    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('subject_id', subjectId || data?.subject_id || 1);
    formData.append('exam_year', examYear);
    formData.append('exam_session', examSession);

    try {
      const res = await api.uploadPYQ(formData);
      setUploadSuccess(`Successfully extracted ${res.data.total_extracted || 0} questions module-wise!`);
      setUploadFile(null);
      await fetchOverview();
      setTimeout(() => {
        setActiveTab('questions');
        setUploadSuccess('');
      }, 1500);
    } catch (err) {
      console.error('Upload PYQ failed:', err);
      setUploadError(err.response?.data?.detail || 'Failed to upload and parse question paper.');
    } finally {
      setIsUploading(false);
    }
  };

  const handlePathImport = async (e) => {
    e?.preventDefault();
    const clean = pathInput.trim();
    if (!clean) return;

    setIsImportingPath(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      const res = await api.addPYQByPath({
        subject_id: subjectId || data?.subject_id || 1,
        path: clean,
        exam_year: examYear,
        exam_session: examSession
      });
      setUploadSuccess(res.data.message || 'Imported PYQ document successfully!');
      setPathInput('');
      await fetchOverview();
      setTimeout(() => {
        setActiveTab('questions');
        setUploadSuccess('');
      }, 1500);
    } catch (err) {
      console.error('Import PYQ by path failed:', err);
      setUploadError(err.response?.data?.detail || 'Failed to import PYQ document from path.');
    } finally {
      setIsImportingPath(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Banner & Tab Switcher */}
      <div className="student-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black shadow-xs shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-gray-900">
                Module Past Year Questions (PYQs)
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Step 3/4
              </span>
              {pyqDone && (
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Practiced
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Past university examination questions mapped to <strong>{chapterName}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              activeTab === 'questions'
                ? 'bg-gray-950 text-white shadow-2xs'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Questions ({questions.length})
          </button>
          <button
            onClick={() => setActiveTab('add_paper')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'add_paper'
                ? 'bg-amber-400 text-gray-950 shadow-2xs'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5 text-amber-600" />
            <span>Add Subject PYQ</span>
          </button>
        </div>
      </div>

      {/* Filter Pills if questions exist */}
      {activeTab === 'questions' && questions.length > 0 && (
        <div className="flex items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter Marks:
            </span>
            {['All', '10M', '5M'].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                  selectedFilter === f
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {f === 'All' ? 'All Marks' : f === '10M' ? '10M Questions' : '5M Questions'}
              </button>
            ))}
          </div>

          <button
            onClick={handleMarkPracticed}
            disabled={markingDone}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
              pyqDone
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105 active:scale-95'
            }`}
          >
            {markingDone ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
            <span>{pyqDone ? 'Step 3 Done ✓' : 'Mark Practiced (Step 3/4)'}</span>
          </button>
        </div>
      )}

      {/* Alerts */}
      {uploadError && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {uploadSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* TAB 1: QUESTIONS LIST */}
      {activeTab === 'questions' && (
        <div>
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              <p className="text-xs font-bold text-gray-500">Loading module questions...</p>
            </div>
          ) : filteredQuestions.length > 0 ? (
            <div className="space-y-3">
              {filteredQuestions.map((q, idx) => {
                const isExpanded = expandedQId === q.id;
                const is10M = (q.marks || 0) >= 10;

                return (
                  <div
                    key={q.id || idx}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/90 hover:border-emerald-300 transition-all shadow-3xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                            is10M
                              ? 'bg-rose-100 text-rose-900 border border-rose-200'
                              : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                          }`}>
                            {q.marks || (is10M ? 10 : 5)} Marks
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[10px] font-bold">
                            {q.source_paper || `${q.exam_year || '2024'} Endsem`}
                          </span>
                          {q.difficulty && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-semibold">
                              {q.difficulty}
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-gray-900 leading-relaxed pt-1">
                          {q.text}
                        </p>
                      </div>

                      <button
                        onClick={() => setExpandedQId(isExpanded ? null : q.id)}
                        className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-800 transition-colors shrink-0"
                        title={isExpanded ? 'Hide Solution' : 'View Model Solution'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-gray-100 space-y-2 text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold text-[11px] uppercase tracking-wider">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Model University Exam Answer Points:</span>
                        </div>
                        <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-gray-800 leading-relaxed font-medium whitespace-pre-wrap">
                          {q.solution || 'Focus on providing a formal definition, drawing a clear labeled system block architecture diagram, and explaining step-by-step algorithms or state transitions.'}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center rounded-3xl bg-gray-50 border border-dashed border-gray-200 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                <FileText className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900">
                  No Past Year Questions Uploaded Yet for this Module
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 leading-relaxed">
                  Upload past exam papers for <strong>{subjectName}</strong> or import them by file path. The AI question extractor will automatically categorize questions module-wise!
                </p>
              </div>
              <button
                onClick={() => setActiveTab('add_paper')}
                className="px-4 py-2 rounded-xl bg-gray-950 text-white font-bold text-xs hover:bg-black transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <UploadCloud className="w-3.5 h-3.5 text-amber-400" />
                <span>Upload PYQ PDF Now</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ADD SUBJECT PYQ PAPER */}
      {activeTab === 'add_paper' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/80 via-white to-emerald-50/60 border border-amber-200/70">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Module-Wise Automatic AI Question Extraction</span>
            </h3>
            <p className="text-xs text-gray-600 font-medium mt-1 leading-relaxed">
              Upload an official university question paper PDF for <strong>{subjectName}</strong>. The AI parses all 5-mark and 10-mark questions and automatically assigns them to their respective syllabus modules.
            </p>
          </div>

          {/* Option A: Upload File */}
          <div className="space-y-3 p-4 rounded-2xl bg-gray-50/80 border border-gray-200">
            <h4 className="text-xs font-extrabold text-gray-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Option A: Upload PYQ PDF File</span>
            </h4>

            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-5 border-2 border-dashed border-gray-300 hover:border-emerald-500 rounded-2xl text-center bg-white cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
            >
              <UploadCloud className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-gray-800">
                {uploadFile ? uploadFile.name : 'Click to select University Exam Paper PDF'}
              </p>
              <p className="text-[10px] text-gray-400">
                {uploadFile ? `${(uploadFile.size / (1024 * 1024)).toFixed(2)} MB` : 'Supports official PDF question papers'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Exam Year</label>
                <input
                  type="text"
                  value={examYear}
                  onChange={(e) => setExamYear(e.target.value)}
                  placeholder="e.g. 2024"
                  className="w-full bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Session</label>
                <select
                  value={examSession}
                  onChange={(e) => setExamSession(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-gray-900 focus:outline-none focus:border-emerald-500"
                >
                  <option value="End-Semester">End-Semester (ESE)</option>
                  <option value="Mid-Semester">Mid-Semester (MSE)</option>
                  <option value="Re-Examination">Re-Exam / KT</option>
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-end">
                <button
                  type="button"
                  onClick={handleFileUpload}
                  disabled={isUploading || !uploadFile}
                  className="w-full py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-xs transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Extracting...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Extract &amp; Save</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Option B: Add by Path */}
          <div className="space-y-2 p-4 rounded-2xl bg-gray-50/80 border border-gray-200">
            <h4 className="text-xs font-extrabold text-gray-900 flex items-center gap-2">
              <Folder className="w-4 h-4 text-indigo-600" />
              <span>Option B: Import PYQ PDF by Local File Path or Folder</span>
            </h4>
            <form onSubmit={handlePathImport} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
              <input
                type="text"
                value={pathInput}
                onChange={(e) => setPathInput(e.target.value)}
                placeholder="e.g. C:\Documents\PYQs\2023_endsem.pdf or D:\ExamPapers"
                className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={isImportingPath || !pathInput.trim()}
                className="px-4 py-1.5 rounded-xl bg-gray-900 hover:bg-black disabled:opacity-50 text-white font-bold text-xs transition-colors shadow-2xs flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              >
                {isImportingPath ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                    <span>Importing...</span>
                  </>
                ) : (
                  <>
                    <Folder className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add from Path</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Completion & Next Step Bar */}
      <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
        <button
          onClick={handleMarkPracticed}
          disabled={markingDone}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
            pyqDone
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105 active:scale-95'
          }`}
        >
          {markingDone ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
          <span>{pyqDone ? 'Step 3: PYQs Practiced ✓' : 'Mark PYQs Practiced (Step 3/4)'}</span>
        </button>

        {onNavigateToQuiz && (
          <button
            onClick={() => onNavigateToQuiz(chapterId)}
            className="px-4 py-2 rounded-2xl bg-accentYellow hover:bg-amber-300 text-gray-950 font-black text-xs transition-all shadow-2xs flex items-center gap-1.5 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Proceed to Step 4: Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
