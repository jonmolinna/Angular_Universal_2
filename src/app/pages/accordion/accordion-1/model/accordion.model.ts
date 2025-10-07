export interface AccordionItem {
  id: string;
  title: string;
  content?: string;
  disabled?: boolean;
  icon?: string;
  badge?: string | number;
}

export type AccordionMode = 'single' | 'multiple';
export type AccordionVariant = 'default' | 'bordered' | 'separated' | 'filled';
