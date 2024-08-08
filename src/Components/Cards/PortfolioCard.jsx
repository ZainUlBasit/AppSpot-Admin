import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
const PortfolioCard = ({
  primaryBgColor,
  mainBgColor,
  imgUrl,
  title,
  desc,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`min-w-[200px] max-w-[450px] relative border-2 border-main overflow-hidden rounded-t-[20px] ${mainBgColor}`}
    >
      <img src={imgUrl} className="min-w-[200px] max-w-[450px]" />
      <div
        className={`w-full text-white px-3 flex flex-col gap-y-4 py-4 rounded-t-[20px] ${primaryBgColor}`}
      >
        <div className="font-semibold text-xl">{title}</div>
        <div className="text-[1rem] font-thin">{desc}</div>
        <div className="flex gap-x-2 py-2 items-center justify-end">
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
      </div>
    </div>
  );
};

export default PortfolioCard;
