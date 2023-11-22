import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { faX } from '@fortawesome/free-solid-svg-icons';
import './ProductLayout.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Outlet } from 'react-router-dom';
import { SortBy } from './SortBy/SortBy';
import { Category } from './Category/Category';
import { Colour } from './Colour/Colour';
import { ProductsContext } from '../../context/ProductContext';
import { ClipLoader } from 'react-spinners';
import filterIcon from '../../assets/images/free-filter-icon-6554-thumb.png';
import sortIcon from '../../assets/images/free-sorticon-6554-thumb.png';

export const ProductLayout = () => {
  const {
    shopProducts,
    setShopProducts,
    selectedCategory,
    setSelectedCategory,
    selectedColour,
    setSelectedColour,
    isContainerDisabled,
    disableContainer,
    isSortOpen,
    setIsSortOpen,
  } = useContext(ProductsContext);
  const [filterToggler, setFilterToggler] = useState(true);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const onFilterToggler = () => {
    setFilterToggler((prev) => !prev);
  };

  const removeSelectedCategory = (index: number) => {
    const newSelectedCategory = [...selectedCategory];
    newSelectedCategory.splice(index, 1);
    setSelectedCategory(newSelectedCategory);
  };

  const removeSelectedColour = (index: number) => {
    const newSelectedColour = [...selectedColour];
    newSelectedColour.splice(index, 1);
    setSelectedColour(newSelectedColour);
  };

  const clearSelected = () => {
    setSelectedCategory([]);
    setSelectedColour([]);
  };

  const openFilterToggler = () => {
    setIsOverlayOpen((prev) => !prev)
  }

  const openSortToggler = () => {
    setIsSortOpen((prev) => !prev);
    if (!isSortOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  useEffect(() => {
    disableContainer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn('', { 'overlay': isOverlayOpen })} >

      {isSortOpen && (
        <>

          <div className="dark-blur-overlay"></div><div className='sort-overlayer'>
            <FontAwesomeIcon icon={faX} className="overlay-button sort"
              onClick={openSortToggler}
            />
            <SortBy
              shopProducts={shopProducts}
              setShopProducts={setShopProducts} />
          </div>
        </>
      )}

      <div className={cn('', { 'sort-overlay': isSortOpen })}>

        {isOverlayOpen && (
          <>
            <div className='overlay-header-container'>
              <FontAwesomeIcon icon={faX} className="overlay-button"
                onClick={openFilterToggler}
              />
              <p className='overlay-title'>Filter</p>
            </div>

            <div className='overlay-sort'>
              <Category />
              <Colour />
            </div>
          </>
        )}

        <div className={cn('product-layout-container', { 'disabled': isContainerDisabled })}>

          <div className={cn('toggler-container', { 'hide': isOverlayOpen })} >
            <div className='toggler-wrapper'>
              <img src={sortIcon} className='sort-Icon' alt="sort-Icon" onClick={openSortToggler} />
              <img src={filterIcon} className='filter-Icon' alt="filter-Icon" onClick={openFilterToggler} />

              {filterToggler ? (
                <span onClick={onFilterToggler}> Hide Filters</span>
              ) : (
                <span onClick={onFilterToggler}> Show Filters</span>
              )}
              <div className='selection-filter-container'>
                {selectedCategory.map((sc, index) => (
                  <div
                    className='selection-filter'
                    key={`category-${index}`}
                    onClick={() => removeSelectedCategory(index)}
                  >
                    {sc}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="12" width="12">
                      <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" fill='#999' />
                    </svg>
                  </div>
                ))}
                {selectedColour.map((sc, index) => (
                  <div
                    className='selection-filter'
                    key={`colour-${index}`}
                    onClick={() => removeSelectedColour(index)}
                  >
                    {sc}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="12" width="12">
                      <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" fill='#999' />
                    </svg>
                  </div>
                ))}
              </div>
              {(selectedCategory.length > 0 || selectedColour.length > 0) && (
                <span
                  className='selection-clear'
                  onClick={() => clearSelected()}
                >Clear Selections</span>
              )}
            </div>
          </div>

          <div className={cn('productLayout', { 'hide': isOverlayOpen })} >
            {filterToggler && (
              <div className='sidebar-container'>
                <div className='sidebar-limiter '>
                  <SortBy
                    shopProducts={shopProducts}
                    setShopProducts={setShopProducts}
                  />
                  <Category />
                  <Colour />
                </div>
              </div>
            )}
            <Outlet />
            <div className="loader-wrapper">
              <ClipLoader color="#222222" size={50} />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
