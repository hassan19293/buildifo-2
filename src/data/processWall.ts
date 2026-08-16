import { ProcessStageData } from '../types';

export const PROCESS_STAGES: ProcessStageData[] = [
  {
    id: 'stage-look',
    step: '01',
    title: 'LOOK',
    materialTone: 'Raw Sand / Heavy Tracing Paper',
    artifactType: 'Field Observation & Spatial Audit',
    fieldNotes: 'We begin on-site with cameras, notebooks, and measuring tape. We map human friction, physical traffic, spatial bottlenecks, and material constraints before touching software.',
    sketchUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=900&q=80', // Architectural sketches and drafts on paper
    physicalAction: 'Measure physical site & user touchpoints',
    annotations: [
      'Site audit: 18 friction nodes identified',
      'Observe natural ambient lighting angles',
      'Discard 80% of unnecessary UI assumptions'
    ]
  },
  {
    id: 'stage-shape',
    step: '02',
    title: 'SHAPE',
    materialTone: 'Grey Chipboard & Model Foam',
    artifactType: 'Volumetric & Structural Hierarchy',
    fieldNotes: 'Defining mathematical proportions, content density, and system topography. We carve out the spatial negative space and establish exact optical rhythms.',
    sketchUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80', // Architectural model & paper study
    physicalAction: 'Carve primary volumetric boundaries',
    annotations: [
      'Scale ratio: 1.25 optical baseline',
      'Strict material boundaries defined',
      'Single directional daylight coordinate'
    ]
  },
  {
    id: 'stage-design',
    step: '03',
    title: 'DESIGN',
    materialTone: 'Pressed Cotton Paper & Typographic Proofs',
    artifactType: 'Typographic & Physical Material System',
    fieldNotes: 'Crafting the typographic hierarchy, tactile palette, custom controls, and micro-interactions. Every visual decision has mathematical and optical justification.',
    sketchUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=80', // Editorial color swatches, paper, material layout
    physicalAction: 'Typeset editorial scale & tactile palette',
    annotations: [
      'Big Shoulders Display + Inter pairing',
      'Zero arbitrary glow; single pilot LED',
      'Tactile relief on interactive surfaces'
    ]
  },
  {
    id: 'stage-engineer',
    step: '04',
    title: 'ENGINEER',
    materialTone: 'Machined Steel & Logic Schematics',
    artifactType: 'Deterministic Full-Stack Engine',
    fieldNotes: 'Writing resilient, deterministic code. We build edge-first architectures, low-latency rendering pipelines, and hardware-grade local state managers.',
    sketchUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=900&q=80', // Precision engineering schematics and tools
    physicalAction: 'Compile zero-latency deterministic core',
    annotations: [
      'Sub-2ms frame render budget',
      'CRDT offline replication ledger',
      'Zero dependency bloat'
    ]
  },
  {
    id: 'stage-intelligence',
    step: '05',
    title: 'INTELLIGENCE',
    materialTone: 'Anodized Silicon & Model Weights',
    artifactType: 'Perimeter Neural Orchestration',
    fieldNotes: 'Integrating contextual neural models directly into the physical loop. We train models to predict human intent silently without intrusive chatbot dialogs.',
    sketchUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80', // Precision hardware and silicon routing
    physicalAction: 'Embed local perimeter inference loops',
    annotations: [
      'Sub-millisecond local inference',
      'Zero cloud roundtrip for core operations',
      'Predictive tactile affordance'
    ]
  },
  {
    id: 'stage-evolve',
    step: '06',
    title: 'EVOLVE',
    materialTone: 'Aged Oak & Living Archive Ledger',
    artifactType: 'Longitudinal Telemetry & Refinement',
    fieldNotes: 'Deploying into the physical world and continuously tuning performance, ergonomics, and material resilience based on real-world sensory usage.',
    sketchUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80', // Real living architectural space in use
    physicalAction: 'Monitor field telemetry & ergonomics',
    annotations: [
      'Telemetry audit every 14 days',
      'Ergonomic refinement cycle',
      'Durable multi-year platform longevity'
    ]
  }
];
