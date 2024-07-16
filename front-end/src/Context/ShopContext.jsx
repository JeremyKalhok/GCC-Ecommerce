import React, { createContext } from "react";
import all_product from '../Components/Assets/all_product'

export const ShopContext = createContext(null); // since Context has been declared in a separate file, it can be exported 
                                                // and accessed in other files by importing it

const ShopContextProvider = (props) => {    // creates the ShopContextProvider component
    
    const contextValue = {all_product};  // allows all children components to access this data without needing to use props

    return (
        <ShopContext.Provider value={contextValue}> {/* everything between the ShopContext.Provider tags will be able to access the information provided */}
            {props.children}                        {/* in the value attribute */}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;