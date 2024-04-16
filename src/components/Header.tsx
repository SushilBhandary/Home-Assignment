import React from 'react';
import { AppBar, Typography} from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar sx={{ backgroundColor: '#352929', textAlign: 'center', padding: '5px' }}>
        <Typography variant='h6'>Products Dashboard</Typography>
    </AppBar>
  );
};

export default Header;