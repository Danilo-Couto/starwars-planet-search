import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Context from './Context';
import ApiFetch from '../services/ApiFetch';

function Provider({ children }) {
  const getPlanets = ApiFetch;
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function planetFetch() {
      const data = await getPlanets();
      setPlanets(data);
    }
    planetFetch();
  }, [getPlanets]);

  const [filterByName, setFilterByName] = useState({});

  const contextValue = { planets, filterByName, setFilterByName };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default Provider;
