import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  FileText,
  FileCode,
  Sparkles,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Paperclip,
  BookOpen,
  ArrowRight,
  Loader2
} from 'lucide-react';
import api from '../services/api';

export default function UnitReferenceMaterialModal({
  isOpen,
  onClose,
  chapterId,
  chapterName,
  subjectCode,
  onGenerateNotes
}) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !chapterId) {
      setMaterials([]);
      return;
    }

    setLoading(true);
    setError('');
    api.getChapterReferenceMaterials(chapterId)
      .then(res => {
        setMaterials(res.data.reference_materials || []);
      })
      .catch(err => {
        console.error('Failed to load reference materials:', err);
      })
      .finally(() => setLoading(false));
  }, [isOpen, chapterId]);

  if (!isOpen) return null;

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'pptx', 'ppt', 'txt'].includes(ext)) {
      setError('Please upload a PDF (.pdf), PowerPoint presentation (.pptx, .ppt), or Text file (.txt).');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.uploadChapterReferenceMaterial(chapterId, formData);
      setMaterials(res.data.reference_materials || []);
      setSuccess(`Attached ${file.name} successfully! Grounded notes will incorporate these slides.`);
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.response?.data?.detail || 'Failed to upload reference file. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3 bg-gradient-to-r from-amber-50/50 via-white to-indigo-50/30">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-gray-950 flex items-center justify-center font-black shrink-0 shadow-xs">
              <BookOpen className="w-5 h-5 text-gray-950" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-md">
                Unit Reference Material Grounding
              </span>
              <h2 className="text-base font-black text-gray-900 tracking-tight truncate mt-0.5">
                {chapterName?.replace(/^Unit \d+:\s*/, '')}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-2xl hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          <p className="text-xs text-gray-600 leading-relaxed font-medium">
            Attach official lecture PPTs, professor slides, textbook PDFs, or class notes for this specific unit. The Gemini AI engine will parse the material and generate a concise <strong>1-Page Handwritten Revision Sheet</strong> strictly grounded in these sources with no out-of-syllabus fluff.
          </p>

          {/* Upload Area */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 hover:border-amber-400 bg-gray-50/80 hover:bg-amber-50/20 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".pdf,.pptx,.ppt,.txt"
              className="hidden" 
              onChange={handleFileUpload}
            />
            {uploading ? (
              <div className="flex flex-col items-center gap-2 py-2">
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                <span className="text-xs font-black text-gray-800">Parsing and indexing reference material...</span>
              </div>
            ) : (
              <>
                <div className="w-11 h-11 rounded-2xl bg-white border border-gray-200 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900">
                    Click to browse and attach Lecture PPT / Textbook PDF
                  </p>
                  <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
                    Supports PowerPoint (.pptx, .ppt), PDF (.pdf), and Text notes (.txt)
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Attached Materials List */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
              Attached Materials ({materials.length})
            </h3>
            {loading ? (
              <div className="py-6 text-center text-xs font-bold text-gray-400">Loading materials...</div>
            ) : materials.length === 0 ? (
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center text-xs font-semibold text-gray-500">
                No custom materials attached yet. Standard syllabus curricula and textbooks are used by default.
              </div>
            ) : (
              <div className="space-y-2">
                {materials.map((mat, idx) => (
                  <div 
                    key={mat.id || idx}
                    className="p-3 rounded-2xl bg-white border border-gray-200 flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                        <Paperclip className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-extrabold text-gray-900 truncate">
                          {mat.filename}
                        </p>
                        <span className="text-[10px] text-gray-400 font-bold">
                          {mat.file_size || 'Attached'}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      Grounded
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              if (onGenerateNotes) onGenerateNotes(chapterId);
            }}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-950 font-black text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-gray-950" />
            <span>Generate Grounded 1-Page Notes →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
