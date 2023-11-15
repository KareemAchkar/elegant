
const productColours = ['Black', 'Purple', 'Blue', 'Orange', 'Cyan']

type Props = {
  onSelectColour: (colour: string) => void
  selectedColour: string
}


export const ColourPicker: React.FC<Props> = ({
  onSelectColour,
  selectedColour,
}) => {


  const foundColour = productColours.find((colour) => colour === selectedColour)

  const onSelectedColorHandler = (colour: string) => {
    onSelectColour(colour)
  }

  return (
    <div className="product-colour-container">
      <p className="product-colour-title">{foundColour}</p>
      <div className="product-colour-picker">
        {productColours.map((colour) => (
          <div
            className="product-colour"
            style={{ backgroundColor: colour }}
            onClick={() => onSelectedColorHandler(colour)}
          >
          </div>
        ))}
      </div>
    </div>
  )
}