import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { act, findByText, fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { TodoListProvider } from 'Contexts';
import { Detail } from '.';

describe('<Detail />', () => {
  it('renders component correctly', () => {
    localStorage.setItem('todoList', '["todo1"]');

    const { container } = render(
      <TodoListProvider>
        <MemoryRouter initialEntries={['/detail/0']}>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      </TodoListProvider>,
    );

    const todoItem = screen.getByText('todo1');
    expect(todoItem).toBeInTheDocument();

    const button = screen.getByText('삭제');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('deletes todo data', () => {
    localStorage.setItem('todoList', '["todo1"]');

    const TestComponent = () => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };

    render(
      <TodoListProvider>
        <MemoryRouter initialEntries={['/','/detail/0']}>
          <TestComponent />
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      </TodoListProvider>,
    );

    const url = screen.getByText('/detail/0');
    expect(url).toBeInTheDocument();

    const todoItem = screen.getByText('todo1');
    expect(todoItem).toBeInTheDocument();
    const button = screen.getByText('삭제');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(url.textContent).toBe('/');
    expect(todoItem).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
		
  });
});
