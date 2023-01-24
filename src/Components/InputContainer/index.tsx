import styled from 'styled-components';
import { TodoListContext } from 'Contexts';
import { Button } from 'Components/Button';
import { Input } from 'Components/Input';
import { useContext, useState } from 'react';

export const InputContainer = () => {
  const [todo, setTodo] = useState('');
  const { addTodo } = useContext(TodoListContext);
  return (
    <Container>
      <Input placeholder="할 일을 입력해주세요." value={todo} onChange={setTodo} />
      <Button
        label="추가"
        onClick={() => {
          addTodo(todo);
          setTodo('');
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;
