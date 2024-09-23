import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { ProgressSpinner } from "primereact/progressspinner";
// import PasswordInput from "../../components/ui/Inputs/FloatInput";
import { Link, useNavigate } from "react-router-dom";
import { UpdatePasswords } from "../../core/services/auth.service";
import PasswordInput from "../../components/ui/Inputs/PasswordInput";

import { Toast } from "primereact/toast";
import Sidebar from "./../../components/screen-components/Sidebar";
import { current } from "@reduxjs/toolkit";

const UpdatePassword = () => {
  const [loader, setloader] = useState(false);
  const [oldPassword  , setOldPassword ] = useState("");
  const [newPassword  , setNewPassword ] = useState("");
  const [newPassword2 , setNewPassword2] = useState("")
  const navigate =  useNavigate()
  const toast = useRef();
  const UpdatePass = async () => {
    try {
      // setAuthToken(accessToken, refreshToken);
      setloader(true);
      // localStorage.setItem("AccessToken", accessToken);
      // localStorage.setItem("RefreshToken", refreshToken);
      if (newPassword == newPassword2  &&
        oldPassword.length > 0 && newPassword.length > 0 && newPassword2.length > 0 ){
          let response = await UpdatePasswords({currentPassword:oldPassword,newPassword:newPassword});
          if (response.status === 201 || response.status === 200) {
            setloader(false);
            // setverified(response?.data?.message);
            toast.current.show({
                severity: "success",
                detail: `Password Updated Successfully`,
              });
          } else {
            setloader(false);
          }
      }else {
        toast.current.show({
            severity: "error",
            detail: `New Password does not match`,
          });
          setloader(false);
      }
    
    } catch (error) {
        toast.current.show({ severity: "error", detail: `${error.response.data.error}` });
        console.log(error.response.data.error,"errororororroereoreore")
      setloader(false);
    }
  };
  // useEffect(() => {
  //   verifySignup();
  // }, []);
  return (
    <div className="flex min-h-[100vh] h-full">
      <Toast ref={toast} />
      <div className="w-full h-[100vh]  flex flex-col justify-between align-center">
       {/*  */}

        <div className="flex flex-col items-center justify-center w-full mx-auto mt-[100px]">
          {loader ? (
            <ProgressSpinner />
          ) : (
            <>
                 <div>
                 <h3 className="mb-6 text-sm font-medium text-center font-poppins">Update Your Password</h3>
                 <PasswordInput
                 value={oldPassword}
                onChange={(e) =>
                   setOldPassword(e.target.value)
                 }
                id="password"
                 label="Current Password"
               />
                      <PasswordInput
                 value={newPassword}
                onChange={(e) =>
                    setNewPassword(e.target.value)
                 }
                id="npassword"
                 label="New Password"
                 className="my-2"
               />
                      <PasswordInput
                 value={newPassword2}
                onChange={(e) =>
                    setNewPassword2(e.target.value)
                 }
                id="n2password"
                 label="New Password"
               />
                 <button
                type="submit"
                onClick={()=>{
                  UpdatePass({currentPassword:oldPassword,newPassword:newPassword})
                }}
                 className=" mt-5 w-[100px] mx-auto h-[48px] flex items-center justify-center  bg-primary text-[white] font-poppins text-sm rounded-xl"
              >
                 Update
               </button>
                 </div>
            </>
          )}
        </div>
         <div className="p-4"> 
                <p className="font-poppins text-[36px] text-white"></p>
         </div>

      </div>
    </div>
  );
};

export default UpdatePassword;
