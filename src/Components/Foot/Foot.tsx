import "./Footer.css";
import Everuday from "../../assets/Images/footer/Everyday.png";
import Freedelivery from "../../assets/Images/footer/Freedelivery.png";
import DailyMega from "../../assets/Images/footer/DailyMega.png";
import Bestprice from "../../assets/Images/footer/Bestprice.png";
import googlePlay from "../../assets/Images/footer/google-play.png.png";
import appStore from "../../assets/Images/footer/app-store.png.png";
import payments from "../../assets/Images/footer/payments.jpg.png";
import coupon from "../../assets/Images/footer/coupon.png.png";
export default function Footer() {
  return (
    <footer className="footer bg-light mt-5">
      <div style={{ backgroundColor: "#35AFA0" }}>
        <div className="container flex flex-col lg:flex-row justify-around items-center gap-4 py-10 px-5 lg:px-0">
          <div className="footer-newsletter-content">
            <p className="text-base font-light mb-0 discount">
              <span>$20 discount</span> for your first order
            </p>
            <h1 className="font-semibold mb-3 Joinour">
              Join our newsletter and get...
            </h1>
            <p className="Joinouremail font-normal">
              Join our email subscription now to get updates <br /> on
              promotions and coupons.
            </p>
            <div className="flex items-center p-2 bg-white rounded-sm w-full sm:w-[470px] mt-4">
              {/* Input */}
              <div className="flex items-center bg-white rounded-l-lg px-3 py-2 w-full ">
                <i className="fa-regular fa-envelope text-gray-400 mr-2"></i>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full outline-none text-gray-600 placeholder-gray-400"
                />
              </div>

              {/* Button */}
              <button className="bg-[#35AFA0] hover:bg-[#2b8e82] text-white px-4 py-2 rounded-sm h-[54px]">
                Subscribe
              </button>
            </div>
          </div>
          <div className="footer-newsletter-image mb-[-42px]">
            <img
              className="h-[277px] w-[510px]"
              src={coupon}
              alt="Newsletter"
            />
          </div>
        </div>
      </div>

      {/* Top Features */}
      <div className="footer-features container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 py-5 border-b">
        <div className="footer-feature-item flex items-center justify-center py-2 sm:px-2 lg:py-0">
          <img src={Everuday} alt="Everyday fresh products" />
          <p className="text-xs font-medium ml-2 my-0">
            Everyday fresh products
          </p>
        </div>

        <div className="footer-feature-item flex items-center justify-center py-2 sm:px-2 lg:py-0">
          <img src={Freedelivery} alt="Free delivery" />
          <p className="text-xs font-medium ml-2 my-0">
            Free delivery for order over $70
          </p>
        </div>

        <div className="footer-feature-item flex items-center justify-center py-2 sm:px-2 lg:py-0">
          <img src={DailyMega} alt="Daily Mega Discounts" />
          <p className="text-xs font-medium ml-2 my-0">Daily Mega Discounts</p>
        </div>

        <div className="footer-feature-item flex items-center justify-center py-2 sm:px-2 lg:py-0">
          <img src={Bestprice} alt="Best price" />
          <p className="text-xs font-medium ml-2 my-0">
            Best price on the market
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="footer-categories container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-10 py-10 mt-5">
        <div className="footer-category">
          <h1 className="font-semibold uppercase mb-4">Fruit & Vegetables</h1>
          <ul>
            <li>Fresh Vegetables</li>
            <li>Herbs & Seasonings</li>
            <li>Fresh Fruits</li>
            <li>Cuts & Sprouts</li>
            <li>Exotic Fruits & Veggies</li>
            <li>Packaged Produce</li>
            <li>Party Trays</li>
          </ul>
        </div>

        <div className="footer-category">
          <h1 className="font-semibold uppercase mb-4">Breakfast & Dairy</h1>
          <ul>
            <li>Milk & Flavoured Milk</li>
            <li>Butter and Margarine</li>
            <li>Cheese</li>
            <li>Eggs Substitutes</li>
            <li>Honey</li>
            <li>Marmalades</li>
            <li>Sour Cream and Dips</li>
            <li>Yogurt</li>
          </ul>
        </div>

        <div className="footer-category">
          <h1 className="font-semibold uppercase mb-4">Meat & Seafood</h1>
          <ul>
            <li>Breakfast Sausage</li>
            <li>Dinner Sausage</li>
            <li>Beef</li>
            <li>Chicken</li>
            <li>Sliced Deli Meat</li>
            <li>Shrimp</li>
            <li>Wild Caught Fillets</li>
            <li>Crab and Shellfish</li>
            <li>Farm Raised Fillets</li>
          </ul>
        </div>

        <div className="footer-category">
          <h1 className="font-semibold uppercase mb-4">Beverages</h1>
          <ul>
            <li>Water</li>
            <li>Sparkling Water</li>
            <li>Soda & Pop</li>
            <li>Coffee</li>
            <li>Milk & Plant-Based Milk</li>
            <li>Tea & Kombucha</li>
            <li>Drink Boxes & Pouches</li>
            <li>Craft Beer</li>
            <li>Wine</li>
          </ul>
        </div>

        <div className="footer-category">
          <h1 className="font-semibold uppercase mb-4">Breads & Bakery</h1>
          <ul>
            <li>Milk & Flavoured Milk</li>
            <li>Butter and Margarine</li>
            <li>Cheese</li>
            <li>Eggs Substitutes</li>
            <li>Honey</li>
            <li>Marmalades</li>
            <li>Sour Cream and Dips</li>
            <li>Yogurt</li>
          </ul>
        </div>
      </div>

      {/* Contact & Download */}
      <section className="footer-contact bg-white py-5">
        <div className="container border-b pb-5 flex flex-col sm:flex-row flex-wrap justify-around items-center gap-3">
          <div className="footer-call flex items-center gap-3">
            <div className="border border-gray-300 rounded-full w-11 h-11 flex justify-center items-center">
              <i className="fa-solid fa-phone-volume"></i>{" "}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-0">8 800 555-55</h3>
              <p className="font-normal mb-0">Working 8:00 - 22:00</p>
            </div>
          </div>

          <div className="footer-download flex flex-col sm:flex-row items-center gap-3">
            <div>
              <h3 className="font-semibold mb-0 text-sm">
                Download App on Mobile :
              </h3>
              <p className="text-xs font-normal mb-0">
                15% discount on your first purchase
              </p>
            </div>
            <div className="footer-download-links flex flex-col sm:flex-row items-center gap-3">
              <a href="">
                <img src={googlePlay} alt="Google Play" />
              </a>
              <a href="">
                <img src={appStore} alt="App Store" />
              </a>
              <ul className="footer-social flex flex-row  gap-2 p-0 md:p-4 lg:p-6 xl:p-8 mb-0">
                <li className="border border-gray-300 rounded-full w-10 h-10 flex justify-center items-center text-main hover:bg-blue-600 hover:text-white duration-300">
                  <i className="fa-brands fa-facebook-f"></i>
                </li>
                <li className="border border-gray-300 rounded-full w-10 h-10 flex justify-center items-center text-main hover:bg-sky-400 hover:text-white duration-300">
                  <i className="fa-brands fa-twitter"></i>{" "}
                </li>
                <li className="border border-gray-300 rounded-full w-10 h-10 flex justify-center items-center text-main hover:bg-red-500 hover:text-white duration-300">
                  <i className="fa-brands fa-instagram"></i>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <section className="footer-bottom bg-white py-4">
        <div className="container flex flex-col sm:flex-row flex-wrap justify-around items-center gap-3">
          <p className="text-xs font-normal mb-0">
            Copyright 2025 © All rights reserved by Blackrise Theme
          </p>
          <div className="footer-bottom-content flex flex-col sm:flex-row items-center gap-4">
            <div className="footer-links flex gap-2 items-center">
              <a href="#" className="text-xs font-normal">
                Privacy Policy
              </a>
              <a href="#" className="text-xs font-normal">
                Terms and Conditions
              </a>
              <a href="#" className="text-xs font-normal">
                Cookie
              </a>
            </div>
            <div className="footer-payments flex items-center gap-2">
              <img src={payments} alt="Payment methods" />
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
