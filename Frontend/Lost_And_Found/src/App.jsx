import { Routes, Route } from "react-router-dom";
import React from "react";
import MainLayout from "./Layout/MainLayout";
import AuthLayout from "./Layout/AuthLayout";
import { Login,  Home,  Report,  Signup,  Requests, MyPosts, Claims} from "./pages"

// import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      {/* Auth Routes (Full Page, No Navbar) */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      {/* Main Website Routes (With Navbar + Footer) */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/claim-requests" element={<Claims />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
