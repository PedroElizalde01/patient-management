import styled, { css } from 'styled-components';

interface StyledButtonProps {
  $variant: 'primary' | 'secondary' | 'delete';
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

  /* Common style for outlined buttons with theme colors (secondary, delete) */
  ${({ $variant }) => {
    let main, accent, focus, hoverBoxShadow, activeBoxShadow;
    if ($variant === 'secondary') {
      main = '#6937c3';
      accent = '#6f2476';
      focus = 'rgba(105, 55, 195, 0.4)';
      hoverBoxShadow = '0 4px 8px rgba(6, 30, 20, 0.3)';
      activeBoxShadow = '0 2px 4px rgba(6, 30, 20, 0.4)';
    } else if ($variant === 'delete') {
      main = 'rgb(195, 55, 55)';
      accent = 'rgb(118, 36, 36)';
      focus = 'rgba(195, 55, 55, 0.4)';
      hoverBoxShadow = '0 4px 8px rgba(30, 6, 6, 0.3)';
      activeBoxShadow = '0 2px 4px rgba(30, 7, 6, 0.4)';
    }

    return (
      ($variant === 'secondary' || $variant === 'delete') &&
      css`
        background-color: transparent;
        color: ${main};
        border-color: ${main};

        &:hover:not(:disabled) {
          background-color: ${main};
          color: #f1f9f7; /* --background */
          transform: translateY(-1px);
          box-shadow: ${hoverBoxShadow};
        }

        &:active:not(:disabled) {
          background-color: ${accent};
          border-color: ${accent};
          color: #f1f9f7; /* --background */
          transform: translateY(0);
          box-shadow: ${activeBoxShadow};
        }

        &:focus-visible {
          box-shadow: 0 0 0 3px ${focus};
        }
      `
    );
  }}
  /* disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
