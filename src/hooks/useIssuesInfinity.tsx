import { useInfiniteQuery } from "@tanstack/react-query";
import { gitHubAPI } from "../api/gitHubAPI";
import { IssuesResult, State } from "../types/types";

interface Props {
	state?: State;
	labels: string[];
	page?: number;
}

interface QueryProps {
	pageParam?: number;
	queryKey: (string | Props)[];
}
const getIssuesFromAPI = async ({
	pageParam,
	queryKey,
}: QueryProps): Promise<IssuesResult[]> => {
	const [, , args] = queryKey;
	const { labels, state } = args as Props;
	const params = new URLSearchParams();

	if (state) params.append("state", state);
	if (labels.length > 0) {
		const labelString = labels.join(",");
		params.append("labels", labelString);
	}

	params.append("page", pageParam?.toString() || "1");
	params.append("per_page", "5");

	const { data } = await gitHubAPI.get<IssuesResult[]>("/issues", { params });

	return data;
};

export const useIssuesInfinity = ({ state, labels }: Props) => {
	const issuesQuery = useInfiniteQuery(
		["issues", "infinite", { state, labels }],
		(data) => getIssuesFromAPI(data),
		{
			getNextPageParam: (lastPage, pages) => {
				if (lastPage.length === 0) return;
				return pages.length + 1;
			},
		},
	);

	return { issuesQuery };
};
