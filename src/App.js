import { Route, Routes } from "react-router-dom";
import Category from "./Pages/Category/Category";
import Coupons from "./Pages/Coupons/Coupons";
import Customers from "./Pages/Customers/Customers";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Menu from "./Pages/Menu/Menu";
import NotFound from "./Pages/NotFound/NotFound";
import Orders from "./Pages/Orders/Orders";
import Products from "./Pages/Products/Products";
import Setting from "./Pages/Setting/Setting";
import Staff from "./Pages/Staff/Staff";
import Footer from "./Shared/Footer/Footer";
import Header from "./Shared/Header/Header";



function App() {
  return (
    <div>
      <Header></Header>
      <div className="grid md:grid-cols-2">
        <div className="md:block hidden">
          <Menu></Menu>
        </div>
        <div>
          <Routes>
            <Route path='/' element={<Dashboard></Dashboard>}></Route>
            <Route path='/products' element={<Products></Products>}></Route>
            <Route path='/category' element={<Category></Category>}></Route>
            <Route path='/customers' element={<Customers></Customers>}></Route>
            <Route path='/orders' element={<Orders></Orders>}></Route>
            <Route path='/coupons' element={<Coupons></Coupons>}></Route>
            <Route path='/staff' element={<Staff></Staff>}></Route>
            <Route path='/setting' element={<Setting></Setting>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default App;
