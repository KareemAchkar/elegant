import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ShopProductsType } from "../../../types/carouselProducts";
import ProductsFromServer from './../../../services/BackUpData.json';
import { ProductsContext } from "../../../context/ProductContext";

type Props = {
  shopProducts: ShopProductsType[];
  setShopProducts: React.Dispatch<React.SetStateAction<ShopProductsType[]>>;
};

export const SortBy: React.FC<Props> = ({ shopProducts, setShopProducts }) => {
  const { disableContainer, setIsSortOpen } = useContext(ProductsContext);
  const [sortToggler, setSortToggler] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const originalData = ProductsFromServer.ShopProducts;

  const onSortToggler = () => {
    setSortToggler((prev) => !prev);
  };

  const resetSorting = () => {
    if (selectedOption !== '') {
      setShopProducts(originalData);
      setSelectedOption('');
      disableContainer();

      setIsSortOpen(false)

    }
  };

  const sortLowestPrice = () => {
    if (selectedOption !== "Lowest Price") {
      const sortedProducts = [...shopProducts].sort((a, b) => Number(a.price) - Number(b.price));
      setShopProducts(sortedProducts);
      setSelectedOption("Lowest Price");
      disableContainer();

      setIsSortOpen(false)
    }
  };

  const sortHighestPrice = () => {
    if (selectedOption !== "Highest Price") {
      const sortedProducts = [...shopProducts].sort((b, a) => Number(a.price) - Number(b.price));
      setShopProducts(sortedProducts);
      setSelectedOption("Highest Price");
      disableContainer();

      setIsSortOpen(false)
    }
  };

  return (
    <>
      <div className="side-container sortbyprice">
        <div className="text-container" onClick={onSortToggler}>
          <p className="sort-text">Sort By</p>
          {sortToggler ? (
            <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faAngleUp} className="sortup" />
          ) : (
            <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faAngleDown} className="sortdown" />
          )}
        </div>
        {sortToggler && (
          <ul>
            <label className="checkbox-label">
              <input
                type="checkbox"
                value="Reset Sorting"
                checked={selectedOption === ''}
                onChange={resetSorting}
                className="checkbox-input"
              />
              Suggested
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                value="Lowest Price"
                checked={selectedOption === "Lowest Price"}
                onChange={sortLowestPrice}
                className="checkbox-input"
              />
              Lowest Price
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                value="Highest Price"
                checked={selectedOption === "Highest Price"}
                onChange={sortHighestPrice}
                className="checkbox-input"
              />
              Highest Price
            </label>
          </ul>
        )}

      </div>

    </>

  );
};
