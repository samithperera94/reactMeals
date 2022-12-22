import React from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {

    const cartCtx = useContext(CartContext);
    const totalAmout = `$${cartCtx.totalAmout.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    
    const CartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const CartItemAddHandler = item => {
        cartCtx.addItem({...item,amount:1});
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

    // const cartItems = <ul>{[
    //     {id:'c1',name:'Sushi',amount:2, price: 12.99},
    //     {id:'c2',name:'Chicken Kottu',amount:1, price: 15.99},
    //     {id:'c3',name:'Hoppers',amount:10, price: 10.99}
    // ].map((item) => {
    //     return<li key={item.id}>{item.name}</li>
    // })}</ul>;   

    return (
            <Modal onClick={props.onCloseCart}>
                {cartItems}
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmout}</span>
                </div>
                <div className={classes.actions}> 
                    <button className={classes['button-alt']} onClick={props.onCloseCart}>Close</button>
                    {hasItems && <button className={classes.button}>Order</button>}
                    
                </div>
            </Modal>
            );
};

export default Cart;
