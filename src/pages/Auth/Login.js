import React, { useEffect, useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import {Layout} from "./../../components/Layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./style.css"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';

const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let dispatch = useDispatch()

  const navigate = useNavigate();
  const location = useLocation();

  let data1 = useSelector((state)=>{
    return state
})

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        console.log("userCartLogin",res)
        const token = res.data.token
        const userid = res.data.user._id
        const userCartData = res.data.cartData
        const isAdmin  = res.data.user.role
        const userData = JSON.stringify(res.data.user)
        localStorage.setItem('userData',userData)
        localStorage.setItem("isLogin",true)
        localStorage.setItem('userid',userid)
        localStorage.setItem("userToken",(token))
        localStorage.setItem('otdisplay',true);
        toast.success(res.data && res.data.message);
        dispatch({type:"Login",payload:true})
        dispatch({ type: "userid", payload: userid});
        dispatch({ type: 'cartItems', payload: userCartData });
        if(isAdmin === 1){
          setTimeout(()=>{
            navigate("/admindashboard");
          },1200)
        }else{
          setTimeout(()=>{
            navigate("/");
          },1500)
        }
        
        
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(()=>{
    if(data1.forgotPasswordMail){
      setEmail(data1.forgotPasswordMail)
    }
    const token = localStorage.getItem("isLogin")
    if(token){
      dispatch({type:"Login",payload:true})
      navigate('/')
    }
  },[])
  
  return (
    <Layout title="login- Ecommer App">
        <div className="mt-5 mb-1">
        <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
        </div>
   
    </Layout>
  );
}






// const Login = () => {


//   return (
//     <Layout title="Login - Ecommer App">
//       <div className="form-container " style={{ minHeight: "90vh" }}>
//         <form onSubmit={handleSubmit}>
//           <h4 className="title">LOGIN FORM</h4>
//           <div className="mb-3">
//             <input
//               type="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               id="exampleInputEmail1"
//               placeholder="Enter Your Email "
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control"
//               id="exampleInputPassword1"
//               placeholder="Enter Your Password"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <button
//               type="button"
//               className="btn forgot-btn"
//               onClick={() => {
//                 dispatch({type:"forgotPasswordMail",payload:email})
//                 navigate("/forgot-password");
//               }}
//             >
//               Forgot Password
//             </button>
//           </div>

//           <button type="submit" className="btn btn-primary">
//             LOGIN
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Login;