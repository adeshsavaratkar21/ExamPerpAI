import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import RightRail from './components/RightRail';
import Dashboard from './pages/Dashboard';
import CoursesPage from './pages/CoursesPage';
import FileUploader from './components/FileUploader';
import QuizPage from './pages/QuizPage';
import NotesPage from './pages/NotesPage';
import SyllabusPage from './pages/SyllabusPage';
import SettingsModal from './components/SettingsModal';
import ProfileModal from './components/ProfileModal';
import LoginPage from './pages/LoginPage';
import PlacementPage from './pages/PlacementPage';
import DsaProgressRail from './components/placement/DsaProgressRail';
import api from './services/api';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('examprep_auth_user') || sessionStorage.getItem('examprep_auth_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load auth user:', e);
    }
    return null;
  });

  const [currentTab, setCurrentTab] = useState('dashboard');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [activeChapterForQuiz, setActiveChapterForQuiz] = useState(null);
  const [activeChapterForNotes, setActiveChapterForNotes] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [urgentTopicsCount, setUrgentTopicsCount] = useState(0);

  const [initialLoading, setInitialLoading] = useState(true);
  const [initialError, setInitialError] = useState(null);

  // Student Profile state loaded from localStorage with default fallback
  const [studentProfile, setStudentProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('examprep_student_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load student profile:', e);
    }
    return {
      name: "Adesh Savaratkar",
      email: "adesh.savaratkar24@spit.ac.in",
      program: "Semester 5 • Computer Engineering (SPIT)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    };
  });

  const handleSaveProfile = (updatedProfile) => {
    setStudentProfile(updatedProfile);
    localStorage.setItem('examprep_student_profile', JSON.stringify(updatedProfile));
    if (currentUser?.email) {
      localStorage.setItem(`examprep_profile_${currentUser.email}`, JSON.stringify(updatedProfile));
      api.updateProfile({
        username: updatedProfile.name,
        email: currentUser.email,
        program: updatedProfile.program,
        avatar: updatedProfile.avatar
      }).catch(() => {});
    }
  };

  const restoreUserProgress = async (user) => {
    if (!user || !user.email) return;
    try {
      // 1. Fetch saved progress from backend
      const res = await api.getUserProgress(user.email);
      const backendProgress = res.data?.progress || {};

      // 2. Also check local storage for user-scoped data
      const localTasks = JSON.parse(localStorage.getItem(`examprep_tasks_${user.email}`) || 'null');
      const localExams = JSON.parse(localStorage.getItem(`examprep_exams_${user.email}`) || 'null');
      const localProfile = JSON.parse(localStorage.getItem(`examprep_profile_${user.email}`) || 'null');

      // Tasks: backend takes precedence if non-empty, otherwise local
      const effectiveTasks = (backendProgress.tasks && backendProgress.tasks.length > 0)
        ? backendProgress.tasks
        : (localTasks || null);

      if (effectiveTasks) {
        localStorage.setItem(`examprep_tasks_${user.email}`, JSON.stringify(effectiveTasks));
        localStorage.setItem('examprep_daily_tasks', JSON.stringify(effectiveTasks));
        window.dispatchEvent(new CustomEvent('examprep_tasks_synced', { detail: effectiveTasks }));
      }

      // Exams: backend takes precedence if non-empty, otherwise local
      const effectiveExams = (backendProgress.upcoming_exams && backendProgress.upcoming_exams.length > 0)
        ? backendProgress.upcoming_exams
        : (localExams || null);

      if (effectiveExams) {
        localStorage.setItem(`examprep_exams_${user.email}`, JSON.stringify(effectiveExams));
        localStorage.setItem('examprep_upcoming_exams', JSON.stringify(effectiveExams));
        window.dispatchEvent(new CustomEvent('examprep_exams_synced', { detail: effectiveExams }));
      }

      // Profile
      const effectiveProfile = {
        name: user.username || backendProgress.profile?.name || localProfile?.name || studentProfile.name,
        email: user.email,
        program: user.program || backendProgress.profile?.program || localProfile?.program || studentProfile.program,
        avatar: user.avatar || backendProgress.profile?.avatar || localProfile?.avatar || studentProfile.avatar
      };
      setStudentProfile(effectiveProfile);
      localStorage.setItem('examprep_student_profile', JSON.stringify(effectiveProfile));
      localStorage.setItem(`examprep_profile_${user.email}`, JSON.stringify(effectiveProfile));

      // Synchronize latest state back to backend if backend was empty
      if (!backendProgress.tasks && effectiveTasks) {
        api.saveUserProgress({
          email: user.email,
          progress: {
            tasks: effectiveTasks,
            upcoming_exams: effectiveExams,
            profile: effectiveProfile
          }
        }).catch(() => {});
      }
    } catch (err) {
      console.error('Failed to restore user progress:', err);
    }
  };

  // Fetch subjects and API status on launch
  const loadInitialData = async () => {
    setInitialLoading(true);
    setInitialError(null);
    try {
      const [subjectsRes, statusRes] = await Promise.all([
        api.getSubjects(),
        api.getApiStatus()
      ]);

      const subList = Array.isArray(subjectsRes.data) ? subjectsRes.data : [];
      setSubjects(subList);
      if (subList.length > 0) {
        setSelectedSubjectId(prev => prev || subList[0].id);
      }
      setApiStatus(statusRes.data);

      if (subList.length > 0) {
        api.getReadinessReport(subList[0].id)
          .then(r => setUrgentTopicsCount(r.data?.urgent_topics?.length || 0))
          .catch(() => {});
      }
    } catch (err) {
      console.error('Failed to load initial data:', err);
      setInitialError(err.message || 'Unable to connect to backend server');
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
    if (currentUser) {
      restoreUserProgress(currentUser);
    }
  }, []);

  // Sync user progress changes to backend
  useEffect(() => {
    if (!currentUser?.email) return;

    const handleTasksChanged = (e) => {
      const tasks = e.detail;
      api.getUserProgress(currentUser.email).then(res => {
        const currentProgress = res.data?.progress || {};
        api.saveUserProgress({
          email: currentUser.email,
          progress: { ...currentProgress, tasks }
        }).catch(() => {});
      }).catch(() => {});
    };

    const handleExamsChanged = (e) => {
      const upcoming_exams = e.detail;
      api.getUserProgress(currentUser.email).then(res => {
        const currentProgress = res.data?.progress || {};
        api.saveUserProgress({
          email: currentUser.email,
          progress: { ...currentProgress, upcoming_exams }
        }).catch(() => {});
      }).catch(() => {});
    };

    window.addEventListener('examprep_tasks_changed', handleTasksChanged);
    window.addEventListener('examprep_exams_changed', handleExamsChanged);

    return () => {
      window.removeEventListener('examprep_tasks_changed', handleTasksChanged);
      window.removeEventListener('examprep_exams_changed', handleExamsChanged);
    };
  }, [currentUser]);

  const handleLoginSuccess = (user, rememberMe = true) => {
    setCurrentUser(user);
    if (rememberMe) {
      localStorage.setItem('examprep_auth_user', JSON.stringify(user));
    } else {
      sessionStorage.setItem('examprep_auth_user', JSON.stringify(user));
    }

    restoreUserProgress(user);
    loadInitialData();
  };

  const handleLogout = () => {
    localStorage.removeItem('examprep_auth_user');
    sessionStorage.removeItem('examprep_auth_user');
    setCurrentUser(null);
  };

  const handleLaunchQuizForChapter = (chapterId) => {
    setActiveChapterForQuiz(chapterId);
    setCurrentTab('quiz');
  };

  const handleViewNotesForChapter = (chapterId) => {
    setActiveChapterForNotes(chapterId);
    setCurrentTab('notes');
  };

  const subjectsList = Array.isArray(subjects) ? subjects : [];
  const currentSubject = subjectsList.find(s => s.id === Number(selectedSubjectId)) || subjectsList[0];

  // If user is not authenticated, display the dedicated Login Page
  if (!currentUser) {
    return <LoginPage onLogin={handleLoginSuccess} />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F8F9FD] flex flex-row text-gray-900 font-sans">
      {/* 1. Left Sidebar Navigation & Study To-Do List */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        urgentCount={urgentTopicsCount}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setCurrentTab('notes')}
        studentProfile={studentProfile}
        onOpenProfile={() => setIsProfileOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. Center Main View Area (Full Desktop Workspace) */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#F8F9FD] px-5 sm:px-7 py-5">
        {/* Top Header with Greeting, Search Bar, Profile Avatar */}
        <TopHeader
            studentName={studentProfile.name}
            studentProfile={studentProfile}
            urgentCount={urgentTopicsCount}
            subjects={subjects}
            selectedSubjectId={selectedSubjectId}
            setSelectedSubjectId={setSelectedSubjectId}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenProfile={() => setIsProfileOpen(true)}
            onLogout={handleLogout}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Active Tab View */}
          <main className="flex-1">
            {currentTab === 'dashboard' && (
              <Dashboard
                selectedSubjectId={selectedSubjectId}
                setSelectedSubjectId={setSelectedSubjectId}
                subjects={subjects}
                initialLoading={initialLoading}
                initialError={initialError}
                onRetryInitial={loadInitialData}
                onNavigateTab={setCurrentTab}
                onLaunchQuizForChapter={handleLaunchQuizForChapter}
                onViewNotesForChapter={handleViewNotesForChapter}
              />
            )}

            {currentTab === 'courses' && (
              <CoursesPage
                selectedSubjectId={selectedSubjectId}
                setSelectedSubjectId={setSelectedSubjectId}
                subjects={subjects}
                onLaunchQuizForChapter={handleLaunchQuizForChapter}
                onViewNotesForChapter={handleViewNotesForChapter}
                onNavigateTab={setCurrentTab}
              />
            )}

            {currentTab === 'pyq' && (
              <FileUploader
                selectedSubjectId={selectedSubjectId}
                subjects={subjects}
                onNavigateToQuiz={handleLaunchQuizForChapter}
              />
            )}

            {currentTab === 'quiz' && (
              <QuizPage
                selectedSubjectId={selectedSubjectId}
                subjects={subjects}
                initialChapterId={activeChapterForQuiz}
                onNavigateToNotes={handleViewNotesForChapter}
              />
            )}

            {currentTab === 'notes' && (
              <NotesPage
                selectedSubjectId={selectedSubjectId}
                subjects={subjects}
                initialChapterId={activeChapterForNotes}
                onNavigateToQuiz={handleLaunchQuizForChapter}
              />
            )}

            {currentTab === 'readiness' && (
              <SyllabusPage
                selectedSubjectId={selectedSubjectId}
                subjects={subjects}
                onNavigateToQuiz={handleLaunchQuizForChapter}
                onNavigateToNotes={handleViewNotesForChapter}
                refreshSubjects={loadInitialData}
              />
            )}

            {currentTab === 'placement' && (
              <PlacementPage
                studentProfile={studentProfile}
              />
            )}
          </main>
        </div>

        {/* 3. Right Rail: DSA Practice Tracker when on placement tab, Academic Schedule otherwise */}
        <div className="hidden xl:block">
          {currentTab === 'placement' ? (
            <DsaProgressRail
              studentProfile={studentProfile}
              onNavigateTab={setCurrentTab}
            />
          ) : (
            <RightRail
              currentSubject={currentSubject}
              subjects={subjects}
              selectedSubjectId={selectedSubjectId}
              onSelectSubject={(id) => {
                setSelectedSubjectId(id);
              }}
              studentProfile={studentProfile}
              onOpenEditProfile={() => setIsProfileOpen(true)}
              onNavigateToQuiz={handleLaunchQuizForChapter}
              onNavigateToNotes={handleViewNotesForChapter}
              onNavigateTab={setCurrentTab}
            />
          )}
        </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiStatus={apiStatus}
        onStatusUpdated={loadInitialData}
        onSubjectCreated={(newId) => {
          loadInitialData().then(() => {
            if (newId) setSelectedSubjectId(newId);
          });
        }}
      />

      {/* Edit Profile Modal (Workable button & persistence) */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentProfile={studentProfile}
        onSaveProfile={handleSaveProfile}
        onLogout={handleLogout}
      />
    </div>
  );
}
