export type SystemStatus = 'Planned' | 'In Progress' | 'Live';
export type Tier = 1 | 2 | 3;

export interface TechStackEntry {
  layer: string;
  technology: string;
}

export interface Project {
  name: string;
  slug: string;
  tier: Tier;
  status: SystemStatus;
  category: 'AI Systems' | 'Machine Learning' | 'Infrastructure';
  cardHeadline: string;
  oneLiner: string;
  problemStatement: string;
  whatItDoes: string;
  capabilities: string[];
  targetAudience: string[];
  techStack: TechStackEntry[];
  pipeline: string[];
  githubUrl: string;
  repoName: string;
  infrastructure: {
    vercel: string[];
    digitalocean: string[];
  };
}

// Alias for backward compatibility
export type System = Project;
