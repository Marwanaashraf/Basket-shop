import React from "react";
import "./Blog.css";
import post1 from "../../assets/Images/blog/RecentPosts1.png";
import post2 from "../../assets/Images/blog/RecentPosts2.png";
import post3 from "../../assets/Images/blog/RecentPosts3.png";
import drinks from "../../assets/Images/Home/drinks.png";
import pergale from "../../assets/Images/Home/pergale.png";
import newYear from "../../assets/Images/shop/aeb9763b1145b3dd6e2fadd6c2b27941d3d7b0fa-DkOX36JB.png";
import { Helmet } from "react-helmet";
export default function Blog() {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Blog</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    
    <div className="w-[85%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
      {/* Main Content */}
      <div className=" MainContent lg:col-span-8 space-y-8">
        {/* Post 1 */}
        <div className="bg-white">
          <img src={drinks} alt="drinks" className="w-full rounded-lg" />
          <div className="mt-4">
            <p className="text-[#9B9BB4] font-semibold uppercase text-[13px]">
              Grocery
            </p>
            <p className="text-sm text-gray-500">
              Jan 13 2025 • <span className="text-[#202435]">Sinan ISIK</span>
            </p>
            <h2 className="text-4xl font-semibold mt-2">
              But I must explain to you how all this mistaken idea
            </h2>
            <p className="text-gray-600 mt-2">
              Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque,
              sem sed convallis ultricies, ante eros laoreet libero, vitae
              suscipit lorem turpis sit amet lectus. Quisque egestas lorem ut
              mauris ultrices,...
            </p>
          </div>
        </div>

        {/* Post 2 */}
        <div className="bg-white my-10">
          <img src={pergale} alt="pergale" className="w-full rounded-lg" />
          <div className="mt-4">
            <p className="text-[#9B9BB4] font-semibold uppercase text-[13px]">
              Grocery
            </p>
            <p className="text-sm text-[#71778E]">
              Jan 13 2025 • <span className="text-[#202435]">Sinan ISIK</span>
            </p>
            <h2 className="text-4xl font-semibold mt-2 text-[#202435]">
              The Problem With Typefaces on the Web
            </h2>
            <p className="text-gray-600 mt-2">
              Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque,
              sem sed convallis ultricies, ante eros laoreet libero, vitae
              suscipit lorem turpis sit amet lectus. Quisque egestas lorem ut
              mauris ultrices,...
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="RecentPosts lg:col-span-4 space-y-8">
        {/* Recent Posts */}
        <h3 className="font-bold text-lg mb-0">Recent Posts</h3>
        <div className="RecentPosts border p-4 rounded bg-white">
          <div className="space-y-3 text-gray-700">
            <div className="RecentPosts-item flex items-center justify-start gap-3">
              <img src={post1} alt="post" className="" />
              <h3 className="font-medium text-sm">
                But I must explain to you how all thismistaken idea
              </h3>
            </div>
            <div className="RecentPosts-item flex items-center justify-start gap-3">
              <img src={post2} alt="post" className="" />
              <h3 className="font-medium text-sm">
                The Problem With Typefaces on the Web
              </h3>
            </div>
            <div className="RecentPosts-item flex items-center justify-start gap-3">
              <img src={post3} alt="post" className=" " />
              <h3 className="font-medium text-sm">
                English Breakfast Tea With Tasty DonutDesserts
              </h3>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="SocialMedia">
          <h3 className="font-bold text-lg mb-4">Social Media</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-start gap-2 bg-[#3B5998] py-3 px-4 rounded">
              <i className="fa-brands fa-facebook-f text-white"></i>

              <a href="#" className="text-[#FFFFFF] w-full ">
                Facebook
              </a>
            </div>

            <div className="flex items-center justify-start gap-2 bg-[#CC2366] text-white py-3 px-4 rounded-sm">
              <i className="fa-brands fa-instagram text-white"></i>

              <a href="#" className="text-[#FFFFFF] w-full">
                Instagram
              </a>
            </div>

            <div className="flex items-center justify-start gap-2 bg-[#1DA1F2]  py-3 px-4 rounded-sm">
              <i className="fa-brands fa-twitter text-white"></i>

              <a href="#" className="text-[#FFFFFF] w-full">
                Twitter
              </a>
            </div>

            <div className="flex items-center justify-start  gap-2 bg-[#FF4500] py-3 px-4 rounded-sm">
              <i className="fa-brands fa-reddit text-white"></i>
              <a href="#" className="text-[#FFFFFF] w-full">
                Reddit
              </a>
            </div>

            <div className="flex items-center justify-start gap-2 bg-[#E60023] py-3 px-4 rounded-sm">
              <i className="fa-brands fa-pinterest-p text-white"></i>
              <a href="#" className="text-[#FFFFFF] w-full">
                Pinterest
              </a>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="WidgetBanner">
          <h1>Widget Banner</h1>
          <img src={newYear} alt="Ad Banner" className="w-full rounded" />
        </div>

        {/* Tags */}
        <div className="Tags">
          <h3 className="font-bold text-lg mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            <span className="border px-3 py-1 rounded">ecommerce</span>
            <span className="border px-3 py-1 rounded">food</span>
            <span className="border px-3 py-1 rounded">grocery</span>
            <span className="border px-3 py-1 rounded">klbtheme</span>
            <span className="border px-3 py-1 rounded">organic</span>
            <span className="border px-3 py-1 rounded">shop</span>
            <span className="border px-3 py-1 rounded">shopify</span>
            <span className="border px-3 py-1 rounded">store</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
