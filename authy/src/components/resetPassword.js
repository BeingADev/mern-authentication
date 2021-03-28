import React, { useState } from "react";
import Button from "../utils/button";
import Input from "../utils/input";
import auth from "../services/auth";

const ResetPassword = () => {
	const [value, setValue] = useState({
		password: "",
		confirmPassword: "",
		userToken: window.location.pathname,
	});

	const handleChange = (e) => {
		value[e.target.name] = e.target.value;

		setValue(value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			await auth.resetPassword(
				value.password,
				value.confirmPassword,
				value.userToken
			);

			//window.location = "/";
		} catch (err) {}
	};

	return (
		<div className='formContainer'>
			<form className='formArea' onSubmit={onSubmit}>
				<h1>Reset Password</h1>
				<Input
					IcoClass='-outlined'
					icon='fas fa-lock'
					placeholder='Password'
					type='password'
					name='password'
					onChange={handleChange}
				/>
				<Input
					IcoClass='-outlined'
					icon='fas fa-lock'
					placeholder='Confirm Password'
					type='password'
					name='confirmPassword'
					onChange={handleChange}
				/>
				<Button text='Reset Password' />
			</form>
		</div>
	);
};

export default ResetPassword;
