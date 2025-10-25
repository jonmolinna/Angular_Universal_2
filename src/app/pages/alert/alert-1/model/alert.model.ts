export interface ALERT_ACTION {
    label: string;
    action: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    icon?: string;
    disabled?: boolean;
}

export type ALERT_VARIANT = 'success' | 'error' | 'warning' | 'info' | 'neutral';
export type ALERT_SIZE = 'sm' | 'md' | 'lg';
export type ALERT_POSITION = 'top' | 'bottom' | 'relative';
export type ALERT_BORDER = 'none' | 'left' | 'top' | 'full';
export type ALERT_STYLE = 'filled' | 'outlined' | 'soft' | 'minimal';

export interface ALERT_CONFIG {
    variant: ALERT_VARIANT
}