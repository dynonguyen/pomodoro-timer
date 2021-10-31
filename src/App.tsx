import HomePage from './components/Home';
import AccountContextProvider from './contexts/AccountContext';
import ThemeContextProvider from './contexts/ThemeContext';
import './styles/css/atomic.css';

function App() {
  return (
    <ThemeContextProvider>
      <AccountContextProvider>
        <HomePage />
      </AccountContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
