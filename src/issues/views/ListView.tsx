import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import { useIssues } from "../../hooks";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";

export const ListView = () => {
	const [selectedLabel, setSelectedLabel] = useState<string[]>([]);

	const { issuesQuery } = useIssues();

	const { isLoading } = issuesQuery;

	const onChangeLabel = (labelName: string) => {
		selectedLabel.includes(labelName)
			? setSelectedLabel(selectedLabel.filter((label) => label !== labelName))
			: setSelectedLabel([...selectedLabel, labelName]);
	};
	return (
		<div className="row mt-5">
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
					<IssueList issues={issuesQuery?.data || []} />
				)}
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
