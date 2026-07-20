import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { waterInfrastructure } from '../data/waterInfrastructure.js';
import {
  X, FileText, Droplets, Zap, Radio, Building2,
  ChevronRight, Activity, AlertCircle, Clock
} from 'lucide-react';

type InfraItem = (typeof waterInfrastructure)[0];
type InfraType = 'wastewater_treatment' | 'desalination' | 'pipeline' | 'reservoir' | 'planned';

// ── Type config ────────────────────────────────────────────────────────
const TYPE_CONFIG: Record<InfraType, { color: string; label: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
  wastewater_treatment: { color: '#10B981', label: 'TSE / Wastewater',  Icon: Droplets   },
  desalination:         { color: '#3B82F6', label: 'Desalination',       Icon: Zap        },
  pipeline:             { color: '#F97316', label: 'Pipeline',            Icon: Radio      },
  reservoir:            { color: '#8B5CF6', label: 'Reservoir',           Icon: Building2  },
  planned:              { color: '#6B7280', label: 'Planned / Future',    Icon: Clock      },
};

const STATUS_CONFIG = {
  'Operational':        { bg: 'bg-[#10B981]/15', text: 'text-[#10B981]', Icon: Activity       },
  'Under Construction': { bg: 'bg-amber-500/15', text: 'text-amber-400', Icon: AlertCircle    },
  'Planned':            { bg: 'bg-[#6B7280]/15', text: 'text-[#9CA3AF]', Icon: Clock         },
};

// ── Marker icons ───────────────────────────────────────────────────────
function createInfraIcon(type: InfraType, selected: boolean) {
  const { color } = TYPE_CONFIG[type];
  const size   = selected ? 22 : 16;
  const border = selected ? 3 : 2;
  const shadow = selected
    ? `0 0 0 5px ${color}30, 0 2px 10px rgba(0,0,0,0.7)`
    : '0 2px 6px rgba(0,0,0,0.55)';
  const glyphs: Record<InfraType, string> = {
    wastewater_treatment: '💧',
    desalination: '🌊',
    pipeline: '━',
    reservoir: '🔵',
    planned: '◌',
  };

  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${color}28;
      border:${border}px solid ${color};
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      box-shadow:${shadow};
      cursor:pointer;
      transition:all .15s;
    "><div style="width:${size * 0.45}px;height:${size * 0.45}px;border-radius:50%;background:${color};"></div></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

// ── Map auto-pan ───────────────────────────────────────────────────────
function PanTo({ coords }: { coords: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.panTo(coords, { animate: true, duration: 0.5 });
  }, [coords, map]);
  return null;
}

// ── Main component ─────────────────────────────────────────────────────
export function WaterInfrastructurePage() {
  const [selectedItem, setSelectedItem] = useState<InfraItem | null>(null);

  // Filter state
  const [showTSE,           setShowTSE]           = useState(true);
  const [showDesal,         setShowDesal]         = useState(true);
  const [showPipeline,      setShowPipeline]      = useState(true);
  const [showReservoir,     setShowReservoir]     = useState(true);
  const [plannedOnly,       setPlannedOnly]       = useState(false);
  const [operationalOnly,   setOperationalOnly]   = useState(false);

  const filtered = useMemo(() => {
    return waterInfrastructure.filter((item) => {
      const t = item.type as InfraType;
      if (!showTSE       && t === 'wastewater_treatment') return false;
      if (!showDesal     && t === 'desalination')         return false;
      if (!showPipeline  && t === 'pipeline')             return false;
      if (!showReservoir && t === 'reservoir')            return false;
      if (plannedOnly     && item.status === 'Operational') return false;
      if (operationalOnly && item.status !== 'Operational') return false;
      return true;
    });
  }, [showTSE, showDesal, showPipeline, showReservoir, plannedOnly, operationalOnly]);

  const panTarget = selectedItem
    ? [selectedItem.coordinates.lat, selectedItem.coordinates.lng] as [number, number]
    : null;

  const sc = selectedItem ? STATUS_CONFIG[selectedItem.status as keyof typeof STATUS_CONFIG] : null;
  const tc = selectedItem ? TYPE_CONFIG[selectedItem.type as InfraType] : null;

  return (
    <div className="flex-1 relative overflow-hidden">

      {/* ── Full-page map ── */}
      <MapContainer
        center={[25.5, 46.5]}
        zoom={6}
        zoomControl={false}
        style={{ height: '100%', width: '100%', background: '#060D19' }}
      >
        <TileLayer
          url="https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={19}
        />
        <ZoomControl position="topright" />
        <PanTo coords={panTarget} />

        {filtered.map((item) => (
          <Marker
            key={item.id}
            position={[item.coordinates.lat, item.coordinates.lng]}
            icon={createInfraIcon(item.type as InfraType, item.id === selectedItem?.id)}
            zIndexOffset={item.id === selectedItem?.id ? 1000 : 0}
            eventHandlers={{
              click: () => setSelectedItem(item.id === selectedItem?.id ? null : item),
            }}
          />
        ))}
      </MapContainer>

      {/* ── Filter panel — top left ── */}
      <div className="absolute top-4 left-4 z-[1000] bg-[#0B1220]/94 backdrop-blur-sm border border-[#1F2937] rounded-xl p-4 w-[230px] shadow-xl">
        <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest mb-3">Filters</p>

        {/* Type filters */}
        <div className="space-y-2 mb-4 pb-3 border-b border-[#1F2937]">
          {(
            [
              { key: 'tse',       label: 'TSE / Wastewater Plants', color: '#10B981', val: showTSE,       set: setShowTSE       },
              { key: 'desal',     label: 'Desalination Plants',      color: '#3B82F6', val: showDesal,     set: setShowDesal     },
              { key: 'pipeline',  label: 'Pipelines',                color: '#F97316', val: showPipeline,  set: setShowPipeline  },
              { key: 'reservoir', label: 'Reservoirs',               color: '#8B5CF6', val: showReservoir, set: setShowReservoir },
            ] as const
          ).map(({ key, label, color, val, set }) => (
            <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors"
                style={{
                  background: val ? `${color}28` : 'transparent',
                  borderColor: val ? color : '#374151',
                }}
                onClick={() => set(!val)}
              >
                {val && (
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 2.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="text-[12px] text-[#D1D5DB] group-hover:text-white transition-colors">{label}</span>
              </div>
            </label>
          ))}
        </div>

        {/* Status filters */}
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div
              className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors"
              style={{
                background: plannedOnly ? '#6B728028' : 'transparent',
                borderColor: plannedOnly ? '#6B7280' : '#374151',
              }}
              onClick={() => { setPlannedOnly(!plannedOnly); if (!plannedOnly) setOperationalOnly(false); }}
            >
              {plannedOnly && (
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 2.5" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-[12px] text-[#D1D5DB] group-hover:text-white transition-colors">Planned projects only</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div
              className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors"
              style={{
                background: operationalOnly ? '#10B98128' : 'transparent',
                borderColor: operationalOnly ? '#10B981' : '#374151',
              }}
              onClick={() => { setOperationalOnly(!operationalOnly); if (!operationalOnly) setPlannedOnly(false); }}
            >
              {operationalOnly && (
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 2.5" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-[12px] text-[#D1D5DB] group-hover:text-white transition-colors">Operational only</span>
          </label>
        </div>

        <p className="text-[10px] text-[#4B5563] mt-3">{filtered.length} of {waterInfrastructure.length} items shown</p>
      </div>

      {/* ── Legend — bottom left ── */}
      <div className="absolute bottom-5 left-4 z-[1000] bg-[#0B1220]/92 backdrop-blur-sm border border-[#1F2937] rounded-xl p-3 shadow-xl">
        <p className="text-[9px] font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Legend</p>
        <div className="space-y-1.5">
          {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
              <span className="text-[10px] text-[#D1D5DB] whitespace-nowrap">{cfg.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Map style overrides ── */}
      <style>{`
        .leaflet-control-zoom a {
          background: #111827 !important; border-color: #374151 !important; color: #9CA3AF !important;
        }
        .leaflet-control-zoom a:hover { background: #1F2937 !important; color: #fff !important; }
        .leaflet-bar { border: 1px solid #374151 !important; border-radius: 6px !important; overflow: hidden; }
        .leaflet-bar a:first-child { border-radius: 6px 6px 0 0 !important; }
        .leaflet-bar a:last-child  { border-radius: 0 0 6px 6px !important; border-bottom: none !important; }
        .leaflet-control-attribution { background: rgba(11,18,32,0.75) !important; color: #4B5563 !important; font-size: 9px !important; }
        .leaflet-control-attribution a { color: #6B7280 !important; }
      `}</style>

      {/* ── Detail side panel ── */}
      <div
        className={`absolute top-0 right-0 bottom-0 z-[1001] bg-[#0B1220] border-l border-[#1F2937] flex flex-col transition-all duration-300 ease-out shadow-2xl ${
          selectedItem ? 'w-[340px] opacity-100' : 'w-0 opacity-0 overflow-hidden'
        }`}
      >
        {selectedItem && tc && sc && (() => {
          const StatusIcon = sc.Icon;
          const TypeIcon   = tc.Icon;
          return (
            <>
              {/* Panel header */}
              <div className="flex-shrink-0 px-5 pt-5 pb-4 border-b border-[#1F2937]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center" style={{ background: `${tc.color}20` }}>
                        <TypeIcon className="w-3 h-3" style={{ color: tc.color }} />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: tc.color }}>
                        {tc.label}
                      </span>
                    </div>
                    <h2 className="text-white font-bold text-[15px] leading-snug">{selectedItem.name}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-[#6B7280] hover:text-white transition-colors flex-shrink-0 mt-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Key stats */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="bg-[#111827] rounded-lg px-3 py-2">
                    <p className="text-[9px] uppercase tracking-wider text-[#6B7280] font-semibold mb-0.5">Capacity</p>
                    <p className="text-white text-[12px] font-semibold leading-snug">{selectedItem.capacity}</p>
                  </div>
                  <div className="bg-[#111827] rounded-lg px-3 py-2">
                    <p className="text-[9px] uppercase tracking-wider text-[#6B7280] font-semibold mb-0.5">Operator</p>
                    <p className="text-white text-[12px] font-semibold">{selectedItem.operator}</p>
                  </div>
                </div>

                {/* Status badge */}
                <div className="mt-2">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                    <StatusIcon className="w-3 h-3" />
                    {selectedItem.status}
                  </span>
                </div>
              </div>

              {/* Panel body — scrollable */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

                {/* Connected TSE Network */}
                {selectedItem.connectedTSENetwork.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                      Connected TSE Network
                    </p>
                    <div className="space-y-1.5">
                      {selectedItem.connectedTSENetwork.map((net, i) => (
                        <div key={i} className="flex items-center gap-2 text-[12px] text-[#D1D5DB]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] flex-shrink-0" />
                          {net}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nearby Data Centers */}
                {selectedItem.nearbyDataCenters.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                      Nearby Data Centers
                    </p>
                    <div className="space-y-1.5">
                      {selectedItem.nearbyDataCenters.map((dc, i) => (
                        <div key={i} className="flex items-center gap-2 text-[12px] text-[#D1D5DB]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] flex-shrink-0" />
                          {dc}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Government Reports */}
                {selectedItem.governmentReports.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                      Government Reports
                    </p>
                    <div className="space-y-1.5">
                      {selectedItem.governmentReports.map((report, i) => (
                        <a
                          key={i}
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="flex items-center gap-3 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] hover:border-[#374151] rounded-lg px-3 py-2.5 transition-colors group"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#6B7280] group-hover:text-[#10B981] flex-shrink-0 transition-colors" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] text-[#D1D5DB] group-hover:text-white leading-snug transition-colors line-clamp-2">
                              {report.name}
                            </p>
                            <p className="text-[10px] text-[#6B7280] mt-0.5">{report.date}</p>
                          </div>
                          <ChevronRight className="w-3 h-3 text-[#4B5563] group-hover:text-[#10B981] flex-shrink-0 transition-colors" />
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

    </div>
  );
}
