export interface CARD_ACTION {
    label: string;
    action: () => void;
    icon?: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    disabled?: boolean;
    loading?: boolean;
}

export interface CARD_BADGE {
    text: string;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    icon?: string;
}

export type CARD_VARIANT = 'default' | 'outlined' | 'elevated' | 'flat' | 'bordered';
export type CARD_SIZE = 'sm' | 'md' | 'lg' | 'xl';
export type CARD_RADIUS = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type CARD_SHADOW = 'none' | 'sm' | 'md' | 'lg' | 'xl';