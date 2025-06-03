import { GetUserAmount } from "../../core/services/userData.service";
import { checkKycStatus } from "../../core/services/kyc.service";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [amountDetails, setAmountDetails] = useState(0);
  const [showKycModal, setShowKycModal] = useState(false);
  const [kycError, setKycError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetUserAmount();
        setAmountDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const checkKyc = async () => {
      try {
        const stripeAccountId = localStorage.getItem("customerStripeAccountId");
        if (!stripeAccountId) {
          console.log("No stripe account id found");
          return;
        }

        const response = await checkKycStatus(stripeAccountId);
        
        if (response.data.status === "requires_resubmission" && response.data.errors?.length > 0) {
          setKycError(response.data.errors[0].reason);
          setShowKycModal(true);
        }
      } catch (error) {
        console.error("Error checking KYC status:", error);
      }
    };

    fetchData();
    checkKyc();
  }, []);

  const handleResubmit = () => {
    navigate("/resubmit-kyc");
  };

  return (
    <div className="min-h-[85vh] rounded-xl bg-[#FFFFFF] mt-3 shadow-lg pt-[30px] px-[30px] relative">
      {showKycModal && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[54]" onClick={(e) => e.stopPropagation()} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[54] w-[380px] bg-[#FFFFFF] rounded-lg shadow-xl p-6">
            {/* <button
              onClick={() => setShowKycModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button> */}
            <div className="mt-4">
              <p className="text-gray-700 font-manrope font-semibold text-center mb-4">{kycError}</p>
              <button
                onClick={handleResubmit}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                Resubmit Documents
              </button>
            </div>
          </div>
        </>
      )}

      <h1 className="font-manrope font-semibold text-[28px] xl:text-[36px] 2xl:text-[36px] text-[#18120F]">
        Overview
      </h1>
      <div className="flex flex-col items-center md:flex-row justify-center w-full gap-20 mt-[50px]">
        <div className="bg-primary flex flex-col justify-center items-center rounded-xl w-full sm: h-[450px]">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[white] text-[35px] sm:text-[70px] font-manrope font-extrabold">${amountDetails?.totalGiftAmount ? amountDetails?.totalGiftAmount : 0}</h1>
            <h3 className="text-[white] text-[16px] sm:text-[20px] font-manrope font-bold">Received From</h3>
            <div className="flex items-center gap-2">
            <h1 className="text-[white] text-[30px] sm:text-[60px] font-manrope font-extrabold">{amountDetails?.totalGifts ? amountDetails?.totalGifts : 0 }</h1>
            <h3 className="text-[white] text-[16px] sm:text-[20px] font-manrope mt-7 font-extrabold">Gifts</h3>
            </div>
          </div>
        </div>
        {/* <div className="bg-orange flex flex-col justify-center items-center rounded-xl w-full sm:w-[450px] h-[450px]">
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-[white] text-[35px] sm:text-[70px] font-manrope font-extrabold">${amountDetails?.totalSentGiftAmount ? amountDetails?.totalSentGiftAmount : 0}</h1>
            <h3 className="text-[white] text-[16px] sm:text-[20px] font-manrope font-bold">Sent In</h3>
            <div className="flex items-center gap-2">
            <h1 className="text-[white] text-[30px] sm:text-[60px] font-manrope font-extrabold">{amountDetails?.totalSentGifts ? amountDetails?.totalSentGifts : 0}</h1>
            <h3 className="text-[white] text-[16px] sm:text-[20px] font-manrope mt-7 font-extrabold">Gifts</h3>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
