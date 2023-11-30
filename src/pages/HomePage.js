import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../components/Layout/Layout'
import ThumbnailProduct from '../components/Products/ThumbnailProduct'
import ImageSlider, { Slide } from "react-auto-image-slider";
import "./styles/home.css"
import DailogBox from '../components/DailogBox';
import axios from "axios";
import 'animate.css';

const categoryOptions = [
  {
    name: 'All',
    categoryId: '0',
    value:'all'
  },
  {
    name: 'Smartphones',
    categoryId: '1',
    value:'smartphones'
  },
  {
    name: 'Laptops',
    categoryId: '2',
    value:'laptops'
  },
  {
    name: 'Fragrances',
    categoryId: '3',
    value:'fragrances'
  },
  {
    name: 'Skincare',
    categoryId: '4',
    value:'skincare'
  },
  {
    name: 'Groceries',
    categoryId: '5',
    value:'groceries'
  },
  {
    name: 'Home-decoration',
    categoryId: '6',
    value:'home-decoration'
  },
  {
    name: 'Mens Clothes',
    categoryId: '7',
    value:'mens clothes'
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const HomePage = () => {
  const [productsData,setProductsData] = useState([])
  const [loaderActive,setLoaderActive]= useState(false)
  const [priceRange,setPriceRange] = useState('PRICE_HIGH')
  let dispatch = useDispatch()
  var token  = localStorage.getItem('userToken')
  let data1 = useSelector((state)=>{
    return state
  })
  
  const handleMoreDetails = (id)=>{
    
  }

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

  const categoryFilter = (value) =>{
    const allProducts = data1.allProducts
    setLoaderActive(true)
    if(value === "all"){
      setTimeout(() => {
        const sortedProductsDescending = allProducts.sort((a, b) => b.price - a.price);
        setProductsData(sortedProductsDescending)
        setLoaderActive(false)
        setPriceRange('PRICE_HIGH')
      }, 1500);
    }else{
      const filteredData = allProducts.filter(each=> each.category === value)
      setTimeout(() => {
        if(priceRange === "PRICE_LOW"){
          const sortedProducts = filteredData.sort((a, b) => a.price - b.price);
          setProductsData(sortedProducts);
        }else{
          const sortedProductsDescending = filteredData.sort((a, b) => b.price - a.price);
          setProductsData(sortedProductsDescending); 
        }
        //setProductsData(filteredData)
        setLoaderActive(false)
      }, 1500);
    }
  }

  const filterOnRatingID = (value) =>{
    setLoaderActive(true)
    const filteredData = productsData.filter(each=> parseFloat(each.rating) > parseFloat(value))
      setTimeout(() => {
        setProductsData(filteredData)
        setLoaderActive(false)
      }, 1500);

  }

  const handleSelectChange = (e) =>{
    const selectedValue = e.target.value;
    const allProducts = data1.allProducts;
    setPriceRange(selectedValue);

    if(selectedValue === "PRICE_LOW"){
      const sortedProducts = productsData.sort((a, b) => a.price - b.price);
      setProductsData(sortedProducts);
    }else{
      const sortedProductsDescending = productsData.sort((a, b) => b.price - a.price);
      setProductsData(sortedProductsDescending); 
    }

  
    


  }
  
  useEffect(() =>{
    async function data(){
      try{
        const resp = await fetch(`${process.env.REACT_APP_API}/api/v1/newproduct/getallnewproducts`)
        const data = await resp.json()
        console.log("data90",data)


        if(data){
          dispatch({type:"addProducts",payload:data.products})
          dispatch({type:"apiStatus",payload:true})
          if(priceRange === "PRICE_LOW"){
            const sortedProducts = data.products.sort((a, b) => a.price - b.price);
            setProductsData(sortedProducts);
          }else{
            const sortedProductsDescending = data.products.sort((a, b) => b.price - a.price);
            setProductsData(sortedProductsDescending); 
          }
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

  let otd = localStorage.getItem('otdisplay')



  

function MyCarousel() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide home-slider-bgm" data-ride="carousel">
      <div className="home-slider-bgm">
        <div className="carousel-item  active text-center ">
          <img
            data-tilt
            data-tilt-max="10"
            src="https://img.freepik.com/free-photo/nature-scene-smartphone-technology-close-up-generative-ai_188544-19437.jpg?w=1060&t=st=1700481756~exp=1700482356~hmac=7b33812db8b85e90029318ed558cf2c5d27e9897bc1361973ba8b7b94815a7c7"
            className="slider-image mr-1"
            alt="First slide"
          />
        </div>
        <div className="carousel-item   text-center ">
          <img
            data-tilt
            data-tilt-max="10"
            src="https://img.freepik.com/free-photo/portrait-young-attractive-woman-elegant-dress-straw-hat-summer-style-fashion-trend-vacation-smiling-stylish-accessories-sunglasses-posing-tropical-villa-bali_285396-5685.jpg?w=900&t=st=1700482693~exp=1700483293~hmac=84f367fd15573d3752eafb035f16562edc2d71d141d499909d94ab0b84e9099b"
            className="slider-image mr-1"
            alt="First slide"
          />
        </div>
        <div className="carousel-item   text-center ">
          <img
            data-tilt
            data-tilt-max="10"
            src="https://img.freepik.com/premium-photo/feminine-summer-aesthetic-fashion-clothes-composition-with-sundress-slippers-sunglasses-straw-hat-earrings-white-background-flat-lay-top-view-minimal-cloth-concept_408798-9735.jpg?w=900"
            className="slider-image mr-1"
            alt="First slide"
          />
        </div>
        <div className="carousel-item   text-center ">
          <img
            data-tilt
            data-tilt-max="10"
            src="https://img.freepik.com/free-photo/portrait-handsome-fashion-man-model-wearing-white-clothes-posing-near-rocks-beach_158538-2341.jpg?w=900&t=st=1700546944~exp=1700547544~hmac=0b27461d4a0b03ca069e98455e270147729ee43c5ec464dd6b0e559672f48969"
            className="slider-image mr-1"
            alt="First slide"
          />
        </div>
        <div className="carousel-item   text-center ">
          <img
            data-tilt
            data-tilt-max="10"
            src="https://img.freepik.com/free-photo/collection-common-food-allergens-people_23-2149870525.jpg?w=900&t=st=1700547106~exp=1700547706~hmac=1f6f69e892951604016b65e98b63d507dd7388e9d38335ca44ff5234d6d5e284"
            className="slider-image mr-1"
            alt="First slide"
          />
        </div>
        
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="false"></span>
        <span className="sr-only bg-danger">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="false"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}



  return (
    <Layout title={"Home E-commerce app"}>
        <div >
          {!otd&& <DailogBox/>}
          {!data1.apiStatus?(
            <div className='sample-home-container'>
                <img className='home-image' src="https://source.unsplash.com/random?wallpapers"/>
            </div>
          ):(
            <div className='container-fluid row mt-3 home-page'>
              <div className='col-12'>{MyCarousel()}</div>
              <div className="col-md-2 filters">
                <h2>Filters</h2>
                <h5 className='category-head'>Category</h5>
                <ul className='filters-unorders-ul'>
                  {categoryOptions.map((each)=>(
                  <li tabIndex="0" onClick={()=>categoryFilter(each.value)} key={each.categoryId} className='filters-unorders-li'>{each.name}</li>
                  ))}
                </ul>
                <h5 className='category-head'>Rating</h5>
                <ul className='filters-unorders-ul'>
                {ratingsList.map(rating => {
                    // const ratingClassName = 
                    //   activeRatingId === rating.ratingId ? `and-up active-rating` : `and-up`
                    return (
                      <li
                        className="filters-unorders-ratings pt-2"
                        key={rating.ratingId}
                        onClick={()=>filterOnRatingID(rating.ratingId)}
                      >
                        <img
                          src={rating.imageUrl}
                          alt={`rating ${rating.ratingId}`}
                          className="rating-img"
                        />
                      </li>
                    )
                  })}
                </ul>
                <button
                  type="button"
                  className="clear-filters-btn"
                  onClick = {()=>categoryFilter('all')}
                >
                  Clear Filters
                </button>
              </div>
              <div className="col-md-10  animate__animated animate__fadeInUpBig">
              <h1 className="text-center">All Products</h1>
              <div className="price-list-container">
              <select value={priceRange} onChange={handleSelectChange}>
                {sortbyOptions.map((each) => (
                  <option value={each.optionId} key={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>

              </div>
              
            {loaderActive?
            (<div className='d-flex justify-content-center align-items-center  h-75'>{getLoader()}</div>):
            (productsData.length>0?
            <div className="d-flex flex-wrap items-page-container">
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
                        className="btn btn-info ms-0"
                        onClick={()=>{handleMoreDetails(p.id)}}
                      >
                        More Details
                      </button>
                      <div className="rating-container ms-5">
                        <p className="rating">{p.rating}</p>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                          alt="star"
                          className="star"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
            ))}
            </div> :
            <div className='no-items-found-container'>
              <img className="no-items-pic" src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?w=900&t=st=1700900821~exp=1700901421~hmac=647081726f148d774a5b3dbbb58458a0ebb63e35211fb3ca4116e916beb4e4f3"/>
                <h4 className='pt-3'>No Items Found!</h4>
            </div>
            )
            }
          
        </div>

            </div>
          
          )}
          
        </div>
    </Layout>
  )
}

export default HomePage


