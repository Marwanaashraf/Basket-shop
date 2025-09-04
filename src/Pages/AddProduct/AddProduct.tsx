import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { addProduct } from "../../Apis/addProduct";
import { productForm } from "../../Interfaces/productForm";
import { productSend } from "../../Interfaces/SendProduct";

export default function AddProduct() {
  let [isLoading, setLoading] = useState<boolean>(false);
  let validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string(),
    price: Yup.string().required("price is required"),
    rate: Yup.string().required("rate is required"),
    discountPercentage: Yup.string().required("discountPercentage is required"),
    details: Yup.string().required("details is required"),
    tags: Yup.string().required("tags is required"),
    images: Yup.string().required("images is required"),
    inStock: Yup.boolean().required("inStock is required"),
    quantity: Yup.string().required("quantity is required"),
  });
  let initialValues: productForm = {
    name: "",
    category: "",
    brand: "",
    price: "",
    discountPercentage: "",
    rate: "",
    details: "",
    tags: "",
    images: "",
    quantity: "",
    inStock: true,
  };
  function submitForm(values: productForm) {
    let product: productSend = {
      name: values.name,
      category: values.category,
      brand: values.brand,
      price: Number(values.price),
      discountPercentage: Number(values.discountPercentage),
      rate: Number(values.rate),
      details: values.details,
      tags: values.tags.split(","),
      images: values.images.split(","),
      inStock: values.inStock,
      quantity: Number(values.quantity),
    };

    addProduct(product, setLoading);
  }
  let formik = useFormik<productForm>({
    initialValues,
    onSubmit: submitForm,
    validationSchema,
  });

  return (
    <>
      <Toaster position="top-center" />
      <div className="my-8 mb-14 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] mx-auto p-5 border border-solid border-gray-200 rounded-lg shadow-lg">
        <h1 className="text-4xl text-center my-3">Add Product</h1>
        <div className="bg-amber-200 border border-solid border-amber-400 rounded-lg p-3 my-2">
          <p className="text-amber-700">
            Notes: *if you enter more images or tages split between its ','{" "}
            <br />
            *stock field contain true or false only
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="my-7">
          <div className="my-3">
            <label className="text-xl capitalize" htmlFor="pName">
              product Name
            </label>
            <input
              className="form-input"
              type="text"
              name="name"
              id="pName"
              placeholder="Enter product Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <h4 className="text-red-600 text-lg">
                <i className="fa-regular fa-circle-xmark"></i>{" "}
                {formik.errors.name}
              </h4>
            ) : (
              ""
            )}
          </div>

          <div className="my-3">
            <label className="text-xl capitalize" htmlFor="pCategory">
              product Category
            </label>
            <input
              className="form-input"
              type="text"
              name="category"
              id="pCategory"
              placeholder="Enter product Category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.category && formik.touched.category ? (
              <h4 className="text-red-600 text-lg">
                <i className="fa-regular fa-circle-xmark"></i>{" "}
                {formik.errors.category}
              </h4>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label className="text-xl capitalize" htmlFor="pBrand">
              product brand
            </label>
            <input
              className="form-input"
              type="text"
              name="brand"
              id="pBrand"
              placeholder="Enter product brand"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.brand && formik.touched.brand ? (
              <h4 className="text-red-600 text-lg">
                <i className="fa-regular fa-circle-xmark"></i>{" "}
                {formik.errors.brand}
              </h4>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label className="text-xl capitalize" htmlFor="pPrice">
              product price
            </label>
            <input
              className="form-input"
              type="text"
              name="price"
              id="pPrice"
              placeholder="Enter product price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.price && formik.touched.price ? (
              <h4 className="text-red-600 text-lg">
                <i className="fa-regular fa-circle-xmark"></i>{" "}
                {formik.errors.price}
              </h4>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label className="text-xl capitalize" htmlFor="pRate">
              product rate
            </label>
            <input
              className="form-input"
              type="text"
              name="rate"
              id="pRate"
              placeholder="Enter product rate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rate && formik.touched.rate ? (
              <h4 className="text-red-600 text-lg">
                <i className="fa-regular fa-circle-xmark"></i>{" "}
                {formik.errors.rate}
              </h4>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label className="text-xl capitalize" htmlFor="pDiscount">
              product discount
            </label>
            <input
              className="form-input"
              type="text"
              name="discountPercentage"
              id="pDiscount"
              placeholder="Enter product Discount Percentage"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.discountPercentage &&
            formik.touched.discountPercentage ? (
              <h4 className="text-red-600 text-lg">
                <i className="fa-regular fa-circle-xmark"></i>{" "}
                {formik.errors.discountPercentage}
              </h4>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label className="text-xl capitalize" htmlFor="pImages">
              product Images
            </label>
            <input
              className="form-input"
              type="text"
              multiple
              name="images"
              id="pImages"
              placeholder="Enter product Images"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.images && formik.touched.images ? (
              <h4 className="text-red-600 text-lg">
                <i className="fa-regular fa-circle-xmark"></i>{" "}
                {formik.errors.images}
              </h4>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label className="text-xl capitalize" htmlFor="pTags">
              product tags
            </label>
            <input
              className="form-input"
              type="text"
              name="tags"
              id="pTags"
              placeholder="Enter product tags"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.tags && formik.touched.tags ? (
              <h4 className="text-red-600 text-lg">
                <i className="fa-regular fa-circle-xmark"></i>{" "}
                {formik.errors.tags}
              </h4>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label className="text-xl capitalize" htmlFor="pStock">
              product Stock
            </label>
            <select
              className="form-input"
              name="inStock"
              id="pStock"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>

            {formik.errors.inStock && formik.touched.inStock ? (
              <h4 className="text-red-600 text-lg">
                <i className="fa-regular fa-circle-xmark"></i>{" "}
                {formik.errors.inStock}
              </h4>
            ) : (
              ""
            )}
          </div>

          <div className="my-3">
            <label className="text-xl capitalize" htmlFor="quantity">
              Quantity
            </label>
            <br />
            <input
              className="form-input"
              name="quantity"
              id="quantity"
              placeholder="Enter product quantity"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>

            {formik.errors.quantity && formik.touched.quantity ? (
              <h4 className="text-red-600 text-lg">
                <i className="fa-regular fa-circle-xmark"></i>{" "}
                {formik.errors.quantity}
              </h4>
            ) : (
              ""
            )}
          </div>
          <div className="my-3">
            <label className="text-xl capitalize" htmlFor="pDetails">
              product Details
            </label>
            <br />
            <textarea
              className="form-input"
              name="details"
              id="pDetails"
              placeholder="Enter product details"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>

            {formik.errors.details && formik.touched.details ? (
              <h4 className="text-red-600 text-lg">
                <i className="fa-regular fa-circle-xmark"></i>{" "}
                {formik.errors.details}
              </h4>
            ) : (
              ""
            )}
          </div>

          <div className="my-3 text-center">
            {isLoading ? (
              <button type="button" className="btn">
                <i className="fa-solid fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button type="submit" className="btn">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
