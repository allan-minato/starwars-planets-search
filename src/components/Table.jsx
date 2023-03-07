import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const { planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    selectedFilter,
    setSelectedFilter,
    options,
    setOptions,
  } = useContext(PlanetsContext);

  const filteredPlanets = planets.filter((planet) => {
    const planetValue = Number(planet[selectedFilter.column]);
    const filterValue = Number(selectedFilter.value);
    if (selectedFilter.condition === 'maior que') {
      return planetValue > filterValue;
    } if (selectedFilter.condition === 'menor que') {
      return planetValue < filterValue;
    }
    return planetValue === filterValue;
  });

  const handleClick = () => {
    setPlanets(filteredPlanets);
    const usedOption = options.filter((option) => option !== selectedFilter.column);
    setSelectedFilter({
      ...selectedFilter,
      column: usedOption[0],
    });
    setOptions(usedOption);
    // console.log(usedOption[0]);
    const objeto = {
      nome: 'allan',
    };
    const objeto2 = {
      sobrenome: 'minato',
    };
    console.log(objeto);
    console.log(objeto2);
    const novoObjeto = {
      ...objeto,
      ...objeto2,
      nome: 'Pedro',
    };
    console.log(novoObjeto);
  };

  return (
    <section>
      <div>
        <input
          type="text"
          id="filterInput"
          placeholder="Pesquisar"
          data-testid="name-filter"
          onChange={ ({ target }) => setNameFilter(target.value) }
        />
        <select
          data-testid="column-filter"
          value={ selectedFilter.column }
          onChange={
            (e) => setSelectedFilter({ ...selectedFilter, column: e.target.value })
          }
        >
          {options.map((option) => (
            <option key={ option } value={ option }>
              {option}
            </option>))}
        </select>
        <select
          data-testid="comparison-filter"
          value={ selectedFilter.condition }
          onChange={
            (e) => setSelectedFilter({ ...selectedFilter, condition: e.target.value })
          }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          value={ selectedFilter.value }
          onChange={
            (e) => setSelectedFilter({ ...selectedFilter, value: e.target.value })
          }
        />
        <button
          data-testid="button-filter"
          onClick={ () => handleClick() }
        >
          FILTRAR
        </button>
      </div>
      <table>
        {/* {console.log(selectedFilter.column)}
        {console.log(selectedFilter.condition)}
        {console.log(selectedFilter.value)} */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planets.filter((searchPlanet) => searchPlanet
            .name.includes(nameFilter.toLowerCase()))
            .map((planet) => (
              <tr
                key={ planet.name }
              >
                <td>
                  { planet.name }
                </td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>
                  {planet.films.map((url, index) => (
                    <span key={ index }>
                      <a href={ url }>{ url }</a>
                    </span>
                  ))}
                </td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>
                  <a href={ planet.url }>{ planet.url }</a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
