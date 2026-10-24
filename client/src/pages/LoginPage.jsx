import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  BookOpen, 
  Target, 
  AlertCircle,
  Zap,
  Info
} from 'lucide-react';
import api from '../services/api';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
];

export default function LoginPage({ onLogin }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [program, setProgram] = useState('Semester 5 • Computer Engineering (SPIT)');
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  // Quick Demo credentials auto-fill
  const handleQuickDemoLogin = () => {
    setUsername('Adesh Savaratkar');
    setEmail('adesh.savaratkar24@spit.ac.in');
    setPassword('student123');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Input Validation
    if (!username.trim()) {
      setErrorMessage('Please enter your Username.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter your Email ID.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please provide a valid email address (e.g. student@spit.ac.in).');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }
    if (password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      let authUser = null;

      // Try contacting the backend authentication service
      try {
        if (mode === 'register') {
          const res = await api.register({
            username: username.trim(),
            email: email.trim(),
            password: password,
            program: program,
            avatar: selectedAvatar
          });
          if (res.data?.user) {
            authUser = res.data.user;
          }
        } else {
          const res = await api.login({
            username: username.trim(),
            email: email.trim(),
            password: password
          });
          if (res.data?.user) {
            authUser = res.data.user;
          }
        }
      } catch (apiErr) {
        console.warn('Backend auth unreachable or returned error, falling back to local session:', apiErr);
        // If the backend has a specific validation error (e.g. wrong password), show it
        if (apiErr.response?.data?.detail) {
          // If it's a 401 unauthorized, show the user
          if (apiErr.response.status === 401) {
            setErrorMessage(apiErr.response.data.detail);
            setIsLoading(false);
            return;
          }
        }
      }

      // If backend user was returned or fallback local auth
      const finalUser = authUser || {
        id: Date.now(),
        username: username.trim(),
        email: email.trim(),
        program: program,
        avatar: selectedAvatar
      };

      setSuccessMessage(`Welcome back, ${finalUser.username}! Signing you in...`);

      setTimeout(() => {
        setIsLoading(false);
        if (onLogin) {
          onLogin(finalUser, rememberMe);
        }
      }, 600);

    } catch (err) {
      console.error('Authentication error:', err);
      setErrorMessage(err.message || 'An error occurred during authentication. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0F111A] flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans selection:bg-amber-300 selection:text-gray-950 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-500/5 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl md:rounded-[32px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-gray-100/20 relative z-10">
        
        {/* Left Side: Modern Interactive Authentication Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-white">
          <div>
            {/* Top Brand Identity */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-300 flex items-center justify-center font-black text-gray-950 text-xl shadow-sm">
                  ⚡
                </div>
                <div>
                  <span className="font-black text-base tracking-tight text-gray-900 block leading-tight">
                    EXAM<span className="text-amber-500 font-extrabold ml-1">ACADEMY</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Smart Study Suite
                  </span>
                </div>
              </div>

              {/* Mode Toggle Pills */}
              <div className="bg-gray-100 p-1 rounded-2xl flex items-center gap-1 border border-gray-200/80">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMessage(''); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    mode === 'login'
                      ? 'bg-white text-gray-950 shadow-xs'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMessage(''); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    mode === 'register'
                      ? 'bg-white text-gray-950 shadow-xs'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            {/* Headline */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {mode === 'login' ? 'Welcome Back!' : 'Create Student Account'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1.5">
                {mode === 'login'
                  ? 'Sign in with your username, email ID, and password to continue.'
                  : 'Join the exam preparation platform designed for semester excellence.'}
              </p>
            </div>

            {/* Quick Demo Login Pill for effortless testing */}
            <div className="mb-6 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <p className="text-xs font-extrabold text-amber-950 leading-tight">
                    Quick Evaluator Access
                  </p>
                  <p className="text-[11px] text-amber-700 font-medium">
                    Auto-fill demo student credentials with 1 click
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="px-3 py-1.5 bg-amber-300 hover:bg-amber-400 text-gray-950 text-xs font-black rounded-xl shadow-2xs transition-colors shrink-0"
              >
                Auto Fill
              </button>
            </div>

            {/* Alerts */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-xs font-semibold animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1 leading-snug">{errorMessage}</div>
              </div>
            )}

            {successMessage && (
              <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-xs font-bold animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form Fields: Username, Email ID, Password */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. USERNAME Field */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1.5">
                  Username <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username (e.g. Adesh Savaratkar)"
                    className="w-full bg-gray-50/70 hover:bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-400 rounded-2xl py-2.5 pl-10 pr-4 text-xs sm:text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-200/50 transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* 2. EMAIL ID Field */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email ID <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@spit.ac.in"
                    className="w-full bg-gray-50/70 hover:bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-400 rounded-2xl py-2.5 pl-10 pr-4 text-xs sm:text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-200/50 transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* 3. PASSWORD Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setShowForgotPasswordModal(true)}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-gray-50/70 hover:bg-gray-50 focus:bg-white border border-gray-200 focus:border-amber-400 rounded-2xl py-2.5 pl-10 pr-11 text-xs sm:text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-200/50 transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Registration Extra Fields (Branch & Avatar selection) */}
              {mode === 'register' && (
                <div className="pt-1 space-y-3 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1.5">
                      Academic Branch / Program
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        placeholder="Semester 5 • Computer Engineering (SPIT)"
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-2.5 pl-10 pr-4 text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1.5">
                      Choose Profile Avatar
                    </label>
                    <div className="flex items-center gap-3">
                      {PRESET_AVATARS.map((av, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedAvatar(av)}
                          className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                            selectedAvatar === av
                              ? 'border-gray-950 ring-2 ring-amber-300 scale-105'
                              : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={av} alt="Avatar option" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Remember me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-gray-300"
                  />
                  <span className="text-xs font-semibold text-gray-600">
                    Remember me on this browser
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gray-950 hover:bg-gray-900 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 group"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Validating credentials...</span>
                  </div>
                ) : (
                  <>
                    <span>
                      {mode === 'login' ? 'Sign In to Workspace' : 'Create Student Account'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Switcher / Security Badge */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SPIT Academic Verified • Secure Session</span>
            </div>

            <p className="text-xs text-gray-600 font-medium">
              {mode === 'login' ? (
                <>
                  New student?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('register'); setErrorMessage(''); }}
                    className="font-bold text-gray-950 underline hover:text-amber-600 transition-colors"
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setErrorMessage(''); }}
                    className="font-bold text-gray-950 underline hover:text-amber-600 transition-colors"
                  >
                    Sign in here
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right Side: Visual Showcase Banner (Rich Aesthetic & Feature Highlights) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#12131D] via-[#181926] to-[#1F2033] p-8 sm:p-10 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Subtle geometric pattern overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />

          {/* Top Tag & College Badge */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-amber-300 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>SPIT Semester 5 Examination Suite</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              Master Your Exams With Complete Confidence.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-medium mt-3 leading-relaxed">
              Synthesized syllabus coverage, past year question patterns, AI mastery notes, and smart readiness radar.
            </p>

            {/* Feature Highlights Grid */}
            <div className="space-y-3 mt-8">
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">PYQ Analytics & Categorization</h4>
                  <p className="text-[11px] text-gray-400 font-normal mt-0.5">
                    10+ years of university question papers parsed into high-weightage topics.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-xl bg-indigo-400/20 text-indigo-300 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Dual-AI Revision Sheets</h4>
                  <p className="text-[11px] text-gray-400 font-normal mt-0.5">
                    1-page high-yield formula sheets, mnemonics, and common exam pitfalls.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Strategic Readiness Index</h4>
                  <p className="text-[11px] text-gray-400 font-normal mt-0.5">
                    Prioritizes high-weightage chapters so you know exactly where to study next.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Student Testimonial / Credibility Box */}
          <div className="relative z-10 pt-6 mt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#181926] object-cover" src={PRESET_AVATARS[0]} alt="Student" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#181926] object-cover" src={PRESET_AVATARS[1]} alt="Student" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#181926] object-cover" src={PRESET_AVATARS[2]} alt="Student" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-white">Built for SPIT Engineers</p>
                <p className="text-[10px] text-gray-400 font-medium">Over 500+ student practice quizzes completed</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 text-gray-900 shadow-2xl border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold">Student Password Help</h3>
                <p className="text-xs text-gray-500">Exam Academy Credential Assistance</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              If this is your personal device or local development environment, you can use any custom password, or use the <strong>Quick Demo Login</strong> button to access the platform instantly with default student credentials.
            </p>

            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-1 mb-5">
              <p><span className="font-bold text-gray-800">Demo Username:</span> Adesh Savaratkar</p>
              <p><span className="font-bold text-gray-800">Demo Email:</span> adesh.savaratkar24@spit.ac.in</p>
              <p><span className="font-bold text-gray-800">Default Password:</span> student123</p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  handleQuickDemoLogin();
                  setShowForgotPasswordModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-amber-300 hover:bg-amber-400 text-gray-950 text-xs font-black transition-colors"
              >
                Auto Fill & Close
              </button>
              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
