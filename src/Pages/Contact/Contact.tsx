import React, { useState } from "react";
import "./Contact.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IContactUs } from "../../Interfaces/ContactUs";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Contact() {
  let [isLoading, setLoading] = useState<boolean>(false);
  let initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "MinLength is 3 charcters"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter Valid Email"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter Valid Phone"),
    message: Yup.string().required("Message is required"),
  });
  let sendEmail = (values: IContactUs) => {
    console.log(values);
    setLoading(true);
    emailjs
      .send(
        "service_vvx1k04",
        "template_594uk6k",
        {
          ...values,
          subject: "Support",
        },
        "85tK85GLHDCOQVZuc"
      )
      .then(() => {
        setLoading(false);
        toast.success("Thank you to contact us");
      })
      .catch((error) => {
        setLoading(false);

        toast.error("Faild please try again");
        console.log(error);
      });
  };
  let formik = useFormik<IContactUs>({
    initialValues,
    onSubmit: sendEmail,
    validationSchema,
  });
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Contact Us</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    
    <div className="w-[90%] mx-auto">
      <div className="head text-center space-y-3">
        <h1 className="text-black font-semibold text-4xl">Get In Touch</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita{" "}
          <br /> quaerat unde quam dolor culpa veritatis inventore, aut commodi
          eum <br /> veniam vel.
        </p>
      </div>
      <div className="w-[80%] mx-auto">
        <div className="contact-details grid grid-cols-1 md:grid-cols-3 gap-6 my-5">
          <div className="contact-item  text-center rounded-lg space-y-3">
            <i className="fa-solid fa-location-dot text-main text-2xl"></i>{" "}
            <h3>102 Street Nasr City</h3>
            <p>Lorem ipsum dolar site amet discont</p>
          </div>
          <div className="contact-item text-center rounded-lg space-y-3">
            <i className="fa-solid fa-phone-volume text-main text-2xl"></i>
            <h3>+20 1011658321</h3>
            <p>Lorem ipsum dolar site amet discont</p>
          </div>
          <div className="contact-item text-center rounded-lg space-y-3">
            <i className="fa-regular fa-envelope text-main text-2xl"></i>
            <h3>info@example.com</h3>
            <p>Lorem ipsum dolar site amet discont</p>
          </div>
        </div>
        <div className="ContactForm my-5">
          <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full ">
              {/* Title */}
              <h2 className=" text-5xl text-center mt-[60px] ">Send Us</h2>
              <p className="text-center text-sm font-normal text-[#202435] mt-2 ">
                Contact us for all your questions and opinions, or you can solve
                your problems in a shorter time with our contact <br /> offices.
              </p>

              {/* Line */}
              <hr className=" my-[60px] " />

              {/* Form */}
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#202435] mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full bg-[#F3F3F6] p-3  rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                    {formik.errors.name && formik.touched.name ? (
                      <p className="text-red-600 font-semibold">
                        {formik.errors.name}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <label className="block text-[#202435] mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full bg-[#F3F3F6] p-3  rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <p className="text-red-600 font-semibold">
                        {formik.errors.email}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[#202435] mb-1">
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-[#F3F3F6] p-3  rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <p className="text-red-600 font-semibold">
                      {formik.errors.phone}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[#202435] mb-1">
                    Your message
                  </label>
                  <textarea
                    name="message"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-[#F3F3F6] p-3  rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  ></textarea>
                  {formik.errors.message && formik.touched.message ? (
                    <p className="text-red-600 font-semibold">
                      {formik.errors.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#35AFA0] hover:bg-[#2b8e82] text-white px-4 py-2 rounded-md transition disabled:bg-disabled"
                >
                  {isLoading ? (
                    <span>
                      <i className="fa-solid fa-circle-notch fa-spin"></i> Send
                      Message
                    </span>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
