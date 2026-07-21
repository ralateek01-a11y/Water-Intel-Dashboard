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
    water: {
      summary: { availabilityScore: 94, distanceToInfrastructure: "0.8 km", reliability: "High" },
      detail: { cost: "SAR 2.10/m3", sustainability: "100% recycled TSE", droughtRisk: "Low" },
    },
    power: {
      summary: { distanceToSubstation: "1.4 km", availableCapacityMW: 180, reliability: "High" },
      detail: { outageHistory: "0 outages in past 12 months", electricityPrice: "SAR 0.18/kWh", renewableAvailability: "Solar farm 25 km away, 300 MW capacity", expansionPotential: "Substation upgrade to 500 kV funded, delivery 2026" },
    },
    climate: {
      summary: { avgYearlyTemp: "26°C", peakSummerTemp: "44°C", estimatedPUEImpact: "+0.12 PUE penalty vs. temperate climate" },
      detail: { humidity: "Low — avg 18% RH", extremeHeatDays: 58 },
    },
    connectivity: {
      summary: { distanceToBackbone: "2.1 km", fiberProviders: 2, redundancy: "Yes" },
      detail: { latencyToMajorCities: "Riyadh: 2ms, Jeddah: 18ms, Dubai: 32ms", proximityToIX: "SAIX Riyadh Internet Exchange — 28 km" },
    },
    land: {
      summary: { landPrice: "SAR 380/m2", parcelSize: "120 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "<0.5% grade — essentially flat", soilStability: "Compact gravel/sand — excellent bearing", roomForExpansion: "Phase 2 plot reserved, 60 ha adjacent", distanceToRoads: "0.2 km to Ring Road 8" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Yes", sezStatus: "MODON Industrial City (streamlined)", permittingSpeed: "4-6 months" },
      detail: { taxIncentives: "MODON industrial rate; 0% municipal fees for first 5 years", environmentalRestrictions: "None for TSE-based operations", governmentSupport: "MODON single-window; NCA designated priority tenant programme", easeOfPermits: "Easy" },
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
    water: {
      summary: { availabilityScore: 88, distanceToInfrastructure: "1.2 km", reliability: "High" },
      detail: { cost: "SAR 2.25/m3", sustainability: "100% TSE + SWCC desalination backup", droughtRisk: "Low" },
    },
    power: {
      summary: { distanceToSubstation: "2.6 km", availableCapacityMW: 140, reliability: "High" },
      detail: { outageHistory: "1 outage in past 12 months", electricityPrice: "SAR 0.18/kWh", renewableAvailability: "Solar farm 18 km away, 150 MW capacity", expansionPotential: "SEC Riyadh East grid reinforcement programme due 2027" },
    },
    climate: {
      summary: { avgYearlyTemp: "27°C", peakSummerTemp: "44°C", estimatedPUEImpact: "+0.12 PUE penalty vs. temperate climate" },
      detail: { humidity: "Low — avg 17% RH", extremeHeatDays: 60 },
    },
    connectivity: {
      summary: { distanceToBackbone: "3.5 km", fiberProviders: 1, redundancy: "Partial" },
      detail: { latencyToMajorCities: "Riyadh: 4ms, Jeddah: 19ms, Dubai: 33ms", proximityToIX: "SAIX Riyadh Internet Exchange — 35 km; dual-path upgrade due Q4 2026" },
    },
    land: {
      summary: { landPrice: "SAR 420/m2", parcelSize: "85 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "<0.8% grade — good for large footprint", soilStability: "Firm sandy loam — suitable for heavy structures", roomForExpansion: "Adjacent industrial plot of 40 ha available", distanceToRoads: "2 km spur road to Eastern Ring Road" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Yes", sezStatus: "MODON Industrial City", permittingSpeed: "6-8 months" },
      detail: { taxIncentives: "MODON standard industrial tariff", environmentalRestrictions: "CST data sovereignty compliance review required", governmentSupport: "MODON single-window service; CST operating licence mandatory", easeOfPermits: "Easy" },
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
    water: {
      summary: { availabilityScore: 76, distanceToInfrastructure: "3.1 km", reliability: "Medium" },
      detail: { cost: "SAR 2.45/m3", sustainability: "100% TSE — pipeline connection required", droughtRisk: "Medium" },
    },
    power: {
      summary: { distanceToSubstation: "1.9 km", availableCapacityMW: 120, reliability: "High" },
      detail: { outageHistory: "1 outage in past 12 months", electricityPrice: "SAR 0.18/kWh", renewableAvailability: "Sudair Solar PV Park (1.5 GW) — 8 km away", expansionPotential: "230 kV to 380 kV substation upgrade planned" },
    },
    climate: {
      summary: { avgYearlyTemp: "24°C", peakSummerTemp: "42°C", estimatedPUEImpact: "+0.10 PUE penalty vs. temperate climate" },
      detail: { humidity: "Very low — avg 14% RH", extremeHeatDays: 48 },
    },
    connectivity: {
      summary: { distanceToBackbone: "5.7 km", fiberProviders: 2, redundancy: "Yes" },
      detail: { latencyToMajorCities: "Riyadh: 8ms, Jeddah: 22ms, Dubai: 36ms", proximityToIX: "SAIX Riyadh Internet Exchange — 90 km; Backbone direct peering 2026" },
    },
    land: {
      summary: { landPrice: "SAR 290/m2", parcelSize: "200+ hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "<1% grade — suitable for large campus", soilStability: "Stable desert gravel — good bearing capacity", roomForExpansion: "Extensive undeveloped land within city boundary", distanceToRoads: "0.4 km to Highway 65" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Yes", sezStatus: "MODON Industrial City", permittingSpeed: "6-9 months" },
      detail: { taxIncentives: "MODON industrial rate", environmentalRestrictions: "None significant", governmentSupport: "MODON standard service; Sudair designated national tech cluster", easeOfPermits: "Moderate" },
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
    water: {
      summary: { availabilityScore: 74, distanceToInfrastructure: "4.5 km", reliability: "Medium" },
      detail: { cost: "SAR 2.80/m3", sustainability: "80% TSE, 20% SWCC desalination", droughtRisk: "Low" },
    },
    power: {
      summary: { distanceToSubstation: "3.2 km", availableCapacityMW: 95, reliability: "High" },
      detail: { outageHistory: "2 outages in past 12 months", electricityPrice: "SAR 0.18/kWh", renewableAvailability: "ACWA Power renewable project 30 km, 500 MW", expansionPotential: "RCJY Eastern Province grid expansion programme 2027" },
    },
    climate: {
      summary: { avgYearlyTemp: "28°C", peakSummerTemp: "46°C", estimatedPUEImpact: "+0.15 PUE penalty vs. temperate climate" },
      detail: { humidity: "High coastal humidity — avg 62% RH in July", extremeHeatDays: 72 },
    },
    connectivity: {
      summary: { distanceToBackbone: "6.8 km", fiberProviders: 2, redundancy: "Partial" },
      detail: { latencyToMajorCities: "Riyadh: 12ms, Jeddah: 26ms, Dubai: 8ms", proximityToIX: "UAE-IX Dubai reachable at 8ms; subsea cable landing upgrade 2027" },
    },
    land: {
      summary: { landPrice: "SAR 510/m2", parcelSize: "60 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "Flat coastal plain — <0.3% grade", soilStability: "Sandy with sabkha patches — moderate, requires treatment", roomForExpansion: "Limited within current zone boundary", distanceToRoads: "1.2 km to King Fahd Causeway corridor" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "RCJY Industrial Zone", permittingSpeed: "8-12 months" },
      detail: { taxIncentives: "RCJY preferential tariff for Tier 1 industrial consumers", environmentalRestrictions: "Coastal zone EIA required for new construction", governmentSupport: "RCJY Tier 1 fast-track available on application", easeOfPermits: "Moderate" },
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
    water: {
      summary: { availabilityScore: 58, distanceToInfrastructure: "6.2 km", reliability: "Low" },
      detail: { cost: "SAR 3.20/m3", sustainability: "100% TSE — capacity severely constrained", droughtRisk: "High" },
    },
    power: {
      summary: { distanceToSubstation: "4.8 km", availableCapacityMW: 75, reliability: "Medium" },
      detail: { outageHistory: "3 outages in past 12 months", electricityPrice: "SAR 0.20/kWh", renewableAvailability: "Planned solar project 45 km, 200 MW (expected 2027)", expansionPotential: "230 kV upgrade under review — no funding confirmed" },
    },
    climate: {
      summary: { avgYearlyTemp: "25°C", peakSummerTemp: "43°C", estimatedPUEImpact: "+0.11 PUE penalty vs. temperate climate" },
      detail: { humidity: "Very low — avg 12% RH", extremeHeatDays: 52 },
    },
    connectivity: {
      summary: { distanceToBackbone: "14.2 km", fiberProviders: 1, redundancy: "No" },
      detail: { latencyToMajorCities: "Riyadh: 18ms, Jeddah: 28ms, Dubai: 42ms", proximityToIX: "SAIX Riyadh Internet Exchange — 280 km; Backbone upgrade expected 2026" },
    },
    land: {
      summary: { landPrice: "SAR 220/m2", parcelSize: "150 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "<0.8% grade — suitable terrain", soilStability: "Desert gravel — good bearing capacity", roomForExpansion: "Large undeveloped zone to the north", distanceToRoads: "1.8 km to Buraydah–Riyadh Highway" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Yes", sezStatus: "MODON Industrial City", permittingSpeed: "8-12 months" },
      detail: { taxIncentives: "Standard MODON tariff — no DC-specific incentives", environmentalRestrictions: "Water Demand Management Plan mandatory (water stress zone)", governmentSupport: "No dedicated data center facilitation programme", easeOfPermits: "Moderate" },
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
    water: {
      summary: { availabilityScore: 52, distanceToInfrastructure: "8.7 km", reliability: "Low" },
      detail: { cost: "SAR 2.85/m3", sustainability: "90% SWCC desalination, 10% RCJY TSE", droughtRisk: "Low" },
    },
    power: {
      summary: { distanceToSubstation: "6.4 km", availableCapacityMW: 35, reliability: "Medium" },
      detail: { outageHistory: "2 outages in past 12 months", electricityPrice: "SAR 0.16/kWh", renewableAvailability: "Aramco renewable portfolio 40 km — no direct connection available", expansionPotential: "RCJY Phase 3 dedicated substation planned for 2028" },
    },
    climate: {
      summary: { avgYearlyTemp: "28°C", peakSummerTemp: "46°C", estimatedPUEImpact: "+0.16 PUE penalty vs. temperate climate" },
      detail: { humidity: "High coastal humidity — avg 65% RH in July", extremeHeatDays: 75 },
    },
    connectivity: {
      summary: { distanceToBackbone: "22.0 km", fiberProviders: 1, redundancy: "No" },
      detail: { latencyToMajorCities: "Riyadh: 18ms, Jeddah: 30ms, Dubai: 10ms", proximityToIX: "UAE-IX Dubai accessible at 10ms — commercial fiber not yet in Phase 3" },
    },
    land: {
      summary: { landPrice: "SAR 180/m2", parcelSize: "350 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "Very flat coastal plain — <0.2% grade", soilStability: "Requires compaction — salt-affected surface in places", roomForExpansion: "Extensive greenfield within Phase 3 boundary", distanceToRoads: "7 km bypass road (paving funded, due 2026)" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "RCJY Industrial Zone (Phase 3)", permittingSpeed: "10-14 months" },
      detail: { taxIncentives: "RCJY Tier 1 utility discount and land lease rebate", environmentalRestrictions: "Full coastal EIA required; RCJY pre-cleared EIA pathway available", governmentSupport: "RCJY Master Plan designates digital infrastructure precinct in Phase 3", easeOfPermits: "Moderate" },
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
    water: {
      summary: { availabilityScore: 32, distanceToInfrastructure: "14.3 km", reliability: "Low" },
      detail: { cost: "SAR 4.80/m3 (primarily trucked)", sustainability: "Fossil aquifer with zero recharge — not sustainable", droughtRisk: "High" },
    },
    power: {
      summary: { distanceToSubstation: "12.0 km", availableCapacityMW: 22, reliability: "Low" },
      detail: { outageHistory: "6 outages in past 12 months", electricityPrice: "SAR 0.22/kWh", renewableAvailability: "Excellent solar irradiance — no commercial farm within 50 km", expansionPotential: "No funded grid upgrade on record" },
    },
    climate: {
      summary: { avgYearlyTemp: "27°C", peakSummerTemp: "44°C", estimatedPUEImpact: "+0.13 PUE penalty vs. temperate climate" },
      detail: { humidity: "Very low — avg 10% RH", extremeHeatDays: 55 },
    },
    connectivity: {
      summary: { distanceToBackbone: "38.0 km", fiberProviders: 1, redundancy: "No" },
      detail: { latencyToMajorCities: "Riyadh: 32ms, Jeddah: 44ms, Dubai: 58ms", proximityToIX: "SAIX Riyadh Internet Exchange — 380 km; no expansion roadmap" },
    },
    land: {
      summary: { landPrice: "SAR 80/m2", parcelSize: "500+ hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "<1.5% grade — open desert terrain", soilStability: "Sandy desert — moderate compaction required", roomForExpansion: "Unlimited open land with no competing industrial use", distanceToRoads: "3.5 km unpaved track to nearest paved road" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "Not in SEZ", permittingSpeed: "12-18 months" },
      detail: { taxIncentives: "None specific to data centers", environmentalRestrictions: "Full CEIA required — Category A water stress zone designation", governmentSupport: "No dedicated data center facilitation programme", easeOfPermits: "Difficult" },
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
    water: {
      summary: { availabilityScore: 18, distanceToInfrastructure: "No viable supply within 24 km", reliability: "Low" },
      detail: { cost: "SAR 7.50/m3 (trucked + minimal desal)", sustainability: "Fossil aquifer at 91% depletion — critically unsustainable", droughtRisk: "High" },
    },
    power: {
      summary: { distanceToSubstation: "18.0 km", availableCapacityMW: 12, reliability: "Low" },
      detail: { outageHistory: "8+ outages in past 12 months", electricityPrice: "SAR 0.24/kWh", renewableAvailability: "Exceptional solar resource — no commercial project within 100 km", expansionPotential: "No funded grid upgrade on record" },
    },
    climate: {
      summary: { avgYearlyTemp: "29°C", peakSummerTemp: "47°C", estimatedPUEImpact: "+0.18 PUE penalty vs. temperate climate" },
      detail: { humidity: "Extremely low — avg 8% RH", extremeHeatDays: 82 },
    },
    connectivity: {
      summary: { distanceToBackbone: "72.0 km", fiberProviders: 0, redundancy: "No" },
      detail: { latencyToMajorCities: "Riyadh: 55ms, Jeddah: 48ms, Dubai: 72ms", proximityToIX: "SAIX Riyadh Internet Exchange — 680 km; no fiber roadmap exists" },
    },
    land: {
      summary: { landPrice: "SAR 40/m2", parcelSize: "1,000+ hectares available", floodRisk: "Medium" },
      detail: { flatnessSlope: "<2% grade with wadi flood channels", soilStability: "Variable — flood-affected alluvial areas present", roomForExpansion: "Vast open land but infrastructure access is the binding constraint", distanceToRoads: "8.5 km to nearest paved road" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "Not in SEZ", permittingSpeed: "18-24 months" },
      detail: { taxIncentives: "None specific to data centers", environmentalRestrictions: "Full Comprehensive EIA (CEIA) mandatory — 6-9 month review", governmentSupport: "No DC facilitation programme — off the national digital infrastructure roadmap", easeOfPermits: "Difficult" },
    },
  },
  /* ─────────────── NEW SITES (site-009 … site-028) ─────────────── */

  // ── site-009: Dhahran Technology Valley ──────────────────────────
  {
    id: "site-009",
    name: "Dhahran Technology Valley",
    region: "Eastern",
    distanceFromRiyadh: 388,
    overallScore: 88,
    rating: "Excellent",
    coordinates: { lat: 26.307, lng: 50.103 },
    waterAccess: { score: 82, nearestTSELine: "1.9 km", availableCapacity: "45,000 m3/day", source: "Eastern Province TSE Network" },
    infrastructure: { score: 94, powerAvailability: "High", fiberConnectivity: "Multi-carrier fiber, 400 Gbps", roadAccess: "Direct access via Prince Faisal Bin Fahd Road" },
    regulatory: { score: 88, agenciesInvolved: 4, estApprovalTime: "5-7 months", complexityLevel: "Low" },
    coolingImpact: { airCooling: "+2,100 m3/day", liquidCooling: "+1,600 m3/day", immersionCooling: "+800 m3/day", dlcCooling: "+1,050 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+2,100 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+1,600 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+800 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+1,050 m3/day", energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Eastern Province TSE Plant", type: "Water Treatment", distance: "1.9 km", status: "Operational" },
      { name: "SEC Dhahran Industrial Substation", type: "Power", distance: "0.7 km", status: "Operational" },
      { name: "STC/Mobily Fiber Hub — Dhahran", type: "Connectivity", distance: "1.2 km", status: "Operational" },
      { name: "Aramco HQ Campus", type: "Industrial Zone", distance: "3.5 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 82,
      riskLevel: "Low",
      aiRecommendation: "Dhahran benefits from the Eastern Province's mature TSE network and proximity to SWCC desalination output. Seawater desalination backup via Al-Khobar plant provides resilience. Water stress is manageable for large deployments.",
      nearbyWaterSources: [
        { plant: "Eastern Province TSE Network Offtake", distance: "1.9 km", capacity: "45,000 m3/day", status: "Operational" },
        { plant: "Al-Khobar SWCC Desalination Plant", distance: "12 km", capacity: "210,000 m3/day", status: "Operational" },
      ],
      availabilityTimeline: [{ year: 2025, score: 82 }, { year: 2027, score: 84 }, { year: 2030, score: 86 }],
      supportingDocuments: [
        { name: "Eastern Province Water Allocation Study 2024", type: "Regulatory" },
        { name: "SWCC Dhahran Zone Capacity Report", type: "Technical" },
      ],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "Dhahran Industrial Substation", voltage: "380 kV", distance: "0.7 km", spareCapacity: "220 MW available" },
      fiber: { provider: "STC, Mobily & Zain (three carriers)", redundancy: "Multi-path, fully redundant", bandwidth: "400 Gbps", plannedExpansion: "Terabit backbone upgrade planned 2027" },
      transportation: { nearestHighway: "Prince Faisal Bin Fahd Road — direct access", airportDistance: "28 km to King Fahd International Airport", logisticsNotes: "Excellent heavy-vehicle logistics — Dammam Port 38 km for equipment import." },
      industrial: { nearbyIndustrialZones: ["Dhahran Techno Valley SEZ", "Dammam 2nd Industrial City (24 km)"], utilityCorridors: ["Eastern Province High-Voltage Corridor", "SWCC Coastal Pipeline"], existingDataCenters: ["Aramco Dhahran Data Center (3.5 km)", "STC Eastern Region Hub (6 km)"] },
      aiRecommendation: "Dhahran is the strongest Eastern Province candidate. SEC substation 0.7 km away with 220 MW spare capacity, triple-carrier fiber, and proximity to Aramco's own infrastructure creates a best-in-class power and connectivity profile.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON / Dhahran Techno Valley Authority", role: "Occupancy licence and SEZ clearance" },
        { name: "Saudi Electricity Company (SEC)", role: "380 kV connection agreement" },
        { name: "CST", role: "Data facility operating licence and data sovereignty review" },
        { name: "NWC / SWCC", role: "Water allocation agreement" },
      ],
      requiredPermits: ["MODON Occupancy Licence", "SEC Power Connection Agreement", "CST Data Facility Licence", "NWC Water Allocation Permit", "GDCD Fire Safety Certificate", "SASO Technical Compliance Certificate"],
      approvalProcess: [
        { step: "MODON/SEZ Application", description: "Submit to Dhahran Techno Valley authority with full project specs.", typicalDuration: "4–5 weeks" },
        { step: "Utility Agreements", description: "Execute SEC connection and NWC/SWCC water MOU simultaneously.", typicalDuration: "5–7 weeks" },
        { step: "CST Licence", description: "CST data facility operating licence including data residency declaration.", typicalDuration: "6–8 weeks" },
        { step: "Safety & Final Permits", description: "GDCD and SASO review; MODON final occupancy licence.", typicalDuration: "3–4 weeks" },
      ],
      similarProjects: [
        { name: "Aramco Cloud DC Expansion", location: "Dhahran", approvalTime: "5 months" },
        { name: "STC Eastern Region Hyperscale", location: "Dammam", approvalTime: "6 months" },
      ],
      aiAdvice: "The Dhahran Techno Valley SEZ status streamlines industrial approvals significantly. The CST licence is still mandatory and typically the longest single step — submit it in parallel with utility agreements.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [{ name: "Jubail 3 Desalination — Eastern Spine Extension", expectedCapacity: "80,000 m3/day", expectedYear: 2027 }],
      plannedTSEExpansions: [{ name: "Eastern Province TSE Network Phase 4", expectedCapacity: "120,000 m3/day", expectedYear: 2028 }],
      infrastructureInvestments: [
        { name: "Dhahran Techno Valley Fiber Terabit Upgrade", amount: "SAR 420M", year: 2027 },
        { name: "SEC Dhahran 380 kV Substation Expansion", amount: "SAR 650M", year: 2027 },
      ],
      scoreProjection: [{ year: 2025, score: 88 }, { year: 2027, score: 90 }, { year: 2030, score: 93 }],
      aiPrediction: "Dhahran is on a strong upward trajectory driven by Aramco's continued investment in the Techno Valley SEZ and SEC's grid expansion. Score is projected to reach 93 by 2030 as connectivity upgrades and water infrastructure mature.",
    },
    water: {
      summary: { availabilityScore: 82, distanceToInfrastructure: "1.9 km", reliability: "High" },
      detail: { cost: "SAR 2.60/m3", sustainability: "TSE + SWCC desalination dual supply", droughtRisk: "Low" },
    },
    power: {
      summary: { distanceToSubstation: "0.7 km", availableCapacityMW: 220, reliability: "High" },
      detail: { outageHistory: "0 outages in past 12 months", electricityPrice: "SAR 0.18/kWh", renewableAvailability: "Solar + offshore wind projects planned near Ras Tanura", expansionPotential: "SEC 380 kV expansion funded — additional 200 MW by 2027" },
    },
    climate: {
      summary: { avgYearlyTemp: "27°C", peakSummerTemp: "45°C", estimatedPUEImpact: "+0.14 PUE penalty vs. temperate climate" },
      detail: { humidity: "Moderate coastal — avg 52% RH (higher than Riyadh)", extremeHeatDays: 55 },
    },
    connectivity: {
      summary: { distanceToBackbone: "1.2 km", fiberProviders: 3, redundancy: "Yes" },
      detail: { latencyToMajorCities: "Riyadh: 12ms, Jeddah: 22ms, Dubai: 18ms, Bahrain: 4ms", proximityToIX: "Bahrain Internet Exchange 35 km via submarine cable landing; SAIX Dammam 8 km" },
    },
    land: {
      summary: { landPrice: "SAR 680/m2", parcelSize: "60 hectares available in SEZ", floodRisk: "Low" },
      detail: { flatnessSlope: "<0.5% grade — excellent for large campus", soilStability: "Bedrock-anchored limestone — superior load-bearing", roomForExpansion: "SEZ Phase 3 adds 40 ha adjacent plot 2027", distanceToRoads: "0.3 km to Prince Faisal Road" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Yes", sezStatus: "Dhahran Techno Valley SEZ", permittingSpeed: "5-7 months" },
      detail: { taxIncentives: "SEZ: 0% corporate tax for 50 years, customs duty exemptions", environmentalRestrictions: "Coastal proximity — minor marine environment review", governmentSupport: "Aramco-backed SEZ with dedicated government liaison office", easeOfPermits: "Easy" },
    },
  },

  // ── site-010: Prince Sultan Technology City ───────────────────────
  {
    id: "site-010",
    name: "Prince Sultan Technology City",
    region: "Riyadh",
    distanceFromRiyadh: 22,
    overallScore: 84,
    rating: "Excellent",
    coordinates: { lat: 24.608, lng: 46.872 },
    waterAccess: { score: 86, nearestTSELine: "1.1 km", availableCapacity: "48,000 m3/day", source: "Riyadh South TSE Network" },
    infrastructure: { score: 90, powerAvailability: "High", fiberConnectivity: "Dual-path fiber, 200 Gbps", roadAccess: "Direct airport expressway access" },
    regulatory: { score: 85, agenciesInvolved: 3, estApprovalTime: "4-5 months", complexityLevel: "Low" },
    coolingImpact: { airCooling: "+2,200 m3/day", liquidCooling: "+1,650 m3/day", immersionCooling: "+825 m3/day", dlcCooling: "+1,100 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+2,200 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+1,650 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+825 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+1,100 m3/day", energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Riyadh South TSE Plant", type: "Water Treatment", distance: "1.1 km", status: "Operational" },
      { name: "SEC South Riyadh Substation", type: "Power", distance: "1.8 km", status: "Operational" },
      { name: "CITC Fiber Junction — Airport Corridor", type: "Connectivity", distance: "2.4 km", status: "Operational" },
      { name: "King Khalid International Airport Zone", type: "Industrial Zone", distance: "4.0 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 86,
      riskLevel: "Low",
      aiRecommendation: "Located within the NWC Riyadh Smart Water Network southern ring, this site enjoys consistent high-pressure TSE delivery with automated quality monitoring. Low risk of supply disruption.",
      nearbyWaterSources: [
        { plant: "Riyadh South TSE Plant", distance: "1.1 km", capacity: "48,000 m3/day", status: "Operational" },
        { plant: "King Khalid Airport TSE Offtake", distance: "4.5 km", capacity: "22,000 m3/day", status: "Operational" },
      ],
      availabilityTimeline: [{ year: 2025, score: 86 }, { year: 2027, score: 88 }, { year: 2030, score: 90 }],
      supportingDocuments: [{ name: "NWC Riyadh Smart Network — South Zone Report", type: "Regulatory" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "South Riyadh Transmission Substation", voltage: "380 kV", distance: "1.8 km", spareCapacity: "195 MW available" },
      fiber: { provider: "STC & Mobily (dual carrier)", redundancy: "Dual-path, fully redundant", bandwidth: "200 Gbps", plannedExpansion: "400 Gbps upgrade planned Q2 2026" },
      transportation: { nearestHighway: "Airport Expressway — direct access", airportDistance: "4 km to King Khalid International Airport", logisticsNotes: "Best airport proximity of all Riyadh sites — equipment import is fastest here." },
      industrial: { nearbyIndustrialZones: ["Airport Free Zone (4 km)", "South Riyadh Industrial District"], utilityCorridors: ["Riyadh South TSE Ring"], existingDataCenters: ["Mobily Riyadh South POP (6 km)"] },
      aiRecommendation: "Exceptional airport proximity and a clean 380 kV connection make this site ideal for latency-sensitive deployments requiring frequent equipment logistics. The fiber upgrade to 400 Gbps in Q2 2026 will close the only remaining gap.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "RCRC / Airport Free Zone Authority", role: "Zone clearance and occupancy licence" },
        { name: "SEC", role: "380 kV connection agreement" },
        { name: "CST", role: "Data facility operating licence" },
      ],
      requiredPermits: ["RCRC Occupancy Licence", "SEC Power Agreement", "CST Data Facility Licence", "NWC Water MOU", "GDCD Fire Safety Certificate"],
      approvalProcess: [
        { step: "RCRC Zone Application", description: "Submit to Riyadh Airports authority for free zone clearance.", typicalDuration: "3–4 weeks" },
        { step: "Utility & CST in Parallel", description: "Execute SEC and NWC agreements; submit CST licence simultaneously.", typicalDuration: "6–8 weeks" },
        { step: "Safety & Final", description: "GDCD and SASO clearance; RCRC final occupancy.", typicalDuration: "2–3 weeks" },
      ],
      similarProjects: [{ name: "Cloud Hyperscale Riyadh Airport Campus", location: "South Riyadh", approvalTime: "5 months" }],
      aiAdvice: "The Airport Free Zone fast-tracks industrial approvals — RCRC has a single-window service. The CST licence remains the critical path. Submit day-one.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [],
      plannedTSEExpansions: [{ name: "Riyadh Smart Water Network — South Extension Phase 3", expectedCapacity: "90,000 m3/day", expectedYear: 2027 }],
      infrastructureInvestments: [
        { name: "South Riyadh Fiber Ring 400 Gbps Upgrade", amount: "SAR 180M", year: 2026 },
        { name: "SEC South Riyadh 380 kV Capacity Expansion", amount: "SAR 520M", year: 2027 },
      ],
      scoreProjection: [{ year: 2025, score: 84 }, { year: 2027, score: 87 }, { year: 2030, score: 90 }],
      aiPrediction: "Prince Sultan Technology City is positioned for steady score improvement as the fiber upgrade and grid expansion complete. Its proximity to the airport and the fast-track RCRC approval path make it a low-execution-risk site for deployments targeting 2026.",
    },
    water: {
      summary: { availabilityScore: 86, distanceToInfrastructure: "1.1 km", reliability: "High" },
      detail: { cost: "SAR 2.10/m3", sustainability: "100% TSE — NWC Smart Water Network", droughtRisk: "Low" },
    },
    power: {
      summary: { distanceToSubstation: "1.8 km", availableCapacityMW: 195, reliability: "High" },
      detail: { outageHistory: "0 outages in past 12 months", electricityPrice: "SAR 0.18/kWh", renewableAvailability: "Solar aggregation zone 30 km south — 500 MW project under development", expansionPotential: "SEC capacity expansion 2027 adds 150 MW" },
    },
    climate: {
      summary: { avgYearlyTemp: "27°C", peakSummerTemp: "44°C", estimatedPUEImpact: "+0.12 PUE penalty vs. temperate climate" },
      detail: { humidity: "Low — avg 15% RH", extremeHeatDays: 58 },
    },
    connectivity: {
      summary: { distanceToBackbone: "2.4 km", fiberProviders: 2, redundancy: "Yes" },
      detail: { latencyToMajorCities: "Riyadh CBD: 2ms, Jeddah: 18ms, Dubai: 30ms", proximityToIX: "SAIX Riyadh Internet Exchange — 18 km; airport corridor route" },
    },
    land: {
      summary: { landPrice: "SAR 750/m2", parcelSize: "70 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "<0.6% grade — airport-adjacent flat terrain", soilStability: "Compacted gravelly sand — good load-bearing", roomForExpansion: "Airport free zone has 120 ha reserved for tech campus expansion", distanceToRoads: "0.5 km to Airport Expressway" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Yes", sezStatus: "King Khalid Airport Free Zone", permittingSpeed: "4-5 months" },
      detail: { taxIncentives: "Free zone: 5-year tax holiday for qualifying data infrastructure investments", environmentalRestrictions: "Aviation height restriction review required (resolved via engineering adjustment)", governmentSupport: "RCRC single-window service; fast-track digital infrastructure lane available", easeOfPermits: "Easy" },
    },
  },

  // ── site-011: King Abdullah Economic City (KAEC) ─────────────────
  {
    id: "site-011",
    name: "King Abdullah Economic City",
    region: "Makkah",
    distanceFromRiyadh: 985,
    overallScore: 82,
    rating: "Excellent",
    coordinates: { lat: 22.407, lng: 39.101 },
    waterAccess: { score: 78, nearestTSELine: "N/A — desalination supply", availableCapacity: "120,000 m3/day", source: "KAEC Desalination Plant" },
    infrastructure: { score: 88, powerAvailability: "High", fiberConnectivity: "Dual-path fiber, 200 Gbps + submarine cable proximity", roadAccess: "Expressway access + dedicated port road" },
    regulatory: { score: 84, agenciesInvolved: 2, estApprovalTime: "3-5 months", complexityLevel: "Low" },
    coolingImpact: { airCooling: "+2,000 m3/day", liquidCooling: "+1,500 m3/day", immersionCooling: "+750 m3/day", dlcCooling: "+1,000 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+2,000 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+1,500 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+750 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+1,000 m3/day", energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "KAEC Desalination Plant", type: "Water Treatment", distance: "2.3 km", status: "Operational" },
      { name: "KAEC Industrial Zone Substation", type: "Power", distance: "1.5 km", status: "Operational" },
      { name: "Red Sea Submarine Cable Landing Station", type: "Connectivity", distance: "8 km", status: "Operational" },
      { name: "King Abdullah Port", type: "Industrial Zone", distance: "3 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 78,
      riskLevel: "Low",
      aiRecommendation: "KAEC's built-in desalination infrastructure provides a reliable coastal water supply. Seawater availability is unlimited — the cost premium vs. TSE is the primary consideration.",
      nearbyWaterSources: [
        { plant: "KAEC Desalination Plant", distance: "2.3 km", capacity: "120,000 m3/day", status: "Operational" },
      ],
      availabilityTimeline: [{ year: 2025, score: 78 }, { year: 2027, score: 80 }, { year: 2030, score: 82 }],
      supportingDocuments: [{ name: "KAEC Water Services Framework 2024", type: "Agreement" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "MARAFIQ / SEC", substation: "KAEC Industrial Zone Substation", voltage: "230 kV", distance: "1.5 km", spareCapacity: "160 MW available" },
      fiber: { provider: "STC & Mobily", redundancy: "Dual-path redundant", bandwidth: "200 Gbps", plannedExpansion: "Red Sea submarine cable system adds direct capacity 2026" },
      transportation: { nearestHighway: "KAEC Expressway — direct access", airportDistance: "65 km to King Abdulaziz International Airport Jeddah", logisticsNotes: "King Abdullah Port within 3 km — optimal for large-scale equipment import." },
      industrial: { nearbyIndustrialZones: ["KAEC Industrial Valley", "King Abdullah Port Free Zone"], utilityCorridors: ["KAEC Internal Grid", "Red Sea Coastal Fiber Route"], existingDataCenters: ["KAEC Smart City DC (6 km)"] },
      aiRecommendation: "KAEC's self-contained city infrastructure and dedicated SEZ authority make it one of the fastest approval environments in the Kingdom. The MARAFIQ utility model means a single utility counterparty for power, water, and waste.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "KAEC / EMAAR Economic City", role: "Primary developer — single-window for all permits within KAEC boundary" },
        { name: "CST", role: "Data facility operating licence" },
      ],
      requiredPermits: ["KAEC Developer Permit", "CST Data Facility Licence", "MARAFIQ Utility Connection Agreement", "GDCD Fire Safety Certificate"],
      approvalProcess: [
        { step: "KAEC Developer Application", description: "Submit to EMAAR Economic City single window — covers zoning, building, utilities.", typicalDuration: "3–4 weeks" },
        { step: "CST Licence", description: "Parallel CST application for data facility operating licence.", typicalDuration: "6–8 weeks" },
        { step: "Utility & Safety", description: "MARAFIQ utility agreements + GDCD fire safety.", typicalDuration: "3–4 weeks" },
      ],
      similarProjects: [{ name: "KAEC Tech Hub Phase 1", location: "KAEC Industrial Valley", approvalTime: "4 months" }],
      aiAdvice: "KAEC's single-developer model (EMAAR Economic City) is the most streamlined approval environment in Saudi Arabia outside the NEOM zone. The CST licence is the only external agency required. Expect 3–5 months total.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [{ name: "KAEC Desalination Plant Phase 2 Expansion", expectedCapacity: "80,000 m3/day", expectedYear: 2027 }],
      plannedTSEExpansions: [],
      infrastructureInvestments: [
        { name: "Red Sea Submarine Cable System — KAEC Landing", amount: "SAR 340M", year: 2026 },
        { name: "KAEC Industrial Zone 380 kV Grid Upgrade", amount: "SAR 480M", year: 2028 },
      ],
      scoreProjection: [{ year: 2025, score: 82 }, { year: 2027, score: 84 }, { year: 2030, score: 87 }],
      aiPrediction: "KAEC's score will benefit from the Red Sea submarine cable landing in 2026, which dramatically improves connectivity to Europe, Africa, and Asia. The site is among the most internationally connected locations in Saudi Arabia post-2026.",
    },
    water: {
      summary: { availabilityScore: 78, distanceToInfrastructure: "2.3 km", reliability: "High" },
      detail: { cost: "SAR 3.80/m3 (desalination premium)", sustainability: "Seawater desalination — unlimited feedstock but energy-intensive", droughtRisk: "Low" },
    },
    power: {
      summary: { distanceToSubstation: "1.5 km", availableCapacityMW: 160, reliability: "High" },
      detail: { outageHistory: "0 outages in past 12 months", electricityPrice: "SAR 0.18/kWh", renewableAvailability: "Red Sea wind corridor — 300 MW offshore wind project under study", expansionPotential: "KAEC grid capacity to 400 MW by 2028" },
    },
    climate: {
      summary: { avgYearlyTemp: "28°C", peakSummerTemp: "43°C", estimatedPUEImpact: "+0.13 PUE penalty vs. temperate climate" },
      detail: { humidity: "Moderate coastal — avg 55% RH", extremeHeatDays: 48 },
    },
    connectivity: {
      summary: { distanceToBackbone: "8 km", fiberProviders: 2, redundancy: "Yes" },
      detail: { latencyToMajorCities: "Jeddah: 12ms, Riyadh: 25ms, Dubai: 28ms, Cairo: 22ms", proximityToIX: "Jeddah Internet Exchange 90 km; Red Sea cable landing direct peering 2026" },
    },
    land: {
      summary: { landPrice: "SAR 580/m2", parcelSize: "150 hectares available in Industrial Valley", floodRisk: "Low" },
      detail: { flatnessSlope: "<0.4% grade — engineered site", soilStability: "Engineered compacted fill — certified for heavy industrial loads", roomForExpansion: "KAEC Industrial Valley Phase 3 adds 200 ha", distanceToRoads: "0.2 km to KAEC internal expressway" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Yes", sezStatus: "KAEC Special Economic Zone", permittingSpeed: "3-5 months" },
      detail: { taxIncentives: "SEZ: 0% income tax, 0% import duties on equipment, 0% withholding tax", environmentalRestrictions: "Coastal EIA required — typically 6–8 weeks for industrial data centers", governmentSupport: "EMAAR Economic City full-service investment facilitation", easeOfPermits: "Easy" },
    },
  },

  // ── site-012: NEOM Industrial Corridor ───────────────────────────
  {
    id: "site-012",
    name: "NEOM Industrial Corridor",
    region: "Tabuk",
    distanceFromRiyadh: 1480,
    overallScore: 79,
    rating: "Good",
    coordinates: { lat: 28.137, lng: 35.218 },
    waterAccess: { score: 70, nearestTSELine: "N/A — seawater desalination", availableCapacity: "85,000 m3/day", source: "NEOM Coastal Desalination Facility" },
    infrastructure: { score: 85, powerAvailability: "High", fiberConnectivity: "Dedicated NEOM fiber ring, 400 Gbps", roadAccess: "NEOM internal expressway network" },
    regulatory: { score: 82, agenciesInvolved: 1, estApprovalTime: "3-4 months", complexityLevel: "Low" },
    coolingImpact: { airCooling: "+1,800 m3/day", liquidCooling: "+1,350 m3/day", immersionCooling: "+675 m3/day", dlcCooling: "+900 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+1,800 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+1,350 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+675 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+900 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "NEOM Coastal Desalination Facility", type: "Water Treatment", distance: "4.2 km", status: "Under Construction" },
      { name: "NEOM Renewable Energy Hub", type: "Power", distance: "6 km", status: "Under Construction" },
      { name: "NEOM Fiber Ring Junction", type: "Connectivity", distance: "2.8 km", status: "Operational" },
      { name: "NEOM Logistics Hub", type: "Industrial Zone", distance: "12 km", status: "Planned" },
    ],
    waterAccessDetail: {
      overallScore: 70,
      riskLevel: "Low",
      aiRecommendation: "NEOM's desalination infrastructure is under active construction and will be fully commissioned by 2027. Red Sea seawater is available in unlimited quantity — supply security is high once infrastructure is complete.",
      nearbyWaterSources: [
        { plant: "NEOM Coastal Desalination Facility (Phase 1)", distance: "4.2 km", capacity: "85,000 m3/day", status: "Under Construction" },
      ],
      availabilityTimeline: [{ year: 2025, score: 60 }, { year: 2027, score: 75 }, { year: 2030, score: 82 }],
      supportingDocuments: [{ name: "NEOM Water Infrastructure Master Plan", type: "Technical" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "NEOM Energy Authority", substation: "NEOM Renewable Grid Hub", voltage: "380 kV (renewable)", distance: "6 km", spareCapacity: "500 MW (renewable allocation)" },
      fiber: { provider: "NEOM Dedicated Fiber (Telecom Authority)", redundancy: "NEOM ring — redundant by design", bandwidth: "400 Gbps", plannedExpansion: "Terabit submarine cable to Europe planned 2028" },
      transportation: { nearestHighway: "NEOM Internal Expressway", airportDistance: "45 km to NEOM Bay Airport (under construction)", logisticsNotes: "Equipment delivery via Aqaba/Sharma port during construction phase — add 6-week lead time for large imports." },
      industrial: { nearbyIndustrialZones: ["NEOM Industrial Zone (Sharma)", "NEOM Logistics Hub (12 km)"], utilityCorridors: ["NEOM Solar/Wind Transmission Corridor"], existingDataCenters: ["NEOM Cloud DC Phase 1 (under construction)"] },
      aiRecommendation: "NEOM's single-authority governance model offers the fastest approval process in the region, but infrastructure completion timelines (2027) mean near-term deployments face uncertainty. Best suited for long-lead hyperscale projects targeting 2027+ commissioning.",
    },
    regulatoryDetail: {
      requiredAgencies: [{ name: "NEOM Authority", role: "All-in-one permitting — single authority for all NEOM zone activities" }],
      requiredPermits: ["NEOM Development Permit", "NEOM Energy Connection Agreement", "NEOM Telecom Connection Agreement", "NEOM Water Allocation Agreement"],
      approvalProcess: [
        { step: "NEOM Authority Application", description: "Single application to NEOM Authority covering land, utilities, and permits.", typicalDuration: "6–8 weeks" },
        { step: "Infrastructure Connection Agreements", description: "Parallel energy, water, and telecom connection agreements with NEOM sub-authorities.", typicalDuration: "5–6 weeks" },
        { step: "Final Permit Issuance", description: "NEOM Authority issues composite development permit.", typicalDuration: "2–3 weeks" },
      ],
      similarProjects: [{ name: "NEOM Cloud Zone Phase 1", location: "NEOM", approvalTime: "3 months" }],
      aiAdvice: "NEOM's single-authority model is the fastest approval environment in Saudi Arabia. The constraint is infrastructure readiness — confirm construction completion dates before committing.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [{ name: "NEOM Coastal Desalination Phase 2", expectedCapacity: "200,000 m3/day", expectedYear: 2028 }],
      plannedTSEExpansions: [],
      infrastructureInvestments: [
        { name: "NEOM Renewable Energy Hub Phase 2 (Solar+Wind)", amount: "SAR 8.5B", year: 2027 },
        { name: "NEOM Terabit Submarine Cable to Europe", amount: "SAR 1.2B", year: 2028 },
      ],
      scoreProjection: [{ year: 2025, score: 72 }, { year: 2027, score: 81 }, { year: 2030, score: 90 }],
      aiPrediction: "NEOM has the most dramatic score improvement trajectory of any site — driven by massive renewable energy build-out, desalination commissioning, and the terabit submarine cable. By 2030, it is projected to be one of the highest-scoring sites in the dataset. The near-term (2025–2026) score lags due to construction uncertainty.",
    },
    water: {
      summary: { availabilityScore: 70, distanceToInfrastructure: "4.2 km", reliability: "Medium" },
      detail: { cost: "SAR 4.20/m3 (new desalination — premium during ramp-up)", sustainability: "Red Sea seawater — unlimited feedstock, 100% renewable-powered by 2027", droughtRisk: "Low" },
    },
    power: {
      summary: { distanceToSubstation: "6 km", availableCapacityMW: 500, reliability: "Medium" },
      detail: { outageHistory: "Under construction — no operational history", electricityPrice: "SAR 0.14/kWh (renewable tariff)", renewableAvailability: "100% renewable — solar + wind on-site by 2027", expansionPotential: "GW-scale renewable expansion planned through 2030" },
    },
    climate: {
      summary: { avgYearlyTemp: "25°C", peakSummerTemp: "40°C", estimatedPUEImpact: "+0.08 PUE penalty vs. temperate climate" },
      detail: { humidity: "Low coastal — avg 38% RH", extremeHeatDays: 28 },
    },
    connectivity: {
      summary: { distanceToBackbone: "2.8 km", fiberProviders: 1, redundancy: "Partial" },
      detail: { latencyToMajorCities: "Riyadh: 42ms, Jeddah: 30ms, Cairo: 28ms, Aqaba: 8ms", proximityToIX: "NEOM Authority fiber — peering with regional exchanges planned 2027; submarine cable 2028" },
    },
    land: {
      summary: { landPrice: "SAR 250/m2", parcelSize: "500+ hectares allocated for tech zone", floodRisk: "Low" },
      detail: { flatnessSlope: "<1% grade — coastal plateau", soilStability: "Rocky limestone — excellent load-bearing once cleared", roomForExpansion: "Essentially unlimited — NEOM footprint spans 26,500 km²", distanceToRoads: "2 km to NEOM internal expressway" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Yes", sezStatus: "NEOM Special Zone (autonomous governance)", permittingSpeed: "3-4 months" },
      detail: { taxIncentives: "0% all taxes for duration of NEOM charter — 50+ years", environmentalRestrictions: "NEOM environmental code — stricter than national standard but efficiently administered", governmentSupport: "Direct royal backing — data infrastructure is core to NEOM master plan", easeOfPermits: "Easy" },
    },
  },

  // ── site-013: Jeddah 1st Industrial City ─────────────────────────
  {
    id: "site-013",
    name: "Jeddah 1st Industrial City",
    region: "Makkah",
    distanceFromRiyadh: 949,
    overallScore: 74,
    rating: "Good",
    coordinates: { lat: 21.576, lng: 39.239 },
    waterAccess: { score: 72, nearestTSELine: "2.8 km", availableCapacity: "62,000 m3/day", source: "Jeddah TSE Network + SWCC Desalination" },
    infrastructure: { score: 80, powerAvailability: "High", fiberConnectivity: "Multi-carrier fiber, 100 Gbps", roadAccess: "Direct access via King Abdul Aziz Road" },
    regulatory: { score: 74, agenciesInvolved: 4, estApprovalTime: "6-9 months", complexityLevel: "Medium" },
    coolingImpact: { airCooling: "+1,750 m3/day", liquidCooling: "+1,310 m3/day", immersionCooling: "+655 m3/day", dlcCooling: "+875 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+1,750 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+1,310 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+655 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+875 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Jeddah TSE Treatment Plant — North", type: "Water Treatment", distance: "2.8 km", status: "Operational" },
      { name: "SEC Jeddah Industrial Zone Substation", type: "Power", distance: "2.1 km", status: "Operational" },
      { name: "Jeddah Fiber Exchange Hub", type: "Connectivity", distance: "3.5 km", status: "Operational" },
      { name: "Jeddah Islamic Port", type: "Industrial Zone", distance: "6 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 72,
      riskLevel: "Medium",
      aiRecommendation: "Jeddah's water supply combines TSE and SWCC desalination, but urban demand is high. Allocation for new large-scale industrial users requires formal NWC assessment. Plan for 3–4 month water feasibility review.",
      nearbyWaterSources: [
        { plant: "Jeddah TSE Plant — North", distance: "2.8 km", capacity: "62,000 m3/day", status: "Operational" },
        { plant: "SWCC Jeddah Desalination Complex", distance: "9 km", capacity: "380,000 m3/day", status: "Operational" },
      ],
      availabilityTimeline: [{ year: 2025, score: 72 }, { year: 2027, score: 74 }, { year: 2030, score: 77 }],
      supportingDocuments: [{ name: "NWC Jeddah Industrial Allocation Framework 2024", type: "Regulatory" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "Jeddah Industrial Zone Substation J-4", voltage: "230 kV", distance: "2.1 km", spareCapacity: "130 MW available" },
      fiber: { provider: "STC, Mobily & Zain", redundancy: "Multi-path redundant", bandwidth: "100 Gbps", plannedExpansion: "Red Sea cable system extension 2026" },
      transportation: { nearestHighway: "King Abdul Aziz Road — direct access", airportDistance: "28 km to King Abdulaziz International Airport", logisticsNotes: "Jeddah Islamic Port 6 km — good for equipment import via Red Sea." },
      industrial: { nearbyIndustrialZones: ["Jeddah 1st Industrial City", "Jeddah 2nd Industrial City (8 km)"], utilityCorridors: ["Jeddah TSE Ring", "SWCC Coastal Pipeline"], existingDataCenters: ["STC Jeddah Data Center (5 km)"] },
      aiRecommendation: "Jeddah's mature fiber infrastructure (including submarine cable proximity) and port access make it strong for connectivity-sensitive workloads. Power and water are adequate but not exceptional — suitable for mid-scale deployments.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON", role: "Industrial occupancy licence" },
        { name: "SEC", role: "230 kV connection agreement" },
        { name: "NWC / SWCC", role: "Water allocation and TSE connection" },
        { name: "CST", role: "Data facility operating licence" },
      ],
      requiredPermits: ["MODON Occupancy Licence", "SEC Power Agreement", "NWC Water Allocation", "CST Data Facility Licence", "GDCD Fire Safety Certificate", "Jeddah Municipality Building Permit"],
      approvalProcess: [
        { step: "NWC Water Feasibility (pre-application)", description: "Urban demand competition means NWC feasibility is required before MODON submission.", typicalDuration: "6–8 weeks" },
        { step: "MODON Application", description: "Submit with NWC feasibility letter. Jeddah municipality building permit submitted in parallel.", typicalDuration: "5–7 weeks" },
        { step: "SEC & CST", description: "Power connection agreement and CST data facility licence in parallel.", typicalDuration: "6–8 weeks" },
        { step: "Safety & Final", description: "GDCD fire safety; MODON final occupancy.", typicalDuration: "3–4 weeks" },
      ],
      similarProjects: [{ name: "STC Jeddah Hyperscale Expansion", location: "Jeddah 2nd Industrial", approvalTime: "8 months" }],
      aiAdvice: "The urban water competition in Jeddah is the key risk — initiate the NWC feasibility study before any other application step. Approval path is otherwise standard MODON process.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [{ name: "Jeddah North SWCC Desalination Expansion", expectedCapacity: "150,000 m3/day", expectedYear: 2027 }],
      plannedTSEExpansions: [{ name: "Jeddah TSE Network Urban Extension", expectedCapacity: "55,000 m3/day", expectedYear: 2028 }],
      infrastructureInvestments: [
        { name: "Red Sea Submarine Cable Landing — Jeddah", amount: "SAR 280M", year: 2026 },
        { name: "SEC Jeddah Grid Reinforcement (J-4 Upgrade)", amount: "SAR 420M", year: 2027 },
      ],
      scoreProjection: [{ year: 2025, score: 74 }, { year: 2027, score: 76 }, { year: 2030, score: 79 }],
      aiPrediction: "Jeddah's connectivity will improve significantly once the Red Sea cable system extension completes in 2026, potentially adding 5–6 points to the site's overall profile. Water remains the binding constraint on long-term score growth.",
    },
    water: {
      summary: { availabilityScore: 72, distanceToInfrastructure: "2.8 km", reliability: "Medium" },
      detail: { cost: "SAR 3.20/m3 (blended TSE + desal)", sustainability: "Mixed TSE and desalination — SWCC backstop available", droughtRisk: "Low" },
    },
    power: {
      summary: { distanceToSubstation: "2.1 km", availableCapacityMW: 130, reliability: "High" },
      detail: { outageHistory: "2 outages in past 12 months", electricityPrice: "SAR 0.18/kWh", renewableAvailability: "Red Sea offshore wind corridor — early-stage studies", expansionPotential: "SEC J-4 upgrade adds 100 MW by 2027" },
    },
    climate: {
      summary: { avgYearlyTemp: "30°C", peakSummerTemp: "43°C", estimatedPUEImpact: "+0.16 PUE penalty vs. temperate climate" },
      detail: { humidity: "High coastal — avg 68% RH", extremeHeatDays: 44 },
    },
    connectivity: {
      summary: { distanceToBackbone: "3.5 km", fiberProviders: 3, redundancy: "Yes" },
      detail: { latencyToMajorCities: "Riyadh: 18ms, Jeddah CBD: 5ms, Dubai: 26ms, Cairo: 20ms", proximityToIX: "Jeddah Internet Exchange 12 km; Red Sea submarine cable system 2026" },
    },
    land: {
      summary: { landPrice: "SAR 820/m2", parcelSize: "40 hectares available", floodRisk: "Medium" },
      detail: { flatnessSlope: "<1.5% grade — some drainage engineering required", soilStability: "Sandy with shallow bedrock — good once drainage managed", roomForExpansion: "Constrained by urban density — adjacent plot requires negotiation", distanceToRoads: "0.8 km to King Abdul Aziz Road" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Yes", sezStatus: "MODON Industrial City", permittingSpeed: "6-9 months" },
      detail: { taxIncentives: "MODON standard industrial tariff — no DC-specific incentives", environmentalRestrictions: "Urban proximity requires noise and EMF assessment", governmentSupport: "MODON single-window; Jeddah municipality coordination required", easeOfPermits: "Moderate" },
    },
  },

  // ── site-014: Yanbu Industrial City ──────────────────────────────
  {
    id: "site-014",
    name: "Yanbu Industrial City",
    region: "Madinah",
    distanceFromRiyadh: 1050,
    overallScore: 70,
    rating: "Good",
    coordinates: { lat: 24.088, lng: 38.052 },
    waterAccess: { score: 75, nearestTSELine: "N/A", availableCapacity: "90,000 m3/day", source: "Yanbu SWCC Desalination Complex" },
    infrastructure: { score: 78, powerAvailability: "High", fiberConnectivity: "Dual-path fiber, 100 Gbps", roadAccess: "Direct access via King Fahd Road industrial spine" },
    regulatory: { score: 72, agenciesInvolved: 4, estApprovalTime: "7-9 months", complexityLevel: "Medium" },
    coolingImpact: { airCooling: "+1,600 m3/day", liquidCooling: "+1,200 m3/day", immersionCooling: "+600 m3/day", dlcCooling: "+800 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+1,600 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+1,200 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+600 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+800 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Yanbu SWCC Desalination Complex", type: "Water Treatment", distance: "3.5 km", status: "Operational" },
      { name: "SEC Yanbu Industrial Substation", type: "Power", distance: "2.8 km", status: "Operational" },
      { name: "STC Yanbu Fiber Hub", type: "Connectivity", distance: "4.1 km", status: "Operational" },
      { name: "Yanbu Industrial City Phase 2", type: "Industrial Zone", distance: "5 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 75,
      riskLevel: "Low",
      aiRecommendation: "Yanbu's SWCC desalination complex is one of the largest in the region with reliable Red Sea feedstock. Water cost is higher than TSE alternatives but supply security is excellent.",
      nearbyWaterSources: [{ plant: "Yanbu SWCC Desalination Complex", distance: "3.5 km", capacity: "90,000 m3/day", status: "Operational" }],
      availabilityTimeline: [{ year: 2025, score: 75 }, { year: 2027, score: 77 }, { year: 2030, score: 78 }],
      supportingDocuments: [{ name: "SWCC Yanbu Capacity Framework 2024", type: "Technical" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company / MARAFIQ", substation: "Yanbu Industrial Substation", voltage: "230 kV", distance: "2.8 km", spareCapacity: "110 MW available" },
      fiber: { provider: "STC & Mobily", redundancy: "Dual-path redundant", bandwidth: "100 Gbps", plannedExpansion: "Yanbu–Jeddah backbone capacity upgrade 2027" },
      transportation: { nearestHighway: "King Fahd Road — industrial spine", airportDistance: "52 km to Prince Abdul Mohsen Bin Abdulaziz Airport", logisticsNotes: "Yanbu Commercial Port 8 km — convenient for heavy equipment import." },
      industrial: { nearbyIndustrialZones: ["Yanbu Industrial City Phase 1 & 2", "Yanbu Petrochemical Complex"], utilityCorridors: ["MARAFIQ Utility Corridor", "SWCC Coastal Trunk Main"], existingDataCenters: ["SABIC Yanbu Data Center (12 km)"] },
      aiRecommendation: "Yanbu's petrochemical industrial heritage means proven heavy infrastructure — reliable power, robust roads, and experienced local contractors. Connectivity is the relative weakness, improving post-2027.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "Royal Commission for Yanbu (RCY)", role: "Primary regulator for all Yanbu industrial zone activity — single authority" },
        { name: "SEC / MARAFIQ", role: "Power and utility connection" },
        { name: "CST", role: "Data facility operating licence" },
        { name: "SWCC", role: "Desalination water allocation agreement" },
      ],
      requiredPermits: ["RCY Industrial Licence", "MARAFIQ Utility Agreement", "CST Data Facility Licence", "SWCC Water Allocation", "GDCD Fire Safety Certificate"],
      approvalProcess: [
        { step: "RCY Application", description: "Royal Commission for Yanbu single-window application.", typicalDuration: "5–6 weeks" },
        { step: "Utility Agreements", description: "MARAFIQ power + SWCC water allocation in parallel.", typicalDuration: "6–8 weeks" },
        { step: "CST Licence + Safety", description: "CST data facility licence + GDCD fire safety.", typicalDuration: "6–8 weeks" },
      ],
      similarProjects: [{ name: "SABIC Yanbu Digital Plant DC", location: "Yanbu Industrial", approvalTime: "8 months" }],
      aiAdvice: "The Royal Commission for Yanbu operates as a single-window authority similar to KAEC, which simplifies the process. The SWCC water allocation is the longest lead item — initiate in parallel with the RCY application.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [{ name: "Yanbu SWCC Phase 3 Expansion", expectedCapacity: "60,000 m3/day", expectedYear: 2028 }],
      plannedTSEExpansions: [],
      infrastructureInvestments: [
        { name: "Yanbu–Jeddah Fiber Backbone Capacity Upgrade", amount: "SAR 220M", year: 2027 },
        { name: "RCY Yanbu Industrial City Grid Upgrade", amount: "SAR 380M", year: 2028 },
      ],
      scoreProjection: [{ year: 2025, score: 70 }, { year: 2027, score: 72 }, { year: 2030, score: 75 }],
      aiPrediction: "Yanbu's score growth will be driven by connectivity improvements post-2027. The site is stable and reliable — growth is moderate rather than dramatic. Suitable for mid-scale deployments with a long horizon.",
    },
    water: {
      summary: { availabilityScore: 75, distanceToInfrastructure: "3.5 km", reliability: "High" },
      detail: { cost: "SAR 3.60/m3 (desalination premium)", sustainability: "Red Sea seawater — inexhaustible feedstock", droughtRisk: "Low" },
    },
    power: {
      summary: { distanceToSubstation: "2.8 km", availableCapacityMW: 110, reliability: "High" },
      detail: { outageHistory: "1 outage in past 12 months", electricityPrice: "SAR 0.18/kWh", renewableAvailability: "Red Sea wind corridor study under review", expansionPotential: "RCY grid upgrade adds 80 MW by 2028" },
    },
    climate: {
      summary: { avgYearlyTemp: "29°C", peakSummerTemp: "42°C", estimatedPUEImpact: "+0.14 PUE penalty vs. temperate climate" },
      detail: { humidity: "Moderate coastal — avg 50% RH", extremeHeatDays: 42 },
    },
    connectivity: {
      summary: { distanceToBackbone: "4.1 km", fiberProviders: 2, redundancy: "Partial" },
      detail: { latencyToMajorCities: "Jeddah: 22ms, Riyadh: 30ms, Madinah: 18ms", proximityToIX: "Jeddah Internet Exchange 140 km; Yanbu–Jeddah backbone upgrade 2027" },
    },
    land: {
      summary: { landPrice: "SAR 320/m2", parcelSize: "120 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "<0.8% grade — engineered industrial terrain", soilStability: "Compacted sandstone — excellent", roomForExpansion: "Phase 3 industrial zone adds 200 ha adjacent", distanceToRoads: "0.5 km to King Fahd Road" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Yes", sezStatus: "Royal Commission for Yanbu Industrial City", permittingSpeed: "7-9 months" },
      detail: { taxIncentives: "RCY standard industrial — no DC-specific incentives currently", environmentalRestrictions: "Petrochemical adjacency — EIA noise and air quality assessment mandatory", governmentSupport: "RCY single-window service; strong precedent from SABIC digital projects", easeOfPermits: "Moderate" },
    },
  },

  // ── site-015: Al-Khobar Technology Hub ───────────────────────────
  {
    id: "site-015",
    name: "Al-Khobar Technology Hub",
    region: "Eastern",
    distanceFromRiyadh: 397,
    overallScore: 73,
    rating: "Good",
    coordinates: { lat: 26.218, lng: 50.198 },
    waterAccess: { score: 68, nearestTSELine: "4.2 km", availableCapacity: "38,000 m3/day", source: "Eastern Province TSE + SWCC backup" },
    infrastructure: { score: 82, powerAvailability: "High", fiberConnectivity: "Multi-carrier fiber, 100 Gbps", roadAccess: "King Fahd Causeway Road access" },
    regulatory: { score: 72, agenciesInvolved: 4, estApprovalTime: "6-8 months", complexityLevel: "Medium" },
    coolingImpact: { airCooling: "+1,700 m3/day", liquidCooling: "+1,280 m3/day", immersionCooling: "+640 m3/day", dlcCooling: "+850 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+1,700 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+1,280 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+640 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+850 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Eastern Province TSE Offtake — Al-Khobar", type: "Water Treatment", distance: "4.2 km", status: "Operational" },
      { name: "SEC Al-Khobar Substation", type: "Power", distance: "1.9 km", status: "Operational" },
      { name: "STC/Mobily Al-Khobar Fiber Hub", type: "Connectivity", distance: "2.2 km", status: "Operational" },
      { name: "King Fahd Causeway Industrial Zone", type: "Industrial Zone", distance: "7 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 68,
      riskLevel: "Medium",
      aiRecommendation: "Al-Khobar's urban density creates competition for TSE allocation. SWCC desalination provides backup but at higher cost. A water demand management plan is recommended before NWC application.",
      nearbyWaterSources: [
        { plant: "Eastern Province TSE — Al-Khobar Offtake", distance: "4.2 km", capacity: "38,000 m3/day", status: "Operational" },
        { plant: "SWCC Al-Khobar Desalination", distance: "12 km", capacity: "185,000 m3/day", status: "Operational" },
      ],
      availabilityTimeline: [{ year: 2025, score: 68 }, { year: 2027, score: 70 }, { year: 2030, score: 72 }],
      supportingDocuments: [{ name: "NWC Eastern Province Urban Allocation Study 2024", type: "Regulatory" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "Al-Khobar Substation", voltage: "230 kV", distance: "1.9 km", spareCapacity: "95 MW available" },
      fiber: { provider: "STC, Mobily & Zain", redundancy: "Multi-path", bandwidth: "100 Gbps", plannedExpansion: "Bahrain–Al-Khobar submarine fiber upgrade 2026" },
      transportation: { nearestHighway: "King Fahd Causeway Road — direct", airportDistance: "24 km to King Fahd International Airport", logisticsNotes: "King Fahd Causeway access enables Bahrain equipment transit. Good regional connectivity." },
      industrial: { nearbyIndustrialZones: ["Al-Khobar Technology Hub", "Dhahran Tech Valley (9 km)"], utilityCorridors: ["Eastern Province High-Voltage Grid", "SWCC Al-Khobar Trunk Main"], existingDataCenters: ["Zain KSA Al-Khobar DC (4 km)"] },
      aiRecommendation: "Al-Khobar sits between Dhahran (stronger site) and Dammam — it offers good fiber and moderate power. The 95 MW spare capacity is adequate for mid-scale deployments. Consider Dhahran for larger requirements.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "Al-Khobar Municipality", role: "Building permit and zoning clearance" },
        { name: "SEC", role: "Power connection agreement" },
        { name: "NWC", role: "Water allocation — urban demand assessment required" },
        { name: "CST", role: "Data facility operating licence" },
      ],
      requiredPermits: ["Municipality Building Permit", "SEC Power Agreement", "NWC Water Allocation", "CST Data Facility Licence", "GDCD Fire Safety Certificate"],
      approvalProcess: [
        { step: "NWC Water Assessment", description: "Urban demand context requires water assessment before municipality application.", typicalDuration: "5–6 weeks" },
        { step: "Municipality & SEC", description: "Building permit and power connection agreement in parallel.", typicalDuration: "5–7 weeks" },
        { step: "CST & Safety", description: "CST licence and GDCD fire safety.", typicalDuration: "5–7 weeks" },
      ],
      similarProjects: [{ name: "Zain Al-Khobar Data Center Expansion", location: "Al-Khobar", approvalTime: "7 months" }],
      aiAdvice: "Al-Khobar municipality's urban planning process adds coordination complexity vs. MODON industrial cities. Allow extra time for building permit — municipality turnaround is less predictable than MODON.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [],
      plannedTSEExpansions: [{ name: "Eastern Province Urban TSE Extension — Al-Khobar", expectedCapacity: "30,000 m3/day", expectedYear: 2027 }],
      infrastructureInvestments: [
        { name: "Bahrain–Al-Khobar Submarine Fiber Upgrade", amount: "SAR 140M", year: 2026 },
        { name: "SEC Al-Khobar 380 kV Upgrade", amount: "SAR 310M", year: 2028 },
      ],
      scoreProjection: [{ year: 2025, score: 73 }, { year: 2027, score: 75 }, { year: 2030, score: 77 }],
      aiPrediction: "Al-Khobar will see moderate improvement post-2026 connectivity upgrade. It remains a solid secondary-market site for Eastern Province deployments where Dhahran land or capacity is unavailable.",
    },
    water: {
      summary: { availabilityScore: 68, distanceToInfrastructure: "4.2 km", reliability: "Medium" },
      detail: { cost: "SAR 3.10/m3 (blended)", sustainability: "TSE + desalination backup — urban competition for allocation", droughtRisk: "Low" },
    },
    power: {
      summary: { distanceToSubstation: "1.9 km", availableCapacityMW: 95, reliability: "High" },
      detail: { outageHistory: "1 outage in past 12 months", electricityPrice: "SAR 0.18/kWh", renewableAvailability: "Solar PPA projects in Eastern Province — no direct site access yet", expansionPotential: "SEC 380 kV upgrade by 2028 adds 80 MW" },
    },
    climate: {
      summary: { avgYearlyTemp: "27°C", peakSummerTemp: "45°C", estimatedPUEImpact: "+0.15 PUE penalty vs. temperate climate" },
      detail: { humidity: "High coastal — avg 65% RH", extremeHeatDays: 52 },
    },
    connectivity: {
      summary: { distanceToBackbone: "2.2 km", fiberProviders: 3, redundancy: "Yes" },
      detail: { latencyToMajorCities: "Riyadh: 13ms, Dubai: 19ms, Bahrain: 3ms, Dhahran: 6ms", proximityToIX: "SAIX Dammam 14 km; Bahrain Internet Exchange via submarine cable 2026" },
    },
    land: {
      summary: { landPrice: "SAR 940/m2", parcelSize: "28 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "<0.9% grade", soilStability: "Sandy with shallow bedrock — manageable", roomForExpansion: "Constrained — urban setting limits large expansion", distanceToRoads: "0.4 km to main arterial" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Yes", sezStatus: "Not in SEZ — urban municipality zone", permittingSpeed: "6-8 months" },
      detail: { taxIncentives: "No DC-specific incentives", environmentalRestrictions: "Urban noise and EMF standards — standard commercial zone review", governmentSupport: "Municipality has approved several data center projects previously", easeOfPermits: "Moderate" },
    },
  },

  // ── site-016: Ras Al-Khair Industrial City ───────────────────────
  {
    id: "site-016",
    name: "Ras Al-Khair Industrial City",
    region: "Eastern",
    distanceFromRiyadh: 450,
    overallScore: 66,
    rating: "Good",
    coordinates: { lat: 27.063, lng: 49.547 },
    waterAccess: { score: 72, nearestTSELine: "N/A", availableCapacity: "110,000 m3/day", source: "Ras Al-Khair SWCC Complex (world's largest desal)" },
    infrastructure: { score: 70, powerAvailability: "High", fiberConnectivity: "Single-path fiber, 40 Gbps", roadAccess: "Highway 613 access" },
    regulatory: { score: 64, agenciesInvolved: 5, estApprovalTime: "9-12 months", complexityLevel: "Medium" },
    coolingImpact: { airCooling: "+1,550 m3/day", liquidCooling: "+1,165 m3/day", immersionCooling: "+580 m3/day", dlcCooling: "+775 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+1,550 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+1,165 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+580 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+775 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Ras Al-Khair SWCC Desalination Complex", type: "Water Treatment", distance: "2.0 km", status: "Operational" },
      { name: "SEC Ras Al-Khair Industrial Substation", type: "Power", distance: "3.5 km", status: "Operational" },
      { name: "STC Ras Al-Khair Fiber Point", type: "Connectivity", distance: "6.8 km", status: "Operational" },
      { name: "Maaden Mining Industrial Zone", type: "Industrial Zone", distance: "4 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 72,
      riskLevel: "Low",
      aiRecommendation: "Ras Al-Khair has the world's largest single-site desalination complex — water supply security is exceptional. The cost is higher than TSE but the volume available is virtually unlimited for any practical DC deployment.",
      nearbyWaterSources: [{ plant: "Ras Al-Khair SWCC Complex", distance: "2.0 km", capacity: "1,025,000 m3/day (full complex)", status: "Operational" }],
      availabilityTimeline: [{ year: 2025, score: 72 }, { year: 2027, score: 74 }, { year: 2030, score: 76 }],
      supportingDocuments: [{ name: "SWCC Ras Al-Khair Capacity and Allocation Framework", type: "Technical" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "Ras Al-Khair Industrial Substation", voltage: "230 kV", distance: "3.5 km", spareCapacity: "85 MW available" },
      fiber: { provider: "STC (single carrier)", redundancy: "Single-path — no redundancy", bandwidth: "40 Gbps", plannedExpansion: "Eastern Province Fiber Extension planned 2027" },
      transportation: { nearestHighway: "Highway 613", airportDistance: "62 km to King Fahd International Airport", logisticsNotes: "Heavy-industry port at Ras Al-Khair for equipment import — dedicated logistics infrastructure." },
      industrial: { nearbyIndustrialZones: ["Ras Al-Khair Industrial City", "Maaden Zone (4 km)"], utilityCorridors: ["SWCC Coastal Trunk Main", "SEC Heavy Industry Corridor"], existingDataCenters: ["Maaden Operations DC (7 km)"] },
      aiRecommendation: "Strong water and power but connectivity is the critical weakness — single-path 40 Gbps fiber is insufficient for any carrier-grade data center. The 2027 fiber extension is key. Best suited for back-office or HPC deployments where connectivity latency is secondary.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON", role: "Industrial occupancy licence" },
        { name: "SEC", role: "Power connection" },
        { name: "SWCC", role: "Desalination water allocation" },
        { name: "CST", role: "Data facility licence" },
        { name: "Royal Commission for Jubail & Yanbu", role: "Regional industrial clearance" },
      ],
      requiredPermits: ["MODON Licence", "SEC Power Agreement", "SWCC Water Allocation", "CST Licence", "RCJY Clearance", "GDCD Fire Safety"],
      approvalProcess: [
        { step: "RCJY Pre-clearance", description: "Regional commission clearance required before MODON application.", typicalDuration: "6–8 weeks" },
        { step: "MODON + SWCC", description: "Industrial licence and water allocation in parallel.", typicalDuration: "8–10 weeks" },
        { step: "SEC + CST + Safety", description: "Power agreement, CST licence, and GDCD fire safety.", typicalDuration: "7–9 weeks" },
      ],
      similarProjects: [{ name: "Maaden Digital Operations Center", location: "Ras Al-Khair", approvalTime: "11 months" }],
      aiAdvice: "The RCJY pre-clearance step is unique to this region and adds 6–8 weeks to the critical path. Factor this in before MODON submission. Allow 9–12 months total.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [],
      plannedTSEExpansions: [],
      infrastructureInvestments: [
        { name: "Eastern Province Fiber Extension — Ras Al-Khair Branch", amount: "SAR 180M", year: 2027 },
        { name: "SEC Ras Al-Khair Substation 380 kV Upgrade", amount: "SAR 290M", year: 2028 },
      ],
      scoreProjection: [{ year: 2025, score: 66 }, { year: 2027, score: 70 }, { year: 2030, score: 74 }],
      aiPrediction: "The 2027 fiber extension is the pivotal investment for Ras Al-Khair — once redundant connectivity is available, the score moves from constrained to competitive. Water and power are already strong. Post-2027, this becomes a viable mid-tier option.",
    },
    water: {
      summary: { availabilityScore: 72, distanceToInfrastructure: "2.0 km", reliability: "High" },
      detail: { cost: "SAR 4.10/m3 (SWCC desalination tariff)", sustainability: "World's largest desalination site — unlimited supply", droughtRisk: "Low" },
    },
    power: {
      summary: { distanceToSubstation: "3.5 km", availableCapacityMW: 85, reliability: "High" },
      detail: { outageHistory: "1 outage in past 12 months", electricityPrice: "SAR 0.18/kWh", renewableAvailability: "No commercial renewable project nearby", expansionPotential: "SEC 380 kV upgrade planned 2028" },
    },
    climate: {
      summary: { avgYearlyTemp: "27°C", peakSummerTemp: "46°C", estimatedPUEImpact: "+0.15 PUE penalty vs. temperate climate" },
      detail: { humidity: "Moderate — avg 48% RH", extremeHeatDays: 58 },
    },
    connectivity: {
      summary: { distanceToBackbone: "6.8 km", fiberProviders: 1, redundancy: "No" },
      detail: { latencyToMajorCities: "Riyadh: 18ms, Dammam: 12ms, Dubai: 22ms", proximityToIX: "SAIX Dammam 80 km; fiber extension planned 2027 — no redundancy until then" },
    },
    land: {
      summary: { landPrice: "SAR 180/m2", parcelSize: "300 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "<0.5% grade — coastal flat", soilStability: "Compacted coastal sand — engineered industrial grade", roomForExpansion: "Vast industrial zone with 500+ ha reserved for expansion", distanceToRoads: "1.2 km to Highway 613" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "MODON Heavy Industrial City", permittingSpeed: "9-12 months" },
      detail: { taxIncentives: "Heavy industry tariff — no DC-specific incentives", environmentalRestrictions: "Heavy industry adjacency requires full EIA and air quality study", governmentSupport: "RCJY regional support for industrial diversification — data centers qualify", easeOfPermits: "Moderate" },
    },
  },

  // ── site-017: Hail Industrial City ───────────────────────────────
  {
    id: "site-017",
    name: "Hail Industrial City",
    region: "Hail",
    distanceFromRiyadh: 678,
    overallScore: 62,
    rating: "Good",
    coordinates: { lat: 27.524, lng: 41.705 },
    waterAccess: { score: 52, nearestTSELine: "5.8 km", availableCapacity: "18,000 m3/day", source: "Hail Municipal TSE Plant" },
    infrastructure: { score: 68, powerAvailability: "Medium", fiberConnectivity: "Single-path fiber, 20 Gbps", roadAccess: "Highway 65 access" },
    regulatory: { score: 66, agenciesInvolved: 4, estApprovalTime: "8-10 months", complexityLevel: "Medium" },
    coolingImpact: { airCooling: "+950 m3/day", liquidCooling: "+710 m3/day", immersionCooling: "+355 m3/day", dlcCooling: "+475 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+950 m3/day",  energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+710 m3/day",  energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+355 m3/day",  energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+475 m3/day",  energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Hail Municipal TSE Plant", type: "Water Treatment", distance: "5.8 km", status: "Operational" },
      { name: "SEC Hail Grid Station", type: "Power", distance: "4.2 km", status: "Operational" },
      { name: "STC Hail Fiber Hub", type: "Connectivity", distance: "6.1 km", status: "Operational" },
      { name: "Hail Industrial City Phase 1", type: "Industrial Zone", distance: "2 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 52,
      riskLevel: "Medium",
      aiRecommendation: "Hail's water supply is limited — the municipal TSE plant serves urban demand first. Large industrial water allocations require regional exemptions and a water demand management plan.",
      nearbyWaterSources: [{ plant: "Hail Municipal TSE Plant", distance: "5.8 km", capacity: "18,000 m3/day", status: "Operational" }],
      availabilityTimeline: [{ year: 2025, score: 52 }, { year: 2027, score: 55 }, { year: 2030, score: 58 }],
      supportingDocuments: [{ name: "NWC Hail Region Water Availability Report", type: "Regulatory" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "Hail Grid Station H-2", voltage: "132 kV", distance: "4.2 km", spareCapacity: "55 MW available" },
      fiber: { provider: "STC (single carrier)", redundancy: "No redundancy", bandwidth: "20 Gbps", plannedExpansion: "Hail–Riyadh backbone feeder upgrade 2027" },
      transportation: { nearestHighway: "Highway 65 — access via regional road", airportDistance: "18 km to Ha'il Regional Airport", logisticsNotes: "Good air freight logistics via Ha'il airport. Ground logistics via Highway 65 to Riyadh (7 hours)." },
      industrial: { nearbyIndustrialZones: ["Hail Industrial City Phase 1 & 2"], utilityCorridors: ["Hail Regional TSE Network"], existingDataCenters: ["Hail University Research DC (12 km)"] },
      aiRecommendation: "Hail is a secondary market with genuine geographic appeal (central location, cool highland climate) but infrastructure gaps in water and fiber need addressing. Suitable for edge deployments or government backup DCs targeting the northern region.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON", role: "Industrial occupancy licence" },
        { name: "SEC", role: "132 kV connection agreement" },
        { name: "NWC", role: "Water allocation — water stress zone review required" },
        { name: "CST", role: "Data facility operating licence" },
      ],
      requiredPermits: ["MODON Licence", "SEC Power Agreement", "NWC Water Allocation", "CST Licence", "GDCD Fire Safety", "MEWA Water Stress Exemption"],
      approvalProcess: [
        { step: "NWC + MEWA Water Assessment", description: "Water stress zone designation requires parallel MEWA and NWC assessment.", typicalDuration: "8–10 weeks" },
        { step: "MODON Application", description: "Industrial licence with water feasibility documentation.", typicalDuration: "6–8 weeks" },
        { step: "SEC + CST + Safety", description: "Power agreement, CST licence, fire safety.", typicalDuration: "6–8 weeks" },
      ],
      similarProjects: [{ name: "Hail University DR Site", location: "Hail", approvalTime: "10 months" }],
      aiAdvice: "The MEWA water stress review adds 8–10 weeks to the path and is non-negotiable. Start this before any other application. The SEC 132 kV capacity at 55 MW limits initial scale — plan for a grid upgrade request if deploying >40 MW.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [],
      plannedTSEExpansions: [{ name: "Hail Municipal TSE Plant Expansion", expectedCapacity: "12,000 m3/day", expectedYear: 2028 }],
      infrastructureInvestments: [
        { name: "Hail–Riyadh Fiber Backbone Upgrade (STC)", amount: "SAR 320M", year: 2027 },
        { name: "SEC Hail 230 kV Grid Upgrade", amount: "SAR 260M", year: 2029 },
      ],
      scoreProjection: [{ year: 2025, score: 62 }, { year: 2027, score: 65 }, { year: 2030, score: 70 }],
      aiPrediction: "Hail's score will improve moderately as the fiber backbone upgrade (2027) and SEC grid improvement (2029) arrive. The TSE expansion in 2028 addresses water to a degree. By 2030, Hail becomes a viable edge/regional site for northern Saudi deployments.",
    },
    water: {
      summary: { availabilityScore: 52, distanceToInfrastructure: "5.8 km", reliability: "Medium" },
      detail: { cost: "SAR 4.80/m3 (limited local TSE, trucking supplement)", sustainability: "Limited municipal TSE — supplemented by fossil water", droughtRisk: "High" },
    },
    power: {
      summary: { distanceToSubstation: "4.2 km", availableCapacityMW: 55, reliability: "Medium" },
      detail: { outageHistory: "3 outages in past 12 months", electricityPrice: "SAR 0.20/kWh", renewableAvailability: "Excellent wind resource — 340 MW wind farm 45 km north", expansionPotential: "SEC 230 kV upgrade funded for 2029" },
    },
    climate: {
      summary: { avgYearlyTemp: "22°C", peakSummerTemp: "40°C", estimatedPUEImpact: "+0.06 PUE penalty vs. temperate climate" },
      detail: { humidity: "Very low — avg 12% RH", extremeHeatDays: 22 },
    },
    connectivity: {
      summary: { distanceToBackbone: "6.1 km", fiberProviders: 1, redundancy: "No" },
      detail: { latencyToMajorCities: "Riyadh: 28ms, Jeddah: 42ms, Dammam: 35ms", proximityToIX: "SAIX Riyadh Internet Exchange — 640 km; backbone upgrade 2027 improves path" },
    },
    land: {
      summary: { landPrice: "SAR 95/m2", parcelSize: "200 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "<1.2% grade — highland plateau", soilStability: "Rocky basalt — excellent load-bearing", roomForExpansion: "Abundant land in industrial zone with government incentives", distanceToRoads: "2.5 km to Highway 65 junction" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "Not in SEZ", permittingSpeed: "8-10 months" },
      detail: { taxIncentives: "Regional development incentive — 3-year tax holiday for northern-region investments", environmentalRestrictions: "Water stress zone — MEWA mandatory review", governmentSupport: "National Transformation Programme includes Hail as regional hub — data center investment supported", easeOfPermits: "Moderate" },
    },
  },

  // ── site-018: Al-Ahsa Industrial City ────────────────────────────
  {
    id: "site-018",
    name: "Al-Ahsa Industrial City",
    region: "Eastern",
    distanceFromRiyadh: 345,
    overallScore: 65,
    rating: "Good",
    coordinates: { lat: 25.379, lng: 49.583 },
    waterAccess: { score: 62, nearestTSELine: "3.8 km", availableCapacity: "28,000 m3/day", source: "Al-Ahsa TSE Plant + Artesian Wells (supplementary)" },
    infrastructure: { score: 70, powerAvailability: "Medium", fiberConnectivity: "Dual-path fiber, 40 Gbps", roadAccess: "Highway 605 — 3 km access road" },
    regulatory: { score: 64, agenciesInvolved: 4, estApprovalTime: "8-11 months", complexityLevel: "Medium" },
    coolingImpact: { airCooling: "+1,100 m3/day", liquidCooling: "+825 m3/day", immersionCooling: "+412 m3/day", dlcCooling: "+550 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+1,100 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+825 m3/day",   energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+412 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+550 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Al-Ahsa TSE Plant", type: "Water Treatment", distance: "3.8 km", status: "Operational" },
      { name: "SEC Al-Ahsa Grid Station", type: "Power", distance: "5.2 km", status: "Operational" },
      { name: "STC Al-Ahsa Fiber Hub", type: "Connectivity", distance: "4.4 km", status: "Operational" },
      { name: "Al-Ahsa MODON Industrial Zone", type: "Industrial Zone", distance: "1.5 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 62,
      riskLevel: "Medium",
      aiRecommendation: "Al-Ahsa's TSE supply is constrained — the oasis region has historically faced water stress. Artesian wells are being phased out under NWC policy. A comprehensive water demand management plan is essential.",
      nearbyWaterSources: [
        { plant: "Al-Ahsa TSE Plant", distance: "3.8 km", capacity: "28,000 m3/day", status: "Operational" },
      ],
      availabilityTimeline: [{ year: 2025, score: 62 }, { year: 2027, score: 64 }, { year: 2030, score: 66 }],
      supportingDocuments: [{ name: "NWC Al-Ahsa Water Stress Zone Report 2024", type: "Regulatory" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "Al-Ahsa Grid Station", voltage: "132 kV", distance: "5.2 km", spareCapacity: "65 MW available" },
      fiber: { provider: "STC & Mobily", redundancy: "Partial dual-path", bandwidth: "40 Gbps", plannedExpansion: "Al-Ahsa Digital City initiative — 100 Gbps upgrade 2027" },
      transportation: { nearestHighway: "Highway 605 — 3 km regional road", airportDistance: "15 km to Al-Ahsa International Airport", logisticsNotes: "Al-Ahsa airport has direct connections to Riyadh and Dammam — adequate for equipment logistics." },
      industrial: { nearbyIndustrialZones: ["Al-Ahsa MODON Industrial City", "Hofuf Commercial Zone (18 km)"], utilityCorridors: ["Al-Ahsa Regional Grid", "TSE Oasis Ring Pipeline"], existingDataCenters: ["Al-Ahsa University Research DC (8 km)"] },
      aiRecommendation: "Al-Ahsa is positioned as a secondary Eastern Province site with oasis heritage and good land availability. Infrastructure gaps in power capacity and connectivity limit near-term large-scale deployments. The 2027 digital city upgrade could change the picture.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON", role: "Industrial occupancy licence" },
        { name: "SEC", role: "132 kV connection" },
        { name: "NWC / MEWA", role: "Water stress zone review and allocation" },
        { name: "CST", role: "Data facility licence" },
      ],
      requiredPermits: ["MODON Licence", "SEC Power Agreement", "MEWA Water Stress Approval", "NWC Water Allocation", "CST Licence", "GDCD Fire Safety"],
      approvalProcess: [
        { step: "MEWA + NWC Water Assessment", description: "Mandatory water stress zone review — parallel MEWA/NWC process.", typicalDuration: "10–12 weeks" },
        { step: "MODON + SEC", description: "Industrial licence and power agreement in parallel.", typicalDuration: "7–9 weeks" },
        { step: "CST + Safety", description: "Data facility licence and fire safety.", typicalDuration: "6–8 weeks" },
      ],
      similarProjects: [{ name: "Al-Ahsa University Distributed DC", location: "Al-Ahsa", approvalTime: "11 months" }],
      aiAdvice: "The water stress zone designation for Al-Ahsa adds 10–12 weeks for the MEWA review — this is the most complex water approval situation in the Eastern Province outside Hail. Begin water process 3 months before any other application.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [],
      plannedTSEExpansions: [{ name: "Al-Ahsa TSE Plant Phase 2", expectedCapacity: "20,000 m3/day", expectedYear: 2028 }],
      infrastructureInvestments: [
        { name: "Al-Ahsa Digital City — Fiber 100 Gbps Upgrade", amount: "SAR 145M", year: 2027 },
        { name: "SEC Al-Ahsa 230 kV Grid Conversion", amount: "SAR 310M", year: 2029 },
      ],
      scoreProjection: [{ year: 2025, score: 65 }, { year: 2027, score: 68 }, { year: 2030, score: 72 }],
      aiPrediction: "Al-Ahsa's Digital City initiative is the key driver of score improvement. If the 100 Gbps fiber upgrade and SEC grid conversion both deliver on schedule, the site crosses 70 by 2030 and becomes competitive for mid-scale Eastern Province deployments.",
    },
    water: {
      summary: { availabilityScore: 62, distanceToInfrastructure: "3.8 km", reliability: "Medium" },
      detail: { cost: "SAR 4.40/m3 (TSE + well supplement)", sustainability: "Artesian wells being phased out — TSE only post-2026", droughtRisk: "High" },
    },
    power: {
      summary: { distanceToSubstation: "5.2 km", availableCapacityMW: 65, reliability: "Medium" },
      detail: { outageHistory: "4 outages in past 12 months", electricityPrice: "SAR 0.20/kWh", renewableAvailability: "Solar resource excellent — 250 MW project planned Hofuf area 2027", expansionPotential: "SEC 230 kV conversion by 2029 adds 120 MW capacity" },
    },
    climate: {
      summary: { avgYearlyTemp: "27°C", peakSummerTemp: "46°C", estimatedPUEImpact: "+0.15 PUE penalty vs. temperate climate" },
      detail: { humidity: "Low — avg 20% RH", extremeHeatDays: 65 },
    },
    connectivity: {
      summary: { distanceToBackbone: "4.4 km", fiberProviders: 2, redundancy: "Partial" },
      detail: { latencyToMajorCities: "Riyadh: 16ms, Dammam: 10ms, Dubai: 24ms", proximityToIX: "SAIX Dammam 80 km; Al-Ahsa Digital City fiber upgrade 2027 improves path" },
    },
    land: {
      summary: { landPrice: "SAR 140/m2", parcelSize: "250 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "<0.6% grade — oasis flat terrain", soilStability: "Sandy oasis soil — some foundation engineering required", roomForExpansion: "Vast agricultural land adjacent — development rights pending MoMRA review", distanceToRoads: "3 km to Highway 605" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "Not in SEZ", permittingSpeed: "8-11 months" },
      detail: { taxIncentives: "Eastern Province investment incentive — standard MISA package", environmentalRestrictions: "Oasis heritage protection zone — MoMRA review for land adjacent to historic agricultural areas", governmentSupport: "Al-Ahsa Digital City initiative provides government facilitation for tech investments", easeOfPermits: "Moderate" },
    },
  },

  // ── site-019: Madinah Industrial Zone ────────────────────────────
  {
    id: "site-019",
    name: "Madinah Industrial Zone",
    region: "Madinah",
    distanceFromRiyadh: 871,
    overallScore: 54,
    rating: "Moderate",
    coordinates: { lat: 24.523, lng: 39.647 },
    waterAccess: { score: 48, nearestTSELine: "6.2 km", availableCapacity: "22,000 m3/day", source: "Madinah TSE Plant (limited allocation for industrial)" },
    infrastructure: { score: 60, powerAvailability: "Medium", fiberConnectivity: "Single-path fiber, 20 Gbps", roadAccess: "King Fahd Road — 5 km access" },
    regulatory: { score: 54, agenciesInvolved: 5, estApprovalTime: "10-14 months", complexityLevel: "High" },
    coolingImpact: { airCooling: "+850 m3/day", liquidCooling: "+640 m3/day", immersionCooling: "+320 m3/day", dlcCooling: "+425 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+850 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+640 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+320 m3/day", energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+425 m3/day", energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Madinah TSE Plant", type: "Water Treatment", distance: "6.2 km", status: "Operational" },
      { name: "SEC Madinah North Substation", type: "Power", distance: "7.1 km", status: "Operational" },
      { name: "STC Madinah Fiber Hub", type: "Connectivity", distance: "8.5 km", status: "Operational" },
      { name: "Madinah Industrial City Phase 1", type: "Industrial Zone", distance: "2 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 48,
      riskLevel: "High",
      aiRecommendation: "Madinah's water supply is severely constrained — the holy city's religious designation limits industrial water allocation. Large-scale TSE use for data center cooling requires exceptional ministerial approval.",
      nearbyWaterSources: [{ plant: "Madinah TSE Plant", distance: "6.2 km", capacity: "22,000 m3/day", status: "Operational" }],
      availabilityTimeline: [{ year: 2025, score: 48 }, { year: 2027, score: 50 }, { year: 2030, score: 53 }],
      supportingDocuments: [{ name: "Madinah Holy City Water Allocation Framework", type: "Regulatory" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "Madinah North Substation", voltage: "132 kV", distance: "7.1 km", spareCapacity: "40 MW available" },
      fiber: { provider: "STC (single carrier)", redundancy: "No redundancy", bandwidth: "20 Gbps", plannedExpansion: "Madinah Smart City Initiative — fiber upgrade 2028" },
      transportation: { nearestHighway: "King Fahd Road — 5 km access road", airportDistance: "12 km to Prince Mohammad Bin Abdulaziz Airport", logisticsNotes: "Airport access is good; ground logistics via the Haramain High Speed Railway corridor." },
      industrial: { nearbyIndustrialZones: ["Madinah Industrial City Phase 1"], utilityCorridors: ["Madinah TSE Distribution Ring"], existingDataCenters: ["Islamic University of Madinah DC (15 km)"] },
      aiRecommendation: "Madinah's holy city status adds unique regulatory complexity and cultural sensitivities that extend timelines. For most commercial data center projects, other regions offer a better risk profile. Consider only for government-mandated regional presence requirements.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON", role: "Industrial occupancy licence" },
        { name: "Madinah Regional Municipality", role: "Building permit + holy city compliance clearance" },
        { name: "Ministry of Hajj & Umrah", role: "Non-objection certificate for industrial activities near holy sites" },
        { name: "NWC / MEWA", role: "Water stress allocation — ministerial sign-off required" },
        { name: "CST", role: "Data facility licence" },
      ],
      requiredPermits: ["MODON Licence", "Madinah Municipality Building Permit", "Ministry of Hajj NOC", "NWC Water Allocation (ministerial)", "CST Licence", "GDCD Fire Safety"],
      approvalProcess: [
        { step: "Ministry of Hajj NOC", description: "Non-objection from Ministry of Hajj & Umrah is the critical first step — may require site visit.", typicalDuration: "10–14 weeks" },
        { step: "Madinah Municipality + MODON", description: "Holy city compliance clearance alongside MODON industrial licence.", typicalDuration: "8–10 weeks" },
        { step: "Water + Utility + CST", description: "Ministerial water allocation, SEC connection, CST licence — all sequentially dependent.", typicalDuration: "10–12 weeks" },
      ],
      similarProjects: [{ name: "Government Madinah Regional DR Site", location: "Madinah", approvalTime: "14 months" }],
      aiAdvice: "The Ministry of Hajj NOC requirement is unique to Madinah and unpredictable in timing — allow 3–4 months minimum. This site should only be pursued if a regional presence in Madinah is a hard regulatory requirement.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [],
      plannedTSEExpansions: [{ name: "Madinah TSE Plant Capacity Expansion", expectedCapacity: "15,000 m3/day", expectedYear: 2029 }],
      infrastructureInvestments: [
        { name: "Madinah Smart City Fiber Initiative", amount: "SAR 380M", year: 2028 },
        { name: "SEC Madinah 230 kV Grid Upgrade", amount: "SAR 290M", year: 2030 },
      ],
      scoreProjection: [{ year: 2025, score: 54 }, { year: 2028, score: 57 }, { year: 2030, score: 59 }],
      aiPrediction: "Madinah's infrastructure investments are long-dated (2028–2030) and the regulatory path remains the most complex in the dataset. Score improvement will be slow. Pursue only for government-mandated regional requirements.",
    },
    water: {
      summary: { availabilityScore: 48, distanceToInfrastructure: "6.2 km", reliability: "Low" },
      detail: { cost: "SAR 5.20/m3 (limited TSE + trucking)", sustainability: "Severely constrained — religious city priority allocation limits industrial use", droughtRisk: "High" },
    },
    power: {
      summary: { distanceToSubstation: "7.1 km", availableCapacityMW: 40, reliability: "Medium" },
      detail: { outageHistory: "4 outages in past 12 months", electricityPrice: "SAR 0.20/kWh", renewableAvailability: "Solar corridor nearby — no direct site access", expansionPotential: "SEC 230 kV upgrade not funded until 2030" },
    },
    climate: {
      summary: { avgYearlyTemp: "30°C", peakSummerTemp: "44°C", estimatedPUEImpact: "+0.15 PUE penalty vs. temperate climate" },
      detail: { humidity: "Very low — avg 10% RH", extremeHeatDays: 55 },
    },
    connectivity: {
      summary: { distanceToBackbone: "8.5 km", fiberProviders: 1, redundancy: "No" },
      detail: { latencyToMajorCities: "Riyadh: 30ms, Jeddah: 25ms, Yanbu: 18ms", proximityToIX: "Jeddah Internet Exchange 420 km; Madinah Smart City upgrade 2028" },
    },
    land: {
      summary: { landPrice: "SAR 280/m2", parcelSize: "60 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "<1% grade — valley terrain", soilStability: "Rocky basalt — excellent once cleared", roomForExpansion: "Limited by holy city boundary restrictions on industrial expansion", distanceToRoads: "5 km access road to King Fahd Road" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "Not in SEZ — Holy City regulated zone", permittingSpeed: "10-14 months" },
      detail: { taxIncentives: "No DC-specific incentives", environmentalRestrictions: "Holy city proximity regulations: strict noise, emissions, and visual impact rules", governmentSupport: "Religious affairs ministry involvement slows government facilitation", easeOfPermits: "Difficult" },
    },
  },

  // ── site-020: Buraydah Technology Park ───────────────────────────
  {
    id: "site-020",
    name: "Buraydah Technology Park",
    region: "Qassim",
    distanceFromRiyadh: 323,
    overallScore: 61,
    rating: "Good",
    coordinates: { lat: 26.328, lng: 43.975 },
    waterAccess: { score: 52, nearestTSELine: "4.6 km", availableCapacity: "20,000 m3/day", source: "Buraydah Municipal TSE Plant" },
    infrastructure: { score: 68, powerAvailability: "Medium", fiberConnectivity: "Single-path fiber, 20 Gbps (upgrade planned)", roadAccess: "Highway 65 — direct access" },
    regulatory: { score: 64, agenciesInvolved: 4, estApprovalTime: "9-11 months", complexityLevel: "Medium" },
    coolingImpact: { airCooling: "+900 m3/day", liquidCooling: "+675 m3/day", immersionCooling: "+338 m3/day", dlcCooling: "+450 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+900 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+675 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+338 m3/day", energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+450 m3/day", energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Buraydah Municipal TSE Plant", type: "Water Treatment", distance: "4.6 km", status: "Operational" },
      { name: "SEC Buraydah Grid Station", type: "Power", distance: "3.8 km", status: "Operational" },
      { name: "STC Qassim Regional Fiber Hub", type: "Connectivity", distance: "5.2 km", status: "Operational" },
      { name: "Qassim Industrial City (co-located)", type: "Industrial Zone", distance: "3 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 52,
      riskLevel: "Medium",
      aiRecommendation: "Qassim is a designated water-stress region. Municipal TSE capacity is limited and MEWA oversight is mandatory for industrial allocations. Plan for 10+ week water assessment process.",
      nearbyWaterSources: [{ plant: "Buraydah Municipal TSE Plant", distance: "4.6 km", capacity: "20,000 m3/day", status: "Operational" }],
      availabilityTimeline: [{ year: 2025, score: 52 }, { year: 2027, score: 55 }, { year: 2030, score: 60 }],
      supportingDocuments: [{ name: "NWC Qassim Water Stress Zone Assessment 2024", type: "Regulatory" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "Buraydah Grid Station Q-3", voltage: "132 kV", distance: "3.8 km", spareCapacity: "48 MW available" },
      fiber: { provider: "STC (single carrier)", redundancy: "No redundancy", bandwidth: "20 Gbps", plannedExpansion: "Riyadh–Qassim Backbone Feeder adds 100 Gbps 2026" },
      transportation: { nearestHighway: "Highway 65 — direct site access", airportDistance: "22 km to Prince Nayef Bin Abdulaziz Airport", logisticsNotes: "Good ground logistics on Highway 65. Airport has direct Riyadh connections." },
      industrial: { nearbyIndustrialZones: ["Buraydah Technology Park", "Qassim Industrial City (3 km)"], utilityCorridors: ["Qassim Regional TSE Network", "Buraydah North Distribution"], existingDataCenters: ["Qassim University Research DC (10 km)"] },
      aiRecommendation: "Buraydah's primary advantage is the Riyadh–Qassim Backbone Feeder upgrade arriving in 2026, which will transform connectivity from inadequate to solid. Combined with low land costs and SEC grid upgrade due 2028, this site improves materially post-2026.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON", role: "Industrial city occupancy licence" },
        { name: "SEC", role: "132 kV connection" },
        { name: "NWC / MEWA", role: "Water stress zone review" },
        { name: "CST", role: "Data facility licence" },
      ],
      requiredPermits: ["MODON Licence", "SEC Power Agreement", "MEWA Water Stress Approval", "NWC Water Allocation", "CST Licence", "GDCD Fire Safety"],
      approvalProcess: [
        { step: "MEWA Water Stress Pre-approval", description: "Mandatory pre-application water stress assessment — submit 3 months before MODON.", typicalDuration: "10–12 weeks" },
        { step: "MODON + SEC", description: "Industrial licence and power connection in parallel.", typicalDuration: "6–8 weeks" },
        { step: "CST + Safety", description: "Data facility licence and fire safety clearance.", typicalDuration: "5–7 weeks" },
      ],
      similarProjects: [{ name: "NCA Qassim Disaster Recovery Site", location: "Buraydah", approvalTime: "11 months" }],
      aiAdvice: "Same MEWA water stress dynamics as Qassim Industrial City — start the water assessment 3 months before any other step. The backbone fiber upgrade in 2026 makes this a better mid-term prospect than the current score suggests.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [{ name: "Qassim Regional Desalination Booster Station", expectedCapacity: "45,000 m3/day", expectedYear: 2027 }],
      plannedTSEExpansions: [{ name: "Buraydah TSE Network Phase 2", expectedCapacity: "18,000 m3/day", expectedYear: 2028 }],
      infrastructureInvestments: [
        { name: "Riyadh–Qassim Backbone Fiber (STC) — Buraydah Extension", amount: "SAR 180M", year: 2026 },
        { name: "SEC Buraydah Grid Station Upgrade to 230 kV", amount: "SAR 240M", year: 2028 },
      ],
      scoreProjection: [{ year: 2025, score: 61 }, { year: 2027, score: 65 }, { year: 2030, score: 70 }],
      aiPrediction: "Buraydah Technology Park's score will see the strongest relative improvement among Qassim sites, driven by the fiber backbone and SEC upgrade. By 2030, it could compete with lower-tier Eastern Province sites. Good long-lead investment opportunity.",
    },
    water: {
      summary: { availabilityScore: 52, distanceToInfrastructure: "4.6 km", reliability: "Low" },
      detail: { cost: "SAR 5.10/m3 (water-stress zone premium)", sustainability: "Fossil groundwater supplement — unsustainable long-term; TSE expansion planned 2028", droughtRisk: "High" },
    },
    power: {
      summary: { distanceToSubstation: "3.8 km", availableCapacityMW: 48, reliability: "Medium" },
      detail: { outageHistory: "3 outages in past 12 months", electricityPrice: "SAR 0.20/kWh", renewableAvailability: "Excellent solar — 200 MW project 60 km northwest", expansionPotential: "SEC Q-3 upgrade to 230 kV funded for 2028 — adds 120 MW" },
    },
    climate: {
      summary: { avgYearlyTemp: "25°C", peakSummerTemp: "44°C", estimatedPUEImpact: "+0.09 PUE penalty vs. temperate climate" },
      detail: { humidity: "Very low — avg 11% RH", extremeHeatDays: 38 },
    },
    connectivity: {
      summary: { distanceToBackbone: "5.2 km", fiberProviders: 1, redundancy: "No" },
      detail: { latencyToMajorCities: "Riyadh: 20ms, Jeddah: 35ms, Dammam: 28ms", proximityToIX: "SAIX Riyadh 290 km; backbone feeder upgrade 2026 dramatically improves path" },
    },
    land: {
      summary: { landPrice: "SAR 90/m2", parcelSize: "150 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "<0.8% grade — arid plateau", soilStability: "Compact sand on bedrock — good once drainage managed", roomForExpansion: "Technology park has 300 ha earmarked for expansion", distanceToRoads: "0.5 km to Highway 65" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "Not in SEZ", permittingSpeed: "9-11 months" },
      detail: { taxIncentives: "Regional development incentive — MISA 2-year tax relief package", environmentalRestrictions: "Water stress zone — full EIA and MEWA review mandatory", governmentSupport: "Qassim Smart City initiative — data center investment classified as qualifying tech project", easeOfPermits: "Moderate" },
    },
  },

  // ── site-021: Tabuk Industrial City ──────────────────────────────
  {
    id: "site-021",
    name: "Tabuk Industrial City",
    region: "Tabuk",
    distanceFromRiyadh: 1320,
    overallScore: 55,
    rating: "Moderate",
    coordinates: { lat: 28.396, lng: 36.563 },
    waterAccess: { score: 42, nearestTSELine: "7.2 km", availableCapacity: "14,000 m3/day", source: "Tabuk Municipal TSE Plant" },
    infrastructure: { score: 60, powerAvailability: "Medium", fiberConnectivity: "Single-path fiber, 20 Gbps", roadAccess: "Highway 15 — 4 km access road" },
    regulatory: { score: 58, agenciesInvolved: 4, estApprovalTime: "9-12 months", complexityLevel: "Medium" },
    coolingImpact: { airCooling: "+680 m3/day", liquidCooling: "+510 m3/day", immersionCooling: "+255 m3/day", dlcCooling: "+340 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+680 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+510 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+255 m3/day", energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+340 m3/day", energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Tabuk Municipal TSE Plant", type: "Water Treatment", distance: "7.2 km", status: "Operational" },
      { name: "SEC Tabuk Grid Station", type: "Power", distance: "5.6 km", status: "Operational" },
      { name: "STC Tabuk Fiber Hub", type: "Connectivity", distance: "6.8 km", status: "Operational" },
      { name: "Tabuk Industrial City Phase 1", type: "Industrial Zone", distance: "2 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 42,
      riskLevel: "High",
      aiRecommendation: "Tabuk is a severe water-stress region — fossil aquifer depletion is advanced. Any large-scale data center cooling here requires a comprehensive alternative water strategy (direct desalination import from Aqaba corridor or closed-loop cooling).",
      nearbyWaterSources: [{ plant: "Tabuk Municipal TSE Plant", distance: "7.2 km", capacity: "14,000 m3/day", status: "Operational" }],
      availabilityTimeline: [{ year: 2025, score: 42 }, { year: 2027, score: 44 }, { year: 2030, score: 47 }],
      supportingDocuments: [{ name: "MEWA Tabuk Aquifer Depletion Study 2023", type: "Regulatory" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "Tabuk Grid Station T-3", voltage: "132 kV", distance: "5.6 km", spareCapacity: "38 MW available" },
      fiber: { provider: "STC (single carrier)", redundancy: "No redundancy", bandwidth: "20 Gbps", plannedExpansion: "NEOM proximity may bring fiber trunk extension 2028" },
      transportation: { nearestHighway: "Highway 15 — 4 km regional road", airportDistance: "14 km to Tabuk Regional Airport", logisticsNotes: "Tabuk airport has direct Riyadh and Jeddah connections. Ground logistics remote." },
      industrial: { nearbyIndustrialZones: ["Tabuk Industrial City Phase 1 & 2"], utilityCorridors: ["Tabuk Regional Grid", "Municipal TSE Distribution"], existingDataCenters: ["Tabuk University Research DC (18 km)"] },
      aiRecommendation: "Tabuk's proximity to NEOM is its primary strategic appeal — it could serve as a secondary/failover site for NEOM deployments. Standalone, the water and fiber gaps make it challenging for large-scale operations.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON", role: "Industrial occupancy licence" },
        { name: "SEC", role: "132 kV connection agreement" },
        { name: "MEWA", role: "Mandatory aquifer depletion review and alternative water plan approval" },
        { name: "CST", role: "Data facility licence" },
      ],
      requiredPermits: ["MODON Licence", "SEC Power Agreement", "MEWA Aquifer Review + Alternative Water Plan", "CST Licence", "GDCD Fire Safety"],
      approvalProcess: [
        { step: "MEWA Aquifer + Alternative Water Plan", description: "Must propose and get MEWA approval for a closed-loop or desalination-based water strategy.", typicalDuration: "12–14 weeks" },
        { step: "MODON + SEC", description: "Industrial licence and power connection in parallel.", typicalDuration: "7–9 weeks" },
        { step: "CST + Safety", description: "Data facility licence and fire safety.", typicalDuration: "6–8 weeks" },
      ],
      similarProjects: [{ name: "Tabuk University DR Site", location: "Tabuk", approvalTime: "12 months" }],
      aiAdvice: "The MEWA aquifer depletion review with mandatory alternative water plan is the most demanding water approval in the dataset for an inland site. If you cannot demonstrate a viable closed-loop or import water strategy, approval will not be granted.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [],
      plannedTSEExpansions: [{ name: "Tabuk Municipal TSE Upgrade", expectedCapacity: "10,000 m3/day", expectedYear: 2028 }],
      infrastructureInvestments: [
        { name: "Tabuk–NEOM Fiber Trunk Extension", amount: "SAR 280M", year: 2028 },
        { name: "SEC Tabuk 230 kV Grid Upgrade", amount: "SAR 310M", year: 2029 },
      ],
      scoreProjection: [{ year: 2025, score: 55 }, { year: 2028, score: 59 }, { year: 2030, score: 63 }],
      aiPrediction: "Tabuk's score improvement depends critically on NEOM proximity spillover — the fiber extension in 2028 and grid upgrade in 2029 would both be transformative. Without NEOM investment pull, Tabuk remains constrained. High-variance outlook.",
    },
    water: {
      summary: { availabilityScore: 42, distanceToInfrastructure: "7.2 km", reliability: "Low" },
      detail: { cost: "SAR 6.50/m3 (severely constrained — trucking + minimal TSE)", sustainability: "Fossil aquifer at critical depletion — alternative water plan mandatory", droughtRisk: "High" },
    },
    power: {
      summary: { distanceToSubstation: "5.6 km", availableCapacityMW: 38, reliability: "Low" },
      detail: { outageHistory: "5 outages in past 12 months", electricityPrice: "SAR 0.22/kWh", renewableAvailability: "Exceptional solar and wind — no commercial project within 80 km", expansionPotential: "SEC 230 kV upgrade planned 2029 — adds 120 MW" },
    },
    climate: {
      summary: { avgYearlyTemp: "24°C", peakSummerTemp: "40°C", estimatedPUEImpact: "+0.07 PUE penalty vs. temperate climate" },
      detail: { humidity: "Very low — avg 14% RH", extremeHeatDays: 26 },
    },
    connectivity: {
      summary: { distanceToBackbone: "6.8 km", fiberProviders: 1, redundancy: "No" },
      detail: { latencyToMajorCities: "Riyadh: 40ms, Jeddah: 36ms, Aqaba: 12ms", proximityToIX: "No nearby IX; NEOM fiber trunk 2028 will connect to NEOM Authority network" },
    },
    land: {
      summary: { landPrice: "SAR 75/m2", parcelSize: "180 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "<1% grade — arid plateau", soilStability: "Rocky granite — excellent load-bearing", roomForExpansion: "Abundant land; no constraint on footprint", distanceToRoads: "4 km access road to Highway 15" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "Not in SEZ", permittingSpeed: "9-12 months" },
      detail: { taxIncentives: "Regional development incentive — MISA 3-year tax relief for Tabuk region", environmentalRestrictions: "Aquifer zone — mandatory alternative water strategy review (MEWA)", governmentSupport: "Tabuk included in Vision 2030 regional development programme — facilitation available", easeOfPermits: "Moderate" },
    },
  },

  // ── site-022: Rabigh Industrial Zone ─────────────────────────────
  {
    id: "site-022",
    name: "Rabigh Industrial Zone",
    region: "Makkah",
    distanceFromRiyadh: 900,
    overallScore: 48,
    rating: "Moderate",
    coordinates: { lat: 22.805, lng: 38.987 },
    waterAccess: { score: 50, nearestTSELine: "N/A", availableCapacity: "35,000 m3/day", source: "Petro Rabigh Desalination (industrial access limited)" },
    infrastructure: { score: 52, powerAvailability: "Medium", fiberConnectivity: "Single-path fiber, 20 Gbps", roadAccess: "Jeddah–Madinah Expressway — 6 km industrial spur" },
    regulatory: { score: 44, agenciesInvolved: 5, estApprovalTime: "12-16 months", complexityLevel: "High" },
    coolingImpact: { airCooling: "+700 m3/day", liquidCooling: "+525 m3/day", immersionCooling: "+263 m3/day", dlcCooling: "+350 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+700 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+525 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+263 m3/day", energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+350 m3/day", energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Petro Rabigh Desalination Plant", type: "Water Treatment", distance: "4.5 km", status: "Operational" },
      { name: "SEC Rabigh Industrial Substation", type: "Power", distance: "6.2 km", status: "Operational" },
      { name: "STC Rabigh Fiber Point", type: "Connectivity", distance: "8.1 km", status: "Operational" },
      { name: "Rabigh Special Economic City", type: "Industrial Zone", distance: "5 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 50,
      riskLevel: "Medium",
      aiRecommendation: "Rabigh's desalination water is controlled by Petro Rabigh — third-party industrial allocation is not guaranteed and requires commercial negotiation beyond normal regulatory process. Water supply risk is moderate to high.",
      nearbyWaterSources: [{ plant: "Petro Rabigh Desalination (shared industrial)", distance: "4.5 km", capacity: "35,000 m3/day (shared)", status: "Operational" }],
      availabilityTimeline: [{ year: 2025, score: 50 }, { year: 2027, score: 52 }, { year: 2030, score: 55 }],
      supportingDocuments: [{ name: "Rabigh SEZ Water Access Framework", type: "Agreement" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "Rabigh Substation", voltage: "132 kV", distance: "6.2 km", spareCapacity: "45 MW available" },
      fiber: { provider: "STC (single carrier)", redundancy: "No redundancy", bandwidth: "20 Gbps", plannedExpansion: "Jeddah–Madinah fiber corridor extension 2027" },
      transportation: { nearestHighway: "Jeddah–Madinah Expressway — 6 km industrial spur", airportDistance: "80 km to King Abdulaziz International Airport", logisticsNotes: "Red Sea access via Rabigh port — viable for bulk equipment import." },
      industrial: { nearbyIndustrialZones: ["Rabigh Special Economic City", "Petro Rabigh Complex"], utilityCorridors: ["Petro Rabigh Utility Corridor", "Rabigh SEZ Grid"], existingDataCenters: ["No data centers within 80 km"] },
      aiRecommendation: "Rabigh's petrochemical heritage does not translate well to data center use — water is controlled by Petro Rabigh, power capacity is limited, and the fiber gap is substantial. Consider only if a Rabigh SEZ commercial arrangement is specifically desired.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "Rabigh SEZ Authority", role: "Zone development permit" },
        { name: "SEC", role: "Power connection" },
        { name: "Petro Rabigh", role: "Commercial water access negotiation (non-governmental)" },
        { name: "MEWA", role: "Environmental review — petrochemical adjacency" },
        { name: "CST", role: "Data facility licence" },
      ],
      requiredPermits: ["Rabigh SEZ Development Permit", "SEC Power Agreement", "Petro Rabigh Water Agreement (commercial)", "MEWA Environmental NOC", "CST Licence", "GDCD Fire Safety"],
      approvalProcess: [
        { step: "Petro Rabigh Water Negotiation", description: "Commercial negotiation with Petro Rabigh for water allocation — not a regulatory step but must be resolved first.", typicalDuration: "12–16 weeks" },
        { step: "SEZ + MEWA Environmental", description: "SEZ development permit with MEWA environmental review for petrochemical adjacency.", typicalDuration: "10–12 weeks" },
        { step: "SEC + CST + Safety", description: "Power agreement, data facility licence, fire safety.", typicalDuration: "8–10 weeks" },
      ],
      similarProjects: [{ name: "Petro Rabigh Operations DC (internal)", location: "Rabigh", approvalTime: "14 months (internal)" }],
      aiAdvice: "The Petro Rabigh water negotiation is the unpredictable first step — a commercial counterparty, not a government agency. This introduces timeline risk that cannot be estimated reliably. Allow 16+ months and have a backup water contingency plan.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [],
      plannedTSEExpansions: [],
      infrastructureInvestments: [
        { name: "Jeddah–Madinah Fiber Corridor Extension — Rabigh Node", amount: "SAR 120M", year: 2027 },
        { name: "Rabigh SEZ Grid Upgrade", amount: "SAR 180M", year: 2028 },
      ],
      scoreProjection: [{ year: 2025, score: 48 }, { year: 2027, score: 51 }, { year: 2030, score: 55 }],
      aiPrediction: "Rabigh will see modest improvement from infrastructure upgrades in 2027–2028, but the Petro Rabigh water dependency remains a structural constraint. Score growth to 55 by 2030 is achievable if a commercial water agreement is secured.",
    },
    water: {
      summary: { availabilityScore: 50, distanceToInfrastructure: "4.5 km", reliability: "Low" },
      detail: { cost: "SAR 5.50/m3 (commercial negotiation with Petro Rabigh — not fixed)", sustainability: "Shared industrial desalination — allocation not guaranteed", droughtRisk: "Medium" },
    },
    power: {
      summary: { distanceToSubstation: "6.2 km", availableCapacityMW: 45, reliability: "Low" },
      detail: { outageHistory: "5 outages in past 12 months", electricityPrice: "SAR 0.22/kWh", renewableAvailability: "Red Sea wind corridor nearby — no project contracted", expansionPotential: "Rabigh SEZ upgrade planned 2028 — adds 60 MW" },
    },
    climate: {
      summary: { avgYearlyTemp: "30°C", peakSummerTemp: "43°C", estimatedPUEImpact: "+0.17 PUE penalty vs. temperate climate" },
      detail: { humidity: "High coastal — avg 70% RH", extremeHeatDays: 46 },
    },
    connectivity: {
      summary: { distanceToBackbone: "8.1 km", fiberProviders: 1, redundancy: "No" },
      detail: { latencyToMajorCities: "Jeddah: 28ms, Riyadh: 35ms, Madinah: 22ms", proximityToIX: "Jeddah Internet Exchange 200 km; corridor extension 2027 partially closes gap" },
    },
    land: {
      summary: { landPrice: "SAR 220/m2", parcelSize: "80 hectares available in SEZ", floodRisk: "Medium" },
      detail: { flatnessSlope: "<1.5% grade — coastal plain with some drainage work required", soilStability: "Sandy coastal — adequate with engineering", roomForExpansion: "SEZ Phase 2 adds 120 ha by 2028", distanceToRoads: "6 km industrial spur to expressway" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "Rabigh Special Economic City", permittingSpeed: "12-16 months" },
      detail: { taxIncentives: "SEZ: 20-year tax holiday for qualifying investments", environmentalRestrictions: "Petrochemical adjacency — comprehensive EIA mandatory", governmentSupport: "SEZ authority has facilitation office but petrochemical orientation limits DC expertise", easeOfPermits: "Difficult" },
    },
  },

  // ── site-023: Abha Industrial City ───────────────────────────────
  {
    id: "site-023",
    name: "Abha Industrial City",
    region: "Asir",
    distanceFromRiyadh: 930,
    overallScore: 44,
    rating: "Moderate",
    coordinates: { lat: 18.217, lng: 42.505 },
    waterAccess: { score: 38, nearestTSELine: "8.5 km", availableCapacity: "12,000 m3/day", source: "Abha Municipal TSE Plant (limited)" },
    infrastructure: { score: 50, powerAvailability: "Low", fiberConnectivity: "Single-path fiber, 20 Gbps", roadAccess: "Abha–Khamis Mushait Highway" },
    regulatory: { score: 44, agenciesInvolved: 4, estApprovalTime: "12-15 months", complexityLevel: "High" },
    coolingImpact: { airCooling: "+420 m3/day", liquidCooling: "+315 m3/day", immersionCooling: "+158 m3/day", dlcCooling: "+210 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+420 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+315 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+158 m3/day", energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+210 m3/day", energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Abha Municipal TSE Plant", type: "Water Treatment", distance: "8.5 km", status: "Operational" },
      { name: "SEC Abha Grid Station", type: "Power", distance: "9.2 km", status: "Operational" },
      { name: "STC Abha Fiber Point", type: "Connectivity", distance: "10.1 km", status: "Operational" },
      { name: "Abha Industrial City Phase 1", type: "Industrial Zone", distance: "3 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 38,
      riskLevel: "High",
      aiRecommendation: "Abha has severely limited water infrastructure for industrial use. Municipal TSE serves urban demand first. Asir's mountainous terrain complicates water pipeline extension. A standalone site-level water solution (atmospheric water generation or seawater import) would be required for any large deployment.",
      nearbyWaterSources: [{ plant: "Abha Municipal TSE Plant", distance: "8.5 km", capacity: "12,000 m3/day", status: "Operational" }],
      availabilityTimeline: [{ year: 2025, score: 38 }, { year: 2027, score: 39 }, { year: 2030, score: 41 }],
      supportingDocuments: [{ name: "NWC Asir Region Water Scarcity Assessment", type: "Regulatory" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "Abha Grid Station A-2", voltage: "132 kV", distance: "9.2 km", spareCapacity: "28 MW available" },
      fiber: { provider: "STC (single carrier)", redundancy: "No redundancy", bandwidth: "20 Gbps", plannedExpansion: "No funded fiber upgrade on record" },
      transportation: { nearestHighway: "Abha–Khamis Mushait Highway", airportDistance: "10 km to Abha Regional Airport", logisticsNotes: "Mountain terrain complicates heavy equipment logistics — road grades limit truck payload." },
      industrial: { nearbyIndustrialZones: ["Abha Industrial City Phase 1"], utilityCorridors: ["Abha Regional Grid"], existingDataCenters: ["King Khalid University DC (12 km)"] },
      aiRecommendation: "Abha's highland climate is the site's most valuable asset — at 2,200m elevation, temperatures rarely exceed 32°C and cooling costs are dramatically lower. However, water, power capacity, and fiber are all critical constraints. Only viable for small-scale, climate-advantaged deployments.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON", role: "Industrial city licence" },
        { name: "SEC", role: "132 kV connection (capacity very limited)" },
        { name: "NWC / MEWA", role: "Water scarcity zone assessment — mandatory" },
        { name: "CST", role: "Data facility licence" },
      ],
      requiredPermits: ["MODON Licence", "SEC Power Agreement", "MEWA Water Scarcity Review", "Alternative Water Plan", "CST Licence", "GDCD Fire Safety"],
      approvalProcess: [
        { step: "MEWA Water Scarcity Assessment + Alternative Plan", description: "Mandatory for Asir region — must propose self-contained water solution.", typicalDuration: "12–16 weeks" },
        { step: "MODON + SEC", description: "Industrial licence (limited capacity — pre-book SEC capacity urgently).", typicalDuration: "8–10 weeks" },
        { step: "CST + Safety", description: "Data facility licence and fire safety.", typicalDuration: "6–8 weeks" },
      ],
      similarProjects: [{ name: "King Khalid University Abha DR", location: "Abha", approvalTime: "13 months" }],
      aiAdvice: "SEC capacity at 28 MW is the binding physical constraint — only viable for sub-20 MW deployments without a dedicated grid upgrade. The MEWA scarcity review is the longest step. Consider this site only for high-altitude climate advantage deployments where cooling cost savings justify the infrastructure premium.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [],
      plannedTSEExpansions: [],
      infrastructureInvestments: [
        { name: "NWC Asir Water Security Masterplan Study", amount: "SAR 25M (study only)", year: 2026 },
        { name: "SEC Abha Grid Station Upgrade (conditional on demand)", amount: "SAR 190M", year: 2030 },
      ],
      scoreProjection: [{ year: 2025, score: 44 }, { year: 2027, score: 45 }, { year: 2030, score: 46 }],
      aiPrediction: "Abha has essentially no infrastructure investment committed before 2030. The NWC masterplan study is diagnostic only. Score improvement will be negligible — this site's value is entirely in its highland climate advantage and low land cost for niche deployments.",
    },
    water: {
      summary: { availabilityScore: 38, distanceToInfrastructure: "8.5 km", reliability: "Low" },
      detail: { cost: "SAR 6.80/m3 (trucking + minimal TSE)", sustainability: "Municipal priority — industrial allocation requires exceptional approval", droughtRisk: "High" },
    },
    power: {
      summary: { distanceToSubstation: "9.2 km", availableCapacityMW: 28, reliability: "Low" },
      detail: { outageHistory: "6+ outages in past 12 months", electricityPrice: "SAR 0.24/kWh", renewableAvailability: "Excellent highland wind resource — no commercial project", expansionPotential: "Grid upgrade conditional on load commitment — not funded" },
    },
    climate: {
      summary: { avgYearlyTemp: "18°C", peakSummerTemp: "32°C", estimatedPUEImpact: "+0.02 PUE penalty vs. temperate climate — excellent" },
      detail: { humidity: "Moderate — avg 38% RH (monsoon influence June–September)", extremeHeatDays: 0 },
    },
    connectivity: {
      summary: { distanceToBackbone: "10.1 km", fiberProviders: 1, redundancy: "No" },
      detail: { latencyToMajorCities: "Riyadh: 45ms, Jeddah: 38ms, Jizan: 22ms", proximityToIX: "No nearby IX — Jeddah IX 1,100 km; no fiber upgrade roadmap" },
    },
    land: {
      summary: { landPrice: "SAR 65/m2", parcelSize: "100 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "2–5% grade — mountain terrain requires terracing", soilStability: "Basaltic highland rock — excellent once terrace-engineered", roomForExpansion: "Limited by terrain — natural expansion constraint", distanceToRoads: "3 km to Abha–Khamis Mushait Highway" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "Not in SEZ", permittingSpeed: "12-15 months" },
      detail: { taxIncentives: "Regional development incentive — MISA Asir package", environmentalRestrictions: "Mountain terrain + seasonal monsoon — site-specific EIA required", governmentSupport: "Asir Vision 2030 tourism focus limits industrial facilitation resources", easeOfPermits: "Difficult" },
    },
  },

  // ── site-024: Khamis Mushait Technology Zone ─────────────────────
  {
    id: "site-024",
    name: "Khamis Mushait Technology Zone",
    region: "Asir",
    distanceFromRiyadh: 955,
    overallScore: 38,
    rating: "Weak",
    coordinates: { lat: 18.302, lng: 42.741 },
    waterAccess: { score: 28, nearestTSELine: "12 km", availableCapacity: "8,000 m3/day", source: "Khamis Municipal Water — severely limited" },
    infrastructure: { score: 42, powerAvailability: "Low", fiberConnectivity: "Single-path fiber, 10 Gbps", roadAccess: "Khamis Mushait Military Highway — access restrictions" },
    regulatory: { score: 38, agenciesInvolved: 5, estApprovalTime: "14-18 months", complexityLevel: "High" },
    coolingImpact: { airCooling: "+280 m3/day", liquidCooling: "+210 m3/day", immersionCooling: "+105 m3/day", dlcCooling: "+140 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+280 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+210 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+105 m3/day", energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+140 m3/day", energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Khamis Municipal Water Treatment", type: "Water Treatment", distance: "12 km", status: "Operational" },
      { name: "SEC Khamis Mushait Grid Station", type: "Power", distance: "8.5 km", status: "Operational" },
      { name: "STC Khamis Mushait Fiber Point", type: "Connectivity", distance: "9.8 km", status: "Operational" },
      { name: "Khamis Mushait Military Zone (adjacent)", type: "Industrial Zone", distance: "2 km", status: "Restricted" },
    ],
    waterAccessDetail: {
      overallScore: 28,
      riskLevel: "High",
      aiRecommendation: "Khamis Mushait has critically inadequate water infrastructure for data center use. The 8,000 m3/day municipal capacity serves urban residents first — no meaningful industrial allocation is available without a dedicated desalination or import solution.",
      nearbyWaterSources: [{ plant: "Khamis Mushait Municipal Water", distance: "12 km", capacity: "8,000 m3/day", status: "Operational" }],
      availabilityTimeline: [{ year: 2025, score: 28 }, { year: 2027, score: 29 }, { year: 2030, score: 31 }],
      supportingDocuments: [{ name: "NWC Southern Highlands Water Scarcity Report 2023", type: "Regulatory" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "Khamis Mushait Station K-1", voltage: "115 kV", distance: "8.5 km", spareCapacity: "18 MW available" },
      fiber: { provider: "STC (single carrier — military clearance required)", redundancy: "No redundancy", bandwidth: "10 Gbps", plannedExpansion: "No funded upgrade; military zone access restrictions complicate expansion" },
      transportation: { nearestHighway: "Khamis Mushait Military Highway — access permit required", airportDistance: "8 km to Abha/Khamis Mushait Regional Airport", logisticsNotes: "Military zone adjacency creates security clearance requirements for equipment delivery. Significant logistics complexity." },
      industrial: { nearbyIndustrialZones: ["Khamis Mushait Technology Zone (early stage)"], utilityCorridors: [], existingDataCenters: ["No commercial data centers within 100 km"] },
      aiRecommendation: "Khamis Mushait's combination of military adjacency restrictions, 18 MW grid capacity, 10 Gbps single-carrier fiber, and critically constrained water makes it unsuitable for commercial data center deployment. The highland climate advantage (PUE 0.02 penalty) is the only genuine positive — insufficient to offset all other constraints.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "Ministry of Defense (MOD)", role: "Security clearance for military zone adjacency — non-negotiable first step" },
        { name: "MODON", role: "Industrial licence" },
        { name: "SEC", role: "115 kV connection (very limited capacity)" },
        { name: "MEWA", role: "Water scarcity zone assessment" },
        { name: "CST", role: "Data facility licence" },
      ],
      requiredPermits: ["MOD Security Clearance", "MODON Licence", "SEC Power Agreement", "MEWA Water Scarcity Review", "Alternative Water Plan", "CST Licence", "GDCD Fire Safety"],
      approvalProcess: [
        { step: "MOD Security Clearance", description: "Ministry of Defense review of military zone proximity — timeline highly unpredictable.", typicalDuration: "16–20 weeks" },
        { step: "MEWA Water + Alternative Plan", description: "Mandatory water scarcity assessment and self-contained water solution proposal.", typicalDuration: "12–16 weeks (parallel with MOD)" },
        { step: "MODON + SEC + CST + Safety", description: "Sequential after MOD and MEWA clearances.", typicalDuration: "10–12 weeks" },
      ],
      similarProjects: [{ name: "No comparable commercial DC project in Asir region" }],
      aiAdvice: "The Ministry of Defense clearance is an unpredictable, open-ended process — timelines have ranged from 4 to 18 months in analogous industrial cases. This site should not be pursued for any time-sensitive deployment.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [],
      plannedTSEExpansions: [],
      infrastructureInvestments: [
        { name: "NWC Asir Water Security Masterplan (same as Abha)", amount: "SAR 25M (study only)", year: 2026 },
      ],
      scoreProjection: [{ year: 2025, score: 38 }, { year: 2027, score: 38 }, { year: 2030, score: 40 }],
      aiPrediction: "Khamis Mushait has no infrastructure investment planned that would materially change its profile. Military zone restrictions are structural. Score improvement through 2030 is minimal. This site should be retained in the dataset as a reference point for 'avoid' classification.",
    },
    water: {
      summary: { availabilityScore: 28, distanceToInfrastructure: "12 km", reliability: "Low" },
      detail: { cost: "SAR 7.20/m3 (trucking only)", sustainability: "Critically constrained — no industrial allocation possible from current infrastructure", droughtRisk: "High" },
    },
    power: {
      summary: { distanceToSubstation: "8.5 km", availableCapacityMW: 18, reliability: "Low" },
      detail: { outageHistory: "8+ outages in past 12 months", electricityPrice: "SAR 0.26/kWh", renewableAvailability: "Excellent highland wind — no commercial project within 150 km", expansionPotential: "No funded grid expansion" },
    },
    climate: {
      summary: { avgYearlyTemp: "19°C", peakSummerTemp: "33°C", estimatedPUEImpact: "+0.02 PUE penalty vs. temperate climate — excellent" },
      detail: { humidity: "Moderate highland — avg 35% RH", extremeHeatDays: 0 },
    },
    connectivity: {
      summary: { distanceToBackbone: "9.8 km", fiberProviders: 1, redundancy: "No" },
      detail: { latencyToMajorCities: "Riyadh: 46ms, Jeddah: 40ms, Abha: 6ms", proximityToIX: "No nearby IX; military zone restrictions complicate any fiber expansion" },
    },
    land: {
      summary: { landPrice: "SAR 55/m2", parcelSize: "80 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "2–6% grade — rugged highland terrain", soilStability: "Rocky basalt — excellent naturally but terrace engineering required", roomForExpansion: "Military zone boundary limits lateral expansion", distanceToRoads: "Military highway — clearance required" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "Not in SEZ — military buffer zone", permittingSpeed: "14-18 months" },
      detail: { taxIncentives: "MISA Asir incentive — minimal benefit given other constraints", environmentalRestrictions: "Military zone + highland terrain EIA", governmentSupport: "Military adjacency creates bureaucratic friction that outweighs any government facilitation", easeOfPermits: "Difficult" },
    },
  },

  // ── site-025: Jizan Economic City ────────────────────────────────
  {
    id: "site-025",
    name: "Jizan Economic City",
    region: "Jizan",
    distanceFromRiyadh: 1120,
    overallScore: 47,
    rating: "Moderate",
    coordinates: { lat: 16.892, lng: 42.585 },
    waterAccess: { score: 52, nearestTSELine: "N/A", availableCapacity: "40,000 m3/day", source: "Jizan SWCC Desalination Plant" },
    infrastructure: { score: 54, powerAvailability: "Medium", fiberConnectivity: "Single-path fiber, 20 Gbps", roadAccess: "Jizan Highway — 5 km industrial spur" },
    regulatory: { score: 42, agenciesInvolved: 5, estApprovalTime: "12-16 months", complexityLevel: "High" },
    coolingImpact: { airCooling: "+620 m3/day", liquidCooling: "+465 m3/day", immersionCooling: "+233 m3/day", dlcCooling: "+310 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+620 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+465 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+233 m3/day", energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+310 m3/day", energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Jizan SWCC Desalination Plant", type: "Water Treatment", distance: "3.8 km", status: "Operational" },
      { name: "Jizan Economic City Power Station", type: "Power", distance: "4.2 km", status: "Operational" },
      { name: "STC Jizan Fiber Hub", type: "Connectivity", distance: "7.5 km", status: "Operational" },
      { name: "Jizan Economic City Industrial Zone", type: "Industrial Zone", distance: "2 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 52,
      riskLevel: "Low",
      aiRecommendation: "Jizan's SWCC desalination plant provides reliable supply — Red Sea feedstock is unlimited. However, the industrial allocation process is slow due to Jizan's geographic remoteness from central regulatory authorities.",
      nearbyWaterSources: [{ plant: "Jizan SWCC Desalination Plant", distance: "3.8 km", capacity: "40,000 m3/day", status: "Operational" }],
      availabilityTimeline: [{ year: 2025, score: 52 }, { year: 2027, score: 54 }, { year: 2030, score: 56 }],
      supportingDocuments: [{ name: "SWCC Jizan Economic City Water Framework", type: "Agreement" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company / Jizan Economic City Authority", substation: "JEC Power Station", voltage: "132 kV", distance: "4.2 km", spareCapacity: "55 MW available" },
      fiber: { provider: "STC (single carrier)", redundancy: "No redundancy", bandwidth: "20 Gbps", plannedExpansion: "No fiber upgrade funded; Yemen border proximity complicates expansion" },
      transportation: { nearestHighway: "Jizan Highway — 5 km industrial spur", airportDistance: "20 km to Jizan Regional Airport", logisticsNotes: "Red Sea port access for bulk equipment import. Yemen border proximity adds security logistics complexity." },
      industrial: { nearbyIndustrialZones: ["Jizan Economic City Industrial Zone", "Jizan Refinery Complex (adjacent)"], utilityCorridors: ["JEC Internal Grid", "SWCC Jizan Pipeline"], existingDataCenters: ["No commercial data centers within 200 km"] },
      aiRecommendation: "Jizan Economic City is remote, single-carrier for fiber, and geopolitically complex due to Yemen proximity. Its value is for government-mandated southern region presence or projects requiring Red Sea maritime logistics. Not recommended for commercial hyperscale deployment.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "Jizan Economic City Authority", role: "Zone development permit" },
        { name: "SEC", role: "Power connection" },
        { name: "Ministry of Interior", role: "Security clearance review — Yemen border proximity" },
        { name: "SWCC", role: "Water allocation agreement" },
        { name: "CST", role: "Data facility licence" },
      ],
      requiredPermits: ["JEC Development Permit", "SEC Power Agreement", "Ministry of Interior Clearance", "SWCC Water Allocation", "CST Licence", "GDCD Fire Safety"],
      approvalProcess: [
        { step: "Ministry of Interior Security Review", description: "Required for Yemen border zone — timeline varies based on security situation.", typicalDuration: "10–16 weeks" },
        { step: "JEC + SWCC + SEC", description: "Zone permit, water allocation, power connection in parallel post-security clearance.", typicalDuration: "8–10 weeks" },
        { step: "CST + Safety", description: "Data facility licence and fire safety.", typicalDuration: "6–8 weeks" },
      ],
      similarProjects: [{ name: "No commercial DC reference in Jizan" }],
      aiAdvice: "Ministry of Interior security clearance is the unpredictable variable — Yemen border proximity means the review depth varies with regional security conditions. Allow 16+ months and have contingency plans.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [],
      plannedTSEExpansions: [],
      infrastructureInvestments: [
        { name: "Jizan Economic City Grid Expansion (if demand materialises)", amount: "SAR 240M (conditional)", year: 2029 },
      ],
      scoreProjection: [{ year: 2025, score: 47 }, { year: 2027, score: 48 }, { year: 2030, score: 50 }],
      aiPrediction: "Jizan will see minimal score improvement absent a major fiber investment or geopolitical stability improvement at the Yemen border. Score improvement to 50 by 2030 is possible only if the conditional grid expansion is triggered by actual industrial demand.",
    },
    water: {
      summary: { availabilityScore: 52, distanceToInfrastructure: "3.8 km", reliability: "Medium" },
      detail: { cost: "SAR 4.80/m3 (SWCC desalination tariff)", sustainability: "Red Sea desalination — unlimited feedstock but remote from grid and network infrastructure", droughtRisk: "Low" },
    },
    power: {
      summary: { distanceToSubstation: "4.2 km", availableCapacityMW: 55, reliability: "Low" },
      detail: { outageHistory: "6+ outages in past 12 months", electricityPrice: "SAR 0.24/kWh", renewableAvailability: "Good wind resource — no commercial project contracted", expansionPotential: "Conditional 240 MW expansion if industrial demand builds" },
    },
    climate: {
      summary: { avgYearlyTemp: "31°C", peakSummerTemp: "42°C", estimatedPUEImpact: "+0.19 PUE penalty vs. temperate climate" },
      detail: { humidity: "Very high tropical coastal — avg 78% RH", extremeHeatDays: 58 },
    },
    connectivity: {
      summary: { distanceToBackbone: "7.5 km", fiberProviders: 1, redundancy: "No" },
      detail: { latencyToMajorCities: "Riyadh: 50ms, Jeddah: 42ms, Abha: 30ms", proximityToIX: "No nearby IX; no fiber upgrade funded — most isolated connectivity in dataset" },
    },
    land: {
      summary: { landPrice: "SAR 85/m2", parcelSize: "120 hectares available", floodRisk: "Medium" },
      detail: { flatnessSlope: "<1.5% grade — coastal plain with seasonal flood risk", soilStability: "Coastal sandy silt — requires pile foundations", roomForExpansion: "JEC has large land reserve for industrial expansion", distanceToRoads: "5 km industrial spur to Jizan Highway" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "Jizan Economic City Zone", permittingSpeed: "12-16 months" },
      detail: { taxIncentives: "JEC zone incentives — 20-year tax holiday for qualifying investments", environmentalRestrictions: "Coastal + refinery adjacency — comprehensive EIA mandatory", governmentSupport: "JEC authority facilitates but geopolitical complexity limits national-level support", easeOfPermits: "Difficult" },
    },
  },

  // ── site-026: Al-Qatif Industrial Zone ───────────────────────────
  {
    id: "site-026",
    name: "Al-Qatif Industrial Zone",
    region: "Eastern",
    distanceFromRiyadh: 420,
    overallScore: 35,
    rating: "Weak",
    coordinates: { lat: 26.561, lng: 49.994 },
    waterAccess: { score: 30, nearestTSELine: "9.8 km", availableCapacity: "10,000 m3/day", source: "Al-Qatif Municipal — critically limited for industrial" },
    infrastructure: { score: 38, powerAvailability: "Low", fiberConnectivity: "Single-path fiber, 10 Gbps", roadAccess: "Highway 95 — 7 km access road" },
    regulatory: { score: 32, agenciesInvolved: 5, estApprovalTime: "15-20 months", complexityLevel: "High" },
    coolingImpact: { airCooling: "+350 m3/day", liquidCooling: "+262 m3/day", immersionCooling: "+131 m3/day", dlcCooling: "+175 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+350 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+262 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+131 m3/day", energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+175 m3/day", energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Al-Qatif Municipal Water Treatment", type: "Water Treatment", distance: "9.8 km", status: "Operational" },
      { name: "SEC Al-Qatif Substation (overloaded)", type: "Power", distance: "7.5 km", status: "Operational" },
      { name: "STC Al-Qatif Fiber Point (limited)", type: "Connectivity", distance: "8.2 km", status: "Operational" },
      { name: "Al-Qatif Light Industry Zone", type: "Industrial Zone", distance: "3 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 30,
      riskLevel: "High",
      aiRecommendation: "Al-Qatif's industrial water situation is critically constrained — the municipal system serves a dense urban population and has no spare industrial allocation. Any data center would require a fully self-contained water solution.",
      nearbyWaterSources: [{ plant: "Al-Qatif Municipal Water Treatment", distance: "9.8 km", capacity: "10,000 m3/day (municipal priority)", status: "Operational" }],
      availabilityTimeline: [{ year: 2025, score: 30 }, { year: 2027, score: 31 }, { year: 2030, score: 32 }],
      supportingDocuments: [{ name: "NWC Eastern Urban Allocation Report — Al-Qatif Zone", type: "Regulatory" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "Al-Qatif Substation (operating near capacity)", voltage: "115 kV", distance: "7.5 km", spareCapacity: "15 MW available" },
      fiber: { provider: "STC (single carrier)", redundancy: "No redundancy", bandwidth: "10 Gbps", plannedExpansion: "No upgrade funded — urban density complicates new routing" },
      transportation: { nearestHighway: "Highway 95 — 7 km access road", airportDistance: "32 km to King Fahd International Airport", logisticsNotes: "Urban density severely restricts heavy equipment movements. Road grades and congestion add significant logistics cost." },
      industrial: { nearbyIndustrialZones: ["Al-Qatif Light Industry Zone (not suitable for heavy data center)"], utilityCorridors: [], existingDataCenters: ["No commercial DC within 25 km"] },
      aiRecommendation: "Al-Qatif is one of the weakest sites in the dataset. Urban water constraints, an overloaded 115 kV substation with only 15 MW spare, 10 Gbps single-path fiber, and a 15–20 month approval path with special commission security reviews make this a high-risk, low-return option. Consider only if there is a specific Al-Qatif regulatory mandate.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "Eastern Province Special Commission", role: "Historical and security review for Al-Qatif zone — unique to this area" },
        { name: "Al-Qatif Municipality", role: "Building permit" },
        { name: "SEC", role: "Power connection (capacity extremely limited)" },
        { name: "NWC", role: "Water allocation — minimal availability for industrial" },
        { name: "CST", role: "Data facility licence" },
      ],
      requiredPermits: ["Eastern Province Special Commission Clearance", "Municipality Building Permit", "SEC Power Agreement", "NWC Water Allocation", "CST Licence", "GDCD Fire Safety"],
      approvalProcess: [
        { step: "Eastern Province Special Commission Review", description: "Unique to Al-Qatif — security and community impact assessment. Timeline highly variable.", typicalDuration: "14–20 weeks" },
        { step: "Municipality + NWC", description: "Building permit and water allocation (minimal) in parallel.", typicalDuration: "10–12 weeks" },
        { step: "SEC + CST + Safety", description: "Power connection (very limited), data facility licence, fire safety.", typicalDuration: "8–10 weeks" },
      ],
      similarProjects: [{ name: "No comparable commercial DC project in Al-Qatif" }],
      aiAdvice: "The Eastern Province Special Commission review is the most unique and unpredictable regulatory step in the entire dataset. Historical sensitivities in Al-Qatif mean this process cannot be expedited. Only pursue if there is a specific legal or regulatory mandate for this location.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [],
      plannedTSEExpansions: [],
      infrastructureInvestments: [],
      scoreProjection: [{ year: 2025, score: 35 }, { year: 2027, score: 35 }, { year: 2030, score: 36 }],
      aiPrediction: "Al-Qatif has no infrastructure investments planned and no realistic pathway to meaningful score improvement. The Eastern Province Special Commission requirement is structural. This site should only be considered if a specific Al-Qatif mandate exists.",
    },
    water: {
      summary: { availabilityScore: 30, distanceToInfrastructure: "9.8 km", reliability: "Low" },
      detail: { cost: "SAR 7.80/m3 (trucking — no industrial allocation available)", sustainability: "Fully constrained — no industrial water supply pathway without dedicated infrastructure", droughtRisk: "High" },
    },
    power: {
      summary: { distanceToSubstation: "7.5 km", availableCapacityMW: 15, reliability: "Low" },
      detail: { outageHistory: "7+ outages in past 12 months", electricityPrice: "SAR 0.26/kWh", renewableAvailability: "No feasible renewable connection given grid constraint", expansionPotential: "No funded grid upgrade — urban routing complicates new lines" },
    },
    climate: {
      summary: { avgYearlyTemp: "27°C", peakSummerTemp: "46°C", estimatedPUEImpact: "+0.16 PUE penalty vs. temperate climate" },
      detail: { humidity: "High coastal — avg 70% RH", extremeHeatDays: 55 },
    },
    connectivity: {
      summary: { distanceToBackbone: "8.2 km", fiberProviders: 1, redundancy: "No" },
      detail: { latencyToMajorCities: "Riyadh: 20ms, Dammam: 8ms, Dubai: 22ms", proximityToIX: "SAIX Dammam 35 km — reachable but fiber capacity too limited to exploit" },
    },
    land: {
      summary: { landPrice: "SAR 1,100/m2", parcelSize: "18 hectares (very limited)", floodRisk: "Low" },
      detail: { flatnessSlope: "<0.5% grade — coastal flat", soilStability: "Compact coastal sand — adequate", roomForExpansion: "Severely constrained by urban density — no expansion possible", distanceToRoads: "7 km access road to Highway 95" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "Not in SEZ — historic urban zone", permittingSpeed: "15-20 months" },
      detail: { taxIncentives: "No incentives applicable", environmentalRestrictions: "Urban density — noise, visual impact, EMF, and traffic assessment all required", governmentSupport: "Eastern Province Special Commission creates an adversarial rather than facilitative environment for new large industrial projects", easeOfPermits: "Difficult" },
    },
  },

  // ── site-027: Al-Wajh Port Industrial Area ───────────────────────
  {
    id: "site-027",
    name: "Al-Wajh Port Industrial Area",
    region: "Tabuk",
    distanceFromRiyadh: 1390,
    overallScore: 28,
    rating: "Weak",
    coordinates: { lat: 26.234, lng: 36.475 },
    waterAccess: { score: 22, nearestTSELine: "N/A", availableCapacity: "6,000 m3/day", source: "Al-Wajh Municipal Supply — near-critical capacity" },
    infrastructure: { score: 30, powerAvailability: "Low", fiberConnectivity: "Single-path fiber, 10 Gbps (intermittent)", roadAccess: "Coastal Highway 55 — 8 km access road" },
    regulatory: { score: 30, agenciesInvolved: 4, estApprovalTime: "16-22 months", complexityLevel: "High" },
    coolingImpact: { airCooling: "+160 m3/day", liquidCooling: "+120 m3/day", immersionCooling: "+60 m3/day", dlcCooling: "+80 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+160 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+120 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+60 m3/day",  energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+80 m3/day",  energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Al-Wajh Municipal Water Supply", type: "Water Treatment", distance: "8 km", status: "Operational" },
      { name: "SEC Al-Wajh Grid Station (small)", type: "Power", distance: "9.5 km", status: "Operational" },
      { name: "STC Al-Wajh Fiber Point (intermittent)", type: "Connectivity", distance: "10.2 km", status: "Operational" },
      { name: "Al-Wajh Port", type: "Industrial Zone", distance: "3 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 22,
      riskLevel: "High",
      aiRecommendation: "Al-Wajh's municipal water supply is at near-critical capacity for its small existing population. There is effectively zero industrial water allocation available. Any data center deployment would require building a dedicated micro-desalination plant from scratch.",
      nearbyWaterSources: [{ plant: "Al-Wajh Municipal Supply", distance: "8 km", capacity: "6,000 m3/day (municipal only)", status: "Operational" }],
      availabilityTimeline: [{ year: 2025, score: 22 }, { year: 2027, score: 23 }, { year: 2030, score: 25 }],
      supportingDocuments: [{ name: "NWC Coastal Tabuk Water Security Assessment", type: "Regulatory" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "Al-Wajh Grid Station (small town scale)", voltage: "115 kV", distance: "9.5 km", spareCapacity: "8 MW available" },
      fiber: { provider: "STC (intermittent service)", redundancy: "None", bandwidth: "10 Gbps (unreliable)", plannedExpansion: "No upgrade — depends on NEOM coastal corridor development" },
      transportation: { nearestHighway: "Coastal Highway 55 — 8 km access road (partly unpaved)", airportDistance: "6 km to Al-Wajh Regional Airport (limited service)", logisticsNotes: "Al-Wajh port is small — limited to vessels under 5,000 DWT. Large equipment must be transshipped via Jeddah port." },
      industrial: { nearbyIndustrialZones: ["Al-Wajh Port (fishing/light industry)"], utilityCorridors: [], existingDataCenters: ["None within 300 km"] },
      aiRecommendation: "Al-Wajh is the weakest site in the dataset for commercial data center use. It has 8 MW grid capacity, intermittent 10 Gbps fiber, and no viable water supply pathway without building dedicated infrastructure from scratch. Its only potential is as a NEOM satellite site if NEOM's coastal corridor development ever reaches this far south.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON", role: "Industrial licence (limited experience with tech projects here)" },
        { name: "SEC", role: "115 kV connection (barely adequate for small deployment)" },
        { name: "SWCC / NWC", role: "Permission to build standalone micro-desalination (unique approval pathway)" },
        { name: "CST", role: "Data facility licence" },
      ],
      requiredPermits: ["MODON Licence", "SEC Power Agreement", "SWCC Standalone Desal Construction Permit", "NWC Micro-desal Integration Approval", "CST Licence", "GDCD Fire Safety"],
      approvalProcess: [
        { step: "SWCC/NWC Standalone Desalination Approval", description: "Unique process — permission to build and operate a standalone micro-desal plant is not a standard permit.", typicalDuration: "20–24 weeks" },
        { step: "MODON + SEC", description: "Industrial licence and minimal power connection.", typicalDuration: "10–12 weeks" },
        { step: "CST + Safety", description: "Data facility licence and fire safety.", typicalDuration: "8–10 weeks" },
      ],
      similarProjects: [{ name: "No commercial precedent in this zone" }],
      aiAdvice: "Do not pursue Al-Wajh for any commercial data center project on current infrastructure. The standalone desalination approval alone adds 5–6 months and sets a regulatory precedent that may not survive ministry review. Revisit only if NEOM coastal corridor investment confirms this location.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [],
      plannedTSEExpansions: [],
      infrastructureInvestments: [],
      scoreProjection: [{ year: 2025, score: 28 }, { year: 2027, score: 28 }, { year: 2030, score: 30 }],
      aiPrediction: "Al-Wajh will see essentially no infrastructure improvement unless NEOM's coastal corridor development extends southward. Score through 2030 is essentially flat. Retain in dataset as the baseline for 'completely unsuitable' classification.",
    },
    water: {
      summary: { availabilityScore: 22, distanceToInfrastructure: "8 km", reliability: "Low" },
      detail: { cost: "SAR 8.50/m3 (trucking — no industrial supply available)", sustainability: "No viable supply pathway — standalone micro-desal construction required", droughtRisk: "High" },
    },
    power: {
      summary: { distanceToSubstation: "9.5 km", availableCapacityMW: 8, reliability: "Low" },
      detail: { outageHistory: "10+ outages in past 12 months", electricityPrice: "SAR 0.28/kWh", renewableAvailability: "Excellent Red Sea wind and solar — no project within 200 km", expansionPotential: "No funded expansion — would require new transmission line from Tabuk (120 km)" },
    },
    climate: {
      summary: { avgYearlyTemp: "26°C", peakSummerTemp: "40°C", estimatedPUEImpact: "+0.09 PUE penalty vs. temperate climate" },
      detail: { humidity: "Low coastal — avg 32% RH (drier than Jeddah)", extremeHeatDays: 30 },
    },
    connectivity: {
      summary: { distanceToBackbone: "10.2 km", fiberProviders: 1, redundancy: "No" },
      detail: { latencyToMajorCities: "Riyadh: 55ms, Jeddah: 45ms, Tabuk: 35ms", proximityToIX: "No IX within 500 km; fiber service is intermittent" },
    },
    land: {
      summary: { landPrice: "SAR 40/m2", parcelSize: "200 hectares available (port-adjacent)", floodRisk: "Medium" },
      detail: { flatnessSlope: "<1% grade — coastal flat with seasonal wadi risk", soilStability: "Coastal sandy gravel — adequate with drainage", roomForExpansion: "Vast undeveloped coastal area — land is not the constraint", distanceToRoads: "8 km partly unpaved to Coastal Highway 55" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Conditional", sezStatus: "Not in SEZ", permittingSpeed: "16-22 months" },
      detail: { taxIncentives: "No applicable incentives at this scale of development", environmentalRestrictions: "Coastal protection zone — environmental survey and marine impact assessment required", governmentSupport: "No government facilitation infrastructure in Al-Wajh — all applications routed through Tabuk regional offices", easeOfPermits: "Difficult" },
    },
  },

  // ── site-028: Dammam 3rd Industrial City ─────────────────────────
  {
    id: "site-028",
    name: "Dammam 3rd Industrial City",
    region: "Eastern",
    distanceFromRiyadh: 401,
    overallScore: 77,
    rating: "Good",
    coordinates: { lat: 26.442, lng: 50.121 },
    waterAccess: { score: 74, nearestTSELine: "2.4 km", availableCapacity: "55,000 m3/day", source: "Eastern Province TSE Network — Dammam Node" },
    infrastructure: { score: 84, powerAvailability: "High", fiberConnectivity: "Dual-path fiber, 100 Gbps", roadAccess: "Highway 40 (Riyadh–Dammam) direct industrial access" },
    regulatory: { score: 76, agenciesInvolved: 4, estApprovalTime: "6-8 months", complexityLevel: "Low" },
    coolingImpact: { airCooling: "+1,900 m3/day", liquidCooling: "+1,425 m3/day", immersionCooling: "+713 m3/day", dlcCooling: "+950 m3/day" },
    coolingDetail: {
      air:       { dailyWater: "+1,900 m3/day", energyUsage: "High",   capex: "Low",    opex: "High"   },
      liquid:    { dailyWater: "+1,425 m3/day", energyUsage: "Medium", capex: "Medium", opex: "Medium" },
      immersion: { dailyWater: "+713 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Low"    },
      dlc:       { dailyWater: "+950 m3/day",   energyUsage: "Low",    capex: "High",   opex: "Medium" },
    },
    nearbyInfrastructure: [
      { name: "Eastern Province TSE Network — Dammam Node", type: "Water Treatment", distance: "2.4 km", status: "Operational" },
      { name: "SEC Dammam 3rd Industrial Substation", type: "Power", distance: "1.6 km", status: "Operational" },
      { name: "STC Dammam Fiber Junction", type: "Connectivity", distance: "2.8 km", status: "Operational" },
      { name: "Dammam Port (King Abdul Aziz Port)", type: "Industrial Zone", distance: "8 km", status: "Active" },
    ],
    waterAccessDetail: {
      overallScore: 74,
      riskLevel: "Low",
      aiRecommendation: "Dammam 3rd Industrial City benefits from the mature Eastern Province TSE network with SWCC desalination as a secondary backup. Water allocation for industrial users follows a streamlined NWC process given the zone's established industrial history.",
      nearbyWaterSources: [
        { plant: "Eastern Province TSE Network — Dammam Node", distance: "2.4 km", capacity: "55,000 m3/day", status: "Operational" },
        { plant: "SWCC Al-Khobar Desalination (backup)", distance: "18 km", capacity: "185,000 m3/day", status: "Operational" },
      ],
      availabilityTimeline: [{ year: 2025, score: 74 }, { year: 2027, score: 76 }, { year: 2030, score: 78 }],
      supportingDocuments: [{ name: "NWC Eastern Province Industrial Allocation Guideline 2024", type: "Regulatory" }],
    },
    infrastructureDetail: {
      electrical: { gridOperator: "Saudi Electricity Company", substation: "Dammam 3rd Industrial Substation D-8", voltage: "230 kV", distance: "1.6 km", spareCapacity: "150 MW available" },
      fiber: { provider: "STC & Mobily (dual carrier)", redundancy: "Dual-path, fully redundant", bandwidth: "100 Gbps", plannedExpansion: "Dammam Port fiber corridor upgrade 2026 — 200 Gbps" },
      transportation: { nearestHighway: "Highway 40 (Riyadh–Dammam Expressway) — direct industrial access", airportDistance: "30 km to King Fahd International Airport", logisticsNotes: "Dammam King Abdul Aziz Port 8 km — largest port on the Gulf coast. Excellent for large equipment import." },
      industrial: { nearbyIndustrialZones: ["Dammam 2nd Industrial City (adjacent)", "Dammam 3rd Industrial City", "King Abdul Aziz Port Free Zone (8 km)"], utilityCorridors: ["Eastern Province TSE Ring", "SEC Dammam 230 kV Corridor"], existingDataCenters: ["STC Eastern Region Hub (12 km)", "Mobily Dammam DC (15 km)"] },
      aiRecommendation: "Dammam 3rd Industrial City offers the best balance of mature infrastructure, port logistics, and regulatory predictability in the Eastern Province south of Dhahran. The Highway 40 direct access and Dammam Port proximity make it ideal for large equipment deliveries. Recommend as the primary alternative to Dhahran for Eastern Province deployments.",
    },
    regulatoryDetail: {
      requiredAgencies: [
        { name: "MODON", role: "Industrial city occupancy licence" },
        { name: "SEC", role: "230 kV power connection agreement" },
        { name: "NWC", role: "Water allocation — streamlined for established industrial zone" },
        { name: "CST", role: "Data facility operating licence" },
      ],
      requiredPermits: ["MODON Occupancy Licence", "SEC Power Connection Agreement", "NWC Water Allocation", "CST Data Facility Licence", "GDCD Fire Safety Certificate", "SASO Technical Compliance Certificate"],
      approvalProcess: [
        { step: "MODON Application", description: "Submit with full project specs. Dammam 3rd has established MODON single-window process.", typicalDuration: "4–5 weeks" },
        { step: "NWC + SEC in Parallel", description: "Water allocation and 230 kV connection agreements simultaneously — both streamlined for established industrial zone.", typicalDuration: "5–7 weeks" },
        { step: "CST Licence", description: "Data facility operating licence — submit in parallel with utility agreements.", typicalDuration: "6–8 weeks" },
        { step: "Safety & Final", description: "GDCD fire safety, SASO technical compliance, MODON final occupancy.", typicalDuration: "3–4 weeks" },
      ],
      similarProjects: [
        { name: "STC Eastern Region Hyperscale Phase 2", location: "Dammam Industrial Zone", approvalTime: "7 months" },
        { name: "Mobily Dammam DC Expansion", location: "Dammam 3rd Industrial", approvalTime: "6 months" },
      ],
      aiAdvice: "Dammam 3rd is one of the most straightforward approval paths in the dataset for an Eastern Province site — established industrial zone with proven MODON single-window. CST licence is the longest individual step. Submit it day-one alongside MODON. Allow 6–8 months total.",
    },
    forecastDetail: {
      plannedDesalinationPlants: [{ name: "Eastern Province Jubail 3 Desal — Dammam Extension", expectedCapacity: "60,000 m3/day", expectedYear: 2027 }],
      plannedTSEExpansions: [{ name: "Eastern Province TSE Network Phase 5 — Dammam Node", expectedCapacity: "80,000 m3/day", expectedYear: 2028 }],
      infrastructureInvestments: [
        { name: "Dammam Port Fiber Corridor Upgrade (STC + Mobily)", amount: "SAR 160M", year: 2026 },
        { name: "SEC Dammam 3rd Substation 380 kV Upgrade", amount: "SAR 480M", year: 2027 },
        { name: "Highway 40 Industrial Zone Access Road Expansion", amount: "SAR 340M", year: 2027 },
      ],
      scoreProjection: [{ year: 2025, score: 77 }, { year: 2027, score: 80 }, { year: 2030, score: 84 }],
      aiPrediction: "Dammam 3rd is on a strong improvement trajectory. The 230 kV to 380 kV substation upgrade in 2027 doubles available power capacity, while the Jubail 3 desalination extension and TSE expansion significantly improve water headroom. By 2030 this site competes directly with Al-Khair Industrial City.",
    },
    water: {
      summary: { availabilityScore: 74, distanceToInfrastructure: "2.4 km", reliability: "High" },
      detail: { cost: "SAR 2.40/m3", sustainability: "Eastern Province TSE + SWCC desalination dual supply", droughtRisk: "Low" },
    },
    power: {
      summary: { distanceToSubstation: "1.6 km", availableCapacityMW: 150, reliability: "High" },
      detail: { outageHistory: "1 outage in past 12 months", electricityPrice: "SAR 0.18/kWh", renewableAvailability: "Gulf solar PPA projects — 120 MW available 2026", expansionPotential: "SEC 380 kV upgrade 2027 adds 200 MW capacity" },
    },
    climate: {
      summary: { avgYearlyTemp: "27°C", peakSummerTemp: "46°C", estimatedPUEImpact: "+0.15 PUE penalty vs. temperate climate" },
      detail: { humidity: "Moderate Gulf coastal — avg 58% RH", extremeHeatDays: 55 },
    },
    connectivity: {
      summary: { distanceToBackbone: "2.8 km", fiberProviders: 2, redundancy: "Yes" },
      detail: { latencyToMajorCities: "Riyadh: 11ms, Dubai: 18ms, Bahrain: 5ms, Dhahran: 10ms", proximityToIX: "SAIX Dammam Internet Exchange — 12 km; Bahrain IX via Gulf submarine cable 25 km" },
    },
    land: {
      summary: { landPrice: "SAR 520/m2", parcelSize: "90 hectares available", floodRisk: "Low" },
      detail: { flatnessSlope: "<0.7% grade — flat industrial terrain", soilStability: "Compacted desert gravel on limestone — excellent", roomForExpansion: "Dammam 3rd Phase 2 zone adds 80 ha adjacent", distanceToRoads: "0.4 km to Highway 40 industrial spur" },
    },
    zoning: {
      summary: { dataCenterPermitted: "Yes", sezStatus: "MODON Industrial City", permittingSpeed: "6-8 months" },
      detail: { taxIncentives: "MODON standard industrial tariff — Eastern Province investment incentive available via MISA", environmentalRestrictions: "Standard industrial EIA — Gulf coastal proximity requires minor marine assessment", governmentSupport: "MODON single-window; established DC precedents from STC and Mobily expansions", easeOfPermits: "Easy" },
    },
  },
];

export function getSiteById(id) {
  return sites.find((site) => site.id === id) ?? null;
}

export function getSitesSortedByScore() {
  return [...sites].sort((a, b) => b.overallScore - a.overallScore);
}
