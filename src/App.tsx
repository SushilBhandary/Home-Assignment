import  { useEffect, useState } from 'react';
import { AppBar, FormHelperText, CircularProgress, Checkbox, ListItemText, OutlinedInput, Box, Typography, Container , Grid, Button,Select, MenuItem,InputLabel, FormControl } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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

interface ChartConfig {
  chart: { type: string };
  title: { text: string };
  xAxis: { categories: string[] };
  yAxis: { title: { text: string } };
  series: { name: string; data: number[] }[];
}

const chartOptions = {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'categories'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      }
    }
  },
  series: [{
    name: 'Products',
    colorByPoint: true,
    data: [
      { name: 'smartphones', y: 1 },
      { name: 'laptops', y: 1 },
      { name: 'fragrances', y: 1 },
      { name: 'skincare', y: 1 },
      { name: 'groceries', y: 1 },
      { name: 'home-decoration', y: 1 },
      { name: 'furniture', y: 1 },
      { name: 'womens-dresses', y: 1 },
      { name: 'womens-shoes', y: 1 },
      { name: 'mens-shoes', y: 1 },
      { name: 'mens-watches', y: 1 },
      { name: 'womens-watches', y: 1 },
      { name: 'womens-bags', y: 1 },
      { name: 'womens-jewellery', y: 1 },
      { name: 'sunglasses', y: 1 },
      { name: 'automotive', y: 1 },
      { name: 'motorcycle', y: 1 },
      { name: 'lighting', y: 1 },
    ]
  }]
};

const columnChart = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Products in selected Category'
  },
  xAxis: {
    categories: [] as string[]
  },
  yAxis: {
    title: {
        text: ''
    }
  },
  series: [{
    name: 'Price',
    data: []  as number[]
  }]
}


function App() {

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string[]>([]);
  const [ chart, setChart ] = useState<any>(chartOptions)
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

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
    setSelectedProduct([])
    fetchProduct(event.target.value as string)
    setButtonDisabled(false)
  };

  const handleChangeOfProduct = (event: SelectChangeEvent<typeof selectedProduct>) => {
    const {
      target: { value },
    } = event;
    setSelectedProduct(
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(selectedProduct)
    setButtonDisabled(false)
    
  };

  const handleChangeOfClean = () => {
    setSelectedCategory('')
    setProducts([])
    setSelectedProduct([])
    setChart(chartOptions)
    setButtonDisabled(true)
  }

  const runReport = () => {
    setIsLoading(true); // Start loading
    setButtonDisabled(true)
    setTimeout(() => {
      // Your existing logic here
      setIsLoading(false); // Stop loading after 3 seconds
    }, 3000);
    const data: number[] = []
    if (selectedProduct.length === 0) {
      const pro: string[] = []
      products.forEach( cat => {
        data.push(cat.price)
        pro.push(cat.title)
      })
      columnChart.xAxis.categories = pro
    } else {
      selectedProduct.forEach( val => {
        products.forEach( cat => {
          if( val == cat.title) {
            data.push(cat.price)
          }
        })
      })
      columnChart.xAxis.categories = selectedProduct
    }
    columnChart.series[0].data = data
    columnChart.yAxis.title.text = selectedCategory

    console.log(columnChart)
    setChart({...columnChart})
  }

  useEffect( () => {
    fetchCategories()
  }, [])


  return (
    <>
      <AppBar sx={{ backgroundColor: '#352929', textAlign: 'center', padding: '5px' }}>
        <Typography variant='h6'>Products Dashboard</Typography>
      </AppBar>
      <main>
      <Grid container >
        <Grid item xs={12} sm={4} sx={{
            width: '30vw',
            height: { xs: '70vh', sm: '100vh' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop:{xs: '60px', sm: '20px'},
          }}>
          <Box sx={{    width: '80%', height:'80%',borderStyle: 'solid', display: 'flex', flexDirection: 'column',  justifyContent: 'space-between',alignItems:'center', padding:"20px" }}>
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
                  id="demo-simple-select-disabled"
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
                  {!selectedCategory && <FormHelperText>Disabled</FormHelperText>}
                </Select>
              </FormControl>
            </Container>

            <Button sx={{ width: '80%' }} variant="contained" onClick={runReport} disabled={isLoading || buttonDisabled}>
              {isLoading ? <CircularProgress size={24} /> : "Run Report"}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} sx={{  width: '70vw', height:{ xs: '70vh', sm: '100vh' } ,display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
          <Container sx={{ height:'100%', padding:"20px",display: 'flex', alignItems: 'center' }}>
            <HighchartsReact highcharts={Highcharts} options={chart}  />
          </Container>
        </Grid>
      </Grid>
      </main>
    </>
  );
}

export default App;




