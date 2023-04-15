import { useQuery } from "@tanstack/react-query";
import { gitHubAPI } from "../api/gitHubAPI";
import { sleep } from "../helpers/sleep";
import { IssuesResult, State } from "../types/types.d";

interface Props {
  state?:State,
  labels : string[]
}

const getIssuesFromAPI = async (labels: string[] ,state? : State ): Promise<IssuesResult[]> => {
  await sleep(2)

  const params = new URLSearchParams();

  if (state) params.append('state', state)
  if (labels.length > 0) {
    const labelString = labels.join(',')
    params.append('labels', labelString)
  }

  params.append('page', '1')
  params.append('per_page', '5')

	const { data } = await gitHubAPI.get<IssuesResult[]>("/issues", {params});

	return data;
};


export const useIssues = ({state, labels} : Props) => {
	const issuesQuery = useQuery(
    ["issues", {state, labels }], 
    ()=>getIssuesFromAPI( labels, state),
    {
      staleTime : 1000*60
    }
  );

	return { issuesQuery };
};
