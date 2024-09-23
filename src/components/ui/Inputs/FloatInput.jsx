import React,{useState} from 'react'
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { twMerge } from 'tailwind-merge';
const FloatInput = ({labelclass='',label="",id,...props}) => {

  return (
   
    <FloatLabel >
    <InputText id={id} {...props} />
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