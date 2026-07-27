export type AppId = 'projects' | 'about' | 'terminal' | 'resume' | 'settings' | 'contact';

export interface AppConfig {
  id: AppId;
  title: string;
  shortName: string;
  iconName: string;
  defaultWidth: number;
  defaultHeight: number;
  isPinnedToDock: boolean;
  showOnDesktop: boolean;
}

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Web Apps' | 'React & TS' | 'AI & Tools' | 'Full Stack';
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  items: { name: string; level: number; icon: string; experience: string }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
}

export interface Wallpaper {
  id: string;
  name: string;
  previewUrl: string;
  style: React.CSSProperties;
}
