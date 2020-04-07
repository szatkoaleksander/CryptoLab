import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutOverlay = ({ data }) => {
  const [newData, setNewData] = useState({});

  useEffect(() => {
    const preparedData = {
      labels: data.map(item => {
        return item.currency;
      }),
      datasets: [
        {
          data: data.map(item => {
            return item.amountOfMoney;
          }),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
    setNewData(preparedData);
  }, [data]);

  return <Doughnut data={newData} />;
};

export default DoughnutOverlay;
