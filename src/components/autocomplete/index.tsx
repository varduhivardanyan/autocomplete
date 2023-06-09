import React, { useState } from "react";
import { TOption } from "../../App";

import './index.scss';

interface AutocompleteProps {
  handleInputChange: (value: string) => void;
  error?: string;
  isLoading: boolean;
  fetchOptions: () => void;
  list: TOption[];
  noResult?: string;
	placeholder: string;
  onItemClick: (item: TOption) => void
}

const AutocompleteBlock: React.FC<AutocompleteProps> = ({
  handleInputChange,
  error,
  isLoading,
  fetchOptions,
  list,
  noResult,
	placeholder,
  onItemClick,
}) => {
  const [inputValue, setInputValue] = useState('');

 	const highlightText = (text: string): React.ReactNode => {
		const regex = new RegExp(`(${inputValue})`, 'gi');
		const parts = text.split(regex);

		return parts.map((part, index) =>
			regex.test(part) && inputValue ? <span key={index} className="highlight">{part}</span> : part
		);
	};

  return (
    <div className="autocompleteBlock">
      <input
        type="text"
        onChange={(e) => {
          setInputValue(e.target.value);
          handleInputChange(e.target.value);
        }}
        placeholder={placeholder}
      />

      {error && (
        <div className={`${isLoading ? 'isLoading' : ''} errorBlock`}>
          <span>{error}</span>
          <button onClick={fetchOptions}>Click to retry data loading</button>
        </div>
      )}
      {noResult && (
        <div>
          <span>{noResult}</span>
        </div>
      )}
      <div className="listWrapper">
        {isLoading && (
          <div className="loadingWrapper">
            <div className="loading" />
          </div>
        )}
        {list && !noResult && (
          <ul className={isLoading ? 'isLoading' : ''}>
            {list.map((option) => (
              <li onClick={() => onItemClick(option)} key={option.value}>{inputValue ? highlightText(option.label) : option.label}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutocompleteBlock;