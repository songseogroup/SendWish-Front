import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { GetUserEvent } from "../../core/services/event.service";
import { CustomMenu } from "../../global.styles";
import { FrontendUrl } from "../../core/configs";
import dotImg from "../../assets/icons/dots.svg";
import { ProgressSpinner } from "primereact/progressspinner";
import {DeleteEvent} from "../../core/services/event.service"
import { useNavigate } from "react-router-dom";
const MyEvents = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const GetEvents = async () => {
    try {
      setloading(true);
      let response = await GetUserEvent();

      if (response.status === 200) {
        setloading(false);
        let events = response?.data?.data?.map((item) => {
          let date = item?.date?.split('T')[0]
          return {
            ...item,
            event_url: `${FrontendUrl}create-event/${item.event_url}/${item.eid}`,
            date:`${date}`
          };
        });
        setproducts(events || []);
      } else {
        setloading(false);
      }
    } catch (err) {
      setloading(false);
    }
  };
  const deleteEvent =async (id) => {
    console.log(id, "id");
    let response = await DeleteEvent(id);
    console.log(response)
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

          template: () => {
            return (
              <div
                className="flex gap-1 items-center justify-center  text-[13px] font-[400] text-[#21212]"
                onClick={() => {
                  ShowGifts(rowData.eid);
                }}
              >
                All Gifts
              </div>
            );
          },
        },
        {
          label: "Edit Event",

          template: () => {
            return (
              <div
                className="flex gap-1 items-center justify-center  text-[13px] font-[400] text-[#21212]"
                onClick={() => {
                  EditEvent(rowData.eid);
                }}
              >
                Edit
              </div>
            );
          },
        },
        // {
        //   label: "Delete Event",

        //   template: () => {
        //     return (
        //       <div
        //         className="flex gap-1 items-center justify-center  text-[13px] font-[400] text-[#21212]"
        //         onClick={() => {
        //           deleteEvent(rowData.eid);
        //         }}
        //       >
        //         Delete
        //       </div>
        //     );
        //   },
        // },
      ];

      return (
        <>
          <CustomMenu
            popupAlignment="left"
            height={"80px"}
            model={items}
            popup
            ref={menuRef}
            id="popup_menu_left"
          />
        </>
      );
    };
    const menuLeftRef = useRef(null);
    const handleClick = (event) => {
      event.preventDefault();
      menuLeftRef.current?.toggle(event);
    };
    return (
      <>
        <div
          className={`px-[14px] py-[4px]   relative  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <div onClick={handleClick} className="flex items-center gap-2 cursor-pointer">
            <div className="w-[5px] h-[5px] rounded-[50%] bg-primary"></div>
            <div className="w-[5px] h-[5px] rounded-[50%] bg-primary"></div>
            <div className="w-[5px] h-[5px] rounded-[50%] bg-primary"></div>
          </div>
         

          <MenuTemplate id={rowData.eid} menuRef={menuLeftRef} />
        </div>
      </>
    );
  };
  useEffect(() => {
    GetEvents();
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
        <div className="border rounded-lg mt-20 border-[#EBF0ED] ">
          <DataTable value={products} dataKey="eid" className="w-full">
            <Column
              field="eid"
              header="event_name"
              style={{ minWidth: "5rem" }}
            ></Column>
            <Column
              field="event_name"
              header="Name"
              style={{ minWidth: "6rem" }}
            ></Column>
            <Column
              field="event_url"
              header="URL"
              style={{ minWidth: "10rem" }}
            ></Column>
            {/* <Column
              field="event_description"
              header="DESCRIPTION"
              style={{ minWidth: "16rem" }}
            ></Column> */}
            <Column
              field="date"
              header="EVENT DATE"
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="amount_collected"
              header="COLLECTED AMOUNT"
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column body={MenuBodyTemplate}></Column>
          </DataTable>
        </div>
      )}
    </>
  );
};

export default MyEvents;
