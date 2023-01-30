import styled from 'styled-components';
import { TodoListContext } from 'Contexts';
import { Button } from 'Components/Button';
import { Input } from 'Components/Input';
import { useContext, useState } from 'react';

interface Props {
  readonly onAdd?: () => void;
}

export const InputContainer = ({onAdd} : Props) => {
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
          if(todo && onAdd) onAdd();
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;
