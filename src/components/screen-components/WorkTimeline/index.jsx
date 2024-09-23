import React from 'react'
import step1 from "../../../../src/assets/images/step1.png";
import step2 from "../../../../src/assets/images/step2.png";
import step3 from "../../../../src/assets/images/step3.png";
import step4 from "../../../../src/assets/images/step4.png";
import { Timeline } from "primereact/timeline";
const WorkTimeline = () => {
    const events = [
        { image: step1 },
        { image: step1 },
        { image: step2 },
        { image: step3 },
        { image: step4 },
        { image: step4 },
      ];
      const customizedMarker = (item, index) => {
        return (
          <>
            {index !== 0 && index !== events.length - 1 && (
              <span className="w-[25px] h-[25px] bg-[white] border-[2px] rounded-[50%]"></span>
            )}
          </>
        );
      };
      const customizedContent = (item, index) => {
        return (
          <>
            {index !== 0 && index !== events.length - 1 && (
              <>{index % 2 !== 0 && <img src={item?.image} className="-mt-9" />}</>
            )}
          </>
        );
      };
      const customizedOpposite = (item, index) => {
        return (
          <>
            {index !== 0 && index !== events.length - 1 && (
              <>{index % 2 === 0 && <img src={item?.image} className="-mt-9" />}</>
            )}
          </>
        );
      };
  return (
    <Timeline
          value={events}
          opposite={customizedOpposite}
          className="w-full "
          marker={customizedMarker}
          content={customizedContent}
        />
  )
}

export default WorkTimeline