import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TranslationService} from '../../services/TranslationService';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements OnInit, OnDestroy {
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

  experience = [
    {
      company: () => this.t('experience.diners.company'),
      position: () => this.t('experience.diners.position'),
      period: () => this.t('experience.diners.period'),
      description: () => this.t('experience.diners.description'),
      tecnologias: ['Angular', 'Spring Boot', 'SQL Server','GitHub', 'AS400']
    },
    {
      company: () => this.t('experience.systems.company'),
      position: () => this.t('experience.systems.position'),
      period: () => this.t('experience.systems.period'),
      description: () => this.t('experience.systems.description'),
      tecnologias: ['Vue', 'Javascript', 'Excel','HTML', '.Net c#','GitHub','CSS', 'MySQL']
    },
    {
      company: () => this.t('experience.restaurants.company'),
      position: () => this.t('experience.restaurants.position'),
      period: () => this.t('experience.restaurants.period'),
      description: () => this.t('experience.restaurants.description'),
      tecnologias: ['Angular', 'AWS','Spring Boot','GitHub','Azure', 'MySQL', 'Flutter']
    },
    {
      company: () => this.t('experience.freelance.company'),
      position: () => this.t('experience.freelance.position'),
      period: () => this.t('experience.freelance.period'),
      description: () => this.t('experience.freelance.description'),
      tecnologias: ['Angular', 'React','Flutter','Azure','Render', 'Railway','Spring Boot', 'MySQL']
    }
  ];
}
