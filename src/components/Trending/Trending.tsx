import { useState } from "react"
import { ShopProductsType } from "../../types/carouselProducts"
import { Link } from 'react-router-dom'

type Props = {
  products: ShopProductsType[]
  a: number
  b: number
}

export const Trending: React.FC<Props> = ({ products, a, b }) => {
  const [selectedMainWomenId, setSelectedMainWomenId] = useState(0)
  return (
    <section className='trending-container'>
      <div className='trending-title'>
        <h1>Trending Products</h1>
      </div>
      <ul className='trending-list'>
        {products.slice(a, b).map((product) => (

          <Link to={`/product-page/${product.id}`}>
            <img
              key={product.id}
              src={selectedMainWomenId === product.id ? (product.activeimage) : (product.image)}
              className='trending-item'
              alt='trending-img'
              onMouseEnter={() => setSelectedMainWomenId(product.id)} ></img>
          </Link>
        ))}
      </ul>
    </section >
  )
}