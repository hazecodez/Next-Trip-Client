import Table from "./Table";
import AdminAPI from "../../APIs/AdminAPIs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Travelers() {
  const [action, setAction] = useState(false);
  const [travelers, setTraveler] = useState([]);

  useEffect(() => {
    async function getTravelers() {
      try {
        const response = await AdminAPI.travelers();
        if (response?.data.status) {
          setTraveler(response.data.travelers);
        } else {
          toast.error(response?.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getTravelers();
  }, [action]);

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
      <Table action={travelerAction} data={travelers} />
    </>
  );
}
