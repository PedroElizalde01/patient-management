import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
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
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, updatedData: Partial<Patient>) => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  shadow = false,
  padding = '16px',
  patient,
  onDelete,
  onUpdate,
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
          <MdKeyboardArrowDown size={24} />
        </ExpandButton>
      </CardHeader>

      {isExpanded && (
        <PatientContent
          patient={patient}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      )}
    </StyledPatientCard>
  );
};
