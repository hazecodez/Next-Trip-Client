import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TravelerRoute from "./Routes/TravelerRoute";
import HostRouter from "./Routes/HostRouter";
import AdminRoute from "./Routes/AdminRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<TravelerRoute />} />
        <Route path="/host/*" element={<HostRouter />} />
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>
    </Router>
  );
}
