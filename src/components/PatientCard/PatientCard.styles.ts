import styled, { css } from 'styled-components';

interface StyledPatientCardProps {
  $shadow?: boolean;
  $padding?: string;
}

interface ExpandButtonProps {
  $isExpanded: boolean;
}

export const StyledPatientCard = styled.div<StyledPatientCardProps>`
  border-radius: 24px;
  background-color: #f1f9f7;
  color: #061e14;
  border: 1px solid #e0e0e0;
  transition: box-shadow 0.2s ease-in-out;
  padding: ${({ $padding }) => $padding || '16px'};
  overflow: hidden;

  ${({ $shadow }) =>
    $shadow &&
    css`
      box-shadow:
        0 2px 8px rgba(0, 0, 0, 0.1),
        0 4px 16px rgba(0, 0, 0, 0.08);
      &:hover {
        box-shadow:
          0 8px 12px rgba(0, 0, 0, 0.12),
          0 16px 24px rgba(0, 0, 0, 0.1);
      }
    `}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

export const AvatarWrapper = styled.div`
  flex-shrink: 0;
`;

export const PatientInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PatientName = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #061e14;
`;

export const MemberDate = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6c757d;
`;

export const ExpandButton = styled.button<ExpandButtonProps>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #061e14;
  transition: transform 0.3s ease-in-out;
  border-radius: 8px;

  ${({ $isExpanded }) =>
    $isExpanded &&
    css`
      transform: rotate(180deg);
    `}

  &:hover {
    background-color: rgba(6, 30, 20, 0.05);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
