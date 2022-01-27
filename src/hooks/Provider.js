/* eslint-disable object-curly-spacing */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Context from './Context';
import ApiFetch from '../services/ApiFetch';

/* CONT. MODELO BY GABRIEL SILVESTRE
  const COMPARISONS = {
  'maior que': (planet, search) => Number(planet) > Number(search),
  'menor que': (planet, search) => Number(planet) < Number(search),
  'igual a ': (planet, search) => Number(planet) === Number(search),
  '': () => false,
}; */

function Provider({ children }) {
  // const getPlanets = ApiFetch;
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState([]);
  const [nameFiltered, setnameFiltered] = useState(
    { nameFiltered: { name: '' } },
  );
  const [filterByNum, setFilterByNum] = useState([]);

  // API planetas
  useEffect(() => {
    async function planetFetch() {
      const data = await ApiFetch();
      setPlanets(data);
    }
    planetFetch();
  }, []);

  // console.log('search on provider:', search);

  const handleName = ({ target }) => {
    setnameFiltered({
      nameFiltered: {
        name: target.value,
      },
    });
  };

  const afterClick = (column, comparison, value) => {
    if (filterByNum.some((el) => el.column === column)) {
      return null;
    } setFilterByNum([...filterByNum, { column, comparison, value }]);
  };

  /* CONT. MODELO BY GABRIEL SILVESTRE
    const numFilter = () => planets
    .filter((planet) => filterByNum
      .every(({column, comparison, value}) => COMPARISONS[comparison](planet[column], value)));
 */
  const numFilter = (planet) => {
    const filter = ({ comparison, column, value }) => {
      if (comparison === 'maior que') {
        return Number(planet[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        // console.log({planetName: planet.name, comparison, planet: planet[column], isTrue: Number(planet[column]) < Number(value) });
        return Number(planet[column]) < Number(value);
      }
      if (comparison === 'igual a') {
        return Number(planet[column]) === Number(value);
      }
    };
    return filterByNum.every((el) => filter(el));
  };

  useEffect(() => {
    (() => {
      setSearch(() => planets.filter((e) => e.name
        .includes(nameFiltered.nameFiltered.name))
        .filter(numFilter));
    })();
  }, [nameFiltered, planets, filterByNum]);

  const contextValue = {
    planets,
    nameFiltered,
    setnameFiltered,
    filterByNum,
    setFilterByNum,
    handleName,
    afterClick,
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
