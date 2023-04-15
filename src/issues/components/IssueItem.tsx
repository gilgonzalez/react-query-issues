import { useQueryClient } from "@tanstack/react-query";
import { FiCheckCircle, FiInfo, FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getIssueCommentsFromAPI, getIssueInfoFromAPI } from "../../hooks/useIssue";
import { IssuesResult, State } from "../../types/types.d";

interface Props {
	issue: IssuesResult;
}

export const IssueItem: React.FC<Props> = ({ issue }) => {
	const { title } = issue;
	const date = new Date(issue.updated_at);

  const navigate =  useNavigate()
  const queryClient = useQueryClient()

  const preFetchData =  ()=> {
    queryClient.prefetchQuery(
      ['issueDetails', issue.number],()=> getIssueInfoFromAPI(issue.number)
    )
    queryClient.prefetchQuery(
      ['issue', issue.number, 'comments'],
      ()=> getIssueCommentsFromAPI(issue.number)
    )
  }

  const preSetData = () => {
    queryClient.setQueryData(
      ['issueDetails', issue.number],
      issue,
      {
        updatedAt :new Date().getTime() + 100000 //ESTO ES PARA QUE LA DATA ESTE FRESH MAS TIEMPO
      }
    )
  }
  
	return (
		<div className="card mb-2 issue"
      onClick={()=>navigate(`/issues/issue/${issue.number}`)}
      // onMouseEnter = { preFetchData} 
      onMouseEnter={preSetData}

    >
			<div className="card-body d-flex align-items-center justify-content-around">
				{issue.state === State.Open && <FiInfo className="w-10" size={40} color="tomato" />}
        {issue.state === State.Closed && <FiCheckCircle size={40} color="green" /> }

				<div className="d-flex flex-column flex-fill m-1 px-4 w-75">
					<span>{title}</span>
					<span className="issue-subinfo">
						# {issue.number} updated {date.toDateString()}
						<span className='fw-bold' style={{ marginLeft: "8px" }}>
							{issue.user.login}
						</span>
					</span>
          <div>
            {
              issue.labels.map(label => (
                <span key={label.id} className="badge rounded-pill m-1" 
                style={{backgroundColor:`#${label.color}90 `, color:'black', padding:'0.5rem', border: `1px solid black`}}> {label.name}</span>
              ))
            }
          </div>
				</div>

				<div className='d-flex align-items-center'>
					<img
						src={issue.user.avatar_url}
						alt="User Avatar"
						className="avatar"
					/>
					<span className='px-2'>{issue.comments}</span>
					<FiMessageSquare />
				</div>
			</div>
		</div>
	);
};
