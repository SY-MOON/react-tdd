import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import 'jest-styled-components';

describe('<App />', () => {
  it('renders component correctly', () => {
    const { container } = render(<App />);

    const todoList = screen.getByTestId('todoList');
    expect(todoList).toBeInTheDocument();
    expect(todoList.firstChild).toBeNull();

    const input = screen.getByPlaceholderText('할 일을 입력해주세요.');
    expect(input).toBeInTheDocument();
    const label = screen.getByText('추가');
    expect(label).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('add and delete items', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('할 일을 입력해주세요.');
    const button = screen.getByText('추가');
    fireEvent.change(input, { target: { value: 'study react1' } });
    fireEvent.click(button);

    const todoItem = screen.getByText('study react1');
    expect(todoItem).toBeInTheDocument();
    const deleteBtn = screen.getByText('삭제');
    expect(deleteBtn).toBeInTheDocument();

    const todoList = screen.getByTestId('todoList');
    expect(todoList.childElementCount).toBe(1);

    fireEvent.change(input, { target: { value: 'study react2' } });
    fireEvent.click(button);

    const todoItem2 = screen.getByText('study react2');
    expect(todoItem2).toBeInTheDocument();
    expect(todoList.childElementCount).toBe(2);

    const deleteBtns = screen.getAllByText('삭제');
    fireEvent.click(deleteBtns[0]);

    expect(todoItem).not.toBeInTheDocument();
    expect(todoList.childElementCount).toBe(1);
  });

  it('add', () => {
    render(<App />);

    const todoList = screen.getByTestId('todoList');
    const length = todoList.childElementCount;

    const button = screen.getByText('추가');
    fireEvent.click(button);

    expect(todoList.childElementCount).toBe(length);
  });

  it('load localStorage', () => {
    localStorage.setItem('todoList', '["todo1", "todo2", "todo3"]');

    render(<App />);

    expect(screen.getByText('todo1')).toBeInTheDocument();
    expect(screen.getAllByText('삭제').length).toBe(3);
  });
});
