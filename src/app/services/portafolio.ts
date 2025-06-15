import { Injectable } from '@angular/core';
import {Project, Skill} from '../models/project.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class PortfolioService {

  private projects: Project[] = [
    {
      id: 1,
      title: 'Sistema de Minimarket',
      description: 'Aplicación completa de gestión para minimarket con autenticación, CRUD de productos y pasarela de pago.',
      longDescription: 'Sistema integral desarrollado con Angular y Spring Boot que incluye gestión de inventario, sistema de ventas, autenticación JWT, pasarela de pagos y reportes en tiempo real.',
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'JWT', 'PayPal API'],
      category: 'fullstack',
      image: 'assets/images/mini.png',
      demoUrl: 'https://minimarket-yoes.vercel.app/Front-End/home-client',
      githubUrl: 'https://github.com/YordiDG/Front-YOES3.git',
      featured: true
    },
    {
      id: 2,
      title: 'Sistema de Ferretería',
      description: 'Plataforma de ventas para ferretería con gestión de inventario y sistema de facturación.',
      longDescription: 'Sistema robusto para gestión de ferretería con control de stock, generación de facturas, gestión de proveedores y análisis de ventas.',
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'JasperReports'],
      category: 'fullstack',
      image: 'assets/images/ferr.png',
      demoUrl: 'https://grupoindustrialperu.com/',
      githubUrl: 'https://github.com/victoryordi/ferreteria',
      featured: true
    },
    {
      id: 3,
      title: 'Venta de Rosas Online',
      description: 'E-commerce especializado en venta de rosas con catálogo dinámico y sistema de pedidos.',
      longDescription: 'Plataforma de comercio electrónico con catálogo de productos, carrito de compras, sistema de pedidos y panel administrativo completo.',
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'Stripe API'],
      category: 'fullstack',
      image: 'assets/images/flor.png',
      demoUrl: 'https://floresavenida.com.ar/?srsltid=AfmBOoq65c_VLUPguhm7h03bJuLpFQNY9AClCMpaBwFsIbFDqGDkAxfV',
      githubUrl: 'https://github.com/victoryordi/rosas-online',
      featured: true
    },
    {
      id: 4,
      title: 'Sistema Web de Equipos de Refrigeracion de Restaurante',
      description: 'Equipo con tecnologia avanzada para prodcutos de refrigeración para restaurantes',
      longDescription: 'Sistema completo de equipos de refrigeración para restaurantes.',
      technologies: ['React', '.NET Core', 'SQL Server', 'SignalR'],
      category: 'fullstack',
      image: 'https://media.discordapp.net/attachments/1273824394451615826/1302165760260444170/image.png?ex=684e6fde&is=684d1e5e&hm=cc9b53b5e93c20d56fbf29aea8b4140336defebb080e63aed41bcf598fdf80ba&=&format=webp&quality=lossless&width=1002&height=457',
      demoUrl: 'https://frostchef.vercel.app/Front-End/login',
      githubUrl: 'https://github.com/Los-IoTecnicos/Web-Application-Front.git',
      featured: false
    },
    {
      id: 5,
      title: 'venta de Autos',
      description: 'Portal de venta de autos con página de aterrizaje con búsqueda avanzada y gestión de vehículos.',
      longDescription: 'Plataforma web con filtros de búsqueda avanzados, galería de imágenes, sistema de contacto y panel para agentes vehiculares.',
      technologies: ['React', '.NET Core', 'SQL Server', 'Google Maps API'],
      category: 'fullstack',
      image: 'assets/images/autoya.png',
      demoUrl: 'https://bienes-raices.railway.app',
      githubUrl: 'https://github.com/YordiDG/AutoYa-landing',
      featured: false
    },
    {
      id: 6,
      title: 'Tienda de Cámaras',
      description: 'E-commerce de cámaras y equipos electrónicos con comparador de productos.',
      longDescription: 'Tienda online especializada en cámaras con comparador de productos, reseñas de usuarios, sistema de filtros avanzado y carrito de compras.',
      technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Cloudinary'],
      category: 'fullstack',
      image: 'assets/images/vision.png',
      demoUrl: 'https://yordidg.github.io/AigieVision/',
      githubUrl: 'https://github.com/YordiDG/AigieVision.git',
      featured: false
    },
    {
      id: 7,
      title: 'App Equipos de Refrigeración',
      description: 'Aplicación móvil para gestión y mantenimiento de equipos de refrigeración.',
      longDescription: 'App móvil para técnicos que incluye seguimiento de equipos, programación de mantenimientos, generación de reportes y notificaciones push.',
      technologies: ['Flutter', 'Kotlin', 'Firebase', 'Spring Boot'],
      category: 'mobile',
      image: 'https://cdn.discordapp.com/attachments/1273824394451615826/1302165172647100477/image.png?ex=684e6f52&is=684d1dd2&hm=a6b45faefb4b70ea2eaa6611eac3492522127aa63bbae4541bb8f55eb8440704&',
      githubUrl: 'https://github.com/Los-IoTecnicos/FrostChef-Mobile',
      featured: false
    },
    {
      id: 8,
      title: 'App Cuidadores de Perros',
      description: 'Plataforma móvil para conectar dueños de mascotas con cuidadores profesionales.',
      longDescription: 'Aplicación que conecta dueños de mascotas con cuidadores, incluye perfiles verificados, sistema de reservas, chat en tiempo real y seguimiento GPS.',
      technologies: ['Flutter', 'Kotlin', 'Firebase', 'Google Maps'],
      category: 'mobile',
      image: 'assets/images/pet.jpeg',
      githubUrl: 'https://github.com/Tralaleritos/Frontend-HappyPaws.git',
      featured: false
    },
    {
      id: 9,
      title: 'App Planes de Nutrición',
      description: 'Aplicación para crear y seguir planes de nutrición personalizados.',
      longDescription: 'App de nutrición con planes personalizados, seguimiento de comidas, calculadora de calorías, recordatorios y análisis nutricional completo.',
      technologies: ['Flutter', 'Kotlin', 'Spring Boot', 'PostgreSQL'],
      category: 'mobile',
      image: 'assets/images/mot.jpeg',
      githubUrl: 'https://github.com/MottiNut/Frontend-Nutritionist.git',
      featured: false
    }
  ];

  private backendProjects = [
    'Sistema de Autenticación JWT con roles y permisos',
    'API REST para gestión de usuarios con CRUD completo',
    'Sistema de notificaciones en tiempo real con WebSockets',
    'API de pagos integrada con múltiples pasarelas',
    'Sistema de gestión de archivos con AWS S3',
    'API de geolocalización con Google Maps',
    'Sistema de logs y monitoreo de aplicaciones',
    'API de envío de emails con plantillas personalizadas'
  ];

  private skills: Skill[] = [
    // Frontend
    { name: 'HTML5', level: 95, category: 'frontend', icon: 'fab fa-html5' },
    { name: 'CSS3', level: 90, category: 'frontend', icon: 'fab fa-css3-alt' },
    { name: 'JavaScript', level: 88, category: 'frontend', icon: 'fab fa-js-square' },
    { name: 'TypeScript', level: 85, category: 'frontend', icon: 'fab fa-js-square' },
    { name: 'Angular', level: 90, category: 'frontend', icon: 'fab fa-angular' },
    { name: 'React', level: 85, category: 'frontend', icon: 'fab fa-react' },
    { name: 'Vue.js', level: 80, category: 'frontend', icon: 'fab fa-vuejs' },

    // Backend
    { name: 'Spring Boot', level: 88, category: 'backend', icon: 'fas fa-leaf' },
    { name: '.NET Core', level: 82, category: 'backend', icon: 'fab fa-microsoft' },
    { name: 'Node.js', level: 78, category: 'backend', icon: 'fab fa-node-js' },
    { name: 'Express.js', level: 75, category: 'backend', icon: 'fas fa-server' },

    // Mobile
    { name: 'Flutter', level: 85, category: 'mobile', icon: 'fas fa-mobile-alt' },
    { name: 'Kotlin', level: 80, category: 'mobile', icon: 'fab fa-android' },

    // Database
    { name: 'MySQL', level: 88, category: 'database', icon: 'fas fa-database' },
    { name: 'SQL Server', level: 85, category: 'database', icon: 'fas fa-database' },
    { name: 'PostgreSQL', level: 80, category: 'database', icon: 'fas fa-database' },
    { name: 'MongoDB', level: 75, category: 'database', icon: 'fas fa-database' },

    // Tools
    { name: 'Git', level: 90, category: 'tools', icon: 'fab fa-git-alt' },
    { name: 'Docker', level: 75, category: 'tools', icon: 'fab fa-docker' },
    { name: 'AWS', level: 70, category: 'tools', icon: 'fab fa-aws' },
    { name: 'Firebase', level: 80, category: 'tools', icon: 'fas fa-fire' }
  ];

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getFeaturedProjects(): Observable<Project[]> {
    return of(this.projects.filter(project => project.featured));
  }

  getProjectsByCategory(category: string): Observable<Project[]> {
    return of(this.projects.filter(project => project.category === category));
  }

  getSkills(): Observable<Skill[]> {
    return of(this.skills);
  }

  getBackendProjects(): Observable<string[]> {
    return of(this.backendProjects);
  }
}
