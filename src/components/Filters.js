import React, { useContext, useState } from 'react';
import Context from '../hooks/Context';

export default function Filters() {
  const { filterByNum,
    handleName, globalFilter } = useContext(Context);

  const columnFilter = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const comparative = ['maior que', 'menor que', 'igual a'];

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');

  const saveInputState = () => {
    globalFilter(column, comparison, value);
  };

  return (
    <div>
      <div>
        Filtrar Por Nome:
        <input
          type="text"
          placeholder="Tatoo"
          data-testid="name-filter"
          onChange={ handleName }
        />
      </div>
      <label htmlFor="column-filter">
        <select
          name="column-filter"
          value={ filterByNum.column }
          onChange={ (e) => setColumn(e.target.value) }
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
          value={ filterByNum.comparison }
          onChange={ (e) => setComparison(e.target.value) }
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
        onChange={ (e) => setValue(e.target.value) }
      />
      <button
        type="button"
        onClick={ saveInputState }
      >
        Filtrar
      </button>
    </div>);
}
