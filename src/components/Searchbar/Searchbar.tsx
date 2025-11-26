import React from 'react';
import {
  SearchbarContainer,
  SearchInputWrapper,
  SearchIcon,
  StyledSearchInput,
  ClearButton,
} from './Searchbar.styles';

interface SearchbarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showResults?: boolean;
  resultsCount?: number;
}

const SearchIconSVG: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const ClearIconSVG: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export const Searchbar: React.FC<SearchbarProps> = ({
  value,
  onChange,
  placeholder = 'Search patients by name...',
}) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <SearchbarContainer>
      <SearchInputWrapper>
        <SearchIcon>
          <SearchIconSVG />
        </SearchIcon>

        <StyledSearchInput
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search patients"
        />

        {value && (
          <ClearButton
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            <ClearIconSVG />
          </ClearButton>
        )}
      </SearchInputWrapper>
    </SearchbarContainer>
  );
};
