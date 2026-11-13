import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  CheckCircle2,
  ExternalLink,
  Clock,
  Sparkles,
  BookOpen,
  Tv,
  ListVideo,
  AlertCircle,
  HelpCircle,
  FileText
} from 'lucide-react';
import api from '../services/api';

export default function YouTubeLecturesModal({
  isOpen,
  onClose,
  chapterId,
  chapterName,
  subjectCode,
  subjectName,
  unitNumber,
  onProgressUpdated
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [markingDone, setMarkingDone] = useState(false);
  const [videoDone, setVideoDone] = useState(false);

  useEffect(() => {
    if (!isOpen || !chapterId) {
      setData(null);
      setSelectedVideo(null);
      return;
    }

    setLoading(true);
    setError('');
    api.getChapterYouTubeLectures(chapterId)
      .then(res => {
        setData(res.data);
        setVideoDone(res.data.video_done || false);
        if (res.data.lectures && res.data.lectures.length > 0) {
          setSelectedVideo(res.data.lectures[0]);
        }
      })
      .catch(err => {
        console.error('Failed to load YouTube lectures:', err);
        setError('Failed to load curated YouTube lectures. Please check your connection.');
      })
      .finally(() => setLoading(false));
  }, [isOpen, chapterId]);

  if (!isOpen) return null;

  const lectures = data?.lectures || [];

  const handleToggleVideoDone = async () => {
    if (!chapterId) return;
    const nextState = !videoDone;
    setMarkingDone(true);
    try {
      const res = await api.updateChapterProgress(chapterId, { video_done: nextState });
      setVideoDone(nextState);
      if (onProgressUpdated) {
        onProgressUpdated(res.data);
      }
    } catch (err) {
      console.error('Failed to update video progress:', err);
    } finally {
      setMarkingDone(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-4 bg-gradient-to-r from-red-50/50 via-white to-amber-50/40">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Tv className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-lg bg-gray-950 text-white font-black text-[10px]">
                  {subjectCode || 'SUB'} • Unit {unitNumber || 1}
                </span>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Curated YouTube Concept Lectures
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight truncate mt-0.5">
                {chapterName?.replace(/^Unit \d+:\s*/, '') || 'Concept Lectures'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Mark Lecture Completed (Step 1/4) Toggle */}
            <button
              onClick={handleToggleVideoDone}
              disabled={markingDone}
              className={`px-3.5 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                videoDone
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
              title="Toggle Step 1/4 of Module Completion"
            >
              <CheckCircle2 className={`w-4 h-4 ${videoDone ? 'text-white' : 'text-red-200'}`} />
              <span>{videoDone ? '✓ Lecture Completed (Step 1/4)' : 'Mark Lecture Completed'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-2xl hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-9 h-9 rounded-full border-4 border-red-200 border-t-red-600 animate-spin" />
              <p className="text-xs font-bold text-gray-500">Curating top-rated syllabus YouTube lectures...</p>
            </div>
          ) : error ? (
            <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-2">
              <AlertCircle className="w-7 h-7 text-rose-600 mx-auto" />
              <p className="text-xs font-bold text-rose-800">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Embedded Player & Current Video Details (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {selectedVideo ? (
                  <>
                    {/* 16:9 Video Player Container */}
                    <div className="w-full aspect-video bg-gray-950 rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative group">
                      <iframe
                        src={selectedVideo.embed_url}
                        title={selectedVideo.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>

                    {/* Video Info Card */}
                    <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md inline-block">
                            {selectedVideo.channel}
                          </span>
                          <h3 className="font-extrabold text-sm sm:text-base text-gray-900 leading-snug">
                            {selectedVideo.title}
                          </h3>
                        </div>

                        <a
                          href={selectedVideo.youtube_url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1 shrink-0 transition-colors"
                          title="Open directly on YouTube"
                        >
                          <span>Watch on YT</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {selectedVideo.summary && (
                        <p className="text-xs text-gray-600 leading-relaxed font-medium">
                          {selectedVideo.summary}
                        </p>
                      )}

                      {/* Matched Syllabus Subtopics */}
                      {selectedVideo.matched_topics && selectedVideo.matched_topics.length > 0 && (
                        <div className="pt-2 border-t border-gray-200/60">
                          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1.5">
                            Targeted Syllabus Sub-Topics
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedVideo.matched_topics.map((t, idx) => (
                              <span 
                                key={idx} 
                                className="px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/80 font-bold text-[11px]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-xs font-bold">
                    Select a lecture playlist from the right panel
                  </div>
                )}
              </div>

              {/* Right Column: Curated Syllabus Video Playlist (5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-1.5">
                    <ListVideo className="w-4 h-4 text-red-600" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-gray-700">
                      Syllabus Lectures ({lectures.length})
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-400">
                    Strict Unit Scope
                  </span>
                </div>

                <div className="space-y-2.5">
                  {lectures.map((lec, idx) => {
                    const isSelected = selectedVideo?.id === lec.id;
                    return (
                      <div
                        key={lec.id || idx}
                        onClick={() => setSelectedVideo(lec)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'bg-red-50/60 border-red-300 ring-2 ring-red-400/40 shadow-xs'
                            : 'bg-white hover:bg-gray-50 border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        {/* Video Thumbnail with duration badge */}
                        <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-900 shadow-2xs">
                          <img
                            src={lec.thumbnail}
                            alt={lec.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-red-600/90 text-white flex items-center justify-center">
                              <Play className="w-3 h-3 fill-white ml-0.5" />
                            </div>
                          </div>
                          {lec.duration && (
                            <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1 rounded">
                              {lec.duration}
                            </span>
                          )}
                        </div>

                        {/* Title & Channel details */}
                        <div className="min-w-0 flex-1 space-y-1">
                          <h4 className={`text-xs font-black line-clamp-2 leading-snug ${
                            isSelected ? 'text-red-950' : 'text-gray-900'
                          }`}>
                            {lec.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-semibold">
                            <span className="text-red-700 font-extrabold">{lec.channel}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5">
                              <Clock className="w-3 h-3 text-gray-400" />
                              {lec.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 4-Step Module Milestone Banner */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase text-amber-900 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      4-Step Module Completion
                    </span>
                    <span className="text-xs font-black text-amber-950">
                      Step 1 of 4
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
                    Watch this lecture and click <strong>"Mark Lecture Completed"</strong> to unlock Step 1. Module only counts toward course completion when all 4 steps (Video, Notes, PYQs, Quiz) are done.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
