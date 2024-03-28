import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddTrade.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const AddTrade = () => {
  
 
    useEffect(() => {
      const intervalId = setInterval(() => {
        const currentDateTime = new Date();
        const formattedDate = formatDate(currentDateTime);
        const formattedTime = formatTime(currentDateTime);
      
        console.log("Today's Date:", formattedDate);
        console.log("Current Time:", formattedTime);
      }, 1000); // Update every second

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect runs only once

    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    };

    const formatTime = (date) => {
      const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
      return date.toLocaleTimeString(undefined, options);
    };

    // Variables to store the current date and time
    let currentDate = formatDate(new Date());
    let currentTime = formatTime(new Date());

    // Return null as we are not rendering any UI

  
    const Navigate = useNavigate();
    const tradeId = useParams();
    console.log(tradeId.id);
    const [tradeData, setTradeData] = useState({
      tradeDateTime: currentTime + ' ' + currentDate,
      stockName: '',
      listingPrice: '',
      quantity: '',
      type: '',
      pricePerUnit: ''
    });
  

    const handleChange = (e) => {
      const { name, value } = e.target;
      setTradeData({ ...tradeData, [name]: value });
    };
    
    const handleSubmit =async () => {
      
       Navigate("/");
      try {
      await axios.post("http://localhost:8080/api/trades",tradeData);
      Navigate("/"); // Redirect to home page after successful submission
    } catch (error) {
      console.error("Error submitting trade:", error);
    }
      setTradeData({
        tradeDateTime: '',
        stockName: '',
        listingPrice: '',
        quantity: '',
        type: '',
        pricePerUnit: ''
      })
    }
   
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Replace 'your-api-endpoint' with the actual API endpoint
          const response = await axios.get('http://localhost:8080/api/trades/' + tradeId.id)
          const data = response.data; // Use response.data instead of response.json()
          console.log(data);
          setTradeData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData(); // Call the async function
    }, []);

    return (
      <div className="container">
        <h2>Add Trade</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date Time:</label>
            <input type="text" name="tradeDateTime" value={tradeData.tradeDateTime} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Stock Name:</label>
            <input type="text" name="stockName" value={tradeData.stockName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Listing Price:</label>
            <input type="text" name="listingPrice" value={tradeData.listingPrice} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Quantity:</label>
            <input type="text" name="quantity" value={tradeData.quantity} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <input type="text" name="type" value={tradeData.type} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Price Per Unit:</label>
            <input type="text" name="pricePerUnit" value={tradeData.pricePerUnit} onChange={handleChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

export default AddTrade;
