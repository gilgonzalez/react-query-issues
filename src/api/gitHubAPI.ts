import axios from "axios";

const token = import.meta.env.VITE_APP_GITHUB_TOKEN;

export const gitHubAPI = axios.create({
	baseURL: "https://api.github.com/repos/facebook/react",
	headers: {
		Authorization: `Bearer ${token}`,
	},
});
