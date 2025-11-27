import React from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { ConfirmMessage, ConfirmButtons } from './ConfirmationModal.styles';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'secondary' | 'delete';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
}) => {
  const footer = (
    <ConfirmButtons>
      <Button onClick={onCancel}>{cancelText}</Button>
      <Button variant={confirmVariant} onClick={onConfirm}>
        {confirmText}
      </Button>
    </ConfirmButtons>
  );

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} footer={footer}>
      <ConfirmMessage>{message}</ConfirmMessage>
    </Modal>
  );
};
