import React from 'react';
import { 
  LayoutDashboard, 
  FolderGit2, 
  HelpCircle, 
  FileText, 
  Target, 
  BookOpen, 
  Settings, 
  Edit3,
  LogOut,
  Briefcase
} from 'lucide-react';
import SidebarTodoList from './SidebarTodoList';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  urgentCount = 0,
  onOpenSettings,
  onOpenHelp,
  studentProfile,
  onOpenProfile,
  onLogout
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: FolderGit2 },
    { id: 'placement', label: 'DSA & Placement', icon: Briefcase },
    { id: 'quiz', label: 'Daily Quiz', icon: HelpCircle, badge: urgentCount > 0 ? `${urgentCount}` : null },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'readiness', label: 'Readiness Tracker', icon: Target },
    { id: 'pyq', label: 'PYQ Papers', icon: BookOpen },
  ];

  return (
    <aside className="w-72 bg-white border-r border-softBorder/80 flex flex-col justify-between p-4.5 shrink-0 h-screen sticky top-0 overflow-y-auto scrollbar-thin">
      <div className="flex flex-col min-h-0">
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('dashboard')}
          className="flex items-center gap-3.5 cursor-pointer mt-3 mb-7 px-3 py-1.5 rounded-2xl hover:bg-gray-50/80 transition-all group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-accentYellow flex items-center justify-center font-black text-gray-950 text-xl shadow-xs group-hover:scale-105 transition-transform shrink-0">
            ⚡
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <span className="font-extrabold text-base tracking-tight text-gray-900 leading-tight">
              ExamPrepAi
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 shrink-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-accentYellow text-gray-950 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gray-950' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black flex items-center justify-center ${
                    typeof item.badge === 'string'
                      ? 'bg-amber-400 text-gray-950 shadow-2xs'
                      : 'w-4 h-4 bg-rose-500 text-white text-[10px]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Moved To-Do List to Left Side */}
        <SidebarTodoList />
      </div>

      {/* Bottom Container: Student Profile and Settings Below Profile */}
      <div className="pt-3 border-t border-gray-100 mt-3 shrink-0 space-y-2">
        {/* Student Profile Card */}
        <button
          onClick={onOpenProfile}
          title="Click to edit profile name or photo"
          className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 border border-gray-200/80 hover:border-gray-300 transition-all group text-left shadow-3xs"
        >
          {/* Avatar with status indicator */}
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-400 p-0.5 bg-gradient-to-tr from-emerald-100 to-teal-50 flex items-center justify-center group-hover:ring-2 group-hover:ring-gray-950 transition-all">
              <img 
                src={studentProfile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"} 
                alt={studentProfile?.name || 'Adesh'} 
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                }}
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
          </div>

          {/* Student Info */}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-extrabold text-gray-900 truncate group-hover:text-gray-950">
              {studentProfile?.name || 'Adesh Savaratkar'}
            </p>
            <p className="text-[10px] text-gray-400 truncate font-medium">
              {studentProfile?.email || 'adesh.savaratkar24@spit.ac.in'}
            </p>
          </div>

          {/* Edit Icon Indicator */}
          <div className="w-6 h-6 rounded-lg bg-gray-100 group-hover:bg-accentYellow flex items-center justify-center text-gray-400 group-hover:text-gray-950 transition-colors shrink-0">
            <Edit3 className="w-3 h-3" />
          </div>
        </button>

        {/* Settings, GitHub & Logout Container Placed BELOW Profile */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenSettings}
            className="flex-1 flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-gray-600 hover:text-gray-950 hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
          >
            <Settings className="w-3.5 h-3.5 text-gray-500" />
            <span>Settings</span>
          </button>

          <a
            href="https://github.com/adeshsavaratkar21/ExamPerpAI"
            target="_blank"
            rel="noopener noreferrer"
            title="View Project on GitHub"
            className="p-2 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200 shrink-0"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>

          {onLogout && (
            <button
              onClick={onLogout}
              title="Log Out / Switch Account"
              className="p-2 rounded-xl text-xs font-bold text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-200 shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
