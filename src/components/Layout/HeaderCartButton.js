import React, {useContext, useEffect, useState} from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCart.module.css'
import CartContext from '../../store/card-context'

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const {items} = cartCtx;
  const [btnIsHilghLighted, setBtnIsHilghLighted ] = useState(false);

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0)

  const btnClasses = `${classes.button} ${btnIsHilghLighted ?classes.bump : ''}`;

  useEffect(()=> {
    if (items.length === 0) {
      return 
    }
    setBtnIsHilghLighted(true);

   const timer = setTimeout(()=>{
      setBtnIsHilghLighted(false);
    },300)

    return () => {
      clearTimeout(timer);
    }
  }, [items]);

  return <button className={btnClasses} onClick={props.onShow}>
    <span className={classes.icon}>
      <CartIcon />
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>
    {numberOfCartItems}
    </span>
  </button>
}

export default HeaderCartButton;