import React,{useEffect,useState} from "react";
import squareicon from "../../assets/icons/square-list.svg";
import flashicon from "../../assets/icons/flash.png";
import calendericon from "../../assets/icons/calender.png";
import gifticon from "../../assets/icons/gifts.png";
import Line from "../../assets/icons/Line.svg";
import GreenLine from "../../assets/icons/green-line.svg";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { GetUserAmount } from "../../core/services/userData.service";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import GiftTable from "../../components/screen-components/GiftTable";
const MyGift = () => {
  interface AmountDetails {
    totalGiftAmount: number;
    totalGifts: number;
    totalSentGiftAmount:number;
    totalSentGifts:number;
    // Add other properties if necessary
  }
  
  const [amountDetails, setAmountDetails] = useState<AmountDetails>({ totalGiftAmount: 0,totalGifts: 0,totalSentGiftAmount:0,totalSentGifts:0 });
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
    fetchData();

    console.log("moin latif",amountDetails)
  }, [])
  return (
    <div className="flex flex-col items-center w-full mt-16 ">
      <div className="w-full max-w-[1228px] bg-primary rounded-xl p-5 xl:!pl-5 xl:!pr-5 2xl:!pl-10 2xl:!pr-10 xl:!pb-6 2xl:!pb-10">
        <h3 className="text-[white] font-manrope xl:text-[20px] 2xl:text-[28px] uppercase">
          Gift Statuses
        </h3>
        <div className="w-full bg-[white]  rounded-xl flex flex-col gap-5 2xl:gap-0 2xl:flex-row xl:!p-5 2xl:p-14 py-0 2xl:py-3 mt-5 justify-between flex-wrap">
          <div className="flex justify-start p-6 2xl:p-0 2xl:justify-between 2xl:w-1/2 ">
            <div className="flex items-center justify-start w-full gap-5 2xl:justify-center 2xl:gap-10 ">
              <div className="flex items-center gap-5 ">
                <div >
                  <img src={squareicon} alt="icon" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-[20px] sm:text-[30px] md:text-[36px] 2xl:text-[42px] font-manrope font-extrabold text-[#18120F] leading-10">
                    ${amountDetails?.totalGiftAmount ? amountDetails?.totalGiftAmount : 0}
                  </h1>
                  <h4 className="font-manrope text-[#6B6B6B] font-[600] mt-2 text-[12px] uppercase">
                    Earned
                  </h4>
                </div>
              </div>
              <img src={Line} className="hidden 2xl:block" />
            </div>

            <div className="flex items-center justify-end w-full gap-5 2xl:justify-center 2xl:gap-10 ">
              <div className="flex items-center gap-5">
                <div >
                  <img src={flashicon} alt="icon" />
                </div>

                <div className="flex flex-col">
                  <h1 className="text-[20px] sm:text-[30px] md:text-[36px] 2xl:text-[42px] font-manrope font-extrabold text-[#18120F] leading-10">
                  {amountDetails?.totalGifts ? amountDetails?.totalGifts : 0}
                  </h1>
                  <h4 className="font-manrope text-[#6B6B6B] font-[600] mt-2 text-[12px] uppercase">
                    Gifts Received
                  </h4>
                </div>
              </div>

              <img src={GreenLine} className="hidden 2xl:block" />
            </div>
          </div>

          <div className="flex justify-start p-6 2xl:p-0 2xl:justify-between 2xl:w-1/2">
            <div className="flex items-center justify-start w-full gap-5 2xl:justify-center 2xl:gap-10 ">
              <div className="flex items-center gap-5 ">
                <div >
                  <img src={calendericon} alt="icon" />
                </div>

                <div className="flex flex-col">
                  <h1 className="text-[20px] sm:text-[30px] md:text-[36px] 2xl:text-[42px] font-manrope font-extrabold text-[#18120F] leading-10">
                  {amountDetails?.totalSentGiftAmount ? amountDetails?.totalSentGiftAmount : 0}
                  </h1>
                  <h4 className="font-manrope text-[#6B6B6B] font-[600] mt-2 text-[12px] uppercase">
                    Sent
                  </h4>
                </div>
              </div>

              <img src={Line} className="hidden 2xl:block" />
            </div>

            <div className="flex items-center justify-end w-full gap-5 2xl:justify-center 2xl:gap-10 ">
              <div className="flex items-center gap-5 ">
                <div >
                  <img src={gifticon} alt="icon" />
                </div>

                <div className="flex flex-col">
                  <h1 className="text-[20px] sm:text-[30px] md:text-[36px] 2xl:text-[42px] font-manrope font-extrabold text-[#18120F] leading-10">
                  {amountDetails?.totalSentGifts ? amountDetails?.totalSentGifts : 0}
                  </h1>
                  <h4 className="font-manrope text-[#6B6B6B] font-[600] mt-2 text-[12px] uppercase">
                    Gifts Sent
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full rounded-xl bg-[white] mt-8 shadow-lg box-border border-b border-b-[#EBF0ED]">
        <div className="flex justify-between w-full gap-8 px-5 mt-5">
          <div className="w-full">
            <IconField iconPosition="left">
              <InputIcon className="pi pi-search"> </InputIcon>
              <InputText v-model="value1" placeholder="Search Orders"  />
            </IconField>
          </div>
          <div className="flex items-center gap-8">
          <button className="bg-[#FAFAFA] text-[#036666] rounded-xl text-[15px] font-[500] w-[110px] h-[50px] font-manrope flex justify-center items-center">
            Search
          </button>
          <button className="bg-orange w-[163px] h-[50px] rounded-xl text-[white] text-[15px] font-[500] font-manrope flex justify-center items-center">
            Create Event
          </button>
          </div>
        </div>
        <div className="flex justify-between mx-5 mt-5">
          <div className="flex gap-8">
            <div className="flex items-center gap-3">
              <h2 className="text-[#036666] font-manrope text-[14px] font-[600] uppercase">
                All Gifts
              </h2>
              <div className="p-3 font-manrope bg-[#FAFAFA] border-[#036666] rounded-xl">
                (120)
              </div>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-[#036666] font-manrope text-[14px] font-[600] uppercase">
                Delivered
              </h2>
              <div className="p-3 font-manrope bg-[#FAFAFA] border-[#036666] rounded-xl">
                (90)
              </div>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-[#036666] font-manrope text-[14px] font-[600] uppercase">
                Pending
              </h2>
              <div className="p-3 font-manrope bg-[#FAFAFA] border-[#036666] rounded-xl">
                (30)
              </div>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-[#036666] font-manrope text-[14px] font-[600] uppercase">
                Cancelled
              </h2>
              <div className="p-3 font-manrope bg-[#FAFAFA] border-[#036666] rounded-xl">
                (30)
              </div>
            </div>
          </div>
          <div>
            <Button
              label="Filters"
              icon="pi pi-filter"
              className="!bg-[#FAFAFA] !border-[#EBF0ED] font-manrope w-[115px] h-[36px] text-[#6B6B6B]"
            />
          </div>
        </div>

        <div className="pt-5 mt-5 border-t border-t-[#EBF0ED]">
          <GiftTable />
        </div>
      </div> */}
    </div>
  );
};

export default MyGift;
