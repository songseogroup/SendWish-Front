import React from 'react';
import 'animate.css';
import Logo from "../../../src/assets/images/logo.png";

const TermsAndConditions = () => {
  return (
    <div className="bg-white text-primary font-poppins">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center animate__animated animate__fadeInUp">
          Terms and Conditions
        </h1>
        <p className="mt-4 animate__animated animate__fadeInUp text-lg">
          This website is owned and operated by SendWish / SongSeo Group (ABN 2932 0972 639). By accessing or using this website and related services
          ("Platform"), you agree to be bound by these terms and conditions, including the Privacy Policy ("Terms").
        </p>

        <div className="mt-8 space-y-6">
          <div className="animate__animated animate__fadeInUp">
            <h2 className="text-xl font-semibold">Event Creators</h2>
            <p>
              By using the Platform, a Event Creator represents that they: <br /> - Are at least 18 years of age; <br /> - Possess the legal right and
              ability to enter into a legally binding agreement with us;
            </p>
          </div>

          <div className="animate__animated animate__fadeInUp">
            <h2 className="text-xl font-semibold">Gifts</h2>
            <p>
              Gifted amounts are processed via our secure payment provider. When a Gifter sends a monetary gift to an Event Creator, we or our nominee will
              temporarily hold the gifted amount as an intermediary.
            </p>
          </div>

          <div className="animate__animated animate__fadeInUp">
            <h2 className="text-xl font-semibold">Fees</h2>
            <p>
              Event Creators will not be charged any fees in connection with the use of our Platform. Transaction and processing fees are added to each
              gifted amount and are paid by the Gifter.
            </p>
          </div>

          <div className="animate__animated animate__fadeInUp">
            <h2 className="text-xl font-semibold">Intellectual Property</h2>
            <p>
              Unless indicated otherwise, all content on the Platform is owned or licensed by us and is protected under copyright laws in both Australia and
              other countries.
            </p>
          </div>

          <div className="animate__animated animate__fadeInUp">
            <h2 className="text-xl font-semibold">Acceptable Use</h2>
            <p>
              The Platform may only be used for personal, non-commercial purposes, and must not be used in a manner that is unlawful or prohibited by any
              applicable laws or regulations.
            </p>
          </div>

          <div className="animate__animated animate__fadeInUp">
            <h2 className="text-xl font-semibold">Warranties</h2>
            <p>
              To the maximum extent permitted by law, we make no representations or warranties about the accuracy, completeness, security, or timeliness of
              the content, information, or services provided via the Platform.
            </p>
          </div>

          <div className="animate__animated animate__fadeInUp">
            <h2 className="text-xl font-semibold">Liability</h2>
            <p>
              To the maximum extent permitted by law, in no event shall we be liable for any incidental, indirect, special, or consequential damages
              (including loss of profits) arising out of or related to the use of the Platform.
            </p>
          </div>

          <div className="animate__animated animate__fadeInUp">
            <h2 className="text-xl font-semibold">Governing Law</h2>
            <p>
              These Terms are governed by the laws of New South Wales, Australia, and all users submit to the non-exclusive jurisdiction of the courts of New
              South Wales.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-12 text-center animate__animated animate__fadeInUp">
          Privacy Policy
        </h2>
        <div className="mt-8 space-y-6">
          <p className="animate__animated animate__fadeInUp">
            This Privacy Policy outlines our commitment to respect your privacy and to manage your personal information responsibly.
          </p>
          <p className="animate__animated animate__fadeInUp">
            Personal information refers to information or an opinion that identifies an individual. Examples include your name, contact details, and bank
            account information.
          </p>
          <p className="animate__animated animate__fadeInUp">
            We may collect your personal information for the primary purpose of providing our services to you, including enabling you to access and use the
            Platform.
          </p>
          <p className="animate__animated animate__fadeInUp">
            Your personal information may be disclosed to employees, third-party suppliers, and professional advisers.
          </p>
        </div>
      </div>
      <div className="items-center hidden lg:flex justify-between w-full bg-light-green pt-[20px] pb-[80px] pr-[80px]">
  <div className="flex flex-col ml-20">
    <img src={Logo} alt="icon" className="w-[200px] h-[121px]" />
    <div className="flex flex-col gap-5 mt-5 ml-5">
      <a href="#inspiration" className="font-monto text-[20px] font-normal text-black">
        Inspiration
      </a>
      <a href="#how-it-works" className="font-monto text-[20px] font-normal text-black">
        How It Works
      </a>
      <a href="#faq" className="font-monto text-[20px] font-normal text-black">
        FAQ
      </a>
    </div>
  </div>
  <div className="flex flex-col gap-5 text-center mt-[95px]">
    <a href="/terms-and-conditions" className="font-monto text-[20px] font-normal text-black">
      Privacy Policy
    </a>
    <a href="/terms-and-conditions" className="font-monto text-[20px] font-normal text-black">
      Terms & Conditions
    </a>
    <a href="mailto:sendwishinfo@gmail.com" className="font-monto text-[20px] font-normal text-black">
      sendwishinfo@gmail.com
    </a>
  </div>
</div>

<div className="items-center flex flex-col lg:hidden justify-center w-full bg-light-green pt-[20px] pb-[40px]">
  <img src={Logo} alt="icon" className="w-[200px] h-[121px]" />
  <div className="flex flex-col gap-5 mt-10 sm:flex-row">
    <div className="flex flex-col gap-2">
      <a href="#inspiration" className="font-monto text-[20px] font-normal text-black">
        Inspiration
      </a>
      <a href="#how-it-works" className="font-monto text-[20px] font-normal text-black">
        How It Works
      </a>
      <a href="#faq" className="font-monto text-[20px] font-normal text-black">
        FAQ
      </a>
      <a href="/terms-and-conditions" className="font-monto text-[20px] font-normal text-black">
        Privacy Policy
      </a>
      <a href="/terms-and-conditions" className="font-monto text-[20px] font-normal text-black">
        Terms & Conditions
      </a>
    </div>
    <a href="mailto:sendwishinfo@gmail.com" className="font-monto text-[20px] font-normal text-black">
      sendwishinfo@gmail.com
    </a>
  </div>
</div>

        </div>
  );
};

export default TermsAndConditions;
