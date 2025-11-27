import React from 'react';
import { Button } from '../Button/Button';
import {
  ConfirmOverlay,
  ConfirmContent,
  ConfirmTitle,
  ConfirmMessage,
  ConfirmButtons,
} from './ConfirmationModal.styles';

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
  if (!isOpen) return null;

  return (
    <ConfirmOverlay onClick={onCancel}>
      <ConfirmContent onClick={(e) => e.stopPropagation()}>
        <ConfirmTitle>{title}</ConfirmTitle>
        <ConfirmMessage>{message}</ConfirmMessage>
        <ConfirmButtons>
          <Button onClick={onCancel} style={{ flex: 1 }}>
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            style={{ flex: 1 }}
          >
            {confirmText}
          </Button>
        </ConfirmButtons>
      </ConfirmContent>
    </ConfirmOverlay>
  );
};
