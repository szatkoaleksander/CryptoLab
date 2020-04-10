import React from 'react';
import { Line } from 'react-chartjs-2';

const LineOverlay = ({ data }) => {
  return (
    <Line data={data} height={400} width={500} options={{ responsive: false, maintainAspectRatio: false }} />
  );
};

export default LineOverlay;
