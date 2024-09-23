import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
const PublicLayout = ({ children }) => {
  const Token = (localStorage.getItem("Token"));
  const navigate=useNavigate();
  useEffect(() => {
    const navigation = () => {
       
        if (Token!==null) {
            navigate('/dashboard');
        }
    };
    navigation();
}, [Token, navigate]); 
  return <>{Token === null ? children : null}</>;
};

export default PublicLayout;