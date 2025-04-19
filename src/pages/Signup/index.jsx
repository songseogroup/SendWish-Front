import React, { useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import FloatInput from "../../components/ui/Inputs/FloatInput";
import PasswordInput from "../../components/ui/Inputs/PasswordInput";
import { Checkbox } from "primereact/checkbox";
import { UserSignup } from "../../core/services/auth.service";
import { Toast } from "primereact/toast";
import { Calendar } from 'primereact/calendar';
import { FileUpload } from 'primereact/fileupload';
import { ProgressSpinner } from 'primereact/progressspinner';

const Signup = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useRef();
  const fileUploadRef = useRef(null);
  const [userdata, setuserdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: null,
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: ""
    },
    iban: "",
    routingNumber: "",
      front: null,
      back: null,
      additional: null
  });

  const navigate = useNavigate();

  const validateForm = () => {
    if (!userdata.firstName) {
      toast.current.show({ severity: "error", detail: "Please enter your first name" });
      return false;
    }
    if (!userdata.lastName) {
      toast.current.show({ severity: "error", detail: "Please enter your last name" });
      return false;
    }
    if (!userdata.email) {
      toast.current.show({ severity: "error", detail: "Please enter your email" });
      return false;
    }
    if (!userdata.password) {
      toast.current.show({ severity: "error", detail: "Please enter your password" });
      return false;
    }
    if (!userdata.phoneNumber) {
      toast.current.show({ severity: "error", detail: "Please enter your phone number" });
      return false;
    }
    if (!userdata.dateOfBirth) {
      toast.current.show({ severity: "error", detail: "Please select your date of birth" });
      return false;
    }
    if (!userdata.address.line1) {
      toast.current.show({ severity: "error", detail: "Please enter your address" });
      return false;
    }
    if (!userdata.address.city) {
      toast.current.show({ severity: "error", detail: "Please enter your city" });
      return false;
    }
    if (!userdata.address.state) {
      toast.current.show({ severity: "error", detail: "Please enter your state" });
      return false;
    }
    if (!userdata.address.postalCode) {
      toast.current.show({ severity: "error", detail: "Please enter your postal code" });
      return false;
    }
    if (!userdata.iban) {
      toast.current.show({ severity: "error", detail: "Please enter your IBAN" });
      return false;
    }
    if (!userdata.routingNumber) {
      toast.current.show({ severity: "error", detail: "Please enter your routing number" });
      return false;
    }
    if (!userdata.front) {
      toast.current.show({ severity: "error", detail: "Please upload front of ID document" });
      return false;
    }
    if (!userdata.back) {
      toast.current.show({ severity: "error", detail: "Please upload back of ID document" });
      return false;
    }
    if (!checked) {
      toast.current.show({ severity: "error", detail: "Please accept Terms and Conditions" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const formData = new FormData();
        
        // Add basic user data
        formData.append('firstName', userdata.firstName);
        formData.append('lastName', userdata.lastName);
        formData.append('email', userdata.email);
        formData.append('password', userdata.password);
        formData.append('phoneNumber', userdata.phoneNumber);
        formData.append('dateOfBirth', userdata.dateOfBirth);
        formData.append('iban', userdata.iban);
        formData.append('routingNumber', userdata.routingNumber);
        
        // Add address data
        formData.append('address[line1]', userdata.address.line1);
        formData.append('address[line2]', userdata.address.line2);
        formData.append('address[city]', userdata.address.city);
        formData.append('address[state]', userdata.address.state);
        formData.append('address[postalCode]', userdata.address.postalCode);
        
        // Add files
        if (userdata.front) {
          formData.append('front', userdata.front);
        }
        if (userdata.back) {
          formData.append('back', userdata.back);
        }
        if (userdata.additional) {
          formData.append('additional', userdata.additional);
        }

        let response = await UserSignup(formData);
        if (response.status === 200 || response.status === 201) {
          toast.current.show({
            severity: "success",
            detail: `${response?.data?.message || 'Account created successfully!'}`,
            life: 5000
          });
          // Reset form after successful signup
          setuserdata({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phoneNumber: "",
            dateOfBirth: null,
            address: {
              line1: "",
              line2: "",
              city: "",
              state: "",
              postalCode: ""
            },
            iban: "",
            routingNumber: "",
            front: null,
            back: null,
            additional: null
          });
          setChecked(false);
        }
      } catch (err) {
        console.log(err);
        toast.current.show({ severity: "error", detail: `${err.response?.data?.error || 'An error occurred'}` });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileUpload = (e, type) => {
    const file = e.files[0];
    if (file) {
      setuserdata(prev => ({
        ...prev,
        [type]: file
      }));
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="hidden lg:flex w-[510px]  bg-primary flex-col justify-between min-h-screen">
          <div className="flex flex-col items-center justify-center gap-5 mt-44">
            <img src={logo} alt="img" className="w-[280px]" />
            <p className="font-poppins text-4xl font-medium text-[white] text-center">
              Gifting Made Easy
            </p>
          </div>
          <p className="text-sm font-medium text-[white] text-center font-poppins mb-16">
            Having troubles?{" "}
            <Link to="/signup-guide" className="underline">
              Get Help
            </Link>
          </p>
        </div>
        <div className="w-full h-screen pb-[0px] md:pb-[50px] overflow-y-auto">
          <Toast ref={toast} />
          <p className="mt-10 mr-10 text-sm font-medium text-right font-poppins">
            Already have an account?{" "}
            <Link to="/signin" className="underline">
              Signin
            </Link>
          </p>
          <div className="w-full  px-5 md:px-0 md:w-[600px] mx-auto mt-10 md:mt-20 flex flex-col justify-between h-full">
            <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-2xl font-medium text-center text-black font-poppins md:text-left">
                Create your SendWish account to start receiving digital cash gifts straight to your bank account.
                </p>
<p className="text-sm font-medium text-[black] text-center font-poppins mb-16">
Sign up in minutes to connect with Stripe and start receiving secure cash gifts and messages for any occasion. Just verify your ID and you're ready to go
</p>


              
              <div className="grid grid-cols-2 gap-4">
                <FloatInput
                  value={userdata.firstName}
                  onChange={(e) => setuserdata({ ...userdata, firstName: e.target.value })}
                  id="firstName"
                  label="First Name"
                />
                <FloatInput
                  value={userdata.lastName}
                  onChange={(e) => setuserdata({ ...userdata, lastName: e.target.value })}
                  id="lastName"
                  label="Last Name"
                />
              </div>

              <FloatInput
                value={userdata.email}
                onChange={(e) => setuserdata({ ...userdata, email: e.target.value.toLowerCase() })}
                id="email"
                label="Email address"
                type="email"
              />

              <PasswordInput
                value={userdata.password}
                onChange={(e) => setuserdata({ ...userdata, password: e.target.value })}
                id="password"
                label="Password"
              />

              <FloatInput
                value={userdata.phoneNumber}
                onChange={(e) => setuserdata({ ...userdata, phoneNumber: e.target.value })}
                id="phoneNumber"
                label="Phone Number"
                type="tel"
              />

              <div className="flex flex-col">
                <label className="mb-2">Date of Birth</label>
                <Calendar
                  value={userdata.dateOfBirth}
                  onChange={(e) => setuserdata({ ...userdata, dateOfBirth: e.value })}
                  dateFormat="dd/mm/yy"
                  // showIcon////
                  className="w-full"
                />
              </div>

              <div className="space-y-4">
                <p className="font-medium">Address</p>
                <FloatInput
                  value={userdata.address.line1}
                  onChange={(e) => setuserdata({
                    ...userdata,
                    address: { ...userdata.address, line1: e.target.value }
                  })}
                  id="addressLine1"
                  label="Address Line 1"
                />
                <FloatInput
                  value={userdata.address.line2}
                  onChange={(e) => setuserdata({
                    ...userdata,
                    address: { ...userdata.address, line2: e.target.value }
                  })}
                  id="addressLine2"
                  label="Address Line 2 (Optional)"
                />
                <div className="grid grid-cols-2 gap-4">
                  <FloatInput
                    value={userdata.address.city}
                    onChange={(e) => setuserdata({
                      ...userdata,
                      address: { ...userdata.address, city: e.target.value }
                    })}
                    id="city"
                    label="City"
                  />
                  <FloatInput
                    value={userdata.address.state}
                    onChange={(e) => setuserdata({
                      ...userdata,
                      address: { ...userdata.address, state: e.target.value }
                    })}
                    id="state"
                    label="State"
                  />
                </div>
                <FloatInput
                  value={userdata.address.postalCode}
                  onChange={(e) => setuserdata({
                    ...userdata,
                    address: { ...userdata.address, postalCode: e.target.value }
                  })}
                  id="postalCode"
                  label="Postal Code"
                />
              </div>

              <FloatInput
                value={userdata.iban}
                onChange={(e) => setuserdata({ ...userdata, iban: e.target.value })}
                id="iban"
                label="IBAN"
              />

              <FloatInput
                value={userdata.routingNumber}
                onChange={(e) => setuserdata({ ...userdata, routingNumber: e.target.value })}
                id="routingNumber"
                label="Routing Number"
              />

              <div className="space-y-4">
                <p className="font-medium">Verification Documents</p>
                <div className="space-y-2">
                  <label>Front of ID</label>
                  <FileUpload
                    ref={fileUploadRef}
                    mode="basic"
                    name="front"
                    accept="image/*"
                    maxFileSize={1000000}
                    chooseLabel="Upload Front of ID"
                    onSelect={(e) => handleFileUpload(e, 'front')}
                    auto
                  />
                </div>
                <div className="space-y-2">
                  <label>Back of ID</label>
                  <FileUpload
                    mode="basic"
                    name="back"
                    accept="image/*"
                    maxFileSize={1000000}
                    chooseLabel="Upload Back of ID"
                    onSelect={(e) => handleFileUpload(e, 'back')}
                    auto
                  />
                </div>
              </div>

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

              <button
                type="submit"
                className="w-full h-[48px] bg-primary text-[white] font-poppins text-sm rounded-xl flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex  w-full items-center justify-center">
                    <ProgressSpinner style={{ width: '20px', height: '20px', marginRight: '10px',marginLeft: '10px' }} strokeWidth="4" />
                    <span>Signing up...</span>
                  </div>
                ) : (
                  "Sign up"
                )}
              </button>
            </form>

            <p className="text-xs font-normal text-gray-400 font-poppins mt-4">
              Protected by reCAPTCHA and subject to the{" "}
              <span className="text-primary cursor-pointer" onClick={() => navigate('/terms-and-conditions')}>
                SendWish Privacy Policy
              </span>{" "}
              and{" "}
              <span className="text-primary cursor-pointer" onClick={() => navigate('/terms-and-conditions')}>
                Terms of Service.
              </span>
            </p>
            {/* <button className="text-primary cursor-pointer text-[20px] mt-5" onClick={() => navigate('/signup-guide')}>
              IMPORTANT : Guide To Setup Your Account
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

