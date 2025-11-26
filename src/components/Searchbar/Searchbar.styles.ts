import styled from 'styled-components';

export const SearchbarContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  display: flex;
  align-items: center;
  color: #6c757d;
  pointer-events: none;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const StyledSearchInput = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  font-size: 16px;
  font-family: inherit;
  color: #212529;
  background-color: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  outline: none;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: #adb5bd;
  }

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &:hover:not(:focus) {
    border-color: #b0b0b0;
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: #6c757d;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.2s ease-in-out;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    opacity: 1;
    background-color: #f0f0f0;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const SearchResults = styled.div`
  margin-top: 8px;
  padding: 8px 16px;
  font-size: 14px;
  color: #6c757d;
  text-align: center;
`;

