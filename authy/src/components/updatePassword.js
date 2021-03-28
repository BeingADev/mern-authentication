import React, { useState } from "react";
import Button from "../utils/button";
import Input from "../utils/input";
import auth from "../services/auth";

const UpdatePassword = ({ match }) => {
	const [value, setValue] = useState({
		password: "",
		confirmPassword: "",
		id: match.params.id,
	});

	const handleChange = (e) => {
		value[e.target.name] = e.target.value;

		setValue(value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			await auth.updatePassword(
				value.password,
				value.confirmPassword,
				value.id
			);

			//window.location = "/";
		} catch (err) {}
	};

	return (
		<div className='formContainer'>
			<form className='formArea' onSubmit={onSubmit}>
				<h1>Update Password</h1>
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
				<Button text='Update Password' />
			</form>
		</div>
	);
};

export default UpdatePassword;
