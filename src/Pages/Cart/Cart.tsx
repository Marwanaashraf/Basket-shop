import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
  let { cartItems, cartCount, totalPrice, removeFromCart, updateQuantity, adjustCartItems } = useContext(cartContext)!;
  const hasOutOfStock = cartItems.some((item) => !item.products.inStock);
  let navigate = useNavigate();
  useEffect(() => {
    adjustCartItems(cartItems);
  }, []);
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <div>
      <div className="relative w-[80%] mx-auto my-5">
        <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400 space-y-4">
          {cartItems.map((item) => {
            return (
              <div key={item.id} className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b">
                <div className="flex justify-center items-center gap-4 w-full sm:w-1/4">
                  <img className="w-16 h-16 object-cover rounded" src={item.products.images[0]} />
                  <p className="text-gray-800 font-medium" />
                </div>
                {item.products.inStock ?
                  <><div className="flex items-center gap-2 w-full sm:w-1/4 justify-center">
                    <button disabled={item.quantity === 1} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 border border-main rounded-full text-main disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed">−</button>
                    <span className="min-w-[32px] text-center text-sm text-gray-700">{item.quantity}</span>
                    <button disabled={item.products.quantity <= item.quantity} onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 border border-main rounded-full text-main disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed">+</button>
                  </div>
                    <div className="text-gray-800 font-semibold w-full sm:w-1/4 text-center sm:text-left">$
                      {(item.products.price * (1 - item.products.discountPercentage / 100) * item.quantity).toFixed(2)}
                    </div></> :
                  <div>Out of stock</div>
                }

                <div className="w-full sm:w-1/4 text-center sm:text-right">
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm hover:underline cursor-pointer">Remove</button>
                </div>
              </div>
            )
          })}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="flex flex-row gap-2 items-start sm:items-center">
              <div className="text-lg sm:text-2xl font-medium">Total Price:</div>
              <div className="text-lg sm:text-2xl text-mainColor font-semibold">${totalPrice.toFixed(2)}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button disabled={cartCount === 0 || hasOutOfStock} className="disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed w-full px-4 py-2 rounded-md bg-main text-white text-center hover:bg-[#247F75]" onClick={() => { if (!hasOutOfStock) navigate("/checkout") }} data-discover="true">Checkout</button>
              <button className="w-full px-4 py-2 rounded-md bg-main text-white text-center hover:bg-[#247F75]" onClick={() => { navigate("/shop") }} data-discover="true">Continue Shopping</button>
            </div>
          </div>
          {hasOutOfStock && (
            <p className="text-red-600 mt-2">
              Some items are out of stock. Please remove them before checkout.
            </p>
          )}
        </div>
      </div>

    </div>
    </>
  )
}
