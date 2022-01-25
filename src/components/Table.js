import React, { useContext } from 'react';
import Context from '../hooks/Context';

export default function Table() {
  const { planets, filterByName } = useContext(Context);

  function filterName() {
    return (filterByName.name === undefined)
      ? planets.filter((el) => el.name !== filterByName.name)
      : planets.filter((e) => e.name.includes((filterByName.name)));
  }

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
        <tbody className="tbody-table">
          {filterName()
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
        </tbody>
      </table>
    </div>
  );
}
