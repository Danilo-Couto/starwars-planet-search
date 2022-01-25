import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './hooks/Provider';
import FilterByName from './components/FilterByName';

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
