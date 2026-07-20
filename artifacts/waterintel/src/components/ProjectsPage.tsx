import React, { useState } from 'react';
import {
  CheckCircle2, Clock, PauseCircle, CheckSquare,
  Zap, Thermometer, Plus, X, ChevronRight,
  MapPin, Star
} from 'lucide-react';
import { getSiteById } from '../data/sites.js';

interface Note {
  id: string;
  author: string;
  date: string;
  text: string;
}
interface Doc {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
}
interface AIRec {
  id: string;
  text: string;
  confidence: 'High' | 'Medium' | 'Low';
}
export interface Project {
  id: string;
  name: string;
  status: 'active' | 'planning' | 'on-hold' | 'completed';
  powerMW: number;
  coolingTechnology: string;
  region: string;
  targetYear: number;
  recommendedSiteIds: string[];
  notes: Note[];
  documents: Doc[];
  aiRecommendations: AIRec[];
}

interface ProjectsPageProps {
  projects: Project[];
  onAddProject: (p: Project) => void;
  onSelectProject: (id: string) => void;
}

const STATUS_CONFIG = {
  active:    { label: 'Active',     bg: 'bg-[#10B981]/15', text: 'text-[#10B981]', Icon: CheckCircle2 },
  planning:  { label: 'Planning',   bg: 'bg-blue-500/15',  text: 'text-blue-400',  Icon: Clock        },
  'on-hold': { label: 'On Hold',    bg: 'bg-amber-500/15', text: 'text-amber-400', Icon: PauseCircle  },
  completed: { label: 'Completed',  bg: 'bg-slate-500/15', text: 'text-slate-400', Icon: CheckSquare  },
};

const COOLING_OPTIONS = [
  'Immersion Cooling', 'Hybrid Liquid Cooling', 'Air Cooling',
  'Direct Liquid Cooling', 'Evaporative Cooling', 'Hybrid Dry/Wet',
];
const REGION_OPTIONS = ['Riyadh', 'Eastern', 'Qassim', 'Makkah', 'Madinah', 'NEOM'];

export function ProjectsPage({ projects, onAddProject, onSelectProject }: ProjectsPageProps) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    powerMW: '',
    coolingTechnology: COOLING_OPTIONS[0],
    region: REGION_OPTIONS[0],
    targetYear: '2027',
  });
  const [formError, setFormError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) { setFormError('Project name is required.'); return; }
    const power = parseInt(form.powerMW, 10);
    if (!power || power <= 0) { setFormError('Enter a valid power requirement.'); return; }
    const year = parseInt(form.targetYear, 10);
    if (!year || year < 2025) { setFormError('Enter a valid target year (2025 or later).'); return; }
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: form.name.trim(),
      status: 'planning',
      powerMW: power,
      coolingTechnology: form.coolingTechnology,
      region: form.region,
      targetYear: year,
      recommendedSiteIds: [],
      notes: [],
      documents: [],
      aiRecommendations: [],
    };
    onAddProject(newProject);
    setShowModal(false);
    setForm({ name: '', powerMW: '', coolingTechnology: COOLING_OPTIONS[0], region: REGION_OPTIONS[0], targetYear: '2027' });
    setFormError('');
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-6 pt-6 pb-4 flex items-end justify-between">
        <div>
          <h1 className="text-white text-[20px] font-bold">Projects</h1>
          <p className="text-[#6B7280] text-[13px] mt-1">Manage your data center site selection projects.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Project Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#111827] flex items-center justify-center">
              <Plus className="w-6 h-6 text-[#6B7280]" />
            </div>
            <p className="text-white font-medium">No projects yet</p>
            <p className="text-[#6B7280] text-sm">Click "+ New Project" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((project) => {
              const sc = STATUS_CONFIG[project.status];
              const StatusIcon = sc.Icon;
              const topSite = project.recommendedSiteIds
                .map((id) => getSiteById(id))
                .filter(Boolean)
                .sort((a, b) => (b?.overallScore ?? 0) - (a?.overallScore ?? 0))[0];

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project.id)}
                  className="bg-[#111827] border border-[#1F2937] hover:border-[#10B981]/40 rounded-xl p-5 cursor-pointer transition-all group"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                      <span className="text-white font-semibold text-[14px] truncate">{project.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#10B981] flex-shrink-0 transition-colors" />
                  </div>

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="flex items-center gap-1.5 bg-[#1F2937] text-[#D1D5DB] rounded-md px-2.5 py-1 text-[11px] font-medium">
                      <Zap className="w-3 h-3 text-[#F59E0B]" />
                      {project.powerMW} MW
                    </span>
                    <span className="flex items-center gap-1.5 bg-[#1F2937] text-[#D1D5DB] rounded-md px-2.5 py-1 text-[11px] font-medium">
                      <Thermometer className="w-3 h-3 text-blue-400" />
                      {project.coolingTechnology}
                    </span>
                    <span className={`flex items-center gap-1.5 ${sc.bg} ${sc.text} rounded-md px-2.5 py-1 text-[11px] font-medium`}>
                      <StatusIcon className="w-3 h-3" />
                      {sc.label}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-[#1F2937] pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
                      <MapPin className="w-3 h-3" />
                      {project.region} · {project.targetYear}
                    </div>
                    {topSite ? (
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <Star className="w-3 h-3 text-[#10B981]" />
                        <span className="text-[#9CA3AF]">
                          {project.recommendedSiteIds.length} site{project.recommendedSiteIds.length !== 1 ? 's' : ''} · top score
                        </span>
                        <span className="text-[#10B981] font-semibold">{topSite.overallScore}</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-[#4B5563]">No sites yet</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* New Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-[480px] bg-[#111827] border border-[#1F2937] rounded-2xl p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-[16px]">New Project</h2>
              <button onClick={() => setShowModal(false)} className="text-[#6B7280] hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Project Name */}
              <div>
                <label className="block text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1.5">
                  Project Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Riyadh AI Hyperscale Campus"
                  className="w-full h-9 bg-[#0A0E17] border border-[#1F2937] focus:border-[#10B981] rounded-md px-3 text-[13px] text-white placeholder-[#4B5563] focus:outline-none focus:ring-1 focus:ring-[#10B981]"
                />
              </div>

              {/* Power + Year */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1.5">
                    Power Requirement (MW)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.powerMW}
                    onChange={(e) => setForm({ ...form, powerMW: e.target.value })}
                    placeholder="e.g. 150"
                    className="w-full h-9 bg-[#0A0E17] border border-[#1F2937] focus:border-[#10B981] rounded-md px-3 text-[13px] text-white placeholder-[#4B5563] focus:outline-none focus:ring-1 focus:ring-[#10B981]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1.5">
                    Target Year
                  </label>
                  <input
                    type="number"
                    min="2025"
                    max="2040"
                    value={form.targetYear}
                    onChange={(e) => setForm({ ...form, targetYear: e.target.value })}
                    className="w-full h-9 bg-[#0A0E17] border border-[#1F2937] focus:border-[#10B981] rounded-md px-3 text-[13px] text-white focus:outline-none focus:ring-1 focus:ring-[#10B981]"
                  />
                </div>
              </div>

              {/* Cooling Technology */}
              <div>
                <label className="block text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1.5">
                  Cooling Technology
                </label>
                <select
                  value={form.coolingTechnology}
                  onChange={(e) => setForm({ ...form, coolingTechnology: e.target.value })}
                  className="w-full h-9 bg-[#0A0E17] border border-[#1F2937] focus:border-[#10B981] rounded-md px-3 text-[13px] text-white focus:outline-none focus:ring-1 focus:ring-[#10B981]"
                >
                  {COOLING_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Region */}
              <div>
                <label className="block text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1.5">
                  Region
                </label>
                <select
                  value={form.region}
                  onChange={(e) => setForm({ ...form, region: e.target.value })}
                  className="w-full h-9 bg-[#0A0E17] border border-[#1F2937] focus:border-[#10B981] rounded-md px-3 text-[13px] text-white focus:outline-none focus:ring-1 focus:ring-[#10B981]"
                >
                  {REGION_OPTIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {formError && (
                <p className="text-red-400 text-[12px]">{formError}</p>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-[#1F2937] text-[#9CA3AF] hover:text-white hover:border-[#374151] rounded-md py-2 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white rounded-md py-2 text-sm font-semibold transition-colors"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
