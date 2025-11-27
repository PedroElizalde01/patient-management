import { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import {
  ExpandedContent,
  InfoLabel,
  InfoItem,
  InfoValue,
  InfoGrid,
  InfoSection,
  SectionTitle,
  ButtonContainer,
  DescriptionValue,
} from './PatientContent.styles';
import type { Patient } from '../../data/mockPatients';
import { Button } from '../Button/Button';
import { PatientFormModal } from '../PatientFormModal/PatientFormModal';

export const PatientContent = ({
  patient,
  onDelete,
  onUpdate,
}: {
  patient: Patient;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, updatedData: Partial<Patient>) => void;
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const fullDate = new Date(patient.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ExpandedContent>
      <InfoSection>
        <SectionTitle>PERSONAL INFORMATION</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Patient ID</InfoLabel>
            <InfoValue>{patient.id}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Member Since</InfoLabel>
            <InfoValue>{fullDate}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Website</InfoLabel>
            <InfoValue>{patient.website}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </InfoSection>

      <InfoSection>
        <SectionTitle>DESCRIPTION</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <DescriptionValue>{patient.description}</DescriptionValue>
          </InfoItem>
        </InfoGrid>
      </InfoSection>
      <ButtonContainer>
        <Button
          style={{ flex: 1, gap: '8px' }}
          onClick={() => setIsEditModalOpen(true)}
        >
          <MdEdit size={20} />
          Edit
        </Button>
        <Button
          variant="delete"
          style={{ flex: 1, gap: '8px' }}
          onClick={() => onDelete?.(patient.id)}
        >
          <MdDelete size={20} />
          Delete
        </Button>
      </ButtonContainer>

      {onUpdate && (
        <PatientFormModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          patient={patient}
          onSave={onUpdate}
        />
      )}
    </ExpandedContent>
  );
};
