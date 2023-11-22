import React, { useContext, useEffect } from 'react';
import './App.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Woman } from './views/Woman/Woman';
import { Man } from './views/Man/Man';
import { Child } from './views/Child/Child';
import { Baby } from './views/Baby/Baby';
import { WhishList } from './views/WhistList/WhishList';
import { MyCart } from './views/MyCart/MyCart';
import { SignIn } from './views/SignIn/SignIn';
import { ProductLayout } from './Layout/ProductLayout/ProductLayout';
import { WomanProducts } from './views/WomanProducts/WomanProducts';
import { ManProducts } from './views/ManProducts/ManProducts';
import { ChildProducts } from './views/ChildProducts/ChildProducts';
import { BabyProducts } from './views/BabyProducts/BabyProducts';
import { ProductItem } from './views/ProductItem/ProductItem';
import { ProductsContext } from './context/ProductContext';
import { Checkout } from './views/Checkout/Checkout';
import { SignUp } from './views/SignUp/SignUp';

export const App = () => {
  const { favoritedProducts, setFavoritedProducts, storedFavoriteItem, setMyCartCounter, setAddedProducts, storedAddeditems, setQuantities } = useContext(ProductsContext)
  const location = useLocation();

  useEffect(() => {
    if (Array.isArray(storedFavoriteItem)) {
      setFavoritedProducts([...favoritedProducts, ...storedFavoriteItem]);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedFavoriteItem]);

  useEffect(() => {
    setAddedProducts(storedAddeditems);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedAddeditems]);

  useEffect(() => {
    const savedCartCounter = localStorage.getItem('myCartCounter');
    if (savedCartCounter) {
      setMyCartCounter(parseInt(savedCartCounter, 10));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const storedQuantities = JSON.parse(localStorage.getItem('quantities') || '[]')
    setQuantities(storedQuantities)
  }, [setQuantities])


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Woman />} />
          <Route path='woman' element={<Woman />} />
          <Route path='man' element={<Man />} />
          <Route path='child' element={<Child />} />
          <Route path='baby' element={<Baby />} />
          <Route path='SignIn' element={<SignIn />} />
          <Route path='SignUp' element={<SignUp />} />
          <Route path='WhishList' element={<WhishList />} />
          <Route path='MyCart' element={<MyCart />} />

          <Route path='season-sale' element={<ProductLayout />} >
            <Route path='woman' element={<WomanProducts />} />
            <Route path='man' element={<ManProducts />} />
            <Route path='child' element={<ChildProducts />} />
            <Route path='baby' element={<BabyProducts />} />
          </Route>

          <Route path='product-page/:productId' element={<ProductItem />} />

          <Route path='checkout' element={<Checkout />}
          />
        </Route>
      </Routes>
    </>
  );
};
