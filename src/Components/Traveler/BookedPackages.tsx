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

export default function BookedPackages() {
  const traveler = useSelector((state: rootReducersType) => state.traveler);
  const [bookings, setBookings] = useState<bookingData[]>([]);
  const [blogId,setBlogid] = useState("")
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  async function handleCancellation(id: string) {
    try {
      const response = await TravelerAPIs.cancel_booking(id);
      setConfirmModal(false)
      if (response?.data.status) {
        toast.success(response?.data.message);
        setUpdate(!update);
      } else {
        toast.error(response?.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
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
  }, [update]);

  return (
    <>
      <div className=" flex-wrap p-10">
        {confirmModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="group select-none w-[250px] flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl">
            <div className="">
              <div className="text-center p-3 flex-auto justify-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
                <h2 className="text-xl font-bold py-4 text-gray-200">
                  Are you sure?
                </h2>
                <p className="font-bold text-sm text-gray-500 px-2">
                  Do you really want to continue ? This process cannot be undone
                </p>
              </div>
              <div className="p-2 mt-2 text-center space-x-1 md:block">
                <button onClick={()=> setConfirmModal(false)} className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300">
                  Cancel
                </button>
                <button onClick={()=> handleCancellation(blogId)} className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300">
                  Confirm
                </button>
              </div>
            </div>
          </div>
          </div>
        )}
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
                    onClick={() => {setConfirmModal(true),setBlogid(data?._id as string)}}
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
