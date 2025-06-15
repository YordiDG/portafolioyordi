import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../../models/project.model';
import {PortfolioService} from '../../services/portafolio';
import {Subscription} from 'rxjs';
import {TranslationService} from '../../services/TranslationService';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit, OnDestroy {
  projects: Project[] = [];
  featuredProjects: Project[] = [];
  backendProjects: string[] = [];
  selectedCategory = 'all';

  currentLanguage: string = 'es';
  private languageSubscription!: Subscription;

  constructor(private portfolioService: PortfolioService, public translationService: TranslationService) {}

  ngOnInit() {
    this.loadProjects();
    this.loadBackendProjects();

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


  loadProjects() {
    this.portfolioService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.featuredProjects = projects.filter(p => p.featured);
    });
  }

  loadBackendProjects() {
    this.portfolioService.getBackendProjects().subscribe(projects => {
      this.backendProjects = projects;
    });
  }

  filterProjects(category: string) {
    this.selectedCategory = category;
  }

  get filteredProjects() {
    if (this.selectedCategory === 'all') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === this.selectedCategory);
  }

  openRedes(url: string): void {
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    }
  }

}
