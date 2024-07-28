import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import { Footer } from './Components/Footer/Footer';

function App() {
  return (
    <div>
      <BrowserRouter basename="/GCC-Ecommerce">   {/* all pages hosted on the NavBar are accessed through the router */}
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>   {/* if accessing the path "/", render the Home component */}
          <Route path='/shells' element={<ShopCategory category="shells"/>}/>   {/* if accessing any of the paths for shells, */} 
          <Route path='/buttons' element={<ShopCategory category="buttons"/>}/>    {/* buttons, or internals, render the respective */}
          <Route path='/internals' element={<ShopCategory category="internals"/>}/>    {/* ShopCategory page */}
          <Route path="/product" element={<Product/>}>   {/* if accessing the product path, render the product component and page */}
            <Route path=':productID' element={<Product/>}/>   {/* render specific product page based on product's id (e.g. localhost:3000/product/1) */}
          </Route>  {/* this productID part of the page path is called in by the useParams() hook in Product.jsx */}
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
        </Routes>
        <Footer/>  {/* Footer is displayed here instead of in one of the pages so that it will be displayed on every page */}
      </BrowserRouter>
    </div>
  );
}

export default App;
