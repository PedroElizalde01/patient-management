import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebounce } from './useDebounce';
import type { Patient } from '../types';
import {
  patientFormSchema,
  type PatientFormData,
} from '../schemas/patientSchema';

interface UsePatientFormProps {
  isOpen: boolean;
  patient?: Patient;
  onClose: () => void;
  onSave: (id: string, data: PatientFormData) => void;
  onCreate?: (data: PatientFormData) => void;
}

export const usePatientForm = ({
  isOpen,
  patient,
  onClose,
  onSave,
  onCreate,
}: UsePatientFormProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isEditMode = !!patient;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues:
      isEditMode && patient
        ? {
            name: patient.name,
            avatar: patient.avatar,
            description: patient.description,
            website: patient.website,
          }
        : {
            name: '',
            avatar: '',
            description: '',
            website: '',
          },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const avatarValue = watch('avatar');

  const nameValue = watch('name');
  const debouncedAvatarValue = useDebounce(avatarValue, 500);

  useEffect(() => {
    if (isOpen) {
      reset(
        isEditMode && patient
          ? {
              name: patient.name,
              avatar: patient.avatar,
              description: patient.description,
              website: patient.website,
            }
          : {
              name: '',
              avatar: '',
              description: '',
              website: '',
            }
      );
    }
  }, [isOpen, patient, isEditMode, reset]);

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

  const onSubmit = (data: PatientFormData) => {
    if (isEditMode && patient) {
      onSave(patient.id, data);
    } else {
      onCreate?.(data);
    }
    reset(data);
    onClose();
  };

  return {
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
  };
};
