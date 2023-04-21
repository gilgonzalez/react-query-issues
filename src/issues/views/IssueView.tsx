import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useIssue } from "../../hooks";
import { IssueComment } from "../components/IssueComment";

export const IssueView = () => {
	const { id = 0 } = useParams();
	const navigate = useNavigate();

	const { issueQuery, issueCommentsQuery } = useIssue(+id);
	const { data, isLoading } = issueQuery;
	const { data: commentData, isLoading: commentsAreLoading } =
		issueCommentsQuery;

	if (isLoading) return <PacmanLoader color="#fdff00" />;

	if (!data) return <Navigate to='./issues/list' />;

	return (
		<div className="row mb-5">
			<div className="col-12 mb-3">
				<Link to={-1}>Go Back</Link>
			</div>
			{/* Primer comentario */}
			<IssueComment issue={data} />

			{commentsAreLoading && (
				<div className="d-flex mt-3">
					<PacmanLoader color="#fdff00" />
				</div>
			)}

			{commentData?.map((issue) => (
				<IssueComment key={issue.id} issue={issue} />
			))}

			{/* Comentario de otros */}
			{/*  />
			<IssueComment body={comment3} /> */}
		</div>
	);
};
