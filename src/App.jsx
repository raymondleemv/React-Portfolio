import './App.css';
import Login from './pages/CMS/Login/Login';
import Portfolio from './pages/Portfolio/Portfolio';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Portfolio />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
