import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
const PortfolioCard = ({ portfolio }) => {
  return (
    <div className="w-[100%] lg:w-[48%] md:[40%] xl:[48%] sm:w-[48%] h-96 relative ">
      <img
        src={portfolio.attachment}
        alt=""
        className="w-full h-full object-cover rounded-xl"
      />
      <div className="absolute bottom-2 flex justify-between w-full items-center px-4">
        {/* <div className="w-12 h-12 bg-[#262626] rounded-full flex justify-center items-center">
          <img src={cardLogo} alt="" className="w-1/2 h-1/2 " />
        </div> */}
        <div
          // to="/portfolio/casestudy"
          className="bg-[#262626] flex px-3 py-1 text-[#FC9C6E] rounded-lg justify-center items-center gap-1"
        >
          <button className="text-xs lg:text-lg font-semibold font-spartan sm:text-xs">
            View Case Study
          </button>
          <span>
            <MdOutlineArrowOutward />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
