import HomePage from './components/Home';
import ThemeContextProvider from './contexts/ThemeContext';
import './styles/css/atomic.css';

function App() {
  return (
    <ThemeContextProvider>
      <HomePage />
    </ThemeContextProvider>
  );
}

export default App;
