import React, { useState, useEffect } from "react";
import logocard from "../../../assets/images/logo-card.png";
import dashboardicon from "../../../assets/images/dashboardicon.png";
import gifticon from "../../../assets/images/gift-icon.png";
import calendoricon from "../../../assets/images/calendor-icon.png";
import { Link } from "react-router-dom";
import calend from "../../../assets/images/calend.png"
import password from "../../../assets/images/password.png"
import { SetSideBar } from "../../../core/redux/actions";
import { usedispatch, useselector } from "../../../core/redux/actions";
const Sidebar = () => {
  const dispatch = usedispatch();
  const SidebarOpen = useselector((state) => state.Sidebar.SidebarOpen);
  console.log(SidebarOpen, "SidebarOpen");
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  };
  const [menulist, setmenulist] = useState([
    {
      name: "MENU",
      list: [
        {
          img: dashboardicon,
          name: "Dasboard",
          link: "/dashboard",
          active: false,
        },
        { img: gifticon, name: "My Gifts", link: "/my-gifts", active: false },
        {
          img: calendoricon,
          name: "Create Event",
          link: "/create-event",
          active: false,
        },
        { name: "My Events", link: "/my-events", active: false , img : calend},
        // { name: "Update Bank Account", link: "", active: false },
        { name: "Update Password", link: "/update-password", active: false,img:password },
      ],
    },
    // {
    //   name: "OTHER",
    //   list: [
    //     { name: "Settings", link: "", active: false },

    //   ],
    // },
  ]);
  useEffect(() => {
    function handleResize() {
      console.log(window.innerWidth, "window.innerWidth");
      if (window.innerWidth > 1024) {
        dispatch(SetSideBar(true));
      } else {
        dispatch(SetSideBar(false));
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className={`w-[320px] z-50 h-[97vh] bg-primary pl-4 flex flex-col  rounded-3xl m-4 fixed transition-all ${
        SidebarOpen ? "ml-[16px]" : "ml-[-350px]"
      }`}
    >
      <div className="relative flex justify-start gap-2 mt-6">
        <img src={logocard} alt="img" />
        <p className="text-[28px] text-[white] font-bold font-railway">
          SendWish
        </p>
        {window.innerWidth <= 1024 && (
          <span
            onClick={() => {
              dispatch(SetSideBar(false));
            }}
            className="absolute text-[18px] cursor-pointer text-[white] font-poppins right-5"
          >
            X
          </span>
        )}
      </div>
      <div className="relative flex flex-col h-full gap-10 pl-4 mt-10">
        {menulist.map((item, index) => {
          return (
            <div key={index}>
              <p className="text-sm font-semibold text-gray-100 font-manrope">
                {item?.name}
              </p>
              {item?.list && item?.list?.length > 0 && (
                <div className="flex flex-col gap-7 mt-7">
                  {item?.list?.map((listitem, listindex) => {
                    return (
                      <div key={listindex} className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-[20px]">
                            <img src={listitem?.img} className="w-[20px]" />
                          </div>
                          <Link to={listitem?.link} onClick={listitem?.action}>
                            <h3 className="font-manrope font-medium text-lg text-[white]">
                              {listitem?.name}
                            </h3>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        <h3
          onClick={handleLogout}
          className="font-manrope cursor-pointer absolute bottom-10 left-[6.5rem] text-center font-medium text-lg text-[white]"
        >
          Logout
        </h3>
      </div>
    </div>
  );
};

export default Sidebar;
