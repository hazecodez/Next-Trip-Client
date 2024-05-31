import { useEffect, useState } from "react";
import AdminAPI from "../../APIs/AdminAPIs";
import AdminChart from "./AdminChart";

export default function Dashboard() {
  const [travelersCount, setTravelersCount] = useState(0);
  const [hostsCount, setHostsCount] = useState(0);
  const [packagesCount, setPackagesCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);
  useEffect(() => {
    async function fetchDashboard() {
      const response = await AdminAPI.dashboard();
      if (response?.data) {
        setTravelersCount(response.data.traveler);
        setHostsCount(response.data.hosts);
        setPackagesCount(response.data.packages);
        setBlogsCount(response.data.blog);
      }
    }
    fetchDashboard();
  }, []);
  return (
    <>
      <div className=" bg-[#D2E0FB]">
        <div className="p-4  dark:border-gray-700">
          <div className="flex md:grid-cols-2 gap-2">
            <div className="flex w-2/4 h-24 items-center justify-evenly rounded bg-gradient-to-r from-[#24263A] to-[#C8C4B7] dark:bg-gray-800">
              <p className="text-2xl font-bold text-white">
                {`No of Travel Hosts  : ${hostsCount}`}{" "}
              </p>
              <i className="fa-solid fa-book-open-reader text-black text-5xl" />
            </div>
            <div className="flex  w-2/4 items-center justify-evenly rounded bg-gradient-to-r from-[#24263A] to-[#C8C4B7] dark:bg-gray-800">
              <p className="text-2xl font-bold text-white">
                {`No of Packages  : ${packagesCount}`}{" "}
              </p>
              <i className="fa-solid fa-clipboard-list text-black text-5xl" />
            </div>
          </div>
          <div className="grid md:grid-cols gap-4 text-[#24263A]">
            <AdminChart />
          </div>
          <div className="flex grid-cols-2 gap-2">
            <div className="flex w-2/4 items-center justify-evenly rounded bg-gradient-to-r from-[#24263A] to-[#C8C4B7] dark:bg-gray-800">
              <p className="text-2xl font-bold text-white">
                {`No of Travelers  : ${travelersCount}`}{" "}
              </p>
              <img src="../Traveler/successLogo.png" className="w-24  " />
            </div>
            <div className="flex  w-2/4 items-center justify-evenly rounded bg-gradient-to-r from-[#24263A] to-[#C8C4B7] dark:bg-gray-800">
              <p className="text-2xl font-bold text-white">
                {`No of Moments  : ${blogsCount}`}{" "}
              </p>
              <i className="fa-solid fa-hashtag text-black text-5xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
