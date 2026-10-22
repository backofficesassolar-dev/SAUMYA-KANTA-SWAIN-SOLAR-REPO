import { ProductItem, ProjectMilestone } from '../types';

export const ODISHA_DISTRICTS = [
  { id: 'bhubaneswar', name: 'Bhubaneswar', discom: 'TPCODL', irradiance: '5.4 kWh/m²', zone: 'Central High Insolation' },
  { id: 'cuttack', name: 'Cuttack', discom: 'TPCODL', irradiance: '5.2 kWh/m²', zone: 'Coastal Valley Corridor' },
  { id: 'puri', name: 'Puri', discom: 'TPCODL', irradiance: '5.3 kWh/m²', zone: 'Coastal Cyclone Fortified Zone' },
  { id: 'khordha', name: 'Khordha', discom: 'TPCODL', irradiance: '5.3 kWh/m²', zone: 'Industrial / Commercial Belt' },
  { id: 'balasore', name: 'Balasore', discom: 'TPNODL', irradiance: '5.1 kWh/m²', zone: 'North Coastal Plains' },
  { id: 'bhadrak', name: 'Bhadrak', discom: 'TPNODL', irradiance: '5.1 kWh/m²', zone: 'Northern Agricultural Belt' },
  { id: 'sambalpur', name: 'Sambalpur', discom: 'TPWODL', irradiance: '5.6 kWh/m²', zone: 'Western High Yield Zone' },
  { id: 'rourkela', name: 'Rourkela', discom: 'TPWODL', irradiance: '5.3 kWh/m²', zone: 'Heavy Industrial Grid' },
  { id: 'berhampur', name: 'Berhampur', discom: 'TPSODL', irradiance: '5.4 kWh/m²', zone: 'Southern Coastal Hub' },
  { id: 'angul', name: 'Angul - Talcher', discom: 'TPCODL', irradiance: '5.2 kWh/m²', zone: 'Energy & Heavy Industry Zone' },
];

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: 'WAAREE-550-TOPCON',
    name: 'Waaree Bi-facial TOPCon 550W (WSMD-550)',
    brand: 'Waaree',
    category: 'Solar Panels (PV)',
    price: '₹14,850 / panel',
    priceNumeric: 14850,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKtg5TOXKLGaQj3TlMF0G3AzGEyVeiNqDmpQEEBjcJB1MZgNvIJJIelRHpX0gL3UkEOXAmObRPMfP1HBi1t9Q666D2riisTdI6FcS5fU0mlg5tX_Avzgw0Gm1xrWoFupt4qo--1mRF59KTYO9Et_stavD-3Ylp0MxF4VTxqamuziepLYl5y8qQrJAFuP-JJJ7AVNkkfZ0s8gYR2zD3cGygw9ufO0dBE_Vj3ktyKlaykzbrvL2L_7uI1w',
    badge1: 'Bi-facial N-Type',
    badge2: '200 km/h Wind Safe',
    stockStatus: 'Bhubaneswar Hub • In Stock',
    specs: {
      label1: 'Module Efficiency',
      value1: '22.8% Yield',
      label2: 'Dual-Glass Warranty',
      value2: '30-Yr Performance',
      label3: 'PID Resistance',
      value3: 'Anti-Degradation v4',
      label4: 'Cyclone Rating',
      value4: '200 km/h Tested',
    },
    features: [
      'N-Type TOPCon cells with zero LID (Light Induced Degradation)',
      'Dual-glass IP68 hermetic seal against Odisha high coastal humidity',
      'Up to 25% additional rear-side albedo gain on RCC white-coated terraces',
      'ALMM approved & pre-enlisted for PM Surya Ghar subsidy disbursement'
    ],
    discomApproval: 'TPCODL / TPNODL / TPWODL / TPSODL Verified',
    warranty: '12-Year Product + 30-Year Linear Performance Warranty',
    cycloneRating: 'Tested up to 200 km/h wind shear velocity',
    description: 'Flagship Tier-1 bi-facial solar module engineered with dual-glass encapsulation to prevent PID and saline coastal corrosion across Odisha shores.'
  },
  {
    id: 'TATA-545-PERC',
    name: 'Tata Power Solar Mono PERC 545W (TP-545M)',
    brand: 'Tata Power Solar',
    category: 'Solar Panels (PV)',
    price: '₹13,900 / panel',
    priceNumeric: 13900,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFv4QbpLO9sAEk85EUm-mb02Rj5LOuOC4ZbecDpCx3FxKU9eSGNKrmLkE1vVVMUI1zy1fDNaRsLr-w--FAMT03LCG71H41_27lTf7xtNpCuPw1XYz276Ops3f_hYB-2Yj1L6rbDhB_Vn8UpEH5NSB2V-69j_6QC9N2HCYdBYp5LWK-p1bBwmu8dU5eRP1oVli2RzLZNX-KxStY9RbsIv1tpQDln6K7qqbVSSHDEJ9hD-pw8GC3EowKDw',
    badge1: 'Mono PERC Half-Cut',
    badge2: 'Tata Trust Tier-1',
    stockStatus: 'Odisha Supply: 3-5 Days',
    specs: {
      label1: 'Module Efficiency',
      value1: '21.3% STC',
      label2: 'Product Warranty',
      value2: '12 Yr Product / 25 Yr Yield',
      label3: 'Discom Net Meter',
      value3: 'TPCODL / TPWODL Approved',
      label4: 'Frame Build',
      value4: '35mm Anodized Alloy',
    },
    features: [
      'Multi-busbar half-cut cell technology minimizing hot-spot risk',
      'Anti-reflective high-transmission tempered glass',
      'Endorsed by Tata Power Odisha Distribution utility standards',
      'Official barcode tracking for warranty registration'
    ],
    discomApproval: 'TPCODL, TPNODL, TPSODL & TPWODL Approved',
    warranty: '12-Year Product + 25-Year Linear Power Output Warranty',
    cycloneRating: '5400 Pa Snow Load / 2400 Pa Wind Load',
    description: 'Premier Indian-manufactured mono PERC modules combining high conversion efficiency with long-term durability in high-heat summer conditions.'
  },
  {
    id: 'GROWATT-5000TLX',
    name: 'Growatt MIN 5000TL-X Dual MPPT Inverter (5kW)',
    brand: 'Growatt',
    category: 'Grid-Tie Inverters',
    price: '₹38,500 turnkey',
    priceNumeric: 38500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBu-aui7qWTLg7Aw38BsClD_IOzeYuVFeYaF398_T_gVH-sBrSLxO7f8ZS3AekJI94_j9d1ushFoNL4-_479EE2NDBDnNmwsjHrHkti5Rev6xwUe369KS_voXH2jGJ8nQUyCVP1bPeRRYqnpDR689LeQkJmP2B6y7jZHAuPhaovhc4GLIgIkWIybH58cmrtvTkwVWk8AshCF7Rb335D8kP-DrLtd1tahQdmlMOqUBg2eq2cprhmed-_IQ',
    badge1: 'On-Grid Single Phase',
    badge2: '98.4% Efficiency',
    stockStatus: 'In Stock • Ready to Wire',
    specs: {
      label1: 'MPPT Channels',
      value1: '2 Trackers (Dual String)',
      label2: 'Ingress Protection',
      value2: 'IP65 Waterproof',
      label3: 'Surge Arrester',
      value3: 'Type II DC/AC SPD Built-in',
      label4: 'Odisha Grid Cert',
      value4: 'TPCODL / TPNODL Compatible',
    },
    features: [
      'Dual independent MPPT trackers for multi-directional roof layouts',
      'OLED touch display with intuitive local status readout',
      'Integrated ShineWiFi-X module for 24/7 cloud telemetry',
      'Sub-second anti-islanding protection conforming to IEEE 1547 / IEC 62116'
    ],
    discomApproval: 'Full OERC bi-directional net-meter compatibility',
    warranty: '10-Year Replacement Guarantee & On-site Service',
    cycloneRating: 'IP65 rated for rain storms and high humidity',
    description: 'High-frequency transformerless on-grid inverter offering class-leading 98.4% efficiency with silent fanless convection cooling.'
  },
  {
    id: 'SUNGROW-SH5-BATT',
    name: 'Sungrow SH5.0RS Hybrid Inverter (5kW) + 5.12kWh LiFePO4 Battery',
    brand: 'Sungrow',
    category: 'Hybrid & Batteries',
    price: 'Custom Quote',
    priceNumeric: 145000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs0Ito4Pvcx2eC-YSwS4gWEFuXRI71GVKad1W6hn6RZhPN1Fn1YAsR3RhG_22DY7jVarVx4dOCdsCxfID3YJFkSEwD9IpnJtgXw_UAQmSGCcNuxCGAX205VaEBPwQRlSnEMSyjE_jrQWRzp6loEvC0Ln1-mugEsqSav62lBR80qLiflS8D-oJPQ4bQZjWu2loSCpGooc5aCBjtvCj-8nkMu8CAZ5fbfPTGEoFSMD4joq2kAydgu4y_zA',
    badge1: 'Cyclone Blackout Shield',
    badge2: '< 10ms Switchover',
    stockStatus: 'High Demand • Pre-booking',
    specs: {
      label1: 'Switchover Time',
      value1: '< 10ms (Seamless UPS)',
      label2: 'Battery Chemistry',
      value2: 'LiFePO4 6000 Cycles',
      label3: 'Warranty Term',
      value3: '10-Year Comprehensive',
      label4: 'Smart Telemetry',
      value4: 'iSolarCloud Live App',
    },
    features: [
      'Sub-10 millisecond automatic grid transfer keeps ACs, lights & computers running',
      'Lithium Iron Phosphate (LFP) modular battery expansion up to 20 kWh',
      'Emergency power supply during severe cyclonic grid disconnections in coastal Odisha',
      'Intelligent peak shaving and night-time discharge optimization'
    ],
    discomApproval: 'DISCOM Certified Net-Meter + Battery Storage System',
    warranty: '10-Year Comprehensive Inverter & Battery Pack Warranty',
    cycloneRating: 'Marine grade anti-corrosion cabinet C5-M compliant',
    description: 'Advanced hybrid solar solution engineered to provide uncompromised power security in coastal districts like Puri, Kendrapara, and Jagatsinghpur.'
  },
  {
    id: 'HDG-STRUCTURE-ODISHA',
    name: 'Coastal Heavy Duty Mounting Structure (Odisha Coastal Grade)',
    brand: 'Microtek',
    category: 'Mounting & BOS',
    price: '₹1,850 / panel set',
    priceNumeric: 1850,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQSYpP8gQO6VrYGAB1a-ZEkCW3C-JY3Q_9gvS6Bz-evlAhJTb85XNTs_l5mWt4Mm0CHTqXqqNGYXReieI_Ftp2Xk6EOwq5yo0QQeofX2sX3jxbCqeZjoS-w-EMDAZSyJKGhudSFESiN7-M4xWGE5T2aWc8rOKRtqhzsShwSP2dO62szSXtEahU_xpTH2dX1ihGMX24AhEqN_R66Ib_6_AhThHdf5w9Gkc2s0lLUzZDoISom2cMtX1P9Q',
    badge1: '210 km/h Wind Calibrated',
    badge2: 'SS304 Fasteners',
    stockStatus: 'Fabricated in Cuttack Depot',
    specs: {
      label1: 'Coating Standard',
      value1: '80+ Microns HDG',
      label2: 'Wind Resistance',
      value2: 'Up to 210 km/h (Cyclone Fani spec)',
      label3: 'Hardware',
      value3: '100% Rust-proof SS304 A2-70',
      label4: 'Tilt Angle',
      value4: '15° - 22° Fixed (Odisha Latitude)',
    },
    features: [
      'Heavy-duty hot-dip galvanized steel with 80+ micron zinc protection',
      'Hilti chemical anchoring fasteners guarantee zero water leakage through concrete slabs',
      'Aerodynamically validated on STAAD.Pro to withstand Category-5 cyclone conditions',
      'Custom rafter elevation options (2 ft to 8 ft gazebo clear height)'
    ],
    discomApproval: 'Required for all TPCODL / TPNODL / TPWODL / TPSODL inspections',
    warranty: '25-Year Anti-Rust Structural Integrity Guarantee',
    cycloneRating: '210 km/h certified structural calculations',
    description: 'Specifically engineered mounting system designed after Cyclone Fani lessons to safeguard solar assets from extreme coastal wind shear.'
  },
  {
    id: 'VIKRAM-550-BIFACIAL',
    name: 'Vikram Solar Hypersol Bi-facial 550W Module',
    brand: 'Vikram Solar',
    category: 'Solar Panels (PV)',
    price: '₹14,200 / panel',
    priceNumeric: 14200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfEIl30SBln73rnnFsBIMNpSsW4l0rzQTZWmKisn8jM8fmJW39dy9_y45JPlGhhcimmFva6QMKECXECihQL94mcAw1w0b2ozAGoxH86cTSalHi2xJfr2bdmvGWnbOkdG5j6jW9mzYZpPsrKFPhFZGwyPTvAB81OjIrrto84Hvf7JAfFNvvvGevXhRKwQiALwBICSjS_pfRmEgGFnz1tBptg7KxZAqPcALV1mzDT51SxoLV2h4oDzBgfg',
    badge1: 'N-Type TOPCon',
    badge2: 'ALMM Enlisted',
    stockStatus: 'In Stock • Bhubaneswar Depot',
    specs: {
      label1: 'Efficiency',
      value1: '22.4% Peak',
      label2: 'Degradation',
      value2: '< 0.40% / yr',
      label3: 'Bi-faciality',
      value3: 'Up to 80% ± 5%',
      label4: 'Warranty',
      value4: '30-Yr Linear',
    },
    features: [
      'Tier-1 Kolkata/Odisha regional dispatch with quick replacement logistics',
      'Superior temperature coefficient of -0.30%/°C for humid tropical heat',
      'Dual-glass design withstands heavy monsoon downpours and dust accumulation',
      'Eligible for PM Surya Ghar subsidy DBT directly in Aadhaar-linked account'
    ],
    discomApproval: 'Certified for All Odisha DISCOM Sub-stations',
    warranty: '12-Year Workmanship + 30-Year Performance',
    cycloneRating: '2400 Pa Wind / 5400 Pa Mechanical',
    description: 'High efficiency Indian Tier-1 bi-facial solar module with exceptional low-light response during rainy monsoon months in Odisha.'
  }
];

export const TEN_STAGE_TIMELINE: ProjectMilestone[] = [
  {
    stageNumber: '01',
    title: 'Initial Discovery & Load Analysis',
    desc: 'Analysis of past 12-month consumer electricity bills, sanction load, and tariff category.',
    status: 'completed',
    date: 'Day 1',
    note: 'Consumer bill verified: 420 kWh/mo, 3kW Sanction load'
  },
  {
    stageNumber: '02',
    title: 'Drone / 3D Roof Shadow Mapping',
    desc: 'Obstacle height checks (parapets, trees, overhead tanks) to eliminate azimuth shadow losses.',
    status: 'completed',
    date: 'Day 2',
    note: 'LiDAR scan completed. 350 sq.ft shadow-free area identified.'
  },
  {
    stageNumber: '03',
    title: 'CAD Structural & Electrical Engineering',
    desc: 'Single Line Diagram (SLD), string layout, and cyclone-rated (200 km/h) mounting structure design.',
    status: 'completed',
    date: 'Day 3-4',
    note: 'STAAD.Pro wind load simulation approved for 200 km/h.'
  },
  {
    stageNumber: '04',
    title: 'DISCOM Net-Metering Feasibility',
    desc: 'Online application filing on National Portal & TPCODL / TPNODL / TPWODL / TPSODL portals.',
    status: 'completed',
    date: 'Day 5',
    note: 'National Portal Ref #OD-2025-PM-8921 registered with TPCODL SDO.'
  },
  {
    stageNumber: '05',
    title: 'Tier-1 Hardware Dispatch & Delivery',
    desc: 'ALMM-approved modules and inverters shipped with batch test certificates to site.',
    status: 'completed',
    date: 'Day 7',
    note: '6x Waaree TOPCon 550W modules + Growatt 5000TL-X received at site.'
  },
  {
    stageNumber: '06',
    title: 'Hot-Dip Galvanized Mounting Anchoring',
    desc: '80+ micron HDG structure anchoring with chemical fastener grouting to prevent roof leakage.',
    status: 'in-progress',
    date: 'Day 8-9 (Active)',
    note: 'Structure erection in progress. Rafters aligned at 20° South azimuth.'
  },
  {
    stageNumber: '07',
    title: 'Inverter & AC/DC DB Protection Cabling',
    desc: 'UV-resistant solar DC cables, Type-II surge arrestors (SPD), and miniature circuit breakers (MCBs).',
    status: 'pending',
    date: 'Day 10',
    note: 'Scheduled for tomorrow morning by electrical crew.'
  },
  {
    stageNumber: '08',
    title: 'Dual Chemical Earthing & Megger Testing',
    desc: 'Dedicated earthing pits for AC, DC, and lightning arrestor (LA) ensuring resistance < 2 Ohms.',
    status: 'pending',
    date: 'Day 11',
    note: '3 chemical earth pits will be tested with calibrated Megger meter.'
  },
  {
    stageNumber: '09',
    title: 'DISCOM Joint Inspection & Net Meter Sync',
    desc: 'DISCOM SDO inspection, bi-directional net meter installation, and official grid sync.',
    status: 'pending',
    date: 'Day 12-14',
    note: 'Joint inspection token requested from TPCODL division office.'
  },
  {
    stageNumber: '10',
    title: 'Handover & IoT Mobile App Telemetry Setup',
    desc: 'Subsidy documentation final submission, customer portal access, and lifetime warranty handover.',
    status: 'pending',
    date: 'Day 15',
    note: 'Final PM Surya Ghar DBT clearance and warranty kit handover.'
  }
];

export const SAMPLE_PROJECTS = [
  {
    token: 'ADI-2025-OD-7419',
    name: 'Soumya Ranjan Mohapatra',
    address: 'Plot 412, Patia Square, Infocity, Bhubaneswar',
    pin: '751024',
    discom: 'TPCODL',
    capacity: '3.3 kWp (6x Waaree 550W)',
    inverter: 'Growatt MIN 5000TL-X',
    systemType: 'On-Grid Bi-Directional Net-Meter',
    leadEngineer: 'Er. Debasis Pradhan (MNRE Lead)',
    engineerContact: '+91 78940 12345',
    progressPercent: 55,
    currentStage: '06 - Hot-Dip Galvanized Mounting Anchoring',
    milestones: TEN_STAGE_TIMELINE
  },
  {
    token: 'ADI-2025-OD-3891',
    name: 'Priyabrata Panda',
    address: 'Mahanadi Vihar, Cuttack',
    pin: '753004',
    discom: 'TPCODL',
    capacity: '5.5 kWp Hybrid + 5kWh LiFePO4',
    inverter: 'Sungrow SH5.0RS Hybrid',
    systemType: 'Hybrid Cyclone Blackout Shield',
    leadEngineer: 'Er. Rajesh Tripathy (Senior BOS Eng)',
    engineerContact: '+91 78940 12345',
    progressPercent: 90,
    currentStage: '09 - DISCOM Joint Inspection & Net Meter Sync',
    milestones: TEN_STAGE_TIMELINE.map((m, i) => i <= 7 ? { ...m, status: 'completed' as const } : i === 8 ? { ...m, status: 'in-progress' as const } : m)
  }
];
