import React from 'react';
import { FormHelperText, CircularProgress, Checkbox, ListItemText, OutlinedInput, Box, Container , Grid, Button,Select, MenuItem,InputLabel, FormControl } from '@mui/material';

interface FilterProps {
    handleChangeOfClean: () => void;
    selectedCategory: string;
    handleChangeOfcategories: (event: React.ChangeEvent<{ value: unknown }>) => void;
    categories: string[];
    selectedProduct: string[];
    handleChangeOfProduct: (event: React.ChangeEvent<{ value: unknown }>) => void;
    products: { title: string }[];
    runReport: () => void;
    buttonDisabled: boolean;
    isLoading: boolean;
}

const Filter: React.FC<FilterProps> = ({
    handleChangeOfClean,
    selectedCategory,
    handleChangeOfcategories,
    categories,
    selectedProduct,
    handleChangeOfProduct,
    products,
    runReport,
    buttonDisabled,
    isLoading
}) => {


  return (
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
                onChange={ e => handleChangeOfcategories(e)}
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
                onChange={ e => handleChangeOfProduct(e)}
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
  );
};

export default Filter;