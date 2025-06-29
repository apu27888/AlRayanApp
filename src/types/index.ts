export interface Buyer {
  id: string;
  name: string; // This will be "Brand" in the UI
  company: string; // This will be "Company Name" in the UI
  companyType?: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  currency: string;
  buyingHouseId?: string;
}

export interface BuyingHouse {
  id: string;
  name: string;
  locationDist: string;
  grade: string;
  contactPersonName: string;
  phone: string;
}

export interface Employee {
  id: string;
  name: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  joiningDate: string;
  salary: {
    basic: number;
    houseRent: number;
    medical: number;
    conveyance: number;
    other: number;
  };
}

export interface Supplier {
  id: string;
  company: string;
  contactPerson: string;
  phone: string;
  email: string;
  country: string;
  bank: {
    name: string;
    account: string;
    branch: string;
  };
  productType: string;
}

export interface StockItem {
  code: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  value?: string; // For colors
}

export interface OrderItem {
  id: number;
  style: string;
  item: string;
  fabricCategory: string;
  fabricName: string;
  colors: string[];
  sizes?: string[];
  startDate: string;
  unitPrice: number;
  shipmentDate: string;
  oqnty?: number;
  breakdown?: BreakdownItem[];
}

export interface BreakdownItem {
  fabricColor: string;
  printColor: string;
  embColor: string;
  qnty?: number;
  [size: string]: string | number | undefined;
}

export interface ReferenceItem {
  style: string;
  fabricType: string;
  originalSample: {
    startDate: string;
    deadline: string;
  };
  measurementSheet: {
    startDate: string;
    deadline: string;
  };
  colorSwatch: {
    startDate: string;
    deadline: string;
  };
}

export interface ColorSwagItem {
  fabricType: string;
  color: string;
  pantone: string;
  startDate: string;
  endDate: string;
}

export interface Order {
  id: string;
  buyer: string;
  style: string;
  quantity: number;
  orderDate: string;
  shipDate: string;
  managementStatus: 'Negotiation' | 'Confirmed' | 'On Hold' | 'Cancelled';
  description: string;
  productionStatus: string;
  productionStatusColor: string;
  progress: number;
  sampleProgress: Record<string, string>;
  costingHistory: CostingRevision[];
  orderIntroduction: OrderIntroduction;
  programPlan: ProgramPlan;
  buyingHouseId?: string;
  numberOfStyles?: number;
}

export interface CostingRevision {
  revision: number;
  date: string;
  style: string;
  quantity: number;
  item: string;
  fabrics: FabricCost[];
  trims: number;
  print: number;
  embroidery: number;
  wash: number;
  cm: number;
  commercial: number;
  misc: number;
  orderItemId?: number; // Link to specific OrderItem
}

export interface FabricCost {
  name: string;
  qty: number;
  price: number;
}

export interface OrderIntroduction {
  merchandiser?: string;
  orderNumber?: string;
  orderTitle?: string;
  orderDescription?: string;
  season?: string;
  year?: string;
  contactDate?: string;
  startDate?: string;
  expiryDate?: string;
  consignee?: string;
  managementStatus?: string;
  negotiationPeriod?: string;
  paymentTerms?: string;
  paymentMode?: string;
  bankAccount?: string;
  portOfLoading?: string;
  portOfDischarge?: string;
  items: OrderItem[];
}

export interface ProgramPlan {
  initialStage: {
    receiveFromBuyer: any[];
    approval: any[];
    referenceItems: ReferenceItem[];
    colorSwagItems: ColorSwagItem[];
  };
  samplePlan: any[];
  rbb: any[];
  requisitionBudget: Record<string, any[]>;
  production: Record<string, any>;
}

export interface StockLedgerEntry {
  date: string;
  itemCode: string;
  itemName: string;
  type: 'IN' | 'OUT';
  quantity: number;
  remarks: string;
  before?: number;
  after?: number;
}

export interface PriceQuotation {
  orderId: string;
  orderItemId?: number; // Link to specific OrderItem
  style: string;
  item: string;
  oqnty: number;
  uPrice: number;
  bp1: number;
  rp1: number;
  bp2: number;
  rp2: number;
  bp3: number;
  rp3: number;
  bp4: number;
  rp4: number;
  fPrice: number;
  status: string;
}