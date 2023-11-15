import { useContext } from 'react';
import './MyCart.scss';
import { ProductsContext } from '../../context/ProductContext';
import { ClipLoader } from 'react-spinners';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/LoadMore/LoadMore';

export const MyCart = () => {
  const { addedProducts, setAddedProducts } = useContext(ProductsContext);

  const numberOfItems = addedProducts.length;
  const totalPrice = addedProducts.reduce((total, product) => total + Number(product.price), 0).toFixed(2);

  const removeItem = (selectedId: number) => {
    const indexToRemove = addedProducts.findIndex((product) => product.id === selectedId);

    if (indexToRemove !== -1) {
      const updatedProducts = addedProducts.filter((product, index) => index !== indexToRemove);
      setAddedProducts(updatedProducts);
      localStorage.setItem('addedItems', JSON.stringify(updatedProducts));
    }
  };

  const params = useParams()

  console.log('wewewew', params)

  return (
    <>
      <div className="container page-container">
        {addedProducts.length > 0 ? (
          <div>
            <h1 className='my-cart-title'>My Cart ({`${numberOfItems} Items`})</h1>
            <div className="productLayout cart-layout">
              <div className="productlayout-container">
                <div className="products-container cart-container">
                  {addedProducts.map((product, i) => (
                    <div key={`${product.id}-${i}`} className='product-card my-cart'>
                      <div className='product-card-wrapper'>
                        <Link to={`/product-page/${product.id}`}>
                          <img className='product-img my-cart' src={product.image} alt="products" loading="lazy" />
                        </Link>

                        <div className="product-details-container">
                          <p className="product-title cart-title">{product.title}</p>
                          <p className="product-price cart-price">${product.price}</p>
                          <div className="product-salesprice-container">
                            <p className="product-salesprice cart-basket">Basket Amount</p>
                            <p className="product-salesprice-value cart-value">${product.saleprice}</p>
                          </div>
                        </div>
                      </div>
                      <svg
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="16"
                        className="product-removeItem"
                        onClick={() => removeItem(product.id)}
                      >
                        <path d="M6.229 1.229C6.105 1.352 6 1.577 6 2H5c0-.577.145-1.102.521-1.479C5.898.145 6.423 0 7 0h2c.577 0 1.102.145 1.479.521C10.855.898 11 1.423 11 2h-1c0-.423-.105-.648-.229-.771C9.648 1.105 9.423 1 9 1H7c-.423 0-.648.105-.771.229ZM1 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5ZM12 15c.423 0 .648-.105.771-.229.124-.123.229-.348.229-.771V5h1v9c0 .577-.145 1.102-.521 1.479-.377.376-.902.521-1.479.521H4c-.577 0-1.102-.145-1.479-.521C2.145 15.102 2 14.577 2 14V5h1v9c0 .423.105.648.229.771.123.124.348.229.771.229h8ZM14.5 5h-13a.5.5 0 0 1 0-1h13a.5.5 0 0 1 0 1Z M6 11.5v-3a.5.5 0 0 1 1 0v3a.5.5 0 0 1-1 0ZM9 8.5v3a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-1 0Z">
                        </path>
                      </svg>
                    </div>
                  ))}
                </div>
                <div className='product-shopping-container'>
                  <div className='product-shopping-amount-container'>
                    <div className="product-shopping-amount">
                      <p className="product-shopping-title">Amount to be paid</p>
                      <p className="product-shopping-total">${totalPrice}</p>
                    </div>
                    <Link to='/season-sale/woman'>
                      <Button
                        classname="product-shopping-button"
                        onClick={() => { }}
                        text="COMPLETE YOUR SHOPPING"
                        disabled={false}
                        isLoading={false}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className='product-favorite-title'> No Cart Items </p>
            <div className='e-container'>
              <svg className='favHeart' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="67" height="67" style={{ fill: '#fff', padding: '11px 0 ' }}>
                <path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" fill="#888" />
              </svg>
              <p className='product-favorite-title middle'>There are no items in your cart.</p>
              <Link to='/woman' style={{ textDecoration: 'none' }}>
                <Button
                  classname='loadButton shopnow'
                  onClick={() => { }}
                  text='Start Shopping'
                  disabled={false}
                  isLoading={false}
                />
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="loader-wrapper">
        <ClipLoader color="#222222" size={50} />
      </div>
    </>
  );
};
