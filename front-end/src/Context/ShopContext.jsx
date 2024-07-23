import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product'

export const ShopContext = createContext(null); // since Context has been declared in this separate file, it can be exported 
                                                // and accessed in other files by importing it

const getDefaultCart = () => {
    let cart = {}; // creates an empty cart that counts the number of products added to cart by incrementing the array index 
    for (let index = 0; index < all_product.length + 1; index++) {  // corresponding to that product id (default of 0)
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {    // creates the ShopContextProvider component
    
    const [cartItems, setCartItems] = useState(getDefaultCart()); // initializes the cartItems state to the empty cart list

    const addToCart = (itemID) => { // given an itemID (product.id) and the cart list (prev), increment the number in prev using the spread operator
        setCartItems((prev) => ({...prev,[itemID]:prev[itemID]+1}));
    }

    const removeFromCart = (itemID) => { // given an itemID (product.id) and the cart list (prev), decrement the index in prev using the spread operator
        setCartItems((prev) => ({...prev,[itemID]:prev[itemID]-1}));
    }

    const cancelFromCart = (itemID) => { // given an itemID (product.id) and the cart list (prev), reset the index in prev to 0 using the spread operator
        setCartItems((prev) => ({...prev,[itemID]:0}));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){ // for each item 
            if(cartItems[item] > 0){ // if an item is in the cart
                let itemInfo = all_product.find((product) => product.id === Number(item)); // assign itemInfo equal to that object from all_product
                totalAmount += itemInfo.price * cartItems[item]; // multiply the price of that product by its quantity and add it to the total amount
            }
        }
        return totalAmount;
    }

    const getTotalProducts = () => {  // returns the total number of products in the cart
        let totalProducts = 0;
        for (let index = 1; index <= all_product.length; index++) {
            totalProducts += cartItems[index];
        }
        return totalProducts;
    }

    const contextValue = {all_product, cartItems, addToCart, removeFromCart, cancelFromCart, getTotalCartAmount, getTotalProducts};  // allows all children components to access this data without needing to use props

    return (
        <ShopContext.Provider value={contextValue}> {/* everything between the ShopContext.Provider tags will be able */}
            {props.children}                        {/* to access the information provided in the value attribute */}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;