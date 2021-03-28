import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../utils/button";
import Input from "../utils/input";
import auth from "../services/auth";

const Signup = () => {
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		user[e.target.name] = e.target.value;

		setUser(user);
	};

	const doSubmit = async (e) => {
		e.preventDefault();

		try {
			await auth.signUp(user);

			window.location = "/";
		} catch (err) {}
	};

	return (
		<div className='formContainer'>
			<form className='formArea' onSubmit={doSubmit}>
				<h1>Sign Up</h1>
				<Input
					icon='fas fa-user'
					placeholder='First Name'
					name='firstName'
					onChange={handleChange}
				/>
				<Input
					icon='fas fa-user'
					placeholder='Last Name'
					name='lastName'
					onChange={handleChange}
				/>
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
				<Input
					icon='fas fa-lock'
					placeholder='Confirm Password'
					type='password'
					name='confirmPassword'
					onChange={handleChange}
				/>
				<Button text='Sign Up' />
				<div className='buttonRow'>
					Already a member? <Link to='/login'>Sign in</Link>
				</div>
			</form>
		</div>
	);
};

export default Signup;
