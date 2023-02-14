import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { TodoListProvider } from 'Contexts';
import { Add, Detail, List, NotFound } from 'Pages';
import { PageHeader } from 'Components';

function App() {
  return (
    <TodoListProvider>
      <Container>
        <PageHeader />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={
              <Content>
                <List />
              </Content>
            }
          />
          <Route path="/add" element={<Add />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
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
