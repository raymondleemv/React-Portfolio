import './App.css';
import Portfolio from './pages/Portfolio/Portfolio';
import { Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import CMS from './pages/CMS/CMS';

library.add(fas);

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Portfolio />} />
				<Route path="/cms/*" element={<CMS />}>
					<Route path="*" element={<CMS />}></Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
