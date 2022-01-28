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
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState([]);
  const [nameFiltered, setnameFiltered] = useState(
    { nameFiltered: { name: '' } },
  );
  const [filterByNum, setFilterByNum] = useState([]);

  const [columnFilter, setColumnFilter] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  // requisito 4: passar para o provider como estado e toda vez que adicionar um filtro remover este filtro das colunas;

  // API planetas
  useEffect(() => {
    async function planetFetch() {
      const data = await ApiFetch();
      setPlanets(data);
    }
    planetFetch();
  }, []);

  const handleName = ({ target }) => {
    setnameFiltered({
      nameFiltered: {
        name: target.value,
      },
    });
  };

  const afterClick = (column, comparison, value) => {
    if (filterByNum.some((dropdown) => dropdown.column === column)) {
      return null;
    }
    setFilterByNum([...filterByNum, { column, comparison, value }]);
    setColumnFilter(columnFilter.filter((el) => el !== column));
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
      setSearch(() => planets.filter((planet) => planet.name
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
    columnFilter,
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

// ajuda do Paulo Sordi;
