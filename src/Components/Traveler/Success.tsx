import { useNavigate, useParams } from "react-router-dom";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import { useEffect, useState } from "react";
import Package from "../../Interfaces/common/Package";

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date: Date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};
export default function Success() {
  const navigate = useNavigate();
  const [details, setDetails] = useState<Package>();
  const { id } = useParams();
  async function fetchPackageDetails() {
    const response = await TravelerAPIs.package_details(id as string);
    if (response?.data) {
      setDetails(response?.data);
    }
  }
  useEffect(() => {
    fetchPackageDetails();
  }, []);

  return (
    <div className="h-screen w-full bg-[#c8c2c2]">
      <div className="flex flex-wrap items-center justify-center">
        <img src="../Traveler/successLogo.png" className="w-40 pt-32" />
        <p className="text-3xl font-bold text-[#092635] lg:pt-32 text-center">
          Congratulations! You're Successfully Booked {details?.name} Package<br />
          and you're all set to soar to new adventures! <br />
          <br />
          <span>
            Get Ready to visit {details?.destination} on{" "}
            {formatDate(details?.dur_start as string)}
          </span>
          <br /> Bon voyage!{" "}
        </p>
      </div>
      <div className="flex justify-center items-center pt-28">
        <button
          onClick={() => navigate("/bookings")}
          className="btn btn-wide rounded-full text-[#c8c2c2] text-xl bg-[#092635] hover:bg-[#c8c2c2] hover:text-[#092635]"
        >
          BOOKINGS
        </button>
      </div>
    </div>
  );
}
