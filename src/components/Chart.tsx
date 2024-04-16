import React from 'react';
import { Container } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ChartProps {
  chart: Highcharts.Options; 
}

const Chart: React.FC<ChartProps> = ({
  chart
}) => {
  return (
    <Container sx={{ height:'100%', padding:"20px",display: 'flex', alignItems: 'center' }}>
      <HighchartsReact highcharts={Highcharts} options={chart}  />
    </Container>
  );
};

export default Chart;