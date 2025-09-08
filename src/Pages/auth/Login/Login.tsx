import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../Context/UserContext";
import { useFormik } from "formik";
import { IUserLogin } from "../../../Interfaces/userLogin";
import * as Yup from "yup";
import { supabase } from "../../../supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

function Login() {
  const navigate = useNavigate();
  const userContext = useContext(User);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(values: IUserLogin) {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    const userId = data.user?.id;
    if (userId) {
      localStorage.setItem("userId", userId);
      userContext?.updateUserId(userId);
    }

    setLoading(false);
    if (error) {
      toast.error("Invalid email or password");
      setErrorMsg("Invalid email or password");
    } else if (data.user) {
      setErrorMsg("");

      const token = data.session?.access_token;
      if (token) {
        localStorage.setItem("tokenuser", token);
        userContext?.updateAuth(token);
      }
      toast.success("Account logged in successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }
  let initialValues: IUserLogin = {
    email: "",
    password: "",
  };
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[\w!@#$%^&*()]{8,20}$/, "password length from 8 to 20"),
  });
  let formik = useFormik<IUserLogin>({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Toaster position="top-center" />
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Log In
          </h2>

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
          {errorMsg && <p className="text-red-500 text-lg mb-4 text-center">{errorMsg}</p>}

          <button type="submit" disabled={loading} className="btn">
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
