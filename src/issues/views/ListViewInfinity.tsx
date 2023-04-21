import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { PacmanLoader } from "react-spinners";
import { useIssuesInfinity } from "../../hooks/useIssuesInfinity";
import { State } from "../../types/types";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";

export const ListViewInfinity = () => {
	const [selectedLabel, setSelectedLabel] = useState<string[]>([]);
	const [state, setState] = useState<State>();

	const { issuesQuery } = useIssuesInfinity({ state, labels: selectedLabel });
	const { isLoading } = issuesQuery;

	const onChangeLabel = (labelName: string) => {
		selectedLabel.includes(labelName)
			? setSelectedLabel(selectedLabel.filter((label) => label !== labelName))
			: setSelectedLabel([...selectedLabel, labelName]);
	};
	return (
		<div className="row mt-5">
			<h1>Infinity Scroll</h1>
			<div className="col-8">
				{isLoading ? (
					<PacmanLoader
						color="#fdff00"
						loading={isLoading}
						size={25}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				) : (
					<IssueList
						issues={issuesQuery?.data?.pages.flat() || []}
						state={state}
						onStateChange={(newState) => setState(newState)}
					/>
				)}
				<div className="d-flex justify-content-center mt-2">
					<button
						disabled={!issuesQuery.hasNextPage}
						type="button"
						className={`btn btn-outline-primary ${
							!issuesQuery.hasNextPage ? "disabled" : ""
						}`}
						onClick={() => issuesQuery.fetchNextPage()}
					>
						<FiLoader className="me-2" />
						Cargar más ...
					</button>
				</div>
			</div>

			<div className="col-4">
				<LabelPicker
					selectedLabel={selectedLabel}
					onChange={(labelName) => onChangeLabel(labelName)}
				/>
			</div>
		</div>
	);
};
