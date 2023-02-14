import { MemoryRouter, useLocation } from 'react-router-dom';
import 'jest-styled-components';

import { TodoListProvider } from 'Contexts';
import { List } from '.';
import { fireEvent, render, screen } from '@testing-library/react';

describe('<List />', () => {
  it('renders component correctly', () => {
    localStorage.setItem('todoList', '["todo1", "todo2", "todo3"]');

    const { container } = render(
      <TodoListProvider>
        <MemoryRouter initialEntries={['/']}>
          <List />
        </MemoryRouter>
      </TodoListProvider>,
    );

    const todoItem1 = screen.getByText('todo1');
    expect(todoItem1).toBeInTheDocument();
    expect(todoItem1.getAttribute('href')).toBe('/detail/0');

    const todoItem2 = screen.getByText('todo2');
    expect(todoItem2).toBeInTheDocument();
    expect(todoItem2.getAttribute('href')).toBe('/detail/1');

    const todoItem3 = screen.getByText('todo3');
    expect(todoItem3).toBeInTheDocument();
    expect(todoItem3.getAttribute('href')).toBe('/detail/2');

    expect(screen.getAllByText('삭제').length).toBe(3);

    const addButton = screen.getByText('+');
    expect(addButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('deletes todo item', () => {
    localStorage.setItem('todoList', '["todo1", "todo2", "todo3"]');

    render(
      <TodoListProvider>
        <MemoryRouter initialEntries={['/']}>
          <List />
        </MemoryRouter>
      </TodoListProvider>,
    );

    const todoItem = screen.getByText('todo2');
    expect(todoItem).toBeInTheDocument();
    fireEvent.click(todoItem.nextElementSibling as HTMLElement);
    expect(todoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('todoList') as string)).not.toContain('todo2');
  });

	it('moves to detail page', () => {
		const TestComponent = (): JSX.Element => {
			const { pathname } = useLocation();
			return <div>{pathname}</div>
		}

		localStorage.setItem('todoList', '["todo1", "todo2", "todo3"]');

    render(
      <TodoListProvider>
        <MemoryRouter initialEntries={['/']}>
					<TestComponent />
          <List />
        </MemoryRouter>
      </TodoListProvider>,
    );

		const url = screen.getByText('/');
		expect(url).toBeInTheDocument();

		const todoItem1 = screen.getByText('todo2');
		expect(todoItem1.getAttribute('href')).toBe('/detail/1');
		fireEvent.click(todoItem1);

		expect(url.textContent).toBe('/detail/1')
	})
});
