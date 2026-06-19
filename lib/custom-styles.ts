// Custom styles management for LandingForge
import { DesignStyle } from "./design-styles";

const CUSTOM_STYLES_KEY = 'customDesignStyles';

export const saveCustomStyle = (style: DesignStyle): void => {
  if (typeof window === 'undefined') return;
  try {
    const existing = getCustomStyles();
    const updated = [...existing, style];
    localStorage.setItem(CUSTOM_STYLES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving custom style:', error);
  }
};

export const getCustomStyles = (): DesignStyle[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(CUSTOM_STYLES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading custom styles:', error);
    return [];
  }
};

export const deleteCustomStyle = (id: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const existing = getCustomStyles();
    const filtered = existing.filter(style => style.id !== id);
    localStorage.setItem(CUSTOM_STYLES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting custom style:', error);
  }
};
