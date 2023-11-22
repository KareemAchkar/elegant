import { ShopProductsType } from "../../types/carouselProducts"

type Props = {
  products: ShopProductsType[]
}

export const HightLights: React.FC<Props> = ({ products }) => {
  return (
    <section className='highlights-container'>
      <div className='highlights-title'>
        <h1>Hightlights</h1>
      </div>
      <ul className='highlights-list'>
        {products.slice(0, 4).map((product) => (
          <img key={product.id} className='hightlights-item' src={product.image} alt="hightlight-img" />
        ))}
      </ul>
    </section>
  )
}