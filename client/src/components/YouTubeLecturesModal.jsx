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
  FileText,
  Layers,
  CheckSquare,
  Square,
  Maximize2
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
  const [viewMode, setViewMode] = useState('unit'); // 'unit' | 'playlist'
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [markingDone, setMarkingDone] = useState(false);
  const [videoDone, setVideoDone] = useState(false);
  const [watchedVideos, setWatchedVideos] = useState([]);

  useEffect(() => {
    if (!isOpen || !chapterId) {
      setData(null);
      setSelectedVideo(null);
      setSelectedPlaylist(null);
      setWatchedVideos([]);
      return;
    }

    setLoading(true);
    setError('');

    // Load local watched videos first for instant display
    try {
      const localWatched = JSON.parse(localStorage.getItem(`examprep_watched_videos_${chapterId}`) || '[]');
      if (Array.isArray(localWatched)) setWatchedVideos(localWatched);
    } catch (e) {}

    api.getChapterYouTubeLectures(chapterId)
      .then(res => {
        const d = res.data;
        setData(d);
        setVideoDone(d.video_done || false);

        // Server watched videos
        if (d.watched_videos && Array.isArray(d.watched_videos)) {
          setWatchedVideos(d.watched_videos);
          try {
            localStorage.setItem(`examprep_watched_videos_${chapterId}`, JSON.stringify(d.watched_videos));
          } catch (e) {}
        }

        const lectures = d.unit_lectures || d.lectures || [];
        if (lectures.length > 0) {
          setSelectedVideo(lectures[0]);
        }

        const playlists = d.subject_playlists || [];
        if (playlists.length > 0) {
          setSelectedPlaylist(d.active_playlist || playlists[0]);
        }
      })
      .catch(err => {
        console.error('Failed to load YouTube lectures:', err);
        setError('Failed to load curated YouTube lectures. Please check your connection.');
      })
      .finally(() => setLoading(false));
  }, [isOpen, chapterId]);

  if (!isOpen) return null;

  const lectures = data?.unit_lectures || data?.lectures || [];
  const playlists = data?.subject_playlists || [];
  const currentPlaylist = selectedPlaylist || (playlists.length > 0 ? playlists[0] : null);

  // Calculate watched stats
  const totalLectures = lectures.length;
  const watchedCount = lectures.filter(l => watchedVideos.includes(l.id)).length;
  const progressPct = totalLectures > 0 ? Math.round((watchedCount / totalLectures) * 100) : (videoDone ? 100 : 0);

  // Toggle individual lecture watch status
  const handleToggleVideoWatched = async (videoId) => {
    const isCurrentlyWatched = watchedVideos.includes(videoId);
    const nextWatched = isCurrentlyWatched
      ? watchedVideos.filter(id => id !== videoId)
      : [...watchedVideos, videoId];

    setWatchedVideos(nextWatched);
    try {
      localStorage.setItem(`examprep_watched_videos_${chapterId}`, JSON.stringify(nextWatched));
    } catch (e) {}

    try {
      const res = await api.updateChapterVideoProgress(chapterId, {
        video_id: videoId,
        watched: !isCurrentlyWatched
      });
      setVideoDone(res.data.video_done);
      if (onProgressUpdated) {
        onProgressUpdated(res.data);
      }
    } catch (err) {
      console.error('Failed to sync video watch status:', err);
    }
  };

  // Toggle overall unit video_done flag
  const handleToggleAllDone = async () => {
    if (!chapterId) return;
    const nextState = !videoDone;
    setMarkingDone(true);
    try {
      const allIds = nextState ? lectures.map(l => l.id) : [];
      setWatchedVideos(allIds);
      try {
        localStorage.setItem(`examprep_watched_videos_${chapterId}`, JSON.stringify(allIds));
      } catch (e) {}

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

  // Active video URL & Embed URL
  const activeVideoUrl = selectedVideo?.youtube_watch_url || (selectedVideo?.playlist_url || currentPlaylist?.playlist_url || 'https://www.youtube.com');
  const activeEmbedUrl = viewMode === 'playlist' 
    ? (currentPlaylist?.embed_url || `https://www.youtube.com/embed/videoseries?list=${currentPlaylist?.playlist_id}`)
    : (selectedVideo?.embed_url || currentPlaylist?.embed_url);

  // Direct open in external popout window
  const handlePopoutPlayer = (url) => {
    window.open(url, '_blank', 'width=1040,height=640,menubar=no,toolbar=no');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between gap-3 bg-gradient-to-r from-red-50/70 via-white to-amber-50/40">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Tv className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-lg bg-gray-950 text-white font-black text-[10px]">
                  {subjectCode || 'SUB'} • Unit {unitNumber || 1}
                </span>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">
                  {subjectName} Complete Lectures
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-black text-gray-900 tracking-tight truncate mt-0.5">
                {chapterName?.replace(/^Unit \d+:\s*/, '') || 'Concept Lectures'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Mark Unit Lectures Done (Step 1/4) */}
            <button
              onClick={handleToggleAllDone}
              disabled={markingDone}
              className={`px-3.5 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                videoDone
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
              title="Toggle Step 1/4 of Module Completion"
            >
              <CheckCircle2 className={`w-4 h-4 ${videoDone ? 'text-white' : 'text-red-200'}`} />
              <span className="hidden sm:inline">
                {videoDone ? '✓ Lectures Completed (Step 1/4)' : 'Mark All Completed'}
              </span>
              <span className="sm:hidden">
                {videoDone ? '✓ Done' : 'Mark Done'}
              </span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-2xl hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode Switcher & Progress Bar Strip */}
        <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Dual Mode Tabs */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-gray-200 shadow-2xs">
            <button
              onClick={() => setViewMode('unit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'unit'
                  ? 'bg-gray-950 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-950'
              }`}
            >
              <ListVideo className="w-3.5 h-3.5" />
              <span>Unit Topic Lectures ({lectures.length})</span>
            </button>
            <button
              onClick={() => setViewMode('playlist')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'playlist'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-red-700'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Complete Course Playlist ({currentPlaylist?.total_videos || 'Full'} Videos)</span>
            </button>
          </div>

          {/* Real-time Watched Progress Meter */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col sm:items-end">
              <span className="text-[11px] font-black text-gray-700">
                {watchedCount} of {totalLectures} Lectures Covered ({progressPct}%)
              </span>
              <span className="text-[10px] text-gray-400 font-semibold">
                {videoDone ? '✓ Step 1/4 (Video Lecture) Satisfied' : 'Watch lectures to fulfill Step 1/4'}
              </span>
            </div>
            <div className="w-24 sm:w-28 bg-gray-200 h-2.5 rounded-full overflow-hidden shrink-0">
              <div 
                className={`h-full transition-all duration-500 ${
                  videoDone ? 'bg-emerald-600' : 'bg-red-600'
                }`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-9 h-9 rounded-full border-4 border-red-200 border-t-red-600 animate-spin" />
              <p className="text-xs font-bold text-gray-500">Loading syllabus playlists and lectures...</p>
            </div>
          ) : error ? (
            <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-2">
              <AlertCircle className="w-7 h-7 text-rose-600 mx-auto" />
              <p className="text-xs font-bold text-rose-800">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Column: Player & Direct Links (7 cols) */}
              <div className="lg:col-span-7 space-y-3.5">
                {/* DIRECT YOUTUBE LAUNCH BAR (Guaranteed to open and play) */}
                <div className="p-3 rounded-2xl bg-red-600 text-white flex flex-wrap items-center justify-between gap-2 shadow-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-black">
                      {viewMode === 'playlist' ? 'Official Course Playlist' : (selectedVideo?.title || 'YouTube Lecture')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={viewMode === 'playlist' ? (currentPlaylist?.playlist_url || 'https://www.youtube.com') : activeVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-white text-red-700 hover:bg-gray-100 text-xs font-black flex items-center gap-1.5 shadow-xs transition-transform hover:scale-102 active:scale-98 cursor-pointer"
                      title="Open and watch directly on YouTube"
                    >
                      <Play className="w-3.5 h-3.5 fill-red-700" />
                      <span>Watch on YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => handlePopoutPlayer(viewMode === 'playlist' ? currentPlaylist?.playlist_url : activeVideoUrl)}
                      className="px-2.5 py-1.5 rounded-xl bg-red-800/80 hover:bg-red-800 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Open in focused pop-out window"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span className="hidden sm:inline">Pop-out</span>
                    </button>
                  </div>
                </div>

                {/* 16:9 Video Player Container */}
                <div className="w-full aspect-video bg-gray-950 rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative group">
                  <iframe
                    src={activeEmbedUrl}
                    title={selectedVideo?.title || 'Lecture Player'}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                {/* Video / Playlist Info Card */}
                <div className="p-4 rounded-2xl bg-gray-50/90 border border-gray-100 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md inline-block">
                          {viewMode === 'playlist' ? currentPlaylist?.channel : selectedVideo?.channel}
                        </span>
                        {selectedVideo?.duration && (
                          <span className="text-[11px] font-bold text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            {selectedVideo.duration}
                          </span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-sm sm:text-base text-gray-900 mt-1">
                        {viewMode === 'playlist' ? currentPlaylist?.title : selectedVideo?.title}
                      </h3>
                    </div>

                    {selectedVideo && viewMode === 'unit' && (
                      <button
                        onClick={() => handleToggleVideoWatched(selectedVideo.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                          watchedVideos.includes(selectedVideo.id)
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-white text-gray-700 border border-gray-300 hover:border-emerald-500'
                        }`}
                      >
                        <CheckCircle2 className={`w-3.5 h-3.5 ${watchedVideos.includes(selectedVideo.id) ? 'text-emerald-700' : 'text-gray-400'}`} />
                        <span>{watchedVideos.includes(selectedVideo.id) ? 'Watched' : 'Mark Watched'}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {viewMode === 'playlist' 
                      ? (currentPlaylist?.description || 'Full semester university curriculum playlist.')
                      : (selectedVideo?.summary || 'High-yield conceptual lecture mapped strictly to your syllabus unit.')}
                  </p>

                  {/* Matched Topics Pills */}
                  {selectedVideo?.matched_topics && selectedVideo.matched_topics.length > 0 && (
                    <div className="pt-2 border-t border-gray-200/60">
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">
                        Targeted Syllabus Topics
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedVideo.matched_topics.map((t, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/80 font-bold text-[10px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Playback troubleshooting note */}
                  <div className="pt-2 text-[11px] text-gray-500 flex items-center justify-between border-t border-gray-200/60">
                    <span>If the embed player is blocked by your browser, click <strong>"Watch on YouTube"</strong> above.</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Playlist & Interactive Video Checklist (5 cols) */}
              <div className="lg:col-span-5 space-y-3.5">
                {/* Complete Course Playlists Dropdown/List */}
                {playlists.length > 1 && (
                  <div className="p-3 rounded-2xl bg-white border border-gray-200 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                      Choose Course Playlist Series
                    </span>
                    <div className="grid grid-cols-1 gap-1.5">
                      {playlists.map((pl) => (
                        <button
                          key={pl.id}
                          onClick={() => {
                            setSelectedPlaylist(pl);
                            setViewMode('playlist');
                          }}
                          className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all flex items-center justify-between ${
                            currentPlaylist?.id === pl.id
                              ? 'bg-red-50 text-red-950 border-red-300 shadow-2xs'
                              : 'bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100'
                          }`}
                        >
                          <div className="min-w-0">
                            <span className="block truncate font-extrabold">{pl.title}</span>
                            <span className="text-[10px] text-gray-500">{pl.channel} • {pl.total_videos} Videos</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-gray-200 shrink-0 font-black">
                            {pl.is_primary ? 'Recommended' : 'Series'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Unit Lectures List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-1.5">
                      <ListVideo className="w-4 h-4 text-red-600" />
                      <h3 className="text-xs font-black uppercase tracking-wider text-gray-800">
                        Unit {unitNumber || 1} Lectures ({lectures.length})
                      </h3>
                    </div>
                    <span className="text-[11px] font-black text-emerald-700">
                      {watchedCount}/{totalLectures} Done
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                    {lectures.map((lec, idx) => {
                      const isSelected = selectedVideo?.id === lec.id;
                      const isWatched = watchedVideos.includes(lec.id);

                      return (
                        <div
                          key={lec.id || idx}
                          onClick={() => {
                            setSelectedVideo(lec);
                            setViewMode('unit');
                          }}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative ${
                            isSelected
                              ? 'bg-red-50/70 border-red-300 ring-2 ring-red-400/40 shadow-xs'
                              : 'bg-white hover:bg-gray-50 border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          {/* Watched Checkbox Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleVideoWatched(lec.id);
                            }}
                            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                              isWatched
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-400'
                            }`}
                            title={isWatched ? 'Marked as Watched' : 'Click to mark Watched'}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>

                          {/* Title & Channel details */}
                          <div className="min-w-0 flex-1 space-y-1">
                            <h4 className={`text-xs font-black line-clamp-2 leading-snug ${
                              isSelected ? 'text-red-950' : isWatched ? 'text-gray-500 line-through' : 'text-gray-900'
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

                          {/* Direct External Link Icon */}
                          <a
                            href={lec.youtube_watch_url || lec.playlist_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 rounded-lg hover:bg-gray-200/80 text-gray-400 hover:text-red-600 transition-colors shrink-0"
                            title="Open on YouTube"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4-Step Module Milestone Banner */}
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1.5 mt-3">
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
                    Check off each video as you study. When all lectures are completed, Step 1 is locked in and contributes to your course completion index.
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
