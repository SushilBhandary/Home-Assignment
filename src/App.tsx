import  { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import Header from './components/Header';
import Filter from './components/Filter'
import Chart from './components/Chart'

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
      <Header />
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
          <Filter 
            handleChangeOfClean={handleChangeOfClean}
            selectedCategory={selectedCategory}
            handleChangeOfcategories ={handleChangeOfcategories}
            categories={categories}
            selectedProduct={selectedProduct}
            handleChangeOfProduct={handleChangeOfProduct}
            products={products}
            runReport={runReport}
            buttonDisabled={buttonDisabled}
            isLoading= {isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={8} sx={{  width: '70vw', height:{ xs: '70vh', sm: '100vh' } ,display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
          <Chart 
            chart={chart}
          />
        </Grid>
      </Grid>
      </main>
    </>
  );
}

export default App;




