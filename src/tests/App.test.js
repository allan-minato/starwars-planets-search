import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('Testes relacionados à "Table.jsx"',async  () => {
  render(<App />);

 await waitFor(()=> {
  const tatoo = screen.getByText('Tatooine')
 }, {timeout: 4000})


 userEvent.click(screen.getByTestId('button-filter'))

  const columnInput = screen.getByTestId('column-filter')
  const comparisonInput = screen.getByTestId('comparison-filter')
  const valueInput = screen.getByTestId('value-filter')

  userEvent.selectOptions(columnInput, 'surface_water')
  userEvent.selectOptions(comparisonInput, 'menor que')
  userEvent.type(valueInput, '40')

  userEvent.click(screen.getByTestId('button-filter'))

  userEvent.selectOptions(columnInput, 'diameter')
  userEvent.selectOptions(comparisonInput, 'maior que')
  userEvent.type(valueInput, '10000')

  userEvent.click(screen.getByTestId('button-filter'))

  const buttons = screen.getAllByRole('button')
  userEvent.click(buttons[2])

  userEvent.type(screen.getByTestId('name-filter'), 'a')

  userEvent.click(buttons[1])


});
