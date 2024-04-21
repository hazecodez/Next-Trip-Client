import Table from "./Table";
import AdminAPI from "../../APIs/AdminAPIs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Hosts() {
  const [action, setAction] = useState(false);
  const [hosts, setHost] = useState([]);

  useEffect(() => {
    async function getHosts() {
      try {
        const response = await AdminAPI.hosts();
        if (response?.data.status) {
          setHost(response.data.hosts);
        } else {
          toast.error(response?.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getHosts();
  }, [action]);

  async function hostAction(id: string) {
    try {
      const response = await AdminAPI.hostAction(id);
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
      <div className="bg-[#D2E0FB]">
        <Table action={hostAction} data={hosts} />
      </div>
    </>
  );
}
