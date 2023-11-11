import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../components/Layout/Layout'
import ThumbnailProduct from '../components/Products/ThumbnailProduct'
import ImageSlider, { Slide } from "react-auto-image-slider";
import "./styles/home.css"
import DailogBox from '../components/DailogBox';
import 'animate.css';


const HomePage = () => {
  const [productsData,setProductsData] = useState([])
  const [apiStatus,setApiStatus] = useState(false)
  let dispatch = useDispatch()

  let data1 = useSelector((state)=>{
    return state
  })
  
  const handleMoreDetails = (id)=>{
    console.log("id",id)
  }

  useEffect(()=>{
    async function data(){
      try{
        const resp = await fetch('https://dummyjson.com/products')
        const data = await resp.json()
        if(data){
          dispatch({type:"addProducts",payload:data.products})
          dispatch({type:"apiStatus",payload:true})
          setProductsData(data.products)
        }else{
          dispatch({type:"apiStatus",payload:data.false})
        }
      }catch(e){
        dispatch({type:"apiStatus",payload:data.false})
      }
  
    }
    data()
  },[])
  
  return (
    <Layout title={"Home E-commerce app"}>
        <div >
          {!data1.isUserLogin&& <DailogBox/>}
          {!data1.apiStatus?(
            <div className='sample-home-container'>
                <img className='home-image' src="https://img.freepik.com/free-vector/illustration-social-media-concept_53876-37691.jpg?w=900&t=st=1699617568~exp=1699618168~hmac=433105f0fbe5cbfd8afd629941ccf8fb7938706fcb8924f4bb7f71cc8546144b"/>
            </div>
          ):(
            <div className='container-fluid row mt-3 home-page'>
              <div className="col-md-3 filters">
                <h4>Filters</h4>
              </div>
              <div className="col-md-9 animate__animated animate__fadeInUpBig">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {productsData?.map((p) => (
                <Link to={`/items/details/${p.id}`} key={p.id} className='card m-2 details-link-st'>
                <div >
                  <img
                    src={p.thumbnail}
                    className="card-img-top"
                    alt={p.title}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.title}</h5>
                      <h5 className="card-title card-price">
                        ${p.price}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={()=>{handleMoreDetails(p.id)}}
                      >
                        More Details
                      </button>
                      
                      <button
                        className="btn btn-dark ms-1"
                        
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
                </Link>
            ))}
          </div>
          
        </div>

            </div>
          
          )}
          
        </div>
    </Layout>
  )
}

export default HomePage


