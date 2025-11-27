import React from 'react';
import { MdSearch, MdClose } from 'react-icons/md';
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
          <MdSearch size={20} />
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
            <MdClose size={20} />
          </ClearButton>
        )}
      </SearchInputWrapper>
    </SearchbarContainer>
  );
};
