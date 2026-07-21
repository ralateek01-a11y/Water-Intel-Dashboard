import React, { useState } from 'react';
import ReactDOM from 'react-dom';
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
  Sparkles,
  FileText,
  BarChart3,
  Radio,
  Network,
  Droplets,
  TrendingDown,
  TrendingUp,
  CalendarDays,
  Waves,
  ArrowUpRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  CheckCircle,
  ChevronDown as ChevronDownIcon,
  Plus,
  X,
  Printer,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { waterInfrastructure } from '../data/waterInfrastructure';
import { getSitesSortedByScore, getSiteById } from '../data/sites';
import { getDocumentsForSite } from '../data/siteDocuments';

/* ─── types ──────────────────────────────────────────────── */
interface WaterAccessDetail {
  overallScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  aiRecommendation: string;
  nearbyWaterSources: { plant: string; distance: string; capacity: string; status: string }[];
  availabilityTimeline: { year: number; score: number }[];
  supportingDocuments: { name: string; type: string }[];
}

interface InfrastructureDetail {
  electrical: {
    gridOperator: string;
    substation: string;
    voltage: string;
    distance: string;
    spareCapacity: string;
  };
  fiber: {
    provider: string;
    redundancy: string;
    bandwidth: string;
    plannedExpansion: string;
  };
  transportation: {
    nearestHighway: string;
    airportDistance: string;
    logisticsNotes: string;
  };
  industrial: {
    nearbyIndustrialZones: string[];
    utilityCorridors: string[];
    existingDataCenters: string[];
  };
  aiRecommendation: string;
}

type Rating = 'Low' | 'Medium' | 'High';
interface CoolingOption {
  dailyWater: string;
  energyUsage: Rating;
  capex: Rating;
  opex: Rating;
}
interface CoolingDetail {
  air: CoolingOption;
  liquid: CoolingOption;
  immersion: CoolingOption;
  dlc: CoolingOption;
}

interface ForecastDetail {
  plannedDesalinationPlants: { name: string; expectedCapacity: string; expectedYear: number }[];
  plannedTSEExpansions: { name: string; expectedCapacity: string; expectedYear: number }[];
  infrastructureInvestments: { name: string; amount: string; year: number }[];
  scoreProjection: { year: number; score: number }[];
  aiPrediction: string;
}

interface RegulatoryDetail {
  requiredAgencies: { name: string; role: string }[];
  requiredPermits: string[];
  approvalProcess: { step: string; description: string; typicalDuration: string }[];
  similarProjects: { name: string; location: string; approvalTime: string }[];
  aiAdvice: string;
}

interface Site {
  id: string;
  name: string;
  region: string;
  distanceFromRiyadh: number;
  overallScore: number;
  rating: string;
  coordinates: { lat: number; lng: number };
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
  waterAccessDetail?: WaterAccessDetail;
  infrastructureDetail?: InfrastructureDetail;
  regulatoryDetail?: RegulatoryDetail;
  coolingDetail?: CoolingDetail;
  forecastDetail?: ForecastDetail;
  water?: {
    summary: { availabilityScore: number; distanceToInfrastructure: string; reliability: 'High' | 'Medium' | 'Low' };
    detail: { cost: string; sustainability: string; droughtRisk: 'Low' | 'Medium' | 'High' };
  };
  power?: {
    summary: { distanceToSubstation: string; availableCapacityMW: number; reliability: 'High' | 'Medium' | 'Low' };
    detail: { outageHistory: string; electricityPrice: string; renewableAvailability: string; expansionPotential: string };
  };
  climate?: {
    summary: { avgYearlyTemp: string; peakSummerTemp: string; estimatedPUEImpact: string };
    detail: { humidity: string; extremeHeatDays: number };
  };
  connectivity?: {
    summary: { distanceToBackbone: string; fiberProviders: number; redundancy: 'Yes' | 'No' | 'Partial' };
    detail: { latencyToMajorCities: string; proximityToIX: string };
  };
  land?: {
    summary: { landPrice: string; parcelSize: string; floodRisk: 'Low' | 'Medium' | 'High' };
    detail: { flatnessSlope: string; soilStability: string; roomForExpansion: string; distanceToRoads: string };
  };
  zoning?: {
    summary: { dataCenterPermitted: 'Yes' | 'No' | 'Conditional'; sezStatus: string; permittingSpeed: string };
    detail: { taxIncentives: string; environmentalRestrictions: string; governmentSupport: string; easeOfPermits: 'Easy' | 'Moderate' | 'Difficult' };
  };
}

interface SiteDetailProps {
  site: Site;
  onNavigateToChat?: (prefill: string) => void;
  compareIds?: string[];
  onToggleCompare?: (id: string) => void;
}

/* ─── helpers ─────────────────────────────────────────────── */
const TABS = [
  'Overview',
  'Water',
  'Power',
  'Climate',
  'Connectivity',
  'Land',
  'Zoning',
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

function riskColors(level: 'Low' | 'Medium' | 'High') {
  if (level === 'Low') return { text: 'text-[#10B981]', bg: 'bg-[#10B981]/15', border: 'border-[#10B981]/30' };
  if (level === 'Medium') return { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30' };
  return { text: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30' };
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
  if (s.includes('constrained') || s.includes('limited')) return 'text-red-400 bg-red-500/10';
  if (s.includes('construction') || s.includes('planned')) return 'text-amber-400 bg-amber-500/10';
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

/* haversine distance in km */
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ─── CircleGauge (small SVG ring) ───────────────────────── */
function CircleGauge({ score, size = 80 }: { score: number; size?: number }) {
  const c = scoreColors(score);
  const r = size / 2 - 7;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width={size} height={size} className="flex-shrink-0">
      {/* track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1F2937" strokeWidth={7} />
      {/* fill */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={c.bar}
        strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={size * 0.22} fontWeight="700">
        {score}
      </text>
    </svg>
  );
}

/* ─── sub-cards ───────────────────────────────────────────── */
function CardShell({
  title,
  icon: Icon,
  iconColor = 'text-[#10B981]',
  children,
  link,
  onLinkClick,
}: {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor?: string;
  children: React.ReactNode;
  link?: string;
  onLinkClick?: () => void;
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
        <a
          onClick={onLinkClick}
          className={`text-[#10B981] text-xs flex items-center gap-1 mt-auto pt-1 border-t border-[#1F2937] ${onLinkClick ? 'cursor-pointer hover:underline' : 'cursor-default'}`}
        >
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

/* ─── SectionHeader ───────────────────────────────────────── */
function SectionHeader({ icon: Icon, title }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-6 rounded-md bg-[#1F2937] flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-sky-400" />
      </div>
      <span className="text-[13px] font-semibold text-white">{title}</span>
    </div>
  );
}

/* ─── Reusable AI Callout ─────────────────────────────────── */
function AICallout({ text }: { text: string }) {
  return (
    <div className="relative bg-sky-500/5 border border-sky-500/20 rounded-xl p-3.5 pl-4">
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-sky-500/50 rounded-l-xl" />
      <div className="flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#D1D5DB] leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

/* ─── Tag pill ────────────────────────────────────────────── */
function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#1F2937] text-[#9CA3AF] border border-[#374151]">
      {label}
    </span>
  );
}

/* ─── waterInfrastructure type → map colour ──────────────── */
function wInfraColor(type: string) {
  if (type === 'desalination') return '#22D3EE';   // cyan
  if (type === 'pipeline') return '#A78BFA';        // violet
  if (type === 'reservoir') return '#34D399';       // teal
  if (type === 'planned') return '#FCD34D';         // amber
  return '#60A5FA';                                  // blue (wastewater_treatment)
}

/* ─── Water tab ──────────────────────────────────────────── */
function WaterTab({ site }: { site: Site }) {
  const detail = site.waterAccessDetail;
  const w = site.water;

  if (!detail && !w) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-[#4B5563] text-sm">Water detail not available for this site.</p>
      </div>
    );
  }

  const score = w?.summary.availabilityScore ?? detail?.overallScore ?? 0;
  const droughtRisk = (w?.detail.droughtRisk ?? detail?.riskLevel ?? 'Low') as 'Low' | 'Medium' | 'High';
  const sc = scoreColors(score);
  const rc = riskColors(droughtRisk);

  const coolingRows = [
    { label: 'Air Cooling', value: site.coolingImpact.airCooling },
    { label: 'Liquid Cooling', value: site.coolingImpact.liquidCooling },
    { label: 'Immersion Cooling', value: site.coolingImpact.immersionCooling },
  ];
  const maxCooling = Math.max(...coolingRows.map((c) => parseCoolingValue(c.value)));
  const maxTimelineScore = detail ? Math.max(...detail.availabilityTimeline.map((t) => t.score), 100) : 100;
  const mapItems = waterInfrastructure.filter((wi) =>
    haversineKm(site.coordinates.lat, site.coordinates.lng, wi.coordinates.lat, wi.coordinates.lng) <= 150
  );

  return (
    <div className="flex flex-col gap-5">

      {/* ── 1. Overview row ── */}
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <CircleGauge score={score} size={88} />
          <span className={`text-[11px] font-medium ${sc.text}`}>Water Score</span>
        </div>
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${rc.bg} ${rc.text} ${rc.border}`}>
              {droughtRisk === 'Low' && <CheckCircle2 className="w-3.5 h-3.5" />}
              {droughtRisk === 'Medium' && <AlertCircle className="w-3.5 h-3.5" />}
              {droughtRisk === 'High' && <XCircle className="w-3.5 h-3.5" />}
              {droughtRisk} Drought Risk
            </span>
            {w && (
              <>
                <span className="text-[12px] text-[#6B7280]">Cost: <span className="text-white font-medium">{w.detail.cost}</span></span>
                <span className="text-[12px] text-[#6B7280]">Source: <span className="text-[#10B981] font-medium">{w.detail.sustainability}</span></span>
              </>
            )}
          </div>
          {detail?.aiRecommendation && <AICallout text={detail.aiRecommendation} />}
        </div>
      </div>

      {/* ── 2. Nearby Water Sources ── */}
      {detail?.nearbyWaterSources && (
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
          <SectionHeader icon={Droplet} title="Nearby Water Sources" />
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#1F2937]">
                <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2 pr-3">Plant / Source</th>
                <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2 pr-3">Distance</th>
                <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2 pr-3">Capacity</th>
                <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {detail.nearbyWaterSources.map((src, i) => (
                <tr key={i} className="border-b border-[#1F2937]/50 last:border-0">
                  <td className="py-2.5 pr-3 text-white font-medium leading-snug">{src.plant}</td>
                  <td className="py-2.5 pr-3 text-[#9CA3AF] whitespace-nowrap">{src.distance}</td>
                  <td className="py-2.5 pr-3 text-[#9CA3AF] leading-snug">{src.capacity}</td>
                  <td className="py-2.5">
                    <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full ${statusColor(src.status)}`}>{src.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── 3. Water Demand by Cooling Technology ── */}
      <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
        <SectionHeader icon={BarChart3} title="Water Demand by Cooling Technology" />
        <p className="text-[11px] text-[#6B7280] mb-3 -mt-1">Estimated additional daily usage at this site</p>
        <div className="flex flex-col gap-3">
          {coolingRows.map((c) => {
            const pct = maxCooling > 0 ? (parseCoolingValue(c.value) / maxCooling) * 100 : 0;
            const col = scoreColors(100 - pct);
            return (
              <div key={c.label} className="flex items-center gap-3">
                <span className="text-[12px] text-[#9CA3AF] w-[120px] flex-shrink-0">{c.label}</span>
                <div className="flex-1 h-2 bg-[#1F2937] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: col.bar }} />
                </div>
                <span className="text-[12px] font-medium text-white w-[90px] text-right">{c.value}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 4. Water Availability Timeline ── */}
      {detail?.availabilityTimeline && (
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
          <SectionHeader icon={BarChart3} title="Water Availability Timeline" />
          <p className="text-[11px] text-[#6B7280] mb-4 -mt-1">Projected water availability score by year</p>
          <div className="flex flex-col gap-3">
            {detail.availabilityTimeline.map((item) => {
              const pct = (item.score / maxTimelineScore) * 100;
              const c = scoreColors(item.score);
              return (
                <div key={item.year} className="flex items-center gap-3">
                  <span className="text-[12px] font-medium text-[#9CA3AF] w-10 flex-shrink-0">{item.year}</span>
                  <div className="flex-1 h-5 bg-[#1F2937] rounded-md overflow-hidden relative">
                    <div className="h-full rounded-md transition-all" style={{ width: `${pct}%`, backgroundColor: c.bar, opacity: 0.8 }} />
                  </div>
                  <span className={`text-[12px] font-bold w-8 text-right ${c.text}`}>{item.score}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 5. Supporting Documents ── */}
      {detail?.supportingDocuments && (
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
          <SectionHeader icon={FileText} title="Supporting Documents" />
          <div className="flex flex-col divide-y divide-[#1F2937]">
            {detail.supportingDocuments.map((doc, i) => (
              <a key={i} href="#" className="flex items-center gap-3 py-2.5 hover:bg-[#1F2937]/40 rounded-lg px-1 -mx-1 transition-colors group">
                <div className="w-7 h-7 rounded-lg bg-[#1F2937] flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500/10 transition-colors">
                  <FileText className="w-3.5 h-3.5 text-[#6B7280] group-hover:text-sky-400 transition-colors" />
                </div>
                <span className="flex-1 text-[13px] text-[#D1D5DB] group-hover:text-white transition-colors leading-snug">{doc.name}</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#1F2937] text-[#9CA3AF] flex-shrink-0">{doc.type}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#4B5563] group-hover:text-sky-400 flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── 6. Nearby Water Infrastructure Map ── */}
      <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
        <SectionHeader icon={MapPin} title="Nearby Water Infrastructure" />
        <p className="text-[11px] text-[#6B7280] mb-3 -mt-1">TSE plants, pipelines & reservoirs within 150 km</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-3">
          {[
            { label: 'Treatment Plant', color: '#60A5FA' },
            { label: 'Desalination', color: '#22D3EE' },
            { label: 'Pipeline', color: '#A78BFA' },
            { label: 'Reservoir', color: '#34D399' },
            { label: 'Planned', color: '#FCD34D' },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: l.color }} />
              <span className="text-[11px] text-[#9CA3AF]">{l.label}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl overflow-hidden" style={{ height: 280 }}>
          <MapContainer center={[site.coordinates.lat, site.coordinates.lng]} zoom={7} style={{ width: '100%', height: '100%' }} zoomControl attributionControl={false}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution="" />
            <CircleMarker center={[site.coordinates.lat, site.coordinates.lng]} radius={8} pathOptions={{ color: '#FFFFFF', fillColor: '#FFFFFF', fillOpacity: 1, weight: 2 }}>
              <Tooltip permanent direction="top" offset={[0, -10]}><span style={{ fontSize: 11, fontWeight: 600 }}>{site.name}</span></Tooltip>
            </CircleMarker>
            {mapItems.map((wi) => (
              <CircleMarker key={wi.id} center={[wi.coordinates.lat, wi.coordinates.lng]} radius={6} pathOptions={{ color: wInfraColor(wi.type), fillColor: wInfraColor(wi.type), fillOpacity: 0.75, weight: 1.5 }}>
                <Tooltip direction="top" offset={[0, -8]}>
                  <span style={{ fontSize: 11 }}>{wi.name}</span><br />
                  <span style={{ fontSize: 10, color: '#9CA3AF' }}>{wi.capacity}</span>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

/* ─── Infrastructure tab (legacy — kept for data re-use) ─────── */
function InfrastructureTab({ site }: { site: Site }) {
  const detail = site.infrastructureDetail;

  if (!detail) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-[#4B5563] text-sm">Infrastructure detail not available for this site.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">

      {/* ── 2×2 card grid ── */}
      <div className="grid grid-cols-2 gap-4">

        {/* Electrical */}
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1F2937] flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-sm font-semibold text-white">Electrical Infrastructure</span>
          </div>
          <div className="flex flex-col gap-2 text-[13px]">
            <Row label="Grid operator" value={detail.electrical.gridOperator} />
            <Row label="Substation" value={<span className="text-xs text-right leading-snug">{detail.electrical.substation}</span>} />
            <Row label="Voltage" value={
              <span className="font-semibold text-amber-400">{detail.electrical.voltage}</span>
            } />
            <Row label="Distance" value={detail.electrical.distance} />
            <Row label="Spare capacity" value={
              <span className="font-semibold text-[#10B981]">{detail.electrical.spareCapacity}</span>
            } />
          </div>
        </div>

        {/* Fiber */}
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1F2937] flex items-center justify-center flex-shrink-0">
              <Network className="w-4 h-4 text-sky-400" />
            </div>
            <span className="text-sm font-semibold text-white">Fiber Connectivity</span>
          </div>
          <div className="flex flex-col gap-2 text-[13px]">
            <Row label="Provider(s)" value={<span className="text-xs text-right leading-snug">{detail.fiber.provider}</span>} />
            <Row label="Redundancy" value={<span className="text-xs text-right leading-snug">{detail.fiber.redundancy}</span>} />
            <Row label="Bandwidth" value={
              <span className="font-semibold text-sky-400">{detail.fiber.bandwidth}</span>
            } />
            <div className="mt-1 pt-2 border-t border-[#1F2937]">
              <p className="text-[11px] text-[#6B7280] mb-1">Planned expansion</p>
              <p className="text-[12px] text-[#D1D5DB] leading-snug">{detail.fiber.plannedExpansion}</p>
            </div>
          </div>
        </div>

        {/* Transportation */}
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1F2937] flex items-center justify-center flex-shrink-0">
              <Truck className="w-4 h-4 text-violet-400" />
            </div>
            <span className="text-sm font-semibold text-white">Transportation</span>
          </div>
          <div className="flex flex-col gap-2 text-[13px]">
            <Row label="Nearest highway" value={<span className="text-xs text-right leading-snug">{detail.transportation.nearestHighway}</span>} />
            <Row label="Airport" value={<span className="text-xs text-right leading-snug">{detail.transportation.airportDistance}</span>} />
            <div className="mt-1 pt-2 border-t border-[#1F2937]">
              <p className="text-[11px] text-[#6B7280] mb-1">Logistics notes</p>
              <p className="text-[12px] text-[#D1D5DB] leading-snug">{detail.transportation.logisticsNotes}</p>
            </div>
          </div>
        </div>

        {/* Industrial */}
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1F2937] flex items-center justify-center flex-shrink-0">
              <Factory className="w-4 h-4 text-rose-400" />
            </div>
            <span className="text-sm font-semibold text-white">Industrial Infrastructure</span>
          </div>
          <div className="flex flex-col gap-3 text-[13px]">
            {/* Nearby industrial zones */}
            <div>
              <p className="text-[11px] text-[#6B7280] mb-1.5">Nearby industrial zones</p>
              <div className="flex flex-wrap gap-1.5">
                {detail.industrial.nearbyIndustrialZones.length > 0
                  ? detail.industrial.nearbyIndustrialZones.map((z, i) => <Tag key={i} label={z} />)
                  : <span className="text-[12px] text-[#4B5563]">None identified</span>}
              </div>
            </div>
            {/* Utility corridors */}
            <div>
              <p className="text-[11px] text-[#6B7280] mb-1.5">Utility corridors</p>
              <div className="flex flex-wrap gap-1.5">
                {detail.industrial.utilityCorridors.length > 0
                  ? detail.industrial.utilityCorridors.map((c, i) => <Tag key={i} label={c} />)
                  : <span className="text-[12px] text-[#4B5563]">None identified</span>}
              </div>
            </div>
            {/* Existing data centers */}
            <div>
              <p className="text-[11px] text-[#6B7280] mb-1.5">Existing data centers</p>
              <div className="flex flex-wrap gap-1.5">
                {detail.industrial.existingDataCenters.length > 0
                  ? detail.industrial.existingDataCenters.map((d, i) => (
                      <span key={i} className="inline-block text-[11px] font-medium px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        {d}
                      </span>
                    ))
                  : <span className="text-[12px] text-[#4B5563]">None in vicinity</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Recommendation ── */}
      <AICallout text={detail.aiRecommendation} />
    </div>
  );
}

/* ─── Power tab ───────────────────────────────────────────── */
function PowerTab({ site }: { site: Site }) {
  const pw = site.power;
  const electrical = site.infrastructureDetail?.electrical;
  if (!pw) return <PlaceholderTab name="Power" />;

  const relColor = (r: string) =>
    r === 'High' ? 'text-[#10B981]' : r === 'Low' ? 'text-red-400' : 'text-amber-400';
  const nearbyPower = (site.nearbyInfrastructure ?? []).filter((i) => i.type === 'Power');

  return (
    <div className="flex flex-col gap-5">

      {/* ── 1. Summary stat cards ── */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] text-[#6B7280]">Distance to Substation</span>
          <span className="text-xl font-bold text-white">{pw.summary.distanceToSubstation}</span>
        </div>
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] text-[#6B7280]">Available Capacity</span>
          <span className="text-xl font-bold text-amber-400">{pw.summary.availableCapacityMW} MW</span>
        </div>
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] text-[#6B7280]">Grid Reliability</span>
          <span className={`text-xl font-bold ${relColor(pw.summary.reliability)}`}>{pw.summary.reliability}</span>
        </div>
      </div>

      {/* ── 2. Power detail ── */}
      <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
        <SectionHeader icon={Zap} title="Power Detail" />
        <div className="flex flex-col gap-2 text-[13px]">
          <Row label="Outage history" value={pw.detail.outageHistory} />
          <Row label="Electricity price" value={<span className="font-medium text-amber-300">{pw.detail.electricityPrice}</span>} />
          <Row label="Renewable options" value={<span className="text-xs text-right leading-snug text-[#9CA3AF]">{pw.detail.renewableAvailability}</span>} />
          <div className="mt-1 pt-2 border-t border-[#1F2937]">
            <p className="text-[11px] text-[#6B7280] mb-1">Expansion potential</p>
            <p className="text-[12px] text-[#D1D5DB] leading-snug">{pw.detail.expansionPotential}</p>
          </div>
        </div>
      </div>

      {/* ── 3. Substation detail (from infrastructure data) ── */}
      {electrical && (
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
          <SectionHeader icon={Zap} title="Substation Detail" />
          <div className="flex flex-col gap-2 text-[13px]">
            <Row label="Grid operator" value={electrical.gridOperator} />
            <Row label="Substation" value={<span className="text-xs text-right leading-snug">{electrical.substation}</span>} />
            <Row label="Voltage" value={<span className="font-semibold text-amber-400">{electrical.voltage}</span>} />
            <Row label="Distance" value={electrical.distance} />
            <Row label="Spare capacity" value={<span className="font-semibold text-[#10B981]">{electrical.spareCapacity}</span>} />
          </div>
        </div>
      )}

      {/* ── 4. Nearby power nodes ── */}
      {nearbyPower.length > 0 && (
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
          <SectionHeader icon={MapPin} title="Nearby Substations & Power Nodes" />
          <div className="flex flex-col divide-y divide-[#1F2937]">
            {nearbyPower.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2.5">
                <span className="text-[13px] text-white font-medium">{item.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-[#9CA3AF]">{item.distance}</span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusColor(item.status)}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Connectivity tab ────────────────────────────────────── */
function ConnectivityTab({ site }: { site: Site }) {
  const co = site.connectivity;
  const fiber = site.infrastructureDetail?.fiber;
  if (!co) return <PlaceholderTab name="Connectivity" />;

  const fiberColor =
    co.summary.fiberProviders >= 2 ? 'text-[#10B981]' :
    co.summary.fiberProviders === 1 ? 'text-amber-400' : 'text-red-400';
  const redundancyColor =
    co.summary.redundancy === 'Yes' ? 'text-[#10B981]' :
    co.summary.redundancy === 'No' ? 'text-red-400' : 'text-amber-400';
  const nearbyFiber = (site.nearbyInfrastructure ?? []).filter((i) =>
    i.type.toLowerCase().includes('connect') || i.type.toLowerCase().includes('fiber') || i.type.toLowerCase().includes('network')
  );

  return (
    <div className="flex flex-col gap-5">

      {/* ── 1. Summary stat cards ── */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] text-[#6B7280]">Distance to Backbone</span>
          <span className="text-xl font-bold text-white">{co.summary.distanceToBackbone}</span>
        </div>
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] text-[#6B7280]">Fiber Providers</span>
          <span className={`text-xl font-bold ${fiberColor}`}>
            {co.summary.fiberProviders === 0 ? 'None' : `${co.summary.fiberProviders} carrier${co.summary.fiberProviders > 1 ? 's' : ''}`}
          </span>
        </div>
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] text-[#6B7280]">Redundancy</span>
          <span className={`text-xl font-bold ${redundancyColor}`}>{co.summary.redundancy}</span>
        </div>
      </div>

      {/* ── 2. Network reach ── */}
      <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
        <SectionHeader icon={Network} title="Network Reach" />
        <div className="flex flex-col gap-2 text-[13px]">
          <Row label="Latency to cities" value={<span className="text-xs text-right leading-snug text-[#9CA3AF]">{co.detail.latencyToMajorCities}</span>} />
          <Row label="Internet exchange" value={<span className="text-xs text-right leading-snug text-[#9CA3AF]">{co.detail.proximityToIX}</span>} />
        </div>
      </div>

      {/* ── 3. Fiber infrastructure detail ── */}
      {fiber && (
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
          <SectionHeader icon={Network} title="Fiber Infrastructure Detail" />
          <div className="flex flex-col gap-2 text-[13px]">
            <Row label="Provider(s)" value={<span className="text-xs text-right leading-snug">{fiber.provider}</span>} />
            <Row label="Redundancy" value={<span className="text-xs text-right leading-snug">{fiber.redundancy}</span>} />
            <Row label="Bandwidth" value={<span className="font-semibold text-violet-400">{fiber.bandwidth}</span>} />
            <div className="mt-1 pt-2 border-t border-[#1F2937]">
              <p className="text-[11px] text-[#6B7280] mb-1">Planned expansion</p>
              <p className="text-[12px] text-[#D1D5DB] leading-snug">{fiber.plannedExpansion}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. Nearby fiber hubs ── */}
      {nearbyFiber.length > 0 && (
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
          <SectionHeader icon={MapPin} title="Nearby Fiber Hubs" />
          <div className="flex flex-col divide-y divide-[#1F2937]">
            {nearbyFiber.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2.5">
                <span className="text-[13px] text-white font-medium">{item.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-[#9CA3AF]">{item.distance}</span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusColor(item.status)}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Climate tab ─────────────────────────────────────────── */
function ClimateTab({ site }: { site: Site }) {
  const cl = site.climate;
  if (!cl) return <PlaceholderTab name="Climate" />;

  const pueNum = parseFloat(cl.summary.estimatedPUEImpact.replace(/[^0-9.]/g, '')) || 0;
  const pueColor = pueNum <= 0.10 ? 'text-[#10B981]' : pueNum <= 0.14 ? 'text-amber-400' : 'text-red-400';

  const aiText = `This site's peak summer temperature of ${cl.summary.peakSummerTemp} combined with ${cl.detail.humidity} makes free-air cooling unviable during peak months. Liquid cooling or Direct Liquid Cooling (DLC) is strongly recommended to achieve PUE targets below 1.4. The ${cl.detail.extremeHeatDays} extreme heat days per year above 40°C require full mechanical cooling capacity — no free-cooling credit can be assumed. The estimated ${cl.summary.estimatedPUEImpact} versus a temperate baseline should be factored into total cost of ownership comparisons with non-Gulf sites.`;

  return (
    <div className="flex flex-col gap-5">

      {/* ── 1. Summary stat cards ── */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] text-[#6B7280]">Avg. Yearly Temp</span>
          <span className="text-xl font-bold text-white">{cl.summary.avgYearlyTemp}</span>
        </div>
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] text-[#6B7280]">Peak Summer</span>
          <span className="text-xl font-bold text-rose-400">{cl.summary.peakSummerTemp}</span>
        </div>
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] text-[#6B7280]">PUE Penalty</span>
          <span className={`text-xl font-bold ${pueColor}`}>{cl.summary.estimatedPUEImpact.split(' ')[0]}</span>
        </div>
      </div>

      {/* ── 2. Detailed climate data ── */}
      <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
        <SectionHeader icon={Thermometer} title="Climate Detail" />
        <div className="flex flex-col gap-2 text-[13px]">
          <Row label="Humidity" value={cl.detail.humidity} />
          <Row label="Extreme heat days" value={<span className="font-semibold text-rose-400">{cl.detail.extremeHeatDays} days/year above 40°C</span>} />
          <Row label="Full PUE impact" value={<span className="text-xs text-right leading-snug text-[#9CA3AF]">{cl.summary.estimatedPUEImpact}</span>} />
        </div>
      </div>

      {/* ── 3. AI recommendation ── */}
      <AICallout text={aiText} />
    </div>
  );
}

/* ─── Land tab ────────────────────────────────────────────── */
function LandTab({ site }: { site: Site }) {
  const la = site.land;
  const transport = site.infrastructureDetail?.transportation;
  if (!la) return <PlaceholderTab name="Land" />;

  const floodColor =
    la.summary.floodRisk === 'Low' ? 'text-[#10B981]' :
    la.summary.floodRisk === 'Medium' ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="flex flex-col gap-5">

      {/* ── 1. Summary stat cards ── */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] text-[#6B7280]">Land Price</span>
          <span className="text-xl font-bold text-white">{la.summary.landPrice}</span>
        </div>
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] text-[#6B7280]">Available Parcel</span>
          <span className="text-base font-bold text-[#10B981] leading-snug">{la.summary.parcelSize}</span>
        </div>
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-1">
          <span className="text-[11px] text-[#6B7280]">Flood Risk</span>
          <span className={`text-xl font-bold ${floodColor}`}>{la.summary.floodRisk}</span>
        </div>
      </div>

      {/* ── 2. Topography detail ── */}
      <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
        <SectionHeader icon={MapPin} title="Topography & Site Conditions" />
        <div className="flex flex-col gap-2 text-[13px]">
          <Row label="Flatness / slope" value={la.detail.flatnessSlope} />
          <Row label="Soil stability" value={la.detail.soilStability} />
          <Row label="Room for expansion" value={la.detail.roomForExpansion} />
          <Row label="Distance to roads" value={la.detail.distanceToRoads} />
        </div>
      </div>

      {/* ── 3. Transport & access (from infrastructure data) ── */}
      {transport && (
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
          <SectionHeader icon={Truck} title="Transport & Access" />
          <div className="flex flex-col gap-2 text-[13px]">
            <Row label="Nearest highway" value={<span className="text-xs text-right leading-snug">{transport.nearestHighway}</span>} />
            <Row label="Airport" value={<span className="text-xs text-right leading-snug">{transport.airportDistance}</span>} />
            <div className="mt-1 pt-2 border-t border-[#1F2937]">
              <p className="text-[11px] text-[#6B7280] mb-1">Logistics notes</p>
              <p className="text-[12px] text-[#D1D5DB] leading-snug">{transport.logisticsNotes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Overview tab ────────────────────────────────────────── */
function OverviewTab({ site, setActiveTab }: { site: Site; setActiveTab: (tab: Tab) => void }) {
  function ScoreBadge({ score }: { score: number }) {
    const c = scoreColors(score);
    const label = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Moderate' : 'Poor';
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full border ${c.bg} ${c.text} ${c.border}`}>
        {label} · {score}
      </span>
    );
  }
  function RLabel({ v, good, bad }: { v: string; good: string; bad: string }) {
    const color = v === good ? 'text-[#10B981]' : v === bad ? 'text-red-400' : 'text-amber-400';
    return <span className={`font-medium ${color}`}>{v}</span>;
  }

  const w = site.water;
  const pw = site.power;
  const cl = site.climate;
  const co = site.connectivity;
  const la = site.land;
  const z = site.zoning;

  const permitColor = (v: string) =>
    v === 'Yes' ? 'text-[#10B981]' : v === 'No' ? 'text-red-400' : 'text-amber-400';

  const NA = <p className="text-[#4B5563] text-xs italic">Data not available</p>;

  return (
    <div className="grid grid-cols-3 gap-4">

      {/* ── 1. Water ── */}
      <CardShell title="Water" icon={Droplets} iconColor="text-sky-400" link="View details" onLinkClick={() => setActiveTab('Water')}>
        {w ? (
          <>
            <Row label="Availability score" value={<ScoreBadge score={w.summary.availabilityScore} />} />
            <Row label="Distance to supply" value={w.summary.distanceToInfrastructure} />
            <Row label="Reliability" value={<RLabel v={w.summary.reliability} good="High" bad="Low" />} />
          </>
        ) : NA}
      </CardShell>

      {/* ── 2. Power ── */}
      <CardShell title="Power" icon={Zap} iconColor="text-amber-400" link="View details" onLinkClick={() => setActiveTab('Power')}>
        {pw ? (
          <>
            <Row label="Substation distance" value={pw.summary.distanceToSubstation} />
            <Row label="Available capacity" value={<span className="text-amber-300 font-medium">{pw.summary.availableCapacityMW} MW</span>} />
            <Row label="Grid reliability" value={<RLabel v={pw.summary.reliability} good="High" bad="Low" />} />
          </>
        ) : NA}
      </CardShell>

      {/* ── 3. Climate / Cooling Efficiency ── */}
      <CardShell title="Climate / Cooling" icon={Thermometer} iconColor="text-rose-400" link="View details" onLinkClick={() => setActiveTab('Climate')}>
        {cl ? (
          <>
            <Row label="Avg. yearly temp" value={cl.summary.avgYearlyTemp} />
            <Row label="Peak summer" value={<span className="text-rose-400 font-medium">{cl.summary.peakSummerTemp}</span>} />
            <Row label="PUE impact" value={<span className="text-[11px] text-right leading-snug text-[#9CA3AF]">{cl.summary.estimatedPUEImpact}</span>} />
          </>
        ) : NA}
      </CardShell>

      {/* ── 4. Connectivity ── */}
      <CardShell title="Connectivity" icon={Network} iconColor="text-violet-400" link="View details" onLinkClick={() => setActiveTab('Connectivity')}>
        {co ? (
          <>
            <Row label="Distance to backbone" value={co.summary.distanceToBackbone} />
            <Row
              label="Fiber providers"
              value={
                <span className={
                  co.summary.fiberProviders >= 2 ? 'text-[#10B981] font-medium' :
                  co.summary.fiberProviders === 1 ? 'text-amber-400 font-medium' :
                  'text-red-400 font-medium'
                }>
                  {co.summary.fiberProviders === 0 ? 'None' : `${co.summary.fiberProviders} carrier${co.summary.fiberProviders > 1 ? 's' : ''}`}
                </span>
              }
            />
            <Row label="Redundancy" value={<RLabel v={co.summary.redundancy} good="Yes" bad="No" />} />
          </>
        ) : NA}
      </CardShell>

      {/* ── 5. Land / Topography ── */}
      <CardShell title="Land / Topography" icon={MapPin} iconColor="text-emerald-400" link="View details" onLinkClick={() => setActiveTab('Land')}>
        {la ? (
          <>
            <Row label="Land price" value={la.summary.landPrice} />
            <Row label="Available parcel" value={la.summary.parcelSize} />
            <Row label="Flood risk" value={<RLabel v={la.summary.floodRisk} good="Low" bad="High" />} />
          </>
        ) : NA}
      </CardShell>

      {/* ── 6. Zoning / SEZ ── */}
      <CardShell title="Zoning / SEZ" icon={Shield} iconColor="text-indigo-400" link="View details" onLinkClick={() => setActiveTab('Zoning')}>
        {z ? (
          <>
            <Row label="DC permitted" value={<span className={`font-medium ${permitColor(z.summary.dataCenterPermitted)}`}>{z.summary.dataCenterPermitted}</span>} />
            <Row label="SEZ status" value={<span className="text-[11px] text-right leading-snug text-[#9CA3AF]">{z.summary.sezStatus}</span>} />
            <Row label="Permitting speed" value={
              <span className="flex items-center gap-1 text-amber-300">
                <Clock className="w-3 h-3" />
                {z.summary.permittingSpeed}
              </span>
            } />
          </>
        ) : NA}
      </CardShell>

    </div>
  );
}

/* ─── Cooling Impact tab ──────────────────────────────────── */
type CoolingKey = 'air' | 'liquid' | 'immersion' | 'dlc';

const COOLING_OPTIONS: { key: CoolingKey; label: string; icon: string }[] = [
  { key: 'air',       label: 'Air Cooling',       icon: '💨' },
  { key: 'liquid',    label: 'Liquid Cooling',     icon: '💧' },
  { key: 'immersion', label: 'Immersion Cooling',  icon: '🧊' },
  { key: 'dlc',       label: 'Direct Liquid (DLC)', icon: '⚡' },
];

function ratingColors(r: 'Low' | 'Medium' | 'High') {
  if (r === 'Low')    return { text: 'text-[#10B981]', bg: 'bg-[#10B981]/10', border: 'border-[#10B981]/30', dot: 'bg-[#10B981]' };
  if (r === 'Medium') return { text: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30',  dot: 'bg-amber-400' };
  return               { text: 'text-red-400',   bg: 'bg-red-500/10',    border: 'border-red-500/30',    dot: 'bg-red-400' };
}

function RatingBadge({ value }: { value: 'Low' | 'Medium' | 'High' }) {
  const c = ratingColors(value);
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full border ${c.text} ${c.bg} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {value}
    </span>
  );
}

function CoolingTab({ site }: { site: Site }) {
  const detail = site.coolingDetail;
  const [selected, setSelected] = useState<CoolingKey>('air');

  if (!detail) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-[#4B5563] text-sm">Cooling detail not available for this site.</p>
      </div>
    );
  }

  const opt = detail[selected];

  return (
    <div className="flex flex-col gap-5">

      {/* ── Selector pills ── */}
      <div className="flex gap-2 flex-wrap">
        {COOLING_OPTIONS.map(({ key, label, icon }) => {
          const active = selected === key;
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[13px] font-medium transition-all ${
                active
                  ? 'bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981]'
                  : 'bg-[#0D1424] border-[#1F2937] text-[#6B7280] hover:border-[#374151] hover:text-[#9CA3AF]'
              }`}
            >
              <span>{icon}</span>
              {label}
              {active && <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* ── Stat card for selected technology ── */}
      <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
        <p className="text-[11px] text-[#6B7280] font-medium mb-3 uppercase tracking-wider">
          {COOLING_OPTIONS.find(o => o.key === selected)?.label} — Key Metrics
        </p>
        <div className="grid grid-cols-4 gap-3">
          {/* Daily Water */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-3.5 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[11px] text-[#6B7280] font-medium">Daily Water</span>
            </div>
            <p className="text-[15px] font-bold text-white leading-tight">{opt.dailyWater}</p>
            <RatingBadge value={
              // derive Low/Med/High from absolute value for display consistency
              selected === 'air' ? 'High' : selected === 'liquid' ? 'Medium' : 'Low'
            } />
          </div>
          {/* Energy Usage */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-3.5 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] text-[#6B7280] font-medium">Energy Usage</span>
            </div>
            <p className="text-[15px] font-bold text-white leading-tight">
              {opt.energyUsage === 'High' ? 'PUE ~1.6' : opt.energyUsage === 'Medium' ? 'PUE ~1.35' : 'PUE ~1.05'}
            </p>
            <RatingBadge value={opt.energyUsage} />
          </div>
          {/* CAPEX */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-3.5 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[11px] text-[#6B7280] font-medium">CAPEX</span>
            </div>
            <p className="text-[15px] font-bold text-white leading-tight">
              {opt.capex === 'Low' ? 'Standard' : opt.capex === 'Medium' ? '+25–40%' : '+60–90%'}
            </p>
            <RatingBadge value={opt.capex} />
          </div>
          {/* OPEX */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-3.5 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[11px] text-[#6B7280] font-medium">OPEX</span>
            </div>
            <p className="text-[15px] font-bold text-white leading-tight">
              {opt.opex === 'High' ? 'Highest' : opt.opex === 'Medium' ? 'Moderate' : 'Lowest'}
            </p>
            <RatingBadge value={opt.opex} />
          </div>
        </div>
      </div>

      {/* ── Comparison table ── */}
      <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
        <SectionHeader icon={BarChart3} title="All Technologies — Side-by-Side" />
        <div className="mt-1 overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#1F2937]">
                <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2.5 pr-4">Technology</th>
                <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2.5 pr-4">Daily Water</th>
                <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2.5 pr-4">Energy</th>
                <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2.5 pr-4">CAPEX</th>
                <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2.5">OPEX</th>
              </tr>
            </thead>
            <tbody>
              {COOLING_OPTIONS.map(({ key, label, icon }) => {
                const row = detail[key];
                const isSelected = key === selected;
                return (
                  <tr
                    key={key}
                    onClick={() => setSelected(key)}
                    className={`border-b border-[#1F2937]/50 last:border-0 cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#10B981]/5' : 'hover:bg-[#111827]/60'
                    }`}
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] flex-shrink-0" />}
                        {!isSelected && <span className="w-1.5 h-1.5 rounded-full bg-transparent flex-shrink-0" />}
                        <span className={`font-semibold ${isSelected ? 'text-[#10B981]' : 'text-white'}`}>
                          {icon} {label}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-[#D1D5DB]">{row.dailyWater}</span>
                    </td>
                    <td className="py-3 pr-4"><RatingBadge value={row.energyUsage} /></td>
                    <td className="py-3 pr-4"><RatingBadge value={row.capex} /></td>
                    <td className="py-3"><RatingBadge value={row.opex} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#1F2937]">
          <span className="text-[11px] text-[#4B5563]">Lower is better for all metrics.</span>
          <div className="flex items-center gap-3">
            {(['Low', 'Medium', 'High'] as const).map(r => {
              const c = ratingColors(r);
              return (
                <span key={r} className={`inline-flex items-center gap-1 text-[11px] ${c.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                  {r}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Zoning tab ──────────────────────────────────────────── */
function ZoningTab({ site }: { site: Site }) {
  const detail = site.regulatoryDetail;
  const z = site.zoning;

  if (!detail && !z) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-[#4B5563] text-sm">Zoning detail not available for this site.</p>
      </div>
    );
  }

  const permitColor = (v: string) =>
    v === 'Yes' ? 'text-[#10B981]' : v === 'No' ? 'text-red-400' : 'text-amber-400';
  const easeColor = (v: string) =>
    v === 'Easy' ? 'text-[#10B981]' : v === 'Difficult' ? 'text-red-400' : 'text-amber-400';
  const complexityBadge = detail
    ? site.regulatory.complexityLevel === 'Low'
      ? 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30'
      : site.regulatory.complexityLevel === 'Medium'
      ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
      : 'text-red-400 bg-red-500/10 border-red-500/30'
    : '';
  const approvalTimeColor = detail
    ? site.regulatory.complexityLevel === 'Low' ? 'text-[#10B981]'
      : site.regulatory.complexityLevel === 'Medium' ? 'text-amber-400' : 'text-red-400'
    : 'text-amber-400';

  return (
    <div className="flex flex-col gap-5">

      {/* ── 0. Zoning summary stat cards ── */}
      {z && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-1">
              <span className="text-[11px] text-[#6B7280]">DC Permitted</span>
              <span className={`text-xl font-bold ${permitColor(z.summary.dataCenterPermitted)}`}>{z.summary.dataCenterPermitted}</span>
            </div>
            <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-1">
              <span className="text-[11px] text-[#6B7280]">Permitting Speed</span>
              <span className="text-base font-bold text-amber-300 leading-snug">{z.summary.permittingSpeed}</span>
            </div>
            <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-1">
              <span className="text-[11px] text-[#6B7280]">Ease of Permits</span>
              <span className={`text-xl font-bold ${easeColor(z.detail.easeOfPermits)}`}>{z.detail.easeOfPermits}</span>
            </div>
          </div>

          <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
            <SectionHeader icon={Shield} title="Zoning & Incentives" />
            <div className="flex flex-col gap-2 text-[13px]">
              <Row label="SEZ status" value={<span className="text-xs text-right leading-snug text-[#9CA3AF]">{z.summary.sezStatus}</span>} />
              <Row label="Tax incentives" value={<span className="text-xs text-right leading-snug text-[#9CA3AF]">{z.detail.taxIncentives}</span>} />
              <Row label="Environmental restrictions" value={<span className="text-xs text-right leading-snug text-[#9CA3AF]">{z.detail.environmentalRestrictions}</span>} />
              <Row label="Government support" value={<span className="text-xs text-right leading-snug text-[#9CA3AF]">{z.detail.governmentSupport}</span>} />
            </div>
          </div>
        </>
      )}

      {/* ── 1. Required Agencies ── */}
      {detail && (
        <>
          <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <SectionHeader icon={Building2} title="Required Agencies" />
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${complexityBadge}`}>
                {detail.requiredAgencies.length} agencies · {site.regulatory.complexityLevel} complexity
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {detail.requiredAgencies.map((agency, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#111827] border border-[#1F2937] rounded-xl p-3">
                  <div className="w-7 h-7 rounded-lg bg-[#1F2937] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-violet-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-white leading-snug">{agency.name}</p>
                    <p className="text-[11px] text-[#6B7280] mt-0.5 leading-snug">{agency.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 2. Required Permits ── */}
          <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
            <SectionHeader icon={FileText} title="Required Permits" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-0">
              {detail.requiredPermits.map((permit, i) => (
                <div key={i} className="flex items-start gap-2.5 py-2 border-b border-[#1F2937]/60 last:border-0">
                  <div className="w-5 h-5 rounded-md bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="w-3 h-3 text-violet-400" />
                  </div>
                  <span className="text-[12px] text-[#D1D5DB] leading-snug">{permit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 3. Approval Process ── */}
          <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <SectionHeader icon={Clock} title="Approval Process" />
              <span className="text-[11px] text-[#6B7280]">
                Est. total: <span className={`font-semibold ${approvalTimeColor}`}>{site.regulatory.estApprovalTime}</span>
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-[15px] top-6 bottom-6 w-[2px] bg-[#1F2937]" />
              <div className="flex flex-col gap-0">
                {detail.approvalProcess.map((item, i) => (
                  <div key={i} className="relative flex gap-4 pb-5 last:pb-0">
                    <div className="relative z-10 w-8 flex-shrink-0 flex items-start justify-center pt-0.5">
                      <div className={`w-[30px] h-[30px] rounded-full border-2 flex items-center justify-center text-[11px] font-bold
                        ${i === 0 ? 'bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981]'
                        : i === detail.approvalProcess.length - 1 ? 'bg-violet-500/15 border-violet-500/40 text-violet-400'
                        : 'bg-[#1F2937] border-[#374151] text-[#6B7280]'}`}>
                        {i + 1}
                      </div>
                    </div>
                    <div className="flex-1 bg-[#111827] border border-[#1F2937] rounded-xl p-3.5 mb-0">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h4 className="text-[13px] font-semibold text-white leading-snug">{item.step}</h4>
                        <span className="flex-shrink-0 flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                          <Clock className="w-3 h-3" />
                          {item.typicalDuration}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#9CA3AF] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 4. Similar Projects ── */}
          <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
            <SectionHeader icon={BarChart3} title="Similar Projects — Approval Benchmarks" />
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[#1F2937]">
                  <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2 pr-3">Project</th>
                  <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2 pr-3">Location</th>
                  <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2">Approval Time</th>
                </tr>
              </thead>
              <tbody>
                {detail.similarProjects.map((proj, i) => (
                  <tr key={i} className="border-b border-[#1F2937]/50 last:border-0">
                    <td className="py-2.5 pr-3 text-white font-medium leading-snug">{proj.name}</td>
                    <td className="py-2.5 pr-3 text-[#9CA3AF]">{proj.location}</td>
                    <td className="py-2.5"><span className="font-semibold text-amber-400">{proj.approvalTime}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── 5. AI Advice ── */}
          <AICallout text={detail.aiAdvice} />
        </>
      )}
    </div>
  );
}

/* ─── Forecast tab ────────────────────────────────────────── */
function ScoreTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-[11px] text-[#6B7280] mb-0.5">{label}</p>
      <p className="text-[15px] font-bold text-[#10B981]">{payload[0].value}</p>
      <p className="text-[10px] text-[#4B5563]">overall score</p>
    </div>
  );
}

function ForecastTab({ site }: { site: Site }) {
  const detail = site.forecastDetail;

  if (!detail) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-[#4B5563] text-sm">Forecast data not available for this site.</p>
      </div>
    );
  }

  const currentScore = detail.scoreProjection[0]?.score ?? site.overallScore;
  const finalScore = detail.scoreProjection[detail.scoreProjection.length - 1]?.score ?? site.overallScore;
  const delta = finalScore - currentScore;
  const domainMin = Math.max(0, Math.min(...detail.scoreProjection.map(p => p.score)) - 8);
  const domainMax = Math.min(100, Math.max(...detail.scoreProjection.map(p => p.score)) + 8);

  const sortedInvestments = [...detail.infrastructureInvestments].sort((a, b) => a.year - b.year);

  return (
    <div className="flex flex-col gap-5">

      {/* ── 1. Score Projection ── */}
      <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <SectionHeader icon={TrendingUp} title="Score Projection" />
            <p className="text-[12px] text-[#6B7280] mt-1 ml-7">Projected overall site score through 2030</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Current score chip */}
            <div className="text-right">
              <p className="text-[10px] text-[#6B7280] mb-0.5">Current ({detail.scoreProjection[0]?.year ?? 2025})</p>
              <span className="text-[22px] font-bold text-white leading-none">{currentScore}</span>
            </div>
            {/* Arrow + projected */}
            <ArrowUpRight className={`w-5 h-5 flex-shrink-0 ${delta > 0 ? 'text-[#10B981]' : 'text-[#6B7280]'}`} />
            <div className="text-right">
              <p className="text-[10px] text-[#6B7280] mb-0.5">Projected (2030)</p>
              <span className={`text-[22px] font-bold leading-none ${delta > 0 ? 'text-[#10B981]' : 'text-[#9CA3AF]'}`}>
                {finalScore}
              </span>
            </div>
            {delta !== 0 && (
              <span className={`text-[12px] font-semibold px-2 py-1 rounded-full ${
                delta > 0 ? 'text-[#10B981] bg-[#10B981]/10' : 'text-[#9CA3AF] bg-[#1F2937]'
              }`}>
                {delta > 0 ? '+' : ''}{delta} pts
              </span>
            )}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={190}>
          <AreaChart data={detail.scoreProjection} margin={{ top: 8, right: 8, left: -28, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${site.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10B981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
            <XAxis
              dataKey="year"
              stroke="transparent"
              tick={{ fill: '#6B7280', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[domainMin, domainMax]}
              stroke="transparent"
              tick={{ fill: '#6B7280', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <RechartsTooltip content={<ScoreTooltip />} cursor={{ stroke: '#374151', strokeWidth: 1 }} />
            <ReferenceLine y={currentScore} stroke="#374151" strokeDasharray="4 3" />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#10B981"
              strokeWidth={2.5}
              fill={`url(#grad-${site.id})`}
              dot={{ fill: '#10B981', stroke: '#0D1424', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#10B981', stroke: '#0D1424', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── 2+3. Planned Desalination + TSE side-by-side ── */}
      <div className="grid grid-cols-2 gap-4">

        {/* Planned Desalination Plants */}
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-3">
          <SectionHeader icon={Waves} title="Planned Desalination Plants" />
          {detail.plannedDesalinationPlants.length === 0 ? (
            <p className="text-[12px] text-[#4B5563] pl-7">No desalination plants planned for this area.</p>
          ) : (
            <div className="flex flex-col gap-2.5 pl-1">
              {detail.plannedDesalinationPlants.map((plant, i) => (
                <div key={i} className="bg-[#111827] border border-[#1F2937] rounded-xl p-3 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[13px] font-semibold text-white leading-snug">{plant.name}</p>
                    <span className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 whitespace-nowrap">
                      Planned
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[12px]">
                    <span className="flex items-center gap-1 text-sky-400 font-medium">
                      <Droplets className="w-3 h-3" /> {plant.expectedCapacity}
                    </span>
                    <span className="text-[#4B5563]">·</span>
                    <span className="flex items-center gap-1 text-[#6B7280]">
                      <CalendarDays className="w-3 h-3" /> {plant.expectedYear}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Planned TSE Expansions */}
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4 flex flex-col gap-3">
          <SectionHeader icon={Network} title="Planned TSE Expansions" />
          {detail.plannedTSEExpansions.length === 0 ? (
            <p className="text-[12px] text-[#4B5563] pl-7">No TSE expansions planned for this area.</p>
          ) : (
            <div className="flex flex-col gap-2.5 pl-1">
              {detail.plannedTSEExpansions.map((exp, i) => (
                <div key={i} className="bg-[#111827] border border-[#1F2937] rounded-xl p-3 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[13px] font-semibold text-white leading-snug">{exp.name}</p>
                    <span className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 whitespace-nowrap">
                      Planned
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[12px]">
                    <span className="flex items-center gap-1 text-[#10B981] font-medium">
                      <Droplet className="w-3 h-3" /> {exp.expectedCapacity}
                    </span>
                    <span className="text-[#4B5563]">·</span>
                    <span className="flex items-center gap-1 text-[#6B7280]">
                      <CalendarDays className="w-3 h-3" /> {exp.expectedYear}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── 4. Infrastructure Investments timeline ── */}
      <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
        <SectionHeader icon={BarChart3} title="Infrastructure Investments" />
        <div className="relative mt-4 pl-1">
          {/* connecting line */}
          <div className="absolute left-[15px] top-3 bottom-3 w-[2px] bg-[#1F2937]" />
          <div className="flex flex-col gap-0">
            {sortedInvestments.map((inv, i) => (
              <div key={i} className="relative flex gap-4 pb-4 last:pb-0">
                {/* Year dot */}
                <div className="relative z-10 flex-shrink-0 flex flex-col items-center pt-0.5">
                  <div className="w-[30px] h-[30px] rounded-full bg-[#1F2937] border border-[#374151] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-amber-400">{inv.year}</span>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 flex items-center justify-between bg-[#111827] border border-[#1F2937] rounded-xl px-3.5 py-2.5 gap-3">
                  <p className="text-[13px] text-white leading-snug">{inv.name}</p>
                  <span className="flex-shrink-0 text-[12px] font-bold text-amber-400 whitespace-nowrap">{inv.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. AI Prediction ── */}
      <AICallout text={detail.aiPrediction} />
    </div>
  );
}

/* ─── Compare tab ─────────────────────────────────────────── */
type ComplexityLevel = 'Low' | 'Medium' | 'High';
type PowerLevel = 'High' | 'Medium' | 'Low';

function coolingCompat(powerAvailability: string): string {
  if (powerAvailability === 'High')   return 'All types';
  if (powerAvailability === 'Medium') return 'Air / Liquid / DLC';
  return 'Air only';
}

// Returns the indices of sites with the "best" value for a given row.
function bestIndices(values: (number | string)[], higherIsBetter: boolean, isComplexity: boolean): number[] {
  if (isComplexity) {
    const order: ComplexityLevel[] = ['Low', 'Medium', 'High'];
    const best = Math.min(...values.map(v => order.indexOf(v as ComplexityLevel)));
    return values.map((v, i) => order.indexOf(v as ComplexityLevel) === best ? i : -1).filter(i => i !== -1);
  }
  if (typeof values[0] === 'string') {
    // power level or cooling: build ordinal
    const powerOrder: PowerLevel[] = ['High', 'Medium', 'Low'];
    const coolingOrder = ['All types', 'Air / Liquid / DLC', 'Air only'];
    const order = powerOrder.includes(values[0] as PowerLevel) ? powerOrder : coolingOrder;
    const best = Math.min(...values.map(v => order.indexOf(v as string)));
    return values.map((v, i) => order.indexOf(v as string) === best ? i : -1).filter(i => i !== -1);
  }
  const nums = values as number[];
  const extremum = higherIsBetter ? Math.max(...nums) : Math.min(...nums);
  return nums.map((v, i) => v === extremum ? i : -1).filter(i => i !== -1);
}

interface CompareRow {
  label: string;
  getValue: (s: Site) => number | string;
  higherIsBetter: boolean;
  isComplexity?: boolean;
  format?: (v: number | string) => string;
}

const COMPARE_ROWS: CompareRow[] = [
  {
    label: 'Water Score',
    getValue: s => s.waterAccess.score,
    higherIsBetter: true,
    format: v => `${v} / 100`,
  },
  {
    label: 'Infrastructure Score',
    getValue: s => s.infrastructure.score,
    higherIsBetter: true,
    format: v => `${v} / 100`,
  },
  {
    label: 'Regulatory Complexity',
    getValue: s => s.regulatory.complexityLevel,
    higherIsBetter: false,
    isComplexity: true,
  },
  {
    label: 'Future Score (2030)',
    getValue: s => {
      const proj = (s as any).forecastDetail?.scoreProjection;
      return proj ? proj[proj.length - 1].score : s.overallScore;
    },
    higherIsBetter: true,
    format: v => `${v} / 100`,
  },
  {
    label: 'Power Availability',
    getValue: s => s.infrastructure.powerAvailability,
    higherIsBetter: true,
  },
  {
    label: 'Cooling Compatibility',
    getValue: s => coolingCompat(s.infrastructure.powerAvailability),
    higherIsBetter: true,
  },
];

function CompareTab({ site, externalCompareIds }: { site: Site; externalCompareIds?: string[] }) {
  const [comparedIds, setComparedIds] = useState<string[]>(() =>
    (externalCompareIds ?? []).filter(id => id !== site.id).slice(0, 2)
  );
  const [selectorOpen, setSelectorOpen] = useState(false);

  // Sync when the external list changes (from "Add to Compare" header button)
  React.useEffect(() => {
    const incoming = (externalCompareIds ?? []).filter(id => id !== site.id).slice(0, 2);
    setComparedIds(incoming);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(externalCompareIds ?? []).join(','), site.id]);
  const allSites = getSitesSortedByScore() as Site[];

  const comparedSites = comparedIds.map(id => getSiteById(id) as Site).filter(Boolean);
  const columns: Site[] = [site, ...comparedSites];
  const availableToAdd = allSites.filter(s => s.id !== site.id && !comparedIds.includes(s.id));
  const canAddMore = comparedIds.length < 2;

  function addSite(id: string) {
    if (canAddMore) setComparedIds(prev => [...prev, id]);
    setSelectorOpen(false);
  }
  function removeSite(id: string) {
    setComparedIds(prev => prev.filter(x => x !== id));
  }

  // cell appearance helpers
  function complexityStyle(val: string) {
    if (val === 'Low')    return { text: 'text-[#10B981]', bg: 'bg-[#10B981]/10', border: 'border-[#10B981]/30' };
    if (val === 'Medium') return { text: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30' };
    return                       { text: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/30' };
  }
  function powerStyle(val: string) {
    if (val === 'High')   return 'text-[#10B981]';
    if (val === 'Medium') return 'text-amber-400';
    return 'text-red-400';
  }

  return (
    <div className="flex flex-col gap-4">

      {/* ── Add site selector ── */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => canAddMore && setSelectorOpen(o => !o)}
            disabled={!canAddMore}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-[13px] font-medium transition-colors ${
              canAddMore
                ? 'bg-[#0D1424] border-[#1F2937] text-[#9CA3AF] hover:border-[#374151] hover:text-[#D1D5DB] cursor-pointer'
                : 'bg-[#0D1424] border-[#1F2937] text-[#374151] cursor-not-allowed'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            {canAddMore ? 'Add site to compare' : 'Max 2 sites added'}
            {canAddMore && <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${selectorOpen ? 'rotate-180' : ''}`} />}
          </button>

          {selectorOpen && (
            <div className="absolute top-full left-0 mt-1 z-30 bg-[#111827] border border-[#1F2937] rounded-xl shadow-2xl w-72 overflow-hidden">
              {availableToAdd.length === 0 ? (
                <p className="text-[12px] text-[#4B5563] px-4 py-3">All other sites already added.</p>
              ) : (
                <div className="max-h-56 overflow-y-auto">
                  {availableToAdd.map(s => (
                    <button
                      key={s.id}
                      onClick={() => addSite(s.id)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-[#1F2937] transition-colors border-b border-[#1F2937]/50 last:border-0"
                    >
                      <div>
                        <p className="text-[13px] font-medium text-white">{s.name}</p>
                        <p className="text-[11px] text-[#6B7280]">{s.region} · Score {s.overallScore}</p>
                      </div>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${scoreColors(s.overallScore).bg} ${scoreColors(s.overallScore).text} ${scoreColors(s.overallScore).border} border`}>
                        {s.overallScore}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* chips of currently compared sites */}
        {comparedSites.map(s => (
          <div key={s.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D1424] border border-[#1F2937] rounded-xl">
            <span className="text-[12px] text-[#9CA3AF] font-medium truncate max-w-[120px]">{s.name}</span>
            <button onClick={() => removeSite(s.id)} className="text-[#4B5563] hover:text-[#9CA3AF] transition-colors flex-shrink-0">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {/* dismiss dropdown on outside click */}
        {selectorOpen && (
          <div className="fixed inset-0 z-20" onClick={() => setSelectorOpen(false)} />
        )}
      </div>

      {/* ── Comparison table ── */}
      {columns.length === 1 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 bg-[#0D1424] border border-[#1F2937] rounded-xl">
          <p className="text-[#4B5563] text-sm">Add at least one site above to start comparing.</p>
        </div>
      ) : (
        <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#1F2937]">
                <th className="text-left text-[11px] font-medium text-[#6B7280] px-4 py-3 w-[160px]">Metric</th>
                {columns.map((col, ci) => (
                  <th key={col.id} className="px-4 py-3 text-left">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`text-[12px] font-semibold leading-snug ${ci === 0 ? 'text-[#10B981]' : 'text-white'}`}>
                          {col.name}
                          {ci === 0 && <span className="ml-1.5 text-[10px] font-medium text-[#6B7280]">(current)</span>}
                        </p>
                        <p className="text-[10px] text-[#6B7280] mt-0.5">{col.region} · {col.overallScore} pts</p>
                      </div>
                      {ci > 0 && (
                        <button
                          onClick={() => removeSite(col.id)}
                          className="text-[#374151] hover:text-[#9CA3AF] transition-colors flex-shrink-0 mt-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, ri) => {
                const values = columns.map(c => row.getValue(c));
                const winners = bestIndices(values, row.higherIsBetter, !!row.isComplexity);
                return (
                  <tr key={ri} className={`border-b border-[#1F2937]/50 last:border-0 ${ri % 2 === 0 ? '' : 'bg-[#111827]/40'}`}>
                    <td className="px-4 py-3 text-[12px] font-medium text-[#9CA3AF] whitespace-nowrap">
                      {row.label}
                    </td>
                    {columns.map((col, ci) => {
                      const val = values[ci];
                      const isWinner = winners.includes(ci);
                      const display = row.format ? row.format(val) : String(val);

                      /* Complexity badge */
                      if (row.isComplexity) {
                        const cs = complexityStyle(val as string);
                        return (
                          <td key={col.id} className={`px-4 py-3 ${isWinner ? 'bg-[#10B981]/5' : ''}`}>
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${cs.text} ${cs.bg} ${cs.border}`}>
                                {val}
                              </span>
                              {isWinner && <CheckCircle className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />}
                            </div>
                          </td>
                        );
                      }

                      /* Power / cooling text */
                      if (typeof val === 'string') {
                        return (
                          <td key={col.id} className={`px-4 py-3 ${isWinner ? 'bg-[#10B981]/5' : ''}`}>
                            <div className="flex items-center gap-2">
                              <span className={powerStyle(val as string)}>{display}</span>
                              {isWinner && <CheckCircle className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />}
                            </div>
                          </td>
                        );
                      }

                      /* Numeric score */
                      return (
                        <td key={col.id} className={`px-4 py-3 ${isWinner ? 'bg-[#10B981]/5' : ''}`}>
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${isWinner ? 'text-[#10B981]' : 'text-[#D1D5DB]'}`}>
                              {display}
                            </span>
                            {isWinner && <CheckCircle className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─── Documents tab ───────────────────────────────────────── */
const DOC_TYPE_ICONS: Record<string, React.ElementType> = {
  'National Strategy':            Shield,
  'Government Report':            FileBarChart2,
  'Technical Study':              BarChart3,
  'Environmental Assessment':     Thermometer,
  'Infrastructure Announcement':  Building2,
  'Regulatory Notice':            FileText,
};
const DOC_TYPE_COLORS: Record<string, string> = {
  'National Strategy':            'text-violet-400  bg-violet-500/10  border-violet-500/20',
  'Government Report':            'text-sky-400     bg-sky-500/10     border-sky-500/20',
  'Technical Study':              'text-amber-400   bg-amber-500/10   border-amber-500/20',
  'Environmental Assessment':     'text-[#10B981]   bg-[#10B981]/10   border-[#10B981]/20',
  'Infrastructure Announcement':  'text-rose-400    bg-rose-500/10    border-rose-500/20',
  'Regulatory Notice':            'text-orange-400  bg-orange-500/10  border-orange-500/20',
};

function DocumentsTab({ site, onNavigateToChat }: { site: Site; onNavigateToChat?: (prefill: string) => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const docs = getDocumentsForSite(site.id);

  if (docs.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-[#4B5563] text-sm">No documents on file for this site.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[12px] text-[#6B7280]">
        {docs.length} documents related to <span className="text-[#D1D5DB] font-medium">{site.name}</span>
      </p>

      {docs.map((doc) => {
        const IconComp = DOC_TYPE_ICONS[doc.type] ?? FileText;
        const colorClass = DOC_TYPE_COLORS[doc.type] ?? 'text-[#6B7280] bg-[#1F2937] border-[#374151]';
        const isExpanded = expandedId === doc.id;

        return (
          <div
            key={doc.id}
            className="bg-[#0D1424] border border-[#1F2937] rounded-xl overflow-hidden transition-all"
          >
            {/* Card header */}
            <div className="p-4 flex items-start gap-3">
              {/* Type icon */}
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 ${colorClass}`}>
                <IconComp className="w-4 h-4" />
              </div>

              {/* Name + meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[14px] font-semibold text-white leading-snug">{doc.name}</p>
                  <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colorClass}`}>
                      {doc.type}
                    </span>
                    <span className="text-[10px] text-[#4B5563] font-medium">{doc.year}</span>
                  </div>
                </div>
                <p className="text-[12px] text-[#9CA3AF] mt-1 leading-relaxed">{doc.summary}</p>

                {/* Expanded summary */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#1F2937]">
                    <p className="text-[12px] text-[#D1D5DB] leading-relaxed">{doc.expandedSummary}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action row */}
            <div className="px-4 pb-3 flex items-center gap-2">
              <button
                onClick={() => setExpandedId(isExpanded ? null : doc.id)}
                className="flex items-center gap-1.5 text-[12px] font-medium text-[#6B7280] hover:text-[#D1D5DB] transition-colors"
              >
                {isExpanded
                  ? <><ChevronUp className="w-3.5 h-3.5" /> Hide Summary</>
                  : <><ChevronDown className="w-3.5 h-3.5" /> Read Summary</>
                }
              </button>

              <span className="text-[#1F2937]">·</span>

              <button className="flex items-center gap-1.5 text-[12px] font-medium text-[#6B7280] hover:text-[#D1D5DB] transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                Open PDF
              </button>

              {onNavigateToChat && (
                <>
                  <span className="text-[#1F2937]">·</span>
                  <button
                    onClick={() => onNavigateToChat(`Tell me more about "${doc.name}" and its implications for ${site.name}`)}
                    className="flex items-center gap-1.5 text-[12px] font-medium text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Ask AI
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
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

/* ─── Report helpers ──────────────────────────────────────── */
function ReportSection({ title, icon: Icon, iconColor = 'text-[#10B981]', children }: {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[#1F2937] rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3.5 bg-[#0D1424] border-b border-[#1F2937]">
        <div className="w-7 h-7 rounded-lg bg-[#1F2937] flex items-center justify-center flex-shrink-0">
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <span className="text-[14px] font-semibold text-white">{title}</span>
      </div>
      <div className="p-5 bg-[#111827]">{children}</div>
    </div>
  );
}

function ReportStatGrid({ items }: { items: { label: string; value: React.ReactNode; highlight?: string }[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      {items.map((item, i) => (
        <div key={i} className="bg-[#0D1424] border border-[#1F2937] rounded-lg p-3">
          <p className="text-[11px] text-[#6B7280] mb-1">{item.label}</p>
          <p className={`text-[15px] font-bold leading-snug ${item.highlight ?? 'text-white'}`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function ReportDetailRows({ rows }: { rows: { label: string; value: React.ReactNode }[] }) {
  return (
    <div className="flex flex-col gap-2">
      {rows.map((row, i) => (
        <div key={i} className="flex items-start justify-between gap-4 text-[13px]">
          <span className="text-[#6B7280] flex-shrink-0 whitespace-nowrap">{row.label}</span>
          <span className="text-[#D1D5DB] text-right leading-snug">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Full Report Modal ────────────────────────────────────── */
/* ── narrative helper ───────────────────────────────────────── */
function generateReportNarrative(site: Site): string {
  const w  = site.water;
  const pw = site.power;
  const cl = site.climate;
  const co = site.connectivity;
  const la = site.land;
  const z  = site.zoning;

  const dims: { name: string; score: number }[] = [];
  if (w)  dims.push({ name: 'water access',         score: w.summary.availabilityScore });
  if (pw) dims.push({ name: 'power capacity',        score: pw.summary.availableCapacityMW >= 100 ? 85 : pw.summary.availableCapacityMW >= 50 ? 70 : 50 });
  if (cl) {
    const pue = parseFloat(cl.summary.estimatedPUEImpact);
    dims.push({ name: 'climate conditions',          score: isNaN(pue) ? 65 : pue <= 1.2 ? 85 : pue <= 1.4 ? 70 : pue <= 1.6 ? 55 : 40 });
  }
  if (co) dims.push({ name: 'connectivity',          score: co.summary.fiberProviders >= 2 ? 85 : co.summary.fiberProviders === 1 ? 65 : 40 });
  if (la) dims.push({ name: 'land & topography',     score: la.summary.floodRisk === 'Low' ? 85 : la.summary.floodRisk === 'High' ? 40 : 65 });
  if (z)  dims.push({ name: 'regulatory environment', score: z.summary.dataCenterPermitted === 'Yes' ? (z.detail.easeOfPermits === 'Easy' ? 85 : 70) : 50 });

  if (dims.length === 0) return `${site.name} is a candidate site under evaluation. Detailed dimension data is still being collected.`;

  const sorted  = [...dims].sort((a, b) => b.score - a.score);
  const top2    = sorted.slice(0, 2).map(d => d.name);
  const bottom  = sorted[sorted.length - 1];
  const strengthStr = top2.length >= 2 ? `${top2[0]} and ${top2[1]}` : top2[0];
  const overallWord = site.overallScore >= 85 ? 'exceptional' : site.overallScore >= 75 ? 'strong' : site.overallScore >= 60 ? 'solid' : 'moderate';

  let caveat = '';
  if (bottom.score < 60)      caveat = ` However, ${bottom.name} presents the most notable constraint and warrants further due diligence.`;
  else if (bottom.score < 75) caveat = ` ${bottom.name.charAt(0).toUpperCase() + bottom.name.slice(1)} is rated moderate and may benefit from targeted mitigation planning.`;
  else                         caveat = ` All evaluated dimensions meet or exceed baseline requirements for large-scale data center deployment.`;

  const sezNote = z?.summary.sezStatus && !['N/A', 'None', 'No', ''].includes(z.summary.sezStatus)
    ? ` The site also benefits from ${z.summary.sezStatus} status, potentially reducing development timeline and fiscal burden.`
    : '';

  return `${site.name} achieves an ${overallWord} overall score of ${site.overallScore}/100, with particular strength in ${strengthStr}.${caveat}${sezNote}`;
}

function FullReportModal({ site, onClose }: { site: Site; onClose: () => void }) {
  const sc = scoreColors(site.overallScore);
  const w = site.water;
  const pw = site.power;
  const cl = site.climate;
  const co = site.connectivity;
  const la = site.land;
  const z = site.zoning;
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const waterScore = w?.summary.availabilityScore ?? site.waterAccess?.score ?? 0;
  const infraScore = site.infrastructure?.score ?? 0;
  const regScore   = site.regulatory?.score   ?? 0;

  const relColor = (r: string) =>
    r === 'High' ? 'text-[#10B981]' : r === 'Low' ? 'text-red-400' : 'text-amber-400';
  const permitColor = (v: string) =>
    v === 'Yes' ? 'text-[#10B981]' : v === 'No' ? 'text-red-400' : 'text-amber-400';
  const easeColor = (v: string) =>
    v === 'Easy' ? 'text-[#10B981]' : v === 'Difficult' ? 'text-red-400' : 'text-amber-400';

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* modal — solid background so nothing bleeds through */}
      <div className="relative z-10 w-full max-w-[880px] mx-4 max-h-[92vh] flex flex-col bg-[#0B1220] border border-[#1F2937] rounded-2xl shadow-2xl overflow-hidden" style={{ isolation: 'isolate' }}>

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F2937] bg-[#0D1424] flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center flex-shrink-0">
              <FileBarChart2 className="w-[18px] h-[18px] text-[#10B981]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#6B7280] uppercase tracking-widest font-semibold">Site Intelligence Report</p>
              <h2 className="text-[16px] font-bold text-white leading-tight truncate">{site.name}</h2>
            </div>
            <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full border flex-shrink-0 ${sc.bg} ${sc.text} ${sc.border}`}>
              <span className="text-[17px] font-bold">{site.overallScore}</span>
              {site.rating}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 border border-[#1F2937] bg-transparent text-[#9CA3AF] hover:text-white hover:border-[#374151] rounded-md px-3.5 py-2 text-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 border border-[#374151] bg-[#1F2937] text-[#D1D5DB] hover:bg-[#374151] rounded-md px-3.5 py-2 text-sm transition-colors"
            >
              <X className="w-4 h-4" />
              Close
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">

          {/* Site meta row */}
          <div className="flex items-center justify-between text-[13px] text-[#6B7280] pb-4 border-b border-[#1F2937]">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#10B981]" />{site.region} Region
              </span>
              {site.distanceFromRiyadh && (
                <span>{site.distanceFromRiyadh} km from Riyadh</span>
              )}
            </div>
            <span>Generated {today}</span>
          </div>

          {/* ── Executive Summary ── */}
          <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-5">
            <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest mb-4">Executive Summary</p>
            <div className="flex items-start gap-6 mb-4">
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <CircleGauge score={site.overallScore} size={96} />
                <span className={`text-[12px] font-semibold ${sc.text}`}>Overall Score</span>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {waterScore > 0 && (
                  <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-3">
                    <p className="text-[11px] text-[#6B7280] mb-1">Water Access</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[22px] font-bold text-sky-400">{waterScore}</span>
                      <span className="text-[11px] text-[#6B7280]">/ 100</span>
                    </div>
                  </div>
                )}
                {infraScore > 0 && (
                  <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-3">
                    <p className="text-[11px] text-[#6B7280] mb-1">Infrastructure</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[22px] font-bold text-amber-400">{infraScore}</span>
                      <span className="text-[11px] text-[#6B7280]">/ 100</span>
                    </div>
                  </div>
                )}
                {regScore > 0 && (
                  <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-3">
                    <p className="text-[11px] text-[#6B7280] mb-1">Regulatory</p>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-[22px] font-bold ${regScore >= 70 ? 'text-[#10B981]' : regScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>{regScore}</span>
                      <span className="text-[11px] text-[#6B7280]">/ 100</span>
                    </div>
                  </div>
                )}
                {pw && (
                  <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-3">
                    <p className="text-[11px] text-[#6B7280] mb-1">Power Capacity</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[22px] font-bold text-amber-300">{pw.summary.availableCapacityMW}</span>
                      <span className="text-[11px] text-[#6B7280]">MW</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* AI-style narrative */}
            <p className="text-[13.5px] leading-relaxed text-[#9CA3AF] border-t border-[#1F2937] pt-4">
              {generateReportNarrative(site)}
            </p>
          </div>

          {/* ── Water ── */}
          {w && (
            <ReportSection title="Water Access" icon={Droplets} iconColor="text-sky-400">
              <ReportStatGrid items={[
                { label: 'Availability Score', value: w.summary.availabilityScore, highlight: scoreColors(w.summary.availabilityScore).text },
                { label: 'Distance to Supply', value: w.summary.distanceToInfrastructure },
                { label: 'Reliability',        value: w.summary.reliability, highlight: relColor(w.summary.reliability) },
              ]} />
              <ReportDetailRows rows={[
                { label: 'Water cost',    value: w.detail.cost },
                { label: 'Source',        value: w.detail.sustainability },
                { label: 'Drought risk',  value: <span className={riskColors(w.detail.droughtRisk as 'Low'|'Medium'|'High').text}>{w.detail.droughtRisk}</span> },
              ]} />
              {site.coolingImpact && (
                <div className="mt-4 pt-4 border-t border-[#1F2937]">
                  <p className="text-[12px] font-semibold text-[#6B7280] mb-2.5">Cooling Water Demand (additional m³/day)</p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                    {[
                      { label: 'Air Cooling',       value: site.coolingImpact.airCooling },
                      { label: 'Liquid Cooling',     value: site.coolingImpact.liquidCooling },
                      { label: 'Immersion Cooling',  value: site.coolingImpact.immersionCooling },
                      { label: 'Direct Liquid (DLC)',value: site.coolingImpact.dlcCooling },
                    ].map((c, i) => (
                      <div key={i} className="flex justify-between text-[13px]">
                        <span className="text-[#6B7280]">{c.label}</span>
                        <span className="text-[#D1D5DB] font-medium">{c.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ReportSection>
          )}

          {/* ── Power ── */}
          {pw && (
            <ReportSection title="Power" icon={Zap} iconColor="text-amber-400">
              <ReportStatGrid items={[
                { label: 'Distance to Substation', value: pw.summary.distanceToSubstation },
                { label: 'Available Capacity',     value: `${pw.summary.availableCapacityMW} MW`, highlight: 'text-amber-300' },
                { label: 'Grid Reliability',       value: pw.summary.reliability, highlight: relColor(pw.summary.reliability) },
              ]} />
              <ReportDetailRows rows={[
                { label: 'Outage history',       value: pw.detail.outageHistory },
                { label: 'Electricity price',    value: pw.detail.electricityPrice },
                { label: 'Renewable options',    value: pw.detail.renewableAvailability },
                { label: 'Expansion potential',  value: pw.detail.expansionPotential },
              ]} />
            </ReportSection>
          )}

          {/* ── Climate ── */}
          {cl && (
            <ReportSection title="Climate / Cooling Efficiency" icon={Thermometer} iconColor="text-rose-400">
              <ReportStatGrid items={[
                { label: 'Avg. Yearly Temp', value: cl.summary.avgYearlyTemp },
                { label: 'Peak Summer',      value: cl.summary.peakSummerTemp, highlight: 'text-rose-400' },
                { label: 'PUE Penalty',      value: cl.summary.estimatedPUEImpact.split(' ')[0], highlight: 'text-amber-400' },
              ]} />
              <ReportDetailRows rows={[
                { label: 'Humidity',           value: cl.detail.humidity },
                { label: 'Extreme heat days',  value: `${cl.detail.extremeHeatDays} days/year above 40°C` },
                { label: 'Full PUE impact',    value: cl.summary.estimatedPUEImpact },
              ]} />
            </ReportSection>
          )}

          {/* ── Connectivity ── */}
          {co && (
            <ReportSection title="Connectivity" icon={Network} iconColor="text-violet-400">
              <ReportStatGrid items={[
                { label: 'Distance to Backbone', value: co.summary.distanceToBackbone },
                {
                  label: 'Fiber Providers',
                  value: co.summary.fiberProviders === 0 ? 'None' : `${co.summary.fiberProviders} carrier${co.summary.fiberProviders > 1 ? 's' : ''}`,
                  highlight: co.summary.fiberProviders >= 2 ? 'text-[#10B981]' : co.summary.fiberProviders === 1 ? 'text-amber-400' : 'text-red-400',
                },
                { label: 'Redundancy', value: co.summary.redundancy, highlight: co.summary.redundancy === 'Yes' ? 'text-[#10B981]' : co.summary.redundancy === 'No' ? 'text-red-400' : 'text-amber-400' },
              ]} />
              <ReportDetailRows rows={[
                { label: 'Latency to cities',         value: co.detail.latencyToMajorCities },
                { label: 'Internet exchange proximity', value: co.detail.proximityToIX },
              ]} />
            </ReportSection>
          )}

          {/* ── Land ── */}
          {la && (
            <ReportSection title="Land / Topography" icon={MapPin} iconColor="text-emerald-400">
              <ReportStatGrid items={[
                { label: 'Land Price',       value: la.summary.landPrice },
                { label: 'Available Parcel', value: la.summary.parcelSize, highlight: 'text-[#10B981]' },
                { label: 'Flood Risk',       value: la.summary.floodRisk, highlight: la.summary.floodRisk === 'Low' ? 'text-[#10B981]' : la.summary.floodRisk === 'High' ? 'text-red-400' : 'text-amber-400' },
              ]} />
              <ReportDetailRows rows={[
                { label: 'Flatness / slope',    value: la.detail.flatnessSlope },
                { label: 'Soil stability',      value: la.detail.soilStability },
                { label: 'Room for expansion',  value: la.detail.roomForExpansion },
                { label: 'Distance to roads',   value: la.detail.distanceToRoads },
              ]} />
            </ReportSection>
          )}

          {/* ── Zoning ── */}
          {z && (
            <ReportSection title="Zoning & Regulatory" icon={Shield} iconColor="text-indigo-400">
              <ReportStatGrid items={[
                { label: 'DC Permitted',     value: z.summary.dataCenterPermitted, highlight: permitColor(z.summary.dataCenterPermitted) },
                { label: 'Permitting Speed', value: z.summary.permittingSpeed,     highlight: 'text-amber-300' },
                { label: 'Ease of Permits',  value: z.detail.easeOfPermits,        highlight: easeColor(z.detail.easeOfPermits) },
              ]} />
              <ReportDetailRows rows={[
                { label: 'SEZ status',                  value: z.summary.sezStatus },
                { label: 'Tax incentives',              value: z.detail.taxIncentives },
                { label: 'Environmental restrictions',  value: z.detail.environmentalRestrictions },
                { label: 'Government support',          value: z.detail.governmentSupport },
              ]} />
            </ReportSection>
          )}

          {/* ── Site Location map ── */}
          {site.coordinates && (
            <ReportSection title="Site Location" icon={MapPin} iconColor="text-[#10B981]">
              <div className="rounded-lg overflow-hidden border border-[#1F2937]" style={{ height: 220, zIndex: 0 }}>
                <MapContainer
                  center={[site.coordinates.lat, site.coordinates.lng]}
                  zoom={8}
                  style={{ width: '100%', height: '100%' }}
                  zoomControl={false}
                  attributionControl={false}
                  dragging={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                  touchZoom={false}
                >
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                  <CircleMarker
                    center={[site.coordinates.lat, site.coordinates.lng]}
                    radius={10}
                    pathOptions={{ color: '#10B981', fillColor: '#10B981', fillOpacity: 0.9, weight: 2 }}
                  >
                    <Tooltip permanent direction="top" offset={[0, -12]} className="leaflet-report-tooltip">
                      <span style={{ fontSize: 11, fontWeight: 600 }}>{site.name}</span>
                    </Tooltip>
                  </CircleMarker>
                </MapContainer>
              </div>
            </ReportSection>
          )}

          {/* ── Nearby Infrastructure table ── */}
          {(site.nearbyInfrastructure ?? []).length > 0 && (
            <ReportSection title="Nearby Infrastructure" icon={Building2} iconColor="text-[#9CA3AF]">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[#1F2937]">
                    <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2 pr-4">Name</th>
                    <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2 pr-4">Type</th>
                    <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2 pr-4">Distance</th>
                    <th className="text-left text-[11px] font-medium text-[#6B7280] pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(site.nearbyInfrastructure ?? []).map((item, i) => (
                    <tr key={i} className="border-b border-[#1F2937]/50 last:border-0">
                      <td className="py-2.5 pr-4 text-white font-medium">{item.name}</td>
                      <td className="py-2.5 pr-4 text-[#9CA3AF]">{item.type}</td>
                      <td className="py-2.5 pr-4 text-[#9CA3AF]">{item.distance}</td>
                      <td className="py-2.5">
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusColor(item.status)}`}>{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ReportSection>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-[11px] text-[#4B5563] pt-2 border-t border-[#1F2937]">
            <span>WaterIntel — AI-Powered Water Intelligence Platform</span>
            <span>Confidential · For internal use only</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ─── main component ──────────────────────────────────────── */
export function SiteDetail({ site, onNavigateToChat, compareIds = [], onToggleCompare }: SiteDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [showReport,    setShowReport]    = useState(false);
  const [compareToast,  setCompareToast]  = useState<'added' | 'already' | null>(null);
  const sc = scoreColors(site.overallScore);

  const isInCompare = compareIds.includes(site.id);

  function handleAddToCompare() {
    if (isInCompare) {
      setCompareToast('already');
    } else {
      onToggleCompare?.(site.id);
      setCompareToast('added');
      setActiveTab('Compare');
    }
    setTimeout(() => setCompareToast(null), 2500);
  }

  return (
  <>
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
          <button
            onClick={handleAddToCompare}
            className={`flex items-center gap-1.5 border rounded-md px-3.5 py-2 text-sm transition-colors ${
              isInCompare
                ? 'border-[#10B981]/40 bg-[#10B981]/10 text-[#10B981]'
                : 'border-[#1F2937] bg-transparent text-[#D1D5DB] hover:bg-[#1F2937]/60'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            {isInCompare ? 'In Comparison' : 'Add to Compare'}
          </button>
          <button
            onClick={() => setShowReport(true)}
            className="flex items-center gap-1.5 bg-[#10B981] text-white hover:bg-[#059669] rounded-md px-3.5 py-2 text-sm font-medium transition-colors"
          >
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
        {activeTab === 'Overview'     && <OverviewTab site={site} setActiveTab={setActiveTab} />}
        {activeTab === 'Water'        && <WaterTab site={site} />}
        {activeTab === 'Power'        && <PowerTab site={site} />}
        {activeTab === 'Climate'      && <ClimateTab site={site} />}
        {activeTab === 'Connectivity' && <ConnectivityTab site={site} />}
        {activeTab === 'Land'         && <LandTab site={site} />}
        {activeTab === 'Zoning'       && <ZoningTab site={site} />}
        {activeTab === 'Forecast'     && <ForecastTab site={site} />}
        {activeTab === 'Documents'    && <DocumentsTab site={site} onNavigateToChat={onNavigateToChat} />}
        {activeTab === 'Compare'      && <CompareTab site={site} externalCompareIds={compareIds} />}
      </div>
    </div>

    {/* ── Compare toast ── */}
    {compareToast && (
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111827] border border-[#1F2937] rounded-xl px-4 py-3 shadow-2xl">
        {compareToast === 'added' ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
            <span className="text-[13px] text-white">
              Added to comparison —{' '}
              <button onClick={() => setActiveTab('Compare')} className="text-[#10B981] hover:underline font-medium">
                view Compare tab
              </button>
            </span>
          </>
        ) : (
          <>
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="text-[13px] text-white">Already in comparison</span>
          </>
        )}
      </div>
    )}

    {/* ── Full Report modal ── */}
    {showReport && <FullReportModal site={site} onClose={() => setShowReport(false)} />}
  </>
  );
}
