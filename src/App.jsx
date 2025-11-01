import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Medicines from "./pages/Medicines";
import Sales from "./pages/Sales";
import Suppliers from "./pages/Suppliers";
import Customers from "./pages/Customers";
import Purchases from "./pages/Purchases";
import Reports from "./pages/Reports";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
