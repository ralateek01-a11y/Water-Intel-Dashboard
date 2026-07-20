import React, { useRef, useState } from 'react';
import {
  Upload, FileText, Search, X, Check, Tag,
  Download, ChevronDown, Calendar, Building2,
  MapPin, Hash, Droplets, Sparkles, AlertCircle,
  Loader2, ExternalLink
} from 'lucide-react';

interface DocAnalysis {
  summary: string;
  keyNumbers: string[];
  agenciesMentioned: string[];
  locationsMentioned: string[];
  datesMentioned: string[];
  waterCapacities: string[];
  suggestedTags: string[];
}

interface UploadedDoc {
  id: string;
  filename: string;
  size: number;
  uploadedAt: string;
  type: string;
  agency: string;
  analysis: DocAnalysis;
  objectUrl: string; // for download
}

const DOC_TYPES = ['All Types', 'Regulation', 'Government Report', 'Environmental Study', 'Tender Document'];
const AGENCIES  = ['All Agencies', 'NWC', 'SWCC', 'MEWA', 'NCEC', 'RCJY', 'SEC', 'Other'];

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

function TagPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 bg-[#10B981]/10 text-[#10B981] text-[10px] font-medium px-2 py-0.5 rounded-full">
      <Tag className="w-2.5 h-2.5" />
      {label}
    </span>
  );
}

function CheckItem({ label, present = true }: { label: string; present?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 text-[11px] ${present ? 'text-[#D1D5DB]' : 'text-[#4B5563]'}`}>
      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${present ? 'bg-[#10B981]/20' : 'bg-[#1F2937]'}`}>
        <Check className={`w-2.5 h-2.5 ${present ? 'text-[#10B981]' : 'text-[#4B5563]'}`} />
      </div>
      {label}
    </div>
  );
}

// ── Skeleton card shown while uploading ───────────────────────────────
function AnalyzingCard({ filename }: { filename: string }) {
  return (
    <div className="bg-[#111827] border border-[#10B981]/30 rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10B981]/5 to-transparent animate-[shimmer_1.5s_ease-in-out_infinite]" />
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center flex-shrink-0">
          <Loader2 className="w-4 h-4 text-[#10B981] animate-spin" />
        </div>
        <div>
          <p className="text-white text-[13px] font-semibold truncate max-w-[200px]">{filename}</p>
          <p className="text-[#10B981] text-[11px] font-medium mt-0.5">Analyzing document…</p>
        </div>
      </div>
      <div className="space-y-2 animate-pulse">
        <div className="h-2.5 bg-[#1F2937] rounded w-full" />
        <div className="h-2.5 bg-[#1F2937] rounded w-4/5" />
        <div className="h-2.5 bg-[#1F2937] rounded w-2/3" />
      </div>
      <div className="flex gap-1.5 flex-wrap animate-pulse">
        {[60, 80, 50].map((w, i) => (
          <div key={i} className="h-5 rounded-full bg-[#1F2937]" style={{ width: `${w}px` }} />
        ))}
      </div>
    </div>
  );
}

// ── Main document card ─────────────────────────────────────────────────
function DocCard({ doc, onClick }: { doc: UploadedDoc; onClick: () => void }) {
  const a = doc.analysis;
  const firstLocation = a.locationsMentioned[0];
  const firstWater    = a.waterCapacities[0];

  return (
    <div
      onClick={onClick}
      className="bg-[#111827] border border-[#1F2937] hover:border-[#10B981]/40 rounded-xl p-5 flex flex-col gap-3 cursor-pointer transition-all group"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#1F2937] flex items-center justify-center flex-shrink-0 group-hover:bg-[#10B981]/10 transition-colors">
          <FileText className="w-4 h-4 text-[#6B7280] group-hover:text-[#10B981] transition-colors" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white text-[13px] font-semibold leading-snug line-clamp-2">{doc.filename}</p>
          <p className="text-[#4B5563] text-[10px] mt-0.5">{doc.uploadedAt} · {formatBytes(doc.size)}</p>
        </div>
      </div>

      {/* Summary preview */}
      {a.summary && (
        <p className="text-[#9CA3AF] text-[12px] leading-relaxed line-clamp-2">{a.summary}</p>
      )}

      {/* Checkmark items */}
      <div className="flex flex-col gap-1.5">
        <CheckItem label="Summary" present={!!a.summary} />
        <CheckItem label={firstWater ? `Water: ${firstWater}` : 'Water Capacity'} present={a.waterCapacities.length > 0} />
        <CheckItem label={firstLocation ? firstLocation : 'Locations Mentioned'} present={a.locationsMentioned.length > 0} />
        <CheckItem label={`${a.agenciesMentioned.length} agenc${a.agenciesMentioned.length !== 1 ? 'ies' : 'y'} identified`} present={a.agenciesMentioned.length > 0} />
      </div>

      {/* Tags */}
      {a.suggestedTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {a.suggestedTags.map((tag) => <TagPill key={tag} label={tag} />)}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-[#1F2937]">
        <span className="text-[10px] text-[#4B5563]">Click to expand</span>
        <a
          href={doc.objectUrl}
          download={doc.filename}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-[11px] text-[#6B7280] hover:text-[#10B981] transition-colors"
        >
          <Download className="w-3 h-3" />
          Download
        </a>
      </div>
    </div>
  );
}

// ── Detail modal ───────────────────────────────────────────────────────
function DocModal({ doc, onClose }: { doc: UploadedDoc; onClose: () => void }) {
  const a = doc.analysis;

  const sections = [
    { icon: Hash,       label: 'Key Numbers',          items: a.keyNumbers,          color: 'text-[#F59E0B]' },
    { icon: Building2,  label: 'Agencies Mentioned',    items: a.agenciesMentioned,   color: 'text-[#8B5CF6]' },
    { icon: MapPin,     label: 'Locations Mentioned',   items: a.locationsMentioned,  color: 'text-[#10B981]' },
    { icon: Calendar,   label: 'Dates Mentioned',       items: a.datesMentioned,      color: 'text-blue-400'  },
    { icon: Droplets,   label: 'Water Capacities',      items: a.waterCapacities,     color: 'text-cyan-400'  },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[680px] max-h-[85vh] bg-[#0D1525] border border-[#1F2937] rounded-2xl flex flex-col shadow-2xl overflow-hidden">

        {/* Modal header */}
        <div className="flex-shrink-0 px-6 pt-5 pb-4 border-b border-[#1F2937] bg-[#0B1220]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-[#10B981]" />
              </div>
              <div className="min-w-0">
                <h2 className="text-white font-bold text-[15px] leading-snug">{doc.filename}</h2>
                <p className="text-[#6B7280] text-[11px] mt-0.5">{doc.uploadedAt} · {formatBytes(doc.size)}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-[#6B7280] hover:text-white transition-colors flex-shrink-0">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* AI summary */}
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">AI Summary</span>
            </div>
            <p className="text-[#D1D5DB] text-[13px] leading-relaxed">{a.summary || 'No summary generated.'}</p>
          </div>

          {/* Tags */}
          {a.suggestedTags.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280] mb-2">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {a.suggestedTags.map((tag) => <TagPill key={tag} label={tag} />)}
              </div>
            </div>
          )}

          {/* Extracted data sections */}
          {sections.map(({ icon: Icon, label, items, color }) =>
            items.length > 0 ? (
              <div key={label}>
                <div className="flex items-center gap-1.5 mb-2">
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">{label}</p>
                  <span className="text-[9px] text-[#374151] bg-[#1F2937] rounded-full px-1.5 py-0.5 font-medium">{items.length}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item, i) => (
                    <span key={i} className="bg-[#111827] border border-[#1F2937] text-[#D1D5DB] text-[11px] px-2.5 py-1 rounded-lg">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null
          )}

        </div>

        {/* Modal footer */}
        <div className="flex-shrink-0 px-6 py-3 border-t border-[#1F2937] flex justify-between items-center bg-[#0B1220]">
          <a
            href={doc.objectUrl}
            download={doc.filename}
            className="flex items-center gap-2 text-[12px] text-[#10B981] hover:text-[#6EE7B7] transition-colors font-medium"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </a>
          <button
            onClick={onClose}
            className="text-[12px] text-[#6B7280] hover:text-white transition-colors px-4 py-1.5 rounded-md hover:bg-[#1F2937]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────
export function DocumentsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [docs,        setDocs]        = useState<UploadedDoc[]>([]);
  const [uploading,   setUploading]   = useState<{ filename: string } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selected,    setSelected]    = useState<UploadedDoc | null>(null);
  const [search,      setSearch]      = useState('');
  const [typeFilter,  setTypeFilter]  = useState('All Types');
  const [agencyFilter,setAgencyFilter]= useState('All Agencies');

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!fileInputRef.current) return;
    fileInputRef.current.value = '';
    if (!file) return;

    setUploadError(null);
    setUploading({ filename: file.name });

    const objectUrl = URL.createObjectURL(file);
    const formData  = new FormData();
    formData.append('pdf', file);

    try {
      const res = await fetch('/api/documents/analyze', {
        method: 'POST',
        body:   formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? `Server error ${res.status}`);
      }

      const newDoc: UploadedDoc = {
        id:         `doc-${Date.now()}`,
        filename:   data.filename,
        size:       data.size,
        uploadedAt: new Date().toISOString().split('T')[0],
        type:       'Government Report',
        agency:     data.analysis?.agenciesMentioned?.[0] ?? 'Other',
        analysis:   data.analysis,
        objectUrl,
      };
      setDocs((prev) => [newDoc, ...prev]);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed.');
      URL.revokeObjectURL(objectUrl);
    } finally {
      setUploading(null);
    }
  }

  // Filter visible docs
  const visible = docs.filter((d) => {
    if (search && !d.filename.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter   !== 'All Types'    && d.type   !== typeFilter)   return false;
    if (agencyFilter !== 'All Agencies' && d.agency !== agencyFilter) return false;
    return true;
  });

  const selectCls = "h-9 bg-[#0A0E17] border border-[#1F2937] hover:border-[#374151] text-[#D1D5DB] text-[13px] rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-colors";

  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex-shrink-0 px-6 pt-6 pb-4 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-white text-[20px] font-bold">Documents &amp; Reports</h1>
          <p className="text-[#6B7280] text-[13px] mt-1">Your AI-powered document library.</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={!!uploading}
            className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
          >
            {uploading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing…</>
            ) : (
              <><Upload className="w-4 h-4" /> Upload Document</>
            )}
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex-shrink-0 px-6 pb-4 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents…"
            className="w-full h-9 bg-[#0A0E17] border border-[#1F2937] hover:border-[#374151] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] text-white text-[13px] rounded-md pl-9 pr-3 placeholder-[#4B5563] focus:outline-none transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <select value={typeFilter}   onChange={(e) => setTypeFilter(e.target.value)}   className={selectCls}>
          {DOC_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={agencyFilter} onChange={(e) => setAgencyFilter(e.target.value)} className={selectCls}>
          {AGENCIES.map((a) => <option key={a}>{a}</option>)}
        </select>
        {docs.length > 0 && (
          <span className="text-[#4B5563] text-[12px] ml-auto whitespace-nowrap">
            {visible.length} of {docs.length} document{docs.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Error banner */}
      {uploadError && (
        <div className="flex-shrink-0 mx-6 mb-4 flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-red-400 text-[13px] font-semibold">Upload failed</p>
            <p className="text-red-400/80 text-[12px] mt-0.5">{uploadError}</p>
          </div>
          <button onClick={() => setUploadError(null)} className="text-red-400/60 hover:text-red-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Content area */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">

        {/* Empty state */}
        {!uploading && docs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#111827] border border-[#1F2937] flex items-center justify-center">
              <FileText className="w-7 h-7 text-[#374151]" />
            </div>
            <div>
              <p className="text-white font-semibold text-[15px]">No documents yet</p>
              <p className="text-[#6B7280] text-[13px] mt-1 max-w-[320px]">
                Upload a PDF — regulations, government reports, environmental studies, or tender documents — and our AI will extract key data automatically.
              </p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors mt-2"
            >
              <Upload className="w-4 h-4" />
              Upload your first document
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {uploading && <AnalyzingCard filename={uploading.filename} />}
            {visible.map((doc) => (
              <DocCard key={doc.id} doc={doc} onClick={() => setSelected(doc)} />
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && <DocModal doc={selected} onClose={() => setSelected(null)} />}

    </div>
  );
}
