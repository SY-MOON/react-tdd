import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import 'jest-styled-components';

describe('<App />', () => {
  it('renders component correctly', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const header = screen.getByText('할 일 목록');
    expect(header).toBeInTheDocument();

    const todoList = screen.getByTestId('todoList');
    expect(todoList).toBeInTheDocument();
    expect(todoList.firstChild).toBeNull();

    const label = screen.getByText('+');
    expect(label).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('add and goback', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    const header = screen.getByText('할 일 추가');
    expect(header).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    const input = screen.getByPlaceholderText('할 일을 입력해주세요.');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();

    fireEvent.click(goBack);
    expect(header.textContent).toBe('할 일 목록');
    const todoList = screen.getByTestId('todoList');
    expect(todoList).toBeInTheDocument();
  });

  it('go detail and back', () => {
    localStorage.setItem('todoList', '["todo1"]');

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const todoItem = screen.getByText('todo1');
    expect(todoItem).toBeInTheDocument();
    fireEvent.click(todoItem);

    const header = screen.getByText('할 일 상세');
    expect(header).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    const todo = screen.getByText('todo1');
    expect(todo).toBeInTheDocument();
    const button = screen.getByText('삭제');
    expect(button).toBeInTheDocument();

    fireEvent.click(goBack);
    expect(header.textContent).toBe('할 일 목록');
    const todoList = screen.getByTestId('todoList');
    expect(todoList).toBeInTheDocument();
  });

  it('not found', () => {
    render(
      <MemoryRouter initialEntries={['/foo']}>
        <App />
      </MemoryRouter>,
    );

    const header = screen.getByText('에러');
    expect(header).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    const notFoundMsg = screen.getByText('Not Found');
    expect(notFoundMsg).toBeInTheDocument();

    fireEvent.click(goBack);
    expect(header.textContent).toBe('할 일 목록');
    const todoList = screen.getByTestId('todoList');
    expect(todoList).toBeInTheDocument();
  });

  it('add a new todo', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    const input = screen.getByPlaceholderText('할 일을 입력해주세요.');
    const button = screen.getByText('추가');
    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.click(button);

    const header = screen.getByText('할 일 목록');
    expect(header).toBeInTheDocument();
    const newTodo = screen.getByText('New todo');
    expect(newTodo).toBeInTheDocument();
  });

  it('delete todo item from list', () => {
    localStorage.setItem('todoList', '["todo1"]');

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const todoItem = screen.getByText('todo1');
    const deleteButton = screen.getByText('삭제');
    expect(todoItem).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(todoItem).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
    expect(localStorage.getItem('todoList')).toBe('[]');
  });

  it('delete todo item from detail', () => {
    localStorage.setItem('todoList', '["todo1"]');

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const todoItem = screen.getByText('todo1');
    expect(todoItem).toBeInTheDocument();
    fireEvent.click(todoItem);

    const header = screen.getByText('할 일 상세');
    expect(header).toBeInTheDocument();
    const deleteButton = screen.getByText('삭제');
    fireEvent.click(deleteButton);

    expect(header.textContent).toBe('할 일 목록');
    const todoList = screen.getByTestId('todoList');
    expect(todoList).toBeInTheDocument();
    expect(todoList.firstChild).toBeNull();
    expect(localStorage.getItem('todoList')).toBe('[]')
  });
});
