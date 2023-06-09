import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchAuthServer } from '../../../../data/database';

export default function Login(props) {
	const navigate = useNavigate();
	const [status, setStatus] = useState('');

	let submitHandler = async function (e) {
		e.preventDefault();
		const action = e.target.getAttribute('action');
		let data = Object.fromEntries(new FormData(e.target));
		let response = await fetchAuthServer(action, data);
		// fetch status is OK, redirect to CMS main page
		if (response.status === 200) {
			props.setLoggedIn(true);
			navigate('/cms/dashboard');
		} else {
			let responseText = await response.text();
			setStatus(responseText);
		}
	};

	return (
		<>
			<h1>Login Page for CMS</h1>
			{status && <p className="error-text">{status}</p>}
			<form
				className="cms-form"
				action="/api/login"
				method="POST"
				onSubmit={(e) => submitHandler(e)}
			>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="email">
						Email:
					</label>
					<input type="email" name="email" required />
				</div>
				<div className="cms-form__field">
					<label className="cms-form__label" htmlFor="password">
						Password:
					</label>
					<input type="password" name="password" required />
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
