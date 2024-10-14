import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { ProgressSpinner } from "primereact/progressspinner";
import { Link } from "react-router-dom";
import { UserSignupVerify } from "../../core/services/auth.service";
import { Toast } from "primereact/toast";
import { setAuthToken } from "../../core/configs";

const SignupVerify = () => {
  const [loader, setloader] = useState(false);
  const { accessToken, refreshToken } = useParams();
  const [verified, setverified] = useState("");
 console.log(accessToken,refreshToken,"askasasdasa")
  const toast = useRef();
  const verifySignup = async () => {
    try {
      setAuthToken(accessToken, refreshToken);
      setloader(true);
      localStorage.setItem("AccessToken", accessToken);
      localStorage.setItem("RefreshToken", refreshToken);
      let response = await UserSignupVerify(accessToken);
      if (response.status === 201 || response.status === 200) {
        setloader(false);

        setverified(response?.data?.message);
      } else {
        setloader(false);
      }
    } catch (error) {
      setloader(false);
    }
  };
  useEffect(() => {
    verifySignup();
  }, []);
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
          <Link to="" className="underline">
            Get Help
          </Link>
        </p>
      </div>
      <div className="w-full h-full ">
        <p className="mt-10 mr-10 text-sm font-medium text-right font-poppins">
          
          <Link to="/signin" className="underline">
          Go Back to login page?
          </Link>
        </p>
        <div className="flex flex-col items-center justify-center w-full mx-auto mt-44 ">
          {loader ? (
            <ProgressSpinner />
          ) : (
            <>
              {verified?.length > 0 && (
                <div className="flex items-center gap-5">
                  <i className="pi pi-thumbs-up-fill !text-[#39D2C0] text-[40px]"></i>
                  <h1 className="font-poppins text-[36px]">User Verified</h1>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupVerify;
