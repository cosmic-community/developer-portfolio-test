// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Project type
export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    project_name?: string;
    description?: string;
    technologies?: string;
    live_url?: string;
    github_url?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    screenshots?: Array<{
      url: string;
      imgix_url: string;
    }>;
    featured?: boolean;
  };
}

// Skill type
export interface Skill extends CosmicObject {
  type: 'skills';
  metadata: {
    skill_name?: string;
    category?: {
      key: string;
      value: string;
    };
    proficiency?: {
      key: string;
      value: string;
    };
    icon?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Work Experience type
export interface WorkExperience extends CosmicObject {
  type: 'work-experience';
  metadata: {
    job_title?: string;
    company_name?: string;
    company_logo?: {
      url: string;
      imgix_url: string;
    };
    location?: string;
    start_date?: string;
    end_date?: string | null;
    description?: string;
    current?: boolean;
  };
}

// Testimonial type
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    client_name?: string;
    client_role?: string;
    company?: string;
    testimonial_text?: string;
    rating?: {
      key: string;
      value: string;
    };
    client_photo?: {
      url: string;
      imgix_url: string;
    };
    related_project?: Project;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isProject(obj: CosmicObject): obj is Project {
  return obj.type === 'projects';
}

export function isSkill(obj: CosmicObject): obj is Skill {
  return obj.type === 'skills';
}

export function isWorkExperience(obj: CosmicObject): obj is WorkExperience {
  return obj.type === 'work-experience';
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials';
}