import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [selectedFilter, setSelectedFilter] = useState({
    column: 'population',
    condition: 'maior que',
    value: '0',
  });
  const [usedColumns, setUsedColumns] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        if (!response.ok) {
          const data = await response.json();
          throw data.message;
        }
        const data = await response.json();
        const { results } = data;
        setPlanets(results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  const value = useMemo(() => ({
    planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    selectedFilter,
    setSelectedFilter,
    usedColumns,
    setUsedColumns,
  }), [planets, nameFilter, selectedFilter, usedColumns]);

  return (
    <PlanetsContext.Provider value={ value }>
      <span>{ children }</span>
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
