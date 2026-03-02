import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import AuthLayout from "./Layout/AuthLayout";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Report from "./pages/ReportItem";
import LostItem from "./pages/LostItems";
// import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>

      {/* Auth Routes (Full Page, No Navbar) */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
      </Route>

      {/* Main Website Routes (With Navbar + Footer) */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/lostitem" element={<LostItem />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Route>

    </Routes>
  );
}

export default App;