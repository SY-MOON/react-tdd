import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TodoListContext } from 'Contexts';
import { Button } from 'Components';
import { useContext } from 'react';

export const Detail = () => {
  const navigate = useNavigate();
  const params: { id?: string } = useParams();
  const id = Number.parseInt(params?.id || '');
  const { todoList, deleteTodo } = useContext(TodoListContext);
  const todo = todoList[id];

  return (
    <Container>
      <Todo>{todo}</Todo>
      <Button
        label="삭제"
        backgroundColor="#ff1744"
        hoverColor="#f01440"
        onClick={() => {
          deleteTodo(id);
          navigate(-1);
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  align-items: center;
  flex-direction: column;
`;

const Todo = styled.div`
  min-width: 350px;
  height: 350px;
  overflow-y: auto;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
  padding: 10px;
`;
