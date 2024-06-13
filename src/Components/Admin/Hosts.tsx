import Table from "./Table";
import AdminAPI from "../../APIs/AdminAPIs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Pagination from "./Pagination";
import { PropagateLoader } from "react-spinners";

export default function Hosts() {
  const [action, setAction] = useState(false);
  const [hosts, setHost] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [confirmModal, setConfirmModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getHosts() {
      try {
        const response = await AdminAPI.hosts(searchTerm, currentPage);
        if (response?.data.status) {
          setHost(response.data.hosts.hosts);
          setTotalPages(response.data.hosts.totalPages);
          setLoading(false);
        } else {
          toast.error(response?.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getHosts();
  }, [action, searchTerm, currentPage]);

  async function hostAction(id: string) {
    try {
      setLoading(true)
      const response = await AdminAPI.hostAction(id);
      if (response) {
        setAction(!action);
        setLoading(false)
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function hostVerify(id: string) {
    try {
      setLoading(true)
      const response = await AdminAPI.hostVerify(id);
      if (response) {
        setAction(!action);
        setLoading(false)
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    {loading && (
        <div className="loader-container">
          <PropagateLoader color="#D2E0FB" size={30} />
        </div>
      )}
      <div className="bg-[#D2E0FB] flex justify-between">
        <div className="lg:pl-10 my-3 text-black font-bold text-2xl">
          <h1>Travel Hosts</h1>
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
        verify={hostVerify}
        action={hostAction}
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        data={hosts}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
}
