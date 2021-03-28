import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DashBoard from "./components/dashboard";
import Footer from "./components/footer";
import Forget from "./components/forget";
import Header from "./components/header";
import Login from "./components/login";
import ResetPassword from "./components/resetPassword";
import Signup from "./components/signup";
import auth from "./services/auth";
import Protected from "./components/protected";
import Logout from "./components/logout";
import UpdatePassword from "./components/updatePassword";

function App() {
	const loggedIn = auth.getCurrentUser();
	let userName;
	let userId;
	if (loggedIn !== null) {
		userName = `${loggedIn.firstName} ${loggedIn.lastName}`;
		userId = loggedIn._id;
	}

	return (
		<div className='App'>
			<ToastContainer />
			<Header userName={userName} id={userId} />
			<main className='main'>
				<Switch>
					<Protected path='/' component={DashBoard} exact></Protected>
					<Route path='/signup' component={Signup}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/forget' component={Forget}></Route>
					<Protected
						path='/update-password/:id'
						component={UpdatePassword}></Protected>
					<Protected path='/logout' component={Logout}></Protected>
					<Route
						path='/reset-password/:token'
						component={ResetPassword}></Route>
				</Switch>
			</main>
			<Footer />
		</div>
	);
}

export default App;
