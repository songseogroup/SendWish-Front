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
import { FaCopy } from "react-icons/fa"; // Copy icon

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

  const MenuBodyTemplate = (rowData) => {
    const MenuTemplate = ({ menuRef, id }) => {
      const items = [
        {
          label: "Show Gifts",
          template: () => (
            <div
              className="flex gap-1 items-center justify-center text-[13px] font-[400] text-[#21212]"
              onClick={() => ShowGifts(rowData.eid)}
            >
              All Gifts
            </div>
          ),
        },
        {
          label: "Edit Event",
          template: () => (
            <div
              className="flex gap-1 items-center justify-center text-[13px] font-[400] text-[#21212]"
              onClick={() => EditEvent(rowData.eid)}
            >
              Edit
            </div>
          ),
        },
      ];

      return (
        <CustomMenu
          popupAlignment="left"
          height={"80px"}
          model={items}
          popup
          ref={menuRef}
          id="popup_menu_left"
        />
      );
    };

    const menuLeftRef = useRef(null);
    const handleClick = (event) => {
      event.preventDefault();
      menuLeftRef.current?.toggle(event);
    };

    return (
      <div className="px-[14px] py-[4px] relative flex justify-center items-center rounded-[5px] text-[12px]">
        <div onClick={handleClick} className="flex items-center gap-2 cursor-pointer">
          <div className="w-[5px] h-[5px] rounded-[50%] bg-primary"></div>
          <div className="w-[5px] h-[5px] rounded-[50%] bg-primary"></div>
          <div className="w-[5px] h-[5px] rounded-[50%] bg-primary"></div>
        </div>
        <MenuTemplate id={rowData.eid} menuRef={menuLeftRef} />
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
      {/* href={rowData.event_url} target="_blank" rel="noopener noreferrer" */}
        <p >
          {rowData.event_url}
        </p>
        <CopyToClipboard text={rowData.event_url} onCopy={() => copyUrlToClipboard(rowData.event_url)}>
          <button className="text-blue-500">
            <FaCopy />
          </button>
        </CopyToClipboard>
      </div>
    );
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
            <Column field="eid" header="Event ID" style={{ minWidth: "5rem" }}></Column>
            <Column field="event_name" header="Event Name" style={{ minWidth: "6rem" }}></Column>
            <Column body={UrlBodyTemplate} header="URL" style={{ minWidth: "10rem" }}></Column>
            <Column field="date" header="Event Date" style={{ minWidth: "10rem" }}></Column>
            <Column field="amount_collected" header="Received ($)" style={{ minWidth: "10rem" }}></Column>
            <Column body={MenuBodyTemplate}></Column>
          </DataTable>
        </div>
      )}
    </>
  );
};

export default MyEvents;
