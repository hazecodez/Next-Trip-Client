import { useState } from "react";
import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Traveler/Navbar";
import "./Css/Flights.css";
import AmdeusAPI from "../../Utils/Traveler/AmdeusAPI";
import { HashLoader } from "react-spinners";

export default function Flights() {
  const [dep, setDep] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [showlists, setShowLists] = useState(false);
  const [load, setLoad] = useState(false);
  const [flights, setFlights] = useState([]);

  async function handleSearch() {
    try {
      setLoad(true);
      const token = await AmdeusAPI.getToken();
      const origin = await AmdeusAPI.getIATACode(dep, token);
      const destination = await AmdeusAPI.getIATACode(arrival, token);
      const response = await AmdeusAPI.getFlightOffers(
        token,
        origin,
        destination,
        date
      );
      if (response) {
        setFlights(response);
        setShowLists(true);
        setLoad(false);
        console.log(response);
        
      } else {
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
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
            <input
              placeholder="From"
              type="text"
              name="departure"
              className="search-input"
              value={dep}
              onChange={(e) => setDep(e.target.value)}
            />
            <input
              placeholder="To"
              type="text"
              name="arrival"
              className="search-input"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
            />
            <input
              placeholder="Departure Date"
              type="date"
              name="date"
              className="search-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <button onClick={handleSearch} className="btn btn-wide btn-lg">
              Search
            </button>
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
              Flights From {dep} to {arrival}
            </h1>
          </div>
        )}

        <div className="flex flex-wrap gap-10 pt-10 justify-center">
          {showlists &&
            flights?.map((data, index: number) => (
              <>
                <div className="hotel_card" key={index}>
                  <div className="flex items-end">
                  <h3 className="hotel_card__title ">₹{data.price.grandTotal}</h3>
                  </div>
                  <p className="hotel_card__content">{`Depart ${data.itineraries[0].segments[0].departure.at}  ${data.itineraries[0].segments[0].departure.iataCode}`} </p>
                  <p className="hotel_card__content">{`Arrival ${data.itineraries[0].segments[0].arrival.at}  ${data.itineraries[0].segments[0].arrival.iataCode}`} </p>
                  <p className="hotel_card__content">{`Duration  ${data.itineraries[0].segments[0].duration}`} </p>
                  <p className="hotel_card__content">{`Last Ticketing Date  ${data.lastTicketingDate}`} </p>
                  {/* <div className="hotel_card__date">
                    Click here see the location in map 👉
                  </div> */}
                 
                </div>
              </>
            ))}
        </div>
      </div>

      <Footer who="traveler" />
    </>
  );
}
