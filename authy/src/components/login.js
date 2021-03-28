import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../utils/button";
import Input from "../utils/input";
import auth from "../services/auth";

const Login = () => {
	const [value, setValue] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		value[e.target.name] = e.target.value;

		setValue(value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			await auth.login(value.email, value.password);

			window.location = "/";
		} catch (err) {}
	};

	return (
		<div className='formContainer'>
			<form className='formArea' onSubmit={onSubmit}>
				<h1>Login</h1>
				<Input
					icon='fas fa-at'
					placeholder='email'
					type='email'
					name='email'
					onChange={handleChange}
				/>
				<Input
					icon='fas fa-lock'
					placeholder='Password'
					type='password'
					name='password'
					onChange={handleChange}
				/>
				<Button text='Login' />
				<div className='buttonRow' style={{ textAlign: "right" }}>
					<Link to='/forget'>Forget password?</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
