import React, { useContext } from 'react';
import context from '../context/PlanetsContext';

function Order() {
  const { planets, setPlanets, order, setOrder } = useContext(context);
  const columns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const columnSort = 'column-sort';

  return (
    <div>
      <select
        data-testid="column-sort"
        id="column-sort"
        onChange={ () => {
          const ascOuDesc = document.querySelectorAll('.order')[0].checked;
          let updateSort;
          if (ascOuDesc) {
            updateSort = 'ASC';
          } else {
            updateSort = 'DESC';
          }
          const updateColumn = document.getElementById(columnSort).value;
          setOrder({ column: updateColumn, sort: updateSort });
        } }
      >
        {
          columns.map((column) => (
            <option key={ column } value={ column }>{ column }</option>
          ))
        }
      </select>
      <input
        className="order"
        name="order"
        type="radio"
        data-testid="column-sort-input-asc"
        value="ASC"
        onChange={ () => {
          const ascOuDesc = document.querySelectorAll('.order')[0].checked;
          let updateSort;
          if (ascOuDesc) {
            updateSort = 'ASC';
          } else {
            updateSort = 'DESC';
          }
          const updateColumn = document.getElementById(columnSort).value;
          setOrder({ column: updateColumn, sort: updateSort });
        } }
        defaultChecked
      />
      <label htmlFor="ASC">Ascendente </label>
      <input
        className="order"
        name="order"
        type="radio"
        data-testid="column-sort-input-desc"
        value="DESC"
        onChange={ () => {
          const ascOuDesc = document.querySelectorAll('.order')[0].checked;
          let updateSort;
          if (ascOuDesc) {
            updateSort = 'ASC';
          } else {
            updateSort = 'DESC';
          }
          const updateColumn = document.getElementById(columnSort).value;
          setOrder({ column: updateColumn, sort: updateSort });
        } }
      />
      <label htmlFor="DESC">Descendente </label>
      <button
        data-testid="column-sort-button"
        onClick={ () => {
          const { column, sort } = order;
          const planetsToBeSorted = planets
            .filter((planet) => planet[column] !== 'unknown');
          const planetsWithUnknown = planets
            .filter((planet) => planet[column] === 'unknown');
          let sortPlanets;
          if (sort === 'ASC') {
            sortPlanets = planetsToBeSorted
              .sort((a, b) => Number(a[column]) - Number(b[column]));
          } else {
            sortPlanets = planetsToBeSorted
              .sort((a, b) => Number(b[column]) - Number(a[column]));
          }
          Array.prototype.push.apply(sortPlanets, planetsWithUnknown);
          setPlanets(sortPlanets);
        } }
      >
        Ordernar
      </button>
    </div>
  );
}

export default Order;
