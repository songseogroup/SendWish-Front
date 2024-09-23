import React from "react";
import Sidebar from "../../Sidebar";
import Header from "../../header/index";
const DashboardLayout = ({ showheading = true, children }) => {
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
