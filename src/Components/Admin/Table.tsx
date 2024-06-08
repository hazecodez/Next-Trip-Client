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
  data: DataType[];
}

const Table: React.FC<Props> = ({ action, data, verify }) => {
  return (
    <>
      <div className="overflow-x-auto glass bg-base-content">
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
                          onClick={() => verify(data._id)}
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
                    onClick={() => action(data._id)}
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
