import { useEffect, useState } from "react";
import AdminAPI from "../../APIs/AdminAPIs";
import { toast } from "sonner";
import { Blog } from "../../Interfaces/Interfaces";
import Pagination from "./Pagination";


export default function BlogsAdmin() {
  const [action, setAction] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function getBlogs() {
      try {
        const response = await AdminAPI.blogs(searchTerm, currentPage);
        console.log(response?.data);
        
        if (response?.data.status) {
          setBlogs(response.data.blogs.blogs);
          setTotalPages(response.data.blogs.totalPages);
        } else {
          toast.error(response?.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getBlogs();
  }, [action, searchTerm, currentPage]);


  async function blogsAction(id: string) {
    try {
      const response = await AdminAPI.blogAction(id);
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
          <h1>Moments</h1>
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
                <th>Caption</th>
                <th>Location</th>
                <th>Experience</th>
                <th>User Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((data: Blog, index: number) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <div>
                      <div className="font-bold"> {data.caption} </div>
                      {/* <div className="text-sm opacity-50"> {data._id} </div> */}
                    </div>
                  </td>
                  <td>{data.location}</td>
                  <td> {data.experience} </td>
                  <td>{data.userName}</td>
                  <th>
                    <button
                      onClick={() => blogsAction(data._id as string)}
                      className={`btn btn-ghost btn-xs ${
                        data.isBlocked ? "bg-green-500" : "bg-red-500"
                      } `}
                    >
                      {" "}
                      {data.isBlocked ? "Unblock" : "Block"}{" "}
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
  )
}
