export type ScreenType =
  | 'home'
  | 'calculator'
  | 'catalog'
  | 'survey'
  | 'track'
  | 'portal'
  | 'subsidy';

export type DiscomType = 'TPCODL' | 'TPNODL' | 'TPSODL' | 'TPWODL';

export type SystemTopology = 'ongrid' | 'hybrid' | 'offgrid';

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: 'Solar Panels (PV)' | 'Grid-Tie Inverters' | 'Hybrid & Batteries' | 'Mounting & BOS';
  price: string;
  priceNumeric: number;
  image: string;
  badge1: string;
  badge2: string;
  stockStatus: string;
  specs: {
    label1: string;
    value1: string;
    label2: string;
    value2: string;
    label3: string;
    value3: string;
    label4: string;
    value4: string;
  };
  features: string[];
  discomApproval: string;
  warranty: string;
  cycloneRating: string;
  datasheetUrl?: string;
  description: string;
}

export interface CalculationResult {
  bill: number;
  property: string;
  district: string;
  roofArea: number;
  substrate: string;
  systemType: SystemTopology;
  capacityKW: number;
  panelsCount: number;
  spaceFootprint: number;
  monthlyGeneration: number;
  annualGeneration: number;
  annualSavings: number;
  grossCost: number;
  centralSubsidy: number;
  stateSubsidy: number;
  netCost: number;
  paybackYears: number;
  lifetimeSavings: number;
  co2SavedTonnes: number;
  treesOffset: number;
}

export interface SurveyBooking {
  token: string;
  name: string;
  mobile: string;
  email: string;
  district: string;
  area: string;
  pin: string;
  discom: DiscomType;
  consumerNo: string;
  sanctionedLoad: number;
  monthlyBill: number;
  phase: 'Single Phase' | 'Three Phase';
  propertyType: string;
  roofSurface: string;
  roofArea: number;
  roofAccess: string;
  slot: string;
  recommendedKw?: string;
  status: 'Survey Scheduled' | 'Site Inspected' | 'CAD Approved' | 'Net-Meter Discom Filed' | 'Commissioned';
  createdAt: string;
}

export interface ProjectMilestone {
  stageNumber: string;
  title: string;
  desc: string;
  status: 'completed' | 'in-progress' | 'pending';
  date?: string;
  note?: string;
}
