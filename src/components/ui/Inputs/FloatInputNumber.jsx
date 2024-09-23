import React, { useState } from "react";

import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";
import { twMerge } from "tailwind-merge";
const FloatInputNumber = ({ labelclass = "", label = "", id, ...props }) => {
  return (
    <FloatLabel>
      <InputNumber id={id} {...props} />
      <label
        htmlFor={id}
        className={twMerge("font-poppins label-base", labelclass)}
      >
        {label}
      </label>
    </FloatLabel>
  );
};

export default FloatInputNumber;
