import { ShopProductsType } from "../../types/carouselProducts"

type Props = {
  products: ShopProductsType[]
}

export const MyBrands: React.FC<Props> = ({ products }) => {
  return (
    <section className='our-brands-container'>
      <div className='our-brands-title'>
        <h1>Our brands</h1>
      </div>
      <ul className='our-brands-list'>
        {products.slice(16, 21).map((product) => (
          <img key={product.id} src={product.image} className='our-brands-item' alt="brands-img"></img>

        ))}
      </ul>
    </section>
  )
} 