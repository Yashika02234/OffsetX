export type Counter = {
  value: number;
  suffix: string;
  label: string;
};

export type WhyNowItem = {
  tag: string;
  title: string;
  description: string;
};

export type LearningItem = {
  title: string;
  quote: string;
  mentions: number;
};

export type ExploringItem = {
  title: string;
  description: string;
  topics?: string[];
};

export type ResearchCard = {
  tag: string;
  title: string;
  href: string;
};
