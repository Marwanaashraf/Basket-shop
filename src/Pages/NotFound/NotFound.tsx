import React from "react";
import notFound from "../../assets/Images/error.svg";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
  let navigate = useNavigate()
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-20 bg-white flex flex-col justify-center items-center">
      <img className="w-96" src={notFound} alt="notFound" />
      <button onClick={()=>{navigate("/")}} className="bg-main text-white rounded-lg px-7 py-2"><i className="fa-solid fa-house"></i> Back to home</button>
    </div>
  );
}
