import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, CircleMarker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LAYERS = [
  { id: 'water-plants',  label: 'Water Plants'      },
  { id: 'pipelines',     label: 'Pipelines'          },
  { id: 'industrial',    label: 'Industrial Cities'  },
  { id: 'data-centers',  label: 'Data Centers'       },
];

const LEGEND_ITEMS = [
  { color: '#3B82F6', label: 'Wastewater Treatment Plant' },
  { color: '#06B6D4', label: 'Desalination Plant'         },
  { color: '#8B5CF6', label: 'TSE Pipeline'               },
  { color: '#F59E0B', label: 'Industrial City'            },
  { color: '#10B981', label: 'Data Center (Existing)'     },
  { color: '#6EE7B7', label: 'Data Center (Planned)'      },
];

// ── Static overlay data ───────────────────────────────────────────────────────

const WATER_PLANTS = [
  { id: 'wp-1', name: 'Riyadh Water Treatment Plant',       type: 'Treatment',    lat: 24.61, lng: 46.72 },
  { id: 'wp-2', name: 'Jeddah Desalination Complex',        type: 'Desalination', lat: 21.49, lng: 39.19 },
  { id: 'wp-3', name: 'Jubail Seawater Desalination Plant', type: 'Desalination', lat: 27.00, lng: 49.65 },
  { id: 'wp-4', name: 'Yanbu Desalination Plant',           type: 'Desalination', lat: 24.09, lng: 38.05 },
  { id: 'wp-5', name: 'Dammam Treatment Plant',             type: 'Treatment',    lat: 26.43, lng: 50.10 },
  { id: 'wp-6', name: 'Al-Qatif Desalination Plant',        type: 'Desalination', lat: 26.52, lng: 50.01 },
];

const PIPELINES = [
  { id: 'pl-1', name: 'Riyadh TSE Pipeline Node',         lat: 24.90, lng: 46.80 },
  { id: 'pl-2', name: 'Eastern Province Pipeline Hub',    lat: 26.50, lng: 49.90 },
  { id: 'pl-3', name: 'Sudair Pipeline Junction',         lat: 25.62, lng: 45.90 },
  { id: 'pl-4', name: 'Qassim Water Distribution Node',  lat: 26.20, lng: 43.50 },
  { id: 'pl-5', name: 'NEOM Pipeline Terminus',           lat: 28.00, lng: 35.50 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Categorise a site into the map layer it belongs to based on its name. */
function getSiteLayer(name: string): 'industrial' | 'data-centers' {
  const lower = name.toLowerCase();
  if (lower.includes('industrial') || lower.includes('wadi') || lower.includes('jubail')) {
    return 'industrial';
  }
  return 'data-centers';
}

function scoreColor(score: number) {
  if (score >= 80) return { fg: '#10B981', bg: 'rgba(16,185,129,0.18)', ring: '#10B98140' };
  if (score >= 60) return { fg: '#F59E0B', bg: 'rgba(245,158,11,0.18)',  ring: '#F59E0B40' };
  return              { fg: '#EF4444', bg: 'rgba(239,68,68,0.18)',    ring: '#EF444440' };
}

function createMarkerIcon(score: number, selected: boolean) {
  const { fg, bg, ring } = scoreColor(score);
  const size   = selected ? 40 : 34;
  const border = selected ? 3 : 2;
  const shadow = selected
    ? `0 0 0 4px ${ring}, 0 2px 10px rgba(0,0,0,0.6)`
    : '0 2px 6px rgba(0,0,0,0.45)';

  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${bg};
      border:${border}px solid ${fg};
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:11px;font-weight:700;color:${fg};
      font-family:Inter,sans-serif;
      box-shadow:${shadow};
      cursor:pointer;
      transition:all .15s;
    ">${score}</div>`,
    iconSize:    [size, size],
    iconAnchor:  [size / 2, size / 2],
    popupAnchor: [0, -(size / 2) - 4],
  });
}

// ── Types ─────────────────────────────────────────────────────────────────────

type SiteEntry = {
  id: string;
  name: string;
  region: string;
  overallScore: number;
  rating: string;
  coordinates: { lat: number; lng: number };
  waterAccess: { source: string };
};

// ── Map controller ────────────────────────────────────────────────────────────

function MapViewController({ siteId, sites }: { siteId: string; sites: SiteEntry[] }) {
  const map = useMap();
  useEffect(() => {
    const site = sites.find(s => s.id === siteId);
    if (site) {
      map.panTo([site.coordinates.lat, site.coordinates.lng], { animate: true, duration: 0.5 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteId, map]);
  return null;
}

// ── Component ─────────────────────────────────────────────────────────────────

interface SiteMapProps {
  selectedSiteId: string;
  onSiteSelect: (id: string) => void;
  /** All sites to render as score markers (already filtered by parent if needed). */
  sitesToDisplay: SiteEntry[];
}

export function SiteMap({ selectedSiteId, onSiteSelect, sitesToDisplay }: SiteMapProps) {
  const [activeLayers, setActiveLayers] = useState<Set<string>>(
    new Set(['industrial', 'data-centers'])
  );

  const toggleLayer = (id: string) => {
    setActiveLayers(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Separate sites into their layers so each can be toggled independently
  const industrialSites  = sitesToDisplay.filter(s => getSiteLayer(s.name) === 'industrial');
  const dataCenterSites  = sitesToDisplay.filter(s => getSiteLayer(s.name) === 'data-centers');

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden border border-[#1F2937]">
      <MapContainer
        center={[24.7136, 46.6753]}
        zoom={8}
        zoomControl={false}
        style={{ height: '100%', width: '100%', background: '#060D19' }}
      >
        <TileLayer
          url="https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={19}
        />
        <ZoomControl position="topright" />
        <MapViewController siteId={selectedSiteId} sites={sitesToDisplay} />

        {/* ── Industrial city site markers ── */}
        {activeLayers.has('industrial') && industrialSites.map(site => (
          <Marker
            key={site.id}
            position={[site.coordinates.lat, site.coordinates.lng]}
            icon={createMarkerIcon(site.overallScore, site.id === selectedSiteId)}
            eventHandlers={{ click: () => onSiteSelect(site.id) }}
            zIndexOffset={site.id === selectedSiteId ? 1000 : 0}
          >
            <Popup className="wi-popup">
              <div style={{
                background: '#111827', color: '#F9FAFB',
                padding: '10px 12px', borderRadius: '8px',
                minWidth: '170px', fontSize: '12px',
                border: '1px solid #1F2937',
              }}>
                <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '3px' }}>{site.name}</div>
                <div style={{ color: '#9CA3AF', marginBottom: '6px' }}>{site.region}</div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{ color: scoreColor(site.overallScore).fg, fontWeight: 700, fontSize: '13px' }}>{site.overallScore}</span>
                  <span style={{ color: '#6B7280' }}>·</span>
                  <span style={{ color: scoreColor(site.overallScore).fg }}>{site.rating}</span>
                </div>
                <div style={{ marginTop: '6px', color: '#9CA3AF', fontSize: '11px' }}>{site.waterAccess.source}</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* ── Data center site markers ── */}
        {activeLayers.has('data-centers') && dataCenterSites.map(site => (
          <Marker
            key={site.id}
            position={[site.coordinates.lat, site.coordinates.lng]}
            icon={createMarkerIcon(site.overallScore, site.id === selectedSiteId)}
            eventHandlers={{ click: () => onSiteSelect(site.id) }}
            zIndexOffset={site.id === selectedSiteId ? 1000 : 0}
          >
            <Popup className="wi-popup">
              <div style={{
                background: '#111827', color: '#F9FAFB',
                padding: '10px 12px', borderRadius: '8px',
                minWidth: '170px', fontSize: '12px',
                border: '1px solid #1F2937',
              }}>
                <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '3px' }}>{site.name}</div>
                <div style={{ color: '#9CA3AF', marginBottom: '6px' }}>{site.region}</div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{ color: scoreColor(site.overallScore).fg, fontWeight: 700, fontSize: '13px' }}>{site.overallScore}</span>
                  <span style={{ color: '#6B7280' }}>·</span>
                  <span style={{ color: scoreColor(site.overallScore).fg }}>{site.rating}</span>
                </div>
                <div style={{ marginTop: '6px', color: '#9CA3AF', fontSize: '11px' }}>{site.waterAccess.source}</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* ── Water plant overlay markers ── */}
        {activeLayers.has('water-plants') && WATER_PLANTS.map(wp => (
          <CircleMarker
            key={wp.id}
            center={[wp.lat, wp.lng]}
            radius={7}
            pathOptions={{
              color:       wp.type === 'Desalination' ? '#22D3EE' : '#3B82F6',
              fillColor:   wp.type === 'Desalination' ? '#22D3EE' : '#3B82F6',
              fillOpacity: 0.8,
              weight:      1.5,
            }}
          >
            <Tooltip direction="top" offset={[0, -8]}>
              <span style={{ fontSize: 11, fontWeight: 600 }}>{wp.name}</span><br />
              <span style={{ fontSize: 10, color: '#9CA3AF' }}>{wp.type}</span>
            </Tooltip>
          </CircleMarker>
        ))}

        {/* ── Pipeline overlay markers ── */}
        {activeLayers.has('pipelines') && PIPELINES.map(pl => (
          <CircleMarker
            key={pl.id}
            center={[pl.lat, pl.lng]}
            radius={5}
            pathOptions={{ color: '#A78BFA', fillColor: '#8B5CF6', fillOpacity: 0.75, weight: 1.5 }}
          >
            <Tooltip direction="top" offset={[0, -8]}>
              <span style={{ fontSize: 11 }}>{pl.name}</span>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Layer toggle toolbar — top center */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-1
                   bg-[#0B1220]/90 backdrop-blur-sm border border-[#1F2937] rounded-lg px-2 py-1.5"
        data-testid="map-layer-toolbar"
      >
        {LAYERS.map(layer => {
          const active = activeLayers.has(layer.id);
          return (
            <button
              key={layer.id}
              onClick={() => toggleLayer(layer.id)}
              data-testid={`toggle-layer-${layer.id}`}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all whitespace-nowrap ${
                active
                  ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                  : 'text-[#6B7280] hover:text-[#D1D5DB] hover:bg-white/5 border border-transparent'
              }`}
            >
              {layer.label}
            </button>
          );
        })}
      </div>

      {/* Locate-me button */}
      <div className="absolute z-[1000]" style={{ top: 82, right: 10 }}>
        <button
          title="Center on Riyadh"
          data-testid="button-locate-me"
          className="w-[30px] h-[30px] bg-[#111827] hover:bg-[#1F2937]
                     border border-[#374151] rounded flex items-center justify-center
                     text-[#9CA3AF] hover:text-white transition-colors shadow-md"
          onClick={() => {/* Placeholder */}}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
        </button>
      </div>

      {/* Legend — bottom right */}
      <div
        className="absolute bottom-5 right-3 z-[1000]
                   bg-[#0B1220]/92 backdrop-blur-sm border border-[#1F2937] rounded-lg p-3"
        data-testid="map-legend"
      >
        <div className="text-[9px] font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Legend</div>
        <div className="space-y-1.5">
          {LEGEND_ITEMS.map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] text-[#D1D5DB] whitespace-nowrap leading-none">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popup / zoom style overrides */}
      <style>{`
        .leaflet-popup-content-wrapper,
        .leaflet-popup-tip {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .leaflet-popup-content { margin: 0 !important; }
        .leaflet-control-zoom a {
          background: #111827 !important;
          border-color: #374151 !important;
          color: #9CA3AF !important;
        }
        .leaflet-control-zoom a:hover {
          background: #1F2937 !important;
          color: #fff !important;
        }
        .leaflet-bar {
          border: 1px solid #374151 !important;
          border-radius: 6px !important;
          overflow: hidden;
        }
        .leaflet-bar a:first-child { border-radius: 6px 6px 0 0 !important; }
        .leaflet-bar a:last-child  { border-radius: 0 0 6px 6px !important; border-bottom: none !important; }
        .leaflet-control-attribution {
          background: rgba(11,18,32,0.75) !important;
          color: #4B5563 !important;
          font-size: 9px !important;
        }
        .leaflet-control-attribution a { color: #6B7280 !important; }
      `}</style>
    </div>
  );
}
