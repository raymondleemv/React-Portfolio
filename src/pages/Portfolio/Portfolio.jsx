import Home from './Home/Home';
import About from './About/About';
import Project from './Project/Project';
import Skill from './Skill/Skill';
import Contact from './Contact/Contact';
import Header from '../../components/Header';

export default function Portfolio() {
	return (
		<div>
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
