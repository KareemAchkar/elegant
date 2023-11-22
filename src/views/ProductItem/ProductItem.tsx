import './ProductItem.scss'
import { useContext, useEffect, useState } from "react";
import cn from 'classnames'
import { ClipLoader } from "react-spinners"
import { ProductInfo } from "./ProductInfo/ProductInfo"
import { ProductsContext } from "../../context/ProductContext";
import { useParams } from "react-router-dom"; 

export const ProductItem = () => {
  const { shopProducts, isContainerDisabled, disableContainer } = useContext(ProductsContext);
  const { productId } = useParams();
  const [isImage1Clicked, setIsImage1Clicked] = useState(false);
  const [isImage2Clicked, setIsImage2Clicked] = useState(false);

  const foundProduct = shopProducts.find((product) => product.id === Number(productId));

  const openImage1 = () => {
    setIsImage1Clicked(true);
  };
  const closeImage1 = () => {
    setIsImage1Clicked(false);
  };
  const openImage2 = () => {
    setIsImage2Clicked(true);
  };
  const closeImage2 = () => {
    setIsImage2Clicked(false);
  };

  useEffect(() => {
    disableContainer()
  }, [disableContainer])

  return (
    <>
      <div className="container page-container">
        <div className="productLayout">
          <div className={cn('products-container', { 'disabled': isContainerDisabled })}>
            <img
              src={foundProduct?.image}
              alt="productimg"
              className="product-item"
              onClick={openImage1}
            />
            <img
              src={foundProduct?.activeimage}
              alt="productimg"
              className="product-item"
              onClick={openImage2}
            />
          </div>
          <ProductInfo foundProduct={foundProduct} />
        </div>
      </div>
      <div className="loader-wrapper">
        <ClipLoader color="#222222" size={50} />
      </div>
      {isImage1Clicked && (
        <>
          <div className="dark-blur-overlay"></div>
          <div className={`image-modal-container ${isImage1Clicked ? 'active' : ''}`} onClick={closeImage1}>
            <img
              src={foundProduct?.image}
              alt="productimg"
              className="modal-image"
            />
          </div>
        </>
      )}
      {isImage2Clicked && (
        <>
          <div className="dark-blur-overlay"></div>
          <div className={`image-modal-container ${isImage2Clicked ? 'active' : ''}`} onClick={closeImage2}>
            <img
              src={foundProduct?.activeimage}
              alt="productimg"
              className="modal-image"
            />
          </div>
        </>
      )}
    </>
  );
};
