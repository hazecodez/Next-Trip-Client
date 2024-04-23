import { useEffect, useState } from "react";
import HostAPIs from "../../APIs/HostAPIs";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import { useNavigate } from "react-router-dom";
import Package from "../../Interfaces/common/Package";

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
    <div className="flex flex-wrap items-center justify-evenly bg-[#F2F2F2] py-10 px-12 grid grid-cols-4">
      {packages.map((data: Package, index) => (
        <div className="card-wrapper mb-4 " key={index}>
          {
            who === "host" ? <button
            onClick={() => navigate(`/host/edit_package/${data._id}`)}
            className="btn"
          >
            hel
          </button> : ""
          }
          <div
            className={`card  glass w-80 h-80 ${
              who === "host" ? "bg-[#f2ceb3]" : "bg-[#D9D9D9]"
            }  `}
          >
            <figure>
              <img
                className="w-full"
                key={index}
                src={`https://res.cloudinary.com/doac4pi2c/image/upload/${data.images[0]}`}
                alt="car!"
              />
            </figure>
            <div className="card-body" key={index}>
              <h2 className="card-title text-black">{data.name}</h2>
              <p className="text-black">How to park your car at your garage?</p>
              <div className="card-actions items-center"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
