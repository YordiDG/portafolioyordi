import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TranslationService} from '../../services/TranslationService';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer implements OnInit, OnDestroy {
  profileImage = 'assets/images/profile-placeholder.jpg';

  currentLanguage: string = 'es';
  private languageSubscription!: Subscription;

  constructor(public translationService: TranslationService) {}

  ngOnInit() {
    // Suscribirse a cambios de idioma
    this.languageSubscription = this.translationService.currentLanguage$.subscribe(
      lang => {
        this.currentLanguage = lang;
      }
    );
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  // Método helper para obtener traducción
  t(key: string): string {
    return this.translationService.translate(key);
  }

  changeLanguage(lang: string): void {
    this.translationService.setLanguage(lang);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
