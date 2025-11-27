import styled, { css } from 'styled-components';

interface StyledPatientCardProps {
  $shadow?: boolean;
  $padding?: string;
}

export const StyledPatientCard = styled.div<StyledPatientCardProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background-color: #f1f9f7;
  color: #061e14
  border: 1px solid #e0e0e0;
  transition: box-shadow 0.2s ease-in-out;
  padding: ${({ $padding }) => $padding || '16px'};

  ${({ $shadow }) =>
    $shadow &&
    css`
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1),
                  0 4px 16px rgba(0, 0, 0, 0.08);
                  &:hover {
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.12),
                  0 16px 24px rgba(0, 0, 0, 0.1);
      }
    `}
`;
