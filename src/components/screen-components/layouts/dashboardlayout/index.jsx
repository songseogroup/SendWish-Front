import React from "react";
import Sidebar from "../../Sidebar";
import { useDispatch } from "react-redux";
import Header from "../../header/index";
import { SetSideBar } from "../../../../core/redux/actions";

const DashboardLayout = ({ showheading = true, children }) => {
 const dispatch = useDispatch()
  const handleMenuItemClick = () => {
    if (window.innerWidth <= 1024) {
      dispatch(SetSideBar(false));  // Close sidebar when a menu item is clicked on mobile
    }
  };
  return (
    <div className="flex  h-auto min-h-[100vh]   bg-[#FFFEEC] overflow-x-hidden">
      <Sidebar />
      <div className="flex flex-col ml-6 lg:ml-[370px] mr-[2rem] overflow-x-hidden w-full">
        <Header showheading={showheading} />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
