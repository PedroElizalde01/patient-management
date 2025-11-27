import React, { useState } from 'react';
import {
  StyledPatientCard,
  CardHeader,
  HeaderContent,
  AvatarWrapper,
  PatientInfo,
  PatientName,
  MemberDate,
  ExpandButton,
} from './PatientCard.styles';
import type { Patient } from '../../data/mockPatients';
import { Avatar } from '../index';
import { formatDate } from '../../utils';
import { PatientContent } from './PatientContent';

interface PatientCardProps {
  shadow?: boolean;
  padding?: string;
  patient: Patient;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  shadow = false,
  padding = '16px',
  patient,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <StyledPatientCard $shadow={shadow} $padding={padding}>
      <CardHeader onClick={toggleExpand}>
        <HeaderContent>
          <AvatarWrapper>
            <Avatar src={patient.avatar} name={patient.name} />
          </AvatarWrapper>
          <PatientInfo>
            <PatientName>{patient.name}</PatientName>
            <MemberDate>Member {formatDate(patient.createdAt)}</MemberDate>
          </PatientInfo>
        </HeaderContent>
        <ExpandButton $isExpanded={isExpanded}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </ExpandButton>
      </CardHeader>

      {isExpanded && <PatientContent patient={patient} />}
    </StyledPatientCard>
  );
};
