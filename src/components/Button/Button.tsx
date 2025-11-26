import React, { type ReactNode } from 'react';
import { StyledButton } from './Button.styles';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
  ...rest
}) => {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      $variant={variant}
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

