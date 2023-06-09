import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planetsClean, setPlanetsClean] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [selectedFilter, setSelectedFilter] = useState({
    column: 'population',
    condition: 'maior que',
    value: '0',
  });
  const [usedColumns, setUsedColumns] = useState([]);

  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [appliedFilters, setAppliedFilters] = useState([]);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const { results } = data;
      setPlanets(results);
      setPlanetsClean(results);
    };
    fetchAPI();
  }, []);

  const value = useMemo(() => ({
    order,
    setOrder,
    planetsClean,
    setPlanetsClean,
    planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    selectedFilter,
    setSelectedFilter,
    usedColumns,
    setUsedColumns,
    options,
    setOptions,
    appliedFilters,
    setAppliedFilters,
  }), [planets, nameFilter, selectedFilter, usedColumns, options, appliedFilters,
    planetsClean, order]);

  return (
    <PlanetsContext.Provider value={ value }>
      <span>{ children }</span>
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
