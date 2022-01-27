import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Context from './Context';
import ApiFetch from '../services/ApiFetch';

const initialInput = {
  filterByName: {
    name: '',
  },
};

const initialSelect = {
  filterByNumericValues:
    {
      column: 'population',
      comparison: 'maior que',
      value: '0',
    },
};

function Provider({ children }) {
  const getPlanets = ApiFetch;
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState([]);
  const [filterByName, setFilterByName] = useState(initialInput);
  const [filterByNum, setFilterByNum] = useState(initialSelect);

  useEffect(() => {
    async function planetFetch() {
      const data = await getPlanets();
      setPlanets(data);
    }
    planetFetch();
  }, [getPlanets]);

  useEffect(() => {
    (() => {
      setSearch(() => planets.filter((e) => e.name
        .includes(filterByName.filterByName.name)));
    })();
  }, [filterByName, planets]);

  const handleName = ({ target }) => {
    setFilterByName({
      filterByName: {
        name: target.value,
      },
    });
  };

  // console.log(filterByNum);

  const globalFilter = (...obj) => {
    const [column, comparison, value] = obj;
    // console.log(column, comparison, value);
    setFilterByNum({
      filterByNumericValues: { column, comparison, value },
    });
  };

  // console.log(filterByNum);

  const finalResult = () => {
    const { column, comparison, value } = filterByNum.filterByNumericValues;
    const filter = search.filter((el) => {
      if (comparison === 'maior que') {
        return el[column] > Number(value);
      }
      if (comparison === 'menor que') {
        return el[column] < Number(value);
      }
      return el[column] === Number(value);
    });
    setSearch(filter);
    // console.log('filter', filter);
  };

  useEffect(() => {
    finalResult();
  }, [filterByNum]);

  const contextValue = {
    planets,
    filterByName,
    setFilterByName,
    filterByNum,
    setFilterByNum,
    handleName,
    globalFilter,
    search,
  };

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
