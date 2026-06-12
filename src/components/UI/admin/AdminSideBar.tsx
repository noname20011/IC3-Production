import {
  Home,
  Trophy,
  ClipboardList,
  Settings,
  LayoutGrid,
  Database,
  LogIn,
  BarChart3,
  BookOpen,
  HelpCircle,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type AdminScreen = string;

interface AdminSidebarProps {
  active: AdminScreen;
  onNavigate: (screen: AdminScreen) => void;
}

const navGroups = [
  {
    label: "Main",
    items: [
      { id: "devotion", icon: Home, label: "Home" },
      { id: "leaderboard", icon: Trophy, label: "Leaderboard" },
      { id: "quiz", icon: ClipboardList, label: "Quiz" },
    ],
  },
  {
    label: "Exam Portal",
    items: [{ id: "quizlist", icon: BookOpen, label: "Quiz Levels" }],
  },
  {
    label: "Administration",
    items: [
      { id: "adminlogin", icon: LogIn, label: "Admin Login" },
      { id: "adminconfig", icon: LayoutGrid, label: "Exam Config" },
      { id: "datamgmt", icon: Database, label: "Data Management" },
      { id: "adminleaderboard", icon: BarChart3, label: "Results & Ranking" },
    ],
  },
];

export default function AdminSidebar({
  active,
  onNavigate,
}: AdminSidebarProps) {
  // treat "questionmgr" as sub-page of "datamgmt" for highlight
  const effectiveActive = active === "questionmgr" ? "datamgmt" : active;

  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex flex-col w-64 xl:w-72 shrink-0 h-screen fixed top-0 left-0 border-r border-[#2a231a] bg-[#0f0d0a] glass-card rounded-none">
      {/* Logo */}
      <div className="px-6 pt-8 pb-6 cursor-pointer" onClick={() => navigate("/admin")}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 glass-card flex items-center justify-center text-devotion-gold">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <p className="text-[15px] font-bold text-white leading-none">
              Quizzy
            </p>
            <p className="text-xs text-[#6b5e4a] mt-0.5">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="px-3 flex-1 overflow-y-auto space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold text-[#4a3d2e] uppercase tracking-widest px-3 mb-2">
              {group.label}
            </p>
            {group.items.map(({ id, icon: Icon, label }) => {
              const isActive = effectiveActive === id;
              return (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-[#FBBF24]/12 text-[#FBBF24]"
                      : "text-[#7a6b55] hover:text-[#b8965e] hover:bg-[#1e1810]"
                  }`}
                >
                  <Icon
                    size={17}
                    className={isActive ? "text-[#FBBF24]" : "text-[#5a4e3a]"}
                  />
                  <span className="flex-1 text-left">{label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24]" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Profile */}
      <div className="px-4 pb-6 pt-4 border-t border-[#1e1810]">
        <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-[#1e1810] cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FBBF24] to-[#9a7040] flex items-center justify-center text-sm font-bold text-[#0f0d0a] shrink-0">
            AD
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">Admin</p>
            <p className="text-xs text-[#6b5e4a] truncate">
              System Administrator
            </p>
          </div>
          <Settings size={15} className="text-[#4a3d2e] ml-auto shrink-0" />
        </div>
      </div>
    </aside>
  );
}
