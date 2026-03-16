import React, { useRef, useState, useEffect } from "react";
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

const STEPS = [
  { id: 1, label: "Personal Info",  icon: "pi-user"        },
  { id: 2, label: "Address",        icon: "pi-map-marker"  },
  { id: 3, label: "Banking",        icon: "pi-credit-card" },
  { id: 4, label: "Verification",   icon: "pi-shield"      },
];

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const toast = useRef();
  const fileUploadRef = useRef(null);
  const [userdata, setuserdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: null,
    address: { line1: "", line2: "", city: "", state: "", postalCode: "" },
    iban: "",
    routingNumber: "",
    front: null,
    back: null,
    additional: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getIpAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };
    getIpAddress();
  }, []);

  const validateStep = (step) => {
    const errors = {};
    const emptyFields = [];

    if (step === 1) {
      if (!userdata.firstName)  { errors.firstName = true;  emptyFields.push("First Name"); }
      if (!userdata.lastName)   { errors.lastName  = true;  emptyFields.push("Last Name"); }
      if (!userdata.email)      { errors.email     = true;  emptyFields.push("Email"); }
      if (!userdata.password)   { errors.password  = true;  emptyFields.push("Password"); }
      if (!userdata.phoneNumber) {
        errors.phoneNumber = true;
        emptyFields.push("Phone Number");
      } else if (!userdata.phoneNumber.startsWith('+61')) {
        errors.phoneNumber = true;
        emptyFields.push("Phone Number (must start with +61)");
      }
      if (!userdata.dateOfBirth) { errors.dateOfBirth = true; emptyFields.push("Date of Birth"); }
    }

    if (step === 2) {
      if (!userdata.address.line1)      { errors.addressLine1      = true; emptyFields.push("Address Line 1"); }
      if (!userdata.address.city)       { errors.addressCity       = true; emptyFields.push("City"); }
      if (!userdata.address.state)      { errors.addressState      = true; emptyFields.push("State"); }
      if (!userdata.address.postalCode) { errors.addressPostalCode = true; emptyFields.push("Postal Code"); }
    }

    if (step === 3) {
      if (!userdata.iban)          { errors.iban          = true; emptyFields.push("IBAN / Bank Account Number"); }
      if (!userdata.routingNumber) { errors.routingNumber = true; emptyFields.push("Routing / BSB Number"); }
    }

    if (step === 4) {
      if (!userdata.front) { errors.front = true; emptyFields.push("Front ID Document"); }
      if (!userdata.back)  { errors.back  = true; emptyFields.push("Back ID Document"); }
      if (!checked)        { errors.terms = true; emptyFields.push("Terms and Conditions"); }
    }

    if (emptyFields.length > 0) {
      toast.current.show({
        severity: "error",
        detail: `Please fill in: ${emptyFields.join(", ")}`,
        life: 5000,
      });
    }

    setFieldErrors(errors);
    return emptyFields.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setFieldErrors({});
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('firstName',           userdata.firstName);
      formData.append('lastName',            userdata.lastName);
      formData.append('email',               userdata.email);
      formData.append('password',            userdata.password);
      formData.append('phoneNumber',         userdata.phoneNumber);
      formData.append('dateOfBirth',         userdata.dateOfBirth);
      formData.append('iban',                userdata.iban);
      formData.append('routingNumber',       userdata.routingNumber);
      formData.append('ip',                  ipAddress);
      formData.append('address[line1]',      userdata.address.line1);
      formData.append('address[line2]',      userdata.address.line2);
      formData.append('address[city]',       userdata.address.city);
      formData.append('address[state]',      userdata.address.state);
      formData.append('address[postalCode]', userdata.address.postalCode);
      if (userdata.front)      formData.append('front',      userdata.front);
      if (userdata.back)       formData.append('back',       userdata.back);
      if (userdata.additional) formData.append('additional', userdata.additional);

      const response = await UserSignup(formData);
      if (response.status === 200 || response.status === 201) {
        toast.current.show({
          severity: "success",
          detail: response?.data?.message || 'Account created successfully!',
          life: 5000,
        });
        setuserdata({
          firstName: "", lastName: "", email: "", password: "",
          phoneNumber: "", dateOfBirth: null,
          address: { line1: "", line2: "", city: "", state: "", postalCode: "" },
          iban: "", routingNumber: "", front: null, back: null, additional: null,
        });
        setChecked(false);
        setFieldErrors({});
        setCurrentStep(1);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      toast.current.show({ severity: "error", detail: errorMessage });
      if (err.response?.data?.message) {
        const msg = err.response.data.message.toLowerCase();
        const errors = {};
        if (msg.includes('phone number'))   errors.phoneNumber      = true;
        if (msg.includes('email'))          errors.email            = true;
        if (msg.includes('iban'))           errors.iban             = true;
        if (msg.includes('routing number')) errors.routingNumber    = true;
        if (msg.includes('postal code'))    errors.addressPostalCode= true;
        if (msg.includes('state'))          errors.addressState     = true;
        if (msg.includes('city'))           errors.addressCity      = true;
        if (msg.includes('address'))        errors.addressLine1     = true;
        if (msg.includes('first name'))     errors.firstName        = true;
        if (msg.includes('last name'))      errors.lastName         = true;
        if (msg.includes('password'))       errors.password         = true;
        if (msg.includes('date of birth'))  errors.dateOfBirth      = true;
        if (msg.includes('id document'))  { errors.front = true; errors.back = true; }
        setFieldErrors(errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e, type) => {
    const file = e.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.current.show({ severity: "error", detail: "File size must be less than 5MB" });
      setFieldErrors(prev => ({ ...prev, [type]: true }));
      return;
    }
    setuserdata(prev => ({ ...prev, [type]: file }));
    setFieldErrors(prev => ({ ...prev, [type]: false }));
  };

  return (
    <>
      <div className="flex min-h-screen">

        {/* ── Sidebar ── */}
        <style>{`
          @keyframes sidebarFadeIn {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseRing {
            0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.55); }
            70%  { box-shadow: 0 0 0 10px rgba(255,255,255,0); }
            100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
          }
          @keyframes checkPop {
            0%   { transform: scale(0) rotate(-45deg); opacity: 0; }
            60%  { transform: scale(1.25) rotate(5deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          @keyframes shimmer {
            0%   { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes floatIcon {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-6px); }
          }
          @keyframes connectorFill {
            from { height: 0%; }
            to   { height: 100%; }
          }
          .step-active-ring { animation: pulseRing 1.8s ease-out infinite; }
          .check-pop        { animation: checkPop 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards; }
          .float-icon       { animation: floatIcon 3s ease-in-out infinite; }
          .shimmer-text {
            background: linear-gradient(90deg, #111111 25%, #0dcdb5 50%, #111111 75%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 3s linear infinite;
          }
          .step-slide-in {
            opacity: 0;
            animation: sidebarFadeIn 0.5s ease forwards;
          }
        `}</style>

        <div className="hidden lg:flex w-[510px] flex-col justify-between min-h-screen relative overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0dcdb5 0%, #0ab8a2 50%, #089e8c 100%)" }}>

          {/* Background decorative circles */}
          <div className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
          <div className="absolute bottom-[120px] left-[-60px] w-[200px] h-[200px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />

          {/* Top brand section */}
          <div className="flex flex-col items-center justify-center gap-4 mt-16 px-10 z-10">
            <div className="float-icon">
              <img src={logo} alt="img" className="w-[200px] drop-shadow-lg" />
            </div>
            <p className="shimmer-text font-poppins text-3xl font-bold text-center leading-tight mt-2">
              Gifting Made Easy
            </p>
            <p className="font-poppins text-sm text-center leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>
              Sign up in minutes to connect with Stripe and start receiving secure cash gifts for any occasion.
            </p>
          </div>

          {/* Steps section */}
          <div className="px-8 mb-16 z-10">
            <p className="text-xs font-poppins uppercase tracking-widest mb-5 pl-1" style={{ color: "rgba(0,0,0,0.4)" }}>Your Progress</p>

            <div className="relative">
              {/* Vertical track line */}
              <div className="absolute left-[19px] top-5 bottom-5 w-[2px] rounded-full" style={{ background: "rgba(0,0,0,0.1)" }} />
              {/* Filled portion */}
              <div
                className="absolute left-[19px] top-5 w-[2px] rounded-full transition-all duration-700 ease-in-out"
                style={{ height: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`, background: "rgba(0,0,0,0.45)" }}
              />

              <div className="space-y-2">
                {STEPS.map((step, idx) => {
                  const isCompleted = currentStep > step.id;
                  const isActive    = currentStep === step.id;
                  return (
                    <div
                      key={step.id}
                      className="step-slide-in flex items-center gap-4 relative"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      {/* Icon bubble */}
                      <div className="relative flex-shrink-0 z-10">
                        {/* Pulse ring on active */}
                        {isActive && (
                          <div className="step-active-ring absolute inset-0 rounded-full" />
                        )}
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-400"
                          style={{
                            background: isCompleted
                              ? "rgba(255,255,255,1)"
                              : isActive
                              ? "rgba(255,255,255,1)"
                              : "rgba(255,255,255,0.12)",
                            boxShadow: isActive
                              ? "0 4px 20px rgba(0,0,0,0.15)"
                              : isCompleted
                              ? "0 2px 10px rgba(0,0,0,0.1)"
                              : "none",
                            transform: isActive ? "scale(1.1)" : "scale(1)",
                          }}
                        >
                          {isCompleted ? (
                            <i className="pi pi-check check-pop text-sm font-bold" style={{ color: "#0dcdb5" }} />
                          ) : (
                            <i
                              className={`pi ${step.icon} text-sm`}
                              style={{ color: isActive ? "#0dcdb5" : "rgba(255,255,255,0.5)" }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Label + pill */}
                      <div
                        className="flex-1 flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-400"
                        style={{
                          background: isActive
                            ? "rgba(255,255,255,0.28)"
                            : "transparent",
                          backdropFilter: isActive ? "blur(8px)" : "none",
                          border: isActive
                            ? "1px solid rgba(255,255,255,0.5)"
                            : "1px solid transparent",
                        }}
                      >
                        <div>
                          <p
                            className="text-xs font-poppins font-semibold uppercase tracking-wider transition-all duration-300"
                            style={{ color: isActive || isCompleted ? "#111111" : "rgba(0,0,0,0.35)" }}
                          >
                            {step.label}
                          </p>
                          <p
                            className="text-xs font-poppins mt-0.5 transition-all duration-300"
                            style={{ color: isActive ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)" }}
                          >
                            {isCompleted ? "Completed ✓" : isActive ? "In progress..." : `Step ${step.id}`}
                          </p>
                        </div>

                        {/* Status badge */}
                        {isActive && (
                          <span
                            className="text-xs font-poppins font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(0,0,0,0.12)", color: "#111111", fontSize: "10px" }}
                          >
                            Active
                          </span>
                        )}
                        {isCompleted && (
                          <span
                            className="text-xs font-poppins font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(0,0,0,0.1)", color: "#111111", fontSize: "10px" }}
                          >
                            Done
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="text-sm font-medium text-center font-poppins mb-8 z-10" style={{ color: "rgba(0,0,0,0.5)" }}>
            Having troubles?{" "}
            <Link to="/signup-guide" className="underline transition-colors" style={{ color: "rgba(0,0,0,0.75)" }}>Get Help</Link>
          </p>
        </div>

        {/* ── Main content ── */}
        <div className="w-full h-screen pb-[50px] overflow-y-auto">
          <Toast ref={toast} />
          <p className="mt-10 mr-10 text-sm font-medium text-right font-poppins">
            Already have an account?{" "}
            <Link to="/signin" className="underline">Signin</Link>
          </p>

          <div className="w-full px-5 md:px-0 md:w-[580px] mx-auto mt-10 md:mt-12">

            {/* Progress bar */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-poppins">Step {currentStep} of {STEPS.length}</span>
              <span className="text-xs text-gray-400 font-poppins">{Math.round((currentStep / STEPS.length) * 100)}% complete</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mb-8 overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${(currentStep / STEPS.length) * 100}%` }} />
            </div>

            {/* Stepper header — inlined, NOT a component */}
            <div className="flex items-center w-full mb-8">
              {STEPS.map((step, index) => {
                const isCompleted = currentStep > step.id;
                const isActive    = currentStep === step.id;
                return (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2
                        ${isCompleted ? "bg-primary border-primary text-white"
                          : isActive  ? "bg-white border-primary text-primary"
                          :             "bg-white border-gray-300 text-gray-400"}`}>
                        {isCompleted
                          ? <i className="pi pi-check text-sm font-bold" />
                          : <i className={`pi ${step.icon} text-sm`} />}
                      </div>
                      <span className={`mt-1 text-xs font-medium font-poppins whitespace-nowrap transition-colors duration-300
                        ${isActive || isCompleted ? "text-primary" : "text-gray-400"}`}>
                        {step.label}
                      </span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 mb-4 transition-all duration-300 ${currentStep > step.id ? "bg-primary" : "bg-gray-200"}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="pb-10">
              <div className="min-h-[340px] space-y-6">

                {/* ── Step 1: Personal Info ── */}
                {currentStep === 1 && (
                  <>
                    <div>
                      <p className="text-xl font-semibold font-poppins text-gray-800">Personal Information</p>
                      <p className="text-sm text-gray-400 font-poppins mt-1">Tell us a bit about yourself</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FloatInput
                        value={userdata.firstName}
                        onChange={(e) => { setuserdata({ ...userdata, firstName: e.target.value }); setFieldErrors(prev => ({ ...prev, firstName: false })); }}
                        id="firstName" label="First Name"
                        className={fieldErrors.firstName ? "border-red-500" : ""}
                      />
                      <FloatInput
                        value={userdata.lastName}
                        onChange={(e) => { setuserdata({ ...userdata, lastName: e.target.value }); setFieldErrors(prev => ({ ...prev, lastName: false })); }}
                        id="lastName" label="Last Name"
                        className={fieldErrors.lastName ? "border-red-500" : ""}
                      />
                    </div>
                    <FloatInput
                      value={userdata.email}
                      onChange={(e) => { setuserdata({ ...userdata, email: e.target.value.toLowerCase() }); setFieldErrors(prev => ({ ...prev, email: false })); }}
                      id="email" label="Email address" type="email"
                      className={fieldErrors.email ? "border-red-500" : ""}
                    />
                    <PasswordInput
                      value={userdata.password}
                      onChange={(e) => { setuserdata({ ...userdata, password: e.target.value }); setFieldErrors(prev => ({ ...prev, password: false })); }}
                      id="password" label="Password"
                      className={fieldErrors.password ? "border-red-500" : ""}
                    />
                    <FloatInput
                      value={userdata.phoneNumber}
                      onChange={(e) => { setuserdata({ ...userdata, phoneNumber: e.target.value }); setFieldErrors(prev => ({ ...prev, phoneNumber: false })); }}
                      id="phoneNumber" label="Phone Number (e.g. +61...)" type="tel"
                      className={fieldErrors.phoneNumber ? "border-red-500" : ""}
                    />
                    <div className="flex flex-col">
                      <label className="mb-2 text-sm font-poppins text-gray-600">Date of Birth</label>
                      <Calendar
                        value={userdata.dateOfBirth}
                        onChange={(e) => { setuserdata({ ...userdata, dateOfBirth: e.value }); setFieldErrors(prev => ({ ...prev, dateOfBirth: false })); }}
                        dateFormat="dd/mm/yy"
                        placeholder="DD/MM/YYYY"
                        className={`w-full ${fieldErrors.dateOfBirth ? "border-red-500" : ""}`}
                      />
                    </div>
                  </>
                )}

                {/* ── Step 2: Address ── */}
                {currentStep === 2 && (
                  <>
                    <div>
                      <p className="text-xl font-semibold font-poppins text-gray-800">Your Address</p>
                      <p className="text-sm text-gray-400 font-poppins mt-1">We need your residential address</p>
                    </div>
                    <FloatInput
                      value={userdata.address.line1}
                      onChange={(e) => { setuserdata({ ...userdata, address: { ...userdata.address, line1: e.target.value } }); setFieldErrors(prev => ({ ...prev, addressLine1: false })); }}
                      id="addressLine1" label="Address Line 1"
                      className={fieldErrors.addressLine1 ? "border-red-500" : ""}
                    />
                    <FloatInput
                      value={userdata.address.line2}
                      onChange={(e) => setuserdata({ ...userdata, address: { ...userdata.address, line2: e.target.value } })}
                      id="addressLine2" label="Address Line 2 (Optional)"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FloatInput
                        value={userdata.address.city}
                        onChange={(e) => { setuserdata({ ...userdata, address: { ...userdata.address, city: e.target.value } }); setFieldErrors(prev => ({ ...prev, addressCity: false })); }}
                        id="city" label="City"
                        className={fieldErrors.addressCity ? "border-red-500" : ""}
                      />
                      <FloatInput
                        value={userdata.address.state}
                        onChange={(e) => { setuserdata({ ...userdata, address: { ...userdata.address, state: e.target.value } }); setFieldErrors(prev => ({ ...prev, addressState: false })); }}
                        id="state" label="State"
                        className={fieldErrors.addressState ? "border-red-500" : ""}
                      />
                    </div>
                    <FloatInput
                      value={userdata.address.postalCode}
                      onChange={(e) => { setuserdata({ ...userdata, address: { ...userdata.address, postalCode: e.target.value } }); setFieldErrors(prev => ({ ...prev, addressPostalCode: false })); }}
                      id="postalCode" label="Postal Code"
                      className={fieldErrors.addressPostalCode ? "border-red-500" : ""}
                    />
                  </>
                )}

                {/* ── Step 3: Banking ── */}
                {currentStep === 3 && (
                  <>
                    <div>
                      <p className="text-xl font-semibold font-poppins text-gray-800">Banking Details</p>
                      <p className="text-sm text-gray-400 font-poppins mt-1">Your bank account where gifts will be deposited</p>
                    </div>
                    <FloatInput
                      value={userdata.iban}
                      onChange={(e) => { setuserdata({ ...userdata, iban: e.target.value }); setFieldErrors(prev => ({ ...prev, iban: false })); }}
                      id="iban" label="IBAN / Bank Account Number"
                      className={fieldErrors.iban ? "border-red-500" : ""}
                    />
                    <FloatInput
                      value={userdata.routingNumber}
                      onChange={(e) => { setuserdata({ ...userdata, routingNumber: e.target.value }); setFieldErrors(prev => ({ ...prev, routingNumber: false })); }}
                      id="routingNumber" label="Routing Number / BSB Number"
                      className={fieldErrors.routingNumber ? "border-red-500" : ""}
                    />
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <i className="pi pi-info-circle text-blue-400 mt-0.5" />
                        <p className="text-xs text-blue-600 font-poppins leading-relaxed">
                          Your banking details are encrypted and processed securely through Stripe. We never store your full account credentials.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {/* ── Step 4: Verification ── */}
                {currentStep === 4 && (
                  <>
                    <div>
                      <p className="text-xl font-semibold font-poppins text-gray-800">Verify Your Identity</p>
                      <p className="text-sm text-gray-400 font-poppins mt-1">Upload a government-issued photo ID</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <i className="pi pi-shield text-amber-500 mt-0.5" />
                        <p className="text-xs text-amber-700 font-poppins leading-relaxed">
                          We verify IDs with Stripe to prevent fraud and keep things secure. Max file size: 5MB per image.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className={`border-2 rounded-xl p-4 transition-colors ${fieldErrors.front ? "border-red-400 bg-red-50" : userdata.front ? "border-green-400 bg-green-50" : "border-gray-200"}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <i className={`pi ${userdata.front ? "pi-check-circle text-green-500" : "pi-id-card text-gray-400"}`} />
                            <span className="text-sm font-medium font-poppins text-gray-700">Front of ID</span>
                            <span className="text-xs text-red-400">*</span>
                          </div>
                          {userdata.front && <span className="text-xs text-green-600 font-poppins">{userdata.front.name}</span>}
                        </div>
                        <FileUpload
                          ref={fileUploadRef}
                          mode="basic"
                          name="front"
                          accept="image/*"
                          chooseLabel="Choose File"
                          onSelect={(e) => handleFileUpload(e, 'front')}
                          auto
                          className="w-full"
                        />
                      </div>
                      <div className={`border-2 rounded-xl p-4 transition-colors ${fieldErrors.back ? "border-red-400 bg-red-50" : userdata.back ? "border-green-400 bg-green-50" : "border-gray-200"}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <i className={`pi ${userdata.back ? "pi-check-circle text-green-500" : "pi-id-card text-gray-400"}`} />
                            <span className="text-sm font-medium font-poppins text-gray-700">Back of ID</span>
                            <span className="text-xs text-red-400">*</span>
                          </div>
                          {userdata.back && <span className="text-xs text-green-600 font-poppins">{userdata.back.name}</span>}
                        </div>
                        <FileUpload
                          mode="basic"
                          name="back"
                          accept="image/*"
                          chooseLabel="Choose File"
                          onSelect={(e) => handleFileUpload(e, 'back')}
                          auto
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className={`flex gap-4 p-4 rounded-xl border-2 transition-colors ${fieldErrors.terms ? "border-red-400 bg-red-50" : "border-gray-200"}`}>
                      <Checkbox
                        onChange={(e) => { setChecked(e.checked); setFieldErrors(prev => ({ ...prev, terms: false })); }}
                        checked={checked}
                        className={fieldErrors.terms ? "border-red-500" : ""}
                      />
                      <p className="text-xs font-normal text-gray-500 font-poppins leading-relaxed">
                        By clicking Create Account I agree that I have read and accepted the{" "}
                        <span className="text-primary cursor-pointer underline" onClick={() => navigate('/terms-and-conditions')}>Terms of Use</span>
                        {" "}and{" "}
                        <span className="text-primary cursor-pointer underline" onClick={() => navigate('/terms-and-conditions')}>Privacy Policy</span>
                      </p>
                    </div>
                  </>
                )}

              </div>

              {/* Navigation buttons */}
              <div className={`flex mt-8 gap-3 ${currentStep > 1 ? "justify-between" : "justify-end"}`}>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 h-[48px] border-2 border-gray-300 text-gray-600 font-poppins text-sm rounded-xl hover:border-primary hover:text-primary transition-colors"
                  >
                    <i className="pi pi-arrow-left text-xs" />
                    Back
                  </button>
                )}
                {currentStep < STEPS.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 h-[48px] bg-primary text-white font-poppins text-sm rounded-xl hover:opacity-90 transition-opacity ml-auto"
                  >
                    Continue
                    <i className="pi pi-arrow-right text-xs" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 h-[48px] bg-primary text-white font-poppins text-sm rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <ProgressSpinner style={{ width: '18px', height: '18px' }} strokeWidth="4" />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <>
                        <i className="pi pi-check text-xs" />
                        <span>Create Account</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            <p className="text-xs font-normal text-gray-400 font-poppins mt-2 pb-8">
              Protected by reCAPTCHA and subject to the{" "}
              <span className="text-primary cursor-pointer" onClick={() => navigate('/terms-and-conditions')}>SendWish Privacy Policy</span>
              {" "}and{" "}
              <span className="text-primary cursor-pointer" onClick={() => navigate('/terms-and-conditions')}>Terms of Service.</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
