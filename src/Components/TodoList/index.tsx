import styled from 'styled-components';
import { TodoListContext } from 'Contexts';
import { TodoItem } from 'Components/TodoItem';
import { useContext } from 'react';

export const TodoList = () => {
	const { todoList, deleteTodo }= useContext(TodoListContext)
  return (
    <Container data-testid="todoList">
      {todoList.map((item, index) => (
        <TodoItem key={item} id={index} label={item} onDelete={() => deleteTodo(index)} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
`;
