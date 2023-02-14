import { MemoryRouter, useLocation } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { Add } from '.';
import { TodoListProvider } from 'Contexts';

describe('<Add />', () => {
  it('renders component correctly', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/add']}>
        <Add />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText('할 일을 입력해주세요.');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('add a new Todo and redirect to the root page', () => {
    const TestComponent = () => {
      const { pathname } = useLocation();
      return (
        <TodoListProvider>
          <div>{pathname}</div>
          <Add />
        </TodoListProvider>
      );
    };

    render(
      <MemoryRouter initialEntries={['/add']}>
        <TestComponent />
      </MemoryRouter>,
    );

    const pathName = screen.getByText('/add');
    expect(pathName).toBeInTheDocument();

    const input = screen.getByPlaceholderText('할 일을 입력해주세요.');
    const button = screen.getByText('추가');

    fireEvent.change(input, { target: { value: 'New Todo' } });
		fireEvent.click(button)

		expect(pathName.textContent).toBe('/');
		expect(localStorage.getItem('todoList')).toBe('["New Todo"]')
  });
});
