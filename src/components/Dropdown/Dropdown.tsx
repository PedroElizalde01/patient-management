import React, { useState, useRef, useEffect } from 'react';
import { MdSort, MdKeyboardArrowDown } from 'react-icons/md';
import {
  DropdownContainer,
  DropdownButton,
  DropdownLabel,
  DropdownMenu,
  DropdownItem,
  ChevronIcon,
  SortIcon,
} from './Dropdown.styles';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const displayLabel = selectedOption?.label || placeholder;

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        type="button"
      >
        <SortIcon as={MdSort} />
        <DropdownLabel>{displayLabel}</DropdownLabel>
        <ChevronIcon as={MdKeyboardArrowDown} $isOpen={isOpen} />
      </DropdownButton>

      <DropdownMenu $isOpen={isOpen} role="listbox">
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
            $isSelected={option.value === value}
            role="option"
            aria-selected={option.value === value}
            type="button"
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};
