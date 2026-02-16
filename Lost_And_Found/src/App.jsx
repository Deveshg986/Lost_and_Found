import { Routes, Route } from "react-router-dom"
import MainLayout from "./Layout/MainLayout"

import Home from "./pages/Home"
import ReportItem from "./pages/ReportItem"
import ClaimItem from "./pages/ClaimItem"
import NotFound from "./pages/NotFound"
import LostItems from "./pages/LostItems"

// import NotFound from "./pages/NotFound"
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="report" element={<ReportItem />} />
        <Route path="claim" element={<ClaimItem />} />
        <Route path="/lostitem" element={<LostItems />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
