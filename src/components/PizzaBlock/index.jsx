import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItemById } from '../../redux/slices/cartSlice';
import ButtonAddToCart from '../ButtonAddToCart';

const typeNames = ['thin', 'traditional'];

function PizzaBlock({ id, name, price, imageUrl, sizes, types }) {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const cartItem = useSelector(selectCartItemById(id));

  const addedCount = cartItem ? cartItem.count : 0;

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{name}</h4>
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
}

export default PizzaBlock;
