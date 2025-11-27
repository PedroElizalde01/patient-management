import { AVATAR_CONFIG } from './constants';

export const buildAvatarFallbackUrl = (name: string): string => {
  const params = new URLSearchParams({
    name: name,
    ...AVATAR_CONFIG.defaultParams,
  });
  
  return `${AVATAR_CONFIG.fallbackApiUrl}?${params}`;
};

