import { useQuery } from "@tanstack/react-query";
import { gitHubAPI } from "../api/gitHubAPI";
import { sleep } from "../helpers/sleep";
import { Label } from "../types/types";

const getLabelsFromAPI = async (): Promise<Label[]> => {
	const { data } = await gitHubAPI.get<Label[]>("/labels?per_page=100");

	await sleep(2);
	return data;
};

export const useLabels = () => {
	const labelsQuery = useQuery(["labels"], getLabelsFromAPI, {
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 60,
		//initialData: [], Se mantendrían estos datos hasta que pase el tiempo del staleTime
		// placeholderData: [
		// 	{
		// 		id: 791921801,
		// 		node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
		// 		url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
		// 		name: "❤️",
		// 		color: "ffffff",
		// 		default: false,
		// 	},
		// 	{
		// 		id: 204945357,
		// 		node_id: "MDU6TGFiZWwyMDQ5NDUzNTc=",
		// 		url: "https://api.github.com/repos/facebook/react/labels/Component:%20Shallow%20Renderer",
		// 		name: "Component: Shallow Renderer",
		// 		color: "eb6420",
		// 		default: false,
		// 	},
		// ],
	});

	return { labelsQuery };
};
