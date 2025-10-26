import {SafeHtml} from '@angular/platform-browser';

export interface DROPDOWN_OPTION {
  label: string;
  value: string;
  icon?: SafeHtml;
  disabled?: boolean;
  separator?: boolean;
} 
  