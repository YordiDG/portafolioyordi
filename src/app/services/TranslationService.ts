import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = new BehaviorSubject<string>('es');
  currentLanguage$ = this.currentLang.asObservable();

  private translations: Translations = {
    es: {
      // Navegación
      'nav.home': 'Inicio',
      'nav.about': 'Sobre Mí',
      'nav.projects': 'Proyectos',
      'nav.contact': 'Contacto',
      'nav.skills': 'Habilidades',
      'nav.brand': 'Victor',
      'nav.brand.subtitle': 'Freelancer',
      'nav.language.spanish': 'ESPAÑOL',
      'nav.language.english': 'ENGLISH',

      // Hero Section
      'hero.greeting': 'Hola, soy',
      'hero.name': 'Víctor Yordi',
      'hero.title': '¡Hola! Soy Victor Diaz',
      'hero.subtitle': 'Desarrollador Full Stack',
      'hero.description': 'Ingeniero de Software de 23 años especializado en desarrollo full stack con experiencia en Angular, React, Vue.js, Spring Boot, y desarrollo móvil con Flutter. Apasionado por crear soluciones tecnológicas innovadoras para empresas de todos los sectores.',
      'hero.stats.projects': 'Proyectos Completados',
      'hero.stats.experience': 'Años de Experiencia',
      'hero.stats.technologies': 'Tecnologías Dominadas',
      'hero.btn.view-projects': 'Ver Proyectos',
      'hero.btn.download-cv': 'Descargar CV',

      // About Section
      'about.title': 'Sobre Mí',
      'about.subtitle': 'Conoce mi trayectoria profesional',
      'about.my-story': 'Mi Historia',
      'about.description1': 'Soy Ingeniero de Software de 23 años en Lima, Perú. He trabajado en proyectos tecnológicos para empresas como Systems Solutions y Diners Club, enfocándome en soluciones escalables y de alta calidad.',
      'about.description2': 'Tengo experiencia en sistemas empresariales, apps bancarias seguras y plataformas e-commerce, utilizando tecnologías como Angular, React, Spring Boot y Flutter.',
      'about.description3': 'Actualmente, continúo fortaleciendo mi perfil en el sector tecnológico, aplicando buenas prácticas, arquitectura de software y metodologías ágiles para crear soluciones con impacto.',
      'about.chip.fullstack': 'Desarrollador Full Stack',
      'about.chip.mobile': 'Desarrollo Mobile',
      'about.chip.cloud': 'Despliegue en Cloud',
      'about.experience': 'Experiencia',

      // Experience entries
      'experience.diners.company': 'Diners Club',
      'experience.diners.position': 'Desarrollador Fullstack',
      'experience.diners.period': '2023 - 2025',
      'experience.diners.description': 'Desarrollo de front y backend',

      'experience.systems.company': 'Systems Solutions',
      'experience.systems.position': 'Desarrollador Frontend',
      'experience.systems.period': 'Enero 2023 - Diciembre 2023',
      'experience.systems.description': 'Creación de aplicaciones web y actualizando aplicaciones web existente',

      'experience.restaurants.company': 'Restaurantes y Startups',
      'experience.restaurants.position': 'Desarrollador Full Stack',
      'experience.restaurants.period': '2022 - Actualidad',
      'experience.restaurants.description': 'Sistemas de gestión y páginas web para restaurantes',

      'experience.freelance.company': 'Proyectos Freelance',
      'experience.freelance.position': 'Desarrollador Full Stack',
      'experience.freelance.period': '2021 - Presente',
      'experience.freelance.description': 'Desarrollo de aplicaciones web y móviles para diversos sectores',

      // Skills Section
      'skills.title': 'Habilidades Técnicas',
      'skills.subtitle': 'Tecnologías que domino y utilizo en mis proyectos',
      'skills.tab.frontend': 'Frontend',
      'skills.tab.backend': 'Backend',
      'skills.tab.mobile': 'Mobile',
      'skills.tab.database-tools': 'Database & Tools',
      'skills.databases': 'Bases de Datos',
      'skills.tools': 'Herramientas',

      // Projects Section
      'projects.title': 'Mis Proyectos',
      'projects.subtitle': 'Una selección de mis trabajos más destacados',
      'projects.featured': 'Proyectos Destacados',
      'projects.all': 'Todos los Proyectos',
      'projects.filter.all': 'Todos',
      'projects.filter.fullstack': 'Full Stack',
      'projects.filter.frontend': 'Frontend',
      'projects.filter.mobile': 'Mobile',
      'projects.filter.backend': 'Backend',
      'projects.backend.additional': 'Proyectos Backend Adicionales',

      // Contact Section
      'contact.title': 'Contáctame',
      'contact.subtitle': '¿Tienes un proyecto en mente? ¡Hablemos!',
      'contact.info.title': 'Información de Contacto',
      'contact.info.description': 'Estoy disponible para nuevos proyectos y oportunidades laborales. No dudes en contactarme si buscas un desarrollador comprometido y apasionado.',
      'contact.info.email': 'Email',
      'contact.info.phone': 'Teléfono',
      'contact.info.location': 'Ubicación',
      'contact.info.company': 'Compañia o Empresa',
      'contact.info.location.value': 'Lima, Perú',
      'contact.social.title': 'Sígueme en',
      'contact.form.title': 'Envíame un Mensaje',
      'contact.form.description': 'Dejanos o envianos un mensaje para dialogar',
      'contact.form.personal.title': 'Información de Contacto',
      'contact.form.name': 'Nombre Completo',
      'contact.form.name.placeholder': 'Tu nombre',
      'contact.form.email': 'Email',
      'contact.form.email.placeholder': 'tu@email.com',
      'contact.form.subject': 'Asunto',
      'contact.form.subject.placeholder': '¿De qué quieres hablar?',
      'contact.form.subject.general': 'Un proyecto de mi empresa',
      'contact.form.subject.project': 'Desarrollador fullstack',
      'contact.form.subject.collaboration': 'Un programador para una colaboración',
      'contact.form.subject.consultation': 'Programador para trabajar en una empresa',
      'contact.form.subject.other': 'otro',

      'contact.form.message': 'Mensaje',
      'contact.form.message.placeholder': 'Cuéntame sobre tu proyecto...',
      'contact.form.cv.upload': 'Adjuntar Documento(PDF)',
      'contact.form.attachments.title': 'Documentos válidos',
      'contact.form.attachments.description': 'pdf, doc, docx, jpg, jpeg, png',
      'contact.form.cv.selected': 'Archivo seleccionado:',
      'contact.form.attachments.browse': 'Seleccionar archivo del escritorio o del celular',
      'contact.form.send': 'Enviar Mensaje',
      'contact.form.error.name.required': 'El nombre es requerido',
      'contact.form.error.email.required': 'El email es requerido',
      'contact.form.error.email.invalid': 'Ingresa un email válido',
      'contact.form.error.subject.required': 'El asunto es requerido',
      'contact.form.error.message.required': 'El mensaje es requerido',

      // Footer
      'footer.copyright': '© 2024 Víctor Yordi Díaz González. Todos los derechos reservados.',

      // Common buttons and actions
      'btn.download-cv': 'Descargar CV',
      'btn.contact-me': 'Contáctame',
      'btn.close': 'Cerrar',
      'btn.menu': 'Menú',
      'contact.form.submit': 'Enviar',
      'contact.form.sending': 'Enviando',
      'contact.form.reset': 'Limpiar',
    },
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.about': 'About Me',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',
      'nav.skills': 'Skills',
      'nav.brand': 'Victor',
      'nav.brand.subtitle': 'Freelancer',
      'nav.language.spanish': 'ESPAÑOL',
      'nav.language.english': 'ENGLISH',

      // Hero Section
      'hero.greeting': 'Hello, I\'m',
      'hero.name': 'Víctor Yordi',
      'hero.title': 'Hi! I\'m Victor Diaz',
      'hero.subtitle': 'Full Stack Developer',
      'hero.description': '23-year-old Software Engineer specialized in full stack development with experience in Angular, React, Vue.js, Spring Boot, and mobile development with Flutter. Passionate about creating innovative technological solutions for companies across all sectors.',
      'hero.stats.projects': 'Completed Projects',
      'hero.stats.experience': 'Years of Experience',
      'hero.stats.technologies': 'Mastered Technologies',
      'hero.btn.view-projects': 'View Projects',
      'hero.btn.download-cv': 'Download CV',

      // About Section
      "about.title": "About Me",
      "about.subtitle": "Discover my professional journey",
      "about.my-story": "My Story",
      'about.description1': 'I\'m a 23-year-old Software Engineer based in Lima, Peru. I\'ve developed scalable, high-quality tech solutions for companies like Systems Solutions and Diners Club.',
      'about.description2': 'My experience includes enterprise systems, secure banking apps, and e-commerce platforms using Angular, React, Spring Boot, and Flutter.',
      'about.description3': 'I continue to grow in the tech sector, applying best practices, software architecture, and agile methodologies to build impactful solutions.',
      'about.chip.fullstack': 'Full Stack Developer',
      'about.chip.mobile': 'Mobile Development',
      'about.chip.cloud': 'Cloud Deployment',
      'about.experience': 'Experience',

      // Experience entries
      'experience.diners.company': 'Diners Club',
      'experience.diners.position': 'Fullstack Developer',
      'experience.diners.period': '2023 - 2025',
      'experience.diners.description': 'Frontend and backend development',

      'experience.systems.company': 'Systems Solutions',
      'experience.systems.position': 'Frontend Developer',
      'experience.systems.period': 'January 2023 - December 2023',
      'experience.systems.description': 'Creating web applications and updating existing web applications',

      'experience.restaurants.company': 'Restaurants & Startups',
      'experience.restaurants.position': 'Full Stack Developer',
      'experience.restaurants.period': '2022 - Present',
      'experience.restaurants.description': 'Management systems and websites for restaurants',

      'experience.freelance.company': 'Freelance Projects',
      'experience.freelance.position': 'Full Stack Developer',
      'experience.freelance.period': '2021 - Present',
      'experience.freelance.description': 'Development of web and mobile applications for various sectors',

      // Skills Section
      'skills.title': 'Technical Skills',
      'skills.subtitle': 'Technologies I master and use in my projects',
      'skills.tab.frontend': 'Frontend',
      'skills.tab.backend': 'Backend',
      'skills.tab.mobile': 'Mobile',
      'skills.tab.database-tools': 'Database & Tools',
      'skills.databases': 'Databases',
      'skills.tools': 'Tools',

      // Projects Section
      'projects.title': 'My Projects',
      'projects.subtitle': 'A selection of my most outstanding work',
      'projects.featured': 'Featured Projects',
      'projects.all': 'All Projects',
      'projects.filter.all': 'All',
      'projects.filter.fullstack': 'Full Stack',
      'projects.filter.frontend': 'Frontend',
      'projects.filter.mobile': 'Mobile',
      'projects.filter.backend': 'Backend',
      'projects.backend.additional': 'Additional Backend Projects',

      // Contact Section
      'contact.title': 'Contact Me',
      'contact.subtitle': 'Have a project in mind? Let\'s talk!',
      'contact.info.title': 'Contact Information',
      'contact.info.description': 'I\'m available for new projects and job opportunities. Don\'t hesitate to contact me if you\'re looking for a committed and passionate developer.',
      'contact.info.email': 'Email',
      'contact.info.phone': 'Phone',
      'contact.info.location': 'Location',
      'contact.info.location.value': 'Lima, Peru',
      'contact.social.title': 'Follow me on',
      'contact.form.title': 'Send me a Message',
      'contact.form.personal.title': 'Contact Information',
      'contact.form.description': 'Leave us or send us a message to talk',
      'contact.form.name': 'Full Name',
      'contact.form.name.placeholder': 'Your name',
      'contact.form.email': 'Email',
      'contact.form.email.placeholder': 'your@email.com',
      'contact.form.subject': 'Subject',
      'contact.form.subject.placeholder': 'What would you like to talk about?',
      'contact.form.message': 'Message',
      'contact.form.message.placeholder': 'Tell me about your project...',
      'contact.form.cv.upload': 'Attach CV (PDF)',
      'contact.form.cv.selected': 'Selected file:',
      'contact.form.send': 'Send Message',
      'contact.form.error.name.required': 'Name is required',
      'contact.form.error.email.required': 'Email is required',
      'contact.form.error.email.invalid': 'Enter a valid email',
      'contact.form.error.subject.required': 'Subject is required',
      'contact.form.error.message.required': 'Message is required',

      // Footer
      'footer.copyright': '© 2024 Víctor Yordi Díaz González. All rights reserved.',

      // Common buttons and actions
      'btn.download-cv': 'Download CV',
      'btn.contact-me': 'Contact Me',
      'btn.close': 'Close',
      'btn.menu': 'Menu'
    }
  };

  constructor() {
    // Cargar idioma guardado o usar español por defecto
    const savedLang = localStorage.getItem('portfolio-lang') || 'es';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string): void {
    if (this.translations[lang]) {
      this.currentLang.next(lang);
      localStorage.setItem('portfolio-lang', lang);

      // Cambiar el atributo lang del documento
      document.documentElement.lang = lang;
    }
  }

  getCurrentLanguage(): string {
    return this.currentLang.value;
  }

  translate(key: string): string {
    const currentLang = this.getCurrentLanguage();
    return this.translations[currentLang]?.[key] || key;
  }

  // Método para obtener todas las traducciones del idioma actual
  getCurrentTranslations() {
    return this.translations[this.getCurrentLanguage()] || {};
  }
}
