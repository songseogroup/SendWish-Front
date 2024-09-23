import React,{useState} from 'react'
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FloatLabel } from "primereact/floatlabel";
import { twMerge } from 'tailwind-merge';

const PasswordInput = ({labelclass='',label="",id,...props}) => {
    const [showPassword,setshowPassword] = useState(false)
  return (
    <>
    <FloatLabel >
    <InputText  id={id} {...props} type={showPassword?"text":"password"}/>
    <label 
        htmlFor={id} 
        className={twMerge(
          'font-poppins label-base', 
          labelclass, 
        )}
      >
        {label}
      </label>
     {showPassword? <InputIcon onClick={()=>setshowPassword(!showPassword)} className="absolute cursor-pointer pi pi-eye top-4 right-5"> </InputIcon>:<InputIcon onClick={()=>setshowPassword(!showPassword)} className="absolute cursor-pointer pi pi-eye-slash top-4 right-5"> </InputIcon> } 
  </FloatLabel>
 
   
            
    </>
    
  )
}

export default PasswordInput