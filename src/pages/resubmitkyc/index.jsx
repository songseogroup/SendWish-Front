import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Calendar } from 'primereact/calendar';
import { FileUpload } from 'primereact/fileupload';
import { ProgressSpinner } from 'primereact/progressspinner';
import axios from 'axios';
import FloatInput from "../../components/ui/Inputs/FloatInput";

const ResubmitKyc = () => {
  const [loading, setLoading] = useState(false);
  const toast = useRef();
  const fileUploadRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    front: null,
    back: null
  });

  const validateForm = () => {
    if (!formData.firstName) {
      toast.current.show({ severity: "error", detail: "Please enter your first name" });
      return false;
    }
    if (!formData.lastName) {
      toast.current.show({ severity: "error", detail: "Please enter your last name" });
      return false;
    }
    if (!formData.dateOfBirth) {
      toast.current.show({ severity: "error", detail: "Please select your date of birth" });
      return false;
    }
    if (!formData.front) {
      toast.current.show({ severity: "error", detail: "Please upload front of ID document" });
      return false;
    }
    if (!formData.back) {
      toast.current.show({ severity: "error", detail: "Please upload back of ID document" });
      return false;
    }
    return true;
  };

  const uploadToStripe = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BASE_URL}stripe/upload-to-stripe`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      }
    );
    return response.data.fileId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);

        // Upload files to Stripe via backend
        const frontFileId = await uploadToStripe(formData.front);
        const backFileId = await uploadToStripe(formData.back);

        // Prepare the payload
        const payload = {
          accountId: localStorage.getItem("customerStripeAccountId"),
          kycPayload: {
            individual: {
              first_name: formData.firstName,
              last_name: formData.lastName,
              dob: {
                day: formData.dateOfBirth.getDate(),
                month: formData.dateOfBirth.getMonth() + 1,
                year: formData.dateOfBirth.getFullYear()
              },
              verification: {
                document: {
                  front: frontFileId,
                  back: backFileId
                }
              }
            }
          }
        };

        // Send to backend
        const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}stripe/resubmit-kyc`, payload, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("AccessToken")}`
          }
        });

        toast.current.show({
          severity: "success",
          detail: "Identification information submitted successfully",
          life: 5000
        });

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          dateOfBirth: null,
          front: null,
          back: null
        });

      } catch (err) {
        console.error(err);
        toast.current.show({ 
          severity: "error", 
          detail: err.response?.data?.message || "An error occurred while submitting Identification information" 
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileUpload = (e, type) => {
    console.log('File upload event:', e);
    const file = e.files[0];
    console.log('Selected file:', file);
    if (file) {
      setFormData(prev => {
        console.log('Previous form data:', prev);
        const newData = {
          ...prev,
          [type]: file
        };
        console.log('New form data:', newData);
        return newData;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toast ref={toast} />
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Resubmit Identification Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FloatInput
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              id="firstName"
              label="First Name"
            />
            <FloatInput
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              id="lastName"
              label="Last Name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select your Date of Birth</label>
            <Calendar
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.value })}
              dateFormat="dd/mm/yy"
              className="w-full"
              showIcon
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID Document Front
              </label>
              <FileUpload
                ref={fileUploadRef}
                mode="basic"
                name="front"
                accept="image/*"
                onSelect={(e) => handleFileUpload(e, 'front')}
                chooseLabel="Upload Front"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID Document Back
              </label>
              <FileUpload
                ref={fileUploadRef}
                mode="basic"
                name="back"
                accept="image/*"
                onSelect={(e) => handleFileUpload(e, 'back')}
                chooseLabel="Upload Back"
                className="w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {loading ? (
              <ProgressSpinner style={{ width: '20px', height: '20px' }} />
            ) : (
              'Submit Identification Information'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResubmitKyc; 