import styled from 'styled-components';

export const ExpandedContent = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
  animation: slideDown 0.3s ease-in-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const InfoSection = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h4`
  margin: 0 0 16px 0;
  font-size: 12px;
  font-weight: 600;
  color: #061e14;
  letter-spacing: 0.05em;
`;

export const InfoGrid = styled.div`
  background-color: rgba(6, 30, 20, 0.02);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoLabel = styled.p`
  margin: 0;
  font-size: 12px;
  color: #6c757d;
`;

export const InfoValue = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #061e14;
  word-break: break-word;
`;
export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;
