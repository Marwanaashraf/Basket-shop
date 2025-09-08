import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { product } from "../../Interfaces/IproductCard";
import NavButton from "../NavButton/NavButton";
import ProductCard from "../ProductCard/ProductCard";
import { cartContext } from "../../Context/CartContext";
import { useContext } from "react";

type swiperProps = {
  products: product[];
};
export default function SwiperCaursol({ products }: swiperProps) {
  let { addToCart, updateQuantity } = useContext(cartContext)!;
  return (
    <div className="relative">
      <Swiper
        spaceBetween={20}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1536: { slidesPerView: 5 },
        }}
      >
        {products.map((item) => {
          return (
            <SwiperSlide>
              <ProductCard
                product={item}
                addProductToCart={addToCart}
                updateQuantity={updateQuantity}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <NavButton
        className={"custom-prev absolute top-1/2 -left-5 "}
        icon={<i className="fa-solid fa-chevron-left"></i>}
      />
      <NavButton
        className={"custom-next absolute top-1/2 -right-5 "}
        icon={<i className="fa-solid fa-chevron-right"></i>}
      />
    </div>
  );
}
