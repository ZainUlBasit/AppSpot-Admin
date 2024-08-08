import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
const PortfolioCard = ({ portfolio }) => {
  const navigate = useNavigate();
  return (
    <div className="min-w-[200px] max-w-[400px] relative border-2 border-main overflow-hidden bg-[#716242] rounded-t-[20px]">
      <img src="/test.png" className="w-full" />
      <div className="w-full bg-[#483E28] text-white px-3 flex flex-col gap-y-4 py-4 rounded-t-[20px]">
        <div className="font-semibold text-xl">We helped boost sales</div>
        <div className="text-[1rem] font-thin">
          We digitised Costa Coffee in Bahrain and increased their sales.
        </div>
        <div className="flex gap-x-2 py-2 items-center justify-end">
          <img src="/Google.png" alt="nothing" className="w-[150px]" />
          <img src="/App.png" alt="nothing" className="w-[150px]" />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
