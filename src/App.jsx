import { useEffect, useState } from "react";
import AddNewPortfolioModal from "./Components/Modals/AddNewPortfolioModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPortfolios } from "./store/Slices/PortfolioSlice";
import PortfolioCard from "./Components/Cards/PortfolioCard";
import EditPortfolioModal from "./Components/Modals/EditPortfolioModal";
import DeleteModal from "./Components/Modals/DeleteModal";
import { DeletePortfolioApi } from "./Api_Requests/Api_Requests";
import { SuccessToast } from "./utils/ShowToast";

function App() {
  const [OpenModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const PortfolioState = useSelector((state) => state.PortfolioState);
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [SelectedId, setSelectedId] = useState("");
  const [Loading, setLoading] = useState(false);
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
      <div className="flex gap-x-2 gap-y-4 flex-wrap px-4 justify-around  items-stretch pb-4">
        {PortfolioState.loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {PortfolioState.data.map((dt) => {
              return (
                <PortfolioCard
                  id={dt._id}
                  mainBgColor={dt.main_color}
                  primaryBgColor={dt.primary_color}
                  title={dt.title}
                  desc={dt.desc || ""}
                  imgUrl={dt.attachment}
                  setOpenDeleteModal={setOpenDeleteModal}
                  setOpenEditModal={setOpenEditModal}
                  setSelectedId={setSelectedId}
                />
              );
            })}
          </>
        )}
        {/* <PortfolioCard
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
        /> */}
      </div>
      {OpenModal && (
        <AddNewPortfolioModal Open={OpenModal} setOpen={setOpenModal} />
      )}
      {OpenEditModal && (
        <EditPortfolioModal
          Open={OpenEditModal}
          setOpen={setOpenEditModal}
          portfolio={PortfolioState.data.find((dt) => dt._id === SelectedId)}
        />
      )}

      {OpenDeleteModal && (
        <DeleteModal
          Open={OpenDeleteModal}
          setOpen={setOpenDeleteModal}
          Loading={Loading}
          onSubmit={async () => {
            setLoading(true);
            try {
              const response = await DeletePortfolioApi(SelectedId);
              if (response.data.success) {
                SuccessToast(response.data.data.msg);
                setOpenDeleteModal(false);
                dispatch(fetchPortfolios());
              }
            } catch (err) {
              console.log(err);
            }
            setLoading(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
