import React, { useState, useCallback, useRef } from "react";
import FloatInput from "../../components/ui/Inputs/FloatInput";
import FloatInputTextArea from "../../components/ui/Inputs/FloatInputTextArea";
import { Dropdown } from "primereact/dropdown";
import { useDropzone } from "react-dropzone";
import uploadFileImg from "../../assets/images/upload-file.svg";
import { CreateEvent } from "../../core/services/event.service";
import { FrontendUrl } from "../../core/configs/index";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { AiCreator } from "../../components/Modal/AiCreator";
const EventCreate = () => {
  const toast = useRef();
  const navigate = useNavigate();
  const [showModal,setShowModal] = useState(false)
  const [eventData, seteventData] = useState({
    Date: "",
    URL: "",
    EventName: "",
    Description: "",
  });
  const [files, setFiles] = useState([]);
  const setNewMessage = (message)=>{
    seteventData({
      ...eventData,
      Description: message,
    })
   }
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const objectToFormData = (obj, form, namespace) => {
    let formData = form || new FormData();

    for (let property in obj) {
      if (!obj.hasOwnProperty(property)) {
        continue;
      }

      let formKey = namespace ? `${namespace}[${property}]` : property;

      if (
        typeof obj[property] === "object" &&
        !(obj[property] instanceof File)
      ) {
        // If the property is an object and not a File, recurse
        objectToFormData(obj[property], formData, formKey);
      } else {
        // Otherwise, append the property to the FormData object
        formData.append(formKey, obj[property]);
      }
    }

    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (eventData.Date == ""){
      toast.current.show({
        severity: "error",
        detail: `Please Enter Date`,
      });
    }else    if (eventData.URL == ""){
      toast.current.show({
        severity: "error",
        detail: `Please Enter URL`,
      });
    } else    if (eventData.EventName == ""){
      toast.current.show({
        severity: "error",
        detail: `Please Enter Event Name`,
      });
    }else    if (eventData.Description == ""){
      toast.current.show({
        severity: "error",
        detail: `Please Enter Event Message`,
      });
    }else if ( files.length ==  0){
      console.log(files)
      toast.current.show({
        severity: "error",
        detail: `Please Upload Image`,
      });
    }else {
      console.log(files)
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const eventurl = eventData.URL.replace(" ", "_");
      let body = {
        date: eventData.Date,
        event_name: eventData.EventName,
        image: files[0]?.preview || "",
        event_description: eventData.Description,
        event_url: eventurl,
        userId: user?.id,
      };
      const formData = new FormData();
      formData.append("date", eventData.Date);
      formData.append("event_name", eventData.EventName);
      formData.append("event_description", eventData.Description);
      formData.append("event_url", eventurl);
      formData.append("userId", user?.id);
      formData.append("image", files[0]);

      let response = await CreateEvent(formData);
      if (response.status === 200 || response.status === 201) {
        toast.current.show({
          severity: "success",
          detail: `Event Created Successfully`,
        });
        navigate("/my-events");
      } else {
        toast.current.show({
          severity: "error",
          detail: `Something Went Wrong`,
        });
      }
    } catch (err) {
      toast.current.show({
        severity: "error",
        detail: `${err?.data?.message}`,
      });
    }}
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="w-full mt-[50px] max-w-[844px] h-auto  bg-[white] rounded-lg mx-auto shadow-2xl mb-[50px] pb-[50px]">
      <Toast ref={toast} />
      <div className="w-full max-w-[500px] mx-auto mt-5 md:mt-10 px-10">
        <h1 className="font-poppins font-medium text-[24px] md: mb-10 text-center">
         Create Your Event
        </h1>
        <div className="flex flex-col gap-5 mt-8">
          <div className="flex flex-col gap-2">
            <p className="text-[#202020] font-poppins font-[500] text-[14px] ">
              When is your event?
            </p>
            <FloatInput
              value={eventData.Date}
              onChange={(e) =>
                seteventData({ ...eventData, Date: e.target.value })
              }
              id="Date"
              labelclass="!text-[#84818A] !text-[14px]"
              className="!border-0 !border-primary !border-b !rounded-none text-[14px]"
              type="date"
            />
            <p className="text-[#202020] font-poppins font-[500] text-[10px] ">
              Your gifting page will expire automatically 7 days after your
              event
            </p>
          </div>
          <div className="flex flex-col ">
            <p className="text-[#202020] font-poppins font-[500] text-[14px] mb-5">
              {/* What would you like as the url for your gifting image? */}
              Create Your Own URL
            </p>
            <FloatInput
              value={eventData.URL}
              onChange={(e) =>
                seteventData({ ...eventData, URL: e.target.value })
              }
              id="URL"
              label="Event Url"
              labelclass="!text-[#84818A] !text-[14px]"
              className="!border-0 !border-primary !border-b !rounded-none !pb-0 !pl-0 !text-[14px] "
            />
          </div>
          <p className="text-[#202020] font-poppins font-[500] text-[14px] ">
            Event Name
          </p>
          <FloatInput
            value={eventData.EventName}
            onChange={(e) =>
              seteventData({ ...eventData, EventName: e.target.value })
            }
            id="EventName"
            label="Event Name"
            labelclass="!text-[#84818A] !text-[14px]"
            className="!border-0 !border-primary !border-b !rounded-none mt-3"
          />

         
          <button style={{color:"white"}}  className="text-white bg-primary rounded-xl  font-poppins py-2" onClick={()=>{setShowModal(true)}}>
                   Generate message
               </button>
               <p className="text-[#202020] font-poppins font-[500] text-center text-[14px] ">
               <span className="text-center">or</span>
<br></br>
            Write Your Message
          </p>
          <div className="flex flex-col gap-10 ">
    
                <FloatInputTextArea
                   value={eventData.Description}
              onChange={(e) =>
                seteventData({ ...eventData, Description: e.target.value })
              }
              id="Description"
              label="Description"
              labelclass="!text-[#84818A] !text-[14px]"
              className="!border-0 !border-primary !border-b !rounded-none "
                />
          </div>
        </div>

        <div {...getRootProps()} className="mt-5">
          <input {...getInputProps()} />
          {files?.length > 0 ? (
            <div className="flex items-start justify-center mt-4">
              {files.map((file) => (
                <div key={file.name} className="my-2">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="max-w-xs max-h-40"
                  />
                  <p className="text-center font-poppins text-[12px]">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full gap-3">
              <img src={uploadFileImg} alt="img" />
              <p className="font-poppins text-[13px] font-[500] text-center">
              Upload Event Image *<br />
              </p>
              {/* <button className="bg-primary !px-[42px] py-[9px] rounded-xl font-poppins text-[white] font-[500]">
          Browse Files
        </button> */}
            </div>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full h-[52px] text-[white] font-poppins font-[600] text-[16px] mt-6 bg-primary rounded-xl"
        >
          Save
        </button>
      </div>
      <>
      <>
            <AiCreator isOpen={showModal} onClose={()=>{setShowModal(false)}} setNewMessage={setNewMessage} date={eventData}/>
          </>
      </>
    </div>

  );
};

export default EventCreate;
