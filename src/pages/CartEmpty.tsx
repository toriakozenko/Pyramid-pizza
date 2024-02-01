import React from 'react';
import { Link } from 'react-router-dom';
import cartEmpty from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => (
  <div className="cart cart--empty">
    <h2>
      Cart empty <span>😕</span>
    </h2>
    <p>
      You haven't ordered pizza yet.
      <br />
      If you want to order pizza, go to the main page.
    </p>
    <img src={cartEmpty} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Return</span>
    </Link>
  </div>
);

export default CartEmpty;
