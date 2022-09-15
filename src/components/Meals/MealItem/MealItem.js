import {useContext} from 'react';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/card-context';
import classes from './MealItem.module.css'

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);

    const onAddToCartHandler = (enteredAmount) =>{
      cartCtx.addItem({
        id: props.id,
        name: props.name,
        price: props.price,
        amount: enteredAmount
      })
    }

    const price = `$${props.price.toFixed(2)}`;
    return (
      <li className={classes.meal}>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
          <MealItemForm  id={props.id} onAddToCart={onAddToCartHandler} />
        </div>
      </li>
    )
}

export default MealItem;