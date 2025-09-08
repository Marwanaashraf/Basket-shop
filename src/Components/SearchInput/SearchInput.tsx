import React, { useContext, useEffect, useState } from "react";
import { searchProducts } from "../../Apis/searchProducts";
import { product } from "../../Interfaces/IproductCard";
import { ProductContext } from "../../Context/ProductContext";
import { useNavigate } from "react-router-dom";
type TSearchProps = {
  closeSlider: ()=>void;
};
export default function SearchInput({ closeSlider }: TSearchProps) {
  let productContext = useContext(ProductContext);
  let navigate = useNavigate();
  let [filterProducts, setFilterProducts] = useState<product[]>([]);
  let [searchValue, setSearchValue] = useState<string>("");
  let [isLoading, setLoading] = useState<boolean>(false);
  let [showResults, setShowResults] = useState(false);

  async function searchByName(e: React.ChangeEvent<HTMLInputElement>) {
    let val: string = e.currentTarget.value;
    if (!val) {
      setLoading(false);
    } else {
      setLoading(true);
      let filterProducts = await searchProducts(val);
      setFilterProducts(filterProducts);
      setSearchValue(val);
      setLoading(false);
      setShowResults(true);
    }
  }
  function handleClickProduct(item: product) {
    productContext?.setProduct(item);
    setShowResults(false);
    closeSlider();
    navigate(`product/${item.id}`);
  }
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      let searchTrack = document.getElementById("searchID");

      if (!searchTrack?.contains(e.target as Node)) {
        setShowResults(false);
      } else {
        setShowResults(true);
      }
    }
    document.addEventListener("click", handleClick);
  }, []);
  return (
    <div id="searchID" className="relative z-[90]">
      {/* search input */}
      <div className="search-input h-16 bg-gray-100 flex items-center justify-between rounded-lg p-3 ">
        <input
          onChange={searchByName}
          className="w-[90%] text-xl text-black bg-transparent placeholder:text-gray-500 placeholder:font-normal focus:border-none focus:outline-none"
          type="text"
          placeholder="Search for Products, fruit, meat, eggs .etc..."
        />
        {isLoading ? (
          <i className="fa-solid fa-circle-notch fa-spin text-main"></i>
        ) : (
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.8259 18.554L16.1299 14.858C16.7539 14.074 17.2339 13.21 17.5699 12.266C17.9379 11.274 18.1219 10.266 18.1219 9.242C18.1219 7.61 17.7139 6.09 16.8979 4.682C16.1139 3.32199 15.0419 2.25 13.6819 1.466C12.2899 0.649996 10.7739 0.241995 9.13395 0.241995C7.49395 0.241995 5.96995 0.649996 4.56195 1.466C3.21795 2.266 2.14595 3.338 1.34595 4.682C0.529948 6.09 0.121948 7.614 0.121948 9.254C0.121948 10.894 0.529948 12.41 1.34595 13.802C2.12995 15.162 3.20195 16.234 4.56195 17.018C5.96995 17.834 7.48995 18.242 9.12195 18.242C10.1779 18.242 11.1899 18.07 12.1579 17.726C13.1259 17.382 13.9859 16.89 14.7379 16.25L18.4339 19.946C18.5299 20.042 18.6419 20.118 18.7699 20.174C18.8979 20.23 19.0179 20.258 19.1299 20.258C19.2419 20.258 19.3619 20.23 19.4899 20.174C19.6179 20.118 19.7299 20.042 19.8259 19.946C20.0339 19.754 20.1379 19.526 20.1379 19.262C20.1379 18.998 20.0339 18.762 19.8259 18.554ZM2.13795 9.242C2.13795 7.962 2.44995 6.786 3.07395 5.714C3.69795 4.658 4.53795 3.818 5.59395 3.19399C6.66595 2.57 7.84195 2.258 9.12195 2.258C10.4019 2.258 11.5859 2.57 12.6739 3.19399C13.7299 3.818 14.5699 4.662 15.1939 5.726C15.8179 6.79 16.1299 7.962 16.1299 9.242C16.1299 10.17 15.9499 11.066 15.5899 11.93C15.2299 12.794 14.7459 13.53 14.1379 14.138C13.4979 14.794 12.7579 15.294 11.9179 15.638C11.0779 15.982 10.1859 16.154 9.24195 16.154C7.92995 16.186 6.72195 15.89 5.61795 15.266C4.54595 14.674 3.69795 13.842 3.07395 12.77C2.44995 11.698 2.13795 10.522 2.13795 9.242Z"
              fill="#3E445A"
            />
          </svg>
        )}
      </div>

      {/* search products */}
      {showResults ? (
        <div className="search-track  absolute bg-white w-full h-96 rounded-lg shadow-lg overflow-auto z-[10000] space-y-2 p-2">
          {filterProducts.length == 0 && searchValue ? (
            <div>
              <h3 className="font-semibold text-3xl my-5">
                No results contain "
                <span className="text-red-600">{searchValue}</span>"
              </h3>
            </div>
          ) : (
            filterProducts.map((item) => {
              return (
                <div
                  onClick={() => {
                    handleClickProduct(item);
                  }}
                  key={item.id}
                  className="flex space-x-3 w-full h-40 rounded-lg border border-solid border-gray-100 shadow-sm items-center p-3 cursor-pointer"
                >
                  <img className="w-28" src={item.images[0]} alt={item.name} />
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="line-clamp-3">{item.details}</p>
                  </div>
                  <h3 className="font-bold text-main">
                    {(
                      item.price -
                      (item.price * item.discountPercentage) / 1000
                    ).toFixed(2)}
                    $
                  </h3>
                </div>
              );
            })
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
