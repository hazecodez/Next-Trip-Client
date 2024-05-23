import Navbar from "../../Components/Host/Navbar";
import Footer from "../../Components/Common/Footer";
import Schedules from "../../Components/Host/Schedules";

export default function SchedulesPage() {
  return (
    <>
      <Navbar />
      <div className=" bg-white p-10 ">
        <Schedules />
      </div>

      <Footer who="host" />
    </>
  );
}
