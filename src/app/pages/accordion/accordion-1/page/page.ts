import { Component } from '@angular/core';
import { Accordion } from '../accordion/accordion';
import { AccordionItem } from '../model/accordion.model';

@Component({
  selector: 'app-page',
  imports: [Accordion],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  // State
  expandedItems: string[] = [];
  lastToggled: string = '';

  // Event Handlers
  onItemToggled(event: { id: string; expanded: boolean }): void {
    console.log('🔄 Item toggled:', event);
    this.lastToggled = `${event.id} (${event.expanded ? 'expandido' : 'colapsado'})`;
  }

  onExpandedChanged(expandedIds: string[]): void {
    console.log('📋 Expanded items changed:', expandedIds);
    this.expandedItems = expandedIds;
  }

  // Basic FAQ Items
  basicItems: AccordionItem[] = [
    {
      id: 'faq-1',
      title: '¿Qué es Angular Universal?',
      content:
        'Angular Universal es una tecnología que permite renderizar aplicaciones Angular en el servidor (Server-Side Rendering). Esto mejora el SEO, la velocidad de carga inicial y la experiencia del usuario.',
      icon: '❓',
    },
    {
      id: 'faq-2',
      title: '¿Cómo funciona el SSR?',
      content:
        'El Server-Side Rendering (SSR) genera el HTML completo en el servidor antes de enviarlo al navegador. Esto permite que los motores de búsqueda indexen correctamente el contenido y que los usuarios vean la página más rápidamente.',
      icon: '⚙️',
    },
    {
      id: 'faq-3',
      title: '¿Cuáles son los beneficios?',
      content: `Los principales beneficios incluyen:
        <ul class="list-disc list-inside mt-2 space-y-1">
          <li><strong>Mejor SEO:</strong> Los motores de búsqueda pueden indexar el contenido</li>
          <li><strong>Carga inicial más rápida:</strong> El usuario ve contenido inmediatamente</li>
          <li><strong>Mejor rendimiento:</strong> Especialmente en dispositivos móviles</li>
          <li><strong>Experiencia mejorada:</strong> Menos tiempo de espera</li>
        </ul>`,
      icon: '🚀',
    },
    {
      id: 'faq-4',
      title: '¿Es compatible con todas las librerías?',
      content:
        'No todas las librerías son compatibles con SSR. Las librerías que dependen del DOM del navegador necesitan configuración especial o alternativas compatibles con el servidor.',
      icon: '📚',
      disabled: false,
    },
  ];

  // Features Items
  featuresItems: AccordionItem[] = [
    {
      id: 'feature-1',
      title: 'Componentes Reutilizables',
      content:
        'Nuestros componentes están diseñados para ser completamente reutilizables en diferentes contextos y proyectos. Cada componente es standalone y puede ser importado individualmente.',
      icon: '🧩',
      badge: 'New',
    },
    {
      id: 'feature-2',
      title: 'Tailwind CSS Integrado',
      content:
        'Utilizamos Tailwind CSS para estilos modernos, responsivos y altamente personalizables. Todos los componentes incluyen clases utilitarias optimizadas.',
      icon: '🎨',
    },
    {
      id: 'feature-3',
      title: 'TypeScript Completo',
      content:
        'Todos los componentes están completamente tipados con TypeScript, proporcionando autocompletado, detección de errores en tiempo de compilación y mejor experiencia de desarrollo.',
      icon: '📝',
      badge: 'Pro',
    },
  ];

  // Services Items
  servicesItems: AccordionItem[] = [
    {
      id: 'service-1',
      title: 'Desarrollo Web',
      content:
        'Creamos aplicaciones web modernas utilizando las últimas tecnologías como Angular, React, Vue.js. Nos especializamos en Progressive Web Apps (PWA) y Single Page Applications (SPA).',
      icon: '🌐',
      badge: '5⭐',
    },
    {
      id: 'service-2',
      title: 'Desarrollo Mobile',
      content:
        'Desarrollamos aplicaciones móviles nativas e híbridas para iOS y Android. Utilizamos tecnologías como React Native, Flutter e Ionic para crear experiencias móviles excepcionales.',
      icon: '📱',
      badge: 'Popular',
    },
    {
      id: 'service-3',
      title: 'Consultoría Técnica',
      content:
        'Ofrecemos servicios de consultoría para ayudar a tu empresa a tomar las mejores decisiones tecnológicas. Auditamos código, arquitectura y procesos de desarrollo.',
      icon: '💡',
    },
  ];

  // Custom Items (for custom content projection)
  customItems: AccordionItem[] = [
    {
      id: 'pricing',
      title: 'Planes y Precios', // This will be overridden by custom header
      content: '', // This will be overridden by custom content
    },
    {
      id: 'team',
      title: 'Nuestro Equipo', // This will be overridden by custom header
      content: '', // This will be overridden by custom content
    },
    {
      id: 'contact',
      title: 'Información de Contacto',
      content: `
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center space-x-3">
              <span class="text-2xl">📧</span>
              <div>
                <p class="font-semibold text-gray-900">Email</p>
                <p class="text-gray-600">contacto@ejemplo.com</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-2xl">📞</span>
              <div>
                <p class="font-semibold text-gray-900">Teléfono</p>
                <p class="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-2xl">📍</span>
              <div>
                <p class="font-semibold text-gray-900">Dirección</p>
                <p class="text-gray-600">123 Main St, Ciudad</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-2xl">🕒</span>
              <div>
                <p class="font-semibold text-gray-900">Horario</p>
                <p class="text-gray-600">Lun - Vie: 9:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>
      `,
      icon: '📞',
    },
  ];

  // Settings Items
  settingsItems: AccordionItem[] = [
    {
      id: 'general',
      title: 'Configuración General',
      content: `
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Notificaciones por email</span>
            <input type="checkbox" checked class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Modo oscuro</span>
            <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Actualizaciones automáticas</span>
            <input type="checkbox" checked class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
          </div>
        </div>
      `,
      icon: '⚙️',
    },
    {
      id: 'privacy',
      title: 'Privacidad y Seguridad',
      content: `
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Perfil público</span>
            <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Autenticación de dos factores</span>
            <input type="checkbox" checked class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Compartir datos de análisis</span>
            <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
          </div>
        </div>
      `,
      icon: '🔒',
    },
    {
      id: 'notifications',
      title: 'Notificaciones',
      content: `
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Notificaciones push</span>
            <input type="checkbox" checked class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Notificaciones de marketing</span>
            <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Resumen semanal</span>
            <input type="checkbox" checked class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
          </div>
        </div>
      `,
      icon: '🔔',
    },
  ];
}
