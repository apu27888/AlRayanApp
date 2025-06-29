import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { ToastProvider } from './hooks/useToast';

// Pages
import Dashboard from './pages/Dashboard';
import Buyers from './pages/Buyers';
import Orders from './pages/Orders';
import OrderIntroduction from './pages/OrderIntroduction';
import People from './pages/People';
import ProgramPlan from './pages/ProgramPlan';
import Execution from './pages/Execution';
import OrderProgress from './pages/OrderProgress';
import Stock from './pages/Stock';
import StockLedger from './pages/StockLedger';
import Reporting from './pages/Reporting';
import Statement from './pages/Statement';
import Requisition from './pages/Requisition';
import Finance from './pages/Finance';
import ProductionPerformance from './pages/ProductionPerformance';
import HRM from './pages/HRM';
import Extra from './pages/Extra';
import ExtraInventory from './pages/ExtraInventory';
import FinancialStatement from './pages/FinancialStatement';
import Attendance from './pages/Attendance';
import DataStock from './pages/DataStock';

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-gray-100" style={{ fontFamily: 'Inter, sans-serif' }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="buyers" element={<Buyers />} />
              <Route path="orders" element={<Orders />} />
              <Route path="order-introduction" element={<OrderIntroduction />} />
              <Route path="people" element={<People />} />
              <Route path="program-plan" element={<ProgramPlan />} />
              <Route path="execution" element={<Execution />} />
              <Route path="order-progress" element={<OrderProgress />} />
              <Route path="stock" element={<Stock />} />
              <Route path="stock-ledger" element={<StockLedger />} />
              <Route path="reporting" element={<Reporting />} />
              <Route path="statement" element={<Statement />} />
              <Route path="requisition" element={<Requisition />} />
              <Route path="finance" element={<Finance />} />
              <Route path="production-performance" element={<ProductionPerformance />} />
              <Route path="hrm" element={<HRM />} />
              <Route path="extra" element={<Extra />} />
              <Route path="extra-inventory" element={<ExtraInventory />} />
              <Route path="financial-statement" element={<FinancialStatement />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="data-stock" element={<DataStock />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;