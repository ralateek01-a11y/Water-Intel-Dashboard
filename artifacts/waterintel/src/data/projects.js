export const projects = [
  {
    id: "proj-001",
    name: "Riyadh DC Campus",
    status: "active",
    powerMW: 120,
    coolingTechnology: "Immersion Cooling",
    region: "Riyadh",
    targetYear: 2026,
    recommendedSiteIds: ["site-001", "site-002", "site-003"],
    notes: [
      {
        id: "note-001-1",
        author: "Razan Alateeb",
        date: "2026-07-10",
        text: "Initial feasibility study completed. Site-001 (Heet Industrial City) remains the leading candidate due to proximity to TSE pipeline and low regulatory complexity.",
      },
      {
        id: "note-001-2",
        author: "Ahmad Saleh",
        date: "2026-07-14",
        text: "SWCC confirmed available treatment capacity at Heet for immersion cooling load. Requested formal allocation letter for permitting package.",
      },
      {
        id: "note-001-3",
        author: "Razan Alateeb",
        date: "2026-07-18",
        text: "Power availability confirmed at 150 MW on SEC Grid H-7. We have sufficient headroom for the 120 MW load plus 25% contingency. Moving to Stage 2 approval.",
      },
    ],
    documents: [
      {
        id: "doc-001-1",
        name: "Riyadh DC Campus — Feasibility Study v2.1",
        type: "PDF",
        uploadDate: "2026-07-10",
      },
      {
        id: "doc-001-2",
        name: "SWCC Water Allocation Confirmation",
        type: "PDF",
        uploadDate: "2026-07-15",
      },
      {
        id: "doc-001-3",
        name: "Site Survey — Heet Industrial City",
        type: "XLSX",
        uploadDate: "2026-07-17",
      },
    ],
    aiRecommendations: [
      {
        id: "airec-001-1",
        text: "Heet Industrial City (Site-001) is strongly recommended as the primary site. Its TSE pipeline proximity of 0.8 km minimises water transport costs and reduces CAPEX by an estimated SAR 4.2M compared to the next-best alternative.",
        confidence: "High",
      },
      {
        id: "airec-001-2",
        text: "Immersion cooling at 120 MW will require approximately 900 m³/day of additional water draw. The Heet TSE plant's 52,000 m³/day available capacity provides more than sufficient headroom with no supply risk through 2030.",
        confidence: "High",
      },
      {
        id: "airec-001-3",
        text: "Consider negotiating a dual-sourcing agreement with both Heet and Al-Khair TSE plants as a supply redundancy measure. Al-Khair's 45,000 m³/day capacity provides a credible fallback within a 45 km corridor.",
        confidence: "Medium",
      },
    ],
  },
  {
    id: "proj-002",
    name: "NEOM AI Cluster",
    status: "planning",
    powerMW: 300,
    coolingTechnology: "Hybrid Liquid Cooling",
    region: "Riyadh",
    targetYear: 2028,
    recommendedSiteIds: ["site-001", "site-002"],
    notes: [
      {
        id: "note-002-1",
        author: "Tariq Al-Mansouri",
        date: "2026-06-20",
        text: "Preliminary site screening shortlisted four locations. Riyadh region preferred for proximity to existing NEOM project supply chain networks and SEC interconnection capacity.",
      },
      {
        id: "note-002-2",
        author: "Razan Alateeb",
        date: "2026-07-05",
        text: "300 MW load profile requires a site with dual-path power feeds and at minimum 1,800 m³/day water availability for hybrid liquid cooling. Only site-001 and site-002 currently qualify.",
      },
    ],
    documents: [
      {
        id: "doc-002-1",
        name: "NEOM AI Cluster — Concept Brief",
        type: "PDF",
        uploadDate: "2026-06-18",
      },
      {
        id: "doc-002-2",
        name: "300 MW Power Interconnection Assessment",
        type: "PDF",
        uploadDate: "2026-07-01",
      },
    ],
    aiRecommendations: [
      {
        id: "airec-002-1",
        text: "For a 300 MW AI cluster, Site-001 (Heet Industrial City) is the only currently available location meeting all three critical thresholds: water capacity >40,000 m³/day, dual-path power ≥300 MW, and fiber ≥100 Gbps.",
        confidence: "High",
      },
      {
        id: "airec-002-2",
        text: "Hybrid liquid cooling at this scale will produce approximately 1,800 m³/day of blowdown that requires discharge planning. Recommend engaging NCEC for pre-permitting consultation on treated effluent reuse options.",
        confidence: "Medium",
      },
      {
        id: "airec-002-3",
        text: "Timeline risk: the 2028 target year is achievable at Site-001 given its 4–6 month permitting track, but any site substitution to Site-002 or Site-003 adds 2–4 months due to higher agency coordination requirements.",
        confidence: "Medium",
      },
    ],
  },
  {
    id: "proj-003",
    name: "Dammam Edge Data Center",
    status: "on-hold",
    powerMW: 60,
    coolingTechnology: "Air Cooling",
    region: "Eastern",
    targetYear: 2027,
    recommendedSiteIds: ["site-004", "site-006"],
    notes: [
      {
        id: "note-003-1",
        author: "Khalid Al-Rashid",
        date: "2026-05-12",
        text: "Project placed on hold pending ARAMCO anchor tenancy decision. Expected resolution Q3 2026. Maintaining site reservations at Dammam 2nd Industrial City.",
      },
      {
        id: "note-003-2",
        author: "Ahmad Saleh",
        date: "2026-06-30",
        text: "Regulatory complexity at site-004 is flagged High with 6 agencies involved. Pre-application meeting with Royal Commission for Jubail & Yanbu scheduled for August.",
      },
      {
        id: "note-003-3",
        author: "Razan Alateeb",
        date: "2026-07-08",
        text: "Air cooling at 60 MW in Eastern region has a higher PUE exposure due to ambient temperatures (peak 48°C). Recommend revisiting dry-bulb assumptions in the energy model before reactivating.",
      },
    ],
    documents: [
      {
        id: "doc-003-1",
        name: "Dammam Edge — Site Selection Report",
        type: "PDF",
        uploadDate: "2026-05-10",
      },
      {
        id: "doc-003-2",
        name: "Air Cooling Energy Model — Eastern Region",
        type: "XLSX",
        uploadDate: "2026-05-20",
      },
      {
        id: "doc-003-3",
        name: "RCJY Pre-Application Checklist",
        type: "DOCX",
        uploadDate: "2026-07-01",
      },
    ],
    aiRecommendations: [
      {
        id: "airec-003-1",
        text: "Site-004 (Dammam 2nd Industrial City) is preferred for this project despite its 9–12 month permitting timeline. Its 200 Gbps multi-path fiber and port connectivity are critical differentiators for an edge data center serving Eastern Province clients.",
        confidence: "High",
      },
      {
        id: "airec-003-2",
        text: "Air cooling in the Eastern region carries a PUE risk of 1.6–1.8 during summer months. Recommend evaluating a hybrid adiabatic cooling supplement to cap worst-case PUE at 1.45, reducing annual energy costs by an estimated 12%.",
        confidence: "Medium",
      },
    ],
  },
];

export function getProjectById(id) {
  return projects.find((p) => p.id === id) ?? null;
}
