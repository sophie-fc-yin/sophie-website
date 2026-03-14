export type SystemStatus = 'Planned' | 'In Progress' | 'Live';
export type Tier = 1 | 2 | 3;

export interface TechStackEntry {
  layer: string;
  technology: string;
}

export interface System {
  name: string;
  slug: string;
  tier: Tier;
  status: SystemStatus;
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
