import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/logo/logo-Zm88lW5l.png";
import SearchInput from "../SearchInput/SearchInput";
import Slider from "../Slider/Slider";
import { Ilink } from "../../Interfaces/links";
import { User } from "../../Context/UserContext";
import "./Navbar.css";
import { cartContext } from "../../Context/CartContext";
export default function Navbar() {
  const userContext = useContext(User);

  let navigate = useNavigate();
  //profile icon
  let [isProfile, setIsProfile] = useState<boolean>(false);
  //categories btn
  let [isCategories, setIsCategories] = useState<boolean>(false);
  //slider
  let [isSlider, setIsSlider] = useState<boolean>(false);
  let { cartCount, totalPrice } = useContext(cartContext)!;
  function openSlider() {
    setIsSlider(true);
  }
  function closeSlider() {
    setIsSlider(false);
  }
  function dropDown(isData: boolean, setData: Function) {
    if (isData) {
      setData(false);
    } else {
      setData(true);
    }
  }
  let links: Ilink[] = [
    { pathName: "Home", pathLink: "/" },
    { pathName: "Shop", pathLink: "/shop" },
    { pathName: "Blog", pathLink: "/blog" },
    { pathName: "Contact", pathLink: "/contact" },
  ];
  useEffect(() => {
    document.addEventListener("click", (e) => {
      {
        let profile = document.querySelector("#profile");
        if (!profile?.contains(e.target as Node)) {
          setIsProfile(false);
        }
      }
    });
  }, []);
  return (
    <nav>
      {/* part1 */}
      <div className="bg-main h-[55px] md:h-[36px] flex justify-center items-center text-center">
        <h2 className="text-white font-normal">
          Due to current circumstances, there may be slight delays in order
          processing
        </h2>
      </div>
      {/* part 2  */}
      <div className="hidden lg:flex justify-around items-center p-3 ">
        <ul className="list-none flex  space-x-3">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/">Compare</Link>
          </li>
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
        </ul>
        <div className="flex space-x-3">
          <h3 className="flex space-x-1">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5198 10.4L15.9398 8.86C15.8465 8.82 15.7531 8.82 15.6598 8.86L11.0798 10.4C10.9998 10.4267 10.9331 10.4767 10.8798 10.55C10.8265 10.6233 10.7998 10.7067 10.7998 10.8V14.28C10.7998 15.4933 11.2065 16.6267 12.0198 17.68C12.5931 18.44 13.3531 19.1267 14.2998 19.74C14.8198 20.0733 15.2665 20.3133 15.6398 20.46C15.6798 20.4867 15.7365 20.5 15.8098 20.5C15.8831 20.5 15.9331 20.4933 15.9598 20.48L15.9998 20.46C16.9731 20.0067 17.8398 19.44 18.5998 18.76C20.0665 17.44 20.7998 15.9467 20.7998 14.28V10.8C20.7998 10.7067 20.7731 10.6233 20.7198 10.55C20.6665 10.4767 20.5998 10.4267 20.5198 10.4ZM19.9598 14.28C19.9598 15.2267 19.6598 16.1267 19.0598 16.98C18.6065 17.62 17.9998 18.2133 17.2398 18.76C16.7598 19.1067 16.2798 19.3933 15.7998 19.62C14.9065 19.18 14.1131 18.64 13.4198 18C12.2331 16.8667 11.6398 15.6267 11.6398 14.28V11.1L15.7998 9.7L19.9598 11.1V14.28ZM15.4198 15.3L17.9998 12.7C18.0798 12.62 18.1765 12.58 18.2898 12.58C18.4031 12.58 18.5065 12.62 18.5998 12.7C18.6931 12.78 18.7365 12.88 18.7298 13C18.7231 13.12 18.6798 13.22 18.5998 13.3L15.6798 16.22C15.5998 16.3 15.4998 16.34 15.3798 16.34H15.3598C15.2265 16.3133 15.1265 16.26 15.0598 16.18L13.3998 14.1C13.3198 14.0067 13.2865 13.9033 13.2998 13.79C13.3131 13.6767 13.3665 13.5833 13.4598 13.51C13.5531 13.4367 13.6565 13.4067 13.7698 13.42C13.8831 13.4333 13.9731 13.4867 14.0398 13.58L15.4198 15.3ZM11.7798 20.04C11.7798 20.16 11.7398 20.2633 11.6598 20.35C11.5798 20.4367 11.4798 20.4833 11.3598 20.49C11.2398 20.4967 11.0531 20.5 10.7998 20.5H8.7198C7.50647 20.4867 6.46314 20.0533 5.5898 19.2C4.71647 18.3467 3.9598 17.02 3.3198 15.22C2.9998 14.3267 2.6598 13.6067 2.2998 13.06C2.07314 12.74 1.79314 12.4267 1.4598 12.12C1.24647 11.9333 1.09314 11.7733 0.999805 11.64C0.866471 11.4267 0.799805 11.1867 0.799805 10.92C0.799805 10.6533 0.899805 10.4133 1.0998 10.2C1.44647 9.84 2.0398 9.66 2.8798 9.66C3.45314 9.66 4.0198 9.83333 4.5798 10.18C5.00647 10.46 5.41314 10.8267 5.7998 11.28V3C5.7998 2.53333 5.96314 2.14 6.2898 1.82C6.61647 1.5 7.00647 1.34 7.4598 1.34C7.79314 1.34 8.10647 1.43333 8.3998 1.62C8.50647 1.28667 8.70314 1.01667 8.9898 0.810001C9.27647 0.603334 9.5998 0.5 9.9598 0.5C10.3198 0.5 10.6465 0.603334 10.9398 0.810001C11.2331 1.01667 11.4331 1.28667 11.5398 1.62C11.8065 1.43333 12.1131 1.34 12.4598 1.34C12.9265 1.34 13.3231 1.50333 13.6498 1.83C13.9765 2.15667 14.1398 2.54667 14.1398 3V4.06C14.3931 3.91333 14.6665 3.84 14.9598 3.84C15.4265 3.84 15.8231 4.00333 16.1498 4.33C16.4765 4.65667 16.6398 5.04667 16.6398 5.5V6.8C16.6398 6.90667 16.5965 7 16.5098 7.08C16.4231 7.16 16.3265 7.2 16.2198 7.2C16.1131 7.2 16.0165 7.16 15.9298 7.08C15.8431 7 15.7998 6.90667 15.7998 6.8V5.5C15.7998 5.27333 15.7165 5.07667 15.5498 4.91C15.3831 4.74333 15.1865 4.66 14.9598 4.66C14.7331 4.66 14.5398 4.74333 14.3798 4.91C14.2198 5.07667 14.1398 5.27333 14.1398 5.5V7.32C14.1398 7.42667 14.0965 7.52333 14.0098 7.61C13.9231 7.69667 13.8265 7.74 13.7198 7.74C13.6131 7.74 13.5165 7.69667 13.4298 7.61C13.3431 7.52333 13.2998 7.42667 13.2998 7.32V3C13.2998 2.77333 13.2165 2.57667 13.0498 2.41C12.8831 2.24333 12.6865 2.16 12.4598 2.16C12.2331 2.16 12.0398 2.24333 11.8798 2.41C11.7198 2.57667 11.6398 2.77333 11.6398 3V8.16C11.6398 8.26667 11.5965 8.36333 11.5098 8.45C11.4231 8.53667 11.3265 8.58 11.2198 8.58C11.1131 8.58 11.0165 8.53667 10.9298 8.45C10.8431 8.36333 10.7998 8.26667 10.7998 8.16V2.16C10.7998 1.93333 10.7165 1.74 10.5498 1.58C10.3831 1.42 10.1865 1.34 9.9598 1.34C9.73314 1.34 9.5398 1.42 9.3798 1.58C9.2198 1.74 9.1398 1.93333 9.1398 2.16V10.08C9.1398 10.2 9.09647 10.3 9.0098 10.38C8.92314 10.46 8.82647 10.5 8.7198 10.5C8.61314 10.5 8.51647 10.46 8.4298 10.38C8.34314 10.3 8.2998 10.2 8.2998 10.08V3C8.2998 2.77333 8.21647 2.57667 8.0498 2.41C7.88314 2.24333 7.68647 2.16 7.4598 2.16C7.23314 2.16 7.0398 2.24333 6.8798 2.41C6.7198 2.57667 6.6398 2.77333 6.6398 3V12.58C6.6398 12.6733 6.6098 12.7567 6.5498 12.83C6.4898 12.9033 6.41314 12.9533 6.3198 12.98C6.22647 13.0067 6.13647 13 6.0498 12.96C5.96314 12.92 5.8998 12.86 5.8598 12.78L5.8398 12.74C5.5598 12.2867 5.24647 11.88 4.8998 11.52C4.23314 10.84 3.5598 10.5 2.8798 10.5C2.46647 10.5 2.1398 10.5533 1.8998 10.66C1.72647 10.74 1.6398 10.83 1.6398 10.93C1.6398 11.03 1.66314 11.1167 1.7098 11.19C1.75647 11.2633 1.8598 11.3733 2.0198 11.52C2.39314 11.8667 2.6998 12.2133 2.9398 12.56C3.3798 13.1733 3.76647 13.9667 4.0998 14.94C4.68647 16.5533 5.35314 17.7433 6.0998 18.51C6.84647 19.2767 7.7198 19.66 8.7198 19.66H11.3398C11.4465 19.6467 11.5431 19.6767 11.6298 19.75C11.7165 19.8233 11.7665 19.92 11.7798 20.04Z"
                fill="#3E445A"
              />
            </svg>
           <span>100% Secure delivery without contacting the courier</span> 
          </h3>
          <p className="text-gray-300 font-extralight">|</p>
          <h3 className="font-bold">
            Need help? Call Us: <span className=" text-main">+ 0020 500</span>
          </h3>
        </div>
        <div className="flex space-x-2">
          <p className="cursor-pointer">
            English<i className="fa-solid fa-angle-down text-xs"></i>
          </p>
          <p className="cursor-pointer">
            USD<i className="fa-solid fa-angle-down text-xs"></i>
          </p>
        </div>
      </div>
      <hr />
      {/* part 3 */}
      <div className="w-full lg:w-[90%] mx-auto py-3 shadow-lg lg:shadow-none">
        <div className="flex flex-wrap justify-evenly p-2 items-center ">
          {/* list */}
          <div
            onClick={openSlider}
            className="cursor-pointer text-main block lg:hidden"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="2em"
              width="2em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Menu_Fries">
                <path d="M20.437,19.937c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.002c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.002Z"></path>
                <path d="M20.437,11.5c0.276,-0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-10,0.001c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l10,-0.001Z"></path>
                <path d="M20.437,3.062c0.276,-0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.001c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.001Z"></path>
              </g>
            </svg>
          </div>
          {/* logo */}
          <div className="logo ">
            <Link className="w-full" to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          {/* search */}
          <div className="hidden lg:block w-7/12">
            <SearchInput closeSlider={closeSlider} />
          </div>
          {/* profile,cart */}
          <div className="flex space-x-2 items-center">
            {/* profile */}
            <div id="profile" className="relative">
              <div
                onClick={() => {
                  dropDown(isProfile, setIsProfile);
                }}
                className="w-11 h-11 rounded-full border border-solid  border-gray-300 flex justify-center items-center cursor-pointer"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.69 15.28C16.522 14.356 16.21 13.492 15.754 12.688C15.298 11.884 14.71 11.194 13.99 10.618C13.366 10.078 12.634 9.646 11.794 9.322C12.37 8.878 12.826 8.32899 13.162 7.675C13.498 7.021 13.666 6.32199 13.666 5.578C13.666 4.71399 13.456 3.91899 13.036 3.193C12.616 2.467 12.043 1.894 11.317 1.474C10.591 1.054 9.796 0.843996 8.932 0.843996C8.068 0.843996 7.273 1.054 6.547 1.474C5.821 1.894 5.248 2.467 4.828 3.193C4.408 3.91899 4.198 4.71399 4.198 5.578C4.198 6.32199 4.366 7.021 4.702 7.675C5.038 8.32899 5.494 8.878 6.07 9.322C5.266 9.658 4.54 10.09 3.892 10.618C3.196 11.194 2.614 11.878 2.146 12.67C1.678 13.462 1.36 14.302 1.192 15.19L0.921997 16.612L2.47 16.918L2.758 15.514C2.89 14.782 3.139 14.104 3.505 13.48C3.871 12.856 4.342 12.307 4.918 11.833C5.494 11.359 6.127 10.999 6.817 10.753C7.507 10.507 8.212 10.384 8.932 10.384C9.652 10.384 10.366 10.51 11.074 10.762C11.782 11.014 12.412 11.368 12.964 11.824C13.54 12.304 14.014 12.865 14.386 13.507C14.758 14.149 15.004 14.83 15.124 15.55L15.394 16.954L16.924 16.648L16.69 15.28ZM8.932 2.41C9.508 2.41 10.039 2.551 10.525 2.833C11.011 3.115 11.395 3.499 11.677 3.98499C11.959 4.47099 12.1 5.002 12.1 5.578C12.1 6.154 11.959 6.685 11.677 7.17099C11.395 7.65699 11.011 8.041 10.525 8.323C10.039 8.60499 9.508 8.746 8.932 8.746C8.356 8.746 7.825 8.60499 7.339 8.323C6.853 8.041 6.469 7.65699 6.187 7.17099C5.905 6.685 5.764 6.154 5.764 5.578C5.764 5.002 5.905 4.47099 6.187 3.98499C6.469 3.499 6.853 3.115 7.339 2.833C7.825 2.551 8.356 2.41 8.932 2.41Z"
                    fill="#3E445A"
                  />
                </svg>
              </div>
              {/* drop down profile */}
              {isProfile ? (
                <div
                  className={
                    localStorage.getItem("tokenuser")
                      ? "logout-dropdown"
                      : "profile-dropdown"
                  }
                >
                  {localStorage.getItem("tokenuser") ? (
                    <Link
                      onClick={() => {
                        setIsProfile(false);
                        localStorage.removeItem("tokenuser");
                        userContext?.updateAuth(null);
                        localStorage.removeItem("userId");
                        userContext?.updateUserId(null);
                      }}
                      className="font-semibold hover:bg-gray-100 p-2 rounded-sm transition-all duration-300 cursor-pointer"
                      to="/login"
                    >
                      Logout
                    </Link>
                  ) : (
                    <>
                      <Link
                        onClick={() => {
                          setIsProfile(false);
                        }}
                        className="font-semibold hover:bg-gray-100 p-2 rounded-sm transition-all duration-300 cursor-pointer"
                        to="/login"
                      >
                        Login
                      </Link>

                      <Link
                        onClick={() => {
                          setIsProfile(false);
                        }}
                        className="font-semibold hover:bg-gray-100 p-2 rounded-sm transition-all duration-300 cursor-pointer"
                        to="/signup"
                      >
                        Signup
                      </Link>
                    </>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            {/* total price */}
            <h3 className="font-semibold">${totalPrice.toFixed(2)}</h3>
            {/* cart */}
            <div
              onClick={() => {
                navigate("/cart");
              }}
              className="relative cursor-pointer w-11 h-11 rounded-full  bg-red-100 flex justify-center items-center"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.03399 2.161C8.52399 2.161 8.05082 2.2885 7.61449 2.5435C7.17816 2.7985 6.83249 3.14417 6.57749 3.5805C6.32249 4.01683 6.19499 4.49 6.19499 5H4.74999C4.74999 4.22933 4.93982 3.51817 5.31949 2.8665C5.69916 2.21483 6.21482 1.69917 6.86649 1.3195C7.51816 0.939833 8.22932 0.75 8.99999 0.75C9.77066 0.75 10.4818 0.939833 11.1335 1.3195C11.7852 1.69917 12.3008 2.21483 12.6805 2.8665C13.0602 3.51817 13.25 4.22933 13.25 5H16.038C16.446 5 16.7917 5.1445 17.075 5.4335C17.3583 5.7225 17.5 6.07667 17.5 6.496C17.5 6.58667 17.4943 6.67167 17.483 6.751L15.902 15.897C15.8113 16.4297 15.562 16.8717 15.154 17.223C14.746 17.5743 14.2757 17.75 13.743 17.75H4.25699C3.72432 17.75 3.25399 17.5743 2.84599 17.223C2.43799 16.8717 2.18866 16.4297 2.09799 15.897L0.516991 6.768C0.448991 6.36 0.531157 5.986 0.763491 5.646C0.995824 5.306 1.31032 5.09633 1.70699 5.017C1.78632 5.00567 1.87132 5 1.96199 5H11.873C11.873 4.49 11.7455 4.01683 11.4905 3.5805C11.2355 3.14417 10.8898 2.7985 10.4535 2.5435C10.0172 2.2885 9.54399 2.161 9.03399 2.161ZM16.038 6.411H1.96199C1.95066 6.411 1.93366 6.43367 1.91099 6.479V6.513L3.49199 15.659C3.52599 15.8403 3.60532 15.9933 3.72999 16.118C3.85466 16.2427 4.00199 16.3107 4.17199 16.322L4.25699 16.339H13.743C13.913 16.339 14.0688 16.2852 14.2105 16.1775C14.3522 16.0698 14.4457 15.9253 14.491 15.744L16.089 6.496C16.089 6.45067 16.0777 6.428 16.055 6.428L16.038 6.411Z"
                  fill="#EA2B0F"
                />
              </svg>
              <div className="absolute -top-0.5 right-0 bg-red-600 rounded-full w-5 h-5 flex justify-center items-center text-white">
                <span className="text-sm">{cartCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* part 4 */}
      <div className="hidden lg:block w-[90%] mx-auto py-3">
        <div className="flex flex-wrap justify-evenly p-2 items-center">
              
          {/* links */}
          <ul className="list-none flex justify-evenly w-[70%]">
            {links.map((item) => {
              return (
                <li key={item.pathName}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active-link" : "link"
                    }
                    to={item.pathLink}
                  >
                    {item.pathName}{" "}
                    {item.pathName == "Home" ? (
                      <i className="fa-solid fa-angle-down"></i>
                    ) : (
                      ""
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {isSlider ? (
        <Slider
          category={{
            isCategories: isCategories,
            setIsCategories: setIsCategories,
            dropDown: dropDown,
          }}
          closeSlider={closeSlider}
        />
      ) : (
        ""
      )}
    </nav>
  );
}
