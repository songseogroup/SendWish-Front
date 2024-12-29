import React, { useState, useCallback, useEffect, useRef } from "react";
import FloatInput from "../../components/ui/Inputs/FloatInput";
import FloatInputNumber from "../../components/ui/Inputs/FloatInputNumber";
import FloatInputTextArea from "../../components/ui/Inputs/FloatInputTextArea";
import { Dropdown } from "primereact/dropdown";
import { useDropzone } from "react-dropzone";
import uploadFileImg from "../../assets/images/upload-file.svg";
import { useParams } from "react-router-dom";
import { FrontendUrl } from "../../core/configs/index";
import { GetEventById } from "../../core/services/event.service";
import { ProgressSpinner } from "primereact/progressspinner";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { createPaymentIntent } from "./../../core/services/event.service";
import { AiModal } from "../../components/Modal/AiModal";

const EventCreateS2 = () => {
  const { event_url, id } = useParams();
  const [loading, setloading] = useState(false);
  const toast = useRef();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [files, setFiles] = useState([]);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [showModal,setShowModal] = useState(false)
  const userdata = JSON.parse(localStorage.getItem("user"));
  const [eventsData, setEventsData] = useState({
    event_name: "",
    event_description: "",
    eid: "",
    event_url: "",
    image: "",
    giftmessage: "",
    gift: "",
    gift_fee:"",
    email: userdata?.email,
    from: "",
    country: { name: "", code: "" },
  });
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
  const goToProfilePage = () => {
    navigate("/checkout-page");
  };
  const GetPaymentIntent = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(id,"talha")
      const giftData = JSON.parse(localStorage.getItem("eventsData"));
      let response = await createPaymentIntent(id, {
        // userId: user.id,
        gift_amount: parseFloat(giftData.gift),
        gift_fee : parseFloat(((giftData.gift * 0.07)).toFixed(2)),

      });
      
      setPaymentIntent(response.data);
      console.log("Payment Intent:", response);
      if(response.data.status == 400){
        toast.current.show({
          severity: "error",
          detail: response.data.message,
        });
        return
      }
      localStorage.setItem("paymentIntent", JSON.stringify(response.data));
      goToProfilePage()
    } catch (err) {
      console.error("Error fetching payment intent:", err);
      toast.current.show({
        severity: "error",
        detail: response.data.message,
      });
    }
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
  const GetEventsData = async () => {
    try {
      setloading(true);
      let response = await GetEventById(id);
      if (response.status === 200) {
        setloading(false);
        console.log(response,"stuop")
        const ownerdata = response.data.owner;

        if (ownerdata?.email === userdata?.email) {
          navigate(`/events/${response?.data?.eid}`);
        }

        setEventsData({
          ...eventsData,
          ...response.data,
          email: userdata?.email,
        });
      } else {
        setloading(false);
      }
    } catch (err) {
      setloading(false);
    }
  };
  // const handleNext = (e) => {
  //   e.preventDefault();
  //   if (
  //     eventsData?.event_description?.length > 0 &&
  //     eventsData?.from?.length > 0 &&
  //     eventsData?.email?.length > 0 &&
  //     eventsData?.gift > 0 &&
  //     eventsData?.giftmessage?.length > 0 &&
  //     eventsData.country !== ""
  //   ) {
  //     localStorage.setItem("eventsData", JSON.stringify(eventsData));
  //     console.log(eventsData, "eventsData");
  //     GetPaymentIntent();
  //     // setTimeout(goToProfilePage, 3000);
  //   } else {
      // toast.current.show({
      //   severity: "error",
      //   detail: `All Fields Are Required`,
      // });
  //   }
  // };
  const handleNext = (e) => {
    e.preventDefault();
    const errors = [];
    
    // if (!eventsData?.event_description || eventsData.event_description.length === 0) {
    //   // errors.push("");
    //   toast.current.show({
    //     severity: "error",
    //     detail: `Please Enter Message`,
    //   });
    // }
      if (!eventsData?.giftmessage || eventsData.giftmessage == "") {
      // errors.push("Gift message is required");
      toast.current.show({
        severity: "error",
        detail: `Please Enter Message`,
      });
      return
    }else
    if (!eventsData?.gift || eventsData.gift == 0) {
      // errors.push("Gift amount should be greater than zero");
      toast.current.show({
        severity: "error",
        detail: `Enter Gift Amount`,
      });
      return
    }else
    if (!eventsData?.gift || eventsData.gift < 20) {
      // errors.push("Gift amount should be greater than zero");
      toast.current.show({
        severity: "error",
        detail: `Gift amount should be greater than 20`,
      });
      return
    }else
    if (!eventsData?.email || eventsData.email.length === 0) {
      // errors.push("Email is required");
      toast.current.show({
        severity: "error",
        detail: `Enter Your Email`,
      });
      return
    }else
    if (!eventsData?.from || eventsData.from.length === 0) {
      // errors.push("Sender name is required");
      toast.current.show({
        severity: "error",
        detail: `Enter Your Name`,
      });
      return
    }else
  
  
  
    if (!eventsData?.country?.name  || eventsData.country.name === "") {
      // errors.push("Country is required");
      toast.current.show({
        severity: "error",
        detail: `Country is required`,
      });
      return 
    }
  
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.current.show({
          severity: "error",
          detail: error,
        });
      });
    } else {
      localStorage.setItem("eventsData", JSON.stringify(eventsData));
      console.log(eventsData, "eventsData");
      GetPaymentIntent();
      // setTimeout(goToProfilePage, 3000);
    }
  };
  
  useEffect(() => {
    GetEventsData();
  }, []);
   const setNewMessage = (message)=>{
    setEventsData({
      ...eventsData,
      giftmessage: message,
    })
   }
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
              <p className="text-[#202020] font-poppins font-[500] text-[14px] text-center ">
                {eventsData?.event_name}
              </p>
              <p className="text-[#202020] font-poppins font-[500] text-[14px] text-center">
                {eventsData?.event_description}
              </p>
              <div className="flex items-center justify-center">
                <img src={eventsData.image} alt="image" />
              </div>
              <div className="flex flex-col gap-10 mt-2">
               <button style={{color:"white"}}  className="text-white bg-primary rounded-xl  font-poppins py-2" onClick={()=>{setShowModal(true)}}>
                   Generate message
               </button>
                <FloatInputTextArea
                  id="Message*"
                  label="Gift Message*"
                  labelclass="!text-[#84818A] !text-[14px]"
                  className="!border-0 !border-primary !border-b !rounded-none "
                  value={eventsData.giftmessage}
                  onChange={(e) =>
                    setEventsData({
                      ...eventsData,
                      giftmessage: e.target.value,
                    })
                  }
                />
                <FloatInputNumber
                  id="Gift"
                  label="Gift ($)*"
                  placeholder="20$"
                  // min="20"
                  labelclass="!text-[#84818A] !text-[14px]"
                  className="!border-0 !border-primary !border-b !rounded-none !w-full"
                  value={eventsData.gift}
                  onChange={(e) =>
                    setEventsData({ ...eventsData, gift: e.value })
                  }
                />
                <div className="flex justify-between ">
                  <FloatInput
                    // disabled={true}
                    id="Email"
                    label="Email*"
                    labelclass="!text-[#84818A] !text-[14px]"
                    className="!border-0 !border-primary !border-b !rounded-none"
                    value={eventsData.email}
                    onChange={(e) =>
                      setEventsData({ ...eventsData, email: e.target.value })
                    }
                  />
                  <FloatInput
                    id="From"
                    label="From*"
                    labelclass="!text-[#84818A] !text-[14px]"
                    className="!border-0 !border-primary !border-b !rounded-none "
                    value={eventsData.from}
                    onChange={(e) =>
                      setEventsData({ ...eventsData, from: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-8">
              <Dropdown
                value={eventsData.country}
                onChange={(e) => {
                  setEventsData({ ...eventsData, country: e.value });
                }}
                options={countries}
                optionLabel="name"
                placeholder="Select a Country*"
                filter
                valueTemplate={selectedCountryTemplate}
                itemTemplate={countryOptionTemplate}
                className="w-full !border-0 !border-b-[1px] !text-[14px]
              !rounded-none"
              />
            </div>

            <button
              onClick={handleNext}
              className="w-full h-[52px] text-[white] font-poppins font-[600] text-[16px] !mt-8 bg-primary rounded-xl"
            >
              Next
            </button>
          </div>
          <>
            <AiModal isOpen={showModal} onClose={()=>{setShowModal(false)}} setNewMessage={setNewMessage}/>
          </>
        </div>
      )}
    </>
  );
};

export default EventCreateS2;
