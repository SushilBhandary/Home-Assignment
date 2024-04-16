import React from 'react';
import { AppBar, Box, Typography, Container , Grid, Button,Select, MenuItem,InputLabel, FormControl } from '@mui/material';
import './App.css';
import {makeStyles} from '@mui/material'

function App() {

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
                  <Button variant="text">clear</Button>
                </Grid>
              </Grid>
              
              <FormControl variant="standard" sx={{ m: 1, width: '80%' }}>
                <InputLabel id="demo-simple-select-standard-label">Select Category</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>


              <FormControl variant="filled" sx={{ m: 1, width: '80%'}}>
                <InputLabel id="demo-simple-select-filled-label">Select Category</InputLabel>
                <Select 
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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