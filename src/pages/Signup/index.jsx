import React, { useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link,useNavigate } from "react-router-dom";
import FloatInput from "../../components/ui/Inputs/FloatInput";
import PasswordInput from "../../components/ui/Inputs/PasswordInput";
import { Checkbox } from "primereact/checkbox";
import { UserSignup } from "../../core/services/auth.service";
import { Toast } from "primereact/toast";
const Signup = () => {
  const [checked, setChecked] = useState(false);
  const toast = useRef();
  const [userdata, setuserdata] = useState({
    username: "",
    email: "",
    password: "",
  });
   const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

  if(userdata.email.length == ""){
      toast.current.show({ severity: "error", detail: `Please Enter Email` });
    }else if(userdata.password.length == ""){
      toast.current.show({ severity: "error", detail: `Please Enter Password` });
    }else if(userdata.username.length == ""){
      toast.current.show({ severity: "error", detail: `Please Enter Username` });
    }
    else if(checked == false){
      toast.current.show({ severity: "error", detail: `Please Accept Terms and Conditions` });
    }
 else   if (
      userdata.email.length > 0 &&
      userdata.password.length > 0 &&
      userdata.username.length > 0
    ) {
      try {
        let response = await UserSignup(userdata);
        if (response.status === 200 || response.status === 201) {
          toast.current.show({
            severity: "success",
            detail: `${response?.data?.message}`,
          });
        }
      } catch (err) {
        console.log(err)
        toast.current.show({ severity: "error", detail: `${err.response.data.error}` });
      }
    }
  };
  return (
    
    <>
    <div className="flex min-h-screen ">
      <div className="hidden lg:flex w-[510px] bg-primary flex-col justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center gap-5 mt-44">
          <img src={logo} alt="img" className="w-[280px]" />
          <p className="font-poppins text-4xl font-medium text-[white] text-center">
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
         Already have an account?{" "}
          <Link to="/signin" className="underline">
           Signin
        </Link>
        </p>
       <div className="w-full px-5 md:px-0 md:w-[460px] mx-auto mt-20 md:mt-44 flex flex-col justify-between  h-full">
         <form onSubmit={handleSubmit}>
           <p className="text-2xl font-medium text-center text-black font-poppins md:text-left">
              Sign up to SendWish
             </p>
             {/* <div className="flex gap-4 mt-8">
              <button className="w-full bg-blue rounded-xl h-12 font-poppins text-[white] text-sm text-center flex items-center pl-5">
                 <i className="pi pi-google" style={{ fontSize: "1rem" }}></i>
                 <span className="w-full text-center">Sign in with Google</span>
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
                   setuserdata({ ...userdata, email:e.target.value.toLowerCase() })
                 }
                id="email"
                 label="Email address"
               />
               <FloatInput
                 id="username"
                 onChange={(e) =>
                  setuserdata({ ...userdata, username: e.target.value })
                 }
                 value={userdata.username}
                 label="User name"
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
             <div className="flex flex-col mt-6">
               <button
                type="submit"
                onClick={(e)=>{handleSubmit(e)}}
                 className="w-full h-[48px] bg-primary text-[white] font-poppins text-sm rounded-xl"
              >
                 Sign up
               </button>
               <div className="flex gap-5 mt-8">
                 <Checkbox
                   onChange={(e) => setChecked(e.checked)}
                   checked={checked}
                ></Checkbox>
                 <p className="text-xs font-normal text-gray-400 font-poppins">
                   By clicking Create account I agree that I have read and
                   accepted the Terms of Use and Privacy Policy
                 </p>
               </div>
             </div>
           </form>
           <p className="text-xs font-normal text-gray-400 font-poppins">
             Protected by reCAPTCHA and subject to the{" "}
             <span className="text-primary" onClick={()=>{navigate('/terms-and-conditions')}}>SendWish Privacy Policy</span> and{" "}
             <span className="text-primary" onClick={()=>{navigate('/terms-and-conditions')}}>Terms of Service.</span>
           </p>
           <button  className="text-primary cursor-pointer text-[20px] mt-5"  onClick={()=>{navigate('/signup-guide')}}>IMPORTANT : Guide To Setup Your Account </button>
         </div>
       </div>
    </div>
    </>
  );
};

export default Signup;
