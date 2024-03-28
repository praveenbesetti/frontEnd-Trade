import React, { useState, useEffect } from 'react';
import TradeService from '../services/tradeService';
import './tread.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
const TradeDetails = () => {

  const Navigate = useNavigate();
  const [trades, setTrades] = useState([]);
  

  const editTrade = (trade) => {
  // Assuming trade is nested, adjust accordingly if necessary
 Navigate(`/AddTrade/${trade}`);
};

 const fetchOrderById = async (id) => {
  try {
   
    const response = await axios.get(`http://localhost:8080/api/orders/${id}`);
     await axios.put(`http://localhost:8080/api/orders/${id}`);

    console.log(response.data);
     
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};


    
  

  const deleteTrade = async (trade) => {
  try {
    console.log(trade.id);
    // Replace 'your-api-endpoint' with the actual API endpoint
    await axios.delete(`http://localhost:8080/api/trades/${trade.id}`);
    console.log('Trade deleted successfully');
  } catch (error) {
    console.error("Error deleting trade:", error);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'your-api-endpoint' with the actual API endpoint
        const response = await axios.get("http://localhost:8080/api/trades");
        const data = response.data; // Use response.data instead of response.json()
        // console.log(data);
        setTrades(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetch = async () => {
      try {
    
        //console.log(order[0].status);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
  
    fetchData(); fetch(); // Call the async function
  }, [deleteTrade]);
  return (
    <div>
      <h2 style={{ textAlign: 'center', backgroundColor: 'blue', color: 'white', padding: '10px' }}>Trade Details</h2>
      <Link to="AddTrade">  <button className='trade'>Add Trade</button></Link>
      <Link to="/order">  <button   className='trade'>Order</button></Link>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
          <thead>
            <tr>
              <th>Date Time</th>
              <th>Stock Name</th>
              <th>Listing Price</th>
              <th>Quantity</th>
              <th>Type</th>
              <th>Price Per Unit</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
           
          </thead>
          
          <tbody>
            {trades.map((trade, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                <td>{trade.tradeDateTime}</td>
                <td>{trade.stockName}</td>
                <td>{trade.listingPrice}</td>
                <td>{trade.quantity}</td>
                <td>{trade.type}</td>
                <td>{trade.pricePerUnit}</td>
                 <td>{trade.status} </td>
                <td>
                   <button  onClick={() => fetchOrderById(trade.id)}className='btn'style={{background:'blue'}} id="del">Order</button>
                  <button style={{ marginRight: '5px' }} onClick={() => editTrade(trade.id)}className='btn'>Edit</button>
                        <button  onClick={() => deleteTrade(trade)}className='btn' id="del">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeDetails;
