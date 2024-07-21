import React, { useContext, useEffect, useState } from 'react'
import './ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import { Item } from '../Components/Item/Item'
import { useLocation } from 'react-router-dom'

export const ShopCategory = (props) => {     // will render Shells, Buttons, or Internals page depending on which category prop has been passed
  
  const {all_product} = useContext(ShopContext); // import all_product using context from ShopContext
  const [sort, setSort] = useState('id');        // declare the state variable used to detect changes in the sorting dropdown
  const location = useLocation();                // stores the current path location
  
  useEffect(() => {                              // scroll to the top of the page when the shells, buttons, or internals pages are loaded
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {                              // when the location.pathname changes, change sort back to 'id'
    setSort('id');
  }, [location.pathname]);
  
  let all_product_sorted = [];                  // stores the sorted list of all_products
  
  {if (sort === "name"){
    all_product_sorted = all_product.sort((p1, p2) => p1.name.localeCompare(p2.name));  // if the "Alphabetical" dropdown option is selected, sort items by name property
  }
  else{
    all_product_sorted = all_product.sort((p1, p2) => p1.id - p2.id);                   // otherwise sort them by id property
  }}

  return (
    <div className="shop-category">
      <div className="shop-category-indexSort">
        <p> {/* if on shells page, display 1-10, if on buttons page display 11-20, otherwis edisplay 21-25 */}
          <span>Showing {props.category==="shells"?<>1-10</> : props.category==="buttons"?<>11-20</> : <>21-24</>}</span> out of 24 products
        </p>
        <div className="shop-category-sort">
          <label>Sort By: 
            <select value={sort} onChange={e => setSort(e.target.value)}> {/* when the selected dropdown option changes, set the sort state equal to the value of the dropdown */}
              <option value="id">Product ID</option>
              <option value="name">Alphabetical</option>
            </select>
          </label>
        </div> 
      </div>
      <div className="shop-category-products">
        {all_product_sorted.map((item,index)=>{   // display the list of items, sorted based on id or name
          if (props.category === item.category){  // if item category matches page category (e.g. shells), display that item
            return <Item key={index} id={item.id} name={item.name} image={item.image} price={item.price} />
          }
          else{
            return null;
          }
        })}
      </div>
    </div>
  )
}