import type { Counter, WhyNowItem, LearningItem, ExploringItem, ResearchCard } from '../types';

export const counters: Counter[] = [
  { value: 20, suffix: '+', label: 'EXPERT<br/>INTERVIEWS' },
  { value: 12, suffix: '+', label: 'STAKEHOLDER<br/>GROUPS' },
  { value: 4, suffix: '', label: 'GEOGRAPHIES<br/>COVERED' },
  { value: 30, suffix: '+', label: 'HOURS OF<br/>RESEARCH' },
];

export const whyNowItems: WhyNowItem[] = [
  {
    tag: 'REGULATION',
    title: 'CBAM is reshaping global trade.',
    description:
      'Thousands of industrial companies now face mandatory embedded-emissions reporting with financial consequences.',
  },
  {
    tag: 'COMPLIANCE',
    title: 'Compliance carbon markets are being built in real time.',
    description:
      'CCTS is introducing compliance carbon markets in India, and domestic carbon pricing infrastructure is being built right now.',
  },
  {
    tag: 'ENTERPRISE',
    title: 'Enterprises need audit-ready emissions data.',
    description:
      'Spreadsheets and consultant-driven workflows are no longer sufficient for regulatory scrutiny.',
  },
  {
    tag: 'VERIFICATION',
    title: 'Carbon projects require trusted Digital MRV.',
    description:
      'The industry is moving from periodic audits to continuous, satellite-enabled verification.',
  },
  {
    tag: 'DEMAND',
    title: 'Buyers increasingly demand compliance-grade carbon assets.',
    description:
      'Quality, traceability, and auditability are now prerequisites — not differentiators.',
  },
  {
    tag: 'INFRASTRUCTURE',
    title: 'No universal trust layer exists across registries and geographies.',
    description: 'The market is scaling without the infrastructure it needs.',
  },
];

export const learningItems: LearningItem[] = [
  {
    title: 'Manual workflows remain widespread',
    quote: '90% of this market is manual.',
    mentions: 4,
  },
  {
    title: 'Trust in data is a bigger challenge than availability',
    quote: 'The biggest issue is trust in the underlying project.',
    mentions: 4,
  },
  {
    title: 'Compliance markets are expected to drive future demand',
    quote: 'Pure voluntary credits without compliance use cases have weak demand.',
    mentions: 3,
  },
  {
    title: 'Digital MRV is emerging as foundational infrastructure',
    quote: "If you pick one with a large market size, it's dMRV.",
    mentions: 4,
  },
  {
    title: 'Standardisation remains a major gap',
    quote: 'Six calculators would give six different numbers.',
    mentions: 3,
  },
];

export const exploringItems: ExploringItem[] = [
  {
    title: 'Compliance-grade emissions data',
    description: 'Structured, audit-ready Scope 1, 2, and 3 data for EU ETS, CBAM, and CSRD.',
    topics: [
      'Scope 1, 2 & 3 accounting frameworks',
      'GHG Protocol standards',
      'EU ETS data requirements',
      'CBAM embedded emissions reporting',
      'CSRD disclosure standards',
      'Data validation & quality pipelines',
      'Audit trail architecture',
    ],
  },
  {
    title: 'Digital MRV',
    description: 'Satellite, IoT, and AI-driven continuous measurement, reporting, and verification.',
    topics: [
      'Satellite imagery analysis',
      'IoT sensor network integration',
      'AI-driven anomaly detection',
      'Continuous monitoring systems',
      'Ground-truthing methodologies',
      'Remote sensing protocols',
      'Local calibration data requirements',
    ],
  },
  {
    title: 'Audit-ready reporting',
    description: 'Compliance-grade documentation structured to survive regulatory review.',
    topics: [
      'Third-party verification workflows',
      'Regulatory documentation standards',
      'Chain of custody tracking',
      'Compliance evidence management',
      'Registry submission protocols',
      'Cross-border reporting requirements',
    ],
  },
  {
    title: 'Carbon market intelligence',
    description: 'Structured data on credit supply, demand, registry activity, and compliance exposure.',
    topics: [
      'Registry API integrations',
      'Credit supply & demand signals',
      'Price discovery mechanisms',
      'VCM market structure & trends',
      'Compliance market analytics',
      'Buyer demand profiling',
    ],
  },
  {
    title: 'Trust and verification infrastructure',
    description: 'UNIC — Universal Carbon Identifier — traceable across registries and geographies.',
    topics: [
      'Universal Carbon Identifier (UNIC)',
      'Cross-registry reconciliation',
      'Digital attestation protocols',
      'Interoperability standards',
      'Double-counting prevention',
      'Provenance & traceability layers',
    ],
  },
];


export const researchCards: ResearchCard[] = [
  {
    tag: 'REGULATION',
    title: 'CBAM: What the Q1 2026 certificate price means for European industrial imports',
    href: 'https://www.linkedin.com/in/iamsahilkhan/',
  },
  {
    tag: 'MARKET',
    title: 'Why the VCM contracted — and what compliance demand means for recovery',
    href: 'https://www.linkedin.com/in/iamsahilkhan/',
  },
  {
    tag: 'TECHNOLOGY',
    title: 'What Digital MRV can and cannot do: an honest assessment of satellite limits',
    href: 'https://www.linkedin.com/in/iamsahilkhan/',
  },
  {
    tag: 'INDIA',
    title: 'CCTS and the emergence of compliance carbon markets in India: a field perspective',
    href: 'https://www.linkedin.com/in/iamsahilkhan/',
  },
  {
    tag: 'INSIGHTS',
    title: '20+ stakeholder interviews: recurring themes from consultants, registries, policy experts',
    href: 'https://www.linkedin.com/in/iamsahilkhan/',
  },
  {
    tag: 'DMRV',
    title: 'Ground-truthing, canopy saturation, and why local calibration data still matters in 2026',
    href: 'https://www.linkedin.com/in/iamsahilkhan/',
  },
];
