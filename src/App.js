import React from 'react';
import './App.css';
import Table from './components/Table';
import FilterByName from './components/FilterByName';
import Provider from './hooks/Provider';

function App() {
  return (
    <div>
      <Provider>
        <FilterByName />
        <Table />
      </Provider>
    </div>
  );
}

export default App;
