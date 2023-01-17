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

    expect(container).toMatchInlineSnapshot(`
      .c5 {
        text-align: center;
        background-color: #304ffe;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
      }

      .c5:hover {
        background-color: #1e40ff;
      }

      .c5:active {
        box-shadow: inset 5px 5px 10px rgba(0,0,0,0.2);
      }

      .c6 {
        color: #ffffff;
        font-size: 16px;
      }

      .c4 {
        font-size: 16px;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #bdbdbd;
        outline: none;
      }

      .c0 {
        min-height: 100vh;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        background-color: #ffffff;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 5px 5px 10px rgba(0,0,0,0.2);
      }

      .c3 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }

      .c2 {
        min-width: 350px;
        height: 400px;
        overflow-y: scroll;
        border: 1px solid #bdbdbd;
        margin-bottom: 20px;
      }

      <div>
        <div
          class="c0"
        >
          <div
            class="c1"
          >
            <div
              class="c2"
              data-testid="todoList"
            />
            <div
              class="c3"
            >
              <input
                class="c4"
                placeholder="할 일을 입력해주세요."
                value=""
              />
              <div
                class="c5"
              >
                <div
                  class="c6"
                >
                  추가
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
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
});
