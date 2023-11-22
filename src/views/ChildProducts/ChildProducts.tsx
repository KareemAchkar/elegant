import './ChildProducts.scss'
import cn from 'classnames'
import { useContext } from 'react'
import { Product } from '../../components/Product/Product'
import { ProductsContext } from '../../context/ProductContext'
import { Button } from '../../components/LoadMore/LoadMore'
import { ClipLoader } from 'react-spinners'

export const ChildProducts = () => {
  const { childShopProducts, onLoadMore, visibleProducts, selectedCategory, selectedColour, selectedId, setSelectedId, isContainerDisabled } = useContext(ProductsContext)

  const filteredChildProducts =
    childShopProducts.filter((product) => {
      const categoryFilter =
        selectedCategory.length === 0 || selectedCategory.includes(product.category);

      const colourFilter =
        selectedColour.length === 0 || selectedColour.includes(product.colour);

      return categoryFilter && colourFilter;
    });

  const lastInd = filteredChildProducts.length - 1;

  return (
    <>
      <div className={cn('container', { 'page-container': isContainerDisabled })}>
        <div className="productlayout-container">
          <div className={cn('products-container', { 'disabled': isContainerDisabled })}>
            {filteredChildProducts.slice(0, visibleProducts).map((product, i) => (
              <Product
                product={product}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                i={i}
              />
            ))}
          </div>
        </div>
        {visibleProducts < lastInd && (
          <Button
            classname='Button'
            onClick={onLoadMore}
            text='Load More'
            disabled={false}
            isLoading={false}
            type='button'
          />
        )}
        {isContainerDisabled && (
          <div className="loader-wrapper">
            <ClipLoader color="#222222" size={50}
            />
          </div>
        )}
      </div>
    </>
  )
}