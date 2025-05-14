import "styles/commons/svgs/CheckBox.scss";

const CheckBox = ({ label, checked = false, onChange }) => {
	return (
		<label className="custom-checkbox-wrapper">
			<input
				type="checkbox"
				defaultChecked={checked}
				onChange={(e) => onChange?.(e.target.checked)}
			/>
			<div className="custom-checkbox">
				<svg
					className="check-icon"
					width="9"
					height="8"
					viewBox="0 0 9 8"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.16064 1.49485C1.50744 3.01898 1.82719 4.59794 2.42296 6.05161C3.08395 7.66441 4.44224 5.65335 5.10323 4.84695C5.98885 3.7665 7.40833 2.07784 8.00829 0.866333"
						stroke="black"
						strokeWidth="1.05348"
						strokeLinecap="round"
					/>
				</svg>
			</div>
			<span className="checkbox-label">{label}</span>
		</label>
	);
};

export default CheckBox;
