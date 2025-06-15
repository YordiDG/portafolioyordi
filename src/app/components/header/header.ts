
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {TranslationService} from '../../services/TranslationService';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  currentLanguage = 'es';

  isLoading: boolean = false;
  showScrollTop: boolean = false;

  private langSubscription?: Subscription;

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    // Suscribirse a cambios de idioma
    this.langSubscription = this.translationService.currentLanguage$.subscribe(
      lang => {
        this.currentLanguage = lang;
      }
    );
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Prevenir scroll del body cuando el menú está abierto
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = 'auto';
  }

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.closeMobileMenu();

    // Opcional: Smooth scroll al top para mostrar el cambio
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70; // Compensar altura del navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }

  // Cerrar menú al hacer clic en enlaces (para mejorar UX)
  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth >= 768 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  // Cerrar menú al presionar Escape
  @HostListener('document:keydown.escape', [])
  onEscapeKey() {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  // Método helper para obtener traducciones
  translate(key: string): string {
    return this.translationService.translate(key);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
