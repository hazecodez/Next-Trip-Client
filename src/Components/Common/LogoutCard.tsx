interface LogoutCardProps {
  action: () => void;
}

const LogoutCard: React.FC<LogoutCardProps> = ({ action }) => {
  return (
    <>
      <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure ?</h3>
          <p className="py-4">You want to log out?</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
              <span style={{ margin: "5px" }}></span>
            </form>
            <button
              onClick={() => action()}
              className="btn bg-red-800 hover:bg-red-900"
            >
              Logout
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default LogoutCard;
