import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../Components/Breadcrumb/Breadcrumb';
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay';

export const Product = () => {

  const {all_product} = useContext(ShopContext); /* imports all_product from ShopContext file using useContext hook */
  const {productID} = useParams()   /* allows part of the path to be stored in this variable to determine which product info to access */
  const product = all_product.find((e) => e.id === Number(productID)); /* find the product with product id matching the one in the page path, and store it in this variable */

  return (
    <div>
      <Breadcrumb product={product}/> {/* display the breadcrumb at the top of the page */}
      <ProductDisplay product={product}/> {/* above the product display */}
    </div>
  )
}
