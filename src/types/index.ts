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
  branchId?: string; // Added for multi-branch support
}

export interface BuyingHouse {
  id: string;
  name: string;
  locationDist: string;
  grade: string;
  contactPersonName: string;
  phone: string;
  branchId?: string; // Added for multi-branch support
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
  branchId?: string; // Added for multi-branch support
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
  branchId?: string; // Added for multi-branch support
}

export interface StockItem {
  code: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  value?: string; // For colors
  branchId?: string; // Added for multi-branch support
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
  branchId?: string; // Added for multi-branch support
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
  branchId?: string; // Added for multi-branch support
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
  branchId?: string; // Added for multi-branch support
}

// New Branch interface
export interface Branch {
  id: string;
  name: string;
  code: string;
  type: 'main' | 'subsidiary';
  location: string;
  contactPerson: string;
  phone: string;
  email: string;
  isActive: boolean;
  description?: string;
}

// Finance-related interfaces
export interface FinancialTransaction {
  id: string;
  date: string;
  account: string;
  description: string;
  reference: string;
  debit: number;
  credit: number;
  balance: number;
  branchId: string;
}

export interface PayableBill {
  id: string;
  vendor: string;
  invoice: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Pending' | 'Overdue' | 'Paid';
  branchId: string;
}

export interface ReceivableInvoice {
  id: string;
  customer: string;
  invoice: string;
  order: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Pending' | 'Overdue' | 'Paid';
  branchId: string;
}

export interface OrderCostingSummary {
  orderId: string;
  buyer: string;
  style: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  salePrice: number;
  profit: number;
  branchId: string;
}

export interface CashBankTransaction {
  id: string;
  date: string;
  description: string;
  type: 'জমা' | 'উত্তোলন';
  amount: number;
  balance: number;
  branchId: string;
}

export interface FixedAsset {
  id: string;
  name: string;
  category: string;
  purchaseDate: string;
  cost: number;
  depreciation: number;
  bookValue: number;
  branchId: string;
}

export interface PayrollEntryFinance {
  id: string;
  employeeId: string;
  name: string;
  position: string;
  basic: number;
  allowance: number;
  deduction: number;
  net: number;
  status: 'পেইড' | 'পেন্ডিং';
  branchId: string;
}

// Production & Performance interfaces
export interface ProductionLineStatus {
  id: string;
  line: string;
  target: number;
  actual: number;
  efficiency: number;
  status: 'Active' | 'Maintenance';
  operator: string;
  branchId: string;
}

export interface HourlyProductionData {
  id: string;
  hour: string;
  production: number;
  target: number;
  branchId: string;
}

export interface OrderTrackingEntry {
  id: string;
  orderId: string;
  buyer: string;
  style: string;
  quantity: number;
  progress: number;
  stage: string;
  delivery: string;
  status: 'On Track' | 'Delayed';
  branchId: string;
}

export interface LinePerformanceSummary {
  id: string;
  line: string;
  efficiency: number;
  target: number;
  actual: number;
  defects: number;
  branchId: string;
}

export interface WeeklyEfficiencyTrend {
  id: string;
  day: string;
  efficiency: number;
  branchId: string;
}

export interface QualityInspection {
  id: string;
  time: string;
  line: string;
  order: string;
  inspector: string;
  checked: number;
  passed: number;
  defects: number;
  rate: number;
  status: 'Passed' | 'Warning' | 'Failed';
  branchId: string;
}

// HRM interfaces
export interface AttendanceRecord {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  inTime: string;
  outTime: string;
  hours: string;
  status: 'Present' | 'Late' | 'Absent';
  branchId: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: string;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  branchId: string;
}

export interface PerformanceEvaluation {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  branchId: string;
}

// Reporting interfaces
export interface MonthlyOrderVolume {
  id: string;
  month: string;
  value: number;
  branchId: string;
}

export interface ShipmentSummary {
  id: string;
  month: string;
  shipped: number;
  pending: number;
  onTime: number;
  branchId: string;
}

export interface ProductionEfficiencyReport {
  id: string;
  department: string;
  efficiency: number;
  branchId: string;
}

export interface OrderStatusDistribution {
  id: string;
  status: string;
  count: number;
  color: string;
  branchId: string;
}