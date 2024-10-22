import React, { useState, useCallback, useRef, useEffect } from "react";
import FloatInput from "../../components/ui/Inputs/FloatInput";
import FloatInputTextArea from "../../components/ui/Inputs/FloatInputTextArea";
import { Dropdown } from "primereact/dropdown";
import { useDropzone } from "react-dropzone";
import uploadFileImg from "../../assets/images/upload-file.svg";
import { UpdateEvent } from "../../core/services/event.service";
import { FrontendUrl } from "../../core/configs/index";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { GetEventById } from "../../core/services/event.service";
import { useParams } from "react-router-dom";
const EventUpdate = () => {
  const toast = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [eventData, seteventData] = useState({
    Date: "",
    URL: "",
    EventName: "",
    Description: "",
  });
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const eventurl = eventData.URL.replace(" ", "_");  // Ensure correct URL format
      let body = {
        // date: eventData.Date,
        event_name: eventData.EventName,
        image: files[0]?.preview || "",  // Using file preview
        event_description: eventData.Description,
        event_url: eventurl,
      };
      console.log(body); // Logging the body to check
      let response = await UpdateEvent(body,id );  // Make sure id and body are passed correctly
      if (response.status === 200 || response.status === 201) {
        console.log(response);
        toast.current.show({ severity: "success", detail: `Event Updated Successfully` });
      } else {
        toast.current.show({ severity: "error", detail: `Something Went Wrong` });
      }
    } catch (err) {
      toast.current.show({
        severity: "error",
        detail: `${err?.data?.message}`,
      });
    }
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const GetEventsData = async () => {
    try {
      setloading(true);
      let response = await GetEventById(id);
      if (response.status === 200) {
        setloading(false);
        console.log(response.data, "data");
        const date = response?.data?.date?.split("T")[0];
        seteventData({
          Date: date,
          URL: response?.data?.event_url,
          EventName: response?.data?.event_name,
          Description: response?.data?.event_description,
        });
        if (response?.data?.image) {
          setFiles([
            {
              path: "",
              preview: response?.data?.image,
              name: "Image.png",
            },
          ]);
        }
      } else {
        setloading(false);
      }
    } catch (err) {
      setloading(false);
    }
  };
  useEffect(() => {
    GetEventsData();
  }, []);
  return (
    <>
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
          <Toast ref={toast} />
          <div className="w-full max-w-[680px] mx-auto mt-20 px-10">
            <h1 className="font-poppins font-medium text-[36px]">
              Lets get you set up
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
                <p className="text-[#202020] font-poppins font-[500] text-[12px] ">
                  Your gifting page will expire automatically 7 days after your
                  event
                </p>
              </div>
              <div className="flex flex-col ">
                <p className="text-[#202020] font-poppins font-[500] text-[14px] ">
                  What would you like as the url for your gifting image?
                </p>
                <div className="flex items-end">
                  <p className="text-[#202020] font-poppins font-[500] text-[14px] ">
                    {FrontendUrl}
                  </p>
                  <FloatInput
                    value={eventData.URL}
                    onChange={(e) =>
                      seteventData({ ...eventData, URL: e.target.value })
                    }
                    id="URL"
                    label=""
                    labelclass="!text-[#84818A] !text-[14px]"
                    className="!border-0 !border-primary !border-b !rounded-none !pb-0 !pl-0 !text-[14px]"
                    placeholder="your_event"
                  />
                </div>
              </div>
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
              <p className="text-[#202020] font-poppins font-[500] text-[14px] ">
                We are so excited to celebrate with you! 
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
                    Upload Event Image or Banner <br />
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full h-[52px] text-[white] font-poppins font-[600] text-[16px] mt-6 bg-primary rounded-xl"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EventUpdate;
