import React, { useState } from "react";
import CustomModal from "./CustomModal";
import CustomInput from "../Inputs/CustomInput";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import { useDispatch } from "react-redux";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { BiSolidImageAdd } from "react-icons/bi";
import { AiOutlineFileProtect } from "react-icons/ai";
import { fetchPortfolios } from "../../store/Slices/PortfolioSlice";
import {
  AddPortfolioApi,
  UpdatePortfolioApi,
} from "../../Api_Requests/Api_Requests";

const EditPortfolioModal = ({ Open, setOpen, portfolio }) => {
  const [title, setTitle] = useState(portfolio.title);
  const [attachment, setAttachment] = useState(portfolio.attachment);
  const [iosLink, setIosLink] = useState(portfolio.ios_link);
  const [androidLink, setAndroidLink] = useState(portfolio.android_link);
  const [webLink, setWebLink] = useState(portfolio.web_link);
  const [desc, setDesc] = useState(portfolio.desc);
  const [logo, setLogo] = useState(portfolio.logo);
  const [primaryColor, setPrimaryColor] = useState(portfolio.primary_color);
  const [mainColor, setMainColor] = useState(portfolio.main_color);
  const [selectedAttachment, setselectedAttachment] = useState(null);
  const [selectedLogo, setselectedLogo] = useState(null);
  const [Loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setselectedAttachment(file);
  };

  const handleFileChangeLogo = (e) => {
    const file = e.target.files[0];
    setselectedLogo(file);
  };

  const handleAddPortfolio = async () => {
    setLoading(true);
    try {
      let attachmentUrl = attachment;
      if (selectedAttachment) {
        const attachmentRef = ref(storage, `/attachments/${title}`);
        const snapshot = await uploadBytes(attachmentRef, selectedLogo);
        attachmentUrl = await getDownloadURL(snapshot.ref);
      }
      if (!attachmentUrl) {
        ErrorToast("Please select an attachment!");
        setLoading(false);
        return;
      }

      let logoUrl = logo;
      if (selectedLogo) {
        const logoRef = ref(storage, `/logos/${title}`);
        const snapshot = await uploadBytes(logoRef, selectedLogo);
        logoUrl = await getDownloadURL(snapshot.ref);
      }
      if (!logoUrl) {
        ErrorToast("Please select a logo!");
        setLoading(false);
        return;
      }

      const response = await UpdatePortfolioApi(portfolio._id, {
        title,
        attachment: attachmentUrl,
        ios_link: iosLink,
        android_link: androidLink,
        web_link: webLink,
        logo: logoUrl,
        primary_color: primaryColor,
        main_color: mainColor,
        desc,
      });

      if (response.data.success) {
        SuccessToast("Portfolio Updated successfully!");
        dispatch(fetchPortfolios());
        setOpen(false);
      } else {
        ErrorToast("Unable to Update portfolio");
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
          Update Portfolio
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
          <div className="flex flex-col">
            <div className="w-full flex justify-center items-center mb-4">
              <div className="relative flex justify-center w-fit mb-4">
                {attachment ? (
                  <img
                    src={
                      selectedAttachment
                        ? URL.createObjectURL(selectedAttachment)
                        : attachment
                    }
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
                  Value={iosLink}
                  setValue={setIosLink}
                  Type={"text"}
                  label={"iOS Link"}
                  required={true}
                  placeholder={"Enter iOS Link"}
                />
                <CustomInput
                  Value={androidLink}
                  setValue={setAndroidLink}
                  Type={"text"}
                  label={"Android Link"}
                  required={true}
                  placeholder={"Enter Android Link"}
                />
                <CustomInput
                  Value={webLink}
                  setValue={setWebLink}
                  Type={"text"}
                  label={"Web Link"}
                  required={true}
                  placeholder={"Enter Web Link"}
                />
                <CustomInput
                  Value={desc}
                  setValue={setDesc}
                  Type={"text"}
                  label={"Description"}
                  required={true}
                  placeholder={"Enter Description"}
                />
              </div>
              <div className="flex flex-col">
                <div className="relative mb-[15px] w-[297px] maxInputWidth font-[Quicksand]">
                  <p className="absolute top-[-13px] left-3 w-fit bg-[white] text-custom-bg h-fit text-[18px] font-bold InputLabel font-montserrat">
                    Logo
                  </p>
                  <input
                    type={"file"}
                    required={true}
                    placeholder={"Upload Logo"}
                    className="px-3 py-3 border-2 border-custom-bg rounded-[7.94px] w-full outline-none InputText font-montserrat"
                    onChange={handleFileChangeLogo}
                  />
                </div>

                <div className="relative mb-[15px] w-[297px] maxInputWidth font-[Quicksand]">
                  <p className="absolute top-[-13px] left-3 w-fit bg-white text-custom-bg h-fit text-[18px] font-bold InputLabel font-montserrat">
                    Primary Color
                  </p>
                  <input
                    type={"color"}
                    placeholder={"Select Primary Color"}
                    className="px-3 py-3 border-2 border-custom-bg bg-white rounded-[7.94px] w-full outline-none InputText font-montserrat h-[6vh]"
                    value={primaryColor}
                    readOnly={false}
                    onChange={(e) => {
                      const value = e.target.value;
                      console.log(console.log(value));
                      setPrimaryColor(value.length ? value : "");
                    }}
                  />
                </div>
                <div className="relative mb-[15px] w-[297px] maxInputWidth font-[Quicksand]">
                  <p className="absolute top-[-13px] left-3 w-fit bg-white text-custom-bg h-fit text-[18px] font-bold InputLabel font-montserrat">
                    Main Color
                  </p>
                  <input
                    type={"color"}
                    placeholder={"Select Main Color"}
                    className="px-3 py-3 border-2 border-custom-bg bg-white rounded-[7.94px] w-full outline-none InputText font-montserrat h-[6vh]"
                    value={mainColor}
                    readOnly={false}
                    onChange={(e) => {
                      const value = e.target.value;
                      console.log(console.log(value));
                      setMainColor(value.length ? value : "");
                    }}
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

export default EditPortfolioModal;
