export interface storeOffersType {
  id: number,
  title: string
}

export interface CarouselProductsType {
  id: number;
  content: string;
  sex: string
}

export interface ShopProductsType {
  id: number,
  title: string,
  image: string,
  activeimage: string,
  price: string,
  saleprice: string,
  sex: string,
  category: string,
  colour: string
}


export interface ShopCartProductsType {
  id: number,
  title: string,
  image: string,
  activeimage: string,
  price: string,
  saleprice: string,
  sex: string,
  category: string,
  colour: string,
  selectedColor: string,
  selectedSize : string
}


export interface Quantities {
  [productId: number]: number;
}