import './Home.css';
export default function Home() {
	return (
		<section id="home">
			<div id="home-content-container" className="flex-center flex-column">
				<div id="home-content" className="flex-center flex-column">
					<h1 id="hero-text-name">Raymond Lee</h1>
					<h2 id="hero-text-intro">- A Full Stack Web Developer -</h2>
					<h2 id="tagline">
						Coding is not just a language, it's also a part of me.
					</h2>
				</div>
				<div id="read-more" className="flex-center flex-column">
					<h2 id="read-more-text">- Read more -</h2>
					<img
						alt="This is a picture of the read more arrow prompting the user that there's more content below"
						id="read-more-arrow"
						src="images/home/eject.png"
					/>
					<div className="separating-line"></div>
				</div>
			</div>
		</section>
	);
}
