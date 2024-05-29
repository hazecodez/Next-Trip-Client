import Navbar from "../../Components/Host/Navbar";
import Footer from "../../Components/Common/Footer";
import Dashboard from "../../Components/Host/Dashboard";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <Dashboard />
      <Footer who="host" />
    </>
  );
}
