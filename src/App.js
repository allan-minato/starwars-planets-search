import React from 'react';
import './App.css';
import Order from './components/Order';
import Table from './components/Table';
import StarProvider from './context/PlanetsProvider';

function App() {
  return (
    <StarProvider>
      <Order />
      <Table />
    </StarProvider>
  );
}

export default App;
