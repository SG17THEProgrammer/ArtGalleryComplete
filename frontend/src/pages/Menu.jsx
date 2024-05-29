import React, { useEffect } from 'react'
import Card from '../components/Card'
import Product from './Product'
import { useAuth } from '../components/Auth'

const Menu = () => {


  const { products } = useAuth()
  console.log(products)

useEffect(() =>{
  
},[products])
    
  return (
    <>
      <Card></Card><br />
      <h1 style={{
                color: "wheat"
                , margin: "50px 0 40px 80px", textDecoration: "underline"
            }}>More Products</h1>
                  <div className='newCard' key={1}>

      {products?.length>0 && products?.map((elem) => {
        const { name, price, description, _id, user } = elem;
        return <Product title={'Related Products'}
          name={name}
          price={price}
          description={description}
          _id={_id}
          user={user}
        ></Product>
      })}
      </div>
    </>
  )
}

export default Menu