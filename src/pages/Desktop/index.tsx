import React, { useState, useEffect,useRef } from "react";
import Image1 from "../../../src/assets/images/desktop-img1.png";
import Image2 from "../../../src/assets/images/desktop-img4.png";
import Image3 from "../../../src/assets/images/desktop-img7.png";
import Image4 from "../../../src/assets/images/desktop-img2.png";
import Image5 from "../../../src/assets/images/desktop-img5.png";
import Image6 from "../../../src/assets/images/desktop-img8.png";
import Image7 from "../../../src/assets/images/desktop-img3.png";
import Image8 from "../../../src/assets/images/desktop-img6.png";
import Logo from "../../../src/assets/images/logo.png";
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';     
import "./desktop.css"
import WorkTimeline from "../../components/screen-components/WorkTimeline";
import { useNavigate } from "react-router-dom";
import FaqsPic from "../../../src/assets/images/questions-bro.png";

import FAQs from "../../components/screen-components/FAQs";
const Desktop = () => {
  const [showHeader, setShowHeader] = useState(false);
  const navigate = useNavigate();
  const handleScroll = () => {
    const currentScrollTop = document.documentElement.scrollTop;

    if (currentScrollTop > 100) {
      // Scrolling down
      setShowHeader(true);
    } else {
      // Scrolling up
      setShowHeader(false);
    }
  };
  const menu = useRef(null);
  const items = [
    { label: 'Login', icon: 'pi pi-sign-in', command: () => navigate('/signin') }, // Navigate to Login page
    { label: 'Sign Up', icon: 'pi pi-user-plus', command: () => navigate('/signup') } // Navigate to Sign Up page
 
  ];
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="relative">
        <div
          className={`fixed transition-transform  w-full z-[100] shadow-md py-6 bg-[white] flex justify-between px-5 ${
            showHeader ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <h3 className="text-primary font-bold text-[22px] md:text-[36px] font-poppins">
            SendWish
          </h3>
          <div className="hamburr">  
          <Button
         icon="pi pi-bars"
         className="p-button-rounded p-button-text"
         style={{ color: 'black', fontSize: '1.5rem' }} // Black color for the hamburger
         onClick={(e) => menu.current.toggle(e)}
      />

      {/* PrimeReact Menu */}
      {/* <Menu model={items}  show={menuVisible} onHide={() => setMenuVisible(false)} /> */}
      <Menu model={items} popup ref={menu} />
          </div>
          <div className="flex gap-5 bittons">
            <button
              onClick={() => {
                navigate("/signin");
              }}
              className="px-10 text-[white] font-poppins py-2 rounded-3xl bg-primary"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="px-10 text-[white] font-poppins py-2 rounded-3xl bg-primary"
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="w-full bg-center bg-cover bg-light-green ">
          <div className="flex flex-col items-center justify-center h-full gap-24 lg:flex-row">
            <div className="flex flex-col items-center justify-center order-2 gap-5 lg:order-1">
              <h1 className="font-abhaya text-3xl sm:text-5xl text-primary lg:text-[white] font-extrabold uppercase">
                Welcome to sendwish
              </h1>
              <p className="text-primary lg:text-[white] text-lg sm:text-2xl font-medium text-center font-monto">
                Gifting Made Easy. <br />
                Perfect For Gifting For All Occasions.
              </p>
              <div className="flex gap-5 bittonss">
            <button
              onClick={() => {
                navigate("/signin");
              }}
              className="px-10 text-[white] font-poppins py-2 rounded-3xl bg-primary"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="px-10 text-[white] font-poppins py-2 rounded-3xl bg-primary"
            >
              Sign Up
            </button>
          </div>
            </div>
            <div className="flex order-1 gap-5 lg:order-1">
              <div className="flex flex-col justify-between gap-4">
                <img src={Image1} alt="img" />
                <img src={Image2} alt="img" />
                <img src={Image3} alt="img" className="mb-4" />
              </div>
              <div className="flex flex-col justify-between gap-4">
                <img src={Image4} alt="img" className="mt-4" />
                <img src={Image5} alt="img" />
                <img src={Image6} alt="img" />
              </div>
              <div className="flex flex-col gap-4">
                <img src={Image7} alt="img" className="mt-4" />
                <img src={Image8} alt="img" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative pb-10 overflow-hidden bg-no-repeat lg:pb-28 lg:bg-gift-size lg:bg-gift-image bg-center-250px">
          <div className="flex justify-between">
            <div className="relative mt-4 lg:mt-[150px] lg:ml-20">
              <div className="hidden lg:block w-[194px] top-0 h-[194px] bg-light-green absolute z-10 rounded-[50%]"></div>
              <div className="mt-5 lg:ml-10 lg:mt-24">
                <h1 className="relative z-50 hidden text-5xl font-extrabold font-abhaya lg:block">
                  WELCOME TO{" "}
                  <span className="text-secondary-green">SendWish</span>
                </h1>
                <div className="font-mono relative z-50 font-medium text-xl mt-5 lg:mt-24 text-center lg:text-left max-w-full lg:max-w-[620px] flex flex-col gap-6">
                  <span className="leading-[24px]">
                    A cash gifting platform that is simple, modern and
                    thoughtful.
                  </span>
                  <span className="leading-[24px]">
                    Perfect for any kind of celebration. Create your own
                    personalised page in minutes for sharing whenever you're
                    ready.
                  </span>
                  <span className="leading-[24px]">
                    The best way to receive gifts and messages from those you
                    love - designed with meaning in mind.
                  </span>
                </div>
              </div>
              <div className="w-[665px] hidden lg:block h-[665px] bg-light-green rounded-[50%] !left-[-26rem] absolute z-10 bottom-[-24rem]"></div>
            </div>
            <div className="w-[284px] hidden lg:block z-50 relative h-auto pb-4  border-[2px] border-black rounded-[12px] bg-dark-gray mr-[5rem] mt-[150px]">
              <div className="flex justify-between px-3 py-2 border-b">
                <span className="font-bold font-poppins text-base text-[#000000]">
                  SendWish
                </span>
                <span className="font-mono font-normal text-[15px] text-[#000000]">
                  HELP
                </span>
              </div>
              <div className="flex flex-col  !px-6">
                <p className="text-lg font-bold text-center underline font-monto underline-offset-8 ">
                  Elle & Ben
                </p>
                <h1 className="font-monto text-[20px] font-extrabold mt-3 text-center">
                  Creat an event
                </h1>
                <div className="w-full mt-4 h-[184px] mx-auto flex justify-center items-center bg-[#000000]">
                  <img src={Logo} alt="img" className="w-[133px] h-[80px]" />
                </div>
                <div className="flex gap-8 mt-5">
                  <div className="flex flex-col gap-1">
                    <label className="font-monto text-[15px] font-medium">
                      Gift
                    </label>
                    <input className="border-[2px] w-[81px] h-[25px] bg-[#FFFFFF]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-monto text-[15px] font-medium">
                      From
                    </label>
                    <input className="border-[2px] w-full h-[25px] bg-[#FFFFFF]" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 mt-4">
                  <label className="font-monto text-[15px] font-medium">
                    Email
                  </label>
                  <input className="border-[2px] w-full h-[25px] bg-[#FFFFFF]" />
                </div>
                <div className="flex flex-col gap-1 mt-4">
                  <label className="font-monto text-[15px] font-medium">
                    Country
                  </label>
                  <input className="border-[2px] w-full h-[25px] bg-[#FFFFFF]" />
                </div>
                <button className="w-[130px] mt-6 mx-auto h-[35px] bg-[#000000] rounded-[35px] text-[#FFFFFF]">
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="w-[465px] h-[465px] hidden lg:block bg-light-green rounded-[50%] !right-[-10rem] absolute z-10 top-[2rem]"></div>
        </div>
        <div className="w-full hidden lg:flex bg-light-green pt-[50px] flex-col items-center justify-center">
          <h1 className="text-center font-abhaya font-extrabold text-[48px] text-extra-green">
            HOW IT WORKS
          </h1>
          <WorkTimeline />
        </div>
        <div className="flex flex-col items-center justify-center w-full pt-[20px] lg:pt-[100px] pb-[50px] lg:pb-[200px]">
          <h1 className="text-center font-abhaya hidden lg:block font-extrabold underline underline-offset-[10px] text-[48px] text-extra-green">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <h1 className="text-center block lg:hidden font-abhaya font-extrabold underline underline-offset-[10px] text-[30px] sm:text-[40px] text-extra-green">
            FAQS
          </h1>
          <div className="flex items-center w-full lg:w-auto lg:ml-10">
            <div className="mt-[20px] lg:mt-[100px]  w-full">
              <FAQs />
            </div>
            <div className="hidden lg:block">
              <img src={FaqsPic} />
            </div>
          </div>
        </div>
        <div className=" items-center hidden lg:flex justify-between w-full bg-light-green pt-[20px] pb-[80px]  pr-[80px]">
          <div className="flex flex-col ml-20">
            <img src={Logo} alt="icon" className="w-[200px] h-[121px]" />
            <div className="flex flex-col gap-5 mt-5 ml-5">
              <span className="font-monto text-[20px] font-normal text-black">
                Inspiration
              </span>
              <span className="font-monto text-[20px] font-normal text-black">
                How It Works
              </span>
              <span className="font-monto text-[20px] font-normal text-black">
                FAQ
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-5 text-center mt-[95px]">
            <span className="font-monto text-[20px] font-normal text-black">
              Privacy Policy
            </span>
            <span className="font-monto text-[20px] font-normal text-black">
              Terms & Conditions
            </span>
            <span className="font-monto text-[20px] font-normal text-black">
              sendwishinfo@gmail.com
            </span>
          </div>
       
        </div>
        <div className=" items-center flex flex-col lg:hidden justify-center w-full bg-light-green pt-[20px] pb-[40px]">
          <img src={Logo} alt="icon" className="w-[200px] h-[121px]" />
          <div className="flex flex-col gap-5 mt-10 sm:flex-row ">
            <div className="flex flex-col gap-2 ">
              <span className="font-monto text-[20px] font-normal text-black">
                Inspiration
              </span>
              <span className="font-monto text-[20px] font-normal text-black">
                How It Works
              </span>
              <span className="font-monto text-[20px] font-normal text-black">
                FAQ
              </span>
              <span className="font-monto text-[20px] font-normal text-black">
                Privacy Policy
              </span>
              <span className="font-monto text-[20px] font-normal text-black">
                Terms & Conditions
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-monto text-[#000000]  text-[20px]">
                Contact:
              </span>
              <span className="font-monto text-[#000000] font-extrabold text-[20px]">
                sendwishinfo@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Desktop;
