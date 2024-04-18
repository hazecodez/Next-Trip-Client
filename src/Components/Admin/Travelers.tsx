export default function Travelers() {
  return (
    <>
      <div className="overflow-x-auto glass bg-base-content">
        <table className="table text-black font-bold">
          {/* head */}
          <thead className="text-black text-lg">
            <tr>
             <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                1
              </td>
              <td>
              <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                {/* <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span> */}
              </td>
              <td>Purple</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>
          {/* foot */}
          {/* <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </>
  );
}
