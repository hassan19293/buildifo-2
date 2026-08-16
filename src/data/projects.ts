import { ProjectData } from '../types';

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'the-grill-house',
    title: 'THE GRILL HOUSE',
    client: 'The Grill House Hospitality Group',
    year: '2025',
    discipline: 'Spatial Identity / Tactile Ordering Systems',
    role: 'Physical Interface & Digital Architecture',
    accentColor: '#D97736', // Warm amber / terracotta
    heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85', // Warm culinary architectural interior with fire and wood
    secondaryImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80', // Tactile restaurant lighting & architectural table
    detailImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80', // Smoked culinary craftsmanship & textures
    summary: 'A multisensory hospitality environment bridging physical dining architecture with silent, tactile tableside ordering and ambient kitchen orchestration.',
    challenge: 'High-end hospitality requires zero screen distraction. Guests must feel immersed in flame, wood, and conversations rather than staring at illuminated digital menus.',
    solution: 'We engineered custom brass-inlaid NFC touchpoints and low-luminance e-ink physical menus synchronised with an invisible backstage kitchen routing engine.',
    dimensions: '380 m² Dining Floor / 18 Kitchen Relays',
    materials: 'Smoked Oak, Cast Bronze, Charcoal Plaster, E-Paper',
    stats: [
      { label: 'Order Latency', value: '0.4s to pass' },
      { label: 'Table Turnover Delight', value: '+34%' },
      { label: 'Screen Distraction Index', value: 'Zero Emission' }
    ],
    tags: ['Spatial Systems', 'E-Ink Tactile', 'Hospitality OS', 'Bronze Fixtures']
  },
  {
    id: 'synapse-ai-system',
    title: 'SYNAPSE AI ENGINE',
    client: 'Applied Cognition Labs',
    year: '2026',
    discipline: 'Machine Architecture / Physical Compute Telemetry',
    role: 'Full-Stack Model Pipeline & Industrial Interface',
    accentColor: '#8C9BAE', // Steel slate
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85', // Industrial brushed hardware / micro-engineering macro
    secondaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80', // Precision industrial workshop & testing setup
    detailImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80', // Physical laboratory measurement instruments
    summary: 'An industrial intelligence orchestrator translating continuous sensor telemetry from precision manufacturing mills into deterministic actuation cycles.',
    challenge: 'Machine operators needed immediate situational awareness without wading through cluttered dashboard charts or delayed cloud metrics.',
    solution: 'Engineered an edge-native embedded runtime with sub-millisecond local inference, rendered through custom high-contrast monochrome displays on the factory line.',
    dimensions: 'Rack-Mounted Edge Unit / 42 Sensor Streams',
    materials: 'Milled Aluminum, Anodized Graphite, Toughened Sapphire Glass',
    stats: [
      { label: 'Edge Inference', value: '1.8 ms' },
      { label: 'Autonomous Uptime', value: '99.999%' },
      { label: 'Anomalies Filtered', value: '2.4M / day' }
    ],
    tags: ['Edge Intelligence', 'Telemetry Hardware', 'Deterministic Runtime', 'Industrial UI']
  },
  {
    id: 'aura-restaurant-os',
    title: 'AURA RESTAURANT OS',
    client: 'Monolith Culinary Group',
    year: '2025',
    discipline: 'Point-of-Service Architecture / Kitchen OS',
    role: 'Physical POS Enclosure & Operating System',
    accentColor: '#9E9484', // Sand & oxidized metal tone
    heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85', // Industrial stainless steel kitchen pass & warm halogen
    secondaryImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80', // Modern atmospheric dining space with concrete & oak
    detailImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80', // Tactile architectural model & wood joints
    summary: 'A unified operating system connecting reservation ledgers, cold-chain refrigeration sensors, and pass-station kitchen display units into one harmonious physical workflow.',
    challenge: 'Kitchen environments are harsh: heat, steam, grease, and lightning-fast shifts break fragile consumer tablets and clumsy software.',
    solution: 'Designed an IP67 water-sealed brushed-steel physical terminal paired with an instantaneous tactile rotary interface and fail-safe local mesh sync.',
    dimensions: 'Custom 12-inch Sealed Steel Enclosure / Mesh Node',
    materials: 'Grade 316 Stainless Steel, Tactile Rotary Knob, Ceramic Coat',
    stats: [
      { label: 'Mesh Sync Speed', value: '8ms Local' },
      { label: 'Pass Error Reduction', value: '98.2%' },
      { label: 'Drop & Heat Rating', value: 'IP67 / 85°C' }
    ],
    tags: ['Kitchen Architecture', 'Rotary Physical UI', 'Local Mesh', 'IP67 Steel']
  }
];
