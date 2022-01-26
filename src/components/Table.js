import React, { useContext } from 'react';
import Context from '../hooks/Context';

export default function Table() {
  const { filterResults } = useContext(Context);
  // console.log(filterResults);
  return (
    <div>
      <table className="table">
        <thead className="thead-table">
          <tr className="tr-table">
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        { <tbody className="tbody-table">
          {filterResults // aqui será results
            .map((val) => (
              <tr className="tr-tbody-table" key={ val.name }>
                <td>{val.name}</td>
                <td>{val.rotation_period}</td>
                <td>{val.orbital_period}</td>
                <td>{val.diameter}</td>
                <td>{val.climate}</td>
                <td>{val.gravity}</td>
                <td>{val.terrain}</td>
                <td>{val.surface_water}</td>
                <td>{val.population}</td>
                <td>{val.films}</td>
                <td>{val.created}</td>
                <td>{val.edited}</td>
                <td>{val.url}</td>
              </tr>
            ))}
          </tbody>}
      </table>
    </div>
  );
}

/*   function filterNumbers(planet) {
    const selected = filterByNumericValues.column;
    const comparator = filterByNumericValues.comparison;
    const valueSelected = filterByNumericValues.value;

    if (comparator === 'maior que') {
      return planet.filter((el) => Number(el[selected]) > valueSelected);
    }
    if (comparator === 'menor que') {
      return planet.filter((el) => Number(el[selected]) < valueSelected);
    }
    if (comparator === 'igual a') {
      return planet.filter((el) => Number(el[selected]) === valueSelected);
    }
  }

  const filterName = () => {
    if (filterByName.name === undefined) {
      const result = filterNumbers(planets.filter((el) => el.name !== filterByName.name));
      return result;
    }
    const result = filterNumbers(planets.filter((e) => e.name.includes((filterByName.name))));
    return result;
  }; */

