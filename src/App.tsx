import HomePage from './components/Home';
import AccountContextProvider from './contexts/AccountContext';
import ThemeContextProvider from './contexts/ThemeContext';
import UserSettingProvider from './contexts/UserSettingContext';
import './styles/css/atomic.css';

function App() {
	return (
		<ThemeContextProvider>
			<AccountContextProvider>
				<UserSettingProvider>
					<HomePage />
				</UserSettingProvider>
			</AccountContextProvider>
		</ThemeContextProvider>
	);
}

export default App;
