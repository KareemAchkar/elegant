import React, { useContext, useEffect } from 'react';
import cn from 'classnames'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductContext';

type CarouselProduct = {
  id: number;
  content: string;
};

type MyCarouselProps = {
  carouselProducts: CarouselProduct[];
  path: string;
};

export const MyCarousel: React.FC<MyCarouselProps> = ({ carouselProducts, path }) => {
  const { isContainerDisabled, disableContainer } = useContext(ProductsContext)

  useEffect(() => {
    disableContainer()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!carouselProducts || carouselProducts.length === 0) {
    return null;
  }

  return (
    <section className={cn('lazy-swiper-container', { 'disabled': isContainerDisabled })}>
      <Carousel
        autoFocus={true}
        infiniteLoop
        centerMode
        centerSlidePercentage={93}
        autoPlay
        interval={3000}
        emulateTouch
        showStatus={false}
        showThumbs={false}
      >
        {carouselProducts.map((product) => (
          <Link to={path} >
            <div key={product.id}>
              <img src={product.content} alt="" className='carousel-image' />
            </div>
          </Link>
        ))}
      </Carousel>
    </section >
  );
};
