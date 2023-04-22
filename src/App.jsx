import './App.css';
import './js/Portfolio';
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import Skill from './pages/Skill';
import Contact from './pages/Contact';
import Header from './components/Header';

function App() {
	return (
		<div className="App">
			<Header />
			<main>
				<Home />
				<About />
				<Project />
				<Skill />
				<Contact />
			</main>
			<footer>
				<div>- &copy; 2022 Man View Raymond Lee. -</div>
			</footer>
		</div>
	);
}

export default App;
