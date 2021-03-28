import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../utils/button";
import Input from "../utils/input";
import auth from "../services/auth";

const Forget = () => {
	const [value, setValue] = useState();

	const handleChange = (e) => {
		setValue((e.target.email = e.target.value));
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			await auth.forget(value);

			//window.location = "/";
		} catch (err) {}
	};

	return (
		<div className='formContainer'>
			<form className='formArea' onSubmit={onSubmit}>
				<h1>Forget Password</h1>
				<Input
					icon='fas fa-at'
					placeholder='email'
					type='email'
					name='email'
					onChange={handleChange}
				/>
				<Button text='Forget Password' />
				<div className='buttonRow'>
					Already a member? <Link to='/login'>Sign in</Link>
				</div>
			</form>
		</div>
	);
};

export default Forget;
