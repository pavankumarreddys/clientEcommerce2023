import {NavLink,Link} from 'react-router-dom'
import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../components/Layout/Layout';
import {BsTagFill} from 'react-icons/bs'
import './styles/productdetails.css'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import 'animate.css';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import toast from "react-hot-toast";

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};


const ProductDetails = () => {
  let { id } = useParams();
  const [isLoading,setIsLoading] = useState(true)
  const [allProducts,setAllProducts] = useState([])
  let dispatch = useDispatch()
  let data1 = useSelector((state)=>{
    return state
  })

  async function data(){
    setIsLoading(true)
    try{
      const resp = await fetch('https://dummyjson.com/products')
      const data = await resp.json()
      if(data){
        const filterData = data.products.filter((each)=> each.id === parseInt(id))
          setAllProducts(filterData[0])
          setIsLoading(false)
      }else{
          setIsLoading(true)
      }
      
    }catch(e){
      console.log("error",e)
    }
    

  }
  

  useEffect(()=>{
    const len = data1.allProducts
      if(len.length>0){
        setIsLoading(false)
        const filterData = data1.allProducts.filter((each)=> each.id === parseInt(id))
        setAllProducts(filterData[0])
      }
      else{
        data()
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

  const addToCartTriggered = () => {
    const prevData = data1.cartListData;
  
    // Check if the product with the same ID already exists
    const isProductExists = prevData.some(product => product.id === allProducts.id);
  
    if (!isProductExists) {
      const allData = [...prevData, allProducts];
      localStorage.setItem("cartProducts",JSON.stringify(allProducts))
      console.log("allData", allData);
      dispatch({ type: "cartItems", payload: allData });
      toast.success("Product Added Successfully");
    } else {
      toast.error("Product is already in the cart");
    }
  };
  
  

  return (
    <Layout title={"Product-details E-commerce app"}>
        <div className='container row m-auto details-main-container animate__animated animate__fadeInRight'>
            {isLoading?
            <div className='col-12 h-100 loder-main-container' style={{ minHeight: "90vh" }}>
                {getLoader()}
            </div>
            :
            <>
            <div className='col-12 col-lg-4'>
              <div className='image-container'>
                <img className="image-uniq" src={allProducts.thumbnail}/>
              </div>
              <div className='mt-2 p-2 d-flex justify-content-between'>
              <Button onClick={addToCartTriggered} variant="contained" endIcon={<ShoppingCartIcon />}>
                Add Cart
              </Button>
              <Button variant="contained" color="success" endIcon={<BoltOutlinedIcon />}>
                Buy now
              </Button>
              </div>
            </div>
            <div className='col-12 col-lg-8 '>
              <h1 className='product-title'>{allProducts.title}</h1>
              <p className='product-description'>{allProducts.description}</p>

              <div className='control-my-all'>
                <h3 className='product-price'>${allProducts.price}</h3>
                <div>
                  <h4>Discount: <span className='text-success text-bold'>{allProducts.discountPercentage}%</span> </h4>
                </div>
              </div>
              <div className='d-flex'>
                    
                    <Box
                      sx={{
                        width: 2,
                        display:"flex",
                        alignItems: 'center',
                      }}
                    >
                      <Rating
                        name="text-feedback"
                        value={parseInt(allProducts.rating)}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                      />
                      <Box sx={{ ml: 2 }}>{labels[parseInt(allProducts.rating)]}</Box>
                    </Box>
                  </div>
              
              <h3 className='mt-2'>Available offers</h3>
              <div className='d-flex'>
              <span className='mx-1'><BsTagFill color={"green"} size={"20px"}/></span>
              <p>Bank OfferExtra ₹750 off on SBI Credit Card and Credit EMI Txns on Net Cart Value of ₹24,990 and aboveT&C</p>
              </div>
              <div className='d-flex'>
              <span className='mx-1'><BsTagFill color={"green"} size={"20px"}/></span>
              <p>Buy for 150 get ₹100 off your Next BuyT&C</p>
              </div>
              <div className='d-flex'>
              <span className='mx-1'><BsTagFill color={"green"} size={"20px"}/></span>
              <p>Bank Offer10% Instant Discount on SBI Credit Card Txns, up to ₹1500, on orders of ₹5,000 and aboveT&C</p>
              </div>
              <div>
                  <h4>Stock: <span className='text-success text-bold'>{allProducts.stock}</span> </h4>
              </div>
              
            </div>
            <div className='col-12 mt-5 text-center'>
              <h3>Similar Products</h3>
            </div>
            <div className='col-12 detail-grid-container '>
              {allProducts.images.map((img,index)=>(
                <div key={index}  className ="detail-grid-item">
                <img className={allProducts.images.length>1?"image-uniq":"image-single"} src={img}/>
                </div>
              ))}
            </div>
            </>
            }
        </div>
    </Layout>
  );
}

export default ProductDetails;
