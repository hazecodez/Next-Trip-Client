import AdminAPI from "../../APIs/AdminAPIs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Package from "../../Interfaces/common/Package";
import Pagination from "./Pagination";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [action, setAction] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await AdminAPI.packages(searchTerm, currentPage);
        if (response?.data.status) {
          setPackages(response.data.packages.packages);
          setTotalPages(response.data.packages.totalPages);
        } else {
          toast.error(response?.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPackages();
  }, [action, searchTerm, currentPage]);
  async function packageAction(id: string | undefined) {
    try {
      const response = await AdminAPI.package_Actions(id);
      if (response?.data.status) {
        console.log();

        setAction(!action);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="bg-[#D2E0FB] flex justify-between">
        <div className="lg:pl-10 my-3 text-black font-bold text-2xl">
          <h1>Packages</h1>
        </div>
        <div className="lg:mr-10 md:mr-10">
          <input
            className="border-none bg-gray-700 h-8 my-2 py-5 px-5 lg:pr-16 rounded-full text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-ghost btn-circle text-gray-700"
          >
            <i className="fa-solid fa-magnifying-glass text-2xl" />
          </button>
        </div>
      </div>
      <div className="">
        <div className="overflow-x-auto glass bg-base-content">
          <table className="table text-black font-bold">
            <thead className="text-black text-lg">
              <tr>
                <th>No.</th>
                <th>Package Name</th>
                <th>Destination</th>
                <th>Price</th>
                <th>Host Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((data: Package, index: number) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <div>
                      <div className="font-bold"> {data.name} </div>
                      <div className="text-sm opacity-50"> {data._id} </div>
                    </div>
                  </td>
                  <td>{data.destination}</td>
                  <td> {data.price} </td>
                  <td>{data.host}</td>
                  <th>
                    <button
                      onClick={() => packageAction(data._id)}
                      className={`btn btn-ghost btn-xs ${
                        data.is_verified ? "bg-red-500" : "bg-green-500"
                      } `}
                    >
                      {" "}
                      {data.is_verified ? "Reject" : "Verify"}{" "}
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
