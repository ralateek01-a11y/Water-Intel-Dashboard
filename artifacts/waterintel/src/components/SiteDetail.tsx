import React, { useState } from 'react';
import {
  Droplet,
  Zap,
  Wifi,
  Factory,
  Cpu,
  Truck,
  Building2,
  MapPin,
  Clock,
  Shield,
  Thermometer,
  ChevronRight,
  GitCompare,
  FileBarChart2,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from 'lucide-react';

/* ─── types ──────────────────────────────────────────────── */
interface Site {
  id: string;
  name: string;
  region: string;
  distanceFromRiyadh: number;
  overallScore: number;
  rating: string;
  waterAccess: {
    score: number;
    nearestTSELine: string;
    availableCapacity: string;
    source: string;
  };
  infrastructure: {
    score: number;
    powerAvailability: string;
    fiberConnectivity: string;
    roadAccess: string;
  };
  regulatory: {
    score: number;
    agenciesInvolved: number;
    estApprovalTime: string;
    complexityLevel: string;
  };
  coolingImpact: {
    airCooling: string;
    liquidCooling: string;
    immersionCooling: string;
    dlcCooling: string;
  };
  nearbyInfrastructure: {
    name: string;
    type: string;
    distance: string;
    status: string;
  }[];
}

interface SiteDetailProps {
  site: Site;
}

/* ─── helpers ─────────────────────────────────────────────── */
const TABS = [
  'Overview',
  'Water Access',
  'Infrastructure',
  'Regulatory',
  'Forecast',
  'Documents',
  'Compare',
] as const;
type Tab = (typeof TABS)[number];

function scoreColors(score: number) {
  if (score >= 80) return { text: 'text-[#10B981]', bg: 'bg-[#10B981]/15', border: 'border-[#10B981]/30', bar: '#10B981' };
  if (score >= 60) return { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30', bar: '#F59E0B' };
  return { text: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30', bar: '#EF4444' };
}

function complexityIcon(level: string) {
  if (level === 'Low') return <CheckCircle2 className="w-4 h-4 text-[#10B981]" />;
  if (level === 'Medium') return <AlertCircle className="w-4 h-4 text-amber-400" />;
  return <XCircle className="w-4 h-4 text-red-400" />;
}

function complexityColor(level: string) {
  if (level === 'Low') return 'text-[#10B981]';
  if (level === 'Medium') return 'text-amber-400';
  return 'text-red-400';
}

function availIcon(level: string) {
  if (level === 'High') return <CheckCircle2 className="w-4 h-4 text-[#10B981]" />;
  if (level === 'Medium') return <AlertCircle className="w-4 h-4 text-amber-400" />;
  return <XCircle className="w-4 h-4 text-red-400" />;
}

function availColor(level: string) {
  if (level === 'High') return 'text-[#10B981]';
  if (level === 'Medium') return 'text-amber-400';
  return 'text-red-400';
}

function statusColor(status: string) {
  const s = status.toLowerCase();
  if (s === 'operational' || s === 'active') return 'text-[#10B981] bg-[#10B981]/10';
  if (s.includes('constrained') || s.includes('limited')) return 'text-amber-400 bg-amber-500/10';
  return 'text-[#9CA3AF] bg-white/5';
}

function nearbyIcon(type: string) {
  const t = type.toLowerCase();
  if (t.includes('water') || t.includes('treatment') || t.includes('desalination')) return Droplet;
  if (t.includes('power')) return Zap;
  if (t.includes('connect') || t.includes('fiber') || t.includes('network') || t.includes('satellite') || t.includes('microwave')) return Wifi;
  if (t.includes('technology') || t.includes('tech') || t.includes('research')) return Cpu;
  if (t.includes('industrial') || t.includes('chemical')) return Factory;
  if (t.includes('logistics') || t.includes('port') || t.includes('airport')) return Truck;
  return Building2;
}

/* parse "+1,800 m3/day" → number for bar scaling */
function parseCoolingValue(val: string) {
  return parseInt(val.replace(/[^0-9]/g, ''), 10) || 0;
}

/* ─── sub-cards ───────────────────────────────────────────── */
function CardShell({
  title,
  icon: Icon,
  iconColor = 'text-[#10B981]',
  children,
  link,
}: {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor?: string;
  children: React.ReactNode;
  link?: string;
}) {
  return (
    <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-3 h-full">
      <div className="flex items-center gap-2">
        <div className={`w-7 h-7 rounded-lg bg-[#1F2937] flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <span className="text-sm font-semibold text-white">{title}</span>
      </div>
      <div className="flex-1 flex flex-col gap-2 text-[13px]">{children}</div>
      {link && (
        <a className="text-[#10B981] text-xs flex items-center gap-1 cursor-pointer hover:underline mt-auto pt-1 border-t border-[#1F2937]">
          {link} <ChevronRight className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-[#6B7280] flex-shrink-0">{label}</span>
      <span className="text-white text-right">{value}</span>
    </div>
  );
}

/* ─── Overview tab ────────────────────────────────────────── */
function OverviewTab({ site }: { site: Site }) {
  const cooling = [
    { label: 'Air Cooling', value: site.coolingImpact.airCooling },
    { label: 'Liquid Cooling', value: site.coolingImpact.liquidCooling },
    { label: 'Immersion Cooling', value: site.coolingImpact.immersionCooling },
    { label: 'DLC Cooling', value: site.coolingImpact.dlcCooling },
  ];
  const maxCooling = Math.max(...cooling.map((c) => parseCoolingValue(c.value)));
  const wColors = scoreColors(site.waterAccess.score);
  const iColors = scoreColors(site.infrastructure.score);
  const rColors = scoreColors(site.regulatory.score);

  return (
    /* 2-column layout: left grid of 4 cards, right nearby panel */
    <div className="flex gap-4 h-full">

      {/* Left — 2 × 2 grid */}
      <div className="flex-1 min-w-0 grid grid-cols-2 grid-rows-2 gap-4">

        {/* Water Access */}
        <CardShell title="Water Access" icon={Droplet} iconColor="text-sky-400" link="View details">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${wColors.bg} ${wColors.text} ${wColors.border} border`}>
              {site.waterAccess.score >= 80 ? 'Excellent' : site.waterAccess.score >= 60 ? 'Good' : site.waterAccess.score >= 40 ? 'Moderate' : 'Poor'}
            </span>
            <span className={`text-xs font-bold ${wColors.text}`}>{site.waterAccess.score}/100</span>
          </div>
          <Row label="Nearest TSE line" value={site.waterAccess.nearestTSELine} />
          <Row label="Available capacity" value={site.waterAccess.availableCapacity} />
          <Row
            label="Source plant"
            value={<span className="text-[#10B981] text-xs">{site.waterAccess.source}</span>}
          />
        </CardShell>

        {/* Infrastructure */}
        <CardShell title="Infrastructure" icon={Zap} iconColor="text-amber-400" link="View details">
          <Row
            label="Power availability"
            value={
              <span className={`flex items-center gap-1.5 ${availColor(site.infrastructure.powerAvailability)}`}>
                {availIcon(site.infrastructure.powerAvailability)}
                {site.infrastructure.powerAvailability}
              </span>
            }
          />
          <Row label="Fiber" value={<span className="text-xs text-right leading-tight">{site.infrastructure.fiberConnectivity}</span>} />
          <Row label="Road access" value={<span className="text-xs text-right leading-tight">{site.infrastructure.roadAccess}</span>} />
        </CardShell>

        {/* Regulatory */}
        <CardShell title="Regulatory" icon={Shield} iconColor="text-violet-400" link="View details">
          <Row
            label="Complexity"
            value={
              <span className={`flex items-center gap-1.5 ${complexityColor(site.regulatory.complexityLevel)}`}>
                {complexityIcon(site.regulatory.complexityLevel)}
                {site.regulatory.complexityLevel}
              </span>
            }
          />
          <Row label="Agencies" value={`${site.regulatory.agenciesInvolved} involved`} />
          <Row
            label="Est. approval"
            value={
              <span className="flex items-center gap-1 text-amber-300">
                <Clock className="w-3 h-3" />
                {site.regulatory.estApprovalTime}
              </span>
            }
          />
        </CardShell>

        {/* Cooling Impact */}
        <CardShell title="Cooling Impact" icon={Thermometer} iconColor="text-rose-400" link="Compare technologies">
          <p className="text-[11px] text-[#6B7280] -mt-1">Additional daily water demand</p>
          <div className="flex flex-col gap-2 mt-1">
            {cooling.map((c) => {
              const pct = maxCooling > 0 ? (parseCoolingValue(c.value) / maxCooling) * 100 : 0;
              return (
                <div key={c.label} className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#9CA3AF]">{c.label}</span>
                    <span className="text-white font-medium">{c.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500/70 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardShell>
      </div>

      {/* Right — Nearby Infrastructure (full height) */}
      <div className="w-[240px] flex-shrink-0">
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-[#1F2937] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-[#10B981]" />
            </div>
            <span className="text-sm font-semibold text-white">Nearby Infrastructure</span>
          </div>

          <div className="flex-1 flex flex-col divide-y divide-[#1F2937]">
            {site.nearbyInfrastructure.map((item, i) => {
              const Icon = nearbyIcon(item.type);
              return (
                <div key={i} className="flex items-start gap-3 py-3">
                  <div className="w-7 h-7 rounded-lg bg-[#1F2937] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-[#6B7280]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-white leading-snug">{item.name}</div>
                    <div className="text-[11px] text-[#6B7280] mt-0.5">{item.type} · {item.distance}</div>
                    <span className={`inline-block mt-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <a className="text-[#10B981] text-xs flex items-center gap-1 cursor-pointer hover:underline pt-3 border-t border-[#1F2937] mt-2">
            View all nearby <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── placeholder tab ─────────────────────────────────────── */
function PlaceholderTab({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center h-32">
      <p className="text-[#4B5563] text-sm">{name} detail coming soon</p>
    </div>
  );
}

/* ─── main component ──────────────────────────────────────── */
export function SiteDetail({ site }: SiteDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const sc = scoreColors(site.overallScore);

  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden flex flex-col">

      {/* ── Card header ── */}
      <div className="px-5 pt-5 pb-0 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Droplet className="w-5 h-5 text-[#10B981]" />
          </div>

          {/* Name + badges + subtitle */}
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-[18px] font-bold text-white leading-tight">{site.name}</h2>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
                <span className="text-[15px] font-bold">{site.overallScore}</span>
                {site.rating}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-[13px] text-[#6B7280]">
              <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
              <span>{site.region} Region</span>
              <span className="text-[#374151]">·</span>
              <span>{site.distanceFromRiyadh} km from Riyadh</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="flex items-center gap-1.5 border border-[#1F2937] bg-transparent text-[#D1D5DB] hover:bg-[#1F2937]/60 rounded-md px-3.5 py-2 text-sm transition-colors">
            <GitCompare className="w-4 h-4" />
            Add to Compare
          </button>
          <button className="flex items-center gap-1.5 bg-[#10B981] text-white hover:bg-[#059669] rounded-md px-3.5 py-2 text-sm font-medium transition-colors">
            <FileBarChart2 className="w-4 h-4" />
            View Full Report
          </button>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="flex gap-0 px-5 mt-4 border-b border-[#1F2937]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'text-[#10B981]'
                : 'text-[#6B7280] hover:text-[#D1D5DB]'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#10B981] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div className="p-5">
        {activeTab === 'Overview' && <OverviewTab site={site} />}
        {activeTab !== 'Overview' && <PlaceholderTab name={activeTab} />}
      </div>
    </div>
  );
}
