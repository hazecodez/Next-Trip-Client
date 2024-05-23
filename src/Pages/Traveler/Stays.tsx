import { useState } from "react";
import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Traveler/Navbar";
import axios from "axios";
import "./Css/Stays.css";
import { HashLoader } from "react-spinners";
import AmdeusAPI from "../../Utils/Traveler/AmdeusAPI";

//--fetching hotels list based on specified city with accesstoken
const fetchHotels = async (iataCode: string, token: string) => {
  const url =
    "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city";
  const params = {
    cityCode: iataCode,
    radius: 5,
    radiusUnit: "KM",
    hotelSource: "ALL",
  };

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error making API request:", error);
  }
};

const openMap = (latitude: string, longitude: string) => {
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  window.open(googleMapsUrl, "_blank");
};

export default function Stays() {
  const [search, setSearch] = useState("");
  const [hotels, setHotels] = useState([]);
  const [showlists, setShowLists] = useState(false);
  const [load, setLoad] = useState(false);

  async function searchHotel(city: string) {
    try {
      setLoad(true);
      const token = await AmdeusAPI.getToken();
      const iataCode = await AmdeusAPI.getIATACode(city, token);
      if (iataCode) {
        const hotelsList = await fetchHotels(iataCode, token);
        setHotels(hotelsList);
        setShowLists(true);
        setLoad(false);
        console.log(hotelsList[0]);
      } else {
        console.error("IATA code not found for the given city.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
      <Navbar />
      <div className="bg-[#5C8374] p-5">
        <div className="w-full relative">
          <img
            className="w-full h-80 object-cover rounded-lg"
            src="https://png.pngtree.com/thumb_back/fh260/background/20220427/pngtree-cheap-tickets-for-air-transportation-image_1091593.jpg"
            alt=""
          />

          <div className="absolute inset-0 bg-[#092635] bg-opacity-90 flex flex-wrap items-center justify-center rounded-lg space-x-4 p-4">
            <div className="flex relative w-full max-w-md mx-auto gap-2">
              <i className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 fa-solid fa-magnifying-glass text-gray-400" />
              <input
                className="input w-full h-14 rounded-full pl-10 pr-12 py-3 border-2 bg-[#d5cece] border-transparent focus:outline-none focus:border-blue-500 placeholder-black transition-all duration-300 shadow-md"
                placeholder="Search City Name Here..."
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              {/* <button
                onClick={() => {
                  setShowLists(false), setSearch("");
                }}
                type="reset"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                <i className="fa-solid fa-xmark" />
              </button> */}
              <div>
                <button
                  className="bg-[#5C8374] text-[#092635] font-bold h-14 w-24 rounded-full"
                  onClick={() => {
                    if (search) searchHotel(search);
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        {load && (
          <div className="loader-container">
            <HashLoader color="#5C8374" size={80} />
          </div>
        )}

        {showlists && (
          <div className="flex justify-center mt-5 h-10 items-center bg-[#a7dbc7] rounded-full">
            <h1 className="text-2xl font-bold text-black">
              Showing {hotels.length} Hotels in {search}
            </h1>
          </div>
        )}

        <div className="flex flex-wrap gap-10 pt-10 justify-center">
          {showlists &&
            hotels?.map((data, index: number) => (
              <>
                <div className="hotel_card" key={index}>
                  <h3 className="hotel_card__title">{data?.name}</h3>
                  <p className="hotel_card__content">
                    {`${search} , ${data.address.countryCode} `}{" "}
                  </p>
                  <p className="hotel_card__content">
                    {`Distance ${data.distance.value} ${data.distance.unit} `}{" "}
                  </p>
                  <div className="hotel_card__date">
                    Click here see the location in map 👉
                  </div>
                  <div className="hotel_card__arrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      height="15"
                      width="15"
                      onClick={() =>
                        openMap(data?.geoCode.latitude, data?.geoCode.longitude)
                      }
                    >
                      <path
                        fill="#fff"
                        d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
      <Footer who="traveler" />
    </>
  );
}
