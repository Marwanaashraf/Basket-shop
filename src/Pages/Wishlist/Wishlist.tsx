import { useContext, useState } from 'react'
import ProductCard from '../../Components/ProductCard/ProductCard';
import { cartContext } from '../../Context/CartContext';
import { ProductContext } from '../../Context/ProductContext';
import ProductDetails from '../../Components/ProductDetails/ProductDetails';
import { wishlistContext } from '../../Context/WishlistContext';
import { Helmet } from 'react-helmet';

export default function Wishlist() {
  let productContext = useContext(ProductContext);
  let { addToCart, updateQuantity } = useContext(cartContext)!;
  let { wishlistItems } = useContext(wishlistContext)!;
  let [isLoading, setLoading] = useState<boolean>(true);

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Wishlist</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    
    <div className='w-[80%] mx-auto my-5'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {wishlistItems.map((item) => {
            console.log('item ', item.products);

            return <div className=" h-full" key={item.id}>
              <ProductCard product={item.products} addProductToCart={addToCart} updateQuantity={updateQuantity} />
            </div>;
          })}
          {productContext?.productDetails ? <ProductDetails /> : ""}
        </div>
    </div>
    </>
  )
}
