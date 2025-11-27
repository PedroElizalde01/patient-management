import React, { useState } from 'react';
import { StyledAvatar, Initials } from './Avatar.styles';

interface AvatarProps {
  src?: string;
  name: string;
  alt?: string;
}

const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].substring(0, 2);
  }
  return words[0][0] + words[words.length - 1][0];
};

export const Avatar: React.FC<AvatarProps> = ({ src, name, alt }) => {
  const [state, setState] = useState({ imageError: false, currentSrc: src });

  if (state.currentSrc !== src) {
    setState({ imageError: false, currentSrc: src });
  }

  const handleError = () => {
    if (!state.imageError) {
      setState({ imageError: true, currentSrc: src });
    }
  };

  if (!src || state.imageError) {
    return <Initials>{getInitials(name)}</Initials>;
  }

  return <StyledAvatar src={src} alt={alt || name} onError={handleError} />;
};
