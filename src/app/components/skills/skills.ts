import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren, ChangeDetectorRef} from '@angular/core';
import {Skill} from '../../models/project.model';
import {PortfolioService} from '../../services/portafolio';
import {Subscription} from 'rxjs';
import {TranslationService} from '../../services/TranslationService';

// Define the skill categories type
type SkillCategory = 'frontend' | 'backend' | 'mobile' | 'database' | 'tools';

// Define the skill interface
interface SkillItem {
  name: string;
  level: number;
  icon: string;
  animatedLevel: number;
}

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills implements OnInit, OnDestroy {
  skills: Skill[] = [];
  currentLanguage: string = 'es';
  private languageSubscription!: Subscription;

  @ViewChildren('skillElement') skillElements!: QueryList<ElementRef>;

  // Array para trackear skills animados
  private animatedSkills: Set<string> = new Set();

  // Almacenar todas las skills con sus niveles animados
  public allSkills: Record<SkillCategory, SkillItem[]> = {
    frontend: [
      { name: 'Angular', level: 90, icon: 'fab fa-angular', animatedLevel: 0 },
      { name: 'React', level: 85, icon: 'fab fa-react', animatedLevel: 0 },
      { name: 'Vue.js', level: 80, icon: 'fab fa-vuejs', animatedLevel: 0 },
      { name: 'TypeScript', level: 88, icon: 'fab fa-js-square', animatedLevel: 0 },
      { name: 'HTML5', level: 95, icon: 'fab fa-html5', animatedLevel: 0 },
      { name: 'CSS3', level: 90, icon: 'fab fa-css3-alt', animatedLevel: 0 }
    ],
    backend: [
      { name: 'SpringBoot - Java', level: 90, icon: 'fab fa-java', animatedLevel: 0 },
      { name: '.NetCore C#', level: 75, icon: 'fab fa-c#', animatedLevel: 0 },
      { name: 'Python', level: 30, icon: 'fab fa-python', animatedLevel: 0 },

    ],
    mobile: [
      { name: 'Flutter', level: 85, icon: 'fas fa-mobile-alt', animatedLevel: 0 },
    ],
    database: [
      { name: 'MySQL', level: 85, icon: 'fas fa-database', animatedLevel: 0 },
      { name: 'SQL Server', level: 85, icon: 'fas fa-database', animatedLevel: 0 },
      { name: 'PostgreSQL', level: 80, icon: 'fas fa-server', animatedLevel: 0 },
      { name: 'MongoDB', level: 75, icon: 'fas fa-leaf', animatedLevel: 0 }
    ],
    tools: [
      { name: 'Git', level: 90, icon: 'fab fa-git-alt', animatedLevel: 0 },
      { name: 'Docker', level: 75, icon: 'fab fa-docker', animatedLevel: 0 },
      { name: 'AWS', level: 70, icon: 'fab fa-aws', animatedLevel: 0 }
    ]
  };

  constructor(
    private portfolioService: PortfolioService,
    public translationService: TranslationService,
    private cdr: ChangeDetectorRef // Añadir ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.portfolioService.getSkills().subscribe(skills => {
      this.skills = skills;
    });

    this.languageSubscription = this.translationService.currentLanguage$.subscribe(
      lang => {
        this.currentLanguage = lang;
      }
    );

    this.initializeAnimatedLevels();
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

  ngAfterViewInit() {
    // Animar skills al cargar la página con delay escalonado
    setTimeout(() => {
      this.animateAllSkillsOnLoad();
    }, 1000);
  }

  private initializeAnimatedLevels() {
    // Inicializar todos los skills con animatedLevel = 0
    const categories: SkillCategory[] = ['frontend', 'backend', 'mobile', 'database', 'tools'];
    categories.forEach(category => {
      this.allSkills[category].forEach(skill => {
        skill.animatedLevel = 0;
      });
    });
  }

  private animateAllSkillsOnLoad() {
    const categories: SkillCategory[] = ['frontend', 'backend', 'mobile', 'database', 'tools'];
    categories.forEach((category, categoryIndex) => {
      const skills = this.getSkillsByCategory(category);
      skills.forEach((skill, skillIndex) => {
        const delay = (categoryIndex * 300) + (skillIndex * 150); // Reducir delays
        setTimeout(() => {
          this.animateSkillCounter(skill, `${category}-${skillIndex}`);
        }, delay);
      });
    });
  }

  animateSkill(skill: SkillItem, index: number) {
    const skillId = `${skill.name}-${index}`;

    // Solo animar si no se ha animado antes en este hover
    if (!this.animatedSkills.has(skillId)) {
      this.animateSkillCounter(skill, skillId);
      this.animatedSkills.add(skillId);

      // Remover del set después de 2 segundos para permitir re-animación
      setTimeout(() => {
        this.animatedSkills.delete(skillId);
      }, 2000);
    }
  }

  private animateSkillCounter(skill: SkillItem, skillId: string) {
    const target = skill.level;
    const duration = 1200; // 1.2 segundos - más rápido
    const steps = 50; // Reducir pasos para mejor performance
    const increment = target / steps;
    const stepDuration = duration / steps;

    let current = skill.animatedLevel || 0; // Empezar desde el valor actual

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      // Actualizar el valor animado
      skill.animatedLevel = Math.floor(current);

      // Forzar detección de cambios
      this.cdr.detectChanges();
    }, stepDuration);
  }

  // Método para reiniciar animaciones (útil para tabs)
  resetSkillAnimations() {
    this.animatedSkills.clear();
    this.initializeAnimatedLevels();
    this.cdr.detectChanges();
  }

  // Método corregido para obtener skills por categoría
  getSkillsByCategory(category: string): SkillItem[] {
    // Type-safe access usando 'in' operator
    if (category in this.allSkills) {
      return this.allSkills[category as SkillCategory];
    }
    return [];
  }

  // Método para animar una categoría específica cuando se cambia de tab
  onTabChange(event: any) {
    const tabLabels = ['frontend', 'backend', 'mobile', 'database-tools'];
    const selectedCategory = tabLabels[event.index];

    if (selectedCategory === 'database-tools') {
      // Animar tanto database como tools
      setTimeout(() => {
        this.animateCategorySkills('database');
        setTimeout(() => {
          this.animateCategorySkills('tools');
        }, 300);
      }, 200);
    } else if (selectedCategory !== 'database-tools') {
      setTimeout(() => {
        this.animateCategorySkills(selectedCategory as SkillCategory);
      }, 200);
    }
  }

  private animateCategorySkills(category: SkillCategory) {
    const skills = this.getSkillsByCategory(category);
    skills.forEach((skill, index) => {
      // Resetear el skill antes de animar
      skill.animatedLevel = 0;
      setTimeout(() => {
        this.animateSkillCounter(skill, `${category}-${index}-tab`);
      }, index * 100);
    });
  }

  // TrackBy function para mejorar performance
  trackBySkillName(index: number, skill: SkillItem): string {
    return skill.name;
  }
}
