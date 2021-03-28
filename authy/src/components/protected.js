import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/auth";

const Protected = ({ component: Component, ...rest }) => {
	const loggedIn = auth.getCurrentUser();

	let isAuth;
	if (loggedIn !== null) {
		isAuth = loggedIn._id;
	}

	return (
		<>
			<Route
				{...rest}
				render={(props) =>
					isAuth ? (
						<Component {...props} />
					) : (
						<Redirect to={{ pathname: "/login" }} />
					)
				}
			/>
		</>
	);
};

export default Protected;
