import React from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
import { PatientFormFields } from './PatientFormFields';
import { usePatientForm } from '../../hooks/usePatientForm';
import type { Patient } from '../../types';
import type { PatientFormData } from '../../schemas/patientSchema';

interface PatientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient?: Patient;
  onSave: (id: string, data: PatientFormData) => void;
  onCreate?: (data: PatientFormData) => void;
}

export const PatientFormModal: React.FC<PatientFormModalProps> = ({
  isOpen,
  onClose,
  patient,
  onSave,
  onCreate,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    debouncedAvatarValue,
    nameValue,
    isEditMode,
    showConfirmation,
    handleClose,
    handleConfirmClose,
    handleCancelClose,
    onSubmit,
  } = usePatientForm({ isOpen, onClose, patient, onSave, onCreate });

  const modalTitle = isEditMode ? 'Edit Patient' : 'Add New Patient';
  const submitButtonText = isEditMode ? 'Save Changes' : 'Create';

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
        {submitButtonText}
      </Button>
    </>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={modalTitle}
        footer={footer}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <PatientFormFields
            register={register}
            errors={errors}
            debouncedAvatarValue={debouncedAvatarValue}
            nameValue={nameValue}
            patient={patient}
            isEditMode={isEditMode}
          />
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
