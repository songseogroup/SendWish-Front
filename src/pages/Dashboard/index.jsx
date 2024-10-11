import { GetUserAmount } from "../../core/services/userData.service";
import React,{useState,useEffect} from "react";


const Dashboard = () => {
  const [amountDetails, setAmountDetails] = useState(0);
  // const token = JSON.parse(localStorage.getItem("Token"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetUserAmount();
        setAmountDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    // fetchData();

    console.log("moin latif",amountDetails)
  }, [])
  
  return (
    <div className="min-h-[85vh] rounded-xl bg-[#FFFFFF] mt-3 shadow-lg pt-[30px] px-[30px] ">
      <h1 className="font-manrope font-semibold text-[28px] xl:text-[36px] 2xl:text-[36px] text-[#18120F]">
        Overview
      </h1>
      <div className="flex flex-col items-center md:flex-row justify-center w-full gap-20 mt-[50px]">
        <div className="bg-primary flex flex-col justify-center items-center rounded-xl w-full sm:w-[450px] h-[450px]">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[white] text-[35px] sm:text-[70px] font-manrope font-extrabold">${amountDetails?.totalGiftAmount ? amountDetails?.totalGiftAmount : 0}</h1>
            <h3 className="text-[white] text-[16px] sm:text-[20px] font-manrope font-bold">Received From</h3>
            <div className="flex items-center gap-2">
            <h1 className="text-[white] text-[30px] sm:text-[60px] font-manrope font-extrabold">{amountDetails?.totalGifts ? amountDetails?.totalGifts : 0 }</h1>
            <h3 className="text-[white] text-[16px] sm:text-[20px] font-manrope mt-7 font-extrabold">Gifts</h3>
            </div>
          </div>
        </div>
        <div className="bg-orange flex flex-col justify-center items-center rounded-xl w-full sm:w-[450px] h-[450px]">
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-[white] text-[35px] sm:text-[70px] font-manrope font-extrabold">${amountDetails?.totalSentGiftAmount ? amountDetails?.totalSentGiftAmount : 0}</h1>
            <h3 className="text-[white] text-[16px] sm:text-[20px] font-manrope font-bold">Sent In</h3>
            <div className="flex items-center gap-2">
            <h1 className="text-[white] text-[30px] sm:text-[60px] font-manrope font-extrabold">{amountDetails?.totalSentGifts ? amountDetails?.totalSentGifts : 0}</h1>
            <h3 className="text-[white] text-[16px] sm:text-[20px] font-manrope mt-7 font-extrabold">Gifts</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
