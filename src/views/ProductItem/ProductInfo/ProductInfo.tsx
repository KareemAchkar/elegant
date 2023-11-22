import { ColourPicker } from "../ColourPicker/ColourPicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright, faShop } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../components/LoadMore/LoadMore";
import { ProductSize } from "../ProductSize/ProductSize";
import { useContext, useState } from "react";
import { ShopProductsType } from "../../../types/carouselProducts";
import { FavoriteIcon } from "../../../components/FavoriteIcon/FavoriteIcon";
import { ProductsContext } from "../../../context/ProductContext";
import paymentProducts from '../../../assets/images/product-imgs/payment-icons.png'

type Props = {
  foundProduct: ShopProductsType | undefined;
};

export const ProductInfo: React.FC<Props> = ({ foundProduct }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const { setIsAddClicked, myCartCounter, setMyCartCounter, addedProducts, setAddedProducts } = useContext(ProductsContext)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSizeToggler, setHasSizeToggler] = useState(false)
  const [hasColorToggler, setHasColorToggler] = useState(false)


  const onSelectedColor = (colour: string) => {
    setSelectedColor(colour);
  };

  const onSelectedSize = (size: string) => {
    setSelectedSize(size);
  };

  const onAddHandler = () => {
    if (!selectedColor) {
      setHasColorToggler(true)
    } else {
      setHasColorToggler(false)
    }

    if (!selectedSize) {
      setHasSizeToggler(true)
    } else {
      setHasSizeToggler(false)
    }

    if (!selectedColor || !selectedSize) {
      return
    }

    if (foundProduct) {
      setIsLoading(true);
      setIsButtonDisabled(true);
      setHasSizeToggler(false)
      setHasColorToggler(false)

      const productToAdd = {      //new object with new keys and values from ghattas
        ...foundProduct,
        selectedColor,
        selectedSize,
      }

      const added = [...addedProducts, productToAdd];
      setAddedProducts(added);  // the old with new .. thats why i created new interface after ghattas

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

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    onAddHandler()
  }


  return (
    <>
      {foundProduct && (
        <form onSubmit={onSubmitHandler}>
          <div className="product-info">
            <div className="product-info-limiter">
              <div className="product-fav-info">
                <p className="product-title">{foundProduct.title}</p>
                <FavoriteIcon
                  product={foundProduct}
                  classname={'product-fav-icon my-fav'}
                />
              </div>
              <p className="product-price shop">{foundProduct.price}$</p>
              <div className="product-salesprice-container">
                <p className="product-salesprice">Basket Amount</p>
                <p className="product-salesprice-value">${foundProduct.saleprice}</p>
              </div>
              <ColourPicker onSelectColour={onSelectedColor} selectedColour={selectedColor} />
              {hasColorToggler &&
                (
                  <p className="product-selection-error">Please Choose a Color !</p>
                )}
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
              {hasSizeToggler && (
                <p className="product-selection-error">Please Choose a Size !</p>
              )}
              {isButtonDisabled
                ? (
                  <Button
                    classname="product-addButton disabled"
                    onClick={() => { }}
                    text="ADD TO BASKET"
                    disabled={true}
                    isLoading={isLoading}
                    type="submit"
                  />
                )
                : (
                  <Button
                    classname="product-addButton"
                    onClick={() => { }}
                    text="ADD TO BASKET"
                    disabled={false}
                    isLoading={isLoading}
                    type="submit"
                  />
                )
              }
              <img className="product-payment-icons" src={paymentProducts} alt="payment-icons" />
            </div>
          </div>
        </form>
      )}
    </>
  );
};
