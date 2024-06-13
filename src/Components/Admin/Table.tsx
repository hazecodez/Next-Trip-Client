import { useState } from "react";

interface DataType {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  isVerified: boolean;
}

interface Props {
  action: (id: string) => void;
  verify?: (id: string) => void;
  confirmModal?: boolean;
  setConfirmModal?: (arg: boolean) => void;
  data: DataType[];
}

const Table: React.FC<Props> = ({
  action,
  data,
  verify,
  confirmModal,
  setConfirmModal,
}) => {
  const [dataId, setDataId] = useState("");
  const [verifyAction, setVerifyAction] = useState(false);
  const handleAction = (id: string) => {
    setDataId(id);
    setConfirmModal && setConfirmModal(true);
  };

  const handleConfirm = (id: string) => {
    if (verifyAction) {
      verify && verify(id);
      setVerifyAction(false);
    } else {
      action(id);
    }

    setConfirmModal && setConfirmModal(false);
    setDataId("");
  };
  return (
    <>
      <div className="overflow-x-auto glass bg-base-content">
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
                    onClick={() => setConfirmModal && setConfirmModal(false)}
                    className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConfirm(dataId)}
                    className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <table className="table text-black font-bold">
          <thead className="text-black text-lg">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Packages</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data: DataType, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div>
                    <div className="font-bold"> {data.name} </div>
                    <div className="text-sm opacity-50"> {data._id} </div>
                  </div>
                </td>
                <td>{data.email}</td>
                {verify ? (
                  data.isVerified ? (
                    <>
                      <td>Verified</td>
                    </>
                  ) : (
                    <>
                      <th>
                        <button
                          onClick={() => {
                            handleAction(data._id), setVerifyAction(true);
                          }}
                          className={`btn btn-ghost btn-xs bg-yellow-500`}
                        >
                          verify
                        </button>
                      </th>
                    </>
                  )
                ) : (
                  <>
                    <td> {data.isVerified ? "Verified" : "Not-Verified"} </td>
                  </>
                )}
                <th>
                  <button className="btn btn-ghost btn-xs">Packages</button>
                </th>
                <th>
                  <button
                    onClick={() => handleAction(data._id)}
                    className={`btn btn-ghost btn-xs ${
                      data.isBlocked ? "bg-yellow-500" : "bg-red-500"
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
    </>
  );
};

export default Table;
