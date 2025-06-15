export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  image: string;
  demoUrl?: string;
  githubUrl: string;
  featured: boolean;
}

export interface BackendProject {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}
