import './Man.scss'
import { ProductsContext } from '../../context/ProductContext'
import { useContext } from 'react'
import { HightLights } from '../../components/HightLights/HightLights'
import myVid from '../../assets/videos/MenVideo.mp4'
import { MyVideo } from '../../components/MyVideo/MyVideo'
import { Trending } from '../../components/Trending/Trending'
import { MyBrands } from '../../components/Brands/Brands'
import { MyCarousel } from '../../components/Carousel/Carousel'
import { ClipLoader } from 'react-spinners'

export const Man = () => {
  const { manCarouselProducts } = useContext(ProductsContext)
  const { menShopProducts } = useContext(ProductsContext)

  return (
    <>
      <div className='container man-page'>

        <MyCarousel
          carouselProducts={manCarouselProducts}
          path='/season-sale/man'
        />

        <HightLights products={menShopProducts} />

        <MyVideo myVid={myVid} />

        <Trending products={menShopProducts} a={4} b={12} />

        <MyBrands products={menShopProducts} />

        <Trending products={menShopProducts} a={12} b={16} />


        <section className='seo-container'>
          <article>
            <h3>2023 Men's Winter and Summer Fashion</h3>
            Clothing shopping has never been easier. Elegant is a brand that has every product, from timeless classics to the latest trends. Experience the excitement of shopping! Comfortable, casual looks with dazzling Men's shopping options; You can examine stylish pieces for elegant, formal suits. You can stay on trend with the latest looks and find new favorites. While casual t-shirts and shirts provide a sporty and stylish look, blouses and tunics are an indispensable choice for the office or other more elegant occasions. You can browse dress models for a stylish look from head to toe, or add elegance to any outfit with a blazer. Before the winter cold, you can buy sweaters and cardigans made of wool, cotton and acrylic. You can resist the instability of the weather by wearing a lighter jacket in spring. You can purchase products with the cash on delivery Men's clothing option while shopping.

          </article>

          <article>
            <h3>Men Shopping with Elegant Privilege </h3>
            Denim is a fabric that hugs the body and has many different models, including high waist, loose or narrow legs. Denim is not only in trouser models; It is also used in clothes such as shirts, overalls, dresses, jackets, shorts and skirts. You can choose from the denim collection, available in a wide variety of cuts and washes. If you are having a night out, you can check out eye-catching evening dresses, trousers and blouses for special occasions. If you want to add comfortable pieces to your sports routine, you can buy sportswear products with comfortable, trendy colors and models from the Elegant sportswear collection. Discover products specially designed for sports. When it's time to rest, you can use the most comfortable pajamas. You can also find nightgown models as well as bras and underwear in the underwear category for daily use. With the Men's online shopping option, you can be sure that you will find the perfect fit in a wide range of sizes with products that suit every body.
          </article>

          <article>
            <h3>Men's Online Shopping Trendy Pieces </h3>
            Don't forget to take a look at the renewed products and collections to keep your finger on the pulse of contemporary fashion! Stylish and trendy clothes and timeless pieces are among the most preferred items for shopping. Timeless pieces provide continuity and are popular outside of a particular period. You can combine the savior pieces of your wardrobe, such as basic clothes, with the trend pieces of the season  and create styles suitable for 2023 Men's fashion. The periodicity of popular fashion is strong. Enjoy quality, trendy Men's clothing. Whether you want to renew your wardrobe, add special pieces or completely overhaul it, Elegant has a variety that will add something special to every wardrobe. Feel confident in a beautiful suit or choose one of their dazzling dresses for Men. You can follow Men's discount periods and shop at affordable prices.
          </article>

          <article>
            <h4>Trendy Combinations with Elegant</h4>
            You can get a stylish look on cold days with Men's shirts, blouses, sweaters and blazers. Men's jeans , patterned blouses and stylish dresses add variety to your wardrobe. Find the perfect fit with plus size jeans, maternity dresses, blouses and more. Elegant has all the Men's clothing you need for business and daily use. You can add Men's clothing, shoes, accessories and jewelry pieces to your wardrobe to add a bold style to daily looks. If you are looking for comfortable Men's jeans, fabric trousers, blouses or dresses, you can check out the products. For your next beach holiday, you can choose whatever you want from the wide collection, from beachwear to sportswear, from flowy summer dresses to shorts and t-shirts. To stay warm and comfortable throughout the seasons, you can buy outerwear and loose cardigans, sweaters, sweatshirts, jackets and coats. You can have Men's clothing items paid at the door with Elegant.
          </article>

        </section>

      </div>
      <div className='loader-wrapper'>
        <ClipLoader color='#222222' size={50} />
      </div>
    </>
  )
}   