import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import { useState } from 'react'


const CartItem = props => {
    const {cartItemDetails,removeItemTriggered,qtyIncraseTrigger,qtyDecreaseTrigger} = props 
    const {thumbnail ,title ,brand,price ,id,quantity} = cartItemDetails

    const [debounceTimeout, setDebounceTimeout] = useState(null);

  const debounce = (func, delay) => {
    clearTimeout(debounceTimeout);
    const timeoutId = setTimeout(func, delay);
    setDebounceTimeout(timeoutId);
  };

  const itemQtyPlus = () => {
    debounce(() => qtyIncraseTrigger(id), 500); // Debounce for 2 seconds (2000 milliseconds)
  };
    
  const itemQtyMinus = () =>{
    debounce(() => qtyDecreaseTrigger(id), 500);
  }
   
  const removeItemTrigger = () =>{
    debounce(() => removeItemTriggered(id), 100);
  }

    
    return (
        <li className="cart-item">
          <img className="cart-product-image" src={thumbnail} alt={title} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">by {brand}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className=" bg-light quantity-controller-button"
                onClick = {itemQtyMinus} 
              >
                <BsDashSquare size={12} />
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                className="bg-light quantity-controller-button"
                onClick={itemQtyPlus}
              >
                <BsPlusSquare  size={12} />
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">$ {price}</p>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={removeItemTrigger}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
}

      
    
  


export default CartItem