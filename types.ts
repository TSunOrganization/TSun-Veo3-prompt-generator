export type PromptFormat = 'json' | 'simple';

export interface GeneratePromptsOptions {
    inspiration: string;
    charLimit: number;
    format: PromptFormat;
    numPrompts: number;
    logoName: string;
}

export interface GeneratedPrompt {
  title?: string;
  description:string;
}

export interface GeminiResponse {
  prompts: any[];
  suggestedTags: string[];
}

export interface ChangelogEntry {
  version: string;
  date: string;
  author: string;
  changes: string[];
}
