import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './hooks/Provider';

function App() {
  return (
    <div>
      <Provider>
        <Table />
      </Provider>
    </div>
  );
}

export default App;
