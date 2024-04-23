import AdminAPI from "../../APIs/AdminAPIs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Package from "../../Interfaces/common/Package";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [action, setAction] = useState(false);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await AdminAPI.packages();
        if (response?.data.status) {
          setPackages(response.data.packages);
        } else {
          toast.error(response?.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPackages();
  }, [action]);
  async function packageAction(id: string|undefined) {
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
      <div className="bg-[#D2E0FB]">
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
      </div>
    </>
  );
}
