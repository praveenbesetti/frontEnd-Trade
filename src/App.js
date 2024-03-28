import React from 'react';
import TradeDetails from './components/TradeDetails';
import AddTrade from './components/AddTrade';
import Order from './components/order';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TradeDetails/>} />
        <Route path="/AddTrade/:id" element={<AddTrade />} /> 
         <Route path="/AddTrade/" element={<AddTrade/>} /> 
        <Route path="/order/:id" element={<Order />}/>
        <Route path="/order" element={<Order/>}/>
      </Routes>
    </div>
  );
}

export default App;
