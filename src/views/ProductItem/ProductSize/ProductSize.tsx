import cn from "classnames";

const productSize = ['XS', 'S', 'M', 'XL', 'XXL', '3XL'];

type Props = {
  onSelectedSize: (size: string) => void
  selectedSize: string
}

export const ProductSize: React.FC<Props> = ({
  onSelectedSize,
  selectedSize,
}) => {
  return (
    <div className="product-size-maincontainer">
      <span>Size Options</span>
      <div className="product-size-container">
        {productSize.map((size) => (
          <button
            className={cn('product-size', { 'active': selectedSize === size })}
            onClick={() => onSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}