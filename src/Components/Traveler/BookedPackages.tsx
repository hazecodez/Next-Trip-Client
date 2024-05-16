import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { rootReducersType } from "../../Interfaces/Interfaces";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import { bookingData } from "../../Interfaces/Interfaces";
// import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const isDateInThePast = (dateString: string): boolean => {
  const givenDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return givenDate > today;
};

async function handleCancellation(id: string) {
  try {
    const response = await TravelerAPIs.cancel_booking(id);
    if (response?.data.status) {
      toast.success(response?.data.message);
    } else {
      toast.error(response?.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function BookedPackages() {
  const traveler = useSelector((state: rootReducersType) => state.traveler);
  const [bookings, setBookings] = useState<bookingData[]>([]);
  const navigate = useNavigate();

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
                <h1
                  className="text-2xl font-bold font-mono"
                  onClick={() => navigate(`/package_details/${data.packageId}`)}
                >
                  {data?.packageName}
                </h1>
                <p>Total {data.travelers.length} Travelers</p>
                <div className="flex">
                  {data.travelers.map((traveler, index) => (
                    <p key={index}> {traveler.name} &nbsp;</p>
                  ))}
                </div>
                <p className="text-red-600 font-bold">
                  Cancellation last date {formatDate(data.cancelDate as string)}
                </p>
                <p>{isDateInThePast(data.cancelDate as string)}</p>
              </div>

              <div>
                <p className="text-3xl font-bold">
                  ₹ {data.totalPrice}.00 &nbsp;
                  <span className="text-green-500 font-semibold text-xl">
                    Paid <i className="fa-regular fa-circle-check" />
                  </span>{" "}
                </p>
                <br />
                {isDateInThePast(data.cancelDate as string) && (
                  <button
                    onClick={() => handleCancellation(data._id as string)}
                    className="text-lg btn btn-wide bg-[#092635] text-[#9EC8B9] hover:bg-[#9EC8B9] hover:text-[#092635] border-none"
                  >
                    CANCEL BOOKING
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
