import { Buyer, Employee, Supplier, StockItem, Order, StockLedgerEntry, PriceQuotation, BuyingHouse } from '../types';

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];
export const BREAKDOWN_SIZES = ['6M','12M','18M','24M','30M','36M','2Y','4Y','6Y','8Y','10Y', '12Y','14Y','16Y','18Y','XS','S','M','L','XL','2XL','3XL','4XL'];
export const CATEGORIES = ['Woven Fabric', 'Knit Fabric', 'Yarn', 'Rib', 'Color', 'Trims', 'Accessories'];
export const UNITS = ['Yds', 'Kg', 'Pc', 'L'];
export const COSTING_ITEMS = ['T-SHIRT', 'POLO SHIRT', 'SHIRT', 'FROCK', 'LONG PANT', '¾ PANT', 'SHORT PANT', 'BOXER'];

export const buyingHouses: BuyingHouse[] = [
  { id: 'BH-001', name: 'Global Sourcing Ltd.', locationDist: 'Dhaka', grade: 'A+', contactPersonName: 'Mr. Rahman', phone: '+880-1700-000001' },
  { id: 'BH-002', name: 'Fashion Forward Inc.', locationDist: 'Chittagong', grade: 'A', contactPersonName: 'Ms. Sultana', phone: '+880-1800-000002' },
  { id: 'BH-003', name: 'Textile Solutions', locationDist: 'Gazipur', grade: 'B+', contactPersonName: 'Mr. Ahmed', phone: '+880-1900-000003' },
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
    buyingHouseId: 'BH-001'
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
    buyingHouseId: 'BH-002'
  },
];

export const employees: Employee[] = [
  { id: 'EMP-0101', name: 'Abul Kalam', designation: 'Machine Operator', department: 'Sewing', phone: '01700000001', email: 'abul@example.com', address: 'Mirpur, Dhaka', country: 'Bangladesh', joiningDate: '2023-01-15', salary: { basic: 8000, houseRent: 4000, medical: 1000, conveyance: 500, other: 0 } },
  { id: 'EMP-0256', name: 'Fatima Begum', designation: 'Quality Inspector', department: 'Quality', phone: '01800000002', email: 'fatima@example.com', address: 'Uttara, Dhaka', country: 'Bangladesh', joiningDate: '2022-11-20', salary: { basic: 12000, houseRent: 6000, medical: 1000, conveyance: 500, other: 500 } },
];

export const suppliers: Supplier[] = [
  { id: 'SUP-001', company: 'ABC Trims', contactPerson: 'Mr. Supplier', phone: '01900000003', email: 'contact@abc.com', country: 'Bangladesh', bank: { name: 'City Bank', account: '123456789', branch: 'Gulshan' }, productType: 'Buttons, Zippers' },
  { id: 'SUP-002', company: 'XYZ Fabrics', contactPerson: 'Ms. Fabrica', phone: '01600000004', email: 'sales@xyz.com', country: 'China', bank: { name: 'Bank of China', account: '987654321', branch: 'Shenzhen' }, productType: 'Knit & Woven Fabrics' },
];

export const stockItems: StockItem[] = [
  // Colors
  { code: 'CLR-001', name: 'Crimson Red', category: 'Color', value: '#DC143C', stock: 1000, unit: 'L' },
  { code: 'CLR-002', name: 'Royal Blue', category: 'Color', value: '#4169E1', stock: 1000, unit: 'L' },
  { code: 'CLR-003', name: 'Canary Yellow', category: 'Color', value: '#FFEF00', stock: 1000, unit: 'L' },
  { code: 'CLR-004', name: 'Forest Green', category: 'Color', value: '#228B22', stock: 1000, unit: 'L' },
  { code: 'CLR-005', name: 'Pure White', category: 'Color', value: '#FFFFFF', stock: 5000, unit: 'L' },
  { code: 'CLR-006', name: 'Jet Black', category: 'Color', value: '#000000', stock: 5000, unit: 'L' },
  { code: 'CLR-007', name: 'Tangerine Orange', category: 'Color', value: '#F28500', stock: 800, unit: 'L' },
  { code: 'CLR-008', name: 'Navy Blue', category: 'Color', value: '#000080', stock: 1200, unit: 'L' },
  { code: 'CLR-009', name: 'Charcoal Grey', category: 'Color', value: '#36454F', stock: 1500, unit: 'L' },
  { code: 'CLR-010', name: 'Beige', category: 'Color', value: '#F5F5DC', stock: 2000, unit: 'L' },

  // Woven Fabrics
  { code: 'WF-001', name: 'Poplin fabric', category: 'Woven Fabric', stock: 1500, unit: 'Yds' },
  { code: 'WF-002', name: 'Oxford fabric', category: 'Woven Fabric', stock: 1200, unit: 'Yds' },
  { code: 'WF-003', name: 'Rimi Cotton', category: 'Woven Fabric', stock: 900, unit: 'Yds' },
  { code: 'WF-004', name: 'Stitch Twill', category: 'Woven Fabric', stock: 2000, unit: 'Yds' },
  { code: 'WF-005', name: 'Non Stitch Twill', category: 'Woven Fabric', stock: 1800, unit: 'Yds' },

  // Knit Fabrics
  { code: 'KF-001', name: 'Single Jersey', category: 'Knit Fabric', stock: 3000, unit: 'Yds' },
  { code: 'KF-002', name: 'Lycra 5/9', category: 'Knit Fabric', stock: 1800, unit: 'Yds' },
  { code: 'KF-003', name: 'Terry', category: 'Knit Fabric', stock: 2500, unit: 'Yds' },
  { code: 'KF-004', name: 'Cross Terry', category: 'Knit Fabric', stock: 1200, unit: 'Yds' },
  { code: 'KF-008', name: 'PK', category: 'Knit Fabric', stock: 2000, unit: 'Yds' },

  // Yarns
  { code: 'YRN-G1', name: '20/1 Cotton - Grey', category: 'Yarn', stock: 500, unit: 'Kg' },
  { code: 'YRN-G2', name: '24/1 Cotton - Grey', category: 'Yarn', stock: 550, unit: 'Kg' },
  { code: 'YRN-G3', name: '26/1 Cotton - Grey', category: 'Yarn', stock: 600, unit: 'Kg' },

  // Ribs
  { code: 'RB-001', name: '1x1 Rib', category: 'Rib', stock: 800, unit: 'Kg' },
  { code: 'RB-002', name: '2x1 Rib', category: 'Rib', stock: 750, unit: 'Kg' },

  // Trims
  { code: 'TRM-001', name: 'Sewing thread', category: 'Trims', stock: 50000, unit: 'Pc' },
  { code: 'TRM-002', name: 'Care Label', category: 'Trims', stock: 20000, unit: 'Pc' },
  { code: 'TRM-003', name: 'Size Label', category: 'Trims', stock: 20000, unit: 'Pc' },
  { code: 'TRM-009', name: 'Button', category: 'Trims', stock: 25000, unit: 'Pc' },

  // Accessories
  { code: 'ACC-001', name: 'Cartoon', category: 'Accessories', stock: 1000, unit: 'Pc' },
  { code: 'ACC-002', name: 'Gum Tape', category: 'Accessories', stock: 500, unit: 'Pc' },
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
    }
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
    }
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
    after: 850
  }
];

export const priceQuotations: PriceQuotation[] = [];

export const trimsAndAccessoriesForApproval = [
  { code: 'TA-01', name: 'Lab Dip' },
  { code: 'TA-02', name: 'Print and Embroidery Strike-off' },
  { code: 'TA-03', name: 'Care Label' },
  { code: 'TA-04', name: 'Size Label' },
  { code: 'TA-05', name: 'Elastic' }
];

export const initialStageItems = ['Purchase Order', 'Original Sample', 'Measurement Sheet', 'Sales Contract', 'TT'];
export const sampleTypes = ['Fit Sample', 'SMS', 'PP Sample', 'Size Sample', 'Shipment Sample'];
export const managementStatuses = ['Negotiation', 'Confirmed', 'On Hold', 'Cancelled'];
export const personnel = ['Quality Manager', 'Sample Master', 'Pattern Master'];

export const sampleSteps = [
  { key: 'Sample Receive', icon: 'Package' },
  { key: 'Supply from godown', icon: 'Truck' }
];

export const productionSteps = [
  { key: 'Knitting', icon: 'Cpu' },
  { key: 'Dyeing', icon: 'Droplets' },
  { key: 'Cutting', icon: 'Scissors' },
  { key: 'Print', icon: 'Printer' },
  { key: 'Embroidery', icon: 'PenTool' },
  { key: 'Import', icon: 'Plane' },
  { key: 'Sewing', icon: 'Shirt' },
  { key: 'Wash', icon: 'Waves' },
  { key: 'Finishing', icon: 'CheckCheck' },
  { key: 'Packing', icon: 'Package' },
  { key: 'Shipment', icon: 'Ship' }
];