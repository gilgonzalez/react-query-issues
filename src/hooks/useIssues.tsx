import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { gitHubAPI } from "../api/gitHubAPI";
import { IssuesResult, State } from "../types/types.d";

interface Props {
	state?: State;
	labels: string[];
	page?: number;
}

const getIssuesFromAPI = async ({
	state,
	labels,
	page = 1,
}: Props): Promise<IssuesResult[]> => {
	const params = new URLSearchParams();

	if (state) params.append("state", state);
	if (labels.length > 0) {
		const labelString = labels.join(",");
		params.append("labels", labelString);
	}

	params.append("page", page.toString());
	params.append("per_page", "5");

	const { data } = await gitHubAPI.get<IssuesResult[]>("/issues", { params });

	return data;
};

export const useIssues = ({ state, labels }: Props) => {
	const [page, setPage] = useState(1);

	useEffect(() => {
		setPage(1);
	}, [state, labels]);

	const issuesQuery = useQuery(
		["issues", { state, labels, page }],
		() => getIssuesFromAPI({ labels, state, page }),
		{
			staleTime: 1000 * 60,
		},
	);

	const nextPage = () => {
		if (issuesQuery.data?.length === 0) return;
		setPage(page + 1);
	};

	const prevPage = () => {
		if (page > 1) setPage(page - 1);
	};

	return { issuesQuery, page, nextPage, prevPage };
};
