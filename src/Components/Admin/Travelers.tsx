import Table from "./Table";
import AdminAPI from "../../APIs/AdminAPIs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Pagination from "./Pagination";

export default function Travelers() {
  const [action, setAction] = useState(false);
  const [travelers, setTraveler] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [confirmModal, setConfirmModal] = useState(false);

  useEffect(() => {
    async function getTravelers() {
      try {
        const response = await AdminAPI.travelers(searchTerm, currentPage);
        if (response?.data.status) {
          setTraveler(response.data.travelers.travelers);
          setTotalPages(response.data.travelers.totalPages);
        } else {
          toast.error(response?.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getTravelers();
  }, [action, searchTerm, currentPage]);

  async function travelerAction(id: string) {
    try {
      const response = await AdminAPI.travelerAction(id);
      if (response) {
        setAction(!action);
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="bg-[#D2E0FB] flex justify-between">
        <div className="lg:pl-10 my-3 text-black font-bold text-2xl">
          <h1>Travelers</h1>
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

      <Table
        action={travelerAction}
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        data={travelers}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
}
