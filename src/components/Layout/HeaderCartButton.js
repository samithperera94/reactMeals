import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import { useContext,useEffect,useState } from 'react';

const HeaderCartButton = (props) => {
    const [btnHighlighted,setBtnHighlighted] = useState(false);

    const cart = useContext(CartContext);
    const {items} = cart; 

    const numberOfCartItems = items.reduce((currentNumber,item) => {
        return currentNumber + item.amount;
    },0);

    const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ''}`;

    useEffect(()=>{
        if(items.length === 0){
            return;
        }
        setBtnHighlighted(true);
        const timer = setTimeout(()=> {
            setBtnHighlighted(false);
        },300);
        return () => {
            clearTimeout(timer);
        }
    },[items]);

    return  <button className={btnClasses} onClick={props.onClick }>
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