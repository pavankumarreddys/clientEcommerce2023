import React, { useEffect, useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import { Layout } from '../components/Layout/Layout'
import './styles/cart.css'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  var token = localStorage.getItem("userToken");
  var userid = localStorage.getItem('userid')

  
  const [myCartData,setMyCartData] = useState([])
  const [loading,setLoading] = useState(false)
  const [itemsPrice,setItemsPrice] = useState(0)
  const [discountPercent,setDiscountPercent] = useState(0)
  const [totalBill,setTotalBill] = useState(0)
  
  let data1 = useSelector((state)=>{
      return state
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const calculateAndUpdate = (data) =>{
    let bill = 0
    let discountAmount = 0

    const cal = data.map((each)=>{
      let itemPrice = each.price*80*each.quantity
      discountAmount += (itemPrice * each.discount) / 100;
      bill += itemPrice
    })
    const billAmout = bill
    const userTotalBill = Math.round(billAmout-discountAmount)
    const userDiscountRate = Math.round(discountAmount)
    setItemsPrice(billAmout)
    setDiscountPercent(userDiscountRate)
    setTotalBill(userTotalBill)
    setMyCartData(data)
    dispatch({ type: 'cartItems', payload: data });

  }

  useEffect(()=>{
      async function getCart() {
        console.log("loadertrig")
        try {
          if (!token && !userid) {
            toast.success("Please Login");
      
            setTimeout(() => {
              navigate('/login')
            }, 1000);
          }else{
              setLoading(true)

              const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/userCart/items`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                params: {
                  userid,  // Pass userid as a query parameter
                },
              }
              );
          
              console.log("data",res.data)
              if (res && res?.data && res?.data?.success) {
                const data = res.data.data
                calculateAndUpdate(data)
                setLoading(false)
                toast.success(res.data.message);
                
              } else {
                toast.error("Something went wrong");
                setLoading(false)
              }

        } 
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong");
        }
      }

    getCart()
    
  },[])

  const getLoader = () =>{
    return(
    <div className="preloader">
      <svg
        className="cart"
        role="img"
        aria-label="Shopping cart line animation"
        viewBox="0 0 128 128"
        width="128px"
        height="128px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
          <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
            <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
            <circle cx="43" cy="111" r="13" />
            <circle cx="102" cy="111" r="13" />
          </g>
          <g className="cart__lines" stroke="currentColor">
            <polyline
              className="cart__top"
              points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
              strokeDasharray="338 338"
              strokeDashoffset="-338"
            />
            <g className="cart__wheel1" transform="rotate(-90,43,111)">
              <circle
                className="cart__wheel-stroke"
                cx="43"
                cy="111"
                r="13"
                strokeDasharray="81.68 81.68"
                strokeDashoffset="81.68"
              />
            </g>
            <g className="cart__wheel2" transform="rotate(90,102,111)">
              <circle
                className="cart__wheel-stroke"
                cx="102"
                cy="111"
                r="13"
                strokeDasharray="81.68 81.68"
                strokeDashoffset="81.68"
              />
            </g>
          </g>
        </g>
      </svg>
      
    </div>
  
    )
  }

  const quantityUpdateToDb = async (id,action) =>{
    const filteredData = myCartData.filter(each=>each.id === id)
    let quantity = filteredData[0].quantity 
    if(action === "+"){
      if(quantity >5){
        toast.error("Max Qty reached");
        return
      }
      quantity += 1
    }
    if(action === "-"){
      if(quantity=== 1){
      toast.error("Min Qty reached");
        return
      }
      quantity -= 1
    }

    try{
      const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/userCart/updatemycart`, 
      {
        id,
        quantity,
        userid
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(res && res?.data && res?.data?.success){
        const data = res.data.cartData
        calculateAndUpdate(data)
        toast.success(res.data.message);
        

      }
    }
    catch(error){
      console.error("error",error)
    }

  }

  const qtyDecreaseTrigger = (id) =>{
    const action = "-"
    quantityUpdateToDb(id,action)
  }

  const qtyIncraseTrigger =(id) =>{
    const action = "+"
    quantityUpdateToDb(id,action)
  }

  const deleteAllItemsInDb = async()=>{
    try{
      const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/userCart/deleteallitems`, 
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data:{
          userid
        },
      });
      
      if(res && res?.data && res?.data?.success){
        toast.success(res.data.message);
        setItemsPrice(0)
        setDiscountPercent(0)
        setTotalBill(0)
        setMyCartData([])
        dispatch({ type: 'cartItems', payload: [] });
      }
    }
    catch(error){
      toast.error(error.message);
      console.error("error",error)
    }
  }

  const removeItemTriggered = async (id) =>{
    if(myCartData.length >1){
      try{
        const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/userCart/deletemyitem`, 
        
        {
          data:{id,userid},
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if(res && res?.data && res?.data?.success){
          const data = res.data.cartData
          calculateAndUpdate(data)
          toast.success(res.data.message);
        }
      }
      catch(error){
        toast.error(error.message);
        console.error("error",error)
      }
    }else{
      deleteAllItemsInDb()
    }
  }


return(
    <Layout title={"Product-details E-commerce app"}>
    
        <div className='container row m-auto cart-main-container animate__animated animate__fadeInRight'>
        
        {loading?(
          <div className='d-flex justify-content-center col-12 h-75 loder-main-container' style={{ minHeight: "90vh" }}>
          {getLoader()}
      </div>
        ):(
          myCartData.length>0?
          <>
            <div className='col-12 col-lg-8 all-items-container'>
              <div className='d-flex justify-content-between mb-3'>
                <h3 className='my-cart-heading'>My Cart</h3>
                <button onClick={deleteAllItemsInDb} className='btn btn-outline-primary border-2'>Remove all</button>
              </div>
            <ul className="cart-list">
            {myCartData.map(eachCartItem => (
              <CartItem key={eachCartItem.id} removeItemTriggered={removeItemTriggered} qtyIncraseTrigger={qtyIncraseTrigger} qtyDecreaseTrigger={qtyDecreaseTrigger} cartItemDetails={eachCartItem} />
            ))}
          </ul>
          
          </div>
          
          <div className='col-12 col-lg-4  billing-container'>
            <h2>Price Details</h2><hr/>
            <div className='mt-3 d-flex justify-content-between'>
              <h5 className=''>Price ({myCartData.length} items)</h5>
              <h6 className='order-bill'>Rs {itemsPrice}/-</h6>
            </div>
            <div className='mt-3 d-flex justify-content-between'>
              <h5 className=''>Discount</h5>
              <h6 className='order-bill'>Rs {discountPercent}/-</h6>
            </div>
            <div className='mt-3 d-flex justify-content-between'>
              <h5 className=''>Delivery Charges</h5>
              <h6 className='text-success'><span className='order-bill-strike'>Rs 90</span> Free</h6>
            </div>
            
            <h2 className='order-total-head mt-5'>Total Amount: <span className='order-total-head-span'>Rs {totalBill}</span></h2>
            <Link to="/checkout">
              <button className='btn btn-primary w-100'>Checkout</button>
            </Link>
          </div>
          </>
          :

          <div className='col-12 d-flex flex-column justify-content-center align-items-center' style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png" alt="Empty Cart Image" />
              <Link to="/">
              <button type="button" className="mt-3 shop-now-btn">
                Shop Now
              </button>
            </Link>
          <marquee behavior="scroll" direction="right" scrollamount="10">
              <h3>"Fill Your Cart, Fuel Your Style!"</h3>
              
          </marquee>
      
      </div>
      
        
        )}
        </div>
    </Layout>
  )
}

export default Cart