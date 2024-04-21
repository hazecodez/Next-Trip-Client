import Navbar from "./Navbar";
import Footer from "../Common/Footer";
import PackageSchema from "../../Validations/Host/PackageSchema";
import React, { useState } from "react";





export default function CreatePackage() {

  const [fileInputSize, setFileInputSize] = useState('');
  const [selectedFile,setSelectedFile] = useState("");
  const [previewSource,setPreviewSource] = useState()
  const handleFileInputChange = (e : React.FormEvent) => {
    const file = e.target.files[0];
    previewFile(file);
  }
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }
  
  return (
    <>
      <Navbar />
      <div className=" bg-[#F2F2F2]   flex justify-evenly">
        <div className="  py-5 bg-[#fae9dc] shrink-0  min-h-full md:w-4/6 w-11/12  shadow">
          <form className="w-5/6  mx-auto">
            <h1 className="text-2xl text-center text-gray-700 font-bold my-5">
              Package Details{" "}
            </h1>
            <div className=" flex flex-col md:flex-row w-full md:gap-10 ">
              <div className="relative z-0  w-full mb-5 group">
                <p className="m-2 text-black font-bold">Package Name</p>
                <input
                  type="text"
                  className="rounded-full peer py-3  ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter your package name here"
                  name="name"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Maximum Capacity</p>
                <input
                  type="number"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter your max package capacity. eg: 20"
                  name="capacity"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Destination</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Select your destination."
                  name="destination"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <p className="m-2 text-black font-bold">
                    Duration Start Date
                  </p>
                  <input
                    type="date"
                    className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Start Date"
                    name="dur_start"
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <p className="m-2 text-black font-bold">Duration End Date</p>
                  <input
                    type="date"
                    className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="End Date"
                    name="dur_end"
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                </div>
              </div>
            </div>
            <h1 className="text-lg text-center text-gray-700  my-5">
              Accommodations{" "}
            </h1>
            <div className="grid md:grid-cols-2 md:gap-6">
              
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Stay</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Select your stay"
                  name="stay"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Room Type</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Select Room Types."
                  name="room_type"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Amenities</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter your package Amenities."
                  name="amenities"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Food</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter the foods you offer"
                  name="food"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
              </div>
            </div>
            <h1 className="text-lg text-center text-gray-700  my-5">
              Flight Timings{" "} <span className="text-xs text-gray-400" > (optional)</span>
            </h1>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Departure Airport</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Select Departure Airport"
                  name="depa_airport"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Arrival Airport</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Select Arrival Airport"
                  name="arrival_airport"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <p className="m-2 text-black font-bold">Booking Time Start</p>
                  <input
                    type="date"
                    className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Start Date"
                    name="book_start"
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <p className="m-2 text-black font-bold">Booking Time End</p>
                  <input
                    type="date"
                    className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="End Date"
                    name="book_end"
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                </div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Images</p>
               
                <input type="file" name="images" accept="image/*" placeholder="You can't touch this" multiple className="rounded-full   w-full bg-gray-100  " />
                {previewSource &&
                (<img className="m-4 w-56 h-auto" src={previewSource} alt="..."></img>)
                }
                
                
                <div className=" absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Activities</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter activities here"
                  name="activities"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Price</p>
                <input
                  type="number"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter the pricing for the package"
                  name="price"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
              </div>
            </div>

            <p className="m-2 text-black font-bold">Itinerary</p>
            <textarea
              id="itinerary"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your day by day plan."
              name="itinerary"
            ></textarea>

            <button
              type="submit"
              className="m-4 btn btn-wide bg-[#C63D2F] hover:bg-[#E25E3E] border-none text-white text-xl text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer bgColor="bg-[#C63D2F]" Logo="../Host/HostLogo.png" />
    </>
  );
}
