import styled from 'styled-components';
import { TodoListProvider } from 'Contexts';
import { TodoList, InputContainer } from 'Components';

function App() {
  return (
    <TodoListProvider>
      <Container>
        <Content>
          <TodoList />
          <InputContainer />
        </Content>
      </Container>
    </TodoListProvider>
  );
}

export default App;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;
