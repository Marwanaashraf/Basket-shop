import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Cart from "./Pages/Cart/Cart";
import Blog from "./Pages/Blog/Blog";
import Shop from "./Pages/Shop/Shop";
import Login from "./Pages/auth/Login/Login";
import Signup from "./Pages/auth/Signup/Signup";
import Contact from "./Pages/Contact/Contact";
import NotFound from "./Pages/NotFound/NotFound";
import AddProduct from "./Pages/AddProduct/AddProduct";
import { UserProvider } from "./Context/UserContext";
import { ProductProvider } from "./Context/ProductContext";

export default function App() {
  let routes = createBrowserRouter(
    [
      {
        path: "",
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: "about", element: <About /> },
          { path: "wishlist", element: <Wishlist /> },
          { path: "cart", element: <Cart /> },
          { path: "blog", element: <Blog /> },
          { path: "shop", element: <Shop /> },
          { path: "contact", element: <Contact /> },
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
          { path: "add-product", element: <AddProduct /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
    { basename: "/Basket-shop" }
  );
  return (
    <>
      <UserProvider>
        <ProductProvider>
          <RouterProvider router={routes}></RouterProvider>
        </ProductProvider>
      </UserProvider>
    </>
  );
}
