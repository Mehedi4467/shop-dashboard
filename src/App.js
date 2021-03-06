import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Category from "./Pages/Category/Category";
import Coupons from "./Pages/Coupons/Coupons";
import Customers from "./Pages/Customers/Customers";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Menu from "./Pages/Menu/Menu";
import NotFound from "./Pages/NotFound/NotFound";
import Orders from "./Pages/Orders/Orders";
import Products from "./Pages/Products/Products";
import Registration from "./Pages/Registration/Registration";
import Setting from "./Pages/Setting/Setting";
import Staff from "./Pages/Staff/Staff";
import RequireAuth from "./RequireAuth/RequireAuth";
import Footer from "./Shared/Footer/Footer";
import Header from "./Shared/Header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAdmin from "./Hooks/RequireAdmin/RequireAdmin";
import Profile from "./Pages/Profile/Profile";
import AddProduct from "./Pages/Products/AddProduct";
import Account from "./Pages/Account/Account";
import ResetPassword from "./Pages/Login/ResetPassword";
import ContactUs from "./Pages/ContactUs/ContactUs";

function App() {
  const [showHide, setShowHide] = useState(false);
  return (
    <div>
      <div className="sticky top-0 bg-white zIndex-1">
        <Header showHide={showHide} setShowHide={setShowHide}></Header>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className={`md:block  col-span-1 ${showHide ? 'block' : 'hidden'}`}>
          <Menu ></Menu>
        </div>
        <div className="p-10 col-span-4 bg-[#F9FAFB]">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/contact" element={<ContactUs></ContactUs>}></Route>
            <Route path="/resetpassword" element={<ResetPassword></ResetPassword>}></Route>
            <Route path="/registration" element={<Registration></Registration>}></Route>
            <Route path='/' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}></Route>
            <Route path='/profile' element={<RequireAuth><Profile></Profile></RequireAuth>}></Route>
            <Route path='/products' element={<RequireAuth><Products></Products></RequireAuth>}></Route>
            <Route path='/category' element={<RequireAuth><RequireAdmin><Category></Category></RequireAdmin></RequireAuth>}></Route>
            <Route path='/customers' element={<RequireAuth><RequireAdmin><Customers></Customers></RequireAdmin></RequireAuth>}></Route>
            <Route path='/orders' element={<RequireAuth><Orders></Orders></RequireAuth>}></Route>
            <Route path='/coupons' element={<RequireAuth><Coupons></Coupons></RequireAuth>}></Route>
            <Route path='/staff' element={<RequireAuth><RequireAdmin><Staff></Staff></RequireAdmin></RequireAuth>}></Route>
            <Route path='/addProduct' element={<RequireAuth><AddProduct></AddProduct></RequireAuth>}></Route>
            <Route path='/account' element={<RequireAuth><Account></Account></RequireAuth>}></Route>
            <Route path='/setting' element={<RequireAuth><RequireAdmin><Setting></Setting></RequireAdmin></RequireAuth>}></Route>
            <Route path="*" element={<RequireAuth><NotFound></NotFound></RequireAuth>}></Route>
          </Routes>
        </div>
      </div>

      <ToastContainer />
      <Footer></Footer>
    </div>
  );
}

export default App;
