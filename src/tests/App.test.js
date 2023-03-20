import mockData from './mockData';
import App from '../App';
import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import useEvent from '@testing-library/user-event';

const timeout = (time) => {
  return new Promise(resolve => {
      setTimeout(resolve, time);
  });
}
jest.setTimeout(20000);

  describe('App test', () => {
    beforeEach(async () => {
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockData),
      }));
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('Testa se os elementos estão na tela', async () => {
      act(() => {
        render(<App />);
      });
      expect(await screen.getByText(/ascendente/i)).toBeInTheDocument
      expect(await screen.getByText(/descendente/i)).toBeInTheDocument
      expect(await screen.getByRole('button', {
        name: /ordernar/i
      })).toBeInTheDocument
      expect(await screen.getByTestId('name-filter')).toBeInTheDocument
      expect(await screen.getByTestId('button-filter')).toBeInTheDocument
      expect(await screen.getByTestId('button-remove-filters')).toBeInTheDocument
      expect(await screen.getByTestId('column-filter')).toBeInTheDocument
      expect(await screen.getByTestId('comparison-filter')).toBeInTheDocument
    });
    it('Teste componente Table', async () => {
        act(() => {
            render(<App />);
          });
    await timeout(4000);
    expect(await screen.getByRole('table')).toBeInTheDocument;
    expect(await screen.getAllByText('population')).toBeInTheDocument;
    expect(await screen.getAllByText('orbital_period')).toBeInTheDocument;
    expect(await screen.getAllByText('diameter')).toBeInTheDocument;
    expect(await screen.getAllByText('rotation_period')).toBeInTheDocument;
    expect(await screen.getAllByText('surface_water')).toBeInTheDocument;

    expect(await screen.getByText('Name')).toBeInTheDocument;
    expect(await screen.getByText('Climate')).toBeInTheDocument;
    expect(await screen.getByText('Gravity')).toBeInTheDocument;
    expect(await screen.getByText('Terrain')).toBeInTheDocument;
    expect(await screen.getByText('Films')).toBeInTheDocument;
    expect(await screen.getByText('Created')).toBeInTheDocument;
    expect(await screen.getByText('Edited')).toBeInTheDocument;
    expect(await screen.getByText('URL')).toBeInTheDocument;

    const allRow = await screen.findAllByRole('row');
    expect(allRow.length).toBe(11);

    
    })
    it('Teste de filtro por nome', async () => {
      act(() => {
        render(<App />);
      });
      await timeout(4000);
  
      const inputName = await screen.findByTestId('name-filter');
      const buttonFilter = await screen.findByTestId('button-filter');
  
      useEvent.type(inputName, 'Tatooine');
      useEvent.click(buttonFilter);
  
      expect(await screen.getByRole('table')).toBeInTheDocument;
  
      await screen.findByRole('columnheader', { name: /name/i });
      await screen.findByRole('columnheader', { name: /rotation period/i });
      await screen.findByRole('columnheader', { name: /orbital period/i });
      await screen.findByRole('columnheader', { name: /diameter/i });
      await screen.findByRole('columnheader', { name: /climate/i });
      await screen.findByRole('columnheader', { name: /gravity/i });
      await screen.findByRole('columnheader', { name: /terrain/i });
      await screen.findByRole('columnheader', { name: /surface water/i });
      await screen.findByRole('columnheader', { name: /population/i });
      await screen.findByRole('columnheader', { name: /films/i });
      await screen.findByRole('columnheader', { name: /created/i });
      await screen.findByRole('columnheader', { name: /edited/i });
      await screen.findByRole('columnheader', { name: /url/i });
  
      const allRow = await screen.findAllByRole('row');
      expect(allRow.length).toBe(1);
    })
    it('Teste do filtro por numero', async () => {
      act(() => {
        render(<App />);
      })
  
      const inputNumber = await screen.findByTestId('value-filter');
      const selectColumn = await screen.findByTestId('column-filter');
      const selectComparison = await screen.findByTestId('comparison-filter');
      const buttonFilter = await screen.findByTestId('button-filter');
  
      useEvent.type(inputNumber, '2000');
      useEvent.selectOptions(selectColumn, 'population');
      useEvent.selectOptions(selectComparison, 'maior que');
      useEvent.click(buttonFilter);
  
      expect(await screen.getByRole('table')).toBeInTheDocument;
  
      await screen.findByRole('columnheader', { name: /name/i });
      await screen.findByRole('columnheader', { name: /rotation period/i });
      await screen.findByRole('columnheader', { name: /orbital period/i });
      await screen.findByRole('columnheader', { name: /diameter/i });
      await screen.findByRole('columnheader', { name: /climate/i });
      await screen.findByRole('columnheader', { name: /gravity/i });
      await screen.findByRole('columnheader', { name: /terrain/i });
      await screen.findByRole('columnheader', { name: /surface water/i });
      await screen.findByRole('columnheader', { name: /population/i });
      await screen.findByRole('columnheader', { name: /films/i });
      await screen.findByRole('columnheader', { name: /created/i });
      await screen.findByRole('columnheader', { name: /edited/i });
      await screen.findByRole('columnheader', { name: /url/i });
  
      const allRow = await screen.findAllByRole('row');
      expect(allRow.length).toBe(8);
    });
    it('Teste do filtro de nome e numero', async () => {
      act(() => {
        render(<App />);
      })
  
      const inputName = await screen.findByTestId('name-filter');
      const inputNumber = await screen.findByTestId('value-filter');
      const selectColumn = await screen.findByTestId('column-filter');
      const selectComparison = await screen.findByTestId('comparison-filter');
      const buttonFilter = await screen.findByTestId('button-filter');
  
      useEvent.type(inputName, 'Tatooine');
      useEvent.type(inputNumber, '2000');
      useEvent.selectOptions(selectColumn, 'population');
      useEvent.selectOptions(selectComparison, 'maior que');
      useEvent.click(buttonFilter);
     
      expect(await screen.getByRole('table')).toBeInTheDocument;
  
      await screen.findByRole('columnheader', { name: /name/i });
      await screen.findByRole('columnheader', { name: /rotation period/i });
      await screen.findByRole('columnheader', { name: /orbital period/i });
      await screen.findByRole('columnheader', { name: /diameter/i });
      await screen.findByRole('columnheader', { name: /climate/i });
      await screen.findByRole('columnheader', { name: /gravity/i });
      await screen.findByRole('columnheader', { name: /terrain/i });
      await screen.findByRole('columnheader', { name: /surface water/i });
      await screen.findByRole('columnheader', { name: /population/i });
      await screen.findByRole('columnheader', { name: /films/i });
      await screen.findByRole('columnheader', { name: /created/i });
      await screen.findByRole('columnheader', { name: /edited/i });
      await screen.findByRole('columnheader', { name: /url/i });
  
      const allRow = await screen.findAllByRole('row');
      expect(allRow.length).toBe(1);
    });

    it('Teste de comparação menor que', async () => {
      act(() => {
        render(<App />)
      })
  
      const inputNumber = await screen.findByTestId('value-filter');
      const selectColumn = await screen.findByTestId('column-filter');
      const selectComparison = await screen.findByTestId('comparison-filter');
      const buttonFilter = await screen.findByTestId('button-filter');
  
      useEvent.type(inputNumber, '2000');
      useEvent.selectOptions(selectColumn, 'population');
      useEvent.selectOptions(selectComparison, 'menor que');
      useEvent.click(buttonFilter);
  
      expect(await screen.getByRole('table')).toBeInTheDocument;
  
      await screen.findByRole('columnheader', { name: /name/i });
      await screen.findByRole('columnheader', { name: /rotation period/i });
      await screen.findByRole('columnheader', { name: /orbital period/i });
      await screen.findByRole('columnheader', { name: /diameter/i });
      await screen.findByRole('columnheader', { name: /climate/i });
      await screen.findByRole('columnheader', { name: /gravity/i });
      await screen.findByRole('columnheader', { name: /terrain/i });
      await screen.findByRole('columnheader', { name: /surface water/i });
      await screen.findByRole('columnheader', { name: /population/i });
      await screen.findByRole('columnheader', { name: /films/i });
      await screen.findByRole('columnheader', { name: /created/i });
      await screen.findByRole('columnheader', { name: /edited/i });
      await screen.findByRole('columnheader', { name: /url/i });
  
      const allRow = await screen.findAllByRole('row');
      expect(allRow.length).toBe(2);
    })
    it('Teste de comparação igual a', async () => {
      act(() => {
        render(<App />)
      })
  
      const inputNumber = await screen.findByTestId('value-filter');
      const selectColumn = await screen.findByTestId('column-filter');
      const selectComparison = await screen.findByTestId('comparison-filter');
      const buttonFilter = await screen.findByTestId('button-filter');
  
      useEvent.type(inputNumber, '2000');
      useEvent.selectOptions(selectColumn, 'population');
      useEvent.selectOptions(selectComparison, 'igual a');
      useEvent.click(buttonFilter);
  
      expect(await screen.getByRole('table')).toBeInTheDocument;
  
      await screen.findByRole('columnheader', { name: /name/i });
      await screen.findByRole('columnheader', { name: /rotation period/i });
      await screen.findByRole('columnheader', { name: /orbital period/i });
      await screen.findByRole('columnheader', { name: /diameter/i });
      await screen.findByRole('columnheader', { name: /climate/i });
      await screen.findByRole('columnheader', { name: /gravity/i });
      await screen.findByRole('columnheader', { name: /terrain/i });
      await screen.findByRole('columnheader', { name: /surface water/i });
      await screen.findByRole('columnheader', { name: /population/i });
      await screen.findByRole('columnheader', { name: /films/i });
      await screen.findByRole('columnheader', { name: /created/i });
      await screen.findByRole('columnheader', { name: /edited/i });
      await screen.findByRole('columnheader', { name: /url/i });
  
      const allRow = await screen.findAllByRole('row');
      expect(allRow.length).toBe(1);
    });
    it('Testa se renderiza filtros de sort', async () => {
      act(() => {
        render(<App />)
      })

      expect(await screen.findByTestId('column-sort')).toBeInTheDocument;
      expect(await screen.findByTestId('column-sort-input-asc')).toBeInTheDocument;
      expect(await screen.findByTestId('column-sort-input-desc')).toBeInTheDocument;
      expect(await screen.findByTestId('column-sort-button')).toBeInTheDocument;

    });
    it('Testa a funcionalidade do sort', async () => {
      act(() => {
        render(<App />)
      });
  
      const columnSort = await screen.findByTestId('column-sort');
      const sortAsc = await screen.findByTestId('column-sort-input-asc');
      const sortDesc = await screen.findByTestId('column-sort-input-desc');
      const btnSort = await screen.findByTestId('column-sort-button');
      
      useEvent.selectOptions(columnSort, 'population');
      useEvent.click(sortAsc);
      useEvent.click(btnSort);
      
  
      expect(await screen.findAllByTestId('planet-name')).toBeInTheDocument;

      useEvent.selectOptions(columnSort, 'population');
      useEvent.click(sortDesc);
      useEvent.click(btnSort);
  
    });
    it('Teste dos filtros', async () => {
      await act(async() => {
        render(<App />)
      });
  
      const inputNumber = screen.getByTestId('value-filter');
      const selectColumn = screen.getByTestId('column-filter');
      const selectComparison = screen.getByTestId('comparison-filter');
      const buttonFilter = screen.getByTestId('button-filter');
      const inputName = screen.getByTestId('name-filter');
  
      useEvent.type(inputName, 'tatooine');
      expect(screen.getAllByTestId('planet-name')).toHaveLength(1);
      useEvent.clear(inputName);
  
      useEvent.selectOptions(selectColumn, 'orbital_period');
      useEvent.selectOptions(selectComparison, 'maior que');
      useEvent.clear(inputNumber);
      useEvent.type(inputNumber, '500');
      useEvent.click(buttonFilter);
      expect(screen.getAllByTestId('planet-name')).toHaveLength(3);
  
      useEvent.selectOptions(selectColumn, 'population');
      useEvent.selectOptions(selectComparison, 'menor que');
      useEvent.clear(inputNumber);
      useEvent.type(inputNumber, '10000');
      useEvent.click(buttonFilter);
      expect(screen.getAllByTestId('planet-name')).toHaveLength(1);
  
      const removeFilterBtn = screen.getAllByRole('button', { name: /x/i });
      expect(removeFilterBtn).toHaveLength(2);
      useEvent.click(removeFilterBtn[0]);
      expect(screen.getAllByTestId('planet-name')).toHaveLength(1);
  
      useEvent.click(removeFilterBtn[1]);
      expect(screen.getAllByTestId('planet-name')).toHaveLength(10);
    });
    
  })
