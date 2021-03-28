import jwtDecode from "jwt-decode";
import http from "./httpService";
import { baseURL } from "./config.json";

const token = "token";
http.setJwt(getJwt());

export async function login(email, password) {
	const { data: jwt } = await http.post(`${baseURL}/auth`, { email, password });
	localStorage.setItem(token, jwt);
}

export async function signUp(user) {
	const { data: jwt } = await http.post(`${baseURL}/signup`, {
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		password: user.password,
		confirmPassword: user.confirmPassword,
	});
	localStorage.setItem(token, jwt);
}

export async function forget(email) {
	await http.post(`${baseURL}/forget`, { email });
}

export async function resetPassword(password, confirmPassword, userToken) {
	await http.patch(`${baseURL}${userToken}`, {
		password,
		confirmPassword,
	});
}

export async function updatePassword(password, confirmPassword, id) {
	await http.put(`${baseURL}/update-password/${id}`, {
		password,
		confirmPassword,
	});
}

export function loginWithJwt(jwt) {
	localStorage.setItem(token, jwt);
}

export function getJwt() {
	return localStorage.getItem(token);
}

export function logout() {
	localStorage.removeItem(token);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(token);
		return jwtDecode(jwt);
	} catch (ex) {
		return null;
	}
}

const logger = {
	getJwt,
	loginWithJwt,
	getCurrentUser,
	logout,
	login,
	signUp,
	forget,
	resetPassword,
	updatePassword,
};
export default logger;
