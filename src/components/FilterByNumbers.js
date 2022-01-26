import React, { useContext } from 'react';
import Context from '../hooks/Context';

export default function FilterByNumber() {
  const { filterByNumericValues, setFilterByNumericValues, filterByName, filterNumbers } = useContext(Context);

  const columnFilter = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const comparative = ['maior que', 'menor que', 'igual a'];

  return (
    <div>
      <label htmlFor="column-filter">
        <select
          name="column-filter"
          value={ filterByNumericValues.column }
          onChange={ (e) => setFilterByNumericValues({
            ...filterByNumericValues,
            column: e.target.value }) }
          data-testid="column-filter"
        >
          {
            columnFilter.map((dropdown, index) => (
              <option
                key={ dropdown + index }
                value={ dropdown }
              >
                {dropdown}
              </option>))
          }
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          name="comparison"
          value={ filterByNumericValues.comparison }
          onChange={ (e) => setFilterByNumericValues([{
            ...filterByNumericValues,
            comparison: e.target.value }]) }
          data-testid="comparison-filter"
          id="comparison-filter"
        >
          {
            comparative.map((dropdown, index) => (
              <option
                key={ dropdown + index }
                value={ dropdown }
                data-testid="column-filter"
              >
                {dropdown}
              </option>))
          }
        </select>
      </label>
      <input
        name="value-filter"
        type="number"
        data-testid="value-filter"
        value={ (filterByNumericValues.value) }
        onChange={ (e) => setFilterByNumericValues([{
          ...filterByNumericValues,
          value: e.target.value }]) }
      />
      <button
        type="button"
        onClick={ () => {
          filterNumbers(
            filterByName.name,
            filterByNumericValues.column, filterByNumericValues.comparison, filterByNumericValues.value,
          );
        } }
      >
        Filtrar
      </button>
    </div>);
}

/*   function filterNumbers(...obj) {
    const { column, comparison, valueSelected } = filterByNumericValues;
    console.log(obj);
    console.log(filterByNumericValues);

    if (comparison === 'maior que') {
      setFilterResults(filterResults
        .filter((el) => Number(el[column]) > valueSelected));
    }
    if (comparison === 'menor que') {
      setFilterResults(filterResults
        .filter((el) => Number(el[column]) < valueSelected));
    }
    if (comparison === 'igual a') {
      setFilterResults(filterResults
        .filter((el) => Number(el[column]) === valueSelected));
    }
  } */
