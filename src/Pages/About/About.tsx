import React from "react";
import "./About.css";
import Avoutimg from "../../assets/Images/About/Avoutimg.png";
import Rachel from "../../assets/Images/About/about-people.jpg.png";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <div
          className="relative h-96 bg-cover bg-center flex items-center justify-center text-white"
          style={{ backgroundImage: `url(${Avoutimg})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center">
            <h1
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-[60px] text-[#FFFFFF] font-semibold"
            >
              About for Bacola
            </h1>
            <p className="WECAN text-[12px] text-[#FFFFFF] font-semibold">
              WE CAN DO MORE FOR YOU
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-[90%] mx-auto px-4 py-12">
          {/* Paragraph 1 */}
          <p className="text-[#202435] text-[14px] leading-relaxed mb-8">
            In nec purus eget metus accumsan finibus. Duis condimentum elit ut
            libero commodo iaculis. Donec augue diam, tristique et ultricies
            nec, consectetur quis enim. Nullam id rutrum ex. Aliquam a lectus at
            ipsum rhoncus dapibus non id justo. Vivamus iaculis lacinia
            vestibulum. Etiam at volutpat elit, sed blandit dolor.
          </p>

          {/* Highlighted Quote */}
          <div className="text-center my-12">
            <h3 className="text-4xl font-bold text[#202435] leading-snug text-start">
              Quisque erat urna, congue et libero in <br /> eleifend euismod
              velit.
            </h3>
          </div>

          {/* Paragraph 2 */}
          <p className="text-[#202435]font-normal text-[14px] leading-relaxed mb-8">
            In nec purus eget metus accumsan finibus. Duis condimentum elit ut
            libero commodo iaculis. Donec augue diam, tristique et ultricies
            nec, consectetur quis enim. Nullam id rutrum ex. Aliquam a lectus at
            ipsum rhoncus dapibus non id justo. Vivamus iaculis lacinia
            vestibulum.
          </p>

          {/* Team Member Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 py-12">
            <div className="w-full md:w-1/3">
              {/* Replace with your image path */}
              <img
                src={Rachel}
                alt="Rachel Leonard"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h4 className="text-sm text-gray-600 font-semibold mb-2">
                Rachel Leonard - Bacola CEO
              </h4>
              <h2 className="text-4xl font-bold text[#202435] font-bold mb-4">
                Duis convallis luctus pretium. Pellentesque habitant morbi
              </h2>
              <p className="text-[#202435] font-normal text-[14px] leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis.
              </p>
              <p className="text-[#202435] font-normal text-[14px] leading-relaxed">
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Vestibulum tortor quam,
                feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu
                libero sit amet quam egestas semper. Aenean ultricies mi vitae
                est. Mauris placerat eleifend leo. Quisque sit amet est et
                sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum
                sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum,
                elit eget tincidunt condimentum, eros ipsum rutrum orci,
                sagittis tempus lacus enim ac dui. Donec non enim in turpis
                pulvinar facilisis. Ut felis.
              </p>
            </div>
          </div>

          {/* Paragraph 3 */}
          <p className="text-[#202435] font-normal text-[14px] leading-relaxed mb-8">
            In nec purus eget metus accumsan finibus. Duis condimentum elit ut
            libero commodo iaculis. Donec augue diam, tristique et ultricies
            nec, consectetur quis enim. Nullam id rutrum ex.
          </p>
        </div>
      </div>
    </>
  );
}
