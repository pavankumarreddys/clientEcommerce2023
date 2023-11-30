import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Layout}from '../../../src/components/Layout/Layout'
import AddProductPage from './AddProductPage';
import AllUsers from './AllUsers'
import toast from 'react-hot-toast';
import TrackOrders from './TrackOrders';
import '../styles/admin.css'
const AdminDashboard = () => {
  const [isAdmin,setIsAdmin] = useState(false)
  const [addProductActive,setAddProductActive] = useState(false)
  const [allUserActive,setAllUserActive] = useState(false)
  const [trackActive,setTrackActive] = useState(false)
  const [loaderActive,setLoaderActive] = useState(true)
  const navigate = useNavigate()


  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
      toast.error("userData Not Found Please Login ")
      setTimeout(()=>{
        navigate('/login')
      },1500)
    }else{
      const checkAdmin = userData?.role
      if(checkAdmin === 1){
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
        toast.error("Your not a Admin")
        navigate('/')
      }
    }
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

  return (
    <Layout title="AdminDashboard- Ecommer App">
      
          <div className='container row m-auto admin-main-container animate__animated animate__fadeInRight'>
        
          {!isAdmin?<div className='d-flex justify-content-center align-items-center'style={{ minHeight: "90vh" }}>{getLoader()}</div>
          :
          <>
          <div className='col-12 col-lg-4 side-bar'>
              <h3 tabIndex="0" className='admin-side-name' onClick={()=>{
                setAddProductActive(true)
                setAllUserActive(false)
                setTrackActive(false)
              }}>Add Product</h3>
              <h3 tabIndex="0" className='admin-side-name' onClick={()=>{
                 setAddProductActive(false)
                 setAllUserActive(true)
                 setTrackActive(false)
              }}>users</h3>
              <h3 tabIndex="0" className='admin-side-name' onClick={()=>{
                 setAddProductActive(false)
                 setAllUserActive(false)
                 setTrackActive(true)
              }}>Track Orders</h3>
          </div>
            {(!addProductActive && !allUserActive && !trackActive) &&<div className='d-flex justify-content-center'>{getLoader()}</div>}
            {addProductActive&& <AddProductPage/>}
            {allUserActive&& <AllUsers/>}
            {trackActive&& <TrackOrders/>}
            
          </>
        
          
          }
          </div>
          
        
    </Layout>
  )
}

export default AdminDashboard

// const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/newproduct/getnewproducts`,
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//               );
//         const data = res?.data
//         console.log("newd",data)