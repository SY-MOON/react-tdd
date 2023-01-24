import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { TodoListProvider } from 'Contexts';
import { TodoList } from '.';

describe('<TodoList />', () => {
  it('render', () => {
    const { container } = render(
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>,
    );

    const todoList = screen.getByTestId('todoList');
    expect(todoList).toBeInTheDocument();
    expect(todoList.firstChild).toBeNull();

    expect(container).toMatchSnapshot();
  });

  it('show todo list', () => {
    localStorage.setItem('todoList', '["todo1", "todo2", "todo3"]');

    render(
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>,
    );

    expect(screen.getByText('todo1')).toBeInTheDocument();
    expect(screen.getAllByText('삭제').length).toBe(3);
  });

  it('delete todo', () => {
    localStorage.setItem('todoList', '["todo1", "todo2", "todo3"]');

    render(
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>,
    );

    const todoItem = screen.getByText('todo2');
    expect(todoItem).toBeInTheDocument();
    fireEvent.click(todoItem.nextElementSibling as HTMLElement);
    expect(todoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('todoList') as string)).not.toContain('todo2');
  });
});
