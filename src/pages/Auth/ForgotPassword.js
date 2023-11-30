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




// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ForgotPassword() {
const [email, setEmail] = useState("");
const [password,setPassword] = React.useState('')
const [conformPassword,setConformPassword] = React.useState('')
const[checkBoxActive,setCheckBoxActive] = React.useState(false)
const [buttonActive,setButtonActive] = React.useState(true)
const navigate = useNavigate()


let data1 = useSelector((state)=>{
    return state
})

  const handleSubmit = async(event) => {
    event.preventDefault();
      try{
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/forgotpassword`,{
                email,
                password
            });
            if(res && res?.data?.success){
                toast.success(res?.data?.message);
                setTimeout(()=>{
                    navigate('/login')
                },1500)
            }else{
                toast.error(res?.data?.message);
            }

        }catch(error){
            console.log(error)
            toast.error("An unexpected error occurred.");
        }
        
      setEmail('')
      setPassword('')
      setConformPassword('')
  };

  
  function isStrongPassword(password) {
    // At least 8 characters, and 1 special character
    const strongPasswordRegex = /^(?=.*[A-Za-z\d])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  }
  
  return (
    <Layout title="forgot-password - Ecommer App">
        <div className="mt-5 mb-1">
            <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '90vh' }}>
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
                    Change Password
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
                        onChange={(e)=>{
                            if(e.target.value.charCodeAt(0) !== 32){
                                setPassword(e.target.value)
                            }
                            if(isStrongPassword(e.target.value) && conformPassword===e.target.value){
                                setButtonActive(false)
                            }else{
                                setButtonActive(true)
                            }
                        }}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={checkBoxActive?"text":"password"}
                        id="password"
                        autoComplete="current-password"
                    />
                    
                    <TextField
                        margin="normal"
                        value={conformPassword}
                        onChange={(e)=>{
                            if(e.target.value.charCodeAt(0) !== 32){
                                setConformPassword(e.target.value)
                            }
                            if(password===e.target.value && isStrongPassword(password)){
                                setButtonActive(false)
                            }else{
                                setButtonActive(true)
                            }
                        }}
                        required
                        fullWidth
                        name="Conform password"
                        label="Conform Password"
                        type={checkBoxActive?"text":"password"}
                        id="conformpassword"
                    />
                    <div className="d-flex justify-content-left align-items-center">
                        <input className="input-checkbox" 
                        type="checkbox"
                        onChange={()=>{
                            setCheckBoxActive(!checkBoxActive)
                        }}
                        />
                        <label className="text-secondary mx-2">Show Password</label>
                    </div>
                    
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={buttonActive}
                    >
                        Change Password
                    </Button>
                    {buttonActive &&
                    <marquee behavior="scroll" direction="left" scrollamount="5">
                        <p className="text-danger">Password atleast 8 characters,and 1 special character</p>
                    </marquee>
                    }
                    
                    </Box>
                </Box>
                
                </Grid>
            </Grid>
            </ThemeProvider>
        </div>
   
    </Layout>
  );
}
