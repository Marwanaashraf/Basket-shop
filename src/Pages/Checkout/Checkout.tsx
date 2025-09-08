import { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PaymentIcon from "../../assets/Images/payment/Payment.png";
import { IOrder } from "../../Interfaces/Order";
import { supabase, supabaseKey, supabaseUrl } from "../../supabaseClient";
import toast from "react-hot-toast";
import { User } from "../../Context/UserContext";
import { addOrder } from "../../Apis/addOrder";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";


export default function Checkout() {
    let { cartCount, cartItems, totalPrice, clearCart } = useContext(cartContext)!;
    let {auth, userId} = useContext(User)!;
    let [isLoading, setLoading] = useState<boolean>(false);
    let navigate = useNavigate();

    const contactValidation = Yup.string()
        .required("Contact is required")
        .test("email-or-phone", "Must be a valid email or phone number", (value) => {
            if (!value) return false;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^(010|011|012|015)[0-9]{8}$/; // Egyptian phone numbers

            return emailRegex.test(value) || phoneRegex.test(value);
        });

    const validationSchema = Yup.object({
        contact: contactValidation,
        first_name: Yup.string(),
        last_name: Yup.string().required("Last name is required"),
        address: Yup.string().required("Address is required"),
        apartment: Yup.string(),
        postal_code: Yup.string(),
        city: Yup.string().required("City is required"),
        country: Yup.string().required("Country is required"),
        shipping_method: Yup.string().required("Shipping method is required"),
    });

    return (
        <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
        {isLoading ? (<Loading/>) : (
            <section className="w-[80%] mx-auto my-5">
                <div className="w-full px-10">
                    <div className="flex flex-col-reverse md:flex-row  gap-6">
                        <div className="w-full lg:w-1/2 md:border-r md:border-[#DEDEDE] md:pr-6">
                            <div className="flex justify-between items-center ">
                                <h2 className="font-bold text-[21px] pb-2 text-black">Contact</h2>
                                <a onClick={() => { navigate("/login") }} className="underline text-[#1773B0] text-[14px] font-normal">Log in</a>
                            </div>
                            <Formik
                                initialValues={{
                                    contact: "",
                                    first_name: "",
                                    last_name: "",
                                    address: "",
                                    apartment: "",
                                    postal_code: "",
                                    city: "",
                                    country: "",
                                    shipping_method: "Standard",
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    const payload: IOrder = {
                                        orderData: values,
                                        cartItems: cartItems,
                                    };
                                    addOrder(payload,setLoading,auth,userId,clearCart);
                                    navigate("/");
                                }}
                            >
                                {({ handleSubmit }) => (
                                    <form onSubmit={handleSubmit} className="border-b w-full">
                                        <div className="my-4">
                                            <Field className="shadow appearance-none border-[#DEDEDE] border-[1px] rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1773B0] focus:border-[#1773B0] text-[14px]"
                                                name="contact" placeholder="Email or mobile phone number" required type="text" />
                                            <ErrorMessage name="contact" component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div className="my-4">
                                            <label className="flex items-center space-x-2 text-sm text-black-700">
                                                <input className="form-checkbox h-4 w-4 text-[#1773B0] border-[#DEDEDE] border-[1px] rounded focus:ring-[#1773B0]" type="checkbox" />
                                                <span className="text-[14px]">Email me with news and offers</span>
                                            </label>
                                        </div>
                                        <div className="mt-14">
                                            <h2 className="font-bold text-[21px] pb-2 text-black">Delivery</h2>
                                        </div>
                                        <div className="my-4">
                                            <Field className="shadow appearance-none border-[#DEDEDE] border-[1px] rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1773B0] focus:border-[#1773B0] text-[14px]" name="country" placeholder="Country/Region" type="text" />
                                            <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div className="my-4 flex flex-wrap gap-4 md:flex-nowrap">
                                            <div className="w-full md:w-1/2">
                                                <Field className="shadow appearance-none border-[#DEDEDE] border-[1px] rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1773B0] focus:border-[#1773B0] text-[14px]" name="first_name" placeholder="First Name (Optional)" type="text" />
                                                <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm" />
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <Field className="shadow appearance-none border-[#DEDEDE] border-[1px] rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1773B0] focus:border-[#1773B0] text-[14px]" name="last_name" placeholder="Last Name" type="text" />
                                                <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm" />
                                            </div>
                                        </div>
                                        <div className="my-4">
                                            <Field className="shadow appearance-none border-[#DEDEDE] border-[1px] rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1773B0] focus:border-[#1773B0] text-[14px]" name="address" placeholder="Address" type="text" />
                                            <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div className="my-4">
                                            <Field className="shadow appearance-none border-[#DEDEDE] border-[1px] rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1773B0] focus:border-[#1773B0] text-[14px]" name="apartment" placeholder="Apartment, suite, etc. (Optional)" type="text" />
                                            <ErrorMessage name="apartment" component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div className="my-4 flex flex-wrap gap-4 md:flex-nowrap">
                                            <div className="w-full md:w-1/2">
                                                <Field className="shadow appearance-none border-[#DEDEDE] border-[1px] rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1773B0] focus:border-[#1773B0] text-[14px]" name="postal_code" placeholder="Postal Code (Optional)" type="text" />
                                                <ErrorMessage name="postal_code" component="div" className="text-red-500 text-sm" />
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <Field className="shadow appearance-none border-[#DEDEDE] border-[1px] rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1773B0] focus:border-[#1773B0] text-[14px]" name="city" placeholder="City" type="text" />
                                                <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
                                            </div>
                                        </div>
                                        <div className="my-4">
                                            <label className="flex items-center space-x-2 text-sm text-black-700">
                                                <input className="form-checkbox h-4 w-4 text-[#1773B0] border-[#DEDEDE] border-[1px] rounded focus:ring-[#1773B0]" type="checkbox" />
                                                <span className="text-[14px]">Save this information for next time</span>
                                            </label>
                                        </div>
                                        <div className="my-7">
                                            <h2 className="font-bold text-[16px] pb-2 text-black">Shipping method</h2>
                                            <div className="flex justify-between items-center my-2 border-[1px] border-[#1773B0] rounded p-4 bg-[#F0F5FF]">
                                                <span>Standard</span>
                                                <span>free</span>
                                            </div>
                                        </div>
                                        <div className="my-7 "><div>
                                            <h2 className="font-bold text-[21px] pb-2 text-black">Payment</h2>
                                            <p className=" text-sm text-[#707070]">All transactions are secure and encrypted.</p>
                                        </div>
                                            <div className="my-4 p-4 bg-[#F5F5F5] flex justify-center flex-col items-center text-center rounded">
                                                <div className="mb-2">
                                                    <img loading="lazy" alt="Payment Icon" className="w-20 h-20 py-[16px] px-[8px]" src={PaymentIcon} />
                                                </div>
                                                <p className=" text-sm text-[#707070]">This store can’t accept payments right now.</p>
                                            </div>
                                        </div>
                                        <div className="my-7">
                                            
                                                {/* <button type="button" className="w-full bg-[#F5F5F5] text-black text-[19px] font-bold py-[8px] px-[16px] rounded cursor-pointer border border-[#DEDEDE] hover:bg-[#e0e0e0] transition duration-200">
                                                    <i className="fa-solid fa-spinner fa-spin"></i>
                                                </button> */}
                                            {/* ) : ( */}
                                                <button type="submit" className="w-full bg-[#F5F5F5] text-black text-[19px] font-bold py-[8px] px-[16px] rounded cursor-pointer border border-[#DEDEDE] hover:bg-[#e0e0e0] transition duration-200">Pay Now</button>
                                            {/* )} */}
                                        </div>
                                    </form>
                                )}
                            </Formik>
                            <a className="underline text-[#1773B0] text-[14px]">Privacy policy</a>
                        </div>
                        <div className="w-full md:w-1/2 info-order">
                            {cartItems.map((item) => {
                                return (
                                    <div key={item.id} className="flex justify-between items-center  py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-16 h-16 border border-[#DEDEDE] rounded shadow-md _product-image_nae10_26">
                                                <img loading="lazy" alt="Powder Canister" className="w-full h-full object-cover" src={item.products.images[0]} />
                                                <span className="absolute -top-2 -right-2 rounded-full w-5 h-5 bg-[#4B4B4B] text-white flex justify-center items-center undefined">{item.quantity}</span>
                                            </div>
                                            <p className="font-semibold text-base">{item.products.name}</p>
                                        </div>
                                        <span className="font-medium">${(item.products.price * (1 - item?.products?.discountPercentage / 100) * item.quantity).toFixed(2)}</span>
                                    </div>
                                )
                            })}

                            <div>
                                <div className="flex justify-between items-center pt-4">
                                    <p className="text-base">Subtotal ·
                                        <span className="font-medium">{cartCount} items</span>
                                    </p>
                                    <span className="text-base font-semibold">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4">
                                    <span className="text-base">Shipping</span>
                                    <span className="text-base">FREE</span>
                                </div>
                                <div className="flex justify-between items-center py-7">
                                    <span className="text-2xl font-bold">Total</span>
                                    <span className="text-base font-bold text-[18.41px]">
                                        <span className="font-light text-[#666666] text-[12px]">USD</span> ${totalPrice.toFixed(2)}
                                    </span>
                                </div>
                                <p className="text-sm text-[#707070]">Including $2.46 in taxes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>)}
        </>

    );
}