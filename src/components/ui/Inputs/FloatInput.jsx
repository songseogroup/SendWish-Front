import React from 'react'
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { twMerge } from 'tailwind-merge';
const FloatInput = ({labelclass='',label="",id,...props}) => {
  const hasValue =
    props.value !== undefined &&
    props.value !== null &&
    String(props.value).trim().length > 0;

  return (
   
    <FloatLabel >
    <InputText
      id={id}
      label={label}
      {...props}
      className={twMerge(props.className, hasValue ? "p-filled" : "")}
    />
   <label 
        htmlFor={id} 
        className={twMerge(
          'font-poppins label-base', 
          labelclass, 
        )}
      >
        {label}
      </label> 
  </FloatLabel>
  
  )
}

export default FloatInput
