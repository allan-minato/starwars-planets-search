import React from 'react';
import './App.css';
import Table from './components/Table';
import StarProvider from './context/PlanetsProvider';

function App() {
  return (
    <StarProvider>

      <Table />
    </StarProvider>
  );
}

export default App;
