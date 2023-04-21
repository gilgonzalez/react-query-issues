import { useQuery } from "@tanstack/react-query";
import { gitHubAPI } from "../api/gitHubAPI";
import { IssuesResult } from "../types/types";

export const getIssueInfoFromAPI = async (
	issueNumber: number,
): Promise<IssuesResult> => {
	const { data } = await gitHubAPI.get<IssuesResult>(`/issues/${issueNumber}`);
	return data;
};
export const getIssueCommentsFromAPI = async (
	issueNumber: number,
): Promise<IssuesResult[]> => {
	const { data } = await gitHubAPI.get<IssuesResult[]>(
		`/issues/${issueNumber}/comments`,
	);

	return data;
};

export const useIssue = (issueNumber: number) => {
	const issueQuery = useQuery(
		["issueDetails", issueNumber],
		() => getIssueInfoFromAPI(issueNumber),
		{
			staleTime: 1000 * 60,
		},
	);
	const issueCommentsQuery = useQuery(
		["issue", issueNumber, "comments"],
		// rome-ignore lint/style/noNonNullAssertion: <explanation>
		() => getIssueCommentsFromAPI(issueQuery.data!.number),
		{
			enabled: !!issueQuery.data,
			staleTime: 1000 * 60,
		},
	);

	return {
		issueQuery,
		issueCommentsQuery,
	};
};
