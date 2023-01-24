import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { TodoListContext, TodoListProvider } from '.';

beforeEach(() => {
  localStorage.clear();
});

describe('TodoList context', () => {
  it('render component correctly', () => {
    const ChildComponent = () => {
      return <div>Child Component</div>;
    };
    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>,
    );

    const childComponent = screen.getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
    expect(localStorage.getItem('todoList')).toBeNull();
  });

  it('loads localStorage data and sets it to state', () => {
    localStorage.setItem('todoList', '["todo 1", "todo 2", "todo 3"]');

    const ChildComponent = () => {
      const { todoList } = useContext(TodoListContext);
      return (
        <div>
          {todoList.map((todo) => (
            <div key={todo}>{todo}</div>
          ))}
        </div>
      );
    };

    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>,
    );

    expect(screen.getByText('todo 1')).toBeInTheDocument();
  });

  it('uses addTodo function', () => {
    const ChildComponent = () => {
      const { todoList, addTodo } = useContext(TodoListContext);
      return (
        <div>
          <div onClick={() => addTodo('study')}>Add todo</div>
          <div>
            {todoList.map((todo) => (
              <div key={todo}>{todo}</div>
            ))}
          </div>
        </div>
      );
    };
    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>,
    );

    expect(localStorage.getItem('todoList')).toBeNull();
    const button = screen.getByText('Add todo');
    fireEvent.click(button);
    expect(screen.getByText('study')).toBeInTheDocument();
    expect(localStorage.getItem('todoList')).toBe('["study"]');
  });

  it('uses deleteTodo fuction', () => {
    localStorage.setItem('todoList', '["todo 1", "todo 2", "todo 3"]');

    const ChildComponent = () => {
      const { todoList, deleteTodo } = useContext(TodoListContext);
      return (
        <div>
          <div>
            {todoList.map((todo, index) => (
              <div key={todo} onClick={() => deleteTodo(index)}>
                {todo}
              </div>
            ))}
          </div>
        </div>
      );
    };
    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>,
    );

    const todoItem = screen.getByText('todo 2');
    expect(todoItem).toBeInTheDocument();
    fireEvent.click(todoItem);
    expect(todoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('todoList') as string)).not.toContain('todo 2');
  });
});
