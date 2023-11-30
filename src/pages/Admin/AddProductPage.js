import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {useNavigate,useLocation} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import toast from "react-hot-toast";
import axios from "axios";
const defaultTheme = createTheme();

const AddProductPage = () => {
    var token = localStorage.getItem('userToken')
    const navigate = useNavigate()
    const [specification,setSpecification] = useState('')

const handleSubmit = async(event) => {
    event.preventDefault();
    console.log("trp",event.currentTarget)
    const data = new FormData(event.currentTarget);
    const id = uuidv4()
    const title = data.get('title')
    const description = data.get('description')
    const brand = data.get('brand')
    const price = data.get('price')
    const discountPercentage = data.get('discountPercentage')
    const rating = data.get('rating')
    const stock = data.get('stock')
    const category = data.get('category')
    const thumbnail = data.get('thumbnail')
    const similarProducts = data.get('similarproducts');
    const images = similarProducts ? similarProducts.split(',') : [];


    event.currentTarget.reset();

   try {
    if (!token) {
      toast.success("Please Login");
      setTimeout(() => {
        navigate('/login')
      }, 1000);

      // Handle the absence of a token, e.g., redirect to login.
    }else{
    

    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/newproduct/addnewproduct`,
      {
        id,title,brand,price,discountPercentage,description,rating,stock,category,thumbnail,images
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("newp",response.data.message)
    //event.currentTarget.reset(); // clearing data after submiting
    if (response && response?.data?.success){
        toast.success(response.data && response.data.message);
        return true
      }else{
        toast.error(response.data.message);
        return false
      }

  }

  } catch (error) {
    console.error("Error storing data:", error.message);
    toast.error("Something went wrong Please try again!")
    // Handle errors, e.g., show an error message to the user.
  }
};

  return (
    <div className='col-12 col-lg-8 '>
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add New Product
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    placeholder='Enter Product Name'
                    autoComplete="title"
                    
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    type="text"
                    placeholder='Tell about this product'
                    id="description"
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="price"
                    label="Price"
                    type="number"
                    placeholder='ex: $15'
                    id="price"
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="discountPercentage"
                    label="Discount Percentage"
                    type="number"
                    placeholder='ex: 12.5'
                    id="discountPercentage"
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="rating"
                    label="Rating"
                    type="number"
                    placeholder='ex: 4.96'
                    id="rating"
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="stock"
                    label="Stock"
                    type="number"
                    placeholder='ex: 5'
                    id="stock"
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="brand"
                    label="Brand"
                    type="text"
                    placeholder='ex: apple,fastrack,nike'
                    id="brand"
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="category"
                    label="Category"
                    type="text"
                    placeholder='ex: smartphones,skincare'
                    id="category"
                    value={specification}
                    onChange={(e)=>setSpecification(e.target.value)}
                    />
                    {specification ==="smartphones" ?
                      <TextField
                      margin="normal"
                      multiline
                      rows={4}
                      required
                      fullWidth
                      name="spec"
                      label="Specifications"
                      type="text"
                      placeholder='ex: Specifications about mobiles'
                      id="spec"
                      />
                      :
                      null
                    }
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="thumbnail"
                    label="Thumbnail"
                    type="text"
                    placeholder='Enter Product url'
                    id="thumbnail"
                    />
                    <TextField
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    name="similarproducts"
                    label="Similar Products"
                    type="text"
                    placeholder='Enter similarproducts with cama seperate url'
                    id="similarproducts"
                    />
                    
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Add Product 
                    </Button>
                    
                </Box>
                </Box>
            </Container>
        </ThemeProvider>
    </div>
  )
}

export default AddProductPage