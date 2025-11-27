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
} from './PatientContent.styles';
import type { Patient } from '../../data/mockPatients';
import { Button } from '../Button/Button';

export const PatientContent = ({ patient }: { patient: Patient }) => {
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
            <InfoValue>{patient.description}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </InfoSection>
      <ButtonContainer>
        <Button style={{ flex: 1, gap: '8px' }}>
          <MdEdit size={20} />
          Edit
        </Button>
        <Button variant="delete" style={{ flex: 1, gap: '8px' }}>
          <MdDelete size={20} />
          Delete
        </Button>
      </ButtonContainer>
    </ExpandedContent>
  );
};
