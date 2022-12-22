import { useState } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";


function App() {
  const [cartIsShow,setCartIsShow] = useState(false);

  const showCartHandler = () => {
    setCartIsShow(true);
  }

  const hideCarthandler = () => {
    setCartIsShow(false);
  }

  return (
    <CartProvider>
    <h1>knfvnsjofbss</h1>
    {cartIsShow && <Cart onCloseCart={hideCarthandler} />}      
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
