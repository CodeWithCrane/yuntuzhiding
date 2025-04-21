import "./Spinner.css";

export default function Spinner({
	width = "50px",
	height = "50px"
}) {
	return (
		<div
			style={{
				width,
				height,
				border: "5px solid rgba(0, 0, 0, 0.3)",
				borderTop: "5px solid #3498db",
				borderRadius: "50%",
				animation: "spin 1s linear infinite",
			}}
		/>
	);
}