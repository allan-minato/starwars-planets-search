import React from 'react';
import './App.css';
import Order from './components/Order';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Order />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
