import React, { useState } from "react";
import { Link, NavLink, NavLinkRenderProps, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/logo-Zm88lW5l.png";
import SearchInput from "../SearchInput/SearchInput";
import CategoriesBtn from "../CategoriesBtn/CategoriesBtn";
import Slider from "../Slider/Slider";
import { Ilink } from "../../Interfaces/links";
export default function Navbar() {
  let navigate = useNavigate()
  //profile icon
  let [isProfile, setIsProfile] = useState<boolean>(false);
  //categories btn
  let [isCategories, setIsCategories] = useState<boolean>(false);
  //slider
  let [isSlider, setIsSlider] = useState<boolean>(false);
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
          <h3>100% Secure delivery without contacting the courier</h3>
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
          <div onClick={openSlider} className="cursor-pointer text-main block lg:hidden">
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
          <SearchInput />
          {/* profile,cart */}
          <div className="flex space-x-2 items-center">
            {/* profile */}
            <div className="relative">
              <div
                onClick={() => {
                  dropDown(isProfile, setIsProfile);
                }}
                className="w-11 h-11 rounded-full boder border-solid border-red-600 bg-slate-100 flex justify-center items-center cursor-pointer"
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
                <div className="profile-dropdown absolute top-12 w-40 md:w-56 h-24 bg-white shadow-lg border border-solid border-gray-200 rounded-xl flex flex-col justify-evenly p-2">
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
                </div>
              ) : (
                ""
              )}
            </div>
            {/* total price */}
            <h3 className="font-semibold">$00.00</h3>
            {/* cart */}
            <div onClick={()=>{navigate("/cart")}} className="relative cursor-pointer w-11 h-11 rounded-full  bg-red-100 flex justify-center items-center">
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
                <span className="text-sm">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* part 4 */}
      <div className="hidden lg:block w-[90%] mx-auto py-3">
        <div className="flex flex-wrap justify-evenly p-2 items-center">
          <CategoriesBtn
            isCategories={isCategories}
            setIsCategories={setIsCategories}
            dropDown={dropDown}
          />
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
      {isSlider ? <Slider
        category={{
          isCategories: isCategories,
          setIsCategories: setIsCategories,
          dropDown: dropDown,
        }}
        closeSlider={closeSlider}
      /> : ""}
     
    </nav>
  );
}
