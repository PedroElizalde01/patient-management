import React from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Avatar } from '../Avatar/Avatar';
import type { Patient } from '../../types';
import type { PatientFormData } from '../../schemas/patientSchema';
import {
  FormGroup,
  Label,
  Input,
  TextArea,
  AvatarPreview,
} from './PatientFormModal.styles';

interface PatientFormFieldsProps {
  register: UseFormRegister<PatientFormData>;
  errors: FieldErrors<PatientFormData>;
  debouncedAvatarValue: string;
  nameValue: string;
  patient?: Patient;
  isEditMode: boolean;
}

export const PatientFormFields: React.FC<PatientFormFieldsProps> = ({
  register,
  errors,
  debouncedAvatarValue,
  nameValue,
  patient,
  isEditMode,
}) => {
  return (
    <>
      {isEditMode && patient && (
        <FormGroup>
          <Label>Patient ID</Label>
          <Input value={patient.id} disabled />
        </FormGroup>
      )}

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
        <Label>Avatar</Label>

        {errors.avatar && (
          <span style={{ color: '#e74c3c', fontSize: '12px' }}>
            {errors.avatar.message}
          </span>
        )}
        <AvatarPreview>
          <Avatar
            src={debouncedAvatarValue}
            name={isEditMode && patient ? patient.name : nameValue || 'NA'}
          />
          <Input
            type="text"
            {...register('avatar')}
            placeholder="Enter avatar URL or text"
            style={errors.avatar ? { borderColor: '#e74c3c' } : {}}
          />
        </AvatarPreview>
      </FormGroup>

      <FormGroup>
        <Label>Website</Label>
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

      {isEditMode && patient && (
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
      )}
    </>
  );
};
