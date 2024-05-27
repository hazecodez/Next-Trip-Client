import { useEffect, useState } from "react";
import HostAPIs from "../../APIs/HostAPIs";
import { Package } from "../../Interfaces/Interfaces";
import { useNavigate } from "react-router-dom";
import Pagination from "../Common/Pagination";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};
export default function Schedules() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await HostAPIs.package_list(currentPage);
        if (response?.data.packageList) {
          const sortedPackages = response.data.packageList.packages.sort((a, b) => {
            const dateA = new Date(a.dur_start);
            const dateB = new Date(b.dur_start);

            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
              throw new Error("Invalid date format in dur_start");
            }

            return dateA.getTime() - dateB.getTime();
          });
          setPackages(sortedPackages);
          setTotalPages(response.data.packageList.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchPackages();
  }, [currentPage]);
  return (
    <>
      <div className="overflow-x-auto bg-[#f2f2f2] rounded-md w-full ml-3 mr-3 h-screen">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-[#E25E3E]">
              <th></th>
              <th>Package Name</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Package Details</th>
            </tr>
          </thead>

          {packages.map((data: Package, index) => (
            <tbody>
              <tr className="text-[#E25E3E]">
                <th>{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.destination}</td>
                <td>{`${formatDate(data.dur_start)} - ${formatDate(
                  data.dur_end
                )}`}</td>
                <td className="flex">
                  {" "}
                  <p
                    onClick={() =>
                      navigate(`/host/package_details/${data._id}`)
                    }
                    className="bg-[#E25E3E] pl-7 cursor-pointer text-[#f2ceb3] w-24 rounded-full"
                  >
                    Details
                  </p>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        
        
      </div>
      <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
    </>
  );
}
