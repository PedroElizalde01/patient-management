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
      background-color: #007bff;
      color: #f1f9f7;
      border-color: #007bff;

      &:hover:not(:disabled) {
        background-color: #0056b3;
        border-color: #0056b3;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
      }

      &:active:not(:disabled) {
        background-color: #004085;
        border-color: #004085;
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.4);
      }
    `}

  ${({ $variant }) =>
    $variant === 'secondary' &&
    css`
      background-color: transparent;
      color: #6c757d;
      border-color: #6c757d;

      &:hover:not(:disabled) {
        background-color: #6c757d;
        color: #f1f9f7;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
      }
      &:active:not(:disabled) {
        background-color: #5a6268;
        border-color: #5a6268;
        color: #f1f9f7;
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(108, 117, 125, 0.2);
      }
      &:focus-visible {
        box-shadow: 0 0 0 3px rgba(108, 117, 125, 0.4);
      }
    `}

  /* disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

