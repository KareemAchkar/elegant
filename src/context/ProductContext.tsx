import React, { ReactNode, SetStateAction, useEffect, useMemo } from 'react';
import { useState } from 'react';
import ProductsFromServer from '../services/BackUpData.json';
import { ShopProductsType, CarouselProductsType, storeOffersType, ShopCartProductsType, Quantities } from '../types/carouselProducts';
import { User } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';



type ProductsTypeContext = {
  storeOffers: storeOffersType[];
  setStoreOffers: React.Dispatch<SetStateAction<storeOffersType[]>>
  carouselProducts: CarouselProductsType[];
  setCarouselProducts: React.Dispatch<React.SetStateAction<CarouselProductsType[]>>;
  womanCarouselProducts: CarouselProductsType[];
  manCarouselProducts: CarouselProductsType[];
  childCarouselProducts: CarouselProductsType[];
  babyCarouselProducts: CarouselProductsType[];
  shopProducts: ShopProductsType[];
  setShopProducts: React.Dispatch<React.SetStateAction<ShopProductsType[]>>;
  womanShopProducts: ShopProductsType[];
  menShopProducts: ShopProductsType[];
  childShopProducts: ShopProductsType[];
  babyShopProducts: ShopProductsType[];
  visibleProducts: number;
  onLoadMore: () => void;
  disableContainer: () => void
  selectedCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
  selectedColour: string[];
  setSelectedColour: React.Dispatch<SetStateAction<string[]>>;
  favoritedProducts: ShopProductsType[];
  setFavoritedProducts: React.Dispatch<SetStateAction<ShopProductsType[]>>;
  storedFavoriteItem: [];
  selectedId: number;
  setSelectedId: (selectedId: number) => void;
  isAddClicked: boolean;
  setIsAddClicked: (isAddClicked: boolean) => void;
  isContainerDisabled: boolean;
  setIsContainerDisabled: (willLoad: boolean) => void;
  myCartCounter: number;
  setMyCartCounter: (myCartCounter: number) => void;
  addedProducts: ShopCartProductsType[];
  setAddedProducts: React.Dispatch<SetStateAction<ShopCartProductsType[]>>;
  storedAddeditems: [];
  totalPrice: number,
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  quantities: Quantities,
  setQuantities: React.Dispatch<SetStateAction<Quantities>>
  authUser: User | null;
  setAuthUser: React.Dispatch<SetStateAction<User | null>>;
  isPaymentDone: Boolean;
  setIsPaymentDone: React.Dispatch<SetStateAction<Boolean>>
  isSortOpen: Boolean;
  setIsSortOpen: React.Dispatch<SetStateAction<Boolean>>
};

type Props = {
  children: ReactNode;
};

export const ProductsContext = React.createContext<ProductsTypeContext>({
  storeOffers: [],
  setStoreOffers: () => { },
  carouselProducts: [],
  setCarouselProducts: () => { },
  womanCarouselProducts: [],
  manCarouselProducts: [],
  childCarouselProducts: [],
  babyCarouselProducts: [],
  shopProducts: [],
  setShopProducts: () => { },
  womanShopProducts: [],
  menShopProducts: [],
  childShopProducts: [],
  babyShopProducts: [],
  visibleProducts: 16,
  onLoadMore: () => { },
  disableContainer: () => { },
  selectedCategory: [],
  setSelectedCategory: () => { },
  selectedColour: [],
  setSelectedColour: () => { },
  favoritedProducts: [],
  setFavoritedProducts: () => { },
  storedFavoriteItem: [],
  selectedId: 0,
  setSelectedId: () => { },
  isAddClicked: false,
  setIsAddClicked: () => { },
  isContainerDisabled: false,
  setIsContainerDisabled: () => { },
  myCartCounter: 0,
  setMyCartCounter: () => { },
  addedProducts: [],
  setAddedProducts: () => { },
  storedAddeditems: [],
  totalPrice: 0,
  setTotalPrice: () => { },
  quantities: {},
  setQuantities: () => { },
  authUser: null,
  setAuthUser: () => { },
  isPaymentDone: false,
  setIsPaymentDone: () => { },
  isSortOpen: false,
  setIsSortOpen: () => { },
});

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [storeOffers, setStoreOffers] = useState<storeOffersType[]>([])
  const [carouselProducts, setCarouselProducts] = useState<CarouselProductsType[]>([]);
  const [shopProducts, setShopProducts] = useState<ShopProductsType[]>([]);
  const [visibleProducts, setVisibileProducts] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedColour, setSelectedColour] = useState<string[]>([]);
  const [favoritedProducts, setFavoritedProducts] = useState<ShopProductsType[]>([]);
  const [selectedId, setSelectedId] = useState(0);
  const [isAddClicked, setIsAddClicked] = useState(false)
  const [isContainerDisabled, setIsContainerDisabled] = useState(false)
  const [myCartCounter, setMyCartCounter] = useState(0)
  const [addedProducts, setAddedProducts] = useState<ShopCartProductsType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState<Quantities>({});
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [isPaymentDone, setIsPaymentDone] = useState<Boolean>(false)
  const [isSortOpen, setIsSortOpen] = useState<Boolean>(false)

  const onLoadMore = () => {
    setVisibileProducts(visibleProducts + 12)
  }

  const disableContainer = () => {
    setIsContainerDisabled(true)
    setTimeout(() => {
      setIsContainerDisabled(false)
    }, 600);
  }

  const storedFavoriteItem = useMemo(() => {
    const savedFavoriteItems = JSON.parse(localStorage.getItem('favItems') || '[]')

    return savedFavoriteItems || []

  }, [])

  const storedAddeditems = useMemo(() => {
    const savedAddedItems = JSON.parse(localStorage.getItem('addedItems') || '[]')


    return savedAddedItems || []

  }, [])

  useEffect(() => {
    setStoreOffers(ProductsFromServer.storeOffers)
    setCarouselProducts(ProductsFromServer.CarouselProducts)
    setShopProducts(ProductsFromServer.ShopProducts)
  }, []);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });


    return () => {
      unsubscribe();
    };
  }, []);

  const context = {
    storeOffers,
    setStoreOffers,
    carouselProducts,
    setCarouselProducts,
    womanCarouselProducts: carouselProducts.filter((product) => product.sex === 'f'),
    manCarouselProducts: carouselProducts.filter((product) => product.sex === 'm'),
    childCarouselProducts: carouselProducts.filter((product) => product.sex === 'c'),
    babyCarouselProducts: carouselProducts.filter((product) => product.sex === 'b'),
    shopProducts,
    setShopProducts,
    womanShopProducts: shopProducts.filter((product) => product.sex === 'f'),
    menShopProducts: shopProducts.filter((product) => product.sex === 'm'),
    childShopProducts: shopProducts.filter((product) => product.sex === 'c'),
    babyShopProducts: shopProducts.filter((product) => product.sex === 'b'),
    visibleProducts,
    onLoadMore,
    disableContainer,
    selectedCategory,
    setSelectedCategory,
    selectedColour,
    setSelectedColour,
    favoritedProducts,
    setFavoritedProducts,
    selectedId,
    setSelectedId,
    isAddClicked,
    setIsAddClicked,
    isContainerDisabled,
    setIsContainerDisabled,
    storedFavoriteItem,
    myCartCounter,
    setMyCartCounter,
    addedProducts,
    setAddedProducts,
    storedAddeditems,
    totalPrice,
    setTotalPrice,
    quantities,
    setQuantities,
    authUser,
    setAuthUser,
    isPaymentDone,
    setIsPaymentDone,
    isSortOpen,
    setIsSortOpen,
  };

  function updateIds(shopProducts: ShopProductsType[]) {
    const uniqueIds = new Set(); // Use a Set to keep track of unique IDs

    shopProducts.forEach((obj) => {
      let newId = 1;

      while (uniqueIds.has(newId)) {
        newId++;
      }

      obj.id = newId; // Update the ID property
      uniqueIds.add(newId); // Add the new ID to the set
    });

    return shopProducts;
  }

  const updatedResponse = updateIds(shopProducts);

  console.log(updatedResponse)

  return (
    <ProductsContext.Provider value={context}>
      {children}
    </ProductsContext.Provider>
  );
};

