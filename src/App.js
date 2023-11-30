
import {Routes,Route, useNavigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import Pagenotfound from './pages/Pagenotfound'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import CheckoutCart from './pages/CheckoutCart'
import ForgotPassword from './pages/Auth/ForgotPassword'
import AdminDashboard from './pages/Admin/AdminDashboard'
import UserProfile from './pages/UserProfile'

function App() {
  const buttonTiggered = () =>{
    alert("Activated button")
  }

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/admindashboard" element={<AdminDashboard/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/policy" element={<Policy/>}/>
      <Route path="/checkout" element={<CheckoutCart/>}/>
      <Route path="/userprofile" element={<UserProfile/>}/>
      <Route path={"/items/details/:id"} element={<ProductDetails/>}/>
      <Route path="*" element={<Pagenotfound/>}/>
    </Routes>

    </>
  );
}

export default App;
