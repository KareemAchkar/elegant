import { ChangeEvent, useContext, useEffect, useState } from "react"
import debounce from 'lodash.debounce'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { ProductsContext } from "../../../context/ProductContext"
import { useLocation } from "react-router-dom"

export const Colour = () => {
  const { shopProducts, selectedColour, setSelectedColour, disableContainer, womanShopProducts, menShopProducts, childShopProducts, babyShopProducts } = useContext(ProductsContext)
  const [colourToggler, setColourToggler] = useState(true)
  const [colourQuery, setColourQuery] = useState('')
  const [debounceQueryColour, setDebounceQueryColour] = useState('')
  const [showMore, setShowMore] = useState(false)

  const location = useLocation()
  const manLocation = location.pathname.includes('man')
  const womanLocation = location.pathname.includes('woman')
  const childLocation = location.pathname.includes('child')

  const visibleColours = () => {
    let colorArr = []
    if (manLocation) {
      colorArr = Array.from(new Set(menShopProducts.map((color) => color.colour)))
    } else if (womanLocation) {
      colorArr = Array.from(new Set(womanShopProducts.map((color) => color.colour)))
    } else if (childLocation) {
      colorArr = Array.from(new Set(childShopProducts.map((color) => color.colour)))

    } else {
      colorArr = Array.from(new Set(babyShopProducts.map((color) => color.colour)))
    }
    return colorArr
  }

  const arrayofColors = visibleColours().sort()



  const onColourToggler = () => {
    setColourToggler((prev) => !prev)
  }

  const debouncedColourQuery = debounce(setDebounceQueryColour, 1000)

  const onColourQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setColourQuery(query)
    debouncedColourQuery(query)
  }

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const onColourSelected = (colour: string) => {
    setSelectedColour((prevSelectedColour) => {
      if (prevSelectedColour.includes(colour)) {
        return prevSelectedColour.filter((c) => c !== colour)
      } else {
        return [...prevSelectedColour, colour]
      }
    })
    disableContainer()
  }

  useEffect(() => {
    setSelectedColour([])
  }, [])


  const filteredColourQuery = arrayofColors.filter((colourItem) => colourItem.toLocaleLowerCase().includes(debounceQueryColour))
    .slice(0, showMore ? arrayofColors.length : 4)



  return (
    <>
      <div className='side-container colour'>
        <div onClick={onColourToggler}
          className="text-container">
          <p>Colour</p>
          {colourToggler
            ? (
              <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faAngleUp} />
            )
            : (
              <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faAngleDown} />
            )
          }
        </div>
        {colourToggler && (
          <ul>
            <input
              type="text"
              placeholder='Search in Colour'
              value={colourQuery}
              onChange={onColourQuery}
            />

            {filteredColourQuery.map((colour) => (
              <label key={colour} className="checkbox-label">
                <input
                  type="checkbox"
                  value={colour}
                  checked={selectedColour.includes(colour)}
                  onChange={() => onColourSelected(colour)}
                  className="checkbox-input"
                />
                {colour}
              </label>
            ))}

            {arrayofColors.length > 0 && (
              <button
                className="showButton"
                onClick={toggleShowMore}
              >
                {showMore ? "Show Less" : "Show More"}
              </button>
            )}
          </ul>
        )}
      </div>
    </>
  )
}