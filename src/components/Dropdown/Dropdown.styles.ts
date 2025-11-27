import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  min-width: 200px;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

export const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #212529;
  background-color: #ffffff;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: inherit;
  outline: none;
  gap: 8px;

  &:hover:not(:disabled) {
    border-color: #2dd397;
    background-color: #f8f9fa;
  }

  &:focus-visible {
    border-color: #2dd397;
    box-shadow: 0 0 0 3px rgba(45, 211, 151, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    transition: transform 0.2s ease-in-out;
  }

  @media (max-width: 768px) {
    padding: 12px;
    min-width: 48px;
    justify-content: center;
  }
`;

export const SortIcon = styled.svg`
  color: #2dd397;
`;

export const DropdownLabel = styled.span`
  flex: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateY(0)' : 'translateY(-8px)'};
  transition: all 0.2s ease-in-out;
  min-width: 200px;

  @media (max-width: 768px) {
    left: auto;
    right: 0;
    min-width: 180px;
  }
`;

export const DropdownItem = styled.button<{ $isSelected?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: ${({ $isSelected }) => ($isSelected ? '600' : '400')};
  color: ${({ $isSelected }) => ($isSelected ? '#2dd397' : '#212529')};
  background-color: ${({ $isSelected }) =>
    $isSelected ? '#f1f9f7' : 'transparent'};
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  font-family: inherit;
  outline: none;

  &:hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? '#f1f9f7' : '#f8f9fa'};
  }

  &:focus-visible {
    background-color: #f8f9fa;
    outline: 2px solid #2dd397;
    outline-offset: -2px;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f1f3f5;
  }
`;

export const ChevronIcon = styled.svg<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};

  @media (max-width: 768px) {
    display: none;
  }
`;
