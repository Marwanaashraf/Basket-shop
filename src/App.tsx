import React, { useState } from "react";
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
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./Pages/Checkout/Checkout";
import WishlistContextProvider from "./Context/WishlistContext";

export default function App() {
  let [showShare, setShowShare] = useState<boolean>(false);
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
          {
            path: "product/:productId",
            element: (
              <ProductDetail showShare={showShare} setShare={setShowShare} />
            ),
          },
          { path: "contact", element: <Contact /> },
          { path: "checkout", element: <Checkout /> },
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
          { path: "add-product", element: <AddProduct /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ]
  );
  return (
    <>
      <Toaster reverseOrder={false} />
      <UserProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <ProductProvider>
              <RouterProvider router={routes}></RouterProvider>
            </ProductProvider>
          </WishlistContextProvider>
        </CartContextProvider>
      </UserProvider>
    </>
  );
}
