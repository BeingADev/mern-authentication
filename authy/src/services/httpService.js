import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response && error.response >= 400 && error.response < 500;

	if (!expectedError) {
		console.log("Logging the error", error);
		toast.error(error.response.data);
	}

	return Promise.reject(error);
});

function setJwt(jwt) {
	axios.defaults.headers.common["x-auth-token"] = jwt;
}

const logger = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	patch: axios.patch,
	delete: axios.delete,
	setJwt,
};

export default logger;
