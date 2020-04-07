import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { getToken } from '../../services/jwt.service';
import Table from '../../components/Table/Table';

const columns = [
  {
    Header: 'Operation type',
    accessor: 'operationType',
  },
  {
    Header: 'Currency',
    accessor: 'currency',
  },
  {
    Header: 'Amount of money',
    accessor: 'amountOfMoney',
  },
  {
    Header: 'Price',
    accessor: 'price',
  },
  {
    Header: 'Sum',
    accessor: 'sum',
  },
  {
    Header: 'Exchange time',
    accessor: 'exchangeTime',
  },
];

const History = () => {
  const [history, setHistory] = useState([]);

  const fetchHisotry = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/histories/userhistories`, {
        headers: {
          Authorization: 'Bearer ' + getToken(),
        },
      });

      await response.data.map(item => {
        if (item.operationType === 0) item.operationType = 'BUY';
        else item.operationType = 'SELL';
        item.exchangeTime = moment(item.exchangeTime).format('DD-MM-YYYY HH:MM:SS');
      });

      setHistory(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchHisotry();
  }, []);

  return (
    <section className="section p-t-md">
      <div className="container box">
        <div className="columns">
          <div className="column is-12 ">
            <Table columns={columns} data={history} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
