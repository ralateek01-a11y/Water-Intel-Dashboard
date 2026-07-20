import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle2, Clock, PauseCircle, CheckSquare,
  Zap, Thermometer, MapPin, Calendar, LayoutGrid, Star,
  FileText, BarChart3, MessageCircle, Sparkles, Download,
  FileSpreadsheet, FileType, Send, AlertCircle
} from 'lucide-react';
import { getSiteById } from '../data/sites.js';
import { useProjects } from '../context/ProjectsContext';
import type { Project } from './ProjectsPage';

type DetailTab = 'overview' | 'sites' | 'documents' | 'reports' | 'notes' | 'ai';

const STATUS_CONFIG = {
  active:    { label: 'Active',    bg: 'bg-[#10B981]/15', text: 'text-[#10B981]', Icon: CheckCircle2 },
  planning:  { label: 'Planning',  bg: 'bg-blue-500/15',  text: 'text-blue-400',  Icon: Clock        },
  'on-hold': { label: 'On Hold',   bg: 'bg-amber-500/15', text: 'text-amber-400', Icon: PauseCircle  },
  completed: { label: 'Completed', bg: 'bg-slate-500/15', text: 'text-slate-400', Icon: CheckSquare  },
};

const CONFIDENCE_CONFIG = {
  High:   { bg: 'bg-[#10B981]/15', text: 'text-[#10B981]' },
  Medium: { bg: 'bg-amber-500/15', text: 'text-amber-400' },
  Low:    { bg: 'bg-red-500/15',   text: 'text-red-400'   },
};

function fileTypeIcon(type: string) {
  const t = type.toUpperCase();
  if (t === 'XLSX') return <FileSpreadsheet className="w-4 h-4 text-green-400" />;
  if (t === 'DOCX') return <FileType className="w-4 h-4 text-blue-400" />;
  return <FileText className="w-4 h-4 text-red-400" />;
}

export function ProjectDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { projects, addNote } = useProjects();
  const project = projects.find((p) => p.id === id);

  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [noteText, setNoteText] = useState('');

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#6B7280]">
        Project not found.{' '}
        <button onClick={() => navigate('/projects')} className="text-[#10B981] ml-1 hover:underline">Back to Projects</button>
      </div>
    );
  }

  const sc = STATUS_CONFIG[project.status];
  const StatusIcon = sc.Icon;

  const recommendedSites = project.recommendedSiteIds
    .map((id) => getSiteById(id))
    .filter(Boolean)
    .sort((a, b) => (b?.overallScore ?? 0) - (a?.overallScore ?? 0));

  const topScore = recommendedSites[0]?.overallScore ?? null;

  const tabs: { id: DetailTab; label: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }[] = [
    { id: 'overview',   label: 'Overview',           Icon: LayoutGrid    },
    { id: 'sites',      label: 'Site Recommendations', Icon: MapPin       },
    { id: 'documents',  label: 'Documents',           Icon: FileText      },
    { id: 'reports',    label: 'Reports',             Icon: BarChart3     },
    { id: 'notes',      label: 'Notes',               Icon: MessageCircle },
    { id: 'ai',         label: 'AI Recommendations',  Icon: Sparkles      },
  ];

  function submitNote() {
    const text = noteText.trim();
    if (!text) return;
    addNote(project.id, {
      id: `note-${Date.now()}`,
      author: 'Razan Alateeb',
      date: new Date().toISOString().split('T')[0],
      text,
    });
    setNoteText('');
  }

  const fieldCls = "w-full h-9 bg-[#0A0E17] border border-[#1F2937] rounded-md px-3 text-[13px] text-white focus:outline-none focus:ring-1 focus:ring-[#10B981]/50 focus:border-[#10B981] cursor-default";
  const labelCls = "block text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1";

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-6 pt-5 pb-4">
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-1.5 text-[#6B7280] hover:text-white text-[12px] mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Projects
        </button>

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-white text-[20px] font-bold">{project.name}</h1>
              <span className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                <StatusIcon className="w-3 h-3" />
                {sc.label}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-1.5 flex-wrap">
              <span className="flex items-center gap-1.5 text-[#9CA3AF] text-[12px]">
                <Zap className="w-3.5 h-3.5 text-[#F59E0B]" /> {project.powerMW} MW
              </span>
              <span className="flex items-center gap-1.5 text-[#9CA3AF] text-[12px]">
                <Thermometer className="w-3.5 h-3.5 text-blue-400" /> {project.coolingTechnology}
              </span>
              <span className="flex items-center gap-1.5 text-[#9CA3AF] text-[12px]">
                <MapPin className="w-3.5 h-3.5 text-[#10B981]" /> {project.region}
              </span>
              <span className="flex items-center gap-1.5 text-[#9CA3AF] text-[12px]">
                <Calendar className="w-3.5 h-3.5 text-purple-400" /> {project.targetYear}
              </span>
            </div>
          </div>
        </div>

        {/* Summary stat chips */}
        <div className="flex gap-3 mt-4 flex-wrap">
          {[
            { label: 'Power', value: `${project.powerMW} MW` },
            { label: 'Cooling', value: project.coolingTechnology },
            { label: 'Region', value: project.region },
            { label: 'Target Year', value: String(project.targetYear) },
            { label: 'Sites', value: `${project.recommendedSiteIds.length} under consideration` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#111827] border border-[#1F2937] rounded-lg px-3 py-2">
              <div className="text-[9px] uppercase tracking-wider text-[#6B7280] font-semibold">{label}</div>
              <div className="text-[12px] font-semibold text-white mt-0.5">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex-shrink-0 border-b border-[#1F2937] px-6">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-3 py-2.5 text-[12px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-[#10B981] text-[#10B981]'
                  : 'border-transparent text-[#6B7280] hover:text-[#D1D5DB]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
              {id === 'notes' && project.notes.length > 0 && (
                <span className="bg-[#1F2937] text-[#9CA3AF] text-[9px] rounded-full px-1.5 py-0.5 font-medium">
                  {project.notes.length}
                </span>
              )}
              {id === 'ai' && project.aiRecommendations.length > 0 && (
                <span className="bg-[#10B981]/15 text-[#10B981] text-[9px] rounded-full px-1.5 py-0.5 font-medium">
                  {project.aiRecommendations.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">

        {/* ── Overview ── */}
        {activeTab === 'overview' && (
          <div className="px-6 py-5 max-w-2xl">
            <h3 className="text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4">Project Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Project Name</label>
                <input readOnly value={project.name} className={fieldCls} />
              </div>
              <div>
                <label className={labelCls}>Status</label>
                <input readOnly value={STATUS_CONFIG[project.status].label} className={fieldCls} />
              </div>
              <div>
                <label className={labelCls}>Power Requirement (MW)</label>
                <input readOnly value={`${project.powerMW} MW`} className={fieldCls} />
              </div>
              <div>
                <label className={labelCls}>Target Year</label>
                <input readOnly value={project.targetYear} className={fieldCls} />
              </div>
              <div>
                <label className={labelCls}>Cooling Technology</label>
                <input readOnly value={project.coolingTechnology} className={fieldCls} />
              </div>
              <div>
                <label className={labelCls}>Region</label>
                <input readOnly value={project.region} className={fieldCls} />
              </div>
              <div>
                <label className={labelCls}>Sites Under Consideration</label>
                <input readOnly value={project.recommendedSiteIds.length} className={fieldCls} />
              </div>
              {topScore !== null && (
                <div>
                  <label className={labelCls}>Top Site Score</label>
                  <input readOnly value={topScore} className={fieldCls} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Site Recommendations ── */}
        {activeTab === 'sites' && (
          <div className="px-6 py-5">
            {recommendedSites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-2 text-center">
                <MapPin className="w-8 h-8 text-[#374151]" />
                <p className="text-white font-medium">No sites assigned</p>
                <p className="text-[#6B7280] text-sm">Use the Site Finder to identify and add recommended sites.</p>
              </div>
            ) : (
              <div className="space-y-3 max-w-2xl">
                {recommendedSites.map((site, idx) => {
                  if (!site) return null;
                  const score = site.overallScore;
                  const scoreColor =
                    score >= 80 ? { bg: 'bg-[#10B981]/15', text: 'text-[#10B981]' }
                    : score >= 60 ? { bg: 'bg-amber-500/15', text: 'text-amber-400' }
                    : { bg: 'bg-red-500/15', text: 'text-red-400' };

                  return (
                    <div key={site.id} className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 flex items-center gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#1F2937] flex items-center justify-center text-[#6B7280] text-[12px] font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {idx === 0 && <Star className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />}
                          <span className="text-white font-semibold text-[13px] truncate">{site.name}</span>
                        </div>
                        <span className="text-[#6B7280] text-[11px]">{site.region} · {site.distanceFromRiyadh} km from Riyadh</span>
                      </div>
                      <div className="flex gap-3 text-[11px] text-[#6B7280] flex-shrink-0">
                        <span>Water <span className="text-[#9CA3AF] font-medium">{site.waterAccess.score}</span></span>
                        <span>Infra <span className="text-[#9CA3AF] font-medium">{site.infrastructure.score}</span></span>
                        <span>Reg <span className="text-[#9CA3AF] font-medium">{site.regulatory.score}</span></span>
                      </div>
                      <div className={`flex-shrink-0 rounded-lg px-2.5 py-1 text-[13px] font-bold ${scoreColor.bg} ${scoreColor.text}`}>
                        {score}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Documents ── */}
        {activeTab === 'documents' && (
          <div className="px-6 py-5">
            {project.documents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-2 text-center">
                <FileText className="w-8 h-8 text-[#374151]" />
                <p className="text-white font-medium">No documents yet</p>
              </div>
            ) : (
              <div className="space-y-2 max-w-2xl">
                {project.documents.map((doc) => (
                  <div key={doc.id} className="bg-[#111827] border border-[#1F2937] rounded-xl px-4 py-3 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-[#1F2937] flex items-center justify-center flex-shrink-0">
                      {fileTypeIcon(doc.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[13px] font-medium truncate">{doc.name}</p>
                      <p className="text-[#6B7280] text-[11px]">{doc.type} · Uploaded {doc.uploadDate}</p>
                    </div>
                    <button className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#10B981] text-[11px] font-medium transition-colors flex-shrink-0">
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Reports ── */}
        {activeTab === 'reports' && (
          <div className="flex flex-col items-center justify-center h-48 gap-4 text-center">
            <BarChart3 className="w-10 h-10 text-[#374151]" />
            <div>
              <p className="text-white font-medium">No reports generated yet</p>
              <p className="text-[#6B7280] text-sm mt-1">Generate a comprehensive site selection report for this project.</p>
            </div>
            <button className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
              <BarChart3 className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        )}

        {/* ── Notes ── */}
        {activeTab === 'notes' && (
          <div className="px-6 py-5 flex flex-col gap-4 max-w-2xl">
            {project.notes.length === 0 && (
              <p className="text-[#4B5563] text-[13px]">No notes yet. Add the first one below.</p>
            )}
            {project.notes.map((note) => (
              <div key={note.id} className="bg-[#111827] border border-[#1F2937] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-teal-900/50 border border-teal-700/50 flex items-center justify-center text-teal-400 font-bold text-[9px]">
                      {note.author.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <span className="text-white text-[12px] font-semibold">{note.author}</span>
                  </div>
                  <span className="text-[#6B7280] text-[11px]">{note.date}</span>
                </div>
                <p className="text-[#D1D5DB] text-[13px] leading-relaxed">{note.text}</p>
              </div>
            ))}

            {/* Add note */}
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 mt-2">
              <p className="text-[11px] text-[#6B7280] font-semibold uppercase tracking-wider mb-2">Add Note</p>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) submitNote(); }}
                placeholder="Write a note… (Ctrl+Enter to submit)"
                rows={3}
                className="w-full bg-[#0A0E17] border border-[#1F2937] focus:border-[#10B981] rounded-md px-3 py-2 text-[13px] text-white placeholder-[#4B5563] focus:outline-none focus:ring-1 focus:ring-[#10B981] resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={submitNote}
                  disabled={!noteText.trim()}
                  className="flex items-center gap-1.5 bg-[#10B981] hover:bg-[#059669] disabled:opacity-40 disabled:cursor-not-allowed text-white text-[12px] font-semibold px-3 py-1.5 rounded-md transition-colors"
                >
                  <Send className="w-3 h-3" />
                  Add Note
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── AI Recommendations ── */}
        {activeTab === 'ai' && (
          <div className="px-6 py-5 space-y-3 max-w-2xl">
            {project.aiRecommendations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-2 text-center">
                <Sparkles className="w-8 h-8 text-[#374151]" />
                <p className="text-white font-medium">No AI recommendations yet</p>
              </div>
            ) : (
              project.aiRecommendations.map((rec) => {
                const cc = CONFIDENCE_CONFIG[rec.confidence];
                return (
                  <div key={rec.id} className="bg-[#111827] border border-[#1F2937] rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#10B981]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${cc.bg} ${cc.text}`}>
                            {rec.confidence} Confidence
                          </span>
                        </div>
                        <p className="text-[#D1D5DB] text-[13px] leading-relaxed">{rec.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

      </div>
    </div>
  );
}
