import { Buyer, Employee, Supplier, StockItem, Order, StockLedgerEntry, PriceQuotation, BuyingHouse, Branch, FinancialTransaction, PayableBill, ReceivableInvoice, OrderCostingSummary, CashBankTransaction, FixedAsset, PayrollEntryFinance, ProductionLineStatus, HourlyProductionData, OrderTrackingEntry, LinePerformanceSummary, WeeklyEfficiencyTrend, QualityInspection, AttendanceRecord, LeaveRequest, PerformanceEvaluation, MonthlyOrderVolume, ShipmentSummary, ProductionEfficiencyReport, OrderStatusDistribution } from '../types';

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];
export const BREAKDOWN_SIZES = ['6M','12M','18M','24M','30M','36M','2Y','4Y','6Y','8Y','10Y', '12Y','14Y','16Y','18Y','XS','S','M','L','XL','2XL','3XL','4XL'];
export const CATEGORIES = ['Woven Fabric', 'Knit Fabric', 'Yarn', 'Rib', 'Color', 'Trims', 'Accessories'];
export const UNITS = ['Yds', 'Kg', 'Pc', 'L'];
export const COSTING_ITEMS = ['T-SHIRT', 'POLO SHIRT', 'SHIRT', 'FROCK', 'LONG PANT', '¾ PANT', 'SHORT PANT', 'BOXER'];

// Branch definitions
export const branches: Branch[] = [
  {
    id: 'BR-001',
    name: 'Al Rayan Buyer',
    code: 'ARB',
    type: 'main',
    location: 'Dhaka, Bangladesh',
    contactPerson: 'Mr. Ahmed Rahman',
    phone: '+880-1700-000001',
    email: 'contact@alrayanbuyerhouse.com',
    isActive: true,
    description: 'Main buying house operations and buyer relations'
  },
  {
    id: 'BR-002',
    name: 'Al Rayan Garments',
    code: 'ARG',
    type: 'main',
    location: 'Savar, Dhaka',
    contactPerson: 'Ms. Fatima Sultana',
    phone: '+880-1800-000002',
    email: 'production@alrayangarments.com',
    isActive: true,
    description: 'Main garments manufacturing and production facility'
  },
  {
    id: 'BR-003',
    name: 'Al Rayan Knitting',
    code: 'ARK',
    type: 'main',
    location: 'Gazipur, Dhaka',
    contactPerson: 'Mr. Karim Uddin',
    phone: '+880-1900-000003',
    email: 'knitting@alrayanknitting.com',
    isActive: true,
    description: 'Specialized knitting and fabric production unit'
  },
  {
    id: 'BR-004',
    name: 'Al Rayan Printing',
    code: 'ARP',
    type: 'main',
    location: 'Narayanganj, Dhaka',
    contactPerson: 'Mr. Shahid Hasan',
    phone: '+880-1600-000004',
    email: 'printing@alrayanprinting.com',
    isActive: true,
    description: 'Printing, dyeing and finishing operations'
  },
  {
    id: 'BR-005',
    name: 'Al Rayan Embroidery',
    code: 'ARE',
    type: 'main',
    location: 'Chittagong',
    contactPerson: 'Ms. Rashida Begum',
    phone: '+880-1500-000005',
    email: 'embroidery@alrayanembroidery.com',
    isActive: true,
    description: 'Embroidery, embellishment and value addition services'
  }
];

export const buyingHouses: BuyingHouse[] = [
  { id: 'BH-001', name: 'Global Sourcing Ltd.', locationDist: 'Dhaka', grade: 'A+', contactPersonName: 'Mr. Rahman', phone: '+880-1700-000001', branchId: 'BR-001' },
  { id: 'BH-002', name: 'Fashion Forward Inc.', locationDist: 'Chittagong', grade: 'A', contactPersonName: 'Ms. Sultana', phone: '+880-1800-000002', branchId: 'BR-001' },
  { id: 'BH-003', name: 'Textile Solutions', locationDist: 'Gazipur', grade: 'B+', contactPersonName: 'Mr. Ahmed', phone: '+880-1900-000003', branchId: 'BR-001' },
];

export const buyers: Buyer[] = [
  { 
    id: 'B-001', 
    name: 'H&M', 
    company: 'Hennes & Mauritz AB', 
    companyType: 'Retail Chain',
    contactPerson: 'Mr. John Doe', 
    email: 'john.doe@hm.com', 
    phone: '+46 ...', 
    country: 'Sweden', 
    currency: 'USD',
    buyingHouseId: 'BH-001',
    branchId: 'BR-001'
  },
  { 
    id: 'B-002', 
    name: 'Zara', 
    company: 'Inditex', 
    companyType: 'Fashion Retailer',
    contactPerson: 'Ms. Jane Smith', 
    email: 'jane.smith@zara.com', 
    phone: '+34 ...', 
    country: 'Spain', 
    currency: 'EUR',
    buyingHouseId: 'BH-002',
    branchId: 'BR-001'
  },
];

export const employees: Employee[] = [
  { 
    id: 'EMP-0101', 
    name: 'Abul Kalam', 
    designation: 'Machine Operator', 
    department: 'Sewing', 
    phone: '01700000001', 
    email: 'abul@example.com', 
    address: 'Mirpur, Dhaka', 
    country: 'Bangladesh', 
    joiningDate: '2023-01-15', 
    salary: { basic: 8000, houseRent: 4000, medical: 1000, conveyance: 500, other: 0 },
    branchId: 'BR-002'
  },
  { 
    id: 'EMP-0256', 
    name: 'Fatima Begum', 
    designation: 'Quality Inspector', 
    department: 'Quality', 
    phone: '01800000002', 
    email: 'fatima@example.com', 
    address: 'Uttara, Dhaka', 
    country: 'Bangladesh', 
    joiningDate: '2022-11-20', 
    salary: { basic: 12000, houseRent: 6000, medical: 1000, conveyance: 500, other: 500 },
    branchId: 'BR-002'
  },
  { 
    id: 'EMP-0301', 
    name: 'Karim Uddin', 
    designation: 'Knitting Operator', 
    department: 'Knitting', 
    phone: '01900000003', 
    email: 'karim@example.com', 
    address: 'Gazipur, Dhaka', 
    country: 'Bangladesh', 
    joiningDate: '2023-03-10', 
    salary: { basic: 10000, houseRent: 5000, medical: 1000, conveyance: 500, other: 0 },
    branchId: 'BR-003'
  },
  { 
    id: 'EMP-0401', 
    name: 'Shahid Hasan', 
    designation: 'Print Operator', 
    department: 'Printing', 
    phone: '01600000004', 
    email: 'shahid@example.com', 
    address: 'Narayanganj, Dhaka', 
    country: 'Bangladesh', 
    joiningDate: '2022-08-15', 
    salary: { basic: 11000, houseRent: 5500, medical: 1000, conveyance: 500, other: 0 },
    branchId: 'BR-004'
  },
  { 
    id: 'EMP-0501', 
    name: 'Rashida Begum', 
    designation: 'Embroidery Specialist', 
    department: 'Embroidery', 
    phone: '01500000005', 
    email: 'rashida@example.com', 
    address: 'Chittagong', 
    country: 'Bangladesh', 
    joiningDate: '2023-05-20', 
    salary: { basic: 13000, houseRent: 6500, medical: 1000, conveyance: 500, other: 500 },
    branchId: 'BR-005'
  },
];

export const suppliers: Supplier[] = [
  { 
    id: 'SUP-001', 
    company: 'ABC Trims', 
    contactPerson: 'Mr. Supplier', 
    phone: '01900000003', 
    email: 'contact@abc.com', 
    country: 'Bangladesh', 
    bank: { name: 'City Bank', account: '123456789', branch: 'Gulshan' }, 
    productType: 'Buttons, Zippers',
    branchId: 'BR-002'
  },
  { 
    id: 'SUP-002', 
    company: 'XYZ Fabrics', 
    contactPerson: 'Ms. Fabrica', 
    phone: '01600000004', 
    email: 'sales@xyz.com', 
    country: 'China', 
    bank: { name: 'Bank of China', account: '987654321', branch: 'Shenzhen' }, 
    productType: 'Knit & Woven Fabrics',
    branchId: 'BR-003'
  },
];

export const stockItems: StockItem[] = [
  // Colors
  { code: 'CLR-001', name: 'Crimson Red', category: 'Color', value: '#DC143C', stock: 1000, unit: 'L', branchId: 'BR-004' },
  { code: 'CLR-002', name: 'Royal Blue', category: 'Color', value: '#4169E1', stock: 1000, unit: 'L', branchId: 'BR-004' },
  { code: 'CLR-003', name: 'Canary Yellow', category: 'Color', value: '#FFEF00', stock: 1000, unit: 'L', branchId: 'BR-004' },
  { code: 'CLR-004', name: 'Forest Green', category: 'Color', value: '#228B22', stock: 1000, unit: 'L', branchId: 'BR-004' },
  { code: 'CLR-005', name: 'Pure White', category: 'Color', value: '#FFFFFF', stock: 5000, unit: 'L', branchId: 'BR-004' },
  { code: 'CLR-006', name: 'Jet Black', category: 'Color', value: '#000000', stock: 5000, unit: 'L', branchId: 'BR-004' },
  { code: 'CLR-007', name: 'Tangerine Orange', category: 'Color', value: '#F28500', stock: 800, unit: 'L', branchId: 'BR-004' },
  { code: 'CLR-008', name: 'Navy Blue', category: 'Color', value: '#000080', stock: 1200, unit: 'L', branchId: 'BR-004' },
  { code: 'CLR-009', name: 'Charcoal Grey', category: 'Color', value: '#36454F', stock: 1500, unit: 'L', branchId: 'BR-004' },
  { code: 'CLR-010', name: 'Beige', category: 'Color', value: '#F5F5DC', stock: 2000, unit: 'L', branchId: 'BR-004' },

  // Woven Fabrics
  { code: 'WF-001', name: 'Poplin fabric', category: 'Woven Fabric', stock: 1500, unit: 'Yds', branchId: 'BR-003' },
  { code: 'WF-002', name: 'Oxford fabric', category: 'Woven Fabric', stock: 1200, unit: 'Yds', branchId: 'BR-003' },
  { code: 'WF-003', name: 'Rimi Cotton', category: 'Woven Fabric', stock: 900, unit: 'Yds', branchId: 'BR-003' },
  { code: 'WF-004', name: 'Stitch Twill', category: 'Woven Fabric', stock: 2000, unit: 'Yds', branchId: 'BR-003' },
  { code: 'WF-005', name: 'Non Stitch Twill', category: 'Woven Fabric', stock: 1800, unit: 'Yds', branchId: 'BR-003' },

  // Knit Fabrics
  { code: 'KF-001', name: 'Single Jersey', category: 'Knit Fabric', stock: 3000, unit: 'Yds', branchId: 'BR-003' },
  { code: 'KF-002', name: 'Lycra 5/9', category: 'Knit Fabric', stock: 1800, unit: 'Yds', branchId: 'BR-003' },
  { code: 'KF-003', name: 'Terry', category: 'Knit Fabric', stock: 2500, unit: 'Yds', branchId: 'BR-003' },
  { code: 'KF-004', name: 'Cross Terry', category: 'Knit Fabric', stock: 1200, unit: 'Yds', branchId: 'BR-003' },
  { code: 'KF-008', name: 'PK', category: 'Knit Fabric', stock: 2000, unit: 'Yds', branchId: 'BR-003' },

  // Yarns
  { code: 'YRN-G1', name: '20/1 Cotton - Grey', category: 'Yarn', stock: 500, unit: 'Kg', branchId: 'BR-003' },
  { code: 'YRN-G2', name: '24/1 Cotton - Grey', category: 'Yarn', stock: 550, unit: 'Kg', branchId: 'BR-003' },
  { code: 'YRN-G3', name: '26/1 Cotton - Grey', category: 'Yarn', stock: 600, unit: 'Kg', branchId: 'BR-003' },

  // Ribs
  { code: 'RB-001', name: '1x1 Rib', category: 'Rib', stock: 800, unit: 'Kg', branchId: 'BR-003' },
  { code: 'RB-002', name: '2x1 Rib', category: 'Rib', stock: 750, unit: 'Kg', branchId: 'BR-003' },

  // Trims
  { code: 'TRM-001', name: 'Sewing thread', category: 'Trims', stock: 50000, unit: 'Pc', branchId: 'BR-002' },
  { code: 'TRM-002', name: 'Care Label', category: 'Trims', stock: 20000, unit: 'Pc', branchId: 'BR-002' },
  { code: 'TRM-003', name: 'Size Label', category: 'Trims', stock: 20000, unit: 'Pc', branchId: 'BR-002' },
  { code: 'TRM-009', name: 'Button', category: 'Trims', stock: 25000, unit: 'Pc', branchId: 'BR-002' },

  // Accessories
  { code: 'ACC-001', name: 'Cartoon', category: 'Accessories', stock: 1000, unit: 'Pc', branchId: 'BR-002' },
  { code: 'ACC-002', name: 'Gum Tape', category: 'Accessories', stock: 500, unit: 'Pc', branchId: 'BR-002' },
];

export const orders: Order[] = [
  {
    id: '#ORD-001',
    buyer: 'H&M',
    style: "Men's Polo",
    quantity: 5000,
    orderDate: '2025-06-01',
    shipDate: '2025-08-15',
    managementStatus: 'Confirmed',
    description: 'Priority order, requires weekly updates.',
    productionStatus: 'Cutting',
    productionStatusColor: 'yellow',
    progress: 27,
    sampleProgress: { 'Sample Receive': 'completed', 'Supply from godown': 'pending' },
    costingHistory: [
      {
        revision: 1,
        date: '2025-06-02',
        style: "Men's Polo",
        quantity: 5000,
        item: 'POLO SHIRT',
        fabrics: [{ name: 'Main Fabric', qty: 1200, price: 5.5 }],
        trims: 2500,
        print: 1000,
        embroidery: 500,
        wash: 750,
        cm: 6000,
        commercial: 800,
        misc: 300,
        orderItemId: 1718100001
      }
    ],
    orderIntroduction: {
      merchandiser: "Mr. Rakib",
      orderNumber: "PO-H&M-5524",
      orderTitle: "Summer Collection Polo",
      orderDescription: "Standard polo shirt for summer collection",
      season: "Summer 2025",
      year: "2025",
      contactDate: "2025-05-15",
      startDate: "2025-06-01",
      expiryDate: "2025-08-15",
      consignee: "H&M Hennes & Mauritz AB, SE-106 38 Stockholm, Sweden",
      managementStatus: "Confirmed",
      negotiationPeriod: "15 Days",
      paymentTerms: "LC at Sight",
      paymentMode: "Bank Transfer",
      bankAccount: "ABC Bank, Account #12345",
      portOfLoading: "Chittagong, Bangladesh",
      portOfDischarge: "Hamburg, Germany",
      items: [
        {
          id: 1718100001,
          style: "Men's Polo",
          item: 'POLO SHIRT',
          fabricCategory: 'Knit Fabric',
          fabricName: 'KF-008',
          colors: ['CLR-008'],
          sizes: ['S', 'M', 'L', 'XL'],
          startDate: '2025-06-15',
          unitPrice: 8.5,
          shipmentDate: '2025-08-10',
          oqnty: 1000,
          breakdown: [
            { fabricColor: 'CLR-008', printColor: 'CLR-005', embColor: 'CLR-006', qnty: 0, S: 100, M: 200, L: 200, XL: 0, '2XL': 0 },
            { fabricColor: 'CLR-002', printColor: 'CLR-005', embColor: 'CLR-001', qnty: 0, S: 50, M: 150, L: 200, XL: 100, '2XL': 0 }
          ]
        },
        {
          id: 1718100002,
          style: "Men's Polo - V Neck",
          item: 'POLO SHIRT',
          fabricCategory: 'Knit Fabric',
          fabricName: 'KF-001',
          colors: ['CLR-006'],
          sizes: ['XS', 'S', 'M'],
          startDate: '2025-06-20',
          unitPrice: 8.75,
          shipmentDate: '2025-08-15',
          oqnty: 3000,
          breakdown: [
            { fabricColor: 'CLR-006', printColor: 'CLR-005', embColor: 'CLR-009', qnty: 0, XS: 0, S: 1000, M: 2000, L: 0, XL: 0, '2XL': 0, '3XL': 0, '4XL': 0 }
          ]
        }
      ]
    },
    programPlan: {
      initialStage: { 
        receiveFromBuyer: [], 
        approval: [],
        referenceItems: [],
        colorSwagItems: []
      },
      samplePlan: [],
      rbb: [],
      requisitionBudget: {},
      production: {
        Knitting: [
          {
            fabric: 'KF-001',
            qnty: '1250',
            yarn: 'YRN-G3',
            mDia: '34',
            gsm: '160',
            stitch: '26',
            factory: 'ABC Knitwear',
            startDate: '2025-06-15',
            endDate: '2025-06-19',
            followedBy: 'Quality Manager',
            executedBy: 'Sample Master',
            reportTo: 'Quality Manager'
          }
        ],
        Dyeing: []
      }
    },
    branchId: 'BR-002'
  },
  {
    id: '#ORD-002',
    buyer: 'Zara',
    style: "Women's Tee",
    quantity: 12000,
    orderDate: '2025-05-20',
    shipDate: '2025-07-30',
    managementStatus: 'Negotiation',
    description: '',
    productionStatus: 'Pending',
    productionStatusColor: 'gray',
    progress: 0,
    sampleProgress: { 'Sample Receive': 'completed', 'Supply from godown': 'completed' },
    costingHistory: [],
    orderIntroduction: { 
      expiryDate: "2025-07-30",
      consignee: "Zara España, S.A., Avenida de la Diputación, Edificio Inditex, 15143 Arteixo, A Coruña, Spain",
      items: [] 
    },
    programPlan: {
      initialStage: { 
        receiveFromBuyer: [], 
        approval: [],
        referenceItems: [],
        colorSwagItems: []
      },
      samplePlan: [],
      rbb: [],
      requisitionBudget: {},
      production: {}
    },
    branchId: 'BR-002'
  }
];

export const stockLedger: StockLedgerEntry[] = [
  {
    date: '2025-06-05T09:00:00Z',
    itemCode: 'BTN-003',
    itemName: 'Plastic Button - 15L',
    type: 'OUT',
    quantity: 150,
    remarks: 'Issued for #ORD-001',
    before: 1000,
    after: 850,
    branchId: 'BR-002'
  }
];

export const priceQuotations: PriceQuotation[] = [];

// Finance Data
export const financialTransactions: FinancialTransaction[] = [
  { id: 'FT-001', date: '2025-01-15', account: 'Cash', description: 'Order payment received', reference: 'ORD-001', debit: 50000, credit: 0, balance: 150000, branchId: 'BR-002' },
  { id: 'FT-002', date: '2025-01-14', account: 'Fabric Purchase', description: 'Cotton fabric purchase', reference: 'PUR-045', debit: 0, credit: 25000, balance: 100000, branchId: 'BR-003' },
  { id: 'FT-003', date: '2025-01-13', account: 'Salary Expense', description: 'Monthly salary payment', reference: 'SAL-001', debit: 0, credit: 35000, balance: 125000, branchId: 'BR-002' },
  { id: 'FT-004', date: '2025-01-12', account: 'Equipment', description: 'New sewing machine', reference: 'EQP-012', debit: 15000, credit: 0, balance: 160000, branchId: 'BR-002' },
  { id: 'FT-005', date: '2025-01-11', account: 'Printing Expense', description: 'Ink and materials', reference: 'PRT-001', debit: 0, credit: 12000, balance: 88000, branchId: 'BR-004' },
];

export const payableBills: PayableBill[] = [
  { id: 'PB-001', vendor: 'ABC Trims', invoice: 'INV-2025-001', date: '2025-01-10', dueDate: '2025-02-10', amount: 75000, status: 'Pending', branchId: 'BR-002' },
  { id: 'PB-002', vendor: 'XYZ Fabrics', invoice: 'INV-2025-002', date: '2025-01-08', dueDate: '2025-01-20', amount: 45000, status: 'Overdue', branchId: 'BR-003' },
  { id: 'PB-003', vendor: 'Cotton Mills Ltd', invoice: 'INV-2025-003', date: '2025-01-15', dueDate: '2025-02-15', amount: 125000, status: 'Pending', branchId: 'BR-003' },
  { id: 'PB-004', vendor: 'Print Solutions', invoice: 'INV-2025-004', date: '2025-01-12', dueDate: '2025-02-12', amount: 35000, status: 'Pending', branchId: 'BR-004' },
];

export const receivableInvoices: ReceivableInvoice[] = [
  { id: 'RI-001', customer: 'H&M', invoice: 'INV-OUT-001', order: '#ORD-001', date: '2025-01-10', dueDate: '2025-02-10', amount: 425000, status: 'Pending', branchId: 'BR-002' },
  { id: 'RI-002', customer: 'Zara', invoice: 'INV-OUT-002', order: '#ORD-002', date: '2025-01-05', dueDate: '2025-01-25', amount: 125000, status: 'Overdue', branchId: 'BR-002' },
  { id: 'RI-003', customer: 'H&M', invoice: 'INV-OUT-003', order: '#ORD-003', date: '2025-01-15', dueDate: '2025-02-15', amount: 325000, status: 'Paid', branchId: 'BR-002' },
];

export const orderCostingSummaries: OrderCostingSummary[] = [
  { orderId: '#ORD-001', buyer: 'H&M', style: "Men's Polo", quantity: 5000, unitCost: 6.50, totalCost: 32500, salePrice: 8.50, profit: 10000, branchId: 'BR-002' },
  { orderId: '#ORD-002', buyer: 'Zara', style: "Women's Tee", quantity: 12000, unitCost: 4.25, totalCost: 51000, salePrice: 5.75, profit: 18000, branchId: 'BR-002' },
];

export const cashBankTransactions: CashBankTransaction[] = [
  { id: 'CB-001', date: '2025-01-15', description: 'অর্ডার পেমেন্ট', type: 'জমা', amount: 50000, balance: 875000, branchId: 'BR-002' },
  { id: 'CB-002', date: '2025-01-14', description: 'কাপড় ক্রয়', type: 'উত্তোলন', amount: 25000, balance: 825000, branchId: 'BR-003' },
  { id: 'CB-003', date: '2025-01-13', description: 'বেতন প্রদান', type: 'উত্তোলন', amount: 35000, balance: 850000, branchId: 'BR-002' },
  { id: 'CB-004', date: '2025-01-12', description: 'প্রিন্টিং খরচ', type: 'উত্তোলন', amount: 12000, balance: 838000, branchId: 'BR-004' },
];

export const fixedAssets: FixedAsset[] = [
  { id: 'FA-001', name: 'Sewing Machine - Brother', category: 'Equipment', purchaseDate: '2024-01-15', cost: 45000, depreciation: 4500, bookValue: 40500, branchId: 'BR-002' },
  { id: 'FA-002', name: 'Cutting Table', category: 'Furniture', purchaseDate: '2024-03-10', cost: 15000, depreciation: 1000, bookValue: 14000, branchId: 'BR-002' },
  { id: 'FA-003', name: 'Industrial Iron', category: 'Equipment', purchaseDate: '2024-06-20', cost: 8000, depreciation: 400, bookValue: 7600, branchId: 'BR-002' },
  { id: 'FA-004', name: 'Knitting Machine', category: 'Equipment', purchaseDate: '2024-02-15', cost: 85000, depreciation: 8500, bookValue: 76500, branchId: 'BR-003' },
  { id: 'FA-005', name: 'Printing Press', category: 'Equipment', purchaseDate: '2024-04-10', cost: 120000, depreciation: 12000, bookValue: 108000, branchId: 'BR-004' },
];

export const payrollEntriesFinance: PayrollEntryFinance[] = [
  { id: 'PF-001', employeeId: 'EMP-0101', name: 'আবুল কালাম', position: 'Machine Operator', basic: 8000, allowance: 5500, deduction: 500, net: 13000, status: 'পেইড', branchId: 'BR-002' },
  { id: 'PF-002', employeeId: 'EMP-0256', name: 'ফাতিমা বেগম', position: 'Quality Inspector', basic: 12000, allowance: 7500, deduction: 500, net: 19000, status: 'পেন্ডিং', branchId: 'BR-002' },
  { id: 'PF-003', employeeId: 'EMP-0301', name: 'করিম উদ্দিন', position: 'Knitting Operator', basic: 10000, allowance: 6000, deduction: 500, net: 15500, status: 'পেইড', branchId: 'BR-003' },
  { id: 'PF-004', employeeId: 'EMP-0401', name: 'শাহিদ হাসান', position: 'Print Operator', basic: 11000, allowance: 6500, deduction: 500, net: 17000, status: 'পেইড', branchId: 'BR-004' },
];

// Production & Performance Data
export const productionLineStatuses: ProductionLineStatus[] = [
  { id: 'PLS-001', line: 'Line A', target: 300, actual: 285, efficiency: 95, status: 'Active', operator: 'Team Alpha', branchId: 'BR-002' },
  { id: 'PLS-002', line: 'Line B', target: 280, actual: 245, efficiency: 87.5, status: 'Active', operator: 'Team Beta', branchId: 'BR-002' },
  { id: 'PLS-003', line: 'Line C', target: 320, actual: 298, efficiency: 93.1, status: 'Active', operator: 'Team Gamma', branchId: 'BR-002' },
  { id: 'PLS-004', line: 'Line D', target: 290, actual: 0, efficiency: 0, status: 'Maintenance', operator: 'Team Delta', branchId: 'BR-002' },
  { id: 'PLS-005', line: 'Knit Line 1', target: 500, actual: 475, efficiency: 95, status: 'Active', operator: 'Knit Team A', branchId: 'BR-003' },
  { id: 'PLS-006', line: 'Print Line 1', target: 200, actual: 185, efficiency: 92.5, status: 'Active', operator: 'Print Team A', branchId: 'BR-004' },
];

export const hourlyProductionData: HourlyProductionData[] = [
  { id: 'HPD-001', hour: '8:00 AM', production: 180, target: 200, branchId: 'BR-002' },
  { id: 'HPD-002', hour: '9:00 AM', production: 195, target: 200, branchId: 'BR-002' },
  { id: 'HPD-003', hour: '10:00 AM', production: 210, target: 200, branchId: 'BR-002' },
  { id: 'HPD-004', hour: '11:00 AM', production: 185, target: 200, branchId: 'BR-002' },
  { id: 'HPD-005', hour: '12:00 PM', production: 0, target: 200, branchId: 'BR-002' }, // Lunch break
  { id: 'HPD-006', hour: '1:00 PM', production: 175, target: 200, branchId: 'BR-002' },
  { id: 'HPD-007', hour: '2:00 PM', production: 205, target: 200, branchId: 'BR-002' },
  { id: 'HPD-008', hour: '3:00 PM', production: 190, target: 200, branchId: 'BR-002' },
];

export const orderTrackingEntries: OrderTrackingEntry[] = [
  { id: 'OTE-001', orderId: '#ORD-001', buyer: 'H&M', style: "Men's Polo", quantity: 5000, progress: 75, stage: 'Sewing', delivery: '2025-02-15', status: 'On Track', branchId: 'BR-002' },
  { id: 'OTE-002', orderId: '#ORD-002', buyer: 'Zara', style: "Women's Tee", quantity: 12000, progress: 45, stage: 'Cutting', delivery: '2025-02-28', status: 'Delayed', branchId: 'BR-002' },
  { id: 'OTE-003', orderId: '#ORD-003', buyer: 'Uniqlo', style: 'Basic Tee', quantity: 8000, progress: 90, stage: 'Finishing', delivery: '2025-02-10', status: 'On Track', branchId: 'BR-002' },
];

export const linePerformanceSummaries: LinePerformanceSummary[] = [
  { id: 'LPS-001', line: 'Line A', efficiency: 95.2, target: 300, actual: 286, defects: 2, branchId: 'BR-002' },
  { id: 'LPS-002', line: 'Line B', efficiency: 87.5, target: 280, actual: 245, defects: 5, branchId: 'BR-002' },
  { id: 'LPS-003', line: 'Line C', efficiency: 93.1, target: 320, actual: 298, defects: 3, branchId: 'BR-002' },
  { id: 'LPS-004', line: 'Line D', efficiency: 0, target: 290, actual: 0, defects: 0, branchId: 'BR-002' },
  { id: 'LPS-005', line: 'Knit Line 1', efficiency: 95.0, target: 500, actual: 475, defects: 1, branchId: 'BR-003' },
];

export const weeklyEfficiencyTrend: WeeklyEfficiencyTrend[] = [
  { week: '2025-W22', branchId: 'BR-002', efficiency: 92.5 },
  { week: '2025-W23', branchId: 'BR-002', efficiency: 94.1 },
  { week: '2025-W24', branchId: 'BR-002', efficiency: 91.8 },
  { week: '2025-W22', branchId: 'BR-003', efficiency: 89.7 },
  { week: '2025-W23', branchId: 'BR-003', efficiency: 90.2 },
  { week: '2025-W24', branchId: 'BR-003', efficiency: 93.0 },
  { week: '2025-W22', branchId: 'BR-004', efficiency: 88.0 },
  { week: '2025-W23', branchId: 'BR-004', efficiency: 90.5 },
  { week: '2025-W24', branchId: 'BR-004', efficiency: 91.2 }
];

// --- Add missing exports for compatibility with all imports ---
export const sampleSteps = [];
export const productionSteps = [];
export const qualityInspections = [];
export const monthlyOrderVolumes = [];
export const shipmentSummaries = [];
export const productionEfficiencyReports = [];
export const orderStatusDistributions = [];
export { weeklyEfficiencyTrend as weeklyEfficiencyTrends };
export const vendors = [];
export const documents = [];
export const trainingSessions = [];