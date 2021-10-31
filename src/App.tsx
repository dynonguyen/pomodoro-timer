import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './components/Home';
import AccountContextProvider from './contexts/AccountContext';
import ThemeContextProvider from './contexts/ThemeContext';
import './styles/css/atomic.css';

function App() {
  return (
    <ThemeContextProvider>
      <AccountContextProvider>
        <BrowserRouter>
          <Suspense fallback={<>Loading ...</>}>
            <HomePage />
          </Suspense>
        </BrowserRouter>
      </AccountContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
