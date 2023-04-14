import axios from "axios";

export const gitHubAPI = axios.create({
	baseURL: "https://api.github.com/repos/facebook/react",
	headers: {
		Authorization:
			"Bearer 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",
	},
});
