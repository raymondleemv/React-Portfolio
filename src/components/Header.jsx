import Navbar from './Navbar';
import './Header.css';

export default function Header() {
	return (
		<header id="header">
			<div id="header-content">
				<a id="home-logo" href="#home"></a>
				<div id="header-content-right" className="flex-center">
					<a
						className="logo linkedin-logo"
						href="https://www.linkedin.com/in/raymondleemv"
						target="_blank"
					></a>
					<a
						className="logo github-logo"
						href="https://github.com/raymondleemv"
						target="_blank"
					></a>
					<Navbar />
				</div>
			</div>
		</header>
	);
}
