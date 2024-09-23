import React from "react";
import barsIcon from "../../../../src/assets/images/bars.png";
import profile from "../../../../src/assets/images/Image-profile.png";
import { SetSideBar } from "../../../core/redux/actions";
import { usedispatch, useselector } from "../../../core/redux/actions";
const Header = ({ showheading }) => {
  const dispatch = usedispatch();
  const SidebarOpen = useselector((state) => state.Sidebar.SidebarOpen);
  const userdata = JSON.parse(localStorage.getItem("user"));
  const splitRoute = () => {
    const route = window.location.pathname?.split("/");
    let routeName = route[route.length - 1]?.split("-");
    let name = "";
    routeName?.map((item) => {
      name = name + " " + item[0].toUpperCase() + item.slice(1, item.length);
    });

    return name;
  };
  return (
    <div className="flex items-center justify-between w-full mt-8">
      <div className="flex items-center gap-4">
        {window.innerWidth <= 1024 && (
          <img
            src={barsIcon}
            alt="icon"
            className="w-[21px] cursor-pointer h-[24px]"
            onClick={() => {
              dispatch(SetSideBar(!SidebarOpen));
            }}
          />
        )}

        {/* {showheading && (
          <h2 className="font-manrope text-[#18120F] text-[32px] font-bold">
            {splitRoute()}
          </h2>
        )} */}
      </div>
      <div className="flex flex-row items-center gap-3">
        <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden border border-[#979797]">
          <img src={profile} className="w-full h-full " />
        </div>
        <div className="flex flex-col ">
          <h2 className="font-manrope text-[#18120F] text-[15px] font-semibold">
            {userdata?.username}
          </h2>
          <h4 className="text-xs font-normal text-[#6B6B6B]">User</h4>
        </div>
      </div>
    </div>
  );
};

export default Header;
