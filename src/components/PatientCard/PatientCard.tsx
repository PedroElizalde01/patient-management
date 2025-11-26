import React from 'react';
import { StyledPatientCard } from './PatientCard.styles';
import type { Patient } from '../../data/mockPatients';

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
  return (
    <StyledPatientCard $shadow={shadow} $padding={padding}>
      <img src={patient.avatar} alt={patient.name} />
      <p>{patient.name}</p>
    </StyledPatientCard>
  );
};
