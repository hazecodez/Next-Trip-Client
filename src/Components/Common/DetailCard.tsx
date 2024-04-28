import { useNavigate, useParams } from "react-router-dom";
import HostAPIs from "../../APIs/HostAPIs";
import { useEffect, useState } from "react";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import Package from "../../Interfaces/common/Package";

export default function DetailCard({ who }: { who: "Traveler" | "Host" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [details, setDetails] = useState<Package>();

  async function fetchDetails() {
    try {
      if (who === "Traveler") {
        const response = await TravelerAPIs.package_details(id as string);
        setDetails(response?.data);
      } else {
        const response = await HostAPIs.package_details(id as string);
        setDetails(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <div
        className={`text-sm breadcrumbs sticky top-16 z-10 ${
          who === "Host" ? "bg-[#E25E3E] text-[#FF9B50]" : "bg-[#1B4242]"
        }  px-8`}
      >
        <ul>
          <li>
            <a
              onClick={() =>
                who === "Host"
                  ? navigate("/host/my_packages")
                  : navigate("/packages")
              }
            >
              Home
            </a>
          </li>

          <li>{details?.name}</li>
        </ul>
      </div>

      <div className="bg-white w-auto h-auto shadow-2xl">
        <div>
          <h1 className="text-black font-bold text-3xl px-16 pt-5">
            {details?.name}
          </h1>

          <div className="flex justify-between">
            <p className="px-16 text-lg text-gray-700">
              {" "}
              {details?.dur_start} - {details?.dur_end}
            </p>
            {who === "Traveler" ? (
              <div
                onClick={() => navigate("/chat")}
                className={`bg-[#1B4242] text-white border-l-2 border-t-2 hover:shadow-inner hover:bg-[#215252] font-bold  w-auto rounded-l-xl h-14 flex justify-center items-center`}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;
                <i className="fa-solid fa-comments text-3xl" />{" "}
                &nbsp;&nbsp;&nbsp;
                <h1>Chat With Host</h1>
                &nbsp;
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="carousel carousel-end rounded-box my-3 mx-16">
          <div className="carousel-item w-full h-72">
            {details?.images &&
              Object.entries(details?.images).map(([key, value]) => (
                <img
                  key={key}
                  src={`https://res.cloudinary.com/doac4pi2c/image/upload/${value}`}
                  alt={`Preview ${key + 1}`}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="bg-[#c8c2c2] flex justify-evenly shadow-2xl">
        <div className="bg-white my-5 mx-5 shadow-2xl">
          <h1>ojgdhdfhgd</h1>
        </div>
        <div className="bg-white my-5 mx-5 shadow-2xl">
          <h1>ojgdhdfhgd</h1>
        </div>
      </div>
    </>
  );
}
