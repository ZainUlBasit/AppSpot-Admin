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
      <div className="flex justify-between items-start py-5 px-5">
        <div className="">Portfolio</div>
        <div
          className="px-3 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all ease-in-out duration-500 cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          Add New Portfolio
        </div>
      </div>
      <div className="flex gap-x-2 gap-y-2 flex-wrap px-4 justify-around  items-stretch">
        <PortfolioCard
          mainBgColor={" bg-[#716242]"}
          primaryBgColor={" bg-[#483E28]"}
          title={"We helped boost sales"}
          desc={
            "We digitised Costa Coffee in Bahrain and increased their sales."
          }
          imgUrl={"/test.png"}
        />
        <PortfolioCard
          mainBgColor={" bg-[#306CAD]"}
          primaryBgColor={" bg-[#1D446E]"}
          title={"We transformed food delivery"}
          desc={
            "We built the complete range of solutions for Halal food delivery in the UK."
          }
          imgUrl={"/test1.png"}
        />
        <PortfolioCard
          mainBgColor={" bg-[#E34380]"}
          primaryBgColor={" bg-[#9C2F58]"}
          title={"We pioneered smart shopping"}
          desc={
            "We helped SmartSanta build an AI based e-commerce app fuelled by influencers."
          }
          imgUrl={"/test2.png"}
        />
      </div>
      {OpenModal && (
        <AddNewPortfolioModal Open={OpenModal} setOpen={setOpenModal} />
      )}
    </div>
  );
}

export default App;
