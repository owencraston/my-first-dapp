import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './screens/Home';
import SendTransaction from './screens/SendTransaction';

function App() {
  return (
    <div className="container">
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="send/:account/:balance" element={<SendTransaction />} />
      </Routes>
    </div>
  );
}

export default App;
