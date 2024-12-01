import React, { useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";


const SendWishRegistrationGuide = () => {
  return (
    <>
     <div className="flex min-h-screen max-h-screen ">
      <div className="hidden lg:flex w-[510px] bg-primary flex-col max-h-screen  justify-between min-h-screen">
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
      <div className="w-full max-h-screen pb-[0px] md:pb-[50px] overflow-auto">
  <div
    style={{
      padding: "20px",
      maxWidth: "800px",
      margin: "auto",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <h1 style={{ textAlign: "center", color: "#39D2C0", fontWeight: "bold",fontSize:'24px',margin:'10px'  }}>
      Step-by-Step Guide for Individual Users to Register on SendWish
    </h1>
    <p style={{ textAlign: "center", color: "#39D2C0" ,margin:'10px' }}>
      Follow these simple steps to create your SendWish account and enjoy <br></br> seamless payments via our trusted partner, Stripe.
    </p>

    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ color: "#39D2C0", fontWeight: "bold" }}>Step 1: Start the Registration Process</h2>
      <ol>
        <li>Visit the sign-up page provided by SendWish.</li>
        <li>
          Click the <strong>“Sign Up”</strong> or <strong>“Get Started”</strong> button.
        </li>
      </ol>
    </div>

    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ color: "#39D2C0", fontWeight: "bold" }}>Step 2: Enter Personal Information</h2>
      <ul>
        <li>Provide your <strong>Full Name</strong> (First Name and Last Name).</li>
        <li>Enter a valid <strong>Email Address</strong>.</li>
        <li>Add your <strong>Phone Number</strong> (optional but recommended for verification).</li>
      </ul>
    </div>

    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ color: "#39D2C0", fontWeight: "bold" }}>Step 3: Choose the Account Type</h2>
      <p>
        When asked for account type, select <strong>“Individual or Sole Proprietor”</strong>.
        {/* Skip any sections asking for business information, as they are not required for individuals. */}
      </p>
    </div>

    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ color: "#39D2C0", fontWeight: "bold" }}>Step 4: Add Your Address</h2>
      <p>Provide your <strong>Residential Address</strong> (not a business address):</p>
      <ul>
        <li>Include street name, city, state, postal code, and country.</li>
        <li>Ensure the address matches your government-issued ID for verification purposes.</li>
      </ul>
    </div>

    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ color: "#39D2C0", fontWeight: "bold" }}>Step 5: Verify Your Identity</h2>
      <ul>
        <li>
          Upload a scanned copy or photo of a valid <strong>Government-Issued ID</strong>:
          <ul>
            <li>Options include a Passport, Driver’s License, or National ID card.</li>
          </ul>
        </li>
        <li>SendWish may also ask for a <strong>Selfie</strong> to confirm your identity.</li>
      </ul>
    </div>

    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ color: "#39D2C0", fontWeight: "bold" }}>Step 6: Set Up Bank Details for Payments (Optional at Signup)</h2>
      <p>
        If you want to receive payouts immediately, provide your <strong>Personal Bank Account Details</strong>:
      </p>
      <ul>
        <li>Bank Name</li>
        <li>Account Number (Savings or Checking)</li>
        <li>Routing Number or IBAN (depending on your country)</li>
      </ul>
      <p>
        {/* <strong>Note:</strong> If you don’t have your bank details handy, you can skip this step and add them later. */}
      </p>
    </div>

    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ color: "#39D2C0", fontWeight: "bold" }}>Step 7: Review and Submit</h2>
      <ul>
        <li>Carefully review all the details entered to ensure accuracy.</li>
        <li>Agree to SendWish’s Terms and Conditions.</li>
        <li>Click <strong>“Submit”</strong> to complete the registration process.</li>
      </ul>
    </div>

    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ color: "#39D2C0", fontWeight: "bold" }}>Step 8: Wait for Verification</h2>
      <p>
        SendWish will process your application and may ask for additional details if required.
        {/* You will receive an email confirmation once your account is verified. */}
      </p>
    </div>

    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ color: "#39D2C0", fontWeight: "bold" }}>Step 9: Access Your Dashboard</h2>
      <p>
        Once approved, log in to your SendWish Dashboard to manage payouts, track transactions, 
        and update any personal or banking information as needed.
      </p>
    </div>

    <div style={{ backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "5px", marginTop: "20px" }}>
      <h3 style={{ color: "#39D2C0", fontWeight: "bold" }}>Important Notes</h3>
      <ul>
        <li>You do NOT need a business account or Tax ID for individual registration.</li>
        <li>All payouts will be sent to the personal bank account you provide.</li>
        <li>
          By following these steps, you will be able to send money via SendWish’s trusted partner, Stripe,
          ensuring smoother and seamless payments.
        </li>
        <li>If additional queries. Please contact our email support. </li>
        <li>Thank You! </li>

      </ul>
    </div>
  </div>
</div>

    </div>
       
    </>
   
  );
};

export default SendWishRegistrationGuide;
