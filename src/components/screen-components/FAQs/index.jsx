import { Accordion, AccordionTab } from "primereact/accordion";
import collapseIcon from "../../../../src/assets/images/collapse-icon.svg";
const FAQs = () => {
  return (
    <Accordion
      className="flex flex-col !gap-6 w-full  justify-center items-center"
      activeIndex={0}
      expandIcon={
        <img
          src={collapseIcon}
          className="absolute right-0 lg:w-[30px] h-[30px]"
        />
      }
      collapseIcon={
        <img
          src={collapseIcon}
          className="absolute right-0 rotate-90 lg:w-[30px] h-[30px]"
        />
      }
    >
      <AccordionTab header="What is SendWish?">
        <p className="m-0">
        SendWish is a modern twist on the classic wishing well and cash registry concepts, offering an effortless and meaningful cash gifting experience for any event, celebration or condolences.
        </p>
      </AccordionTab>
      <AccordionTab header="Who can see my gifts?">
        <p className="m-0">
        Only you will be able to view the gifts and the heartfelt messages you’ve received. This information remains private and is not visible to your guests or on your gifting dashboard page.

        </p>
      </AccordionTab>
      <AccordionTab header="Are there any fees?">
        <p className="m-0">
        As the event creator, you can enjoy SendWish without any charges - there are no platform fees for you. A small transaction and processing fee (5%) is applied to each gift and is paid by the "cash gifter" or contributor Additional fees may apply for non-local credit cards.
        </p>
      </AccordionTab>
      <AccordionTab header="Is it secure?">
        <p className="m-0">
        Absolutely. Payments are processed securely via Stripe, ensuring all your information is protected in accordance with our privacy policy.
        </p>
      </AccordionTab>
      <AccordionTab header="Where can i find inspiration and tips?">
        <p className="m-0">
        Our AI content creation tool makes it easy for contributors to craft personalised messages, enhancing their cash gifting experience and adding an extra special touch to your event!.
        </p>
      </AccordionTab>
      <AccordionTab header="Still have questions?">
        <p className="m-0">
        For more detailed information, contact us at sendwishinfo@gmail.com. We’re here to help!
        </p>
      </AccordionTab>
    </Accordion>
  );
};

export default FAQs;
