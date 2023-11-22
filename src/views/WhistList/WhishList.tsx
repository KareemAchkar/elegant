import { useContext } from 'react';
import { Product } from '../../components/Product/Product';
import './WhishList.scss';
import { ProductsContext } from '../../context/ProductContext';
import { ClipLoader } from 'react-spinners';
import { Button } from '../../components/LoadMore/LoadMore';
import { Link } from 'react-router-dom';

export const WhishList = () => {
  const { favoritedProducts, selectedId, setSelectedId } = useContext(ProductsContext);

  return (
    <>
      <div className="container page-container">
        {favoritedProducts.length > 0 ? (
          <div>
            <p className='product-favorite-warning'>One or more of our favorites is sold out; But you can find these products from the warehouses closest to you.</p>
          </div>
        ) : (
          <div className='product-favorite-container'>
            <p className='product-favorite-title'> No Favourite Items </p>
            <div className='e-container'>
              <svg className='favHeart' xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90">
                <path fill="#22242A" d="M26.987 11.25c-5.036 0-10.071 2.007-13.839 6-7.535 7.988-7.527 20.615 0 28.608l30.38 32.274c.364.392.893.618 1.456.618.559 0 1.088-.226 1.456-.618 10.139-10.746 20.27-21.5 30.409-32.246 7.535-7.99 7.535-20.62 0-28.609-7.535-7.989-20.143-7.989-27.677 0l-4.173 4.416-4.173-4.444c-3.767-3.992-8.803-5.999-13.838-5.999h-.001zm0 3.416c3.925 0 7.861 1.636 10.957 4.917l5.613 5.971c.364.393.893.618 1.456.618.56 0 1.089-.225 1.456-.618l5.584-5.944c6.191-6.565 15.692-6.561 21.883 0 6.192 6.562 6.192 17.38 0 23.943-9.647 10.225-19.29 20.466-28.938 30.69L16.06 43.526c-6.188-6.572-6.192-17.38 0-23.942 3.095-3.281 7.002-4.916 10.927-4.916z" />
              </svg>
              <p className='product-favorite-title middle'>There are no products in your favorites.</p>
              <Link to='/woman' style={{ textDecoration: 'none' }}>
                <Button
                  classname='Button shopnow'
                  onClick={() => { }}
                  text='Start Shopping'
                  disabled={false}
                  isLoading={false}
                  type='button'
                />
              </Link>
            </div>
          </div>
        )}

        <div className="productlayout-container">
          <div className="products-container fav">
            {favoritedProducts.map((product, i) => (
              <Product
                key={product.id}  // Make sure to add a unique key for each Product component
                product={product}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                i={i}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="loader-wrapper">
        <ClipLoader color="#222222" size={50} />
      </div>
    </>
  );
};
