import React, { useEffect, useState } from 'react';
import { sites, getSiteById, getSitesSortedByScore } from './data/sites.js';
import { projects as initialProjects } from './data/projects.js';
import { SiteMap } from './components/SiteMap';
import { SiteDetail } from './components/SiteDetail';
import { AIChatPage } from './components/AIChatPage';
import { ProjectsPage, type Project } from './components/ProjectsPage';
import { ProjectDetail } from './components/ProjectDetail';
import { WaterInfrastructurePage } from './components/WaterInfrastructurePage';
import { DataCentersPage } from './components/DataCentersPage';
import { DocumentsPage } from './components/DocumentsPage';
import { 
  Droplet, 
  LayoutDashboard, 
  FolderOpen, 
  MapPin, 
  Workflow, 
  Server, 
  FileText, 
  MessageSquare, 
  BookOpen, 
  SlidersHorizontal, 
  BarChart3, 
  Bot,
  Search,
  ChevronDown,
  Bell
} from 'lucide-react';

type Page = 'site-finder' | 'ai-chat' | 'projects' | 'project-detail' | 'water-infrastructure' | 'data-centers' | 'documents';

function Shell() {
  const sortedSites = getSitesSortedByScore();
  const [activePage, setActivePage] = useState<Page>('site-finder');
  const [selectedSiteId, setSelectedSiteId] = useState(sortedSites[0]?.id);
  const [chatPreFill,    setChatPreFill]    = useState<string>('');
  const selectedSite = getSiteById(selectedSiteId);
  const [regionFilter, setRegionFilter] = useState('All Regions');
  const [powerFilter, setPowerFilter] = useState('Any Capacity');
  const [coolingFilter, setCoolingFilter] = useState('All Technologies');

  // ── Site Finder form ──
  const [finderRegion, setFinderRegion] = useState('All Regions');
  const [finderPower, setFinderPower] = useState('');
  const [finderCooling, setFinderCooling] = useState('Immersion Cooling');
  const [finderTimeline, setFinderTimeline] = useState('2027');
  const [finderBudget, setFinderBudget] = useState('');
  const [finderLoading, setFinderLoading] = useState(false);
  const [finderHasRun, setFinderHasRun] = useState(false);
  const [finderResults, setFinderResults] = useState<typeof sortedSites>([]);

  // Parse "+1,800 m3/day" → 1800
  function parseCoolingM3(str: string): number {
    return parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
  }

  // +/– score based on how efficient the chosen cooling tech is at a given site
  // (lower additional water draw = better fit = higher score)
  function coolingAdjustment(site: (typeof sortedSites)[0], cooling: string): number {
    const impactStr =
      cooling === 'Immersion Cooling'   ? site.coolingImpact.immersionCooling :
      cooling === 'Direct Liquid Cooling' ? site.coolingImpact.dlcCooling :
      cooling === 'Air Cooling'          ? site.coolingImpact.airCooling :
      /* Hybrid */                         site.coolingImpact.liquidCooling;
    const val = parseCoolingM3(impactStr);
    if (val < 500)  return  5;
    if (val < 900)  return  3;
    if (val < 1400) return  0;
    if (val < 1800) return -2;
    return -4;
  }

  function runFinder() {
    setFinderLoading(true);
    setFinderHasRun(true);
    setTimeout(() => {
      let pool = getSitesSortedByScore();
      if (finderRegion !== 'All Regions') {
        pool = pool.filter((s) => s.region === finderRegion);
      }
      const rescored = pool
        .map((s) => ({
          ...s,
          overallScore: Math.min(100, Math.max(0, s.overallScore + coolingAdjustment(s, finderCooling))),
        }))
        .sort((a, b) => b.overallScore - a.overallScore);
      setFinderResults(rescored);
      // Auto-select the top result
      if (rescored.length > 0) setSelectedSiteId(rescored[0].id);
      setFinderLoading(false);
    }, 800);
  }

  // The list shown in the ranked panel
  const displayedSites = finderHasRun ? finderResults : sortedSites;

  // Projects state
  const [projects, setProjects] = useState<Project[]>(initialProjects as Project[]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const selectedProject = projects.find((p) => p.id === selectedProjectId) ?? null;

  function handleAddProject(p: Project) {
    setProjects((prev) => [...prev, p]);
  }

  function handleSelectProject(id: string) {
    setSelectedProjectId(id);
    setActivePage('project-detail');
  }

  function handleUpdateNotes(projectId: string, note: { id: string; author: string; date: string; text: string }) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, notes: [...p.notes, note] } : p
      )
    );
  }

  const getScoreColors = (score: number) => {
    if (score >= 80) return { bg: 'bg-[#10B981]/20', text: 'text-[#10B981]', border: 'border-[#10B981]/30', stroke: '#10B981' };
    if (score >= 60) return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', stroke: '#F59E0B' };
    return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', stroke: '#EF4444' };
  };

  // Navigation — items with optional page key; anything without one keeps current page
  const navItems: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; label: string; page?: Page }[] = [
    { icon: LayoutDashboard, label: 'Dashboard',         page: 'site-finder' },
    { icon: FolderOpen,      label: 'Projects',          page: 'projects'    },
    { icon: MapPin,          label: 'Site Finder',       page: 'site-finder' },
    { icon: Workflow,        label: 'Water Infrastructure', page: 'water-infrastructure' },
    { icon: Server,          label: 'Data Centers',        page: 'data-centers'         },
    { icon: FileText,        label: 'Documents & Reports', page: 'documents'   },
    { icon: MessageSquare,   label: 'AI Chat Assistant', page: 'ai-chat'     },
    { icon: BookOpen,        label: 'Regulatory Guide'                       },
    { icon: SlidersHorizontal, label: 'Compare Sites'                        },
    { icon: BarChart3,       label: 'Reports'                                },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0A0E17] text-white overflow-hidden font-sans">
      
      {/* Left Sidebar */}
      <div className="w-[240px] flex-shrink-0 bg-[#0B1220] flex flex-col h-full border-r border-[#1F2937]">
        {/* Logo Area */}
        <div className="pt-6 pb-4 px-4 flex flex-col gap-1 border-b border-[#1F2937]">
          <div className="flex items-center gap-2">
            <Droplet className="w-[28px] h-[28px] text-[#10B981]" fill="currentColor" fillOpacity={0.2} />
            <span className="text-[18px] font-bold text-white tracking-wide">WaterIntel</span>
          </div>
          <p className="text-[10px] text-[#6B7280] leading-snug mt-1">
            AI-Powered Water Intelligence Platform
          </p>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = item.page !== undefined && activePage === item.page;
            return (
              <div
                key={idx}
                onClick={() => item.page && setActivePage(item.page)}
                className={`
                  flex items-center gap-3 px-3 py-[10px] rounded-md cursor-pointer transition-colors relative
                  ${isActive
                    ? 'bg-[#10B981]/15 text-[#10B981]'
                    : 'text-[#9CA3AF] hover:text-[#D1D5DB] hover:bg-white/5'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#10B981] rounded-l-md" />
                )}
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#10B981]' : 'text-[#6B7280]'}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Current Project Card */}
        <div className="px-3 mb-4">
          <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-3">
            <p className="text-[10px] uppercase text-[#6B7280] font-semibold tracking-wider mb-1">
              Current Project
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
              <span className="text-[13px] font-semibold text-white">Riyadh Data Campus</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Power</span>
                <span className="text-white font-medium">150 MW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Cooling</span>
                <span className="text-white font-medium">Hybrid Dry/Wet</span>
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
              onClick={() => setActivePage('ai-chat')}
              className="w-full bg-[#10B981] hover:bg-[#059669] text-white text-xs font-medium py-2 rounded-md transition-colors"
            >
              Start AI Chat
            </button>
          </div>
        </div>
      </div>

      {/* Right Column (Top Bar + Main Content) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Bar */}
        <div className="h-[60px] flex-shrink-0 bg-[#0A0E17] border-b border-[#1F2937] flex items-center justify-between px-6">
          
          {/* Left Side: Search */}
          <div className="relative w-[320px]">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search for a location, plant, project..."
              className="w-full h-9 bg-[#111827] border border-[#1F2937] rounded-lg pl-9 pr-3 text-[13px] text-white placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981]"
            />
          </div>

          {/* Right Side: Actions & Profile */}
          <div className="flex items-center gap-4">
            
            {/* Location Selector */}
            <button className="flex items-center gap-2 bg-[#111827] border border-[#1F2937] hover:bg-[#1F2937]/50 rounded-md h-9 px-3 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-[13px] font-medium text-white">Riyadh, Saudi Arabia</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
            </button>

            {/* Notification Bell */}
            <button className="relative p-2 text-[#6B7280] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0A0E17]" />
            </button>

            <div className="h-6 w-[1px] bg-[#1F2937] mx-1"></div>

            {/* User Profile */}
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

        {/* Main Content Area */}
        <div className="flex-1 bg-[#0A0E17] flex flex-col overflow-hidden">

          {/* ── AI Chat Page ── */}
          {activePage === 'ai-chat' && (
            <AIChatPage selectedSite={selectedSite} initialMessage={chatPreFill} onConsumeInitialMessage={() => setChatPreFill('')} />
          )}

          {/* ── Water Infrastructure Page ── */}
          {activePage === 'water-infrastructure' && (
            <WaterInfrastructurePage />
          )}

          {/* ── Data Centers Page ── */}
          {activePage === 'data-centers' && (
            <DataCentersPage />
          )}

          {/* ── Documents & Reports Page ── */}
          {activePage === 'documents' && (
            <DocumentsPage />
          )}

          {/* ── Projects List Page ── */}
          {activePage === 'projects' && (
            <ProjectsPage
              projects={projects}
              onAddProject={handleAddProject}
              onSelectProject={handleSelectProject}
            />
          )}

          {/* ── Project Detail Page ── */}
          {activePage === 'project-detail' && selectedProject && (
            <ProjectDetail
              project={selectedProject}
              onBack={() => setActivePage('projects')}
              onUpdateNotes={handleUpdateNotes}
            />
          )}

          {/* ── Site Finder Page ── */}
          {activePage === 'site-finder' && <>

          {/* Header row — fixed, never scrolls */}
          <div className="flex-shrink-0 px-6 pt-6 pb-4 flex w-full justify-between items-end">
            <div>
              <h1 className="text-white text-[20px] font-bold">Site Finder</h1>
              <p className="text-[#6B7280] text-[13px] mt-1">
                Find the best data center sites based on water availability and infrastructure readiness.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="border border-[#1F2937] bg-transparent text-[#D1D5DB] hover:bg-[#1F2937]/50 rounded-md px-4 py-2 text-sm transition-colors"
                data-testid="button-new-project"
              >
                New Project
              </button>
              <button
                className="bg-[#10B981] text-white hover:bg-[#059669] rounded-md px-4 py-2 text-sm transition-colors"
                data-testid="button-add-custom-site"
              >
                + Add Custom Site
              </button>
            </div>
          </div>

          {/* Scrollable body — form + map row + detail card */}
          <div className="flex-1 overflow-y-auto">

            {/* ── "Tell us about your project" form ── */}
            <div className="px-6 pt-2 pb-4">
              <div className="bg-[#111827] border border-[#1F2937] rounded-xl px-5 py-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-[13px] font-semibold text-white">Tell us about your project</h2>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">We'll rank and score sites to match your requirements.</p>
                  </div>
                  {finderHasRun && !finderLoading && (
                    <span className="text-[11px] text-[#10B981] font-medium bg-[#10B981]/10 px-2.5 py-1 rounded-full">
                      {finderResults.length} site{finderResults.length !== 1 ? 's' : ''} matched
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-[1fr_140px_1fr_120px_140px_auto] gap-3 items-end">
                  {/* Region */}
                  <div>
                    <label className="block text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">Region</label>
                    <select
                      value={finderRegion}
                      onChange={(e) => setFinderRegion(e.target.value)}
                      className="w-full h-9 bg-[#0A0E17] border border-[#1F2937] hover:border-[#374151] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-white text-[13px] rounded-md px-3 focus:outline-none transition-colors"
                    >
                      <option>All Regions</option>
                      <option>Riyadh</option>
                      <option>Eastern</option>
                      <option>Qassim</option>
                      <option>NEOM</option>
                    </select>
                  </div>

                  {/* Power */}
                  <div>
                    <label className="block text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">Power (MW)</label>
                    <input
                      type="number"
                      min="1"
                      value={finderPower}
                      onChange={(e) => setFinderPower(e.target.value)}
                      placeholder="e.g. 120"
                      className="w-full h-9 bg-[#0A0E17] border border-[#1F2937] hover:border-[#374151] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-white text-[13px] rounded-md px-3 placeholder-[#4B5563] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Cooling */}
                  <div>
                    <label className="block text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">Cooling Technology</label>
                    <select
                      value={finderCooling}
                      onChange={(e) => setFinderCooling(e.target.value)}
                      className="w-full h-9 bg-[#0A0E17] border border-[#1F2937] hover:border-[#374151] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-white text-[13px] rounded-md px-3 focus:outline-none transition-colors"
                    >
                      <option>Immersion Cooling</option>
                      <option>Direct Liquid Cooling</option>
                      <option>Air Cooling</option>
                      <option>Hybrid</option>
                    </select>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="block text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">Timeline</label>
                    <select
                      value={finderTimeline}
                      onChange={(e) => setFinderTimeline(e.target.value)}
                      className="w-full h-9 bg-[#0A0E17] border border-[#1F2937] hover:border-[#374151] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-white text-[13px] rounded-md px-3 focus:outline-none transition-colors"
                    >
                      <option>2026</option>
                      <option>2027</option>
                      <option>2028</option>
                      <option>2029+</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">
                      Budget <span className="normal-case font-normal text-[#4B5563]">(optional)</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={finderBudget}
                      onChange={(e) => setFinderBudget(e.target.value)}
                      placeholder="SAR M"
                      className="w-full h-9 bg-[#0A0E17] border border-[#1F2937] hover:border-[#374151] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-white text-[13px] rounded-md px-3 placeholder-[#4B5563] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Find Sites */}
                  <button
                    onClick={runFinder}
                    disabled={finderLoading}
                    className="h-9 px-5 bg-[#10B981] hover:bg-[#059669] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[13px] font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-2"
                  >
                    {finderLoading ? (
                      <>
                        <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Searching…
                      </>
                    ) : 'Find Sites'}
                  </button>
                </div>
              </div>
            </div>

            {/* Three-column row — fixed height */}
            <div className="h-[420px] flex-shrink-0 px-6 pt-1 pb-4 flex gap-4">

              {/* Left panel — Top Ranked Sites */}
              <div className="w-[260px] flex-shrink-0 overflow-y-auto">
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-sm font-semibold text-white">
                      {finderHasRun ? 'Matched Sites' : 'Top Ranked Sites'}
                    </h2>
                    <span className="bg-[#1F2937] text-[#9CA3AF] rounded-full px-2 py-0.5 text-[10px] font-medium leading-tight">
                      {finderLoading ? '…' : `${displayedSites.length} site${displayedSites.length !== 1 ? 's' : ''}`}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1">
                    {/* Loading skeleton */}
                    {finderLoading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 py-3 border-b border-[#1F2937] last:border-0 animate-pulse">
                          <div className="w-6 h-6 rounded-full bg-[#1F2937]" />
                          <div className="flex-1 space-y-1.5">
                            <div className="h-3 bg-[#1F2937] rounded w-3/4" />
                            <div className="h-2.5 bg-[#1F2937]/60 rounded w-1/2" />
                          </div>
                          <div className="w-10 h-10 rounded-full bg-[#1F2937]" />
                        </div>
                      ))
                    ) : displayedSites.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
                        <p className="text-[#6B7280] text-[12px]">No sites match your criteria.</p>
                        <p className="text-[#4B5563] text-[11px]">Try broadening your region or cooling filter.</p>
                      </div>
                    ) : (
                      displayedSites.slice(0, 5).map((site, index) => {
                        const isSelected = site.id === selectedSiteId;
                        const isLast = index === Math.min(4, displayedSites.length - 1);
                        const sc = getScoreColors(site.overallScore);
                        return (
                          <div
                            key={site.id}
                            className={`
                              flex items-center gap-3 py-3 cursor-pointer
                              ${!isLast && !isSelected ? 'border-b border-[#1F2937]' : ''}
                              ${isSelected ? 'bg-[#10B981]/8 rounded-lg border border-[#10B981]/20 px-2 mx-[-8px]' : ''}
                            `}
                            onClick={() => setSelectedSiteId(site.id)}
                            data-testid={`row-site-${site.id}`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${sc.bg} ${sc.text}`}>
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-white truncate">{site.name}</div>
                              <div className="text-xs text-[#6B7280] truncate">{site.region}</div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${sc.border} ${sc.bg} ${sc.text}`}
                                data-testid={`badge-score-${site.id}`}
                              >
                                {site.overallScore}
                              </div>
                              <div className={`text-[10px] mt-1 ${sc.text} font-medium`}>{site.rating}</div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {!finderLoading && displayedSites.length > 0 && (
                    <a className="text-[#10B981] text-xs hover:underline cursor-pointer mt-3 block text-right" data-testid="link-view-all">
                      View all sites &rarr;
                    </a>
                  )}
                </div>
              </div>

              {/* Center panel — Map */}
              <div className="flex-1 min-w-0">
                <SiteMap selectedSiteId={selectedSiteId} onSiteSelect={setSelectedSiteId} />
              </div>

              {/* Right panel — Score + Filters */}
              <div className="w-[260px] flex-shrink-0 overflow-y-auto flex flex-col gap-4">

                {/* Site Suitability Score */}
                {selectedSite && (
                  <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5">
                    <div className="flex justify-between items-center">
                      <h2 className="text-sm font-semibold text-white">Site Suitability Score</h2>
                      <span className="text-[#6B7280] text-xs truncate max-w-[100px]">{selectedSite.name}</span>
                    </div>

                    <div className="flex justify-center mt-4 mb-4">
                      <div className="relative w-[130px] h-[130px]">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                          <circle cx="70" cy="70" r="54" stroke="#1F2937" strokeWidth="10" fill="none" />
                          <circle
                            cx="70" cy="70" r="54"
                            stroke={getScoreColors(selectedSite.overallScore).stroke}
                            strokeWidth="10" fill="none" strokeLinecap="round"
                            strokeDasharray="339.3"
                            strokeDashoffset={339.3 - (selectedSite.overallScore / 100) * 339.3}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-[26px] font-bold text-white leading-none">{selectedSite.overallScore}</span>
                          <span className={`text-[11px] font-medium ${getScoreColors(selectedSite.overallScore).text} mt-1`}>{selectedSite.rating}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-[#6B7280] text-center px-2">
                      {selectedSite.overallScore >= 80
                        ? 'Excellent site with strong water access and infrastructure readiness.'
                        : selectedSite.overallScore >= 60
                        ? 'Good site with adequate water and infrastructure resources.'
                        : 'Site has significant constraints. Review details carefully.'}
                    </p>

                    <div className="mt-4 space-y-3">
                      {[
                        { label: 'Water Access', score: selectedSite.waterAccess.score },
                        { label: 'Infrastructure', score: selectedSite.infrastructure.score },
                        { label: 'Regulatory', score: selectedSite.regulatory.score },
                        { label: 'Future Capacity', score: Math.round((selectedSite.waterAccess.score + selectedSite.infrastructure.score) / 2) },
                      ].map((metric, i) => {
                        const mc = getScoreColors(metric.score);
                        return (
                          <div key={i}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-[#9CA3AF]">{metric.label}</span>
                              <span className={`text-xs font-bold ${mc.text}`}>{metric.score}</span>
                            </div>
                            <div className="w-full h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${metric.score}%`, backgroundColor: mc.stroke }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quick Filters */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5">
                  <h2 className="text-sm font-semibold text-white mb-4">Quick Filters</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-[#6B7280] mb-1">Region</label>
                      <select
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                        className="w-full bg-[#0A0E17] border border-[#1F2937] text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#10B981]"
                        data-testid="select-region"
                      >
                        <option>All Regions</option>
                        <option>Riyadh</option>
                        <option>Eastern</option>
                        <option>Qassim</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-[#6B7280] mb-1">Power Requirement</label>
                      <select
                        value={powerFilter}
                        onChange={(e) => setPowerFilter(e.target.value)}
                        className="w-full bg-[#0A0E17] border border-[#1F2937] text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#10B981]"
                        data-testid="select-power"
                      >
                        <option>Any Capacity</option>
                        <option>50–100 MW</option>
                        <option>100–200 MW</option>
                        <option>200–500 MW</option>
                        <option>500 MW+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-[#6B7280] mb-1">Cooling Technology</label>
                      <select
                        value={coolingFilter}
                        onChange={(e) => setCoolingFilter(e.target.value)}
                        className="w-full bg-[#0A0E17] border border-[#1F2937] text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#10B981]"
                        data-testid="select-cooling"
                      >
                        <option>All Technologies</option>
                        <option>Air Cooling</option>
                        <option>Liquid Cooling</option>
                        <option>Immersion Cooling</option>
                        <option>DLC</option>
                      </select>
                    </div>
                    <button
                      className="w-full bg-[#10B981] hover:bg-[#059669] text-white text-sm font-medium py-2 rounded-md transition-colors"
                      data-testid="button-apply-filters"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Site Detail card — below the map row */}
            {selectedSite && (
              <div className="px-6 pb-6">
                <SiteDetail
                  site={selectedSite}
                  onNavigateToChat={(prefill) => {
                    setChatPreFill(prefill);
                    setActivePage('ai-chat');
                  }}
                />
              </div>
            )}

          </div>{/* end scrollable body */}

          </>}

        </div>
      </div>
      
    </div>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return <Shell />;
}

export default App;
