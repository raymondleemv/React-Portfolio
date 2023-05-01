import './Contact.css';

export default function Contact() {
	let submitHandler = function (e) {
		e.preventDefault();
		let form = document.querySelector('.contact-form');
		const backendEmailEndpoint =
			'https://portfolio-backend.raymondleemv.com/api/email';
		const formData = new FormData(form);
		fetch(backendEmailEndpoint, {
			method: 'POST',
			body: new URLSearchParams(formData),
		});
		alert('Message sent!');
	};
	return (
		<section id="contact" className="flex-center flex-column">
			<h2 className="section-title">Let's Chat!</h2>
			<div id="contact-chatbox-container">
				<div id="contact-chatbox-header">Send me a message!</div>
				<div id="contact-chatbox-content-container">
					<p className="contact-chatbox-content contact-chatbox-left">
						If you are interested in my CV, you can download it&nbsp;
						<a href="CV/Resume_ManViewRaymondLee.pdf" download>
							here
						</a>
					</p>
					<div className="contact-chatbox-content contact-chatbox-left">
						<p>I am reachable at:</p>
						<div className="contact-chatbox-contact-info">
							<img
								alt="This is a phone icon"
								src="images/contact/phone.png"
								className="contact-chatbox-contact-info-icon"
							/>
							<p className="contact-chatbox-contact-info-content">
								(437) 997 5066
							</p>
						</div>
						<div className="contact-chatbox-contact-info">
							<img
								alt="This is a email icon"
								src="images/contact/paper-plane.png"
								className="contact-chatbox-contact-info-icon"
							/>
							<p className="contact-chatbox-contact-info-content">
								raymondleemv@gmail.com
							</p>
						</div>
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
					</div>
					<p className="contact-chatbox-content contact-chatbox-left">
						Or you can also fill the contact form!
					</p>
					<form
						method="POST"
						action="https://portfolio-backend.raymondleemv.com/api/email"
						className="contact-form"
						onSubmit={(e) => submitHandler(e)}
					>
						<div className="contact-chatbox-content contact-chatbox-right">
							<input
								className="contact-form__field contact-form__name"
								placeholder="Name"
								name="name"
								required
							/>
						</div>
						<div className="contact-chatbox-content contact-chatbox-right">
							<input
								className="contact-form__field contact-form__email"
								placeholder="Email"
								name="email"
								type="email"
								required
							/>
						</div>
						<div className="contact-chatbox-content contact-chatbox-right">
							<input
								className="contact-form__field contact-form__subject"
								placeholder="Subject"
								name="subject"
								required
							/>
						</div>
						<div className="contact-chatbox-content contact-chatbox-right">
							<textarea
								className="contact-form__field contact-form__message"
								placeholder="Message"
								name="message"
								required
							></textarea>
						</div>
						<button className="button contact-chatbox-right contact-form__submit">
							Send
						</button>
					</form>
				</div>
			</div>
			<div className="separating-line"></div>
		</section>
	);
}
