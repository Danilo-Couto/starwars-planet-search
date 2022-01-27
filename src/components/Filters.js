import React, { useContext, useState } from 'react';
import Context from '../hooks/Context';

export default function Filters() {
  const { filterByNum,
    handleName, afterClick } = useContext(Context);

  const columnFilter = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  // requisito 4: passar para o provider como estado e toda vez que adicionar um filtro remover este filtro das colunas;

  const comparative = ['maior que', 'menor que', 'igual a'];

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');

  const saveInputState = () => {
    afterClick(column, comparison, value);
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
      <label
        htmlFor="column"
      >
        <select
          // name="column"
          data-testid="column-filter"
          id="column"
          value={ filterByNum.column }
          onChange={ (e) => setColumn(e.target.value) }
        >
          {
            columnFilter.map((dropdown) => (
              <option
                key={ dropdown }
                // value={ dropdown }
              >
                {dropdown}
              </option>))
          }
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          name="comparison"
          value={ filterByNum.comparison }
          onChange={ (e) => setComparison(e.target.value) }
          data-testid="comparison-filter"
          id="comparison"
        >
          {
            comparative.map((dropdown, index) => (
              <option
                key={ dropdown + index }
                // value={ dropdown }
              >
                {dropdown}
              </option>))
          }
        </select>
      </label>
      <input
        name="value"
        type="number"
        value={ value }
        data-testid="value-filter"
        onChange={ (e) => setValue(e.target.value) }
      />
      <button
        type="button"
        onClick={ saveInputState }
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </div>);
}
