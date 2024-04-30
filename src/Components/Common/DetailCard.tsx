import { useNavigate, useParams } from "react-router-dom";
import HostAPIs from "../../APIs/HostAPIs";
import { useEffect, useState } from "react";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import Package from "../../Interfaces/common/Package";

export default function DetailCard({ who }: { who: "Traveler" | "Host" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [details, setDetails] = useState<Package>();
  // const [chatBox, setChatBox] = useState(false);
  // const [conversationId, setConversationId] = useState("");

  const handleConversation = async () => {
    // setChatBox(true);
    const response = await TravelerAPIs.new_conversation(
      details?.host as string
    );
    // console.log(response);
    localStorage.setItem("conversationId", response?.data.data._id);
    // setConversationId(response?.data.data._id);
    navigate("/chat");
  };

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
              <>
                <div
                  onClick={handleConversation}
                  className={`bg-[#1B4242] text-white border-l-2 
                border-t-2 hover:shadow-inner 
                hover:bg-[#215252] font-bold  
                w-auto rounded-l-xl h-14 flex 
                justify-center items-center`}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <i className="fa-solid fa-comments text-3xl" />{" "}
                  &nbsp;&nbsp;&nbsp;
                  <h1>Chat With Host</h1>
                  &nbsp;
                </div>
              </>
            ) : (
              <div className="px-28">
                <button
                  onClick={() => navigate(`/host/edit_package/${details?._id}`)}
                  className="btn bg-[#C63D2F] border-none text-[#FFBB5C] rounded-full hover:bg-[#FFBB5C] hover:text-[#C63D2F]"
                >
                  <i className="fa-solid fa-pen-to-square text-xl" />
                </button>
              </div>
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
      <div className="bg-[#c8c2c2] flex   shadow-2xl ">
        <div
          className={` w-full my-10 h-full lg:mx-28 sm:mx-2 md:mx-5 shadow-2xl rounded-md`}
        >
          {who === "Host" && (
            <>
              <div className="w-full bg-gray-100 h-full mt-2 rounded">
                <div className="w-full h-16 flex justify-center items-center text-2xl text-black bg-[#FF9B50]">
                  <h1>Travelers Details</h1>
                </div>
                <div className="p-8 text-black"></div>
              </div>
            </>
          )}
          <div className="w-full bg-gray-300 h-full rounded">
            <div className="p-8 text-black">
              <p>
                <i className="fa-solid fa-plane-departure  text-xl" /> &nbsp;
                &nbsp; Departure In {details?.depa_airport} on{" "}
                {details?.depa_time}{" "}
              </p>

              <br />
              <p>
                <i className="fa-solid fa-plane-arrival text-xl"></i>&nbsp;
                &nbsp; Arrival In {details?.arrival_airport} on{" "}
                {details?.arrival_time}
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-100 h-full mt-2 rounded">
            <div
              className={`w-full h-16 flex justify-center items-center text-2xl text-black ${
                who === "Traveler" ? "bg-[#5C8374]" : "bg-[#FF9B50]"
              } `}
            >
              <h1>Accomodations</h1>
            </div>
            <div className="p-8 text-black">
              <p>
                <i className="fa-solid fa-hotel text-xl" /> &nbsp; &nbsp; Stay
                at {details?.stay}{" "}
              </p>

              <br />
              <p>
                <i className="fa-solid fa-bed text-xl" />
                &nbsp; &nbsp; Room Type is {details?.room_type}{" "}
              </p>
              <br />
              <p>
                <i className="fa-solid fa-wifi text-xl" /> &nbsp;&nbsp;
                Amenities are {details?.amenities}
              </p>
              <br />
              <p>
                <i className="fa-solid fa-bell-concierge text-xl" />
                &nbsp;&nbsp; Provided Foods are {details?.food}
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-300 h-full mt-2 rounded">
            <div className="p-8 text-black">
              <p>
                <i className="fa-solid fa-person-swimming text-xl" /> &nbsp;
                &nbsp; Activities are {details?.activities}{" "}
              </p>

              <br />
              <p>
                <i className="fa-solid fa-clipboard-list text-xl" />
                &nbsp; &nbsp; {details?.itinerary}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {who === "Traveler" ? (
        <div className="w-full h-full rounded-md flex justify-center pb-10 bg-[#c8c2c2]">
          <div className="w-full flex rounded-md flex-wrap justify-between h-full mx-28 bg-gray-100 ">
            <div>
              <p className="px-5 py-5">
                <span className="font-bold text-black text-2xl">
                  {" "}
                  ₹ {details?.price}
                </span>{" "}
                per person*
              </p>
            </div>
            <div className="m-4">
              <button className="btn btn-wide bg-[#092635] hover:bg-[#5C8374] border-none hover:text-[#092635] rounded-full text-base font-bold text-white">
                PROCEED TO BOOK PACKAGE
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
