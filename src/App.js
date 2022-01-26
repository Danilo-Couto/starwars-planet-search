import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './hooks/Provider';
import FilterByName from './components/FilterByName';
import FilterByNumber from './components/FilterByNumbers';

function App() {
  return (
    <div>
      <Provider>
        <FilterByName />
        <FilterByNumber />
        <Table />
      </Provider>
    </div>
  );
}

export default App;
