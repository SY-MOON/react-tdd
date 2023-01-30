import styled from 'styled-components';
import { InputContainer } from 'Components';
import { useNavigate } from 'react-router-dom';

export const Add = () => {
	const navigate = useNavigate()
  return (
    <Container>
      <InputContainer onAdd={() => navigate('/', { replace: true })}/>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  align-items: center;
`;
