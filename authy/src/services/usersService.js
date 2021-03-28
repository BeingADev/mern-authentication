import http from "../services/httpService";
import { baseURL } from "./config.json";

export async function getUsers() {
	return await http.get(`${baseURL}/users`);
}

export async function deleteUser(id) {
	return await http.delete(`${baseURL}/users/${id}`);
}

const logger = {
	getUsers,
	deleteUser,
};

export default logger;
