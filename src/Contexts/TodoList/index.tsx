import { createContext, useEffect, useState } from 'react';

interface Context {
  readonly todoList: string[];
  readonly addTodo: (todo: string) => void;
  readonly deleteTodo: (index: number) => void;
}

const TodoListContext = createContext<Context>({
  todoList: [],
  addTodo: (): void => {},
  deleteTodo: (): void => {},
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const TodoListProvider = ({ children }: Props): JSX.Element => {
  const [todoList, setTodoList] = useState<string[]>([]);

  const addTodo = (todo: string): void => {
    if (todo) {
      const newList = [...todoList, todo];
      setTodoList(newList);
      localStorage.setItem('todoList', JSON.stringify(newList));
    }
  };

  const deleteTodo = (index: number): void => {
    let list = [...todoList];
    list.splice(index, 1);
    setTodoList(list);
    localStorage.setItem('todoList', JSON.stringify(list));
  };

  useEffect(() => {
    const list = localStorage.getItem('todoList');
    if (list) {
      setTodoList(JSON.parse(list));
    }
  }, []);

  return (
    <TodoListContext.Provider value={{ todoList, addTodo, deleteTodo }}>
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListContext, TodoListProvider };
