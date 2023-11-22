import { ShopProductsType } from "../../types/carouselProducts"
import { FavoriteIcon } from '../../components/FavoriteIcon/FavoriteIcon';
import { Link } from 'react-router-dom';


type Props = {
  product: ShopProductsType;
  selectedId: number
  setSelectedId: (selectedManId: number) => void;
  i: number;
}

export const Product: React.FC<Props> = ({
  product,
  i,
  selectedId,
  setSelectedId,
}) => {

  return (
    <div
      key={product.id}
      className={`product-card ${i % 12 < 8 ? '' : 'wide'}`}
      onMouseEnter={() => setSelectedId(product.id)}
    >
      <Link to={`/product-page/${product.id}`}>
        <img
          className={`product-img ${i % 12 < 8 ? '' : 'wide'}`}
          src={selectedId === product.id ? product.activeimage : product.image}
          alt="products"
          loading="lazy"
        />
      </Link>

      <FavoriteIcon
        product={product}
        classname={'product-fav-icon'}
      />

      <div className="product-details-container">
        <p className="product-title">{product.title}</p>
        <p className="product-price">${product.price}</p>
        <div className="product-salesprice-container">
          <p className="product-salesprice">Basket Amount</p>
          <p className="product-salesprice-value">${product.saleprice}</p>
        </div>
      </div>
    </div>
  )
}