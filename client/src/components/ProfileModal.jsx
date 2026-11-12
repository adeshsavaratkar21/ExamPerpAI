import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Camera, Upload, Check, User, Mail, GraduationCap, 
  Image as ImageIcon, LogOut, ShieldCheck, Clock, Globe, 
  Laptop, RefreshCw, Trash2, ExternalLink, Smartphone, AlertCircle
} from 'lucide-react';
import api from '../services/api';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const PRESET_AVATARS = [
  {
    name: 'Melissa (Default)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Alex',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Priya',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Jordan',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Elena',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'David',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export default function ProfileModal({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
  onLogout
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'history'
  const [name, setName] = useState(currentProfile?.name || 'Adesh Savaratkar');
  const [email, setEmail] = useState(currentProfile?.email || 'adesh.savaratkar24@spit.ac.in');
  const [program, setProgram] = useState(currentProfile?.program || 'Semester 5 • Computer Engineering (SPIT)');
  const [avatar, setAvatar] = useState(currentProfile?.avatar || PRESET_AVATARS[0].url);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Login History State
  const [loginHistory, setLoginHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState(null);

  const fetchLoginHistory = async () => {
    setLoadingHistory(true);
    setHistoryError(null);
    try {
      const res = await api.getLoginHistory(50);
      setLoginHistory(res.data || []);
    } catch (err) {
      console.error('Failed to load login history:', err);
      setHistoryError('Unable to load login history from backend.');
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'history') {
      fetchLoginHistory();
    }
  }, [isOpen, activeTab]);

  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear login history logs?')) return;
    try {
      await api.clearLoginHistory();
      setLoginHistory([]);
    } catch (err) {
      console.error('Failed to clear login history:', err);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size exceeds 5MB limit. Please choose a smaller photo.');
      return;
    }

    setErrorMessage('');
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAvatar(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomUrl = () => {
    if (!customUrl.trim()) return;
    setAvatar(customUrl.trim());
    setShowUrlInput(false);
    setCustomUrl('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const updated = {
      name: name.trim(),
      email: email.trim() || 'student@university.edu',
      program: program.trim() || 'Semester 5 • Engineering',
      avatar: avatar
    };

    // Save to backend database so profile edits are permanently saved across sessions
    try {
      await api.updateProfile({
        username: updated.name,
        email: updated.email,
        program: updated.program,
        avatar: updated.avatar
      });
    } catch (err) {
      console.warn('Backend profile update note:', err);
    }

    onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const formatLogTime = (isoString) => {
    if (!isoString) return 'Just now';
    try {
      const date = new Date(isoString.endsWith('Z') ? isoString : `${isoString}Z`);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);

      let relative = '';
      if (diffMins < 1) relative = 'Just now';
      else if (diffMins < 60) relative = `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
      else if (diffHours < 24) relative = `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;
      else relative = date.toLocaleDateString();

      return `${relative} • ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#FAFAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-300 flex items-center justify-center text-gray-950 font-black shadow-xs">
              {activeTab === 'profile' ? <User className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5 text-gray-950" />}
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">
                {activeTab === 'profile' ? 'Student Profile' : 'User Login & Security History'}
              </h2>
              <p className="text-xs text-gray-400 font-medium">
                {activeTab === 'profile' ? 'Update personal credentials & avatar' : 'Audit logs of user logins, IP addresses & devices'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-gray-100 px-6 bg-white gap-2 pt-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-amber-400 text-gray-900'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile Details</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-amber-400 text-gray-900'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Login Activity & Devices</span>
            {loginHistory.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold">
                {loginHistory.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab 1: Profile Details */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSave} className="p-6 space-y-6 overflow-y-auto">
            {errorMessage && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {/* Photo Selection Section */}
            <div className="flex flex-col items-center">
              <div className="relative group mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-amber-300/80 shadow-md bg-gray-100 flex items-center justify-center">
                  <img
                    src={avatar}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = PRESET_AVATARS[0].url;
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload Photo from Device"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gray-950 text-white flex items-center justify-center border-2 border-white shadow-md hover:bg-gray-800 transition-all hover:scale-105"
                >
                  <Camera className="w-4 h-4" />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-gray-500" />
                  Upload Photo
                </button>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-gray-500" />
                  Image URL
                </button>
              </div>

              {showUrlInput && (
                <div className="w-full flex items-center gap-2 mb-4 bg-gray-50 p-2 rounded-2xl border border-gray-200/80">
                  <input
                    type="url"
                    placeholder="Paste image URL (https://...)"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCustomUrl}
                    className="px-3 py-1.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800"
                  >
                    Apply
                  </button>
                </div>
              )}

              {/* Avatar Preset Grid */}
              <div className="w-full">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 text-center">
                  Or pick an avatar style
                </label>
                <div className="flex items-center justify-center gap-2.5 flex-wrap">
                  {PRESET_AVATARS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatar(p.url)}
                      className={`relative w-11 h-11 rounded-full overflow-hidden border-2 transition-all ${
                        avatar === p.url
                          ? 'border-amber-400 ring-2 ring-amber-300 scale-105'
                          : 'border-transparent hover:border-gray-300 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                      {avatar === p.url && (
                        <div className="absolute inset-0 bg-amber-400/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-gray-950 font-black drop-shadow" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Adesh Savaratkar"
                    className="w-full bg-white border border-gray-200 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-gray-900 font-semibold focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. student@spit.ac.in"
                    className="w-full bg-white border border-gray-200 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-gray-900 font-semibold focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1.5">
                  Academic Program & Semester
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    placeholder="e.g. Semester 5 • Computer Engineering"
                    className="w-full bg-white border border-gray-200 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-gray-900 font-semibold focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 shadow-2xs"
                  />
                </div>
              </div>

              {/* GitHub Developer Profile */}
              <div className="pt-1">
                <a
                  href="https://github.com/adeshsavaratkar21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#F8F9FD] border border-gray-200/80 hover:border-gray-300 hover:bg-gray-100/70 transition-all group"
                  title="Open GitHub Profile"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-gray-950 text-white flex items-center justify-center shrink-0">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 leading-tight">Adesh Savaratkar</p>
                      <p className="text-[10px] text-gray-500 font-medium">github.com/adeshsavaratkar21</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
              {onLogout ? (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onLogout();
                  }}
                  className="px-4 py-2.5 rounded-2xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              ) : <div />}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-2xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-gray-950 text-white font-extrabold text-xs hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      Saved!
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Tab 2: Login Activity & Devices Audit Trail */}
        {activeTab === 'history' && (
          <div className="p-6 space-y-5 overflow-y-auto flex-1">
            {/* Header info / Actions */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-extrabold text-gray-900">Recent Login Events</h3>
                <p className="text-xs text-gray-500">
                  Track authenticated sessions, client IP addresses & devices.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchLoginHistory}
                  disabled={loadingHistory}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all disabled:opacity-50"
                  title="Refresh activity logs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-gray-500 ${loadingHistory ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>

                {loginHistory.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-all"
                    title="Clear audit logs"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            {/* Vercel Cloud Server Tip */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/60 flex items-start gap-3">
              <Globe className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <span className="font-bold">Cloud Server Logs (Vercel):</span> Every login request is also logged in real time at{' '}
                <a 
                  href="https://vercel.com/dashboard" 
                  target="_blank" 
                  rel="noreferrer"
                  className="font-bold underline hover:text-amber-950 inline-flex items-center gap-0.5"
                >
                  Vercel Project &gt; Logs <ExternalLink className="w-3 h-3" />
                </a>{' '}
                filtering by <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">/api/auth/login</code>.
              </div>
            </div>

            {/* Error Message if any */}
            {historyError && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{historyError}</span>
              </div>
            )}

            {/* History List */}
            {loadingHistory ? (
              <div className="py-12 flex flex-col items-center justify-center text-gray-400 gap-2">
                <RefreshCw className="w-6 h-6 animate-spin text-amber-400" />
                <span className="text-xs font-semibold">Loading authentication logs...</span>
              </div>
            ) : loginHistory.length === 0 ? (
              <div className="py-10 text-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-6">
                <ShieldCheck className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-700">No login records logged yet</p>
                <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                  Sign in or log out to generate real-time authentication events.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {loginHistory.map((item) => {
                  const isSuccess = item.status?.includes('SUCCESS') || item.status?.includes('REGISTERED');
                  const isMobile = item.device_info?.toLowerCase().includes('mobile');

                  return (
                    <div 
                      key={item.id}
                      className="p-3.5 rounded-2xl border border-gray-100 bg-[#FAFAFC] hover:bg-white hover:border-gray-200 transition-all flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isSuccess ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                        }`}>
                          {isMobile ? <Smartphone className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-gray-900 truncate">
                              {item.username}
                            </span>
                            <span className="text-[11px] text-gray-400 truncate">
                              ({item.email || 'No email'})
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              isSuccess ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {isSuccess ? 'Active / Success' : 'Failed'}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-[11px] text-gray-500 mt-1 flex-wrap">
                            <span className="flex items-center gap-1 font-mono text-[10.5px] text-gray-600">
                              <Globe className="w-3 h-3 text-gray-400" />
                              IP: {item.ip_address || '127.0.0.1'}
                            </span>
                            <span>•</span>
                            <span>{item.device_info || 'Unknown Device'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1 justify-end">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {formatLogTime(item.login_time)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Direct JSON API link */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>Direct Audit Feed:</span>
              <a
                href="/api/auth/login-history"
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 hover:text-gray-900 font-bold underline flex items-center gap-1"
              >
                <span>/api/auth/login-history</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
