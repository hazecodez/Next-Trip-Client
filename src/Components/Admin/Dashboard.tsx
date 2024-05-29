import { useEffect, useState } from "react";
import AdminAPI from "../../APIs/AdminAPIs";

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
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl font-bold text-black">
                <i className="fa-regular fa-user"></i>
                No. of Travelers : {travelersCount}
              </p>
            </div>
            <div className="flex  items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-black font-bold">
                <i className="fa-regular fa-id-card"></i>
                No. of Hosts : {hostsCount}
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-black font-bold">
                <i className="fa-solid fa-clipboard-list"></i>
                No. of Packages : {packagesCount}
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-black font-bold">
                <i className="fa-solid fa-hashtag"></i>
                No. of Moments : {blogsCount}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center  mb-4 rounded bg-gray-50 dark:bg-gray-800">
            {/* <ApexChart/> */}
          </div>
        </div>
      </div>
    </>
  );
}
