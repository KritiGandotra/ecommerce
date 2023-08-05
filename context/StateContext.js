import product from "@/ecommerce/schemas/product";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.map((item) => {
      if (item._id === product._id) {
        return item;
      }
    });
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct[0].price * foundProduct[0].quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct[0].quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.map((item) => {
      if (item._id === id) {
        return item;
      }
    });
    index = cartItems.findIndex((product) => product._id === id);
    //console.log(index);
    //const newCartItems1 = cartItems.splice(index, 1);
    // let newCartItems = [
    //   ...cartItems,
    //   // {
    //   //   ...foundProduct[0],
    //   //   quantity: foundProduct.quantity + 1,
    //   // },
    // ];
    //console.log(newCartItems);
    // cartItems.map((item, i) => {
    //   if (i === index) {
    //     item.quantity += 1;
    //   }
    // });
    //console.log(cartItems);
    //console.log(newCartItems1);
    if (value === "inc") {
      // let newCartItems = [
      //   ...newCartItems1,
      //   {
      //     ...foundProduct[0],
      //     quantity: foundProduct.quantity + 1,
      //   },
      // ];
      cartItems.map((item, i) => {
        if (i === index) {
          item.quantity += 1;
        }
      });
      setCartItems(cartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct[0].price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct[0].quantity > 1) {
        //console.log(foundProduct);
        // let newCartItems = [
        //   ...newCartItems1,
        //   {
        //     ...foundProduct[0],
        //     quantity: foundProduct.quantity - 1,
        //   },
        // ];
        cartItems.map((item, i) => {
          if (i === index) {
            item.quantity -= 1;
            //console.log(item);
          }
        });
        setCartItems(cartItems);
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice - foundProduct[0].price
        );
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
