import React from "react";
import notFound from "../../assets/Images/error/error.svg";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function NotFound() {
  let navigate = useNavigate()
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Not Found</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[10000] bg-white flex flex-col justify-center items-center">
      <img className="w-96" src={notFound} alt="notFound" />
      <button onClick={()=>{navigate("/")}} className="bg-main text-white rounded-lg px-7 py-2"><i className="fa-solid fa-house"></i> Back to home</button>
    </div>
    </>
  );
}
