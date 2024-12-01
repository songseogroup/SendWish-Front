import React, { useState, useRef } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import FloatInput from "../../components/ui/Inputs/FloatInput";
import PasswordInput from "../../components/ui/Inputs/PasswordInput";
import { UserSignin } from "../../core/services/auth.service";
import { Toast } from "primereact/toast";
import { setAuthToken } from "../../core/configs";

const Signin = () => {
  const navigate = useNavigate();
  const toast = useRef();

  const [userdata, setuserdata] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(userdata.email == "" ){
      toast.current.show({ severity: "error", detail: `Please Enter Email` });
    } else if (userdata.password.length == ""){
      toast.current.show({ severity: "error", detail: `Please Enter Password` });

    }
 else   if (userdata.email.length > 0 && userdata.password.length > 0) {
      try {
        let response = await UserSignin(userdata);
        if (response.status === 200 || response.status === 201) {
          const { user, message } = response.data;
          toast.current.show({ severity: "success", detail: `${message}` });

          const { accessToken, refreshToken, ...rest } = user;
          localStorage.setItem("user", JSON.stringify(rest));
          localStorage.setItem("AccessToken", accessToken);
          localStorage.setItem("RefreshToken", refreshToken);
          console.log(accessToken, refreshToken);
          setAuthToken(accessToken, refreshToken);
          localStorage.setItem("Token", accessToken);
          navigate("/dashboard");
        } else {
          toast.current.show({
            severity: "error",
            detail: `${response?.data?.message}`,
          });
        }
      } catch (err) {
        toast.current.show({
          severity: "error",
          detail: `${err?.data?.message}`,
        });
      }
    }
  };

  // const handleSuccess = (response) => {
  //   // console.log('Google ID Token:', response.credential);

  //   // Send the Google ID token to the backend
  //   fetch('http://localhost:3000/api/auth/google', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // 'Authorization':`Bearer ${response.credential}`
  //     },
  //     body: JSON.stringify({ token: `${response.credential}` }),
  //   })
  //   .then((res) => res.json())
  //   .then((data) => console.log('Backend response:', data))
  //   .catch((error) => console.error('Error:', error));
  // };
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex w-[510px] bg-primary  relative flex-col justify-between min-h-screen">
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
      <div className="w-full h-full pb-[0px] md:pb-[50px]">
        <Toast ref={toast} />
        <p className="mt-10 mr-10 text-sm font-medium text-right font-poppins">
          New user?{" "}
          <Link to="/signup" className="underline">
            Create an account
          </Link>
        </p>
        <div className="w-full px-5 md:px-0 md:w-[460px] mx-auto mt-20 md:mt-44 flex flex-col justify-between  h-full">
          <div>
            <p className="text-2xl font-medium text-black font-poppins">
              Sign in to SendWish
            </p>
            {/* <div className="flex gap-4 mt-8">
              <button className="w-full bg-blue rounded-xl h-12 font-poppins text-[white] text-sm text-center flex items-center pl-5">
                <i className="pi pi-google" style={{ fontSize: "1.2rem" }}></i>
                <span className="w-full text-center">Sign in with Google</span>
                <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
         className="google-login-button"
      />
              </button>
              <button className="flex items-center justify-center w-12 h-12 border border-gray rounded-xl">
                <i
                  className="pi pi-facebook"
                  style={{ fontSize: "1rem", color: "#4285F4" }}
                ></i>
              </button>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <div className="w-[48%] h-[1px] bg-gray"></div>
              <span className="text-gray-400 font-poppins">or</span>
              <div className="w-[48%] h-[1px] bg-gray"></div>
            </div> */}
            <div className="flex flex-col gap-7 mt-7">
              <FloatInput
                value={userdata.email}
                onChange={(e) =>
                  setuserdata({ ...userdata, email: e.target.value })
                }
                id="email"
                label="Email address"
              />
              <PasswordInput
                value={userdata.password}
                onChange={(e) =>
                  setuserdata({ ...userdata, password: e.target.value })
                }
                id="password"
                label="Password"
              />
            </div>
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm font-normal text-black font-poppins cursor-pointer" onClick={()=>{
                navigate("/reset-password")
              }}>
                Forgot password?
              </p>
              <button
                onClick={handleSubmit}
                className="w-[164px] h-[48px] flex items-center justify-center bg-primary text-[white] font-poppins text-sm rounded-xl"
              >
                Sign In
              </button>
            </div>
          </div>
          <p className="mt-4 text-xs font-normal text-gray-400 font-poppins text-right">
            {/* Protected by reCAPTCHA and subject to the{" "} */}
            <span className="text-primary cursor-pointer" onClick={()=>{navigate('/terms-and-conditions')}}>SendWish Privacy Policy</span> and{" "}
            <span className="text-primary cursor-pointer" onClick={()=>{navigate('/terms-and-conditions')}}>Terms of Service.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
