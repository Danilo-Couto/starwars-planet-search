import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Context from './Context';
import ApiFetch from '../services/ApiFetch';

function Provider({ children }) {
  const getPlanets = ApiFetch;
  const [planets, setPlanets] = useState([]);
  const [bkpPlanets, setBackupPlanets] = useState([]);

  const [filterByName, setFilterByName] = useState({});
  const [filterByNumericValues, setFilterByNumericValues] = useState([{
    column: 'population',
    comparison: 'maior que',
    value: '0',
  }]);
  const [filterResults, setFilterResults] = useState([]);
  const [finalFilter, setFinalFilter] = useState([]);

  useEffect(() => {
    async function planetFetch() {
      const data = await getPlanets();
      setPlanets(data);
      setBackupPlanets(data);
    }
    planetFetch();
  }, [getPlanets]);

  useEffect(() => {
    function filterName() {
      if (filterByName.name === undefined) {
        setFilterResults(planets.filter((el) => el.name !== filterByName.name));
      } else if (filterByName.name !== '') {
        setFilterResults(bkpPlanets.filter((e) => e.name.includes((filterByName.name))));
      }
    }
    filterName();
  }, [filterByName, planets]);

/*   const filterNumbers = () => {
    const { column, comparison, value } = filterByNumericValues;
    console.log(filterByNumericValues);

    const filter = filterResults.filter((el) => {
      if (comparison === 'maior que') {
        return Number(el[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(el[column]) < Number(value);
      }
      return Number(el[column]) === Number(value);
    });
    console.log(filter);
    setFilterResults(filter);
  };
 */
  const contextValue = {
    planets,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    filterResults,
    setFinalFilter };

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
