import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  FileText, 
  ExternalLink, 
  Download, 
  Sparkles,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ChevronDown,
  ChevronUp,
  FolderOpen,
  Eye,
  Loader2
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
  onQuestionsUpdated
}) {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Upload Paper Form State
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [examYear, setExamYear] = useState('2024');
  const [examSession, setExamSession] = useState('End-Semester');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusText, setUploadStatusText] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [showManagePapers, setShowManagePapers] = useState(false);
  const [previewPaper, setPreviewPaper] = useState(null);
  const fileInputRef = useRef(null);

  const backendOrigin = import.meta.env.VITE_API_URL 
    ? import.meta.env.VITE_API_URL.replace('/api', '') 
    : (import.meta.env.DEV ? 'http://127.0.0.1:8000' : window.location.origin);

  const loadPapers = async () => {
    if (!subjectCode && !subjectId) return;
    setLoading(true);
    try {
      const res = await api.getSubjectPapers(subjectCode || subjectId).catch(() => ({ data: { papers: [] } }));
      setPapers(res.data?.papers || []);
    } catch (err) {
      console.error('Failed to load subject papers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    loadPapers();
    setUploadError('');
    setUploadSuccess('');
    setSelectedFiles([]);
    setIsUploading(false);
  }, [isOpen, subjectCode, subjectId]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const incoming = Array.from(e.target.files || []).filter(f => f.name.toLowerCase().endsWith('.pdf'));
    if (incoming.length > 0) {
      setSelectedFiles(prev => [...prev, ...incoming]);
      setUploadError('');
    } else {
      setUploadError('Please select valid PDF question paper(s) (*.pdf).');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const incoming = Array.from(e.dataTransfer.files || []).filter(f => f.name.toLowerCase().endsWith('.pdf'));
    if (incoming.length > 0) {
      setSelectedFiles(prev => [...prev, ...incoming]);
      setUploadError('');
    } else {
      setUploadError('Please select valid PDF question paper(s) (*.pdf).');
    }
  };

  // Resilient Sequential Upload: uploads file-by-file so Vercel 4.5MB limit is never exceeded
  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setUploadError('Please choose one or more question paper PDFs first.');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    setUploadSuccess('');
    setUploadProgress(0);

    const resolvedSubId = Number(subjectId || 1);
    const total = selectedFiles.length;
    let succeededCount = 0;
    let totalQuestionsCount = 0;

    try {
      for (let i = 0; i < total; i++) {
        const file = selectedFiles[i];
        const currentNum = i + 1;
        setUploadStatusText(`Uploading & extracting paper ${currentNum} of ${total}: ${file.name}...`);
        setUploadProgress(Math.round(((i) / total) * 90));

        const formData = new FormData();
        formData.append('file', file);
        formData.append('subject_id', resolvedSubId);
        formData.append('exam_year', examYear);
        formData.append('exam_session', examSession);

        try {
          const res = await api.uploadPYQ(formData);
          succeededCount++;
          totalQuestionsCount += (res.data?.total_extracted || 0);
        } catch (fileErr) {
          console.warn(`File ${file.name} encountered fallback during upload:`, fileErr);
          // Try batch fallback if single upload had an edge case
          try {
            const batchFormData = new FormData();
            batchFormData.append('files', file);
            batchFormData.append('subject_id', resolvedSubId);
            batchFormData.append('exam_year', examYear);
            batchFormData.append('exam_session', examSession);
            const res = await api.uploadPYQBatch(batchFormData);
            succeededCount++;
            totalQuestionsCount += (res.data?.total_extracted || 0);
          } catch (e2) {
            console.error(`Failed to process ${file.name}:`, e2);
          }
        }
      }

      setUploadStatusText('Categorizing all extracted questions module-wise across Units 1 to 6...');
      setUploadProgress(95);

      // Re-align and distribute questions across all syllabus units
      await api.extractPYQModuleWise({ subject_id: resolvedSubId }).catch(() => {});

      setUploadProgress(100);
      setUploadSuccess(`Successfully uploaded ${succeededCount} paper(s)! All questions extracted and categorized module-wise.`);
      setSelectedFiles([]);
      await loadPapers();

      if (onQuestionsUpdated) {
        onQuestionsUpdated();
      }
    } catch (err) {
      console.error('Upload error:', err);
      setUploadError(err.response?.data?.detail || 'An error occurred during upload. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadStatusText('');
    }
  };

  const handleDeletePaper = async (paperId) => {
    if (!paperId) return;
    if (!window.confirm('Are you sure you want to delete this question paper?')) return;
    try {
      await api.deletePYQDocument(paperId).catch(() => {});
      await loadPapers();
      if (onQuestionsUpdated) onQuestionsUpdated();
    } catch (e) {
      console.error('Failed to delete paper:', e);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-gray-950/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div 
          className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden text-gray-900"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-gray-100 bg-[#FAFAFC] shrink-0">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-accentYellow flex items-center justify-center font-black text-gray-950 text-xl shadow-xs shrink-0">
                  📄
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-lg bg-gray-950 text-white font-black text-xs uppercase tracking-wider">
                      {subjectCode}
                    </span>
                    <span className="text-xs font-bold text-gray-500">
                      Upload Question Papers
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-gray-900 tracking-tight mt-0.5">
                    {subjectName} — PYQ Extractor
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Focused Upload Form */}
          <div className="p-5 sm:p-7 space-y-4 overflow-y-auto max-h-[78vh] bg-white">
            {/* Status alerts */}
            {uploadSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm font-extrabold">{uploadSuccess}</span>
                </div>
                <p className="text-xs text-emerald-800 font-medium pl-7">
                  You can now view each question directly in its respective unit section below on the course page.
                </p>
                <div className="pl-7 pt-1">
                  <button
                    onClick={onClose}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Extracted Questions in Modules Below →</span>
                  </button>
                </div>
              </div>
            )}

            {uploadError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{uploadError}</span>
                </div>
                <button onClick={() => setUploadError('')} className="text-rose-700 hover:underline text-[11px] font-bold">✕</button>
              </div>
            )}

            {/* Drag & Drop Area */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                selectedFiles.length > 0
                  ? 'border-emerald-400 bg-emerald-50/40'
                  : 'border-gray-200 hover:border-amber-400 hover:bg-amber-50/20'
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
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2 font-black">
                    ✓
                  </div>
                  <h4 className="text-sm font-black text-gray-900">
                    {selectedFiles.length} Paper(s) Selected for Upload:
                  </h4>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                    Total Size: {(selectedFiles.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(2)} MB
                  </p>

                  <div 
                    className="mt-3 max-h-36 overflow-y-auto space-y-1.5 max-w-lg mx-auto text-left" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    {selectedFiles.map((f, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-2 p-2 px-3 rounded-xl bg-white border border-emerald-200 text-xs shadow-2xs">
                        <span className="font-semibold text-gray-800 truncate" title={f.name}>📄 {f.name}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] text-gray-400">({(f.size / 1024).toFixed(0)} KB)</span>
                          <button
                            type="button"
                            onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== idx))}
                            className="text-rose-600 hover:bg-rose-50 w-5 h-5 rounded-md flex items-center justify-center font-bold cursor-pointer"
                            title="Remove this file"
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
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 shadow-2xs cursor-pointer"
                    >
                      + Add More PDFs
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setSelectedFiles([]); }}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 shadow-2xs cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-sm">
                    <UploadCloud className="w-7 h-7 text-gray-900" />
                  </div>
                  <h4 className="text-sm font-extrabold text-gray-900">
                    Drag &amp; Drop University Question Paper PDF(s) here
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 mb-3">
                    Upload official question papers (*.pdf). Batch upload of multiple papers supported.
                  </p>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                    className="px-5 py-2.5 rounded-2xl bg-gray-950 text-white hover:bg-black text-xs font-extrabold shadow-sm inline-flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                  >
                    <UploadCloud className="w-4 h-4 text-accentYellow" />
                    <span>Browse &amp; Select PDF(s)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Exam Year & Session Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-600 mb-1.5">
                  Exam Year
                </label>
                <input
                  type="text"
                  value={examYear}
                  onChange={(e) => setExamYear(e.target.value)}
                  placeholder="e.g. 2024"
                  className="w-full bg-[#F8F9FC] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-600 mb-1.5">
                  Exam Session
                </label>
                <select
                  value={examSession}
                  onChange={(e) => setExamSession(e.target.value)}
                  className="w-full bg-[#F8F9FC] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-gray-900 focus:outline-none focus:border-gray-400"
                >
                  <option value="End-Semester">End-Semester Examination (ESE)</option>
                  <option value="Mid-Semester">Mid-Semester Examination (MSE)</option>
                  <option value="Re-Examination">Re-Examination / Remedial (KT)</option>
                  <option value="Summer-Exam">Summer Examination</option>
                </select>
              </div>
            </div>

            {/* Upload Progress Bar if active */}
            {isUploading && (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-xs font-black text-amber-950">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                    <span>{uploadStatusText || 'Extracting questions...'}</span>
                  </div>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-amber-200/60 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploading || selectedFiles.length === 0}
              className={`w-full py-3 px-4 rounded-2xl text-xs font-black shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isUploading
                  ? 'bg-amber-100 text-amber-900 cursor-wait'
                  : selectedFiles.length > 0
                  ? 'bg-accentYellow hover:bg-amber-400 text-gray-950 hover:scale-[1.01] active:scale-[0.99]'
                  : 'bg-gray-900 hover:bg-black text-white hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {isUploading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-gray-950" />
                  <span>Extracting Questions ({uploadProgress}%)...</span>
                </>
              ) : selectedFiles.length > 0 ? (
                <>
                  <Sparkles className="w-4 h-4 text-gray-950" />
                  <span>Extract &amp; Save ({selectedFiles.length} Paper{selectedFiles.length > 1 ? 's' : ''})</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4 text-amber-300" />
                  <span>Select Question Paper PDF(s) to Extract</span>
                </>
              )}
            </button>

            {/* Manage Uploaded Papers Toggle */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowManagePapers(prev => !prev)}
                className="text-xs font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1.5 cursor-pointer"
              >
                <FolderOpen className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {showManagePapers ? 'Hide Uploaded Papers Library' : `Manage Uploaded Papers (${papers.length})`}
                </span>
                {showManagePapers ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              <span className="text-[11px] text-gray-400">
                {papers.length} paper(s) in database
              </span>
            </div>

            {/* Collapsible Papers List */}
            {showManagePapers && (
              <div className="space-y-2 pt-2 animate-in fade-in duration-150">
                {papers.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">No papers uploaded for {subjectCode} yet.</p>
                ) : (
                  papers.map((paper, idx) => {
                    const fullPdfUrl = `${backendOrigin}${paper.file_url}`;
                    return (
                      <div
                        key={paper.id || idx}
                        className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="w-4 h-4 text-gray-500 shrink-0" />
                          <span className="font-bold text-gray-800 truncate" title={paper.filename}>
                            {paper.filename}
                          </span>
                          <span className="text-[10px] text-gray-400 shrink-0">
                            ({paper.exam_year})
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => setPreviewPaper(paper)}
                            className="px-2 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 text-[11px] font-bold"
                          >
                            Preview
                          </button>
                          <a
                            href={fullPdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 rounded-lg bg-gray-950 text-white text-[11px] font-bold"
                          >
                            Open
                          </a>
                          <button
                            type="button"
                            onClick={() => handleDeletePaper(paper.id)}
                            className="w-6 h-6 rounded-lg text-rose-500 hover:bg-rose-50 flex items-center justify-center font-bold"
                            title="Delete paper"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-[#FAFAFC] flex items-center justify-between text-xs text-gray-500 shrink-0">
            <span>
              Target Subject: <strong className="text-gray-900">{subjectName}</strong>
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
