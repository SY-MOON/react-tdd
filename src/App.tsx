import logo from './logo.svg';
import './App.css';
import Styled from 'styled-components';

function App() {
  return (
    <Container>
      <header className="App-header">
        <AppLogo src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </Container>
  );
}

export default App;

const Container = Styled.div`
  text-align: center;
`;

const AppLogo = Styled.img`
height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 20s linear;
}
`;
