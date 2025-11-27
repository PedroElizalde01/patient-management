import styled, { css } from 'styled-components';

interface StyledButtonProps {
  $variant: 'primary' | 'secondary';
  $fullWidth?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: inherit;
  outline: none;
  text-decoration: none;

  /* variants */
  ${({ $variant }) =>
    $variant === 'primary' &&
    css`
      background-color: #2dd397; /* --primary */
      color: #f1f9f7; /* --background */
      border-color: #2dd397; /* --primary */

      &:hover:not(:disabled) {
        background-color: #4cc096;
        border-color: #4cc096;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(6, 30, 20, 0.3);
      }

      &:active:not(:disabled) {
        background-color: #29976f;
        border-color: #29976f;
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(6, 30, 20, 0.4);
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px rgba(45, 211, 151, 0.4);
      }
    `}

  ${({ $variant }) =>
    $variant === 'secondary' &&
    css`
      background-color: transparent;
      color: #6937c3; /* --secondary */
      border-color: #6937c3; /* --secondary */

      &:hover:not(:disabled) {
        background-color: #6937c3; /* --secondary */
        color: #f1f9f7; /* --background */
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(6, 30, 20, 0.3);
      }

      &:active:not(:disabled) {
        background-color: #6f2476; /* --accent */
        border-color: #6f2476; /* --accent */
        color: #f1f9f7; /* --background */
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(6, 30, 20, 0.4);
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px rgba(105, 55, 195, 0.4);
      }
    `}

  /* disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
