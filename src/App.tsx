import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [account, setAccount] = useState<undefined>(undefined)
  return (
    <div className="container">
      <h1>Hello, World!</h1>
      <p>Your account: {account}</p>
  </div>
  );
}

export default App;
