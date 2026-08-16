export type CursorState = 'default' | 'view' | 'inspect' | 'enter' | 'close' | 'drag';

export interface ChapterMeta {
  id: string;
  number: string;
  name: string;
  material: string;
  lightSource: string;
}

export interface ProjectData {
  id: string;
  title: string;
  client: string;
  year: string;
  discipline: string;
  role: string;
  accentColor: string;
  heroImage: string;
  secondaryImage: string;
  detailImage: string;
  summary: string;
  challenge: string;
  solution: string;
  dimensions?: string;
  materials?: string;
  stats?: { label: string; value: string }[];
  tags: string[];
}

export interface SystemLayerData {
  id: string;
  index: string;
  name: string;
  category: string;
  materialFinish: string;
  description: string;
  architectureNotes: string;
  specs: { label: string; value: string }[];
  telemetryStream: { metric: string; status: string; value: string }[];
}

export interface ProcessStageData {
  id: string;
  step: string;
  title: string;
  materialTone: string;
  artifactType: string;
  fieldNotes: string;
  sketchUrl: string;
  physicalAction: string;
  annotations: string[];
}
