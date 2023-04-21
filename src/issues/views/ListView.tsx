import { useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { PacmanLoader } from "react-spinners";
import { useIssues } from "../../hooks";
import { State } from "../../types/types";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
export const ListView = () => {
	const [selectedLabel, setSelectedLabel] = useState<string[]>([]);
	const [state, setState] = useState<State>();

	const { issuesQuery, page, nextPage, prevPage } = useIssues({
		state,
		labels: selectedLabel,
	});
	const { isLoading, isFetching } = issuesQuery;

	const onChangeLabel = (labelName: string) => {
		selectedLabel.includes(labelName)
			? setSelectedLabel(selectedLabel.filter((label) => label !== labelName))
			: setSelectedLabel([...selectedLabel, labelName]);
	};

	const iconStyles = { color: "white", fontSize: "1.5em" };
	return (
		<div className="row mt-5">
			<h1>Vista Paginada</h1>
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
						issues={issuesQuery?.data || []}
						state={state}
						onStateChange={(newState) => setState(newState)}
					/>
				)}
				<div className="d-flex justify-content-between align-items-center mt-2">
					<button
						type="button"
						className="btn btn-sm btn-outline-primary"
						onClick={prevPage}
						disabled={isFetching}
					>
						<FcPrevious style={iconStyles} />
					</button>
					<span>
						{isFetching ? <PacmanLoader size={10} color="white" /> : page}
					</span>
					<button
						type="button"
						className={`btn btn-sm btn-outline-primary ${
							isFetching ? "disabled" : ""
						}`}
						color="white"
						onClick={nextPage}
						disabled={isFetching}
					>
						<FcNext style={iconStyles} />
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
