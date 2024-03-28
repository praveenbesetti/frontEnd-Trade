import React, { useState, useEffect } from 'react';
import TradeService from '../services/tradeService';
import './tread.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddTrade from './AddTrade';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const TradeDetails = () => {
  const Navigate = useNavigate();
  const [trades, setTrades] = useState([]);
 
  const tradeId = useParams();
  useEffect(() => {
    fetchOrderById();
   
  }, []);

  

  const fetchOrderById = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders");
      const order = response.data;
      setTrades(order);
      
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

 

  return (
    <div>
      <h2 style={{ textAlign: 'center', backgroundColor: 'blue', color: 'white', padding: '10px' }}>Order Trade</h2>
      <Link to="/">
        <button className='trade'>Back</button>
      </Link>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
          <thead>
            <tr>
             
              <th>Stock Id</th>
              <th>Quantity</th>
              <th>Type</th>
              <th>Price Per Unit</th>
              <th>Status</th>
              
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd', textAlign: 'center' }}>
               
                <td>{trade.id}</td>
               
                <td>{trade.quantity}</td>
                <td>{trade.type}</td>
                <td>{trade.pricePerUnit}</td>
                
                <td style={{color:'green'}}>
                 Confirmed order<img src="tick.png" style={{width:'20px',height:'20px'}}/>
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
