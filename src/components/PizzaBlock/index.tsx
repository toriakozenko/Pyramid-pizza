import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItemById } from '../../redux/slices/cartSlice';
import { Pizza } from '../../redux/slices/pizzaSlice';
import ButtonAddToCart from '../ButtonAddToCart';

const typeNames = ['thin', 'traditional'];

const PizzaBlock: React.FC<Pizza> = ({ id, name, price, imageUrl, sizes, types }) => {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const cartItem = useSelector(selectCartItemById(id)) || '';

  const addedCount = cartItem ? cartItem.count : 0;

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link key={id} to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{name}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((item, index) => {
              return (
                <li
                  onClick={() => setActiveType(item)}
                  key={index}
                  className={activeType === item ? 'active' : ''}>
                  {typeNames[item]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((item, index) => {
              return (
                <li
                  onClick={() => setActiveSize(index)}
                  key={index}
                  className={activeSize === index ? 'active' : ''}>
                  {item} cm.
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">from ${price} </div>
          <ButtonAddToCart
            count={addedCount}
            item={{
              id,
              name,
              price,
              imageUrl,
              type: typeNames[activeType],
              size: sizes[activeSize],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
