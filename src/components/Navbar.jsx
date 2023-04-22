import './Navbar.css';

export default function Navbar() {
	return (
		<nav>
			<button className="dropdown-menu flex-center flex-column">
				<div className="dropdown-menu-stripes"></div>
				<div className="dropdown-menu-stripes"></div>
				<div className="dropdown-menu-stripes"></div>
			</button>
			<ul>
				<li>
					<a href="#about">About</a>
				</li>
				<li>
					<a href="#projects">Projects</a>
				</li>
				<li>
					<a href="#skills">Skills</a>
				</li>
				<li>
					<a href="#contact">Contact</a>
				</li>
			</ul>
		</nav>
	);
}
