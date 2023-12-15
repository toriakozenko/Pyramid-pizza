import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonAddToCart from '../components/ButtonAddToCart';
import { selectCartItemById } from '../redux/slices/cartSlice';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const cartItem = useSelector(selectCartItemById(id));

  const addedCount = cartItem ? cartItem.count : 0;

  useEffect(() => {
    async function fetchPizza() {
      try {
        const res = await axios.get('https://655e0c729f1e1093c59a69c8.mockapi.io/items/' + id);
        setPizza(res.data);
      } catch (error) {
        alert('Error when you try get pizzas!');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Loading...';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.name}</h2>
      <h4>${pizza.price}</h4>
      <p>{pizza.desc}</p>
      <ButtonAddToCart count={addedCount} item={pizza} />
    </div>
  );
};

export default FullPizza;
