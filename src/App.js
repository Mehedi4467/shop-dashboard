import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import NotFound from "./Pages/NotFound/NotFound";
import Footer from "./Shared/Footer/Footer";
import Header from "./Shared/Header/Header";



function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Dashboard></Dashboard>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
