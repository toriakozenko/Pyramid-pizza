import { CircularProgress } from '@mui/joy';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonAddToCart from '../../components/ButtonAddToCart';
import styles from './FullPizza.module.scss';
import { selectCartItemById } from '../../redux/cart/selectors';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    name: string;
    price: number;
    desc: string;
  }>();
  const { id = '' } = useParams();
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
    return (
      <div className={styles.product}>
        <CircularProgress
          color="neutral"
          size="lg"
          variant="soft"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
            width: '100%',
          }}
        />
      </div>
    );
  }

  return (
    <div className={styles.product}>
      <div className={styles.productImage}>
        <img src={pizza.imageUrl} alt="pizza" />
      </div>
      <div className={styles.productInformation}>
        <h2>{pizza.name}</h2>
        <p className={styles.productDesc}>{pizza.desc}</p>
        <div className={styles.cartAdd}>
          <p>${pizza.price}</p>
          <ButtonAddToCart count={addedCount} item={pizza} />
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
