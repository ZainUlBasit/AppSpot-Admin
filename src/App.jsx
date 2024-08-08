import { useEffect, useState } from "react";
import AddNewPortfolioModal from "./Components/Modals/AddNewPortfolioModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPortfolios } from "./store/Slices/PortfolioSlice";
import PortfolioCard from "./Components/Cards/PortfolioCard";

function App() {
  const [OpenModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const PortfolioState = useSelector((state) => state.PortfolioState);
  useEffect(() => {
    dispatch(fetchPortfolios());
  }, []);
  return (
    <div className="w-screen min-h-screen">
      <div className="flex justify-between items-center py-5 px-5">
        <div className="">Portfolio</div>
        <div
          className="px-3 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all ease-in-out duration-500 cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          Add New Portfolio
        </div>
      </div>
      <div className="flex gap-x-2 gap-y-2 flex-wrap px-2">
        {PortfolioState.data &&
          PortfolioState.data.map((dt) => {
            return <PortfolioCard portfolio={dt} />;
          })}
      </div>
      {OpenModal && (
        <AddNewPortfolioModal Open={OpenModal} setOpen={setOpenModal} />
      )}
    </div>
  );
}

export default App;
