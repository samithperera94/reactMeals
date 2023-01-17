import React from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import { useContext,useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';

const Cart = (props) => {

    const [isCheckOut,setIsCheckout] = useState(false);
    const {sendRequest,isLoading,error:fetchError,success} = useHttp();

    const cartCtx = useContext(CartContext);
    const totalAmout = `$${cartCtx.totalAmout.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    
    const CartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const CartItemAddHandler = item => {
        cartCtx.addItem({...item,amount:1});
    };

    const submitOrderHandler = async(userData) => {
        const isSuccess = await sendRequest({
            url:'https://react-tasks-ee846-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            }), 
        });

        if(isSuccess){
            cartCtx.cleaAll()
        }
        // setTimeout(() => {
        //     console.warn("success",success)
        // }, 500);
    }; 
    const cartItems = <ul>{cartCtx.items.map((item) => {
        return<CartItem  
        key={item.id} 
        name={item.name}
        amount ={item.amount}
        price={item.price}
        onRemove={CartItemRemoveHandler.bind(null,item.id)}
        onAdd={CartItemAddHandler.bind(null,item)}
        />
        
    })}</ul>;  

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const modalActions = <div className={classes.actions}> 
            <button className={classes['button-alt']} onClick={props.onCloseCart}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
            
        </div>
  

    const cartContent = <>
                        {cartItems}
                            <div className={classes.total}>
                                <span>Total Amount</span>
                                <span>{totalAmout}</span>
                            </div>
                        {isCheckOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
                        {!isCheckOut && modalActions}
                    </>;

    const isSubmittingData = <p>Sending order data ....</p>;

    const didSubmitData =(<>
                            <p>Successfully sent the order!</p>
                            <div className={classes.actions}>
                                <button className={classes.button} onClick={props.onCloseCart}>
                                    Close
                                </button>
                            </div>
                         </>);

    return (
            <Modal onClick={props.onCloseCart}>
               {isLoading && isSubmittingData}
               {success && didSubmitData}
               {!isLoading && !success && cartContent}

            </Modal>
            );
};

export default Cart;
