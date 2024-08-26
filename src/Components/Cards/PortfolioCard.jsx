import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
const PortfolioCard = ({
  id,
  primaryBgColor,
  mainBgColor,
  imgUrl,
  title,
  desc,
  setOpenEditModal,
  setOpenDeleteModal,
  setSelectedId,
}) => {
  const navigate = useNavigate();
  console.log(primaryBgColor, mainBgColor);
  return (
    <div
      className={`min-w-[200px] max-w-[450px] relative overflow-hidden rounded-[20px] flex flex-col justify-between `}
      style={{
        backgroundColor: primaryBgColor,
        border: "2px solid",
        borderColor: mainBgColor,
      }}
    >
      <img src={imgUrl} className="w-full" />
      <div
        className={`w-full text-white flex flex-col gap-y-4 pt-4 rounded-t-[20px] justify-between`}
        style={{ backgroundColor: mainBgColor }}
      >
        <div className="font-semibold text-xl px-4">{title}</div>
        <div className="text-[1rem] font-thin px-4">{desc}</div>
        <div className="flex gap-x-2 py-2 items-center justify-end flex-1 px-4">
          <img
            src="/Google.png"
            alt="nothing"
            className="max-w-[150px] min-w-[100px] cursor-pointer"
          />
          <img
            src="/App.png"
            alt="nothing"
            className="max-w-[150px] min-w-[100px] cursor-pointer"
          />
        </div>
        <div className="flex justify-between items-center gap-x-[2px]">
          <div
            className="w-[50%] text-center bg-white text-green-700 py-2 cursor-pointer hover:bg-green-700 hover:text-white transition-all ease-in-out duration-500"
            onClick={() => {
              setOpenEditModal(true);
              setSelectedId(id);
            }}
          >
            Edit
          </div>
          <div
            className="w-[50%] text-center py-2 cursor-pointer bg-white text-red-700 hover:bg-red-700 hover:text-white transition-all ease-in-out duration-500"
            onClick={() => {
              setOpenDeleteModal(true);
              setSelectedId(id);
            }}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
