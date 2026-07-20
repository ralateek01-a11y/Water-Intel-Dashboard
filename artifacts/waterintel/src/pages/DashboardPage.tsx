import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sites } from '../data/sites.js';
import { projects } from '../data/projects.js';
import { useProjects } from '../context/ProjectsContext';
import {
  MapPin, FolderOpen, BarChart3, FileText, Search,
  Plus, MessageSquare, Star, Clock, CheckCircle2,
  Zap, Thermometer, ArrowRight, Activity,
} from 'lucide-react';

const ACTIVITY_FEED = [
  { id: 1, text: 'Site analysis completed for Heet Industrial City', time: '2 hours ago',     icon: 'search'   },
  { id: 2, text: 'Document uploaded: SWCC Water Allocation Confirmation', time: '5 hours ago', icon: 'file'     },
  { id: 3, text: 'New project created: NEOM AI Cluster',                 time: '1 day ago',   icon: 'folder'   },
  { id: 4, text: 'AI recommendation generated for Riyadh DC Campus',     time: '1 day ago',   icon: 'sparkle'  },
  { id: 5, text: 'Site analysis completed for Dammam 2nd Industrial City', time: '2 days ago', icon: 'search'   },
  { id: 6, text: 'Document uploaded: Feasibility Study v2.1',            time: '2 days ago',  icon: 'file'     },
];

function activityDot(icon: string) {
  if (icon === 'search') return 'bg-[#10B981]/20 text-[#10B981]';
  if (icon === 'file')   return 'bg-blue-500/20 text-blue-400';
  if (icon === 'folder') return 'bg-purple-500/20 text-purple-400';
  return 'bg-amber-500/20 text-amber-400';
}

function activityIcon(icon: string) {
  if (icon === 'search') return <Search className="w-3 h-3" />;
  if (icon === 'file')   return <FileText className="w-3 h-3" />;
  if (icon === 'folder') return <FolderOpen className="w-3 h-3" />;
  return <Star className="w-3 h-3" />;
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { projects: liveProjects } = useProjects();

  // Stats
  const activeProjectCount = liveProjects.filter((p) => p.status === 'active').length;
  const sitesCount = sites.length;
  const avgScore = Math.round(sites.reduce((acc, s) => acc + s.overallScore, 0) / sites.length);
  const docsCount = liveProjects.reduce((acc, p) => acc + p.documents.length, 0);

  // Current (first active) project
  const activeProject = liveProjects.find((p) => p.status === 'active') ?? liveProjects[0];
  const topSites = (activeProject?.recommendedSiteIds ?? [])
    .map((id) => sites.find((s) => s.id === id))
    .filter(Boolean)
    .sort((a, b) => (b?.overallScore ?? 0) - (a?.overallScore ?? 0))
    .slice(0, 3);

  // Today's date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const statCards = [
    { label: 'Active Projects',     value: activeProjectCount, icon: FolderOpen,   color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
    { label: 'Sites Analyzed',      value: sitesCount,         icon: MapPin,       color: 'text-blue-400',  bg: 'bg-blue-500/10'  },
    { label: 'Avg. Site Score',     value: avgScore,           icon: BarChart3,    color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Documents Processed', value: docsCount,          icon: FileText,     color: 'text-purple-400',bg: 'bg-purple-500/10'},
  ];

  const scoreColor = (s: number) =>
    s >= 80 ? { text: 'text-[#10B981]', bg: 'bg-[#10B981]/15', border: 'border-[#10B981]/30' }
    : s >= 60 ? { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30' }
    : { text: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30' };

  const STATUS_LABELS: Record<string, string> = {
    active: 'Active', planning: 'Planning', 'on-hold': 'On Hold', completed: 'Completed',
  };
  const STATUS_COLORS: Record<string, string> = {
    active: 'bg-[#10B981]/15 text-[#10B981]',
    planning: 'bg-blue-500/15 text-blue-400',
    'on-hold': 'bg-amber-500/15 text-amber-400',
    completed: 'bg-slate-500/15 text-slate-400',
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-6 pt-6 pb-4 flex items-end justify-between">
        <div>
          <h1 className="text-white text-[22px] font-bold leading-tight">Welcome back, Razan 👋</h1>
          <p className="text-[#6B7280] text-[13px] mt-1">{today}</p>
        </div>
        <button
          onClick={() => navigate('/site-finder')}
          className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
        >
          <Search className="w-4 h-4" />
          Find Sites
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4">
          {statCards.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <div className="text-[26px] font-bold text-white leading-none">{value}</div>
                <div className="text-[11px] text-[#6B7280] mt-1">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main two-column row */}
        <div className="grid grid-cols-[1fr_320px] gap-5">

          {/* Left: Current Project spotlight */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">Current Project</p>
                <h2 className="text-white text-[16px] font-bold mt-0.5">{activeProject?.name ?? 'No active project'}</h2>
              </div>
              {activeProject && (
                <button
                  onClick={() => navigate(`/projects/${activeProject.id}`)}
                  className="flex items-center gap-1.5 text-[#10B981] text-[12px] font-medium hover:underline"
                >
                  View project <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {activeProject ? (
              <>
                {/* Project meta chips */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[activeProject.status]}`}>
                    <CheckCircle2 className="w-3 h-3 inline mr-1" />
                    {STATUS_LABELS[activeProject.status]}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#1F2937] text-[#D1D5DB] text-[11px] font-medium px-2.5 py-1 rounded-full">
                    <Zap className="w-3 h-3 text-[#F59E0B]" />{activeProject.powerMW} MW
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#1F2937] text-[#D1D5DB] text-[11px] font-medium px-2.5 py-1 rounded-full">
                    <Thermometer className="w-3 h-3 text-blue-400" />{activeProject.coolingTechnology}
                  </span>
                  <span className="flex items-center gap-1.5 bg-[#1F2937] text-[#D1D5DB] text-[11px] font-medium px-2.5 py-1 rounded-full">
                    <MapPin className="w-3 h-3 text-[#10B981]" />{activeProject.region}
                  </span>
                </div>

                {/* Top 3 recommended sites */}
                <p className="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold mb-3">
                  Top Recommended Sites
                </p>
                <div className="space-y-2">
                  {topSites.length === 0 ? (
                    <p className="text-[#4B5563] text-[12px]">No sites assigned yet.</p>
                  ) : topSites.map((site, idx) => {
                    if (!site) return null;
                    const sc = scoreColor(site.overallScore);
                    return (
                      <div key={site.id} className="flex items-center gap-3 bg-[#0A0E17] rounded-lg px-4 py-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${sc.bg} ${sc.text}`}>
                          {idx + 1}
                        </div>
                        {idx === 0 && <Star className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-[13px] font-medium truncate">{site.name}</div>
                          <div className="text-[#6B7280] text-[11px]">{site.region} · {site.distanceFromRiyadh} km</div>
                        </div>
                        <div className={`rounded-lg px-2.5 py-1 text-[13px] font-bold ${sc.bg} ${sc.text} border ${sc.border}`}>
                          {site.overallScore}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="text-[#6B7280] text-sm">
                No active project.{' '}
                <button onClick={() => navigate('/projects')} className="text-[#10B981] hover:underline">Create one</button>
              </p>
            )}
          </div>

          {/* Right: Recent Activity */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-[#10B981]" />
              <h2 className="text-white text-[14px] font-semibold">Recent Activity</h2>
            </div>
            <div className="flex-1 space-y-1 overflow-y-auto">
              {ACTIVITY_FEED.map((item) => (
                <div key={item.id} className="flex items-start gap-3 py-2.5 border-b border-[#1F2937] last:border-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${activityDot(item.icon)}`}>
                    {activityIcon(item.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-[#D1D5DB] leading-snug">{item.text}</p>
                    <p className="text-[11px] text-[#4B5563] mt-0.5 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <p className="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold mb-3">Quick Actions</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                icon: Search,
                label: 'Start a new site search',
                desc: 'Find the best site for your next project',
                action: () => navigate('/site-finder'),
                color: 'text-[#10B981]',
                bg: 'bg-[#10B981]/10',
                hover: 'hover:border-[#10B981]/40',
              },
              {
                icon: Plus,
                label: 'Create a project',
                desc: 'Set up a new data center site selection project',
                action: () => navigate('/projects'),
                color: 'text-blue-400',
                bg: 'bg-blue-500/10',
                hover: 'hover:border-blue-500/40',
              },
              {
                icon: MessageSquare,
                label: 'Ask the AI assistant',
                desc: 'Get instant answers about water access and regulations',
                action: () => navigate('/ai-chat'),
                color: 'text-purple-400',
                bg: 'bg-purple-500/10',
                hover: 'hover:border-purple-500/40',
              },
            ].map(({ icon: Icon, label, desc, action, color, bg, hover }) => (
              <button
                key={label}
                onClick={action}
                className={`bg-[#111827] border border-[#1F2937] ${hover} rounded-xl p-5 text-left transition-all group flex items-start gap-4`}
              >
                <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-white text-[13px] font-semibold">{label}</p>
                  <p className="text-[#6B7280] text-[11px] mt-1 leading-snug">{desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#374151] group-hover:text-[#6B7280] flex-shrink-0 mt-0.5 ml-auto transition-colors" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
