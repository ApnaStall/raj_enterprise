import React from 'react'
import Navbar from '../components/layout/Navbar';
import Products from '../components/product/Products';
import ProductList from '../components/product/ProductList';
import Footer from '../components/layout/Footer';

function Shop() {
  return (
    <>
    <div>
      <Navbar />
    </div>
    <div>
      <Products />
    </div>
    <div>
        <ProductList />
    </div>
    <div>
        <Footer />
    </div>
    </>
  )
}

export default Shop
