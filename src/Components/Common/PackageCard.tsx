import { useEffect, useState } from "react";
import HostAPIs from "../../APIs/HostAPIs";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import { useNavigate } from "react-router-dom";
import Package from "../../Interfaces/common/Package";

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const date: Date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

export default function PackageCard({ who }: { who: "traveler" | "host" }) {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    async function fetchPackages() {
      try {
        if (who === "host") {
          const response = await HostAPIs.package_list();
          
          
          if (response?.data.packageList) {
            setPackages(response.data.packageList);
          }
        } else if (who === "traveler") {
          const response = await TravelerAPIs.package_list();
          
          if (response?.data.status) {
            setPackages(response.data.packages);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPackages();
  }, []);
  return (
    <div className="flex flex-wrap items-center justify-evenly bg-[#F2F2F2] py-10 px-12 ">
      {packages.map((data: Package, index) => (
        <div className="card-wrapper mb-4 text-end" key={index}>
          <div
            className={`card  glass w-80 h-80 ${
              who === "host" ? "bg-[#f2ceb3]" : "bg-[#D9D9D9]"
            }  `}
          >
            <figure>
              <img
                className="w-full"
                key={index}
                src={`https://res.cloudinary.com/doac4pi2c/image/upload/${data?.images[0]}`}
                alt="car!"
              />
            </figure>
            <div className="card-body" key={index}>
              <h2
                onClick={() => {
                  who === "traveler"
                    ? navigate(`/package_details/${data._id}`)
                    : navigate(`/host/package_details/${data._id}`);
                }}
                className="card-title text-black"
              >
                {data.name}
              </h2>
              <p className="text-black">{data.destination}</p>
              <p className="text-black">
                {formatDate(data.dur_start)} to {formatDate(data.dur_end)}
              </p>
              <p className="text-black">{data.itinerary}</p>
              <p className="text-black font-bold text-end"> ₹ {data.price}</p>
              <div className="card-actions items-center"></div>
              {who === "host" ? (
                <button
                  onClick={() => navigate(`/host/edit_package/${data._id}`)}
                  className="btn bg-[#C63D2F] border-none text-[#FFBB5C] hover:bg-[#FFBB5C] hover:text-[#C63D2F]"
                >
                  Edit Package
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
