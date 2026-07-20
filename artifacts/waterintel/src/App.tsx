import React, { useEffect } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
  NavLink, Outlet, useNavigate,
} from 'react-router-dom';
import {
  Droplet, LayoutDashboard, FolderOpen, MapPin, Workflow,
  Server, FileText, MessageSquare, BookOpen, SlidersHorizontal,
  BarChart3, Bot, Search, ChevronDown, Bell,
} from 'lucide-react';

import { ProjectsProvider } from './context/ProjectsContext';
import { DashboardPage } from './pages/DashboardPage';
import { SiteFinderPage } from './pages/SiteFinderPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { ProjectsPage } from './components/ProjectsPage';
import { ProjectDetail } from './components/ProjectDetail';
import { AIChatPage } from './components/AIChatPage';

// ── nav config ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { icon: LayoutDashboard,    label: 'Dashboard',           to: '/dashboard'            },
  { icon: FolderOpen,         label: 'Projects',            to: '/projects'             },
  { icon: MapPin,             label: 'Site Finder',         to: '/site-finder'          },
  { icon: Workflow,           label: 'Water Infrastructure',to: '/water-infrastructure' },
  { icon: Server,             label: 'Data Centers',        to: '/data-centers'         },
  { icon: FileText,           label: 'Documents & Reports', to: '/documents'            },
  { icon: MessageSquare,      label: 'AI Chat Assistant',   to: '/ai-chat'              },
  { icon: BookOpen,           label: 'Regulatory Guide',    to: '/regulatory'           },
  { icon: SlidersHorizontal,  label: 'Compare Sites',       to: '/compare'              },
  { icon: BarChart3,          label: 'Reports',             to: '/reports'              },
];

// ── Shell (layout) ────────────────────────────────────────────────────────────
function Shell() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full bg-[#0A0E17] text-white overflow-hidden font-sans">

      {/* Left Sidebar */}
      <div className="w-[240px] flex-shrink-0 bg-[#0B1220] flex flex-col h-full border-r border-[#1F2937]">
        {/* Logo */}
        <div className="pt-6 pb-4 px-4 flex flex-col gap-1 border-b border-[#1F2937]">
          <div className="flex items-center gap-2">
            <Droplet className="w-[28px] h-[28px] text-[#10B981]" fill="currentColor" fillOpacity={0.2} />
            <span className="text-[18px] font-bold text-white tracking-wide">WaterIntel</span>
          </div>
          <p className="text-[10px] text-[#6B7280] leading-snug mt-1">AI-Powered Water Intelligence Platform</p>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {NAV_ITEMS.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-[10px] rounded-md cursor-pointer transition-colors relative
                ${isActive
                  ? 'bg-[#10B981]/15 text-[#10B981]'
                  : 'text-[#9CA3AF] hover:text-[#D1D5DB] hover:bg-white/5'}
              `}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#10B981] rounded-l-md" />
                  )}
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#10B981]' : 'text-[#6B7280]'}`} />
                  <span className="text-sm font-medium">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Current Project Card */}
        <div className="px-3 mb-4">
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-3">
            <p className="text-[10px] uppercase text-[#6B7280] font-semibold tracking-wider mb-1">Current Project</p>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="text-[13px] font-semibold text-white">Riyadh DC Campus</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Power</span>
                <span className="text-white font-medium">120 MW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Cooling</span>
                <span className="text-white font-medium">Immersion Cooling</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Target Year</span>
                <span className="text-white font-medium">2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Need Help Card */}
        <div className="px-3 mb-4">
          <div className="bg-[#0F1A2E] border border-[#1E3A5F] rounded-lg p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#10B981]" />
              <span className="text-[13px] font-bold text-white">Need help?</span>
            </div>
            <p className="text-[11px] text-[#9CA3AF] leading-relaxed mb-1">
              Ask our AI assistant anything about water, regulations, or site selection.
            </p>
            <button
              onClick={() => navigate('/ai-chat')}
              className="w-full bg-[#10B981] hover:bg-[#059669] text-white text-xs font-medium py-2 rounded-md transition-colors"
            >
              Start AI Chat
            </button>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Bar */}
        <div className="h-[60px] flex-shrink-0 bg-[#0A0E17] border-b border-[#1F2937] flex items-center justify-between px-6">
          <div className="relative w-[320px]">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for a location, plant, project..."
              className="w-full h-9 bg-[#111827] border border-[#1F2937] rounded-lg pl-9 pr-3 text-[13px] text-white placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981]"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-[#111827] border border-[#1F2937] hover:bg-[#1F2937]/50 rounded-md h-9 px-3 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-[13px] font-medium text-white">Riyadh, Saudi Arabia</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
            </button>
            <button className="relative p-2 text-[#6B7280] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0A0E17]" />
            </button>
            <div className="h-6 w-[1px] bg-[#1F2937] mx-1" />
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-teal-900/50 border border-teal-700/50 flex items-center justify-center text-teal-400 font-semibold text-xs group-hover:border-teal-500 transition-colors">
                RA
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-white leading-tight">Razan Alateeb</span>
                <span className="text-[11px] text-[#6B7280] leading-tight mt-0.5">Developer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content via Outlet */}
        <div className="flex-1 bg-[#0A0E17] flex flex-col overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Strip trailing slash from BASE_URL for BrowserRouter basename
  const base = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

  return (
    <ProjectsProvider>
      <BrowserRouter basename={base}>
        <Routes>
          <Route path="/" element={<Shell />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard"            element={<DashboardPage />} />
            <Route path="site-finder"          element={<SiteFinderPage />} />
            <Route path="projects"             element={<ProjectsPage />} />
            <Route path="projects/:id"         element={<ProjectDetail />} />
            <Route path="ai-chat"              element={<AIChatPage selectedSite={null} />} />
            <Route path="water-infrastructure" element={<PlaceholderPage title="Water Infrastructure" />} />
            <Route path="data-centers"         element={<PlaceholderPage title="Data Centers" />} />
            <Route path="documents"            element={<PlaceholderPage title="Documents & Reports" />} />
            <Route path="regulatory"           element={<PlaceholderPage title="Regulatory Guide" />} />
            <Route path="compare"              element={<PlaceholderPage title="Compare Sites" />} />
            <Route path="reports"              element={<PlaceholderPage title="Reports" />} />
            <Route path="*"                    element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProjectsProvider>
  );
}

export default App;
