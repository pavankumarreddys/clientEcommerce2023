import React from 'react'
import { Layout } from '../components/Layout/Layout'
import './styles/cart.css'
import { useSelector } from 'react-redux'

const Cart = () => {
    let data1 = useSelector((state)=>{
        return state
      })

    console.log("data1",data1.cartListData)
return(
    <Layout title={"Product-details E-commerce app"}>
        <div className='container row m-auto cart-main-container animate__animated animate__fadeInRight'>
        <div className='col-12'>
            <h1>hello</h1>
        </div>
        </div>
    </Layout>
  )
}

export default Cart