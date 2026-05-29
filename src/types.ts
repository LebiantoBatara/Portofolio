export interface Project {
  id: string;
  title: string;
  category: 'Branding' | 'UI/UX' | 'Illustration' | 'Typography' | 'IT & Development';
  focus: string;
  summary: string;
  description: string;
  duration: string;
  toolsUsed: string[];
  deliverables: string[];
  mockStats?: { label: string; value: string }[];
  steps?: { title: string; desc: string }[];
}

export interface DesignApproachStep {
  title: string;
  description: string;
  details: string;
}

export interface SkillBadge {
  label: string;
  description: string;
  relatedTools: string[];
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'contacted';
}

export interface Education {
  institution: string;
  degree: string;
  gpa: string;
  location: string;
  duration: string;
  thesisTitle?: string;
  softwareSkills: string[];
}

export interface Experience {
  role: string;
  organization: string;
  location?: string;
  duration: string;
  description: string;
  details: string[];
}

export interface OrganizationalExperience {
  role: string;
  organization: string;
  duration: string;
  description: string;
}

export interface VolunteerExperience {
  role: string;
  organization: string;
  duration: string;
  description: string;
}

export interface Certification {
  title: string;
  program: string;
}

export interface Achievement {
  title: string;
  desc: string;
  year?: string;
}

export interface LanguageStatus {
  language: string;
  proficiency: string;
}
