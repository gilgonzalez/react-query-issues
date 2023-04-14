import { CSSProperties, FC } from "react";
import { PacmanLoader } from "react-spinners";
import { useLabels } from "../../hooks";

/**CON FETCH */
// const getLabelsFromAPI = async () => {
// 	const res = await fetch("https://api.github.com/repos/facebook/react/labels");
// 	const data = await res.json();
// 	return data;
// };

interface Props {
	selectedLabel: string[];
	onChange: (labelName: string) => void;
}

/**CON AXIOS */

export const LabelPicker: FC<Props> = ({ selectedLabel, onChange }) => {
	const { labelsQuery } = useLabels();
	const { data, isLoading } = labelsQuery;

	if (isLoading) {
		return (
			<PacmanLoader
				color="#fdff00"
				loading={isLoading}
				cssOverride={override}
				size={25}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		);
	}

	return (
		<div>
			{data?.map((label) => (
				// rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<span
					key={label.id}
					className={`badge rounded-pill m-1 label-picker ${
						selectedLabel.includes(label.name) ? "label-active" : ""
					}`}
					style={{
						border: `1px solid #${label.color}`,
						color: `#${label.color}`,
					}}
					onClick={() => onChange(label.name)}
				>
					{label.name}
				</span>
			))}
		</div>
	);
};

const override: CSSProperties = {
	display: "block",
	margin: "0 auto",
	borderColor: "red",
};
