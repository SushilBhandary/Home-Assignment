import React from 'react';
import { AppBar, Box, Typography } from '@mui/material';
import './App.css';

function App() {

  return (
    <>
      <AppBar sx={{ backgroundColor: '#352929', textAlign: 'center', padding: '5px' }}>
        <Typography variant='h6'>Products Dashboard</Typography>
      </AppBar>
      <main>
        <Box sx={{ display: 'flex', height: '100vh' }}> 
          <Box sx={{ backgroundColor: 'lightblue', width: '30vw' }}>
            <Box sx={{  }}>
              
            </Box>
          </Box>
          <Box sx={{ backgroundColor: 'lightcoral', width: '70vw' }}>
            <h1>Right Side</h1>
          </Box>
        </Box>
      </main>
    </>
  );
}

export default App;