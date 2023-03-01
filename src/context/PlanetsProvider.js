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
  }), [planets, nameFilter, selectedFilter]);

  return (
    <PlanetsContext.Provider value={ value }>
      <span>{ children }</span>
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;
