import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { rootReducersType } from "../../Interfaces/Interfaces";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import { bookingData } from "../../Interfaces/Interfaces";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

export default function BookedPackages() {
  const traveler = useSelector((state: rootReducersType) => state.traveler);
  const [bookings, setBookings] = useState<bookingData[]>([]);
  // const navigate = useNavigate();

  useEffect(() => {
    async function fetchBookings() {
      const response = await TravelerAPIs.booked_packages(
        traveler?.traveler._id as string
      );

      if (response?.data.status) {
        setBookings(response.data.bookings);
      }

      // if (bookings.length === 0) {
      //   toast.error("You didn't book any packages..");
      //   navigate("/packages");
      // }
    }
    fetchBookings();
  }, []);
  return (
    <>
      <div className=" flex-wrap p-10">
        {bookings &&
          bookings.map((data, index) => (
            <div
              key={index}
              className="p-8 mb-2 text-black flex justify-between w-full bg-gray-300 h-full shadow-2xl rounded"
            >
              <div>
                <h1 className="text-2xl font-bold font-mono">
                  {data?.packageName}
                </h1>
                <p>Total {data.travelers.length} Travelers</p>
                <div className="flex">
                  {data.travelers.map((traveler, index) => (
                    <p key={index}> {traveler.name} &nbsp;</p>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-3xl font-bold">₹ {data.totalPrice}.00 &nbsp;<span className="text-green-500 font-semibold text-xl">Paid <i className="fa-regular fa-circle-check"/></span> </p>
                <br />
                <button className="text-lg btn btn-wide bg-[#092635] text-[#9EC8B9] hover:bg-[#9EC8B9] hover:text-[#092635] border-none">
                  CANCEL BOOKING
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
