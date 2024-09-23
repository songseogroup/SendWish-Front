import React, { useState, useCallback, useEffect, useRef } from "react";
import FloatInput from "../../components/ui/Inputs/FloatInput";
import FloatInputNumber from "../../components/ui/Inputs/FloatInputNumber";
import FloatInputTextArea from "../../components/ui/Inputs/FloatInputTextArea";
import { Dropdown } from "primereact/dropdown";
import { useDropzone } from "react-dropzone";
import uploadFileImg from "../../assets/images/upload-file.svg";
import { useParams } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";

const GiftDetail = () => {
  const { event_url, id } = useParams();
  const [loading, setloading] = useState(false);
  const toast = useRef();
  const [files, setFiles] = useState([]);
  
  // Get data from localStorage and handle if null
  const savedData = JSON.parse(localStorage.getItem('paymentDetail'));

  const [eventsData, setEventsData] = useState({
    event_name: savedData?.event?.event_name,
    event_description: savedData?.event?.event_description || "",
    eid: savedData?.event?.eid || "",
    event_url: savedData?.event?.event_url || "",
    image: savedData?.event?.image || "",
    giftmessage: savedData?.event?.giftmessage || "",
    gift: savedData?.event?.gift || 0,
    email: savedData?.event?.email || "",
    from: savedData?.event?.from || "",
    country: savedData?.event?.country || { name: "", code: "" },
  });

  useEffect(() => {
    console.log("Loaded data:", savedData);
    setEventsData({
      event_name: savedData?.event?.event_name,
      event_description: savedData?.event?.event_description || "",
      eid: savedData?.event?.eid || "",
      event_url: savedData?.event?.event_url || "",
      image: savedData?.event?.image || "",
      giftmessage: savedData?.gift_message,
      gift: savedData?.gift_amount,
      email: savedData?.event?.email || "",
      from: savedData?.event?.from || "",
      country: savedData?.event?.country || { name: "", code: "" },
    });
  }, []);

  const countries = [{ name: "Australia", code: "AU" }];
  
  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div className="!font-poppins text-[14px] !text-[#84818A]">
            {option.name}
          </div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div className="!font-poppins text-[14px] !text-[#84818A]">
          {option.name}
        </div>
      </div>
    );
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Toast ref={toast} />
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : (
        <div className="w-full max-w-[844px] h-auto  bg-[white] rounded-lg mx-auto shadow-2xl mb-[50px] pb-[50px]">
          <div className="w-full max-w-[680px] mx-auto mt-20 px-10">
            <div className="flex flex-col gap-5 mt-8">
              <p className="text-[#202020] font-poppins font-[500] text-[14px] text-center">
                {eventsData.event_name }
              </p>
              <p className="text-[#202020] font-poppins font-[500] text-[14px] text-center">
                {eventsData.event_description || "No event description"}
              </p>
              <div className="flex items-center justify-center">
                {eventsData.image ? (
                  <img src={eventsData.image} alt="Event" />
                ) : (
                  <p>No image available</p>
                )}
              </div>
              <div className="flex flex-col gap-10 mt-2">
                <FloatInputTextArea
                  id="Message"
                  label="Gift Message"
                  labelclass="!text-[#84818A] !text-[14px]"
                  className="!border-0 !border-primary !border-b !rounded-none"
                  value={eventsData.giftmessage}
                  disabled
                />
                <FloatInputNumber
                  id="Gift"
                  label="Gift ($)"
                  labelclass="!text-[#84818A] !text-[14px]"
                  className="!border-0 !border-primary !border-b !rounded-none !w-full"
                  value={eventsData.gift}
                  disabled
                />
                <div className="flex justify-between">
                  {/* <FloatInput
                    id="Email"
                    label="Email"
                    labelclass="!text-[#84818A] !text-[14px]"
                    className="!border-0 !border-primary !border-b !rounded-none"
                    value={eventsData.email}
                    disabled
                  /> */}
                  <FloatInput
                    id="From"
                    label="From"
                    labelclass="!text-[#84818A] !text-[14px]"
                    className="!border-0 !border-primary !border-b !rounded-none"
                    value={eventsData.from}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-8">
              <Dropdown
                value={eventsData.country}
                options={countries}
                optionLabel="name"
                placeholder="Select a Country"
                filter
                valueTemplate={selectedCountryTemplate}
                itemTemplate={countryOptionTemplate}
                className="w-full !border-0 !border-b-[1px] !text-[14px] !rounded-none"
                disabled
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GiftDetail;
