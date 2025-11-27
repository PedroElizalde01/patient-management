import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
import { Avatar } from '../Avatar/Avatar';
import { useDebounce } from '../../hooks/useDebounce';
import type { Patient } from '../../types';
import {
  patientEditSchema,
  type PatientEditFormData,
} from '../../schemas/patientSchema';
import {
  FormGroup,
  Label,
  Input,
  TextArea,
  AvatarPreview,
} from './EditPatientModal.styles';

interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
  onSave: (id: string, updatedData: Partial<Patient>) => void;
}

export const EditPatientModal: React.FC<EditPatientModalProps> = ({
  isOpen,
  onClose,
  patient,
  onSave,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<PatientEditFormData>({
    resolver: zodResolver(patientEditSchema),
    defaultValues: {
      name: patient.name,
      avatar: patient.avatar,
      description: patient.description,
      website: patient.website,
    },
  });

  const avatarValue = watch('avatar');
  const debouncedAvatarValue = useDebounce(avatarValue, 500);

  // Reset form when patient changes or modal opens
  useEffect(() => {
    if (isOpen) {
      reset({
        name: patient.name,
        avatar: patient.avatar,
        description: patient.description,
        website: patient.website,
      });
    }
  }, [isOpen, patient, reset]);

  const handleClose = () => {
    if (isDirty) {
      setShowConfirmation(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmation(false);
    reset();
    onClose();
  };

  const handleCancelClose = () => {
    setShowConfirmation(false);
  };

  const onSubmit = (data: PatientEditFormData) => {
    onSave(patient.id, data);
    reset(data); // Reset with new values so isDirty becomes false
    onClose();
  };

  const footer = (
    <>
      <Button onClick={handleClose} variant="delete" style={{ flex: 1 }}>
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={handleSubmit(onSubmit)}
        style={{ flex: 1 }}
      >
        Save Changes
      </Button>
    </>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Edit Patient"
        footer={footer}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Patient ID</Label>
            <Input value={patient.id} disabled />
          </FormGroup>

          <FormGroup>
            <Label>Name *</Label>
            <Input
              type="text"
              {...register('name')}
              placeholder="Enter patient name"
              style={errors.name ? { borderColor: '#e74c3c' } : {}}
            />
            {errors.name && (
              <span style={{ color: '#e74c3c', fontSize: '12px' }}>
                {errors.name.message}
              </span>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Avatar URL *</Label>
            <Input
              type="text"
              {...register('avatar')}
              placeholder="Enter avatar URL"
              style={errors.avatar ? { borderColor: '#e74c3c' } : {}}
            />
            {errors.avatar && (
              <span style={{ color: '#e74c3c', fontSize: '12px' }}>
                {errors.avatar.message}
              </span>
            )}
            <AvatarPreview>
              <Avatar src={debouncedAvatarValue} name={patient.name} />
              <span>Avatar Preview</span>
            </AvatarPreview>
          </FormGroup>

          <FormGroup>
            <Label>Website *</Label>
            <Input
              type="text"
              {...register('website')}
              placeholder="Enter website URL"
              style={errors.website ? { borderColor: '#e74c3c' } : {}}
            />
            {errors.website && (
              <span style={{ color: '#e74c3c', fontSize: '12px' }}>
                {errors.website.message}
              </span>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Description *</Label>
            <TextArea
              {...register('description')}
              placeholder="Enter patient description"
              style={errors.description ? { borderColor: '#e74c3c' } : {}}
            />
            {errors.description && (
              <span style={{ color: '#e74c3c', fontSize: '12px' }}>
                {errors.description.message}
              </span>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Member Since</Label>
            <Input
              value={new Date(patient.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              disabled
            />
          </FormGroup>
        </form>
      </Modal>

      <ConfirmationModal
        isOpen={showConfirmation}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to close without saving?"
        confirmText="Discard Changes"
        cancelText="Keep Editing"
        confirmVariant="delete"
        onConfirm={handleConfirmClose}
        onCancel={handleCancelClose}
      />
    </>
  );
};
