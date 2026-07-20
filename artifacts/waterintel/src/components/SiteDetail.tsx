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
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { waterInfrastructure } from '../data/waterInfrastructure';
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
}

interface SiteDetailProps {
  site: Site;
  onNavigateToChat?: (prefill: string) => void;
}

/* ─── helpers ─────────────────────────────────────────────── */
const TABS = [
  'Overview',
  'Water Access',
  'Infrastructure',
  'Regulatory',
  'Cooling Impact',
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

/* ─── Water Access tab ────────────────────────────────────── */
function WaterAccessTab({ site }: { site: Site }) {
  const detail = site.waterAccessDetail;

  // Fallback if data not yet present
  if (!detail) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-[#4B5563] text-sm">Water access detail not available for this site.</p>
      </div>
    );
  }

  const sc = scoreColors(detail.overallScore);
  const rc = riskColors(detail.riskLevel);

  // Cooling demand bars
  const coolingRows = [
    { label: 'Air Cooling', value: site.coolingImpact.airCooling },
    { label: 'Liquid Cooling', value: site.coolingImpact.liquidCooling },
    { label: 'Immersion Cooling', value: site.coolingImpact.immersionCooling },
  ];
  const maxCooling = Math.max(...coolingRows.map((c) => parseCoolingValue(c.value)));

  // Timeline max for bar scaling
  const maxTimelineScore = Math.max(...detail.availabilityTimeline.map((t) => t.score), 100);

  // Nearby water infra for mini map (within 150 km)
  const mapItems = waterInfrastructure.filter((wi) =>
    haversineKm(site.coordinates.lat, site.coordinates.lng, wi.coordinates.lat, wi.coordinates.lng) <= 150
  );

  return (
    <div className="flex flex-col gap-5">

      {/* ── 1. Overview row ── */}
      <div className="flex items-start gap-4">
        {/* Gauge */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <CircleGauge score={detail.overallScore} size={88} />
          <span className={`text-[11px] font-medium ${sc.text}`}>Water Score</span>
        </div>

        {/* Risk badge + AI callout */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${rc.bg} ${rc.text} ${rc.border}`}>
              {detail.riskLevel === 'Low' && <CheckCircle2 className="w-3.5 h-3.5" />}
              {detail.riskLevel === 'Medium' && <AlertCircle className="w-3.5 h-3.5" />}
              {detail.riskLevel === 'High' && <XCircle className="w-3.5 h-3.5" />}
              {detail.riskLevel} Risk
            </span>
            <span className="text-[#4B5563] text-[11px]">Water Risk Level</span>
          </div>

          {/* AI Recommendation callout */}
          <AICallout text={detail.aiRecommendation} />
        </div>
      </div>

      {/* ── 2. Nearby Water Sources ── */}
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
                  <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full ${statusColor(src.status)}`}>
                    {src.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── 3. Water Demand Analysis ── */}
      <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
        <SectionHeader icon={BarChart3} title="Water Demand by Cooling Technology" />
        <p className="text-[11px] text-[#6B7280] mb-3 -mt-1">Estimated additional daily usage at this site</p>
        <div className="flex flex-col gap-3">
          {coolingRows.map((c) => {
            const pct = maxCooling > 0 ? (parseCoolingValue(c.value) / maxCooling) * 100 : 0;
            const col = scoreColors(100 - pct); // invert: lower demand = greener
            return (
              <div key={c.label} className="flex items-center gap-3">
                <span className="text-[12px] text-[#9CA3AF] w-[120px] flex-shrink-0">{c.label}</span>
                <div className="flex-1 h-2 bg-[#1F2937] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: col.bar }}
                  />
                </div>
                <span className="text-[12px] font-medium text-white w-[90px] text-right">{c.value}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 4. Water Availability Timeline ── */}
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
                  <div
                    className="h-full rounded-md transition-all"
                    style={{ width: `${pct}%`, backgroundColor: c.bar, opacity: 0.8 }}
                  />
                </div>
                <span className={`text-[12px] font-bold w-8 text-right ${c.text}`}>{item.score}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 5. Supporting Documents ── */}
      <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
        <SectionHeader icon={FileText} title="Supporting Documents" />
        <div className="flex flex-col divide-y divide-[#1F2937]">
          {detail.supportingDocuments.map((doc, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center gap-3 py-2.5 hover:bg-[#1F2937]/40 rounded-lg px-1 -mx-1 transition-colors group"
            >
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

      {/* ── 6. Mini Water Infrastructure Map ── */}
      <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
        <SectionHeader icon={MapPin} title="Nearby Water Infrastructure" />
        <p className="text-[11px] text-[#6B7280] mb-3 -mt-1">TSE plants, pipelines & reservoirs within 150 km</p>

        {/* Legend */}
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
          <MapContainer
            center={[site.coordinates.lat, site.coordinates.lng]}
            zoom={7}
            style={{ width: '100%', height: '100%' }}
            zoomControl={true}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution=""
            />

            {/* Site marker — white */}
            <CircleMarker
              center={[site.coordinates.lat, site.coordinates.lng]}
              radius={8}
              pathOptions={{ color: '#FFFFFF', fillColor: '#FFFFFF', fillOpacity: 1, weight: 2 }}
            >
              <Tooltip permanent direction="top" offset={[0, -10]}>
                <span style={{ fontSize: 11, fontWeight: 600 }}>{site.name}</span>
              </Tooltip>
            </CircleMarker>

            {/* Water infrastructure markers */}
            {mapItems.map((wi) => (
              <CircleMarker
                key={wi.id}
                center={[wi.coordinates.lat, wi.coordinates.lng]}
                radius={6}
                pathOptions={{
                  color: wInfraColor(wi.type),
                  fillColor: wInfraColor(wi.type),
                  fillOpacity: 0.75,
                  weight: 1.5,
                }}
              >
                <Tooltip direction="top" offset={[0, -8]}>
                  <span style={{ fontSize: 11 }}>{wi.name}</span>
                  <br />
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

/* ─── Infrastructure tab ──────────────────────────────────── */
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

/* ─── Regulatory tab ──────────────────────────────────────── */
function RegulatoryTab({ site }: { site: Site }) {
  const detail = site.regulatoryDetail;

  if (!detail) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-[#4B5563] text-sm">Regulatory detail not available for this site.</p>
      </div>
    );
  }

  const complexityColor = site.regulatory.complexityLevel === 'Low'
    ? 'text-[#10B981]' : site.regulatory.complexityLevel === 'Medium'
    ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="flex flex-col gap-5">

      {/* ── 1. Required Agencies ── */}
      <div className="bg-[#0D1424] border border-[#1F2937] rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <SectionHeader icon={Building2} title="Required Agencies" />
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
            site.regulatory.complexityLevel === 'Low'
              ? 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30'
              : site.regulatory.complexityLevel === 'Medium'
              ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
              : 'text-red-400 bg-red-500/10 border-red-500/30'
          }`}>
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
            Est. total: <span className={`font-semibold ${complexityColor}`}>{site.regulatory.estApprovalTime}</span>
          </span>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* connecting line */}
          <div className="absolute left-[15px] top-6 bottom-6 w-[2px] bg-[#1F2937]" />

          <div className="flex flex-col gap-0">
            {detail.approvalProcess.map((item, i) => (
              <div key={i} className="relative flex gap-4 pb-5 last:pb-0">
                {/* Dot */}
                <div className="relative z-10 w-8 flex-shrink-0 flex items-start justify-center pt-0.5">
                  <div className={`w-[30px] h-[30px] rounded-full border-2 flex items-center justify-center text-[11px] font-bold
                    ${i === 0 ? 'bg-[#10B981]/15 border-[#10B981]/50 text-[#10B981]'
                    : i === detail.approvalProcess.length - 1 ? 'bg-violet-500/15 border-violet-500/40 text-violet-400'
                    : 'bg-[#1F2937] border-[#374151] text-[#6B7280]'}`}>
                    {i + 1}
                  </div>
                </div>

                {/* Content card */}
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
                <td className="py-2.5">
                  <span className="font-semibold text-amber-400">{proj.approvalTime}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── 5. AI Advice ── */}
      <AICallout text={detail.aiAdvice} />
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

/* ─── main component ──────────────────────────────────────── */
export function SiteDetail({ site, onNavigateToChat }: SiteDetailProps) {
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
        {activeTab === 'Water Access' && <WaterAccessTab site={site} />}
        {activeTab === 'Infrastructure' && <InfrastructureTab site={site} />}
        {activeTab === 'Regulatory' && <RegulatoryTab site={site} />}
        {activeTab === 'Cooling Impact' && <CoolingTab site={site} />}
        {activeTab === 'Forecast' && <ForecastTab site={site} />}
        {activeTab === 'Documents' && <DocumentsTab site={site} onNavigateToChat={onNavigateToChat} />}
        {activeTab !== 'Overview' && activeTab !== 'Water Access' && activeTab !== 'Infrastructure' && activeTab !== 'Regulatory' && activeTab !== 'Cooling Impact' && activeTab !== 'Forecast' && activeTab !== 'Documents' && <PlaceholderTab name={activeTab} />}
      </div>
    </div>
  );
}
