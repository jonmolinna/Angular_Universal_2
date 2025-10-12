export interface TOAST_MESSAGE {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
  actions?: TOAST_ACTION[];
  icon?: string;
  timestamp: Date;
}

export interface TOAST_ACTION {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary';
}

export type TOAST_POSITION = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
export type TOAST_SIZE = 'compact' | 'normal' | 'large';