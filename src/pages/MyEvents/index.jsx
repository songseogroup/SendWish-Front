import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { GetUserEvent } from "../../core/services/event.service";
import { CustomMenu } from "../../global.styles";
import { FrontendUrl } from "../../core/configs";
import dotImg from "../../assets/icons/dots.svg";
import { ProgressSpinner } from "primereact/progressspinner";
import { DeleteEvent } from "../../core/services/event.service";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast"; // Import toast for notifications
import { CopyToClipboard } from "react-copy-to-clipboard"; // Import CopyToClipboard component
import { FaCopy, FaEdit, FaGift } from "react-icons/fa"; // Copy, Edit, Delete icons

const MyEvents = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null); // Toast ref for showing notifications
  const navigate = useNavigate();

  const GetEvents = async () => {
    try {
      setLoading(true);
      let response = await GetUserEvent();

      if (response.status === 200) {
        setLoading(false);
        let events = response?.data?.data?.map((item) => {
          let date = item?.date?.split("T")[0];
          return {
            ...item,
            event_url: `${FrontendUrl}event/${item.event_url}/${item.eid}`,
            date: `${date}`,
          };
        });
        setProducts(events || []);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    let response = await DeleteEvent(id);
    toast.current.show({
      severity: "error",
      detail: `${response.data}`,
    });
  };

  const EditEvent = (id) => {
    navigate(`/events/${id}`);
  };

  const ShowGifts = (id) => {
    navigate(`/event-gifts/${id}`);
  };

  // Remove MenuBodyTemplate and related menu code, replace with action buttons
  const ActionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2 items-center justify-center">
        <button
          className="flex items-center gap-1 px-2 py-1 rounded border-2 border-blue-400 bg-blue-50 text-blue-700 font-semibold transition text-xs
          hover:bg-blue-500 hover:border-blue-700 hover:text-white focus:outline-none
          !bg-blue-50 !border-blue-400 !text-blue-700 hover:!bg-blue-500 hover:!border-blue-700 hover:!text-white"
          onClick={() => EditEvent(rowData.eid)}
          title="Edit Event"
        >
          <FaEdit /> Edit
        </button>
        <button
          className="flex items-center gap-1 px-2 py-1 rounded border-2 border-red-400 bg-red-50 text-red-700 font-semibold transition text-xs
          hover:bg-red-500 hover:border-red-700 hover:text-white focus:outline-none
          !bg-red-50 !border-red-400 !text-red-700 hover:!bg-red-500 hover:!border-red-700 hover:!text-white"
          onClick={() => ShowGifts(rowData.eid)}
          title="Show Gifts"
        >
          <FaGift /> Show Gifts
        </button>
        <CopyToClipboard text={rowData.event_url} onCopy={() => copyUrlToClipboard(rowData.event_url)}>
          <button
            className="flex items-center gap-1 px-2 py-1 rounded border-2 border-green-400 bg-green-50 text-green-700 font-semibold transition text-xs
            hover:bg-green-500 hover:border-green-700 hover:text-white focus:outline-none
            !bg-green-50 !border-green-400 !text-green-700 hover:!bg-green-500 hover:!border-green-700 hover:!text-white"
            title="Copy Link"
          >
            <FaCopy /> Copy
          </button>
        </CopyToClipboard>
      </div>
    );
  };

  // Function to copy the event URL
  const copyUrlToClipboard = (url) => {
    toast.current.show({ severity: "success", detail: "Link copied!" });
  };

  const UrlBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <p>{rowData.event_url}</p>
      </div>
    );
  };

  // Function to show amount_collected or 0 if empty
  const AmountCollectedBodyTemplate = (rowData) => {
    return <span>{rowData.amount_collected ? rowData.amount_collected : 0}</span>;
  };

  useEffect(() => {
    GetEvents();
  }, []);

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
        <div className="border rounded-lg mt-20 border-[#EBF0ED] ">
          <DataTable value={products} dataKey="eid" className="w-full">
            <Column field="eid" header="Event ID" style={{ minWidth: "5rem" }} bodyClassName="text-center" headerClassName="text-center" />
            <Column field="event_name" header="Event Name" style={{ minWidth: "6rem" }} bodyClassName="text-center" headerClassName="text-center" />
            <Column body={UrlBodyTemplate} header="URL" style={{ minWidth: "10rem" }} bodyClassName="text-center" headerClassName="text-center" />
            <Column field="date" header="Event Date" style={{ minWidth: "10rem" }} bodyClassName="text-center" headerClassName="text-center" />
            <Column body={AmountCollectedBodyTemplate} header="Received ($)" style={{ minWidth: "10rem" }} bodyClassName="text-center" headerClassName="text-center" />
            <Column body={ActionBodyTemplate} header="Actions" style={{ minWidth: "12rem" }} bodyClassName="text-center" headerClassName="text-center" />
          </DataTable>
        </div>
      )}
    </>
  );
};

export default MyEvents;
