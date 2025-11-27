import React, { useState, useEffect, useMemo } from 'react';
import { StyledAvatar } from './Avatar.styles';
import { buildAvatarFallbackUrl } from './utils';

interface AvatarProps {
  src?: string;
  name: string;
  alt?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, alt }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [src]);

  const fallbackUrl = useMemo(() => buildAvatarFallbackUrl(name), [name]);

  const imageUrl = !src || imageError ? fallbackUrl : src;

  const handleError = () => {
    if (!imageError) {
      setImageError(true);
    }
  };

  return (
    <StyledAvatar
      src={imageUrl}
      alt={alt || name}
      onError={handleError}
    />
  );
};