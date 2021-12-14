import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BussinessListPage from "./pages/BussinessListPage";
import Bussiness from "./pages/Bussiness";
import BussinessManagement from "./pages/BussinessManagement";
import Dashboard from './pages/Dashboard';
import TestImage from "./pages/TestImage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/bussinesses' element={<BussinessListPage/>} />
        <Route path='/bussinesses/biz' element={<Bussiness/>} />
        <Route path='/bussinesses-management' element={<BussinessManagement/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/test' element={<TestImage/>} />
      </Routes>
    </Router>
  );
}

export default App;
