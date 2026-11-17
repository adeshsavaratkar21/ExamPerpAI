import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  FileText, 
  ExternalLink, 
  Download, 
  Search, 
  Filter, 
  Eye, 
  Calendar, 
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Layers,
  ChevronDown,
  ChevronUp,
  FolderOpen
} from 'lucide-react';
import api from '../services/api';
import PdfViewerModal from './PdfViewerModal';

export default function SubjectPYQModal({ 
  isOpen, 
  onClose, 
  subjectId = 1,
  subjectCode = 'DC', 
  subjectName = 'Distributed Computing',
  chapters = [],
  onLaunchQuiz
}) {
  const [activeTab, setActiveTab] = useState('questions'); // 'questions', 'papers', 'upload'
  const [papers, setPapers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // Upload Paper Form State
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [examYear, setExamYear] = useState('2024');
  const [examSession, setExamSession] = useState('End-Semester');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const fileInputRef = useRef(null);

  // Path Import State
  const [showPathInput, setShowPathInput] = useState(false);
  const [pyqPathInput, setPyqPathInput] = useState('');
  const [isImportingPath, setIsImportingPath] = useState(false);

  // Module Extraction State
  const [isExtractingModuleWise, setIsExtractingModuleWise] = useState(false);

  // Filters
  const [selectedUnitFilter, setSelectedUnitFilter] = useState('All');
  const [selectedMarksFilter, setSelectedMarksFilter] = useState('All');
  const [selectedPaperFilter, setSelectedPaperFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [previewPaper, setPreviewPaper] = useState(null);

  const backendOrigin = import.meta.env.VITE_API_URL 
    ? import.meta.env.VITE_API_URL.replace('/api', '') 
    : (import.meta.env.DEV ? 'http://127.0.0.1:8000' : window.location.origin);

  const loadData = async () => {
    if (!subjectCode && !subjectId) return;
    setLoading(true);
    setLoadingQuestions(true);

    try {
      // 1. Fetch papers for this subject
      const papersRes = await api.getSubjectPapers(subjectCode || subjectId).catch(() => ({ data: { papers: [] } }));
      setPapers(papersRes.data?.papers || []);

      // 2. Fetch extracted questions for this subject
      const resolvedSubId = subjectId || papersRes.data?.subject_id || 1;
      const questionsRes = await api.getQuestions({ subject_id: resolvedSubId }).catch(() => ({ data: [] }));
      const qList = Array.isArray(questionsRes.data) ? questionsRes.data : [];
      setQuestions(qList);

      // Default to questions view if questions exist, else encourage upload
      if (qList.length > 0) {
        setActiveTab('questions');
      } else if ((papersRes.data?.papers || []).length > 0) {
        setActiveTab('papers');
      } else {
        setShowUploadPanel(true);
      }
    } catch (err) {
      console.error('Failed to load PYQ suite data:', err);
    } finally {
      setLoading(false);
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    loadData();
  }, [isOpen, subjectCode, subjectId]);

  if (!isOpen) return null;

  // File selection
  const handleFileChange = (e) => {
    const incoming = Array.from(e.target.files || []).filter(f => f.name.toLowerCase().endsWith('.pdf'));
    if (incoming.length > 0) {
      setSelectedFiles(prev => [...prev, ...incoming]);
      setUploadError('');
    } else {
      setUploadError('Please select valid PDF question paper(s).');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const incoming = Array.from(e.dataTransfer.files || []).filter(f => f.name.toLowerCase().endsWith('.pdf'));
    if (incoming.length > 0) {
      setSelectedFiles(prev => [...prev, ...incoming]);
      setUploadError('');
    } else {
      setUploadError('Please select valid PDF question paper(s).');
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setUploadError('Please select one or more question paper PDFs first.');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    setUploadSuccess('');

    const resolvedSubId = subjectId || 1;
    const formData = new FormData();
    selectedFiles.forEach((f) => formData.append('files', f));
    if (selectedFiles.length === 1) formData.append('file', selectedFiles[0]);
    formData.append('subject_id', resolvedSubId);
    formData.append('exam_year', examYear);
    formData.append('exam_session', examSession);

    try {
      const res = selectedFiles.length > 1
        ? await api.uploadPYQBatch(formData)
        : await api.uploadPYQ(formData);

      setUploadSuccess(res.data.message || `Uploaded ${selectedFiles.length} paper(s) and extracted questions with exact paper format!`);
      setSelectedFiles([]);
      setShowUploadPanel(false);
      await loadData();
      setActiveTab('questions');
    } catch (err) {
      console.error('Upload PYQ failed:', err);
      setUploadError(err.response?.data?.detail || 'Failed to extract questions from PDF.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleImportByPath = async (e) => {
    e?.preventDefault();
    const clean = pyqPathInput.trim();
    if (!clean) return;

    setIsImportingPath(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      const res = await api.addPYQByPath({
        subject_id: Number(subjectId || 1),
        path: clean,
        exam_year: examYear,
        exam_session: examSession
      });
      setUploadSuccess(res.data.message || 'Imported papers and extracted questions successfully!');
      setPyqPathInput('');
      setShowPathInput(false);
      await loadData();
      setActiveTab('questions');
    } catch (err) {
      console.error('Import PYQ error:', err);
      setUploadError(err.response?.data?.detail || 'Failed to import PYQ document(s) from path.');
    } finally {
      setIsImportingPath(false);
    }
  };

  const handleExtractModuleWise = async () => {
    setIsExtractingModuleWise(true);
    setUploadError('');
    setUploadSuccess('');
    try {
      const res = await api.extractPYQModuleWise({ subject_id: Number(subjectId || 1) });
      setUploadSuccess(res.data.message || 'Categorized questions module-wise across all units!');
      await loadData();
      setActiveTab('questions');
    } catch (err) {
      console.error('Module extraction failed:', err);
      setUploadError(err.response?.data?.detail || 'Failed to extract questions module-wise.');
    } finally {
      setIsExtractingModuleWise(false);
    }
  };

  const handleDeletePaper = async (paperId) => {
    if (!paperId) return;
    if (!window.confirm('Are you sure you want to delete this question paper and its extracted questions?')) return;
    try {
      await api.deletePYQDocument(paperId).catch(() => {});
      await loadData();
    } catch (e) {
      console.error('Failed to delete paper:', e);
    }
  };

  // Filter questions
  const filteredQuestions = questions.filter(q => {
    // Unit filter
    if (selectedUnitFilter !== 'All') {
      const unitNumMatch = q.chapter_name?.match(/Unit\s*(\d+)/i);
      const qUnitNum = unitNumMatch ? unitNumMatch[1] : null;
      if (qUnitNum && qUnitNum !== selectedUnitFilter) return false;
      if (!qUnitNum && q.chapter_id !== Number(selectedUnitFilter)) return false;
    }

    // Marks filter
    if (selectedMarksFilter === '10M' && (q.marks || 0) < 10) return false;
    if (selectedMarksFilter === '5M' && ((q.marks || 0) < 5 || (q.marks || 0) >= 10)) return false;
    if (selectedMarksFilter === '2M' && (q.marks || 0) > 4) return false;

    // Search query
    if (searchQuery.trim()) {
      const sq = searchQuery.toLowerCase();
      const matchText = (q.text || '').toLowerCase().includes(sq);
      const matchYear = (q.exam_year || '').toLowerCase().includes(sq);
      const matchPaper = (q.source_paper || '').toLowerCase().includes(sq);
      const matchChapter = (q.chapter_name || '').toLowerCase().includes(sq);
      if (!matchText && !matchYear && !matchPaper && !matchChapter) return false;
    }

    return true;
  });

  // Filter papers
  const filteredPapers = papers.filter(p => {
    if (selectedPaperFilter === 'ESE' && p.exam_tag !== 'ESE') return false;
    if (selectedPaperFilter === 'MSE' && p.exam_tag !== 'MSE') return false;
    if (selectedPaperFilter === 'KT' && p.exam_tag !== 'KT' && p.exam_tag !== 'SUMMER') return false;
    if (searchQuery.trim()) {
      const sq = searchQuery.toLowerCase();
      const matchTitle = (p.title || '').toLowerCase().includes(sq);
      const matchYear = (p.exam_year || '').toLowerCase().includes(sq);
      const matchFile = (p.filename || '').toLowerCase().includes(sq);
      if (!matchTitle && !matchYear && !matchFile) return false;
    }
    return true;
  });

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-gray-950/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div 
          className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] shadow-2xl border border-gray-100 flex flex-col overflow-hidden text-gray-900"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ========================================================= */}
          {/* 1. TOP HEADER & ADD PYQ TRIGGER BAR                       */}
          {/* ========================================================= */}
          <div className="p-5 sm:p-6 border-b border-gray-100 bg-[#FAFAFC] shrink-0">
            <div className="flex items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-accentYellow flex items-center justify-center font-black text-gray-950 text-xl shadow-xs shrink-0">
                  📄
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-lg bg-gray-950 text-white font-black text-xs uppercase tracking-wider">
                      {subjectCode}
                    </span>
                    <span className="text-xs font-bold text-gray-500">
                      Semester 5 Past Year Exam Papers &amp; Question Extractor
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight mt-0.5">
                    {subjectName} — PYQ Questions &amp; Papers
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowUploadPanel(prev => !prev)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black shadow-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                    showUploadPanel
                      ? 'bg-gray-200 text-gray-900'
                      : 'bg-accentYellow hover:bg-amber-400 text-gray-950 hover:scale-105 active:scale-95'
                  }`}
                  title="Upload additional question papers for this subject"
                >
                  <UploadCloud className="w-4 h-4 text-gray-950" />
                  <span>{showUploadPanel ? 'Hide Uploader' : '+ Add / Upload PYQ'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Status alerts */}
            {uploadSuccess && (
              <div className="mt-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{uploadSuccess}</span>
                </div>
                <button onClick={() => setUploadSuccess('')} className="text-emerald-700 hover:underline text-[11px]">✕</button>
              </div>
            )}

            {uploadError && (
              <div className="mt-3 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{uploadError}</span>
                </div>
                <button onClick={() => setUploadError('')} className="text-rose-700 hover:underline text-[11px]">✕</button>
              </div>
            )}

            {/* ========================================================= */}
            {/* TOP UPLOAD ZONE (EXPANDABLE)                              */}
            {/* ========================================================= */}
            {showUploadPanel && (
              <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/90 shadow-xs animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-800 flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-emerald-600" />
                    <span>Upload Question Paper(s) for {subjectCode}</span>
                  </h4>
                  <span className="text-[11px] font-bold text-gray-500">
                    Extracts verbatim questions preserving exact numbering, formulas &amp; values
                  </span>
                </div>

                {/* Drop zone */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                    selectedFiles.length > 0
                      ? 'border-emerald-400 bg-emerald-50/40'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/60'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {selectedFiles.length > 0 ? (
                    <div>
                      <p className="text-xs font-black text-gray-900">
                        {selectedFiles.length} Paper(s) Selected for Upload:
                      </p>
                      <div className="mt-2.5 max-h-28 overflow-y-auto space-y-1 max-w-lg mx-auto text-left" onClick={(e) => e.stopPropagation()}>
                        {selectedFiles.map((f, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-2 p-1.5 px-2.5 rounded-xl bg-white border border-emerald-200 text-xs shadow-2xs">
                            <span className="font-semibold text-gray-800 truncate" title={f.name}>📄 {f.name}</span>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] text-gray-400">({(f.size / 1024).toFixed(0)} KB)</span>
                              <button
                                type="button"
                                onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== idx))}
                                className="text-rose-600 hover:bg-rose-50 w-5 h-5 rounded-md flex items-center justify-center font-bold"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                          className="px-3 py-1 rounded-lg text-xs font-bold bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
                        >
                          + Add More PDFs
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setSelectedFiles([]); }}
                          className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <UploadCloud className="w-7 h-7 text-emerald-600 mx-auto mb-1.5" />
                      <p className="text-xs font-black text-gray-800">
                        Drag &amp; Drop Question Paper PDF(s) here, or click to browse
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        Accepts official university past question papers (*.pdf). Batch upload supported.
                      </p>
                    </div>
                  )}
                </div>

                {/* Form fields & extract button */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Exam Year</label>
                    <input
                      type="text"
                      value={examYear}
                      onChange={(e) => setExamYear(e.target.value)}
                      placeholder="e.g. 2024"
                      className="w-full bg-[#F8F9FC] border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-900 focus:outline-none focus:border-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-1">Exam Session</label>
                    <select
                      value={examSession}
                      onChange={(e) => setExamSession(e.target.value)}
                      className="w-full bg-[#F8F9FC] border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-900 focus:outline-none focus:border-gray-400"
                    >
                      <option value="End-Semester">End-Semester Examination (ESE)</option>
                      <option value="Mid-Semester">Mid-Semester Examination (MSE)</option>
                      <option value="Re-Examination">Re-Examination / Remedial (KT)</option>
                      <option value="Summer-Exam">Summer Examination</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleUpload}
                      disabled={isUploading || selectedFiles.length === 0}
                      className="w-full py-2 px-3 rounded-xl bg-gray-950 hover:bg-black disabled:opacity-40 text-white font-black text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isUploading ? (
                        <>
                          <Sparkles className="w-3.5 h-3.5 animate-spin text-accentYellow" />
                          <span>Extracting Questions...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-accentYellow" />
                          <span>Extract &amp; Save ({selectedFiles.length || 0})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Path import toggler */}
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <button
                    type="button"
                    onClick={() => setShowPathInput(prev => !prev)}
                    className="text-gray-500 hover:text-gray-900 font-bold flex items-center gap-1"
                  >
                    <FolderOpen className="w-3 h-3 text-amber-500" />
                    <span>{showPathInput ? 'Hide local path import' : 'Or import PYQ from local file path / folder'}</span>
                  </button>
                </div>

                {showPathInput && (
                  <form onSubmit={handleImportByPath} className="mt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. D:\Sem5\ExamPrep\uploads\DC\E_Dec_24.pdf"
                      value={pyqPathInput}
                      onChange={(e) => setPyqPathInput(e.target.value)}
                      className="flex-1 bg-[#F8F9FC] border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-gray-400"
                    />
                    <button
                      type="submit"
                      disabled={isImportingPath || !pyqPathInput.trim()}
                      className="px-3.5 py-1.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black disabled:opacity-40 shrink-0"
                    >
                      {isImportingPath ? 'Importing...' : 'Import Path'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW SELECTOR & FILTER TOOLBAR                            */}
            {/* ========================================================= */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
              {/* Primary Tabs */}
              <div className="flex items-center gap-1.5 bg-gray-100/90 p-1 rounded-2xl border border-gray-200/60 shrink-0">
                <button
                  onClick={() => setActiveTab('questions')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    activeTab === 'questions'
                      ? 'bg-white text-gray-950 shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Extracted Questions ({questions.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('papers')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    activeTab === 'papers'
                      ? 'bg-white text-gray-950 shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FolderOpen className="w-3.5 h-3.5 text-amber-500" />
                  <span>Papers Library ({papers.length})</span>
                </button>
              </div>

              {/* Re-extract Action & Search */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExtractModuleWise}
                  disabled={isExtractingModuleWise || papers.length === 0}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 disabled:opacity-40 text-gray-950 font-black text-xs transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer shrink-0"
                  title="Re-run AI extraction across papers to ensure every module has properly categorized questions"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-gray-950 ${isExtractingModuleWise ? 'animate-spin' : ''}`} />
                  <span>{isExtractingModuleWise ? 'Categorizing...' : '⚡ AI Extract Module-Wise'}</span>
                </button>

                <div className="relative w-full sm:w-56">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search questions or years..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl py-1.5 pl-8 pr-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 shadow-2xs"
                  />
                </div>
              </div>
            </div>

            {/* Secondary Filter Pills (For Questions Tab) */}
            {activeTab === 'questions' && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t border-gray-100/80 mt-3">
                {/* Unit Pills */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
                  <span className="text-[10px] font-black uppercase text-gray-400 mr-1 shrink-0">Units:</span>
                  <button
                    onClick={() => setSelectedUnitFilter('All')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all shrink-0 ${
                      selectedUnitFilter === 'All'
                        ? 'bg-gray-950 text-white shadow-2xs'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    All Units ({questions.length})
                  </button>
                  {[1, 2, 3, 4, 5, 6].map(uNum => {
                    const uCount = questions.filter(q => {
                      const m = q.chapter_name?.match(/Unit\s*(\d+)/i);
                      return m ? m[1] === String(uNum) : false;
                    }).length;

                    return (
                      <button
                        key={uNum}
                        onClick={() => setSelectedUnitFilter(String(uNum))}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all shrink-0 ${
                          selectedUnitFilter === String(uNum)
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Unit {uNum} ({uCount})
                      </button>
                    );
                  })}
                </div>

                {/* Marks Filter */}
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[10px] font-black uppercase text-gray-400 mr-1">Marks:</span>
                  {['All', '10M', '5M', '2M'].map(m => (
                    <button
                      key={m}
                      onClick={() => setSelectedMarksFilter(m)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                        selectedMarksFilter === m
                          ? 'bg-amber-400 text-gray-950 font-black shadow-2xs'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {m === 'All' ? 'All' : m}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* 2. MAIN CONTENT AREA (EXTRACTED QUESTIONS OR PAPERS)      */}
          {/* ========================================================= */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#F8F9FD]">
            {loading ? (
              <div className="py-16 text-center text-gray-500">
                <Sparkles className="w-7 h-7 animate-spin text-amber-500 mx-auto mb-2" />
                <p className="text-xs font-bold">Scanning authentic university past questions for {subjectCode}...</p>
              </div>
            ) : activeTab === 'questions' ? (
              /* TAB 1: EXTRACTED QUESTIONS (VERBATIM FORMAT) */
              filteredQuestions.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-gray-200/90 text-gray-500 shadow-xs max-w-xl mx-auto">
                  <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-sm font-black text-gray-900">No questions extracted yet for this filter.</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                    Click <strong className="text-gray-800">"+ Add / Upload PYQ"</strong> at the top to upload your exam paper PDFs, or click <strong className="text-gray-800">"⚡ AI Extract Module-Wise"</strong> to parse uploaded papers.
                  </p>
                  <button
                    onClick={() => setShowUploadPanel(true)}
                    className="mt-4 px-4 py-2 rounded-xl bg-gray-950 text-white font-bold text-xs hover:bg-black inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <UploadCloud className="w-3.5 h-3.5 text-accentYellow" />
                    <span>Upload PYQ Papers Now</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs text-gray-500 px-1 font-semibold">
                    <span>
                      Displaying <strong className="text-gray-900">{filteredQuestions.length}</strong> authentic exam questions in exact paper format:
                    </span>
                    <span className="text-[11px] text-gray-400">
                      Exact text &amp; numerical values preserved
                    </span>
                  </div>

                  {filteredQuestions.map((q, idx) => {
                    const isExpanded = expandedQuestionId === q.id;
                    const marksColor = 
                      (q.marks || 0) >= 10 ? 'bg-amber-100 text-amber-900 border-amber-300' :
                      (q.marks || 0) >= 5 ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
                      'bg-emerald-50 text-emerald-800 border-emerald-200';

                    return (
                      <div
                        key={q.id || idx}
                        className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/80 hover:border-gray-300 shadow-2xs transition-all space-y-3"
                      >
                        {/* Question Meta Badge Header */}
                        <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2.5 py-0.5 rounded-lg bg-gray-950 text-white text-xs font-black tracking-tight">
                              {q.text.match(/^(?:Q(?:uestion)?\.?\s*\d+\s*(?:\([a-zA-Z0-9]+\)|[a-zA-Z0-9]+[\.\)])?|^\d+[\.\)]\s*(?:\([a-zA-Z0-9]+\))?)/i)?.[0] || `Q.${idx + 1}`}
                            </span>

                            <span className={`px-2 py-0.5 rounded-lg border text-xs font-black ${marksColor}`}>
                              [{q.marks || 5} Marks]
                            </span>

                            {q.chapter_name && (
                              <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100/80">
                                {q.chapter_name}
                              </span>
                            )}

                            {q.question_type && (
                              <span className="px-2 py-0.5 rounded-lg bg-gray-100 text-gray-700 text-[11px] font-semibold">
                                {q.question_type}
                              </span>
                            )}
                          </div>

                          {q.source_paper && (
                            <span className="text-[11px] font-semibold text-gray-400">
                              Paper: {q.source_paper}
                            </span>
                          )}
                        </div>

                        {/* Exact Question Text */}
                        <div className="text-sm font-bold text-gray-900 leading-relaxed font-sans bg-[#FBFBFE] p-3.5 rounded-xl border border-gray-100 select-text">
                          <p className="whitespace-pre-wrap">{q.text}</p>
                        </div>

                        {/* Model Solution / Outline Toggle */}
                        {q.solution && (
                          <div>
                            <button
                              type="button"
                              onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <span>{isExpanded ? 'Hide Ideal Answer Outline' : 'Show Ideal Answer Outline & Key Criteria'}</span>
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>

                            {isExpanded && (
                              <div className="mt-2 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-gray-800 leading-relaxed space-y-1.5 animate-in fade-in duration-150">
                                <h5 className="font-extrabold text-amber-950 uppercase tracking-wider text-[10px] flex items-center gap-1">
                                  <span>💡</span> Model Answering Strategy:
                                </h5>
                                <p className="font-medium text-gray-700">{q.solution}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              /* TAB 2: UPLOADED QUESTION PAPERS GALLERY */
              filteredPapers.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-gray-200/90 text-gray-500 shadow-xs max-w-xl mx-auto">
                  <FolderOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-sm font-black text-gray-900">No question papers uploaded yet for {subjectCode}.</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload official question papers above to extract questions and view PDFs in the browser.
                  </p>
                  <button
                    onClick={() => setShowUploadPanel(true)}
                    className="mt-4 px-4 py-2 rounded-xl bg-gray-950 text-white font-bold text-xs hover:bg-black inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <UploadCloud className="w-3.5 h-3.5 text-accentYellow" />
                    <span>Upload First Paper</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredPapers.map((paper, idx) => {
                    const fullPdfUrl = `${backendOrigin}${paper.file_url}`;
                    const tagColor = 
                      paper.exam_tag === 'ESE' ? 'bg-indigo-50 text-indigo-700 border-indigo-200/80' :
                      paper.exam_tag === 'MSE' ? 'bg-amber-50 text-amber-800 border-amber-200/80' :
                      'bg-emerald-50 text-emerald-800 border-emerald-200/80';

                    return (
                      <div
                        key={paper.id || idx}
                        className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/80 hover:border-gray-300 shadow-2xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        {/* Details */}
                        <div className="flex items-start gap-3.5 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 shrink-0 font-bold text-sm">
                            📄
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${tagColor}`}>
                                {paper.exam_tag === 'ESE' ? 'End-Sem (ESE)' : paper.exam_tag === 'MSE' ? 'Mid-Sem (MSE)' : 'Re-Exam / KT'}
                              </span>
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                                {paper.exam_year}
                              </span>
                              <span className="text-[11px] font-semibold text-gray-400">
                                {paper.file_size}
                              </span>
                            </div>
                            <h4 className="text-sm font-black text-gray-900 truncate">
                              {paper.title}
                            </h4>
                            <p className="text-xs text-gray-400 font-mono mt-0.5 truncate">
                              {paper.filename}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => setPreviewPaper(paper)}
                            className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                            title="View paper inside the platform"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>

                          <a
                            href={fullPdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-xs"
                            title="Open full PDF in a new tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-accentYellow" />
                            <span>Open</span>
                          </a>

                          <a
                            href={fullPdfUrl}
                            download={paper.filename}
                            className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-accentYellow flex items-center justify-center text-gray-600 hover:text-gray-950 transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>

                          {paper.id && (
                            <button
                              onClick={() => handleDeletePaper(paper.id)}
                              className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center text-gray-400 transition-colors"
                              title="Delete this paper"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>

          {/* ========================================================= */}
          {/* FOOTER                                                    */}
          {/* ========================================================= */}
          <div className="p-4 border-t border-gray-100 bg-[#FAFAFC] flex items-center justify-between text-xs text-gray-500 shrink-0">
            <span>
              Subject: <strong className="text-gray-900">{subjectName}</strong> • {questions.length} Questions • {papers.length} Papers
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Embedded PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={Boolean(previewPaper)}
        onClose={() => setPreviewPaper(null)}
        paper={previewPaper}
      />
    </>
  );
}
