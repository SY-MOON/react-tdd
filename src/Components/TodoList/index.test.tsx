import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import 'jest-styled-components';
import { TodoListProvider } from 'Contexts';
import { TodoList } from '.';

describe('<TodoList />', () => {
  it('render', () => {
    const { container } = render(
      <Router>
        <TodoListProvider>
          <TodoList />
        </TodoListProvider>
      </Router>,
    );

    const todoList = screen.getByTestId('todoList');
    expect(todoList).toBeInTheDocument();
    expect(todoList.firstChild).toBeNull();

    expect(container).toMatchSnapshot();
  });

  it('show todo list', () => {
    localStorage.setItem('todoList', '["todo1", "todo2", "todo3"]');

    render(
      <Router>
        <TodoListProvider>
          <TodoList />
        </TodoListProvider>
      </Router>,
    );

    const todoItem1 = screen.getByText('todo1')
    expect(todoItem1).toBeInTheDocument();
    expect(todoItem1.getAttribute('href')).toBe('/detail/0')

    const todoItem2 = screen.getByText('todo2')
    expect(todoItem2).toBeInTheDocument();
    expect(todoItem2.getAttribute('href')).toBe('/detail/1') 

    expect(screen.getAllByText('삭제').length).toBe(3);
  });

  it('delete todo', () => {
    localStorage.setItem('todoList', '["todo1", "todo2", "todo3"]');

    render(
      <Router>
        <TodoListProvider>
          <TodoList />
        </TodoListProvider>
      </Router>,
    );

    const todoItem = screen.getByText('todo2');
    expect(todoItem).toBeInTheDocument();
    fireEvent.click(todoItem.nextElementSibling as HTMLElement);
    expect(todoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('todoList') as string)).not.toContain('todo2');
  });

  it('move to detail page', () => {
    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>
    }

    localStorage.setItem('TodoList', '["todo1", "todo2", "todo3"]');

    render(
      <Router>
        <TestComponent />
        <TodoListProvider>
          <TodoList />
        </TodoListProvider>
      </Router>
    )

    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const toDoItem1 = screen.getByText('todo1');
    expect(toDoItem1.getAttribute('href')).toBe('/detail/0');
    fireEvent.click(toDoItem1)

    expect(url.textContent).toBe('/detail/0')
  })
});
