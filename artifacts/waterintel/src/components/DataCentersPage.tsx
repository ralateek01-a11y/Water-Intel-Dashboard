import React, { useState, useMemo } from 'react';
import { dataCenters } from '../data/dataCenters.js';
import { waterInfrastructure } from '../data/waterInfrastructure.js';
import {
  Search, ChevronUp, ChevronDown, ChevronsUpDown, X,
  Zap, Droplets, Thermometer, MapPin, ExternalLink, FileText,
  Activity, AlertCircle, Clock, TrendingUp
} from 'lucide-react';

type DC = (typeof dataCenters)[0];
type SortKey = 'name' | 'company' | 'status' | 'powerMW' | 'region';
type SortDir = 'asc' | 'desc';

// ── Status config ─────────────────────────────────────────────────────
const STATUS_CFG = {
  Operational:  { bg: 'bg-[#10B981]/15', text: 'text-[#10B981]', dot: '#10B981', Icon: Activity       },
  Construction: { bg: 'bg-amber-500/15', text: 'text-amber-400', dot: '#F59E0B', Icon: AlertCircle    },
  Planned:      { bg: 'bg-blue-500/15',  text: 'text-blue-400',  dot: '#3B82F6', Icon: Clock          },
};

// ── Helpers ───────────────────────────────────────────────────────────
function getWaterInfraName(id: string) {
  return waterInfrastructure.find((w) => w.id === id)?.name ?? id;
}

function modeOf(arr: string[]) {
  const counts: Record<string, number> = {};
  arr.forEach((v) => { counts[v] = (counts[v] ?? 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';
}

// ── Sort icon ─────────────────────────────────────────────────────────
function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ChevronsUpDown className="w-3 h-3 text-[#4B5563]" />;
  return sortDir === 'asc'
    ? <ChevronUp   className="w-3 h-3 text-[#10B981]" />
    : <ChevronDown className="w-3 h-3 text-[#10B981]" />;
}

// ── Main component ────────────────────────────────────────────────────
export function DataCentersPage() {
  const [search,   setSearch]   = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [sortKey,  setSortKey]  = useState<SortKey>('powerMW');
  const [sortDir,  setSortDir]  = useState<SortDir>('desc');
  const [selected, setSelected] = useState<DC | null>(null);

  // ── Summary stats ──
  const totalPower   = dataCenters.reduce((s, d) => s + d.powerMW, 0);
  const avgPower     = Math.round(totalPower / dataCenters.length);
  const topCooling   = modeOf(dataCenters.map((d) => d.coolingMethod));
  const opCount      = dataCenters.filter((d) => d.status === 'Operational').length;
  const conCount     = dataCenters.filter((d) => d.status === 'Construction').length;
  const planCount    = dataCenters.filter((d) => d.status === 'Planned').length;
  const regions      = [...new Set(dataCenters.map((d) => d.region))].sort();

  // ── Filtering + sorting ──
  const visible = useMemo(() => {
    let rows = dataCenters.filter((d) => {
      const q = search.toLowerCase();
      if (q && !d.name.toLowerCase().includes(q) && !d.company.toLowerCase().includes(q) && !d.region.toLowerCase().includes(q)) return false;
      if (statusFilter !== 'All' && d.status !== statusFilter) return false;
      if (regionFilter !== 'All' && d.region !== regionFilter) return false;
      return true;
    });
    rows = [...rows].sort((a, b) => {
      let av: string | number = a[sortKey];
      let bv: string | number = b[sortKey];
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return rows;
  }, [search, statusFilter, regionFilter, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  }

  const selectCls = "h-9 bg-[#0A0E17] border border-[#1F2937] hover:border-[#374151] text-[#D1D5DB] text-[13px] rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-colors";
  const thCls = (col: SortKey) =>
    `px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider cursor-pointer select-none group transition-colors ${
      sortKey === col ? 'text-[#10B981]' : 'text-[#6B7280] hover:text-[#9CA3AF]'
    }`;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* ── Header ── */}
      <div className="flex-shrink-0 px-6 pt-6 pb-4">
        <h1 className="text-white text-[20px] font-bold">Data Centers</h1>
        <p className="text-[#6B7280] text-[13px] mt-1">
          Benchmark your project against existing and planned data centers in Saudi Arabia.
        </p>
      </div>

      {/* ── Summary stats ── */}
      <div className="flex-shrink-0 px-6 pb-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Total tracked', value: String(dataCenters.length), sub: 'data centers', color: '#10B981', Icon: TrendingUp },
            { label: 'Avg power',     value: `${avgPower} MW`,           sub: 'per facility', color: '#F59E0B', Icon: Zap        },
            { label: 'Total capacity',value: `${totalPower} MW`,         sub: 'combined',     color: '#8B5CF6', Icon: Zap        },
            { label: 'Top cooling',   value: topCooling.split(' ')[0],   sub: topCooling.split(' ').slice(1).join(' ') || 'cooling', color: '#06B6D4', Icon: Thermometer },
            { label: 'Operational',   value: String(opCount),            sub: 'live now',     color: '#10B981', Icon: Activity   },
            { label: 'Pipeline',      value: `${conCount}C · ${planCount}P`, sub: 'construction · planned', color: '#3B82F6', Icon: Clock },
          ].map(({ label, value, sub, color, Icon }) => (
            <div key={label} className="bg-[#111827] border border-[#1F2937] rounded-xl px-4 py-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Icon className="w-3 h-3" style={{ color }} />
                <span className="text-[9px] font-semibold uppercase tracking-wider text-[#6B7280]">{label}</span>
              </div>
              <div className="text-white font-bold text-[15px] leading-none">{value}</div>
              <div className="text-[#4B5563] text-[10px] mt-0.5">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Table toolbar ── */}
      <div className="flex-shrink-0 px-6 pb-3 flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, or region…"
            className="w-full h-9 bg-[#0A0E17] border border-[#1F2937] hover:border-[#374151] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-white text-[13px] rounded-md pl-9 pr-3 placeholder-[#4B5563] focus:outline-none transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status filter */}
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectCls}>
          <option value="All">All Statuses</option>
          <option>Operational</option>
          <option>Construction</option>
          <option>Planned</option>
        </select>

        {/* Region filter */}
        <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} className={selectCls}>
          <option value="All">All Regions</option>
          {regions.map((r) => <option key={r}>{r}</option>)}
        </select>

        <span className="text-[#4B5563] text-[12px] ml-auto whitespace-nowrap">
          {visible.length} of {dataCenters.length} shown
        </span>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#1F2937] bg-[#0D1525]">
                {(
                  [
                    { key: 'name',    label: 'Data Center'   },
                    { key: 'company', label: 'Company'       },
                    { key: 'status',  label: 'Status'        },
                    { key: 'powerMW', label: 'Power (MW)'    },
                    { key: 'region',  label: 'Region'        },
                  ] as { key: SortKey; label: string }[]
                ).map(({ key, label }) => (
                  <th key={key} className={thCls(key)} onClick={() => handleSort(key)}>
                    <div className="flex items-center gap-1.5">
                      {label}
                      <SortIcon col={key} sortKey={sortKey} sortDir={sortDir} />
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
                  Water Demand
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-[#4B5563] text-[13px]">
                    No data centers match your filters.
                  </td>
                </tr>
              ) : (
                visible.map((dc, i) => {
                  const sc = STATUS_CFG[dc.status as keyof typeof STATUS_CFG];
                  const StatusIcon = sc.Icon;
                  return (
                    <tr
                      key={dc.id}
                      onClick={() => setSelected(dc)}
                      className={`border-b border-[#1F2937]/50 last:border-0 cursor-pointer transition-colors hover:bg-[#10B981]/5 ${
                        i % 2 === 0 ? '' : 'bg-white/[0.015]'
                      }`}
                    >
                      <td className="px-4 py-3.5">
                        <span className="text-white text-[13px] font-semibold">{dc.name}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-[#9CA3AF] text-[13px]">{dc.company}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                          <StatusIcon className="w-3 h-3" />
                          {dc.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#F59E0B]"
                              style={{ width: `${Math.min(100, (dc.powerMW / 250) * 100)}%` }}
                            />
                          </div>
                          <span className="text-[#D1D5DB] text-[13px] font-medium tabular-nums">{dc.powerMW}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 text-[12px] text-[#9CA3AF]">
                          <MapPin className="w-3 h-3 text-[#6B7280]" />
                          {dc.region}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 text-[12px] text-[#9CA3AF]">
                          <Droplets className="w-3 h-3 text-blue-400" />
                          {dc.estimatedWaterDemand}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Detail side panel ── */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 bg-[#0B1220] border-l border-[#1F2937] flex flex-col transition-all duration-300 ease-out shadow-2xl ${
          selected ? 'w-[400px] opacity-100' : 'w-0 opacity-0 overflow-hidden'
        }`}
      >
        {selected && (() => {
          const sc = STATUS_CFG[selected.status as keyof typeof STATUS_CFG];
          const StatusIcon = sc.Icon;
          return (
            <>
              {/* Panel header */}
              <div className="flex-shrink-0 px-5 pt-5 pb-4 border-b border-[#1F2937]">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <p className="text-[11px] text-[#6B7280] font-medium mb-0.5">{selected.company}</p>
                    <h2 className="text-white font-bold text-[15px] leading-snug">{selected.name}</h2>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-[#6B7280] hover:text-white transition-colors flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                  <StatusIcon className="w-3 h-3" />
                  {selected.status}
                </span>
              </div>

              {/* Panel body */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

                {/* Key metrics grid */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Power',         value: `${selected.powerMW} MW`,           icon: <Zap        className="w-3.5 h-3.5 text-[#F59E0B]" /> },
                    { label: 'Water Demand',  value: selected.estimatedWaterDemand,       icon: <Droplets   className="w-3.5 h-3.5 text-blue-400"  /> },
                    { label: 'Cooling Method',value: selected.coolingMethod,              icon: <Thermometer className="w-3.5 h-3.5 text-[#06B6D4]" /> },
                    { label: 'Region',        value: selected.region,                     icon: <MapPin     className="w-3.5 h-3.5 text-[#10B981]"  /> },
                  ].map(({ label, value, icon }) => (
                    <div key={label} className="bg-[#111827] border border-[#1F2937] rounded-lg px-3 py-2.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        {icon}
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-[#6B7280]">{label}</span>
                      </div>
                      <p className="text-white text-[12px] font-semibold leading-snug">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Nearby Water Infrastructure */}
                {selected.nearbyWaterInfrastructureIds.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                      Nearby Water Infrastructure
                    </p>
                    <div className="space-y-1.5">
                      {selected.nearbyWaterInfrastructureIds.map((id) => (
                        <div key={id} className="flex items-center gap-2 bg-[#111827] border border-[#1F2937] rounded-lg px-3 py-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] flex-shrink-0" />
                          <span className="text-[12px] text-[#D1D5DB]">{getWaterInfraName(id)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Supporting Articles */}
                {selected.supportingArticles.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                      Supporting Articles
                    </p>
                    <div className="space-y-1.5">
                      {selected.supportingArticles.map((article, i) => (
                        <a
                          key={i}
                          href={article.url}
                          onClick={(e) => e.preventDefault()}
                          className="flex items-start gap-3 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] hover:border-[#374151] rounded-lg px-3 py-2.5 transition-colors group"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#6B7280] group-hover:text-[#10B981] flex-shrink-0 mt-0.5 transition-colors" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] text-[#D1D5DB] group-hover:text-white leading-snug transition-colors line-clamp-2">
                              {article.title}
                            </p>
                            <p className="text-[10px] text-[#6B7280] mt-0.5">
                              {article.source} · {article.date}
                            </p>
                          </div>
                          <ExternalLink className="w-3 h-3 text-[#4B5563] group-hover:text-[#10B981] flex-shrink-0 mt-0.5 transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </>
          );
        })()}
      </div>

      {/* Backdrop */}
      {selected && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setSelected(null)}
        />
      )}
    </div>
  );
}
