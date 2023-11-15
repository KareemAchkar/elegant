import React, { useContext, useState, useEffect } from 'react';
import './Offers.scss';
import smallCircle from '../../assets/images/red-circle-logo.png';
import { ProductsContext } from '../../context/ProductContext';

export const Offers = () => {
  const { storeOffers } = useContext(ProductsContext);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  useEffect(() => {
 
    const intervalId = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % storeOffers.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [storeOffers.length]);

  return (
    <div className='upperContainer'>
      <div>
        <img src={smallCircle} alt="offerLogo" />
      </div>
      <p>{storeOffers[currentOfferIndex]?.title}</p>
      <div>
        <img src={smallCircle} alt="offerLogo" />
      </div>
    </div>
  );
};
