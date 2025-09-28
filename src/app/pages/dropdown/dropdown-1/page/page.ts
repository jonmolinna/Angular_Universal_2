import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { Dropdown } from '../dropdown/dropdown/dropdown';
import { DROPDOWN_OPTION } from '../dropdown/model/dropdown.model';

@Component({
  selector: 'app-page',
  imports: [Dropdown],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  //--------- DROPDOWN OPTIONS 1
  private selectOptionDropdown1: WritableSignal<string> = signal('Select an Option');

  readonly titleDropdown1 = computed<Signal<string>>(() => this.selectOptionDropdown1.asReadonly());

  // Option 1
  options: DROPDOWN_OPTION[] = [
    {
      label: 'My Account',
      value: 'my_account',
    },
    {
      label: 'Profile',
      value: 'profile',
    },
    {
      label: 'Billing',
      value: 'billing',
    },
    {
      label: 'Settings',
      value: 'settings',
      disabled: true,
    },
  ];

  handleSelectOptionDropdown1(option: DROPDOWN_OPTION): void {
    this.selectOptionDropdown1.set(option.label);
  }

  //--------- DROPDOWN OPTIONS 2
  private selectOptionDropdown2: WritableSignal<string> = signal('Select an Option');

  readonly titleDropdown2 = computed<Signal<string>>(() => this.selectOptionDropdown2.asReadonly());

  // Option 1
  options2: DROPDOWN_OPTION[] = [
    {
      label: 'Editar',
      value: 'edit',
      icon: '✏️',
    },
    {
      label: 'Duplicar',
      value: 'duplicate',
      icon: '📋',
    },
    {
      label: 'Compartir',
      value: 'share',
      icon: '🔗',
    },
    {
      separator: true,
      label: '',
      value: '',
    },
    {
      label: 'Eliminar',
      value: 'delete',
      icon: '🗑️',
    },
  ];

  handleSelectOptionDropdown2(option: DROPDOWN_OPTION): void {
    this.selectOptionDropdown2.set(option.label);

    this.handleAction(option.value);
  }

  private handleAction(actionValue: string): void {
    switch (actionValue) {
      case 'edit':
        console.log('✏️ Editando elemento...');
        // Tu lógica de edición
        break;
      case 'duplicate':
        console.log('📋 Duplicando elemento...');
        // Tu lógica de duplicación
        break;
      case 'share':
        console.log('🔗 Compartiendo elemento...');
        // Tu lógica de compartir
        break;
      case 'delete':
        console.log('🗑️ Eliminando elemento...');
        // Tu lógica de eliminación
        break;
    }
  }

  //  EJEMPLO 3: Dropdown personalizado
  private selectOptionDropdown3: WritableSignal<string> = signal('Select an Option');

  readonly titleDropdown3 = computed<Signal<string>>(() => this.selectOptionDropdown3.asReadonly());

  // EJEMPLO 4: Múltiples dropdowns
  private selectedFilter = signal('all');
  private selectedSort = signal('name_asc');

  readonly filterTitle = computed<Signal<string>>(() => {
    const selected = this.filterOptions.find(opt => opt.value === this.selectedFilter());
    return signal(selected?.label || 'Filtrar');
  });
  
  readonly sortTitle = computed<Signal<string>>(() => {
    const selected = this.sortOptions.find(opt => opt.value === this.selectedSort());
    return signal(selected?.label || 'Ordenar');
  });

  filterOptions: DROPDOWN_OPTION[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Activos', value: 'active' },
    { label: 'Inactivos', value: 'inactive' },
    { label: 'Pendientes', value: 'pending' },
  ];

  // Opciones de ordenamiento
  sortOptions: DROPDOWN_OPTION[] = [
    { label: 'Nombre A-Z', value: 'name_asc' },
    { label: 'Nombre Z-A', value: 'name_desc' },
    { label: 'Fecha más reciente', value: 'date_desc' },
    { label: 'Fecha más antigua', value: 'date_asc' },
  ];

  onFilterSelect(option: DROPDOWN_OPTION) {
    this.selectedFilter.set(option.value);
    this.applyFilter(option.value);
    console.log('Filtro aplicado:', option.value);
  }

  onSortSelect(option: DROPDOWN_OPTION) {
    this.selectedSort.set(option.value);
    this.applySort(option.value);
    console.log('Ordenamiento aplicado:', option.value);
  }

  private applyFilter(filterValue: string): void {
    // Implementa tu lógica de filtrado aquí
    console.log('Aplicando filtro:', filterValue);
  }

  private applySort(sortValue: string): void {
    // Implementa tu lógica de ordenamiento aquí
    console.log('Aplicando ordenamiento:', sortValue);
  }
}
