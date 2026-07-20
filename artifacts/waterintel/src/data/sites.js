export const sites = [
  {
    id: "site-001",
    name: "Heet Industrial City",
    region: "Riyadh",
    distanceFromRiyadh: 78,
    overallScore: 92,
    rating: "Excellent",
    coordinates: { lat: 24.921, lng: 44.382 },
    waterAccess: {
      score: 94,
      nearestTSELine: "0.8 km",
      availableCapacity: "52,000 m3/day",
      source: "Heet TSE Plant",
    },
    infrastructure: {
      score: 91,
      powerAvailability: "High",
      fiberConnectivity: "Dual-path fiber, 100 Gbps",
      roadAccess: "Direct highway access via Ring Road 8",
    },
    regulatory: {
      score: 89,
      agenciesInvolved: 3,
      estApprovalTime: "4-6 months",
      complexityLevel: "Low",
    },
    coolingImpact: {
      airCooling: "+2,400 m3/day",
      liquidCooling: "+1,800 m3/day",
      immersionCooling: "+900 m3/day",
      dlcCooling: "+1,200 m3/day",
    },
    coolingDetail: {
      air:       { dailyWater: "+2,400 m3/day", energyUsage: "High",   capex: "Low",  opex: "High"   },
      liquid:    { dailyWater: "+1,800 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+900 m3/day",   energyUsage: "Low",    capex: "High", opex: "Low"    },
      dlc:       { dailyWater: "+1,200 m3/day", energyUsage: "Low",    capex: "High", opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Heet TSE Plant", type: "Water Treatment", distance: "0.8 km", status: "Operational" },
      { name: "Saudi Electricity Substation H-7", type: "Power", distance: "1.4 km", status: "Operational" },
      { name: "STCS Fiber Hub", type: "Connectivity", distance: "2.1 km", status: "Operational" },
      { name: "King Khalid Industrial Park", type: "Industrial Zone", distance: "5.3 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 94,
      riskLevel: "Low",
      aiRecommendation:
        "Heet Industrial City benefits from direct proximity to the Heet TSE Plant and a dense cluster of treated sewage effluent infrastructure. Water availability is projected to remain high through 2030 with planned capacity expansions. This site is the strongest water-access candidate in the Riyadh region.",
      nearbyWaterSources: [
        { plant: "Heet TSE Plant", distance: "0.8 km", capacity: "52,000 m3/day", status: "Operational" },
        { plant: "Riyadh North TSE Plant", distance: "12.4 km", capacity: "120,000 m3/day", status: "Operational" },
        { plant: "Riyadh TSE Ring Pipeline Offtake", distance: "18.7 km", capacity: "320,000 m3/day", status: "Operational" },
      ],
      availabilityTimeline: [
        { year: 2025, score: 94 },
        { year: 2026, score: 95 },
        { year: 2028, score: 97 },
        { year: 2030, score: 98 },
      ],
      supportingDocuments: [
        { name: "NWC Water Availability Report – Heet Zone 2024", type: "Regulatory" },
        { name: "SWCC TSE Capacity Study Q3 2024", type: "Technical" },
        { name: "Heet Industrial City Water MOU", type: "Agreement" },
      ],
    },
    infrastructureDetail: {
      electrical: {
        gridOperator: "Saudi Electricity Company",
        substation: "Heet Industrial Substation H-7",
        voltage: "380 kV",
        distance: "1.4 km",
        spareCapacity: "180 MW available",
      },
      fiber: {
        provider: "STC & Mobily (dual carrier)",
        redundancy: "Dual-path, fully redundant",
        bandwidth: "100 Gbps",
        plannedExpansion: "400 Gbps upgrade contracted, delivery Q3 2026",
      },
      transportation: {
        nearestHighway: "Ring Road 8 — direct site access",
        airportDistance: "82 km to King Khalid International Airport",
        logisticsNotes:
          "Direct heavy-vehicle access via Ring Road 8; 24/7 gate operations supported. No access road extension required.",
      },
      industrial: {
        nearbyIndustrialZones: ["King Khalid Industrial Park (5.3 km)", "Heet Technology Cluster (8.1 km)"],
        utilityCorridors: ["Heet Industrial Distribution Main", "Riyadh Power Corridor R-8", "Riyadh TSE Ring Pipeline"],
        existingDataCenters: ["Riyadh DC Campus (18 km)", "STC Hyperscale Hub (22 km)"],
      },
      aiRecommendation:
        "Heet Industrial City leads all evaluated sites on infrastructure readiness. The 380 kV substation at 1.4 km provides 180 MW of immediately available power capacity — well in excess of a typical 50–100 MW hyperscale deployment. Dual-carrier fiber with a contracted 400 Gbps upgrade ensures long-term connectivity headroom. No significant infrastructure constraints identified.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON", role: "Industrial city occupancy licence and zoning clearance" },
        { name: "Saudi Electricity Company (SEC)", role: "Power connection agreement and grid tie-in permit" },
        { name: "NWC", role: "Water supply and TSE allocation agreement" },
      ],
      requiredPermits: [
        "MODON Industrial Occupancy Licence",
        "SEC Power Connection Agreement",
        "NWC Water Allocation Permit",
        "GDCD Fire Safety Certificate",
        "SASO Technical Compliance Certificate",
      ],
      approvalProcess: [
        {
          step: "Initial Application",
          description: "Submit project brief, site plan, and power/water demand schedules to MODON. Obtain preliminary site reservation confirmation.",
          typicalDuration: "2–3 weeks",
        },
        {
          step: "Technical Review",
          description: "MODON engineering team reviews load specifications; SEC assesses substation capacity and connection feasibility.",
          typicalDuration: "4–6 weeks",
        },
        {
          step: "Utility Agreements",
          description: "Negotiate and execute power connection agreement with SEC and water allocation MOU with NWC. Both can proceed in parallel.",
          typicalDuration: "4–6 weeks",
        },
        {
          step: "Building & Safety Permits",
          description: "Submit construction drawings to MODON municipality arm; obtain GDCD fire safety pre-approval and SASO compliance sign-off.",
          typicalDuration: "3–4 weeks",
        },
        {
          step: "Final Licence Issuance",
          description: "MODON issues occupancy licence upon confirmation of utility agreements, safety certificates, and fee settlement.",
          typicalDuration: "1–2 weeks",
        },
      ],
      similarProjects: [
        { name: "Riyadh DC Campus Phase 1", location: "Riyadh Industrial Zone", approvalTime: "5 months" },
        { name: "STC Hyperscale Node", location: "Heet Industrial City", approvalTime: "4 months" },
        { name: "NCA Government Data Center", location: "Riyadh", approvalTime: "6 months" },
      ],
      aiAdvice:
        "The Heet approval path is among the fastest available in Saudi Arabia. MODON's streamlined single-window service for industrial city tenants eliminates the need for separate municipal permits. The only common delay is the SEC power connection agreement — engage SEC's large customer team early and submit your load profile at the same time as the MODON application to run both tracks in parallel. Budget 4–6 months end-to-end.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [
        { name: "Riyadh West Desalination Plant — Phase 2", expectedCapacity: "150,000 m3/day", expectedYear: 2027 },
      ],
      plannedTSEExpansions: [
        { name: "Heet Industrial City TSE Plant — Phase 2 Expansion", expectedCapacity: "85,000 m3/day", expectedYear: 2026 },
        { name: "Riyadh TSE Ring Pipeline Extension (Northern Arc)", expectedCapacity: "+200,000 m3/day throughput", expectedYear: 2028 },
      ],
      infrastructureInvestments: [
        { name: "Heet Substation H-7 Capacity Upgrade (380→500 kV)", amount: "SAR 420M", year: 2026 },
        { name: "STC/Mobily 400 Gbps Fiber Ring Extension to Heet", amount: "SAR 85M", year: 2026 },
        { name: "MODON Industrial City Phase 3 Expansion", amount: "SAR 1.2B", year: 2027 },
        { name: "Riyadh Water Security Master Plan — Northern Zone", amount: "SAR 3.8B", year: 2028 },
      ],
      scoreProjection: [
        { year: 2025, score: 92 },
        { year: 2026, score: 94 },
        { year: 2028, score: 96 },
        { year: 2030, score: 97 },
      ],
      aiPrediction:
        "Heet Industrial City is on track to consolidate its position as the top-ranked data center site in Saudi Arabia. The Phase 2 TSE expansion arriving in 2026 will increase available water capacity by over 60%, effectively eliminating the site's only current bottleneck. The Riyadh TSE Ring Pipeline extension in 2028 adds a second high-volume supply path, reducing single-source risk to near zero. Power upgrades are funded and contracted. Score is projected to reach 96–97 by 2030, constrained only by the practical ceiling of a mature, well-served industrial site.",
    },
  },
  {
    id: "site-002",
    name: "Al-Khair Industrial City",
    region: "Riyadh",
    distanceFromRiyadh: 42,
    overallScore: 85,
    rating: "Excellent",
    coordinates: { lat: 24.612, lng: 46.814 },
    waterAccess: {
      score: 88,
      nearestTSELine: "1.2 km",
      availableCapacity: "45,000 m3/day",
      source: "Al-Khair TSE Plant",
    },
    infrastructure: {
      score: 87,
      powerAvailability: "High",
      fiberConnectivity: "Single-path fiber, 40 Gbps",
      roadAccess: "Access via Eastern Ring Road, 2 km spur road",
    },
    regulatory: {
      score: 82,
      agenciesInvolved: 4,
      estApprovalTime: "6-8 months",
      complexityLevel: "Low",
    },
    coolingImpact: {
      airCooling: "+2,100 m3/day",
      liquidCooling: "+1,550 m3/day",
      immersionCooling: "+780 m3/day",
      dlcCooling: "+1,040 m3/day",
    },
    coolingDetail: {
      air:       { dailyWater: "+2,100 m3/day", energyUsage: "High",   capex: "Low",  opex: "High"   },
      liquid:    { dailyWater: "+1,550 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+780 m3/day",   energyUsage: "Low",    capex: "High", opex: "Low"    },
      dlc:       { dailyWater: "+1,040 m3/day", energyUsage: "Low",    capex: "High", opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Al-Khair TSE Plant", type: "Water Treatment", distance: "1.2 km", status: "Operational" },
      { name: "SWCC Desalination Feeder", type: "Water Treatment", distance: "3.8 km", status: "Operational" },
      { name: "SEC Grid Station K-12", type: "Power", distance: "2.6 km", status: "Operational" },
      { name: "Riyadh Logistics Hub", type: "Logistics", distance: "6.1 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 88,
      riskLevel: "Low",
      aiRecommendation:
        "Al-Khair Industrial City holds a secure water position anchored by its dedicated TSE plant and a SWCC desalination feeder less than 4 km away. Dual-source redundancy reduces supply risk significantly. Capacity is expected to increase with the planned Phase 2 TSE expansion scheduled for 2026.",
      nearbyWaterSources: [
        { plant: "Al-Khair TSE Treatment Plant", distance: "1.2 km", capacity: "45,000 m3/day", status: "Operational" },
        { plant: "SWCC Desalination Feeder", distance: "3.8 km", capacity: "80,000 m3/day", status: "Operational" },
        { plant: "King Fahd Storage Reservoir", distance: "9.1 km", capacity: "500,000 m3 storage", status: "Operational" },
      ],
      availabilityTimeline: [
        { year: 2025, score: 88 },
        { year: 2026, score: 91 },
        { year: 2028, score: 92 },
        { year: 2030, score: 93 },
      ],
      supportingDocuments: [
        { name: "Al-Khair Water Supply Agreement 2023", type: "Agreement" },
        { name: "SWCC Eastern Feeder Capacity Report", type: "Technical" },
        { name: "NWC Riyadh East Infrastructure Plan", type: "Regulatory" },
      ],
    },
    infrastructureDetail: {
      electrical: {
        gridOperator: "Saudi Electricity Company",
        substation: "SEC Grid Station K-12",
        voltage: "380 kV",
        distance: "2.6 km",
        spareCapacity: "140 MW available",
      },
      fiber: {
        provider: "STC (primary carrier)",
        redundancy: "Single-path with planned secondary route",
        bandwidth: "40 Gbps",
        plannedExpansion: "Dual-path upgrade contracted, delivery Q4 2026",
      },
      transportation: {
        nearestHighway: "Eastern Ring Road — 2 km paved spur road",
        airportDistance: "56 km to King Khalid International Airport",
        logisticsNotes:
          "Eastern Ring Road provides strong logistics connectivity. The 2 km spur road may require reinforcement for sustained heavy equipment loads during construction.",
      },
      industrial: {
        nearbyIndustrialZones: ["Riyadh Logistics Hub (6.1 km)", "Eastern Industrial Zone (11.2 km)"],
        utilityCorridors: ["Eastern Ring Road TSE Lateral", "Al-Khair Distribution Spur", "Riyadh Smart Water Network (planned)"],
        existingDataCenters: ["Al-Khair Industrial City DC (co-located)", "Riyadh Central DC (31 km)"],
      },
      aiRecommendation:
        "Al-Khair Industrial City offers strong infrastructure fundamentals with a 380 kV substation at 2.6 km and 140 MW of spare capacity. The primary constraint — a single-path 40 Gbps fiber connection — is being resolved by a contracted dual-path upgrade due Q4 2026. Infrastructure risk is low for initial deployments given existing bandwidth is sufficient for Phase 1.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON", role: "Industrial city occupancy licence and zoning clearance" },
        { name: "Saudi Electricity Company (SEC)", role: "Power connection agreement and capacity reservation" },
        { name: "NWC", role: "Water supply and TSE allocation agreement" },
        { name: "Communications, Space & Technology Commission (CST)", role: "Telecommunications and data infrastructure licensing" },
      ],
      requiredPermits: [
        "MODON Industrial Occupancy Licence",
        "SEC Power Connection Agreement",
        "NWC Water Allocation Permit",
        "CST Data Facility Operating Licence",
        "GDCD Fire Safety Certificate",
        "SASO Technical Compliance Certificate",
      ],
      approvalProcess: [
        {
          step: "Initial Application",
          description: "Submit project documentation to MODON including site plan, technical specifications, and utility demand schedules.",
          typicalDuration: "2–3 weeks",
        },
        {
          step: "Technical & Zoning Review",
          description: "MODON engineering reviews load and land-use requirements; CST reviews connectivity and data sovereignty compliance.",
          typicalDuration: "5–7 weeks",
        },
        {
          step: "Utility Agreements",
          description: "Execute SEC power connection agreement and NWC water allocation MOU. CST operating licence application submitted in parallel.",
          typicalDuration: "5–7 weeks",
        },
        {
          step: "Safety & Compliance Permits",
          description: "GDCD fire safety pre-approval and SASO technical compliance review. Construction drawings reviewed by MODON municipality.",
          typicalDuration: "3–5 weeks",
        },
        {
          step: "Final Licence Issuance",
          description: "MODON issues occupancy licence; CST issues operating licence upon receiving all supporting approvals.",
          typicalDuration: "2–3 weeks",
        },
      ],
      similarProjects: [
        { name: "Riyadh East Hyperscale Campus", location: "Al-Khair Industrial City", approvalTime: "7 months" },
        { name: "Oracle Cloud Region Riyadh", location: "Riyadh Region", approvalTime: "6 months" },
        { name: "Alibaba Cloud KSA DC", location: "Riyadh Industrial Zone", approvalTime: "7 months" },
      ],
      aiAdvice:
        "Al-Khair's approval path adds a CST data facility licence requirement compared to simpler industrial sites — this is non-negotiable for any commercial data center in Saudi Arabia. The CST review typically takes 5–7 weeks and requires a data residency and sovereignty compliance declaration. Submit CST and SEC applications simultaneously with MODON to avoid serialising this path. Allow 6–8 months end-to-end.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [
        { name: "Eastern Riyadh Regional Desalination Hub", expectedCapacity: "100,000 m3/day", expectedYear: 2027 },
      ],
      plannedTSEExpansions: [
        { name: "Al-Khair TSE Plant — Phase 2 Expansion", expectedCapacity: "70,000 m3/day", expectedYear: 2026 },
        { name: "Riyadh Smart Water Network — Eastern Spur", expectedCapacity: "+120,000 m3/day", expectedYear: 2028 },
      ],
      infrastructureInvestments: [
        { name: "Al-Khair Dual-Path Fiber Upgrade (STC secondary route)", amount: "SAR 65M", year: 2026 },
        { name: "Eastern Ring Road Industrial Zone Access Expansion", amount: "SAR 280M", year: 2027 },
        { name: "SEC Riyadh East Grid Reinforcement Programme", amount: "SAR 550M", year: 2027 },
        { name: "NWC Riyadh Smart Water Network Phase 2", amount: "SAR 2.1B", year: 2028 },
      ],
      scoreProjection: [
        { year: 2025, score: 85 },
        { year: 2026, score: 87 },
        { year: 2028, score: 90 },
        { year: 2030, score: 93 },
      ],
      aiPrediction:
        "Al-Khair Industrial City is approaching a step-change in its infrastructure profile. The dual-path fiber upgrade contracted for Q4 2026 resolves the site's most significant current weakness; once delivered, the connectivity score moves from constrained to best-in-class. The Phase 2 TSE expansion adds 70,000 m3/day of additional treated water capacity, and the Eastern Riyadh Desalination Hub in 2027 will provide a high-volume backup supply. Score is projected to reach 90–93 by 2030, closing the gap with Heet meaningfully.",
    },
  },
  {
    id: "site-003",
    name: "Sudair Industrial City",
    region: "Riyadh",
    distanceFromRiyadh: 135,
    overallScore: 78,
    rating: "Good",
    coordinates: { lat: 25.611, lng: 45.573 },
    waterAccess: {
      score: 76,
      nearestTSELine: "3.1 km",
      availableCapacity: "38,000 m3/day",
      source: "Sudair TSE Plant",
    },
    infrastructure: {
      score: 82,
      powerAvailability: "High",
      fiberConnectivity: "Dual-path fiber, 100 Gbps",
      roadAccess: "Direct access via Highway 65",
    },
    regulatory: {
      score: 79,
      agenciesInvolved: 4,
      estApprovalTime: "6-9 months",
      complexityLevel: "Medium",
    },
    coolingImpact: {
      airCooling: "+1,950 m3/day",
      liquidCooling: "+1,420 m3/day",
      immersionCooling: "+710 m3/day",
      dlcCooling: "+950 m3/day",
    },
    coolingDetail: {
      air:       { dailyWater: "+1,950 m3/day", energyUsage: "High",   capex: "Low",  opex: "High"   },
      liquid:    { dailyWater: "+1,420 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+710 m3/day",   energyUsage: "Low",    capex: "High", opex: "Low"    },
      dlc:       { dailyWater: "+950 m3/day",   energyUsage: "Low",    capex: "High", opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Sudair TSE Plant", type: "Water Treatment", distance: "3.1 km", status: "Operational" },
      { name: "SEC Substation S-3", type: "Power", distance: "1.9 km", status: "Operational" },
      { name: "Sudair Techno Valley", type: "Technology Park", distance: "4.2 km", status: "Active" },
      { name: "National Fiber Backbone Node", type: "Connectivity", distance: "5.7 km", status: "Operational" },
    ],
    waterAccessDetail: {
      overallScore: 76,
      riskLevel: "Medium",
      aiRecommendation:
        "Sudair Industrial City has adequate TSE infrastructure but the 3.1 km connection distance introduces moderate supply risk for high-volume data center cooling. A planned pipeline extension in 2026 should improve the rating materially. Securing a water offtake agreement with NWC before commencing construction is strongly advised.",
      nearbyWaterSources: [
        { plant: "Sudair TSE Plant", distance: "3.1 km", capacity: "38,000 m3/day", status: "Operational" },
        { plant: "Riyadh–Qassim Backbone Feeder", distance: "22.5 km", capacity: "180,000 m3/day", status: "Under Construction" },
        { plant: "Sudair Reservoir (Planned)", distance: "5.8 km", capacity: "12,000 m3/day", status: "Under Construction" },
      ],
      availabilityTimeline: [
        { year: 2025, score: 76 },
        { year: 2026, score: 80 },
        { year: 2028, score: 83 },
        { year: 2030, score: 85 },
      ],
      supportingDocuments: [
        { name: "Sudair Industrial Zone Water Study 2023", type: "Technical" },
        { name: "SWCC Pipeline Extension Proposal", type: "Regulatory" },
        { name: "NWC Capacity Reservation Request Form", type: "Agreement" },
      ],
    },
    infrastructureDetail: {
      electrical: {
        gridOperator: "Saudi Electricity Company",
        substation: "SEC Substation S-3",
        voltage: "230 kV",
        distance: "1.9 km",
        spareCapacity: "120 MW available",
      },
      fiber: {
        provider: "STC & Mobily (dual carrier)",
        redundancy: "Dual-path, fully redundant",
        bandwidth: "100 Gbps",
        plannedExpansion: "Direct peering to Riyadh–Qassim Backbone when complete (2026)",
      },
      transportation: {
        nearestHighway: "Highway 65 — direct site access",
        airportDistance: "138 km to King Khalid International Airport",
        logisticsNotes:
          "Highway 65 supports heavy freight; the 135 km distance from Riyadh increases equipment delivery lead times vs. closer Riyadh-region sites.",
      },
      industrial: {
        nearbyIndustrialZones: ["Sudair Techno Valley (4.2 km)", "Sudair Industrial Park (6.8 km)"],
        utilityCorridors: ["Highway 65 TSE Corridor", "Sudair Industrial Feeder", "National Fiber Backbone Node (5.7 km)"],
        existingDataCenters: ["Sudair Techno Valley DC (4.2 km)"],
      },
      aiRecommendation:
        "Sudair has solid infrastructure headroom — 120 MW spare power on a 230 kV substation and dual-path 100 Gbps fiber at 1.9 km. The site's primary drawback is its 135 km distance from Riyadh, which adds cost and time to logistics and ongoing O&M. For a self-contained hyperscale deployment, infrastructure risk is low and manageable.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON", role: "Industrial city occupancy licence and zoning clearance" },
        { name: "Saudi Electricity Company (SEC)", role: "Power connection agreement and 230 kV tie-in permit" },
        { name: "NWC", role: "Water allocation and TSE offtake agreement" },
        { name: "Communications, Space & Technology Commission (CST)", role: "Data facility operating licence" },
        { name: "MEWA", role: "Environmental compliance review for water extraction and usage" },
      ],
      requiredPermits: [
        "MODON Industrial Occupancy Licence",
        "SEC Power Connection Agreement",
        "NWC Water Allocation Permit",
        "CST Data Facility Operating Licence",
        "MEWA Environmental No-Objection Certificate",
        "GDCD Fire Safety Certificate",
        "SASO Technical Standards Certificate",
      ],
      approvalProcess: [
        {
          step: "Initial Application & Site Reservation",
          description: "Submit project brief and demand schedules to MODON. Obtain site reservation letter and begin pre-application meetings with SEC and NWC.",
          typicalDuration: "3–4 weeks",
        },
        {
          step: "Technical & Environmental Screening",
          description: "MODON and MEWA conduct joint technical screening. MEWA assesses water demand sustainability given the 3.1 km TSE connection requirement.",
          typicalDuration: "5–7 weeks",
        },
        {
          step: "Utility Agreements",
          description: "Negotiate SEC power connection and NWC water offtake agreements. NWC may require a written capacity reservation request given TSE connection distance.",
          typicalDuration: "6–8 weeks",
        },
        {
          step: "CST Licence Application",
          description: "Submit data centre operating licence application to CST with data residency, sovereignty, and network resilience documentation.",
          typicalDuration: "5–7 weeks",
        },
        {
          step: "Safety & Building Permits",
          description: "GDCD fire safety review, SASO technical compliance, and MODON municipality building permit review.",
          typicalDuration: "4–5 weeks",
        },
        {
          step: "Final Approvals",
          description: "MODON issues occupancy licence; CST and SEC issue their respective permits upon completion of all prior stages.",
          typicalDuration: "2–3 weeks",
        },
      ],
      similarProjects: [
        { name: "Sudair Techno Valley DC Phase 2", location: "Sudair Industrial City", approvalTime: "8 months" },
        { name: "Google Cloud Riyadh Region", location: "Riyadh Region", approvalTime: "8 months" },
        { name: "Azure KSA North Zone", location: "Riyadh Central", approvalTime: "7 months" },
      ],
      aiAdvice:
        "The MEWA environmental review is the most likely source of delay at Sudair, specifically around the water demand assessment for the 3.1 km TSE connection. Prepare a detailed water demand management plan demonstrating TSE reuse rates and cooling efficiency targets before submitting to MEWA — this substantially shortens the review cycle. Running the CST and MEWA tracks in parallel with the MODON application saves 6–8 weeks. Budget 6–9 months total.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [
        { name: "Sudair Regional Desalination Booster Station", expectedCapacity: "60,000 m3/day", expectedYear: 2028 },
      ],
      plannedTSEExpansions: [
        { name: "Sudair Industrial City TSE Reservoir Completion", expectedCapacity: "20,000 m3/day additional storage", expectedYear: 2026 },
        { name: "Riyadh–Qassim Backbone TSE Offtake at Sudair Junction", expectedCapacity: "+100,000 m3/day access", expectedYear: 2027 },
      ],
      infrastructureInvestments: [
        { name: "Riyadh–Qassim Backbone Fiber Completion (STC)", amount: "SAR 1.1B", year: 2026 },
        { name: "Highway 65 Industrial Zone Interchange Upgrade", amount: "SAR 190M", year: 2026 },
        { name: "Sudair Techno Valley Infrastructure Programme Phase 2", amount: "SAR 850M", year: 2027 },
        { name: "SWCC Sudair Water Security Investment", amount: "SAR 640M", year: 2028 },
      ],
      scoreProjection: [
        { year: 2025, score: 78 },
        { year: 2026, score: 80 },
        { year: 2028, score: 83 },
        { year: 2030, score: 86 },
      ],
      aiPrediction:
        "Sudair Industrial City has a solid medium-term trajectory. The Riyadh–Qassim Backbone fiber completion in 2026 upgrades the site's connectivity significantly and feeds directly into the Sudair node; this alone is expected to add 2–3 points to the score. The TSE reservoir and Backbone offtake together address the 3.1 km water connection distance — the site's primary risk factor. By 2030, Sudair is projected to score 86, positioning it as a credible second-tier site behind Heet and Al-Khair.",
    },
  },
  {
    id: "site-004",
    name: "Dammam 2nd Industrial City",
    region: "Eastern",
    distanceFromRiyadh: 390,
    overallScore: 71,
    rating: "Good",
    coordinates: { lat: 26.394, lng: 49.977 },
    waterAccess: {
      score: 68,
      nearestTSELine: "4.5 km",
      availableCapacity: "29,000 m3/day",
      source: "Jubail Industrial Canal",
    },
    infrastructure: {
      score: 78,
      powerAvailability: "High",
      fiberConnectivity: "Multi-path fiber, 200 Gbps",
      roadAccess: "Highway 40 direct access, port connectivity",
    },
    regulatory: {
      score: 65,
      agenciesInvolved: 6,
      estApprovalTime: "9-12 months",
      complexityLevel: "High",
    },
    coolingImpact: {
      airCooling: "+1,650 m3/day",
      liquidCooling: "+1,200 m3/day",
      immersionCooling: "+600 m3/day",
      dlcCooling: "+800 m3/day",
    },
    coolingDetail: {
      air:       { dailyWater: "+1,650 m3/day", energyUsage: "High",   capex: "Low",  opex: "High"   },
      liquid:    { dailyWater: "+1,200 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+600 m3/day",   energyUsage: "Low",    capex: "High", opex: "Low"    },
      dlc:       { dailyWater: "+800 m3/day",   energyUsage: "Low",    capex: "High", opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Jubail Industrial Canal", type: "Water Source", distance: "4.5 km", status: "Operational" },
      { name: "Dammam Port Authority Hub", type: "Logistics", distance: "8.2 km", status: "Active" },
      { name: "ARAMCO Substation D-22", type: "Power", distance: "2.3 km", status: "Operational" },
      { name: "Eastern Province Fiber Ring", type: "Connectivity", distance: "1.1 km", status: "Operational" },
    ],
    waterAccessDetail: {
      overallScore: 68,
      riskLevel: "Medium",
      aiRecommendation:
        "Dammam 2nd Industrial City relies primarily on the Jubail Industrial Canal, which is at approximately 72% utilization and subject to seasonal variation. The Eastern Province's growing industrial demand is adding pressure to existing supply. An agreement with the Royal Commission for Jubail & Yanbu is advised before locking in this site.",
      nearbyWaterSources: [
        { plant: "Dammam TSE Treatment Facility", distance: "4.5 km", capacity: "31,000 m3/day", status: "Operational" },
        { plant: "Jubail Phase 3 Desalination Plant", distance: "18.2 km", capacity: "800,000 m3/day", status: "Operational" },
        { plant: "Dammam Municipal Reservoir", distance: "9.7 km", capacity: "200,000 m3 storage", status: "Operational" },
      ],
      availabilityTimeline: [
        { year: 2025, score: 68 },
        { year: 2026, score: 65 },
        { year: 2028, score: 70 },
        { year: 2030, score: 74 },
      ],
      supportingDocuments: [
        { name: "RCJY Water Allocation Policy 2024", type: "Regulatory" },
        { name: "Eastern Province Water Demand Forecast", type: "Technical" },
        { name: "Jubail Canal Environmental Impact Study", type: "Compliance" },
      ],
    },
    infrastructureDetail: {
      electrical: {
        gridOperator: "Saudi Electricity Company — Eastern Region",
        substation: "ARAMCO Substation D-22",
        voltage: "380 kV",
        distance: "2.3 km",
        spareCapacity: "95 MW available",
      },
      fiber: {
        provider: "STC, Mobily & Zain (triple carrier)",
        redundancy: "Multi-path, fully redundant",
        bandwidth: "200 Gbps",
        plannedExpansion: "Subsea cable landing station integration planned for 2027",
      },
      transportation: {
        nearestHighway: "Highway 40 — direct site access",
        airportDistance: "28 km to King Fahd International Airport",
        logisticsNotes:
          "Excellent port connectivity via Dammam Port Authority (8.2 km); supports large equipment imports without overland long-haul. Best logistics profile of all evaluated sites.",
      },
      industrial: {
        nearbyIndustrialZones: ["Dammam 2nd Industrial City (co-located)", "ARAMCO Industrial Precinct (12 km)"],
        utilityCorridors: ["Eastern Province TSE Ring", "Eastern Province Fiber Ring (1.1 km)", "Eastern Province Water Transmission Main"],
        existingDataCenters: ["Dammam Edge Data Center (14 km)", "ARAMCO IT Hub (16 km)"],
      },
      aiRecommendation:
        "Dammam 2nd Industrial City offers the best fiber diversity of all evaluated sites — three carriers with 200 Gbps and planned subsea integration. Port access is a significant logistics advantage for large-scale hardware imports. Electrical capacity at 95 MW spare is adequate but tighter than Riyadh-region sites; early power reservation is recommended.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON", role: "Industrial city occupancy licence for Eastern Province zone" },
        { name: "Saudi Electricity Company (SEC)", role: "Power connection agreement — Eastern Region grid" },
        { name: "NWC / RCJY", role: "Water allocation from Jubail Industrial Canal under Royal Commission framework" },
        { name: "Communications, Space & Technology Commission (CST)", role: "Data facility operating licence and network resilience certification" },
        { name: "MEWA", role: "Environmental impact assessment for water usage and coastal proximity" },
        { name: "Saudi Customs Authority", role: "Equipment import clearance for large server and cooling infrastructure" },
      ],
      requiredPermits: [
        "MODON Industrial Occupancy Licence (Eastern Province)",
        "SEC Power Connection Agreement",
        "RCJY Water Allocation Permit",
        "CST Data Facility Operating Licence",
        "MEWA Environmental Impact Assessment Clearance",
        "Saudi Customs Equipment Import Permit",
        "GDCD Fire Safety Certificate",
        "SASO Technical Compliance Certificate",
        "Dammam Municipal Building Permit",
      ],
      approvalProcess: [
        {
          step: "Pre-Application & Stakeholder Meetings",
          description: "Conduct pre-application meetings with MODON Eastern Region, RCJY water desk, and SEC Eastern Region. Align on water allocation capacity before formal submission.",
          typicalDuration: "4–6 weeks",
        },
        {
          step: "MODON Application & Zoning Review",
          description: "Submit full project documentation. MODON Eastern Region reviews land use, load demand, and site plan against industrial city master plan.",
          typicalDuration: "6–8 weeks",
        },
        {
          step: "MEWA Environmental Assessment",
          description: "Full environmental impact assessment required given coastal proximity and industrial water usage. Public consultation period may be triggered.",
          typicalDuration: "8–10 weeks",
        },
        {
          step: "Utility Agreements",
          description: "Negotiate SEC Eastern Region power connection and RCJY water allocation agreement. Both require separate technical reviews and can run concurrently.",
          typicalDuration: "6–8 weeks",
        },
        {
          step: "CST Licence & Import Clearance",
          description: "Submit CST data facility licence application with sovereignty and resilience documentation. Initiate Saudi Customs pre-clearance for planned equipment imports.",
          typicalDuration: "6–7 weeks",
        },
        {
          step: "Safety, Building & Final Permits",
          description: "GDCD fire safety, SASO compliance, municipal building permit. Final coordination between MODON, CST, and SEC for simultaneous licence issuance.",
          typicalDuration: "4–5 weeks",
        },
      ],
      similarProjects: [
        { name: "Dammam Edge Data Center", location: "Dammam Industrial Zone", approvalTime: "11 months" },
        { name: "AWS Eastern Province Zone", location: "Eastern Province", approvalTime: "10 months" },
        { name: "center3 Dammam Campus", location: "Dammam", approvalTime: "12 months" },
      ],
      aiAdvice:
        "The two main delay risks at Dammam are the MEWA environmental assessment (especially its public consultation requirement near the coast) and the RCJY water allocation negotiation, which has its own independent approval track outside standard MODON channels. Engage RCJY directly and early — do not assume NWC handles this. Brief your EIA consultant on coastal industrial zone requirements before submission. Running SEC, RCJY, CST, and MEWA tracks concurrently after MODON intake is the only way to achieve 9–12 months rather than 15+.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [
        { name: "Jubail Phase 3 Desalination Plant Expansion", expectedCapacity: "+200,000 m3/day incremental", expectedYear: 2027 },
        { name: "Eastern Province Coastal Desalination Hub", expectedCapacity: "500,000 m3/day", expectedYear: 2030 },
      ],
      plannedTSEExpansions: [
        { name: "Dammam Eastern TSE Ring Extension", expectedCapacity: "55,000 m3/day", expectedYear: 2027 },
      ],
      infrastructureInvestments: [
        { name: "SEC Eastern Region Grid Reinforcement Programme", amount: "SAR 1.6B", year: 2026 },
        { name: "Eastern Province Subsea Cable Landing Station", amount: "SAR 2.3B", year: 2027 },
        { name: "Dammam 2nd Industrial City Phase 4 Expansion", amount: "SAR 4.8B", year: 2028 },
        { name: "SWCC Eastern Province Desalination Integration Network", amount: "SAR 3.1B", year: 2029 },
      ],
      scoreProjection: [
        { year: 2025, score: 71 },
        { year: 2026, score: 72 },
        { year: 2028, score: 75 },
        { year: 2030, score: 77 },
      ],
      aiPrediction:
        "Dammam 2nd Industrial City's forecast improvement is real but modest — the Eastern Province's infrastructure expansion programme is large and well-funded, but much of it addresses the region's existing industrial base rather than creating new data center headroom. The Jubail Phase 3 desalination expansion in 2027 will ease the water supply pressure, and the subsea cable landing station in 2027 is a major connectivity upgrade. However, water allocation constraints under RCJY and the tighter 95 MW spare power capacity remain partial bottlenecks through 2030.",
    },
  },
  {
    id: "site-005",
    name: "Qassim Industrial City",
    region: "Qassim",
    distanceFromRiyadh: 320,
    overallScore: 63,
    rating: "Moderate",
    coordinates: { lat: 26.328, lng: 43.974 },
    waterAccess: {
      score: 59,
      nearestTSELine: "6.2 km",
      availableCapacity: "22,000 m3/day",
      source: "Buraydah Municipal TSE",
    },
    infrastructure: {
      score: 66,
      powerAvailability: "Medium",
      fiberConnectivity: "Single-path fiber, 20 Gbps",
      roadAccess: "Access via Highway 60, 4 km regional road",
    },
    regulatory: {
      score: 61,
      agenciesInvolved: 5,
      estApprovalTime: "8-12 months",
      complexityLevel: "Medium",
    },
    coolingImpact: {
      airCooling: "+1,300 m3/day",
      liquidCooling: "+960 m3/day",
      immersionCooling: "+480 m3/day",
      dlcCooling: "+640 m3/day",
    },
    coolingDetail: {
      air:       { dailyWater: "+1,300 m3/day", energyUsage: "High",   capex: "Low",  opex: "High"   },
      liquid:    { dailyWater: "+960 m3/day",   energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+480 m3/day",   energyUsage: "Low",    capex: "High", opex: "Low"    },
      dlc:       { dailyWater: "+640 m3/day",   energyUsage: "Low",    capex: "High", opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Buraydah Municipal TSE", type: "Water Treatment", distance: "6.2 km", status: "Operational" },
      { name: "SEC Grid Station Q-5", type: "Power", distance: "4.1 km", status: "Operational" },
      { name: "Qassim University Research Park", type: "Technology Park", distance: "9.8 km", status: "Active" },
      { name: "STC Regional Node Buraydah", type: "Connectivity", distance: "7.3 km", status: "Operational" },
    ],
    waterAccessDetail: {
      overallScore: 59,
      riskLevel: "High",
      aiRecommendation:
        "Qassim Industrial City faces constrained water access due to limited TSE capacity in the Buraydah municipal network and no direct desalination connectivity. The 6.2 km TSE line distance elevates supply risk considerably. A dedicated water supply MOU with NWC and investment in on-site storage is strongly recommended before committing to this site.",
      nearbyWaterSources: [
        { plant: "Buraydah Municipal TSE Facility", distance: "6.2 km", capacity: "22,000 m3/day", status: "Operational" },
        { plant: "Qassim Desalination Booster Station", distance: "28.4 km", capacity: "45,000 m3/day", status: "Under Construction" },
        { plant: "Qassim Integrated TSE Hub", distance: "14.9 km", capacity: "60,000 m3/day", status: "Under Construction" },
      ],
      availabilityTimeline: [
        { year: 2025, score: 59 },
        { year: 2026, score: 58 },
        { year: 2028, score: 63 },
        { year: 2030, score: 68 },
      ],
      supportingDocuments: [
        { name: "NWC Qassim Region Water Audit 2023", type: "Technical" },
        { name: "MEWA Water Stress Assessment – Qassim", type: "Regulatory" },
        { name: "Buraydah TSE Expansion Feasibility Study", type: "Technical" },
      ],
    },
    infrastructureDetail: {
      electrical: {
        gridOperator: "Saudi Electricity Company",
        substation: "SEC Grid Station Q-5",
        voltage: "132 kV",
        distance: "4.1 km",
        spareCapacity: "45 MW available",
      },
      fiber: {
        provider: "STC (single carrier)",
        redundancy: "Single-path, no redundancy",
        bandwidth: "20 Gbps",
        plannedExpansion: "Riyadh–Qassim Backbone Feeder will add 100 Gbps when complete (est. 2026)",
      },
      transportation: {
        nearestHighway: "Highway 60 — 4 km regional road",
        airportDistance: "22 km to Prince Nayef bin Abdulaziz Airport",
        logisticsNotes:
          "4 km regional road is partially unpaved and suitable for light freight only. Road upgrade is scheduled for 2026 as part of the industrial city expansion programme.",
      },
      industrial: {
        nearbyIndustrialZones: ["Qassim Industrial City (co-located)", "Unayzah Light Industry Zone (28 km)"],
        utilityCorridors: ["Qassim Regional TSE Network", "Buraydah North Distribution"],
        existingDataCenters: ["Qassim University Research DC (9.8 km)"],
      },
      aiRecommendation:
        "Qassim Industrial City's infrastructure is constrained at present — 45 MW of spare capacity on a 132 kV substation, single-path fiber at 20 Gbps, and a partially unpaved access road. However, the Riyadh–Qassim Backbone Feeder completion in 2026 will substantially upgrade connectivity. For deployments planned post-2026, the infrastructure profile improves significantly.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON", role: "Industrial city occupancy licence and zoning clearance" },
        { name: "Saudi Electricity Company (SEC)", role: "Power connection agreement — 132 kV grid capacity review" },
        { name: "NWC", role: "Water supply MOU and TSE connection feasibility for 6.2 km line" },
        { name: "Communications, Space & Technology Commission (CST)", role: "Data facility operating licence" },
        { name: "MEWA", role: "Water stress assessment and environmental compliance — water-scarce region" },
        { name: "Qassim Regional Municipality", role: "Building permit and road access upgrade approval" },
      ],
      requiredPermits: [
        "MODON Industrial Occupancy Licence",
        "SEC Power Connection Agreement",
        "NWC Water Allocation Permit",
        "CST Data Facility Operating Licence",
        "MEWA Environmental No-Objection Certificate",
        "MEWA Water Stress Zone Exemption",
        "Qassim Municipality Building Permit",
        "GDCD Fire Safety Certificate",
        "SASO Technical Compliance Certificate",
      ],
      approvalProcess: [
        {
          step: "Pre-Application & Water Feasibility",
          description: "Before formal MODON application, obtain NWC feasibility assessment for the 6.2 km TSE connection. This determines whether a water-stress zone exemption is required from MEWA.",
          typicalDuration: "4–6 weeks",
        },
        {
          step: "MODON Application & Zoning Review",
          description: "Submit full project documentation including NWC feasibility letter and water demand justification. MODON reviews land use and load requirements.",
          typicalDuration: "6–8 weeks",
        },
        {
          step: "MEWA Environmental & Water-Stress Review",
          description: "MEWA assesses water demand in a designated water-stress zone. A water demand management plan is mandatory. Possible site visit and public review.",
          typicalDuration: "8–10 weeks",
        },
        {
          step: "Utility Agreements",
          description: "Negotiate SEC 132 kV connection agreement (capacity may need to be reserved against grid upgrade programme) and NWC water allocation agreement.",
          typicalDuration: "7–9 weeks",
        },
        {
          step: "CST Licence & Municipal Permits",
          description: "Submit CST data facility application; apply to Qassim municipality for building permit and road access upgrade authorisation.",
          typicalDuration: "6–8 weeks",
        },
        {
          step: "Safety Permits & Final Approval",
          description: "GDCD fire safety and SASO technical review. MODON issues final occupancy licence upon receipt of all utility and safety confirmations.",
          typicalDuration: "3–4 weeks",
        },
      ],
      similarProjects: [
        { name: "Qassim University Research DC", location: "Buraydah, Qassim", approvalTime: "10 months" },
        { name: "STC Qassim Regional Node Expansion", location: "Qassim", approvalTime: "9 months" },
        { name: "NCA Disaster Recovery Site", location: "Qassim Region", approvalTime: "12 months" },
      ],
      aiAdvice:
        "The MEWA water-stress zone designation for the Qassim region is the single biggest risk in this approval path. Projects that submitted without a pre-approved water demand management plan have experienced 3–4 month delays during MEWA review. Engage a qualified water management consultant to prepare this plan before the MODON application and submit it to MEWA in parallel. Also note that SEC's 132 kV connection may require a capacity reservation under the grid upgrade programme — obtain SEC's written capacity confirmation before finalising the site.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [
        { name: "Qassim Regional Desalination Booster Station", expectedCapacity: "45,000 m3/day", expectedYear: 2027 },
      ],
      plannedTSEExpansions: [
        { name: "Buraydah Municipal TSE Network — Phase 2 Expansion", expectedCapacity: "35,000 m3/day", expectedYear: 2026 },
        { name: "Qassim Integrated TSE Hub", expectedCapacity: "60,000 m3/day", expectedYear: 2028 },
      ],
      infrastructureInvestments: [
        { name: "Riyadh–Qassim Backbone Fiber Completion (STC)", amount: "SAR 1.1B", year: 2026 },
        { name: "Qassim Industrial City Access Road Upgrade", amount: "SAR 95M", year: 2026 },
        { name: "SEC Q-5 Substation Upgrade to 230 kV", amount: "SAR 380M", year: 2028 },
        { name: "MEWA Qassim Water Security Programme", amount: "SAR 1.4B", year: 2029 },
      ],
      scoreProjection: [
        { year: 2025, score: 63 },
        { year: 2026, score: 64 },
        { year: 2028, score: 67 },
        { year: 2030, score: 71 },
      ],
      aiPrediction:
        "Qassim Industrial City's trajectory is meaningful but gated on infrastructure delivery timing. The Riyadh–Qassim Backbone fiber completion in 2026 is the highest-impact near-term event — it solves the connectivity constraint entirely. The SEC substation upgrade to 230 kV in 2028 will roughly triple available power capacity, which is the most important improvement for data center viability. Water remains a structural constraint through at least 2027; the Qassim Integrated TSE Hub in 2028 is the key inflection. Score is projected to reach 71 by 2030, making this a viable site for post-2028 developments.",
    },
  },
  {
    id: "site-006",
    name: "Jubail 3rd Industrial City",
    region: "Eastern",
    distanceFromRiyadh: 420,
    overallScore: 55,
    rating: "Moderate",
    coordinates: { lat: 27.004, lng: 49.651 },
    waterAccess: {
      score: 52,
      nearestTSELine: "8.7 km",
      availableCapacity: "18,500 m3/day",
      source: "Jubail Royal Commission TSE",
    },
    infrastructure: {
      score: 61,
      powerAvailability: "Medium",
      fiberConnectivity: "Planned dual-path, 10 Gbps current",
      roadAccess: "Industrial bypass road, 7 km from Highway 95",
    },
    regulatory: {
      score: 53,
      agenciesInvolved: 7,
      estApprovalTime: "12-18 months",
      complexityLevel: "High",
    },
    coolingImpact: {
      airCooling: "+1,100 m3/day",
      liquidCooling: "+800 m3/day",
      immersionCooling: "+400 m3/day",
      dlcCooling: "+535 m3/day",
    },
    coolingDetail: {
      air:       { dailyWater: "+1,100 m3/day", energyUsage: "High",   capex: "Low",  opex: "High"   },
      liquid:    { dailyWater: "+800 m3/day",   energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+400 m3/day",   energyUsage: "Low",    capex: "High", opex: "Low"    },
      dlc:       { dailyWater: "+535 m3/day",   energyUsage: "Low",    capex: "High", opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Jubail Royal Commission TSE", type: "Water Treatment", distance: "8.7 km", status: "Operational" },
      { name: "Sadara Chemical Substation", type: "Power", distance: "5.4 km", status: "Operational" },
      { name: "Jubail Commercial Port", type: "Logistics", distance: "12.1 km", status: "Active" },
      { name: "SABIC Fiber Network Node", type: "Connectivity", distance: "6.9 km", status: "Operational" },
    ],
    waterAccessDetail: {
      overallScore: 52,
      riskLevel: "High",
      aiRecommendation:
        "Jubail 3rd Industrial City has significant water access challenges, with the nearest TSE source nearly 9 km away and constrained industrial-use allocations under Royal Commission regulations. A phased development approach using air cooling initially is strongly advised while water infrastructure is expanded under the RCJY 2026 capacity programme.",
      nearbyWaterSources: [
        { plant: "Jubail Royal Commission TSE Plant", distance: "8.7 km", capacity: "18,500 m3/day", status: "Operational" },
        { plant: "Jubail Phase 3 Desalination Plant", distance: "24.1 km", capacity: "800,000 m3/day", status: "Operational" },
        { plant: "Ras Al-Khair Desalination Plant", distance: "38.5 km", capacity: "1,036,000 m3/day", status: "Operational" },
      ],
      availabilityTimeline: [
        { year: 2025, score: 52 },
        { year: 2026, score: 50 },
        { year: 2028, score: 55 },
        { year: 2030, score: 60 },
      ],
      supportingDocuments: [
        { name: "RCJY Industrial Water Allocation Policy", type: "Regulatory" },
        { name: "Jubail 3rd Zone Infrastructure Report 2024", type: "Technical" },
        { name: "MEWA Coastal Water Use Guidelines", type: "Compliance" },
      ],
    },
    infrastructureDetail: {
      electrical: {
        gridOperator: "Saudi Electricity Company — Eastern Region",
        substation: "Sadara Chemical Substation (shared)",
        voltage: "132 kV",
        distance: "5.4 km",
        spareCapacity: "35 MW available",
      },
      fiber: {
        provider: "SABIC Fiber Network (industrial network)",
        redundancy: "Single-path, industrial network only",
        bandwidth: "10 Gbps",
        plannedExpansion: "Commercial dual-path planned under RCJY Phase 3 development (est. 2028)",
      },
      transportation: {
        nearestHighway: "Highway 95 — 7 km industrial bypass road",
        airportDistance: "62 km to King Fahd International Airport",
        logisticsNotes:
          "Industrial bypass road is serviceable but not designed for high-frequency logistics. Jubail Commercial Port (12.1 km) provides an alternative route for large hardware imports.",
      },
      industrial: {
        nearbyIndustrialZones: ["Jubail 3rd Industrial City (co-located)", "Sadara Chemical Complex (adjacent)"],
        utilityCorridors: ["Jubail Industrial Zone TSE Loop", "Sadara Chemical Complex Feeder"],
        existingDataCenters: ["Jubail 3rd Industrial City DC (planned, not operational)"],
      },
      aiRecommendation:
        "Jubail 3rd Industrial City is currently infrastructure-constrained — 35 MW spare capacity on a shared 132 kV substation, 10 Gbps industrial-only fiber, and a 7 km bypass to the highway. The RCJY Phase 3 development programme is expected to address fiber and road constraints by 2028. Re-evaluate after those improvements are confirmed.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "Royal Commission for Jubail & Yanbu (RCJY)", role: "Primary approving authority — all development within Jubail Industrial City requires RCJY approval" },
        { name: "MODON", role: "Secondary registration for MODON-zone sections of the industrial city" },
        { name: "Saudi Electricity Company (SEC)", role: "Power connection to shared Sadara substation — requires RCJY coordination" },
        { name: "RCJY Water Authority", role: "Water allocation from Jubail Royal Commission TSE network" },
        { name: "Communications, Space & Technology Commission (CST)", role: "Data facility operating licence — requires RCJY network integration sign-off" },
        { name: "MEWA", role: "Full environmental impact assessment — industrial coastal zone classification" },
        { name: "Saudi Customs Authority", role: "Import clearance for server, cooling, and power infrastructure" },
      ],
      requiredPermits: [
        "RCJY Development Permit (primary)",
        "MODON Secondary Zone Registration",
        "SEC Power Connection Agreement (via RCJY)",
        "RCJY Water Allocation Certificate",
        "CST Data Facility Operating Licence",
        "MEWA Full Environmental Impact Assessment Clearance",
        "Saudi Customs Equipment Import Permit",
        "GDCD Fire Safety Certificate",
        "SASO Technical Compliance Certificate",
        "RCJY Industrial Safety Compliance Certificate",
        "Port Authority Access Permit (Jubail Commercial Port)",
      ],
      approvalProcess: [
        {
          step: "RCJY Pre-Application Consultation",
          description: "Mandatory pre-consultation with RCJY Planning & Development Authority. RCJY determines whether the site falls within their direct jurisdiction or MODON's — this affects the entire approval path.",
          typicalDuration: "4–6 weeks",
        },
        {
          step: "Environmental Impact Assessment",
          description: "Full MEWA EIA mandatory for any development in Jubail coastal industrial zone. EIA must address water demand, industrial runoff, and cumulative coastal impact. Public consultation period included.",
          typicalDuration: "10–14 weeks",
        },
        {
          step: "RCJY Technical & Land-Use Review",
          description: "RCJY engineering and planning division reviews the project against the Jubail Industrial City master plan. Requires EIA clearance before proceeding.",
          typicalDuration: "7–9 weeks",
        },
        {
          step: "Utility Agreements",
          description: "SEC power agreement requires RCJY sign-off on shared substation capacity. RCJY Water Authority issues water allocation certificate separately from NWC.",
          typicalDuration: "8–10 weeks",
        },
        {
          step: "CST Licence & Safety Permits",
          description: "Submit CST data facility licence; GDCD fire safety and SASO technical compliance reviews. RCJY Industrial Safety office conducts independent safety inspection.",
          typicalDuration: "6–8 weeks",
        },
        {
          step: "RCJY Final Development Permit",
          description: "RCJY issues the primary development permit only after all preceding approvals are confirmed. MODON secondary registration follows within 2 weeks.",
          typicalDuration: "3–4 weeks",
        },
      ],
      similarProjects: [
        { name: "Jubail Industrial City Data Hub", location: "Jubail 1st Industrial City", approvalTime: "16 months" },
        { name: "SABIC Digital Operations Centre", location: "Jubail", approvalTime: "14 months" },
        { name: "Gulf Data Hub Jubail", location: "Eastern Province", approvalTime: "18 months" },
      ],
      aiAdvice:
        "RCJY approval is fundamentally different from a standard MODON process — RCJY acts as a quasi-sovereign authority within Jubail and all utility agreements must be routed through them, not directly through NWC or SEC. The MEWA EIA for the Jubail coastal zone is the longest single step (10–14 weeks) and cannot be shortened. Start the EIA immediately after the RCJY pre-consultation. Do not begin any other approval track until you have RCJY's formal confirmation of which zone classification applies to your specific plot — the answer changes the permit list significantly.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [
        { name: "Jubail Phase 3 Desalination Expansion", expectedCapacity: "+200,000 m3/day incremental", expectedYear: 2027 },
      ],
      plannedTSEExpansions: [
        { name: "RCJY Jubail 3rd Zone TSE Phase 3 Network", expectedCapacity: "45,000 m3/day", expectedYear: 2028 },
      ],
      infrastructureInvestments: [
        { name: "RCJY Jubail Phase 3 Industrial City Development Programme", amount: "SAR 18B", year: 2028 },
        { name: "Jubail Commercial Port Phase 2 Expansion", amount: "SAR 3.2B", year: 2027 },
        { name: "Jubail 3rd Zone Commercial Dual-Path Fiber Deployment", amount: "SAR 450M", year: 2028 },
        { name: "Sadara Substation Capacity Expansion (shared)", amount: "SAR 680M", year: 2029 },
      ],
      scoreProjection: [
        { year: 2025, score: 55 },
        { year: 2026, score: 56 },
        { year: 2028, score: 59 },
        { year: 2030, score: 63 },
      ],
      aiPrediction:
        "Jubail 3rd Industrial City's improvement depends almost entirely on the RCJY Phase 3 development programme, a SAR 18B investment that begins substantive delivery from 2028. Until then, the site's infrastructure profile changes minimally — the 2026 score barely moves because the Phase 3 works are in procurement and design. The commercial fiber deployment in 2028 solves the current industrial-only 10 Gbps constraint, and the TSE Phase 3 network brings water availability up from critical to adequate. Score is projected to reach 63 by 2030, but this is highly contingent on RCJY Phase 3 staying on schedule.",
    },
  },
  {
    id: "site-007",
    name: "Afif Technology Industrial Zone",
    region: "Riyadh",
    distanceFromRiyadh: 262,
    overallScore: 41,
    rating: "Poor",
    coordinates: { lat: 23.917, lng: 42.927 },
    waterAccess: {
      score: 35,
      nearestTSELine: "14.3 km",
      availableCapacity: "9,800 m3/day",
      source: "Afif Municipal Treatment Plant",
    },
    infrastructure: {
      score: 44,
      powerAvailability: "Low",
      fiberConnectivity: "No direct fiber, microwave link only",
      roadAccess: "Unpaved access road, 12 km from Highway 40",
    },
    regulatory: {
      score: 48,
      agenciesInvolved: 5,
      estApprovalTime: "14-20 months",
      complexityLevel: "High",
    },
    coolingImpact: {
      airCooling: "+680 m3/day",
      liquidCooling: "+490 m3/day",
      immersionCooling: "+245 m3/day",
      dlcCooling: "+330 m3/day",
    },
    coolingDetail: {
      air:       { dailyWater: "+680 m3/day",  energyUsage: "High",   capex: "Low",  opex: "High"   },
      liquid:    { dailyWater: "+490 m3/day",  energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+245 m3/day",  energyUsage: "Low",    capex: "High", opex: "Low"    },
      dlc:       { dailyWater: "+330 m3/day",  energyUsage: "Low",    capex: "High", opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Afif Municipal Treatment Plant", type: "Water Treatment", distance: "14.3 km", status: "Limited Capacity" },
      { name: "SEC Rural Feeder AF-2", type: "Power", distance: "9.8 km", status: "Constrained" },
      { name: "Afif Regional Airstrip", type: "Logistics", distance: "18.5 km", status: "Active" },
      { name: "Microwave Relay Tower A-7", type: "Connectivity", distance: "3.2 km", status: "Operational" },
    ],
    waterAccessDetail: {
      overallScore: 35,
      riskLevel: "High",
      aiRecommendation:
        "Afif Technology Industrial Zone is in a critical water-stress region with severely limited TSE infrastructure. The municipal treatment plant is at capacity and the 14.3 km distance makes direct connection prohibitively expensive. This site should only be considered if a dedicated NWC supply agreement or brackish-water treatment facility can be secured first.",
      nearbyWaterSources: [
        { plant: "Afif Municipal Treatment Plant", distance: "14.3 km", capacity: "9,800 m3/day", status: "Limited Capacity" },
        { plant: "Afif Regional Water Treatment Upgrade", distance: "14.3 km", capacity: "25,000 m3/day", status: "Planned" },
        { plant: "Riyadh–Qassim Backbone Feeder", distance: "82.4 km", capacity: "180,000 m3/day", status: "Under Construction" },
      ],
      availabilityTimeline: [
        { year: 2025, score: 35 },
        { year: 2026, score: 33 },
        { year: 2028, score: 38 },
        { year: 2030, score: 42 },
      ],
      supportingDocuments: [
        { name: "MEWA Water Stress Map – Afif Region 2024", type: "Regulatory" },
        { name: "Afif Groundwater Survey 2023", type: "Technical" },
        { name: "NWC Expansion Feasibility – Afif Zone", type: "Technical" },
      ],
    },
    infrastructureDetail: {
      electrical: {
        gridOperator: "Saudi Electricity Company",
        substation: "SEC Rural Feeder AF-2",
        voltage: "33 kV",
        distance: "9.8 km",
        spareCapacity: "8 MW available",
      },
      fiber: {
        provider: "None (microwave relay only)",
        redundancy: "No fiber — single-path microwave link",
        bandwidth: "~1 Gbps (microwave)",
        plannedExpansion: "No fiber extension on current NWC or STC infrastructure roadmap",
      },
      transportation: {
        nearestHighway: "Highway 40 — 12 km unpaved access road",
        airportDistance: "18.5 km to Afif Regional Airstrip (limited cargo capacity)",
        logisticsNotes:
          "Unpaved access road severely limits construction logistics. No rail or port access. Nearest paved highway is 12 km of unmaintained desert track.",
      },
      industrial: {
        nearbyIndustrialZones: ["Afif Regional Industrial Area (21 km)"],
        utilityCorridors: ["Highway 40 TSE Lateral (Proposed, not funded)"],
        existingDataCenters: [],
      },
      aiRecommendation:
        "Afif Technology Industrial Zone has critical infrastructure deficiencies. 8 MW of available power on a 33 kV rural feeder is insufficient for any meaningful data center load, and the complete absence of fiber connectivity is a fundamental barrier. Significant capital investment in transmission infrastructure and fiber deployment would be required before this site is viable.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MEWA", role: "Water-stress zone assessment, water usage permit, and environmental compliance for undeveloped desert region" },
        { name: "Saudi Electricity Company (SEC)", role: "Rural grid capacity assessment and transmission upgrade agreement — 33 kV to minimum 132 kV upgrade required" },
        { name: "NWC", role: "Water infrastructure extension feasibility for 14.3 km TSE connection" },
        { name: "Afif Municipal Council", role: "Building permit and road access development approval" },
        { name: "Communications, Space & Technology Commission (CST)", role: "Data facility operating licence and connectivity infrastructure review" },
        { name: "Ministry of Transport and Logistic Services", role: "Road construction permit for 12 km access road upgrade" },
      ],
      requiredPermits: [
        "MEWA Water Usage Permit (Water-Stress Zone)",
        "MEWA Environmental Clearance Certificate",
        "SEC Rural Grid Capacity Upgrade Agreement",
        "NWC Water Infrastructure Extension Agreement",
        "CST Data Facility Operating Licence",
        "Afif Municipal Building Permit",
        "Ministry of Transport Road Construction Permit",
        "GDCD Fire Safety Certificate",
        "SASO Technical Compliance Certificate",
        "NCA Security Clearance for Remote Facility",
      ],
      approvalProcess: [
        {
          step: "Pre-Feasibility & Infrastructure Assessment",
          description: "Before any formal application, SEC must confirm whether a 33→132 kV grid upgrade is feasible and on what timeline. NWC must confirm TSE extension feasibility. Both are prerequisites — proceed only if both are positive.",
          typicalDuration: "8–12 weeks",
        },
        {
          step: "MEWA Water & Environmental Review",
          description: "Full water-stress zone assessment and environmental impact study for undeveloped desert region. Includes soil and groundwater impact analysis. Extended public consultation likely.",
          typicalDuration: "12–16 weeks",
        },
        {
          step: "Infrastructure Upgrade Agreements",
          description: "Negotiate SEC grid upgrade agreement (applicant may need to partially fund transmission works) and NWC water extension agreement. Road construction permit from Ministry of Transport.",
          typicalDuration: "10–12 weeks",
        },
        {
          step: "Municipal & Planning Approvals",
          description: "Afif Municipal Council building permit and land-use change approval. NCA security clearance for remote desert facility.",
          typicalDuration: "6–8 weeks",
        },
        {
          step: "CST & Safety Permits",
          description: "CST data facility licence (may require connectivity infrastructure investment commitment). GDCD and SASO compliance reviews.",
          typicalDuration: "6–8 weeks",
        },
        {
          step: "Final Permit Coordination",
          description: "No single authority coordinates final issuance — applicant must independently confirm each permit and compile a full permit register before commencing construction.",
          typicalDuration: "4–6 weeks",
        },
      ],
      similarProjects: [
        { name: "Remote Military Logistics Facility", location: "Afif Region", approvalTime: "18 months" },
        { name: "NCA Backup Data Facility", location: "Remote Riyadh Region", approvalTime: "20 months" },
        { name: "Solar-Powered Agricultural Complex", location: "Afif", approvalTime: "16 months" },
      ],
      aiAdvice:
        "This site's regulatory path is long because the absence of existing infrastructure forces applicants through utility upgrade agreements that are normally pre-solved in a developed industrial city. The SEC grid upgrade agreement is the critical path item — the 33→132 kV upgrade requires SEC board approval and can take 6 months on its own. Do not start formal permit applications until SEC has confirmed grid upgrade feasibility in writing. If SEC confirms unfeasibility, the site should be abandoned. Budget 14–20 months minimum.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [],
      plannedTSEExpansions: [
        { name: "Afif Regional Water Treatment Facility Upgrade", expectedCapacity: "25,000 m3/day", expectedYear: 2028 },
      ],
      infrastructureInvestments: [
        { name: "Highway 40 Afif Industrial Zone Access Road Paving", amount: "SAR 55M", year: 2026 },
        { name: "NWC Afif Municipal Water Network Expansion", amount: "SAR 210M", year: 2028 },
        { name: "SEC Rural Electrification — Afif Zone (33 kV)", amount: "SAR 95M", year: 2029 },
      ],
      scoreProjection: [
        { year: 2025, score: 41 },
        { year: 2026, score: 42 },
        { year: 2028, score: 43 },
        { year: 2030, score: 45 },
      ],
      aiPrediction:
        "Afif Technology Industrial Zone has limited infrastructure investment planned, and none of the planned investments address the site's fundamental constraints — the SEC grid remains at 33 kV through 2029 with no fiber extension on any current roadmap. The access road paving in 2026 is a positive development for construction logistics, and the regional water treatment upgrade in 2028 improves water access marginally. Score improvement through 2030 is expected to be minimal — 4 points over five years — as the core infrastructure gaps require investments that are not currently funded or planned.",
    },
  },
  {
    id: "site-008",
    name: "Wadi Al-Dawasir Industrial Park",
    region: "Riyadh",
    distanceFromRiyadh: 485,
    overallScore: 28,
    rating: "Poor",
    coordinates: { lat: 20.504, lng: 44.988 },
    waterAccess: {
      score: 24,
      nearestTSELine: "22.1 km",
      availableCapacity: "5,200 m3/day",
      source: "Wadi Al-Dawasir Municipal TSE",
    },
    infrastructure: {
      score: 31,
      powerAvailability: "Low",
      fiberConnectivity: "No fiber, satellite connectivity only",
      roadAccess: "Desert track, 28 km from nearest paved road",
    },
    regulatory: {
      score: 29,
      agenciesInvolved: 8,
      estApprovalTime: "18-24 months",
      complexityLevel: "High",
    },
    coolingImpact: {
      airCooling: "+420 m3/day",
      liquidCooling: "+300 m3/day",
      immersionCooling: "+150 m3/day",
      dlcCooling: "+200 m3/day",
    },
    coolingDetail: {
      air:       { dailyWater: "+420 m3/day",  energyUsage: "High",   capex: "Low",  opex: "High"   },
      liquid:    { dailyWater: "+300 m3/day",  energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+150 m3/day",  energyUsage: "Low",    capex: "High", opex: "Low"    },
      dlc:       { dailyWater: "+200 m3/day",  energyUsage: "Low",    capex: "High", opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Wadi Al-Dawasir Municipal TSE", type: "Water Treatment", distance: "22.1 km", status: "Limited Capacity" },
      { name: "SEC Rural Feeder WD-1", type: "Power", distance: "15.6 km", status: "Constrained" },
      { name: "Wadi Al-Dawasir Airport", type: "Logistics", distance: "31.4 km", status: "Active" },
      { name: "Satellite Ground Station WD", type: "Connectivity", distance: "8.9 km", status: "Operational" },
    ],
    waterAccessDetail: {
      overallScore: 24,
      riskLevel: "High",
      aiRecommendation:
        "Wadi Al-Dawasir is the most water-constrained site evaluated, with only 5,200 m3/day of available capacity from a treatment plant over 22 km away. The region relies on declining fossil aquifer sources with no planned desalination connectivity. This site is not recommended for any water-cooled data center application under current or projected infrastructure plans.",
      nearbyWaterSources: [
        { plant: "Wadi Al-Dawasir Municipal TSE", distance: "22.1 km", capacity: "5,200 m3/day", status: "Limited Capacity" },
        { plant: "Al-Aflaj Water Treatment Plant", distance: "68.3 km", capacity: "12,000 m3/day", status: "Operational" },
        { plant: "Wadi Al-Dawasir Aquifer Well Field", distance: "31.5 km", capacity: "2,800 m3/day", status: "Constrained" },
      ],
      availabilityTimeline: [
        { year: 2025, score: 24 },
        { year: 2026, score: 21 },
        { year: 2028, score: 22 },
        { year: 2030, score: 25 },
      ],
      supportingDocuments: [
        { name: "MEWA Southern Region Water Scarcity Report 2024", type: "Regulatory" },
        { name: "Wadi Al-Dawasir Aquifer Depletion Study", type: "Technical" },
        { name: "Saudi Green Initiative Water Impact Assessment", type: "Compliance" },
      ],
    },
    infrastructureDetail: {
      electrical: {
        gridOperator: "Saudi Electricity Company",
        substation: "SEC Rural Feeder WD-1",
        voltage: "33 kV",
        distance: "15.6 km",
        spareCapacity: "3 MW available",
      },
      fiber: {
        provider: "None (satellite only)",
        redundancy: "No terrestrial connectivity — satellite only",
        bandwidth: "<100 Mbps (satellite)",
        plannedExpansion: "Not on any known NWC, STC, or government expansion roadmap",
      },
      transportation: {
        nearestHighway: "Nearest paved road 28 km via desert track",
        airportDistance: "31.4 km to Wadi Al-Dawasir Airport (cargo-limited)",
        logisticsNotes:
          "Desert track access is impassable in adverse weather. Construction logistics would require significant temporary road works as a prerequisite to any development.",
      },
      industrial: {
        nearbyIndustrialZones: ["Wadi Al-Dawasir Agricultural Zone (35 km)"],
        utilityCorridors: [],
        existingDataCenters: [],
      },
      aiRecommendation:
        "Wadi Al-Dawasir Industrial Park is not viable for data center development under current or foreseeable infrastructure conditions. 3 MW on a 33 kV feeder 15.6 km away, satellite-only connectivity, and a 28 km desert track as the sole access route represent a fundamental infrastructure deficit. This site is not recommended.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MEWA", role: "Aquifer depletion and water-scarcity zone assessment — mandatory given fossil aquifer dependency" },
        { name: "Saudi Electricity Company (SEC)", role: "Major grid upgrade agreement — 33 kV to minimum 132 kV transmission extension required" },
        { name: "NWC", role: "Assessment of 22.1 km water supply extension feasibility and aquifer impact" },
        { name: "Wadi Al-Dawasir Municipal Council", role: "Land-use change approval from agricultural to industrial and building permit" },
        { name: "Communications, Space & Technology Commission (CST)", role: "Data facility licence — satellite-only connectivity will require special waiver or terrestrial upgrade commitment" },
        { name: "Ministry of Transport and Logistic Services", role: "28 km paved road construction permit and ROW acquisition" },
        { name: "Ministry of Municipal and Rural Affairs (MOMRA)", role: "Zone reclassification from rural agricultural to industrial" },
        { name: "National Cybersecurity Authority (NCA)", role: "Remote facility security clearance and sovereign data protection compliance" },
      ],
      requiredPermits: [
        "MEWA Aquifer Impact Assessment Clearance",
        "MEWA Water-Scarcity Zone Development Permit",
        "SEC Major Grid Extension Agreement",
        "NWC Water Infrastructure Extension Agreement",
        "CST Data Facility Operating Licence (with connectivity waiver)",
        "MOMRA Zone Reclassification Permit",
        "Wadi Al-Dawasir Municipal Building Permit",
        "Ministry of Transport Road Construction Permit",
        "NCA Remote Facility Security Clearance",
        "GDCD Fire Safety Certificate",
        "SASO Technical Compliance Certificate",
        "Saudi Customs Equipment Import Permit",
      ],
      approvalProcess: [
        {
          step: "Aquifer & Grid Pre-Feasibility",
          description: "Commission an independent aquifer depletion study for MEWA and request SEC feasibility confirmation for 33→132 kV extension to Wadi Al-Dawasir. Both are hard gates — if either is negative, abandon the site.",
          typicalDuration: "10–14 weeks",
        },
        {
          step: "MOMRA Zone Reclassification",
          description: "Apply to MOMRA for industrial zone reclassification. This requires a development justification and economic impact assessment. Extended review cycle for remote regions.",
          typicalDuration: "12–16 weeks",
        },
        {
          step: "MEWA Environmental & Aquifer Review",
          description: "Full EIA including aquifer depletion modelling, water scarcity zone impact, and climate risk assessment. Public consultation is mandatory. Likely the longest single step.",
          typicalDuration: "14–18 weeks",
        },
        {
          step: "Infrastructure Upgrade Agreements",
          description: "Negotiate SEC grid extension (applicant funds majority), NWC water extension agreement, and Ministry of Transport road construction ROW and permit.",
          typicalDuration: "12–14 weeks",
        },
        {
          step: "CST, NCA & Municipal Permits",
          description: "CST data facility licence with satellite connectivity waiver application; NCA remote facility security clearance; Wadi Al-Dawasir municipal building permit.",
          typicalDuration: "8–10 weeks",
        },
        {
          step: "Safety Permits & Final Registration",
          description: "GDCD fire safety and SASO technical compliance. Final permit register compilation and verification. No central coordination — each permit authority issues independently.",
          typicalDuration: "5–6 weeks",
        },
      ],
      similarProjects: [
        { name: "Remote Aramco Pumping Station Facility", location: "Southern Riyadh Region", approvalTime: "22 months" },
        { name: "Rural Solar Power Generation Facility", location: "Wadi Al-Dawasir", approvalTime: "20 months" },
        { name: "Ministry Agricultural Research Station", location: "Wadi Al-Dawasir", approvalTime: "24 months" },
      ],
      aiAdvice:
        "Wadi Al-Dawasir has the longest and most uncertain approval path of all evaluated sites. The MOMRA zone reclassification and MEWA aquifer review can run concurrently but together take 6–8 months before any other permit can be issued — and both carry significant rejection risk. The SEC grid extension is estimated to cost the applicant SAR 120–180M in infrastructure funding and requires a separate SEC board approval. This site should not be pursued unless it is the only viable option for the specific use case, and even then a thorough pre-feasibility must confirm the SEC and aquifer gates before any significant investment is made.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [],
      plannedTSEExpansions: [
        { name: "Wadi Al-Dawasir Municipal Water Treatment Upgrade — Phase 1", expectedCapacity: "12,000 m3/day", expectedYear: 2029 },
      ],
      infrastructureInvestments: [
        { name: "Saudi Green Initiative — Aquifer Restoration & Monitoring Study", amount: "SAR 35M", year: 2026 },
        { name: "NWC Southern Region Water Security Programme", amount: "SAR 890M", year: 2030 },
      ],
      scoreProjection: [
        { year: 2025, score: 28 },
        { year: 2026, score: 29 },
        { year: 2028, score: 30 },
        { year: 2030, score: 31 },
      ],
      aiPrediction:
        "Wadi Al-Dawasir Industrial Park has essentially no meaningful infrastructure investment planned before 2029. The aquifer monitoring study is a diagnostic exercise, not a supply solution, and the NWC Southern Region programme in 2030 is broad and may not reach this specific site in the plan period. The municipal water treatment upgrade arriving in 2029 will improve the water situation marginally, but the site will remain without terrestrial fiber or an adequate power grid for the foreseeable future. Score improvement through 2030 is projected at just 3 points. This site should be revisited only if a dedicated transmission and fiber investment is announced and funded.",
    },
  },
];

export function getSiteById(id) {
  return sites.find((site) => site.id === id) ?? null;
}

export function getSitesSortedByScore() {
  return [...sites].sort((a, b) => b.overallScore - a.overallScore);
}
