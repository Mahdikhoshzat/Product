import React, { useCallback, useReducer } from 'react'

import ProductForm from './ProductForm'
import ProductList from './ProductList'
import Search from './Search'

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.products
    case 'ADD':
      return [...state, action.product]
    default:
      throw new Error('Error')
  }
}

const Products = () => {
  const [products, dispath] = useReducer(productReducer, [])

  const searchProductsHandler = useCallback((items) => {
    dispath({ type: 'SET', products: items })
  }, [])

  const addProductHandler = (item) => {
    fetch('https://fetchwork-c37a0-default-rtdb.firebaseio.com/Products.json', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      response.json().then((responseData) => {
        dispath({
          type: 'ADD',
          product: { id: responseData.name, ...item },
        })
      })
    })
  }

  return (
    <div className="App">
      <ProductForm onAddProduct={addProductHandler} />

      <section>
        <Search onLoadProducts={searchProductsHandler} />
        <ProductList products={products} onRemoveItem={() => {}} />
      </section>
    </div>
  )
}

export default Products
