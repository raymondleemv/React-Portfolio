import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Login(props) {
	const navigate = useNavigate();

	let submitHandler = async function (e) {
		e.preventDefault();
		const action = e.target.getAttribute('action');
		const method = e.target.getAttribute('method');
		let fetchOptions = {
			method: method,
			credentials: 'include',
		};
		if (method === 'POST') {
			fetchOptions.body = new URLSearchParams(new FormData(e.target));
		}
		let response = await fetch(action, fetchOptions);
		// fetch status is OK, redirect to CMS main page
		if (response.status === 200) {
			// TODO: change to CMS main page route
			props.setLoggedIn(true);
			navigate('/cms/dashboard');
		}
	};
	return (
		<>
			<h1>Login Page for CMS</h1>
			<form
				className="cms-form"
				// TODO: change to auth server login route
				action="https://portfolio-auth-server.vercel.app/login"
				method="POST"
				onSubmit={(e) => submitHandler(e)}
			>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="email">
						Email:
					</label>
					<input type="email" name="email" />
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="password">
						Password:
					</label>
					<input type="password" name="password" />
				</div>
				<button className="cms__button" type="submit">
					<FontAwesomeIcon
						icon="fa-solid fa-paper-plane"
						className="dashboard__icon"
					/>
					Submit
				</button>
			</form>
		</>
	);
}
