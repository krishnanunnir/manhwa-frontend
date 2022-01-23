import axios from "axios";
import { baseUrl } from "./Constant";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

const axiosInstance = axios.create({
	baseURL: `${baseUrl}/`,
	timeout: 5000,
	headers: {
		Authorization: "JWT " + localStorage.getItem(ACCESS_TOKEN),
		"Content-Type": "application/json",
		accept: "application/json",
	},
});

const handleLogin = (user) => {
	return axiosInstance
		.post(`${baseUrl}/auth/token/obtain/`, user)
		.then((response) => {
			axiosInstance.defaults.headers["Authorization"] =
				"JWT " + response.data.access;
			localStorage.setItem(ACCESS_TOKEN, response.data.access);
			localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            return Promise.resolve(response.data);
		})
		.catch((err) => {
            return Promise.reject(err);
		});
};

const handleSignup = (user) => {
	return axios({
		method: "post",
		url: `${baseUrl}/auth/user/create/`,
		data: JSON.stringify(user),
		headers: {
			accept: "application/json",
			"Accept-Language": "en-US,en;q=0.8",
			"Content-Type": `application/json`,
		},
	})
		.then((res) => {
            return Promise.resolve(res.data);
		})
		.catch((err) => {
			return Promise.reject(err);
		});
};

export { handleLogin, handleSignup };
