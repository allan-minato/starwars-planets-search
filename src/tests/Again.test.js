import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App';

const timeout = (time) => {
  return new Promise(resolve => {
      setTimeout(resolve, time);
  });
}

describe('Testes do app', () => {
    it('Testa se filtra a tabela', async () => {
        render(<App />);
        await timeout(4000);
        const columnFilter = screen.getByTestId('column-filter');
        const comparisonFilter = screen.getByTestId('comparison-filter');
        const valueFilter = screen.getByTestId('value-filter');
        const buttonFilter = screen.getByTestId('button-filter');
        const nameFilter = screen.getByTestId('name-filter');
        const buttonRemoveFilters = screen.getByTestId('button-remove-filters');
    
        userEvent.type(nameFilter, 'a');
        userEvent.clear(valueFilter);
        userEvent.type(valueFilter, '1000');
        userEvent.click(buttonFilter);
        userEvent.selectOptions(columnFilter, 'orbital_period');
        userEvent.selectOptions(comparisonFilter, 'menor que');
        userEvent.click(buttonFilter);
        userEvent.selectOptions(columnFilter, 'diameter');
        userEvent.selectOptions(comparisonFilter, 'igual a');
        userEvent.click(buttonFilter);
        userEvent.selectOptions(comparisonFilter, 'maior que');
        userEvent.click(buttonFilter);
        screen.getAllByRole('button', {name:'X'}).forEach(element => {
          userEvent.click(element);
        });
    
        expect(valueFilter).toHaveProperty('value', '1000');
    
        userEvent.clear(valueFilter);
        userEvent.type(valueFilter, '2000');
        userEvent.click(buttonFilter);
        userEvent.selectOptions(columnFilter, 'orbital_period');
        userEvent.selectOptions(comparisonFilter, 'menor que');
        userEvent.click(buttonFilter);
        userEvent.selectOptions(columnFilter, 'diameter');
        userEvent.selectOptions(comparisonFilter, 'igual a');
        userEvent.click(buttonFilter);
        userEvent.click(buttonRemoveFilters);
    
        expect(valueFilter).toHaveProperty('value', '2000');
      })
})