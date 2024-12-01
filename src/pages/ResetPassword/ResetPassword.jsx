import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { ProgressSpinner } from "primereact/progressspinner";
import FloatInput from "../../components/ui/Inputs/FloatInput";
import { Link, useNavigate } from "react-router-dom";
import { ForgetPassword } from "../../core/services/auth.service";
import { Toast } from "primereact/toast";
import { setAuthToken } from "../../core/configs";

const ResetPassword = () => {
  const [loader, setloader] = useState(false);
  const { accessToken, refreshToken } = useParams();
  const [email, setEmail] = useState("");
  const navigate =  useNavigate()
  const toast = useRef();
  const ForgetPasswordFunc = async () => {
    try {
      // setAuthToken(accessToken, refreshToken);
      setloader(true);
      // localStorage.setItem("AccessToken", accessToken);
      // localStorage.setItem("RefreshToken", refreshToken);
      let response = await ForgetPassword({email:email});
      if (response.status === 201 || response.status === 200) {
        setloader(false);
        navigate("/signin")

        setverified(response?.data?.message);
      } else {
        setloader(false);
      }
    } catch (error) {
      setloader(false);
    }
  };
  // useEffect(() => {
  //   verifySignup();
  // }, []);
  return (
    <div className="flex min-h-[100vh] h-full">
      <Toast ref={toast} />
      <div className="w-[510px] bg-primary  relative flex flex-col justify-between min-h-[100vh] h-full">
        <div className="flex flex-col items-center justify-center gap-5 mt-44">
          <img src={logo} alt="img" className="w-[280px]" />
          <p className="font-poppins text-4xl font-medium text-[white] text-center">
            Gifting Made Easy
          </p>
        </div>
        <p className=" text-sm font-medium text-[white] text-center font-poppins mb-16">
          Having troubles?{" "}
          <Link to="/signup-guide" className="underline">
            Get Help
          </Link>
        </p>
      </div>
      <div className="w-full h-[100vh]  flex flex-col justify-between align-center">
        <p className="mt-10 mr-10 text-sm font-medium text-right font-poppins">
          <Link to="/signin" className="underline">
          Go Back to login page?
          </Link>
        </p>

        <div className="flex flex-col items-center justify-center w-full mx-auto ">
          {loader ? (
            <ProgressSpinner />
          ) : (
            <>
                 <div>
                 <h3 className="mb-6 text-sm font-medium text-center font-poppins">Reset Your Password</h3>
                 <FloatInput
                 value={email}
                onChange={(e) =>
                   setEmail(e.target.value)
                 }
                id="email"
                 label="Email address"
               />
                 <button
                type="submit"
                onClick={()=>{
                  ForgetPasswordFunc({email:email})
                }}
                 className=" mt-5 w-[100px] mx-auto h-[48px] flex items-center justify-center  bg-primary text-[white] font-poppins text-sm rounded-xl"
              >
                 Reset
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

export default ResetPassword;
