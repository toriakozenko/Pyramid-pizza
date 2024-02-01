import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';

type ButtonAddToCartProps = {
  count: number;
  item: any;
};

const ButtonAddToCart: React.FC<ButtonAddToCartProps> = ({ count, item }) => {
  const dispatch = useDispatch();

  const onClickAdd = (e: any) => {
    e.preventDefault();
    const itemToAdd = {
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      type: item.type || null,
      size: item.size || null,
    };
    dispatch(addItem(itemToAdd));
  };

  return (
    <button onClick={onClickAdd} className="button button--outline button--add">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
          fill="white"
        />
      </svg>
      <span>Add to cart</span>
      {count > 0 && <i>{count}</i>}
    </button>
  );
};

export default ButtonAddToCart;
