import { ChangeEvent, useContext, useEffect, useState } from "react"
import debounce from 'lodash.debounce'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { ProductsContext } from "../../../context/ProductContext"
import { useLocation } from "react-router-dom"

export const Category = () => {
  const { selectedCategory, setSelectedCategory, disableContainer, menShopProducts, womanShopProducts, childShopProducts, babyShopProducts } = useContext(ProductsContext)
  const [categoryToggler, setCategoryToggler] = useState(true)
  const [categoryQuery, setCategoryQuery] = useState('')
  const [debounceQuery, setDebounceQuery] = useState('')


  const location = useLocation()
  const manLocation = location.pathname.includes('man')
  const womanLocation = location.pathname.includes('woman')
  const childLocation = location.pathname.includes('child')


  const visibileCategory = () => {
    let emptyArray = []
    if (manLocation) {
      emptyArray = Array.from(new Set(menShopProducts.map(categ => categ.category)))
    } else if (womanLocation) {
      emptyArray = Array.from(new Set(womanShopProducts.map(categ => categ.category)))
    } else if (childLocation) {
      emptyArray = Array.from(new Set(childShopProducts.map(categ => categ.category)))
    } else {
      emptyArray = Array.from(new Set(babyShopProducts.map(categ => categ.category)))
    }

    return emptyArray
  }

  const arrayOfCategories = visibileCategory().sort()


  const filteredQuery = arrayOfCategories.filter((categoryItem) => categoryItem.toLowerCase().includes(debounceQuery.toLowerCase()))

  const onCategoryToggler = () => {
    setCategoryToggler((prev) => !prev)
  }

  const debouncedQuery = debounce(
    setDebounceQuery,
    1000
  )


  const onCategoryQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setCategoryQuery(query)
    debouncedQuery(query)
    setSelectedCategory([])
  }

  const onCategorySelect = (category: string) => {
    setSelectedCategory((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
    disableContainer();
  };


  ; useEffect(() => {
    setSelectedCategory([])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <div className='side-container category'>
        <div
          className="text-container"
          onClick={onCategoryToggler}
        >
          <p>Category</p>
          {categoryToggler
            ? (
              <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faAngleUp} />
            )
            : (
              <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faAngleDown} />
            )
          }
        </div>
        {categoryToggler && (
          <ul>
            <input
              type="text"
              placeholder='Search in Category'
              value={categoryQuery}
              onChange={onCategoryQuery}
            />

            {filteredQuery.map((categ) => (
              <label key={categ}
                className="checkbox-label"
              >
                <input type="checkbox"
                  value={categ}
                  checked={selectedCategory.includes(categ)}
                  onChange={() => onCategorySelect(categ)}
                  className="checkbox-input"
                />
                {categ}
              </label>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}