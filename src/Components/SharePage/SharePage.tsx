import React, { useEffect } from "react";
import toast from "react-hot-toast";
type shareProps = {
  url: string;
  setShare: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function SharePage({ url, setShare }: shareProps) {
  function handleCopy() {
    navigator.clipboard.writeText(url);
    toast("Copied", {
      icon: "📋",
    });
  }
  function shareTelegram() {
    let text = `show this product👆`;
    let telegemUrl = `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${text}
`;
    window.open(telegemUrl, "_blank");
  }
  function shareFacebook() {
    let faceUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(faceUrl, "_blank");
  }
  function shareWhatsApp() {
    let whatsUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
    window.open(whatsUrl, "_blank");
  }
  function shareInsta() {
    let instaUrl = `https://www.instagram.com/?url=${encodeURIComponent(url)}`;
    window.open(instaUrl, "_blank");
  }
  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.599)" }}
      className="share-page fixed top-0 left-0 right-0 bottom-0 z-[2000] flex justify-center items-center text-black"
    >
      <div className="inside-page bg-white w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] h-60 rounded-lg relative">
        {/* close */}
        <div
          onClick={() => {
            setShare(false);
          }}
          className="absolute top-3 right-4 cursor-pointer hover:text-black transition-all duration-300"
        >
          <i className="fa-solid fa-x "></i>
        </div>

        <div className="my-5 p-3">
          <h3 className="font-semibold text-2xl">Share Product</h3>
          {/* share media */}
          <div className="flex justify-evenly my-5">
            <div
              onClick={shareFacebook}
              className="bg-blue-600 w-11 h-11 rounded-full flex justify-center items-center text-white cursor-pointer"
            >
              <i className="fa-brands fa-facebook-f text-2xl"></i>
            </div>
            <div
              onClick={shareInsta}
              className="bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] w-11 h-11 rounded-full flex justify-center items-center text-white cursor-pointer"
            >
              <i className="fa-brands fa-instagram text-2xl"></i>
            </div>

            <div
              onClick={shareWhatsApp}
              className="bg-green-500 w-11 h-11 rounded-full flex justify-center items-center text-white cursor-pointer"
            >
              <i className="fa-brands fa-whatsapp text-2xl"></i>
            </div>
            <div
              onClick={shareTelegram}
              className="bg-sky-500 w-11 h-11 rounded-full flex justify-center items-center text-white cursor-pointer"
            >
              <i className="fa-solid fa-paper-plane text-lg"></i>
            </div>
          </div>

          {/* copy url */}
          <div className="flex justify-evenly">
            <input
              className="w-[80%] h-10 rounded-lg border border-gray-300 focus:border-gray-400 focus:outline-none text-gray-500 px-2"
              type="text"
              value={url}
              readOnly
            />
            <button
              onClick={handleCopy}
              className="bg-gray-200 w-24 h-10 rounded-lg text-slate-700 hover:bg-gray-300 transition-all duration-300"
            >
              <i className="fa-solid fa-copy"></i>Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
