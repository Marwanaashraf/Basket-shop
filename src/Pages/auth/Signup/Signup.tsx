import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { useFormik } from "formik";
import { IUser } from "../../../Interfaces/user";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
export default function Signup() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: IUser) {
    console.log(values);

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: { data: { full_name: values.name } },
    });
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      toast.error(error.message);
    } else if (data.user) {
      setErrorMsg("");

      toast.success("Account created successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }
  let initialValues: IUser = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
  };
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Minlength is 2 character"),
    email: Yup.string()
      .required("email is required")
      .email("enter valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[\w!@#$%^&*()]{8,20}$/, "password length from 8 to 20"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "rePassword not matched with password"),
  });
  let formik = useFormik<IUser>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Signup</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Toaster position="top-center" />
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Create a New Account
          </h2>

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input"
          />
          {formik.errors.name && formik.touched.name ? (
            <p className="text-red-500 text-sm mb-2">{formik.errors.name}</p>
          ) : (
            ""
          )}

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input"
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="text-red-500 text-sm mb-2">{formik.errors.email}</p>
          ) : (
            ""
          )}

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input"
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="text-red-500 text-sm mb-2">
              {formik.errors.password}
            </p>
          ) : (
            ""
          )}

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Repeat Password
          </label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            placeholder="Repeat your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-input"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="text-red-500 text-sm mb-2">
              {formik.errors.rePassword}
            </p>
          ) : (
            ""
          )}

          {errorMsg && (
            <p className="text-red-500 text-lg mb-4 text-center">{errorMsg}</p>
          )}

          <button type="submit" disabled={loading} className="btn">
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}
