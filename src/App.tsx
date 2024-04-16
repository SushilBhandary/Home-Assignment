import React, { useEffect, useState } from 'react';
import { AppBar, Checkbox, ListItemText, OutlinedInput, Box, Typography, Container , Grid, Button,Select, MenuItem,InputLabel, FormControl } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import './App.css';
import {makeStyles} from '@mui/material'
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

function App() {

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string[]>([]);

  const fetchCategories = async() => {
    await axios.get('https://dummyjson.com/products/categories')
    .then(response => {
      console.log(response.data);
      setCategories([...response.data]);
    })
    .catch( e => console.log(e))
  }

  const fetchProduct = async(val: string) => {
    await axios.get(`https://dummyjson.com/products/category/${val}`)
    .then(response => {
      console.log(response.data);
      setProducts([...response.data.products]);
    })
    .catch( e => console.log(e))
  }

  const handleChangeOfcategories = (event: SelectChangeEvent<String>) => {
    setSelectedCategory(event.target.value as string);
    fetchProduct(event.target.value as string)
  };

  const handleChangeOfProduct = (event: SelectChangeEvent<typeof selectedProduct>) => {
    const {
      target: { value },
    } = event;
    setSelectedProduct(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeOfClean = () => {
    setSelectedCategory('')
    setSelectedProduct([])
  }
  useEffect( () => {
    fetchCategories()
  }, [])


  return (
    <>
      {/* <AppBar sx={{ backgroundColor: '#352929', textAlign: 'center', padding: '5px' }}>
        <Typography variant='h6'>Products Dashboard</Typography>
      </AppBar> */}
      <main>
      <Grid container >
        <Grid item xs={4} sx={{
            backgroundColor: 'lightblue',
            width: '30vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Box sx={{ backgroundColor: 'lightblue', width: '30vw', height:'80vh',borderStyle: 'solid', display: 'flex', flexDirection: 'column',  justifyContent: 'space-between',alignItems:'center', padding:"20px" }}>
            <Container sx={{ width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item  xs={6}>
                  <h1>Filter</h1>
                </Grid>
                <Grid item  xs={6}>
                  <Button variant="text" onClick={handleChangeOfClean}>clear</Button>
                </Grid>
              </Grid>
              
              <FormControl variant="standard" sx={{ m: 1, width: '80%' }}>
                <InputLabel id="demo-simple-select-standard-label">Select Category</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={selectedCategory}
                  onChange={handleChangeOfcategories}
                  input={<OutlinedInput label="Name" />}
                >
                  {categories.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>


              <FormControl variant="filled" sx={{ m: 1, width: '80%'}}>
                <InputLabel id="demo-simple-select-filled-label">Select Product</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectedProduct}
                  onChange={handleChangeOfProduct}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {products.map((name) => (
                    <MenuItem key={name.title} value={name.title}>
                      <Checkbox checked={selectedProduct.indexOf(name.title) > -1} />
                      <ListItemText primary={name.title} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Container>

            <Button sx={{  width: '80%'}} variant="contained">Run Report</Button>
          </Box>
        </Grid>
        <Grid item xs={8} sx={{ backgroundColor: 'lightcoral', width: '70vw', height:'100vh' }}>
          {/* Replace 'xs=4' with appropriate content or remove this line */}
          <h1>hi</h1>
        </Grid>
      </Grid>
      </main>
    </>
  );
}

export default App;




