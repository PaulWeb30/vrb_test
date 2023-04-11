import React, { FC } from 'react';
type IProps = {
	inputValue: string;
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const SearchArticleInput: FC<IProps> = ({ inputValue, handleInputChange }) => {
	return (
		<div className="input_search">
			<label className="form_label">Search article</label>
			<div className="form_input">
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					placeholder="Enter text...."
				/>
			</div>
		</div>
	);
};

export default SearchArticleInput;
