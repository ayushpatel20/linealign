export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR" | "VIEWER";
}

export interface MenuItem {
  name: string;
  href: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface PageSectionItem {
  id: string;
  sectionName: string;
  isVisible: boolean;
  sortOrder: number;
}
