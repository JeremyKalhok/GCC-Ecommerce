import React, { useEffect, useState } from 'react'
import './ListProduct.css'

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/listproduct').then((res) => res.json()).then((data) => {setAllProducts(data)});
  };

  useEffect(() => {
    fetchInfo(); // fetches and displays the product list every time the ListProduct component is mounted
  }, []);

  const Remove_Product = async (id) => { // provide an id as a parameter when calling the function
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id}),
    })
    await fetchInfo(); // call fetchInfo to updated the displayed items after removing
  };

  return (
    <div className="list-product">
        <h1>All Products</h1>
        <div className="list-product-format-main">
          <p>Products</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Description</p>
          <p>Remove</p>
        </div>
        <div className="list-product-all-products">
          <hr />
            {allproducts.map((product, index) => { // map each product in the array to an index, and display it in the following format
              return <><div key={index} className="list-product-format-main list-product-format">
                <img src={product.image} alt="" className="list-product-icon" />
                <p>{product.name}</p>
                <p>{product.category}</p>
                <p>{product.price}</p>
                <p>{product.description}</p>
                <p onClick={() => {Remove_Product(product.id)}} className='list-product-remove-icon'>X</p>
              </div>
              <hr />
              </> // since you can only return one component, and we are trying to return 2 (div and hr tags), we can surround them 
            })}   {/* within an empty tag that will not change how they are displayed, but allow them to be returned as 1 component */}
        </div>
    </div>
  )
}

export default ListProduct