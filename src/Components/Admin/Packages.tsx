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
  const [confirmModal, setConfirmModal] = useState(false);
  const [dataId, setDataId] = useState("");

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
  function handleModal(id: string) {
    setDataId(id);
    setConfirmModal(true);
  }
  async function packageAction(id: string | undefined) {
    try {
      const response = await AdminAPI.package_Actions(id);
      setConfirmModal(false);
      if (response?.data.status) {
        setAction(!action);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="bg-[#D2E0FB] flex justify-between">
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
                    Do you really want to continue ? This process cannot be
                    undone
                  </p>
                </div>
                <div className="p-2 mt-2 text-center space-x-1 md:block">
                  <button
                    onClick={() => setConfirmModal(false)}
                    className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => packageAction(dataId)}
                    className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
                      onClick={() => handleModal(data._id as string)}
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
