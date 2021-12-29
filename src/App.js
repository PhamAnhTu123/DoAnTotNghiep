import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BussinessListPage from "./pages/BussinessListPage";
import Bussiness from "./pages/Bussiness";
import BussinessManagement from "./pages/BussinessManagement";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBussiness from "./pages/AdminBussiness";
import AdminBussinessDetail from './pages/AdminBussinessDetail';
import TestImage from "./pages/TestImage";
import BussinessSignIn from "./pages/BussinessSignIn";
import AdminLogin from "./pages/AdminLogin";
import ServiceManagement from "./pages/ServiceManagement";


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/bussinesses/:category' element={<BussinessListPage/>} />
        <Route path='/bussinesses/:category/:id' element={<Bussiness/>} />
        <Route path='/owners' element={<OwnerDashboard/>} />
        <Route path='/owners/bussinesses-management' element={<BussinessManagement/>} />
        <Route path='/owners/services-management' element={<ServiceManagement/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='bussiness/login' element={<BussinessSignIn/>} />
        <Route path='admin/login' element={<AdminLogin/>} />
        <Route path='/dashboard' element={<AdminDashboard/>} />
        <Route path='/dashboard/bussinesses' element={<AdminBussiness/>} />
        <Route path='/dashboard/bussinesses/:id' element={<AdminBussinessDetail/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/test' element={<TestImage/>} />
      </Routes>
    </Router>
  );
}

export default App;
