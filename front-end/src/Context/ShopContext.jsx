import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null); // since Context has been declared in this separate file, it can be exported 
                                                // and accessed in other files by importing it

const getDefaultCart = () => {
    let cart = {}; // creates an empty cart that counts the number of products added to cart by incrementing the array index 
    for (let index = 0; index < 300 + 1; index++) {  // corresponding to that product id (default of 0)
        cart[index] = 0; // set max cart size to 300 since cart defined in back-end + database has size 300
    }
    return cart;
};

const ShopContextProvider = (props) => {    // creates the ShopContextProvider component
    
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart()); // initializes the cartItems state to the empty cart list

    useEffect(() => { // instead of using the all_product file, retrieve the products from the database
        fetch('https://gcc-ecommerce-backend.onrender.com/listproduct').then((response) => response.json()) // and store them in 
        .then((data) => setAll_Product(data));// the all_product state

        if(localStorage.getItem('auth-token')){
            fetch('https://gcc-ecommerce-backend.onrender.com/getcart', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'https://gcc-ecommerce-backend.onrender.com',
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: "", // no body required, since all we are sending is user information in the header
            }).then((response) => response.json()).then((data) => setCartItems(data)); // if a user is logged in (auth-token can be retrieved)
        }                                                                              // set cartItems equal to the cart stored in the database linked to that user
    }, []);

    const addToCart = (itemID) => { // given an itemID (product.id) and the cart list (prev), increment the number in prev using the spread operator
        setCartItems((prev) => ({...prev,[itemID]:prev[itemID]+1}));
        if(localStorage.getItem('auth-token')){ // if a user is logged in
            fetch('https://gcc-ecommerce-backend.onrender.com/addtocart', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'https://gcc-ecommerce-backend.onrender.com',
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemID": itemID}),
            }).then((response) => response.json()).then((data) => console.log(data));
        }
    };

    const removeFromCart = (itemID) => { // given an itemID (product.id) and the cart list (prev), decrement the index in prev using the spread operator
        setCartItems((prev) => ({...prev,[itemID]:prev[itemID]-1}));
        if(localStorage.getItem('auth-token')){
            fetch('https://gcc-ecommerce-backend.onrender.com/removefromcart', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'https://gcc-ecommerce-backend.onrender.com',
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemID": itemID}),
            }).then((response) => response.json()).then((data) => console.log(data));
        }
    };

    const cancelFromCart = (itemID) => { // given an itemID (product.id) and the cart list (prev), reset the index in prev to 0 using the spread operator
        setCartItems((prev) => ({...prev,[itemID]:0}));
        if(localStorage.getItem('auth-token')){
            fetch('https://gcc-ecommerce-backend.onrender.com/cancelfromcart', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'https://gcc-ecommerce-backend.onrender.com',
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemID": itemID}),
            }).then((response) => response.json()).then((data) => console.log(data));
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){ // for each item 
            if(cartItems[item] > 0){ // if an item is in the cart
                let itemInfo = all_product.find((product) => product.id === Number(item)); // assign itemInfo equal to that object from all_product
                totalAmount += itemInfo.price * cartItems[item]; // multiply the price of that product by its quantity and add it to the total amount
            }
        }
        return totalAmount;
    };

    const getTotalProducts = () => {  // returns the total number of products in the cart
        let totalProducts = 0;
        for (let index = 1; index <= all_product.length; index++) {
            totalProducts += cartItems[index];
        }
        return totalProducts;
    };

    const contextValue = {all_product, cartItems, addToCart, removeFromCart, cancelFromCart, getTotalCartAmount, getTotalProducts};  // allows all children components to access this data without needing to use props

    return (
        <ShopContext.Provider value={contextValue}> {/* everything between the ShopContext.Provider tags will be able */}
            {props.children}                        {/* to access the information provided in the value attribute */}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;