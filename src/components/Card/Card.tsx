import React from 'react';
import { StyledCard } from './Card.styles';

interface CardProps {
  children: React.ReactNode;
  shadow?: boolean;
  padding?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  shadow = false,
  padding = '16px',
  ...rest
}) => {
  return (
    <StyledCard $shadow={shadow} $padding={padding} {...rest}>
      {children}
    </StyledCard>
  );
};

