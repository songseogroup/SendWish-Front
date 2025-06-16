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

const Signup = () => {
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

  useEffect(() => {
    // Function to get IP address
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

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    const emptyFields = [];

    // Reset all errors first
    setFieldErrors({});

    if (!userdata.firstName) {
      errors.firstName = true;
      emptyFields.push("First Name");
      isValid = false;
    }
    if (!userdata.lastName) {
      errors.lastName = true;
      emptyFields.push("Last Name");
      isValid = false;
    }
    if (!userdata.email) {
      errors.email = true;
      emptyFields.push("Email");
      isValid = false;
    }
    if (!userdata.password) {
      errors.password = true;
      emptyFields.push("Password");
      isValid = false;
    }
    if (!userdata.phoneNumber) {
      errors.phoneNumber = true;
      emptyFields.push("Phone Number");
      isValid = false;
    }
    if (!userdata.dateOfBirth) {
      errors.dateOfBirth = true;
      emptyFields.push("Date of Birth");
      isValid = false;
    }
    if (!userdata.address.line1) {
      errors.addressLine1 = true;
      emptyFields.push("Address");
      isValid = false;
    }
    if (!userdata.address.city) {
      errors.addressCity = true;
      emptyFields.push("City");
      isValid = false;
    }
    if (!userdata.address.state) {
      errors.addressState = true;
      emptyFields.push("State");
      isValid = false;
    }
    if (!userdata.address.postalCode) {
      errors.addressPostalCode = true;
      emptyFields.push("Postal Code");
      isValid = false;
    }
    if (!userdata.iban) {
      errors.iban = true;
      emptyFields.push("IBAN");
      isValid = false;
    }
    if (!userdata.routingNumber) {
      errors.routingNumber = true;
      emptyFields.push("Routing Number");
      isValid = false;
    }
    if (!userdata.front) {
      errors.front = true;
      emptyFields.push("Front ID Document");
      isValid = false;
    }
    if (!userdata.back) {
      errors.back = true;
      emptyFields.push("Back ID Document");
      isValid = false;
    }
    if (!checked) {
      errors.terms = true;
      emptyFields.push("Terms and Conditions");
      isValid = false;
    }

    if (!isValid) {
      toast.current.show({ 
        severity: "error", 
        detail: `Please fill in the following required fields: ${emptyFields.join(", ")}`,
        life: 5000
      });
    }

    setFieldErrors(errors);
    return isValid;
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
        formData.append('ip', ipAddress);
        
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
          setFieldErrors({});
        }
      } catch (err) {
        console.log(err);
        const errorMessage = err.response?.data?.message || 'An error occurred';
        toast.current.show({ severity: "error", detail: errorMessage });
        
        // Handle field-specific API errors
        if (err.response?.data?.message) {
          const message = err.response.data.message.toLowerCase();
          const errors = { ...fieldErrors };
          
          // Check for specific field errors in the message
          if (message.includes('phone number')) {
            errors.phoneNumber = true;
          }
          if (message.includes('email')) {
            errors.email = true;
          }
          if (message.includes('iban')) {
            errors.iban = true;
          }
          if (message.includes('routing number')) {
            errors.routingNumber = true;
          }
          if (message.includes('postal code')) {
            errors.addressPostalCode = true;
          }
          if (message.includes('state')) {
            errors.addressState = true;
          }
          if (message.includes('city')) {
            errors.addressCity = true;
          }
          if (message.includes('address')) {
            errors.addressLine1 = true;
          }
          if (message.includes('first name')) {
            errors.firstName = true;
          }
          if (message.includes('last name')) {
            errors.lastName = true;
          }
          if (message.includes('password')) {
            errors.password = true;
          }
          if (message.includes('date of birth')) {
            errors.dateOfBirth = true;
          }
          if (message.includes('id document')) {
            errors.front = true;
            errors.back = true;
          }
          
          setFieldErrors(errors);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileUpload = (e, type) => {
    const file = e.files[0];
    if (file) {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        toast.current.show({ 
          severity: "error", 
          detail: "File size must be less than 5MB" 
        });
        setFieldErrors(prev => ({
          ...prev,
          [type]: true
        }));
        return;
      }
      
      setuserdata(prev => ({
        ...prev,
        [type]: file
      }));
      // Clear error for this field if file is valid
      setFieldErrors(prev => ({
        ...prev,
        [type]: false
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
Sign up in minutes to connect with Stripe and start receiving secure cash gifts and messages for any occasion. Just verify your ID and you're ready to go.
</p>


              
              <div className="grid grid-cols-2 gap-4">
                <FloatInput
                  value={userdata.firstName}
                  onChange={(e) => {
                    setuserdata({ ...userdata, firstName: e.target.value });
                    setFieldErrors(prev => ({ ...prev, firstName: false }));
                  }}
                  id="firstName"
                  label="First Name"
                  className={fieldErrors.firstName ? "border-red-500" : ""}
                />
                <FloatInput
                  value={userdata.lastName}
                  onChange={(e) => {
                    setuserdata({ ...userdata, lastName: e.target.value });
                    setFieldErrors(prev => ({ ...prev, lastName: false }));
                  }}
                  id="lastName"
                  label="Last Name"
                  className={fieldErrors.lastName ? "border-red-500" : ""}
                />
              </div>

              <FloatInput
                value={userdata.email}
                onChange={(e) => {
                  setuserdata({ ...userdata, email: e.target.value.toLowerCase() });
                  setFieldErrors(prev => ({ ...prev, email: false }));
                }}
                id="email"
                label="Email address"
                type="email"
                className={fieldErrors.email ? "border-red-500" : ""}
              />

              <PasswordInput
                value={userdata.password}
                onChange={(e) => {
                  setuserdata({ ...userdata, password: e.target.value });
                  setFieldErrors(prev => ({ ...prev, password: false }));
                }}
                id="password"
                label="Password"
                className={fieldErrors.password ? "border-red-500" : ""}
              />

              <FloatInput
                value={userdata.phoneNumber}
                onChange={(e) => {
                  setuserdata({ ...userdata, phoneNumber: e.target.value });
                  setFieldErrors(prev => ({ ...prev, phoneNumber: false }));
                }}
                id="phoneNumber"
                label="Phone Number"
                type="tel"
                className={fieldErrors.phoneNumber ? "border-red-500" : ""}
              />

              <div className="flex flex-col">
                <label className="mb-2">Date of Birth</label>
                <Calendar
                  value={userdata.dateOfBirth}
                  onChange={(e) => {
                    setuserdata({ ...userdata, dateOfBirth: e.value });
                    setFieldErrors(prev => ({ ...prev, dateOfBirth: false }));
                  }}
                  dateFormat="dd/mm/yy"
                  className={`w-full ${fieldErrors.dateOfBirth ? "border-red-500" : ""}`}
                />
              </div>

              <div className="space-y-4">
                <p className="font-medium">Address</p>
                <FloatInput
                  value={userdata.address.line1}
                  onChange={(e) => {
                    setuserdata({
                      ...userdata,
                      address: { ...userdata.address, line1: e.target.value }
                    });
                    setFieldErrors(prev => ({ ...prev, addressLine1: false }));
                  }}
                  id="addressLine1"
                  label="Address Line 1"
                  className={fieldErrors.addressLine1 ? "border-red-500" : ""}
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
                    onChange={(e) => {
                      setuserdata({
                        ...userdata,
                        address: { ...userdata.address, city: e.target.value }
                      });
                      setFieldErrors(prev => ({ ...prev, addressCity: false }));
                    }}
                    id="city"
                    label="City"
                    className={fieldErrors.addressCity ? "border-red-500" : ""}
                  />
                  <FloatInput
                    value={userdata.address.state}
                    onChange={(e) => {
                      setuserdata({
                        ...userdata,
                        address: { ...userdata.address, state: e.target.value }
                      });
                      setFieldErrors(prev => ({ ...prev, addressState: false }));
                    }}
                    id="state"
                    label="State"
                    className={fieldErrors.addressState ? "border-red-500" : ""}
                  />
                </div>
                <FloatInput
                  value={userdata.address.postalCode}
                  onChange={(e) => {
                    setuserdata({
                      ...userdata,
                      address: { ...userdata.address, postalCode: e.target.value }
                    });
                    setFieldErrors(prev => ({ ...prev, addressPostalCode: false }));
                  }}
                  id="postalCode"
                  label="Postal Code"
                  className={fieldErrors.addressPostalCode ? "border-red-500" : ""}
                />
              </div>

              <FloatInput
                value={userdata.iban}
                onChange={(e) => {
                  setuserdata({ ...userdata, iban: e.target.value });
                  setFieldErrors(prev => ({ ...prev, iban: false }));
                }}
                id="iban"
                label="IBAN / Bank Account Number"
                className={fieldErrors.iban ? "border-red-500" : ""}
              />

              <FloatInput
                value={userdata.routingNumber}
                onChange={(e) => {
                  setuserdata({ ...userdata, routingNumber: e.target.value });
                  setFieldErrors(prev => ({ ...prev, routingNumber: false }));
                }}
                id="routingNumber"
                label="Routing Number / BSB Number"
                className={fieldErrors.routingNumber ? "border-red-500" : ""}
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
                    chooseLabel="Upload Front of ID"
                    onSelect={(e) => handleFileUpload(e, 'front')}
                    auto
                    className={fieldErrors.front ? "border-red-500" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <label>Back of ID</label>
                  <FileUpload
                    mode="basic"
                    name="back"
                    accept="image/*"
                    chooseLabel="Upload Back of ID"
                    onSelect={(e) => handleFileUpload(e, 'back')}
                    auto
                    className={fieldErrors.back ? "border-red-500" : ""}
                  />
                </div>
              </div>

              <div className="flex gap-5 mt-8">
                <Checkbox
                  onChange={(e) => {
                    setChecked(e.checked);
                    setFieldErrors(prev => ({ ...prev, terms: false }));
                  }}
                  checked={checked}
                  className={fieldErrors.terms ? "border-red-500" : ""}
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

