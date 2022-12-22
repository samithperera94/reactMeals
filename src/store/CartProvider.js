import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmout: 0
}

const CartReducer = (state,action) => {
    if(action.type === 'ADD' ){        
        // if(state.items.include(item)){
        // }
        const existingCartItemIndex = state.items.findIndex((item)=>{
            return item.id === action.item.id
        });
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.item);
        }
        
        const updatedTotalAmount = state.totalAmout + action.item.price * action.item.amount ;     
       
        return{
            items: updatedItems,
            totalAmout: updatedTotalAmount
        }
    }
    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex((item)=>{
            return item.id === action.id
        });
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmout - existingCartItem.price;
        let updatedItems;
        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }else{
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;

        }

        return{
            items: updatedItems,
            totalAmout: updatedTotalAmount
        };
    }
    return defaultCartState;
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(CartReducer ,defaultCartState);


    const addItemCartHandler = item => {
        dispatchCartAction({type:'ADD',item:item})
    };

    const removeItemCartHandler = id => {
        dispatchCartAction({type:'REMOVE',id:id})
    };
    const cartContext = {
        items:cartState.items,
        totalAmout:cartState.totalAmout,
        addItem: addItemCartHandler,
        removeItem: removeItemCartHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;