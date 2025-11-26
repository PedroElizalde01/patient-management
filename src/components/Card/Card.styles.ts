import styled, { css } from 'styled-components';

interface StyledCardProps {
  $shadow?: boolean;
  $padding?: string;
}

export const StyledCard = styled.div<StyledCardProps>`
  background-color: #f1f9f7;
  color: #061e14
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  transition: box-shadow 0.2s ease-in-out;
  padding: ${({ $padding }) => $padding || '16px'};

  ${({ $shadow }) =>
    $shadow &&
    css`
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1),
                  0 4px 16px rgba(0, 0, 0, 0.08);
                  &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12),
                  0 8px 24px rgba(0, 0, 0, 0.1);
      }
    `}
`;

