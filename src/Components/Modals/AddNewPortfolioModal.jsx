import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import CustomInput from "../Inputs/CustomInput";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { useDispatch, useSelector } from "react-redux";
// import AddingLightLoader from "../Loaders/AddingLightLoader";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { RiUserForbidFill } from "react-icons/ri";
import { BiSolidImageAdd } from "react-icons/bi";
import { AiOutlineFileProtect } from "react-icons/ai";
import { fetchPortfolios } from "../../store/Slices/PortfolioSlice";
import { AddPortfolioApi } from "../../Api_Requests/Api_Requests";

const AddNewPortfolioModal = ({ Open, setOpen }) => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [iosLink, setIosLink] = useState(null);
  const [androidLink, setAndroidLink] = useState("");
  const [validatingTheProblem, setValidatingTheProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [overflow, setOverflow] = useState("");
  const [Logo, setLogo] = useState("");
  const CategoryState = useSelector((state) => state.CategoryState);

  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };
  const handleFileChangeOverflow = (e) => {
    const file = e.target.files[0];
    setOverflow(file);
  };
  const handleFileChangeOverLogo = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };

  const handleAddPortfolio = async () => {
    setLoading(true);
    try {
      let attachmentUrl = "";
      if (attachment) {
        const attachmentRef = ref(storage, `/attachments/${title}`);
        const snapshot = await uploadBytes(attachmentRef, attachment);
        attachmentUrl = await getDownloadURL(snapshot.ref);
      }
      if (!attachmentUrl) {
        ErrorToast("Please select an attachment!");
        setLoading(false);
        return;
      }
      let overflowUrl = "";
      if (overflow) {
        const overflowRef = ref(storage, `/overflows/${title}`);
        const snapshot = await uploadBytes(overflowRef, overflow);
        overflowUrl = await getDownloadURL(snapshot.ref);
      }
      if (!overflowUrl) {
        ErrorToast("Please select an Overflow!");
        setLoading(false);
        return;
      }
      let LogoUrl = "";
      if (Logo) {
        const LogoRef = ref(storage, `/logos/${title}`);
        const snapshot = await uploadBytes(LogoRef, Logo);
        LogoUrl = await getDownloadURL(snapshot.ref);
      }
      if (!LogoUrl) {
        ErrorToast("Please select an Overflow!");
        setLoading(false);
        return;
      }
      const response = await AddPortfolioApi({
        title,
        overview,
        attachment: attachmentUrl,
        ios_link: iosLink,
        android_link: androidLink,
        validating_the_problem: validatingTheProblem,
        solution,
        overflow: overflowUrl,
        logo: LogoUrl,
      });
      if (response.data.success) {
        SuccessToast("Portfolio added successfully!");
        dispatch(fetchPortfolios());
        setOpen(false);
      } else {
        ErrorToast("Unable to add portfolio");
      }
    } catch (err) {
      console.log(err);
      ErrorToast(err.response?.data?.error?.msg || err.message);
    }
    setLoading(false);
  };

  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div className="flex flex-col px-8 bg-aliceblue">
        <div className="py-8 text-4xl text-custom-bg border-b-custom-bg w-full text-center font-montserrat font-bold">
          Add New Portfolio
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
          <div className="flex flex-col">
            <div className="w-full flex justify-center items-center mb-4">
              <div className="relative flex justify-center w-fit mb-4">
                {attachment ? (
                  <img
                    src={URL.createObjectURL(attachment)}
                    alt="Attachment"
                    className="w-20 h-20 rounded-lg border-2 border-custom-bg-hover mb-6 relative object-cover"
                  />
                ) : (
                  <AiOutlineFileProtect className="w-20 h-20 rounded-lg mb-4 text-custom-bg-hover" />
                )}
                <label
                  htmlFor="file-input"
                  className="absolute -bottom-2 -right-3 cursor-pointer flex items-center w-fit p-1 rounded-full border-1 border-black text-custom-bg bg-black text-white hover:bg-gray-800 transition-all ease-in-out duration-500"
                >
                  <BiSolidImageAdd className="text-[1.1rem]" />
                </label>
              </div>
            </div>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex flex-wrap gap-x-4 justify-center">
              <div className="flex flex-col">
                <CustomInput
                  Value={title}
                  setValue={setTitle}
                  Type={"text"}
                  label={"Title"}
                  required={true}
                  placeholder={"Enter Portfolio Title"}
                />
                <CustomInput
                  Value={overview}
                  setValue={setOverview}
                  Type={"text"}
                  label={"Overview"}
                  required={true}
                  placeholder={"Enter Overview"}
                />
                <CustomInput
                  Value={iosLink}
                  setValue={setIosLink}
                  Type={"text"}
                  label={"iOS Link"}
                  required={true}
                  placeholder={"Enter iOS Link"}
                />
                <div className="relative mb-[15px] w-[297px] maxInputWidth font-[Quicksand]">
                  <p className="absolute top-[-13px] left-3 w-fit bg-[white] text-custom-bg h-fit text-[18px] font-bold InputLabel font-montserrat">
                    Logo
                  </p>
                  <input
                    type={"file"}
                    required={true}
                    placeholder={"Upload Overflow"}
                    className="px-3 py-3 border-2 border-custom-bg rounded-[7.94px] w-full outline-none InputText font-montserrat"
                    onChange={handleFileChangeOverLogo}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <CustomInput
                  Value={androidLink}
                  setValue={setAndroidLink}
                  Type={"text"}
                  label={"Android Link"}
                  required={true}
                  placeholder={"Enter Android Link"}
                />
                <CustomInput
                  Value={validatingTheProblem}
                  setValue={setValidatingTheProblem}
                  Type={"text"}
                  label={"Validating the Problem"}
                  required={true}
                  placeholder={"Enter Validating the Problem"}
                />
                <CustomInput
                  Value={solution}
                  setValue={setSolution}
                  Type={"text"}
                  label={"Solution"}
                  required={true}
                  placeholder={"Enter Solution"}
                />
                <div className="relative mb-[15px] w-[297px] maxInputWidth font-[Quicksand]">
                  <p className="absolute top-[-13px] left-3 w-fit bg-[white] text-custom-bg h-fit text-[18px] font-bold InputLabel font-montserrat">
                    Overflow
                  </p>
                  <input
                    type={"file"}
                    required={true}
                    placeholder={"Upload Overflow"}
                    className="px-3 py-3 border-2 border-custom-bg rounded-[7.94px] w-full outline-none InputText font-montserrat"
                    onChange={handleFileChangeOverflow}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-2 py-5">
          {Loading && <div>Loader</div>}
          {!Loading && (
            <div
              className="cursor-pointer bg-[green] hover:bg-[#008000e1] px-4 py-3 font-bold text-[white] transition-all ease-in-out duration-500 rounded-[10px] w-[100px] text-center"
              onClick={handleAddPortfolio}
            >
              Add
            </div>
          )}
          <div
            className="cursor-pointer bg-[gray] hover:bg-[#a9a9a9] px-4 py-3 font-bold text-[white] transition-all ease-in-out duration-500 rounded-[10px] w-[100px] text-center"
            onClick={() => setOpen(false)}
          >
            Cancel
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default AddNewPortfolioModal;
