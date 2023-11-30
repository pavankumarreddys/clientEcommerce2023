import React from 'react'
import {NavLink,Link, useNavigate} from 'react-router-dom'
import {GiShoppingBag} from 'react-icons/gi'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import {Badge} from 'antd';
import toast from 'react-hot-toast';
import { FaUserCircle } from "react-icons/fa";


export const Header = () => {
const login = localStorage.getItem('isLogin')
const [open, setOpen] = React.useState(false);
const [isDropdownVisible, setDropdownVisible] = React.useState(false);
let dispatch = useDispatch()
const navigate = useNavigate();

let data1 = useSelector((state)=>{
  return state
})

let itemsLen = data1?.cartListData?.length


const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const handleLogout = () =>{
  localStorage.removeItem("isLogin")
  dispatch({type:"Login",payload:false})
  dispatch({type:"Login",payload:false})
  dispatch({type:'cartItems', payload: [] });

  localStorage.removeItem('otdisplay')
  localStorage.removeItem('cartProducts')
  localStorage.removeItem('userToken')
  localStorage.removeItem('userid')
  localStorage.removeItem('currentLocation')
  localStorage.removeItem('userData')

  navigate("/login")
}

const handleMouseEnter = () => {
  setDropdownVisible(true);
};

const handleMouseLeave = () => {
  setDropdownVisible(false);
};

const validateIsAdmin = () =>{
  const token = localStorage.getItem("userToken")
  if(token){
    navigate('/admindashboard')
  }else{
    toast.error('Unauthorized actions')
  }
}

const validateIsLogin = ()=>{
  const isLogin = localStorage.getItem('userToken')
  if(isLogin){
    navigate('/')
  }
  else{
    navigate('/login')
  }
}

  return (
    <>
      <nav className="navbar navbar-expand-lg header-bgm fixed-top">
      <div className="container-fluid ">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand"><GiShoppingBag size={40}/> 
          ECOMMERCE  </Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/"  className="nav-link" >Home</NavLink>
            </li>
    
            <li className="nav-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <NavLink to="/category" className="nav-link">
                UserType
              </NavLink>
              {isDropdownVisible && (
                <div className="dropdown" style={{ zIndex: 1000 }}>
                  <ul>
                    <li onClick={validateIsAdmin} className='dropdown-list-first-child'>Admin</li>
                    <li onClick={validateIsLogin}>User</li>
                  </ul>
                </div>
              )}
            </li>
      
            {login?
            <>
            <li className="nav-item mx-2">
            <Badge count={itemsLen}>
              <NavLink to="/cart"  className="mt-1 nav-link ">Cart</NavLink>
            </Badge>
            </li>
            <li className="nav-item mx-2 mt-2">
              <Link to="/userprofile" className="navbar-brand"><FaUserCircle size={30}/></Link>
            </li>
            </>:
            null
            }
            {login?
            <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
              Logout
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Do u want to Logout?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleLogout} autoFocus>Yes</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>:
          <>
            <li className="nav-item">
              <NavLink to="/register"  className="nav-link">Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login"  className="nav-link">Login</NavLink>
            </li>
            </>
              }
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}
