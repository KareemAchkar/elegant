import { ColourPicker } from "../ColourPicker/ColourPicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright, faShop } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../components/LoadMore/LoadMore";
import { ProductSize } from "../ProductSize/ProductSize";
import { useContext, useEffect, useState } from "react";
import { ShopProductsType } from "../../../types/carouselProducts";
import { FavoriteIcon } from "../../../components/FavoriteIcon/FavoriteIcon";
import { ProductsContext } from "../../../context/ProductContext";
import paymentProducts from '../../../assets/images/product-imgs/payment-icons.png'

type Props = {
  foundProduct: ShopProductsType | undefined;
};

export const ProductInfo: React.FC<Props> = ({ foundProduct }) => {
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('');
  const { setIsAddClicked, myCartCounter, setMyCartCounter, addedProducts, setAddedProducts } = useContext(ProductsContext)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const onSelectedColor = (colour: string) => {
    setSelectedColor(colour);
  };

  const onSelectedSize = (size: string) => {
    setSelectedSize(size);
  };

  const onAddHandler = () => {
    if (foundProduct) {
      setIsLoading(true);
      setIsButtonDisabled(true);

      const added = [...addedProducts, foundProduct];
      setAddedProducts(added);

      setTimeout(() => {
        setIsLoading(false);
        setIsButtonDisabled(false);
        setIsAddClicked(true);
        setMyCartCounter(myCartCounter + 1);
      }, 700);

      setTimeout(() => {
        setIsAddClicked(false);
      }, 4000);

      localStorage.setItem('myCartCounter', (myCartCounter + 1).toString());
      localStorage.setItem('addedItems', JSON.stringify(added));
    }
  };


 

  return (
    <>
      {foundProduct && (
        <div className="product-info">
          <div className="product-info-limiter">
            <div className="product-fav-info">
              <p className="product-title">{foundProduct.title}</p>
              <FavoriteIcon
                product={foundProduct}
                classname={'product-fav-icon my-fav'}
              />
            </div>
            <p className="product-price">{foundProduct.price}$</p>
            <div className="product-salesprice-container">
              <p className="product-salesprice">Basket Amount</p>
              <p className="product-salesprice-value">${foundProduct.saleprice}</p>
            </div>
            <ColourPicker onSelectColour={onSelectedColor} selectedColour={selectedColor} />
            <div className="product-delivery-maincontainer">
              <div className="product-delivery-container">
                <FontAwesomeIcon icon={faShop} />
                <span>Free Delivery From Shop</span>
              </div>
              <div className="product-delivery-container">
                <FontAwesomeIcon icon={faCopyright} />
                <span>100% Original</span>
              </div>
            </div>
            <ProductSize onSelectedSize={onSelectedSize} selectedSize={selectedSize} />
            {isButtonDisabled
              ? (
                <Button
                  classname="product-addButton disabled"
                  onClick={onAddHandler}
                  text="ADD TO BASKET"
                  disabled={true}
                  isLoading={isLoading}

                />
              )
              : (
                <Button
                  classname="product-addButton"
                  onClick={onAddHandler}
                  text="ADD TO BASKET"
                  disabled={false}
                  isLoading={isLoading}
                />
              )
            }
            <img className="product-payment-icons" src={paymentProducts} alt="payment-icons" />
          </div>
        </div>
      )}
    </>
  );
};
