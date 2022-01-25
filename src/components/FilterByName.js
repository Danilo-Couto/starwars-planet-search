import React, { useContext } from 'react';
import Context from '../hooks/Context';

export default function FilterByName() {
  const { setFilterByName } = useContext(Context);

  return (
    <div>
      Filtrar Por Nome:
      <input
        type="text"
        onChange={ (e) => setFilterByName({ name: e.target.value }) }
        placeholder="Tatoo"
        data-testid="name-filter"
      />
    </div>);
}
