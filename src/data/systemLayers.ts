import { SystemLayerData } from '../types';

export const SYSTEM_LAYERS: SystemLayerData[] = [
  {
    id: 'layer-01',
    index: '01',
    name: 'INTERFACE',
    category: 'Spatial Perception & Tactile Surfaces',
    materialFinish: 'Brushed Titanium / Matte Glass / 0.4mm Chamfer',
    description: 'Direct sensory interaction layer engineered for micro-latency visual responsiveness, tactile micro-vibration, and physical gesture recognition.',
    architectureNotes: 'Eliminates unnecessary virtual abstractions. Built with low-overhead canvas pipelines, custom webGL shaders, and accessibility-first keyboard & touch kinematics.',
    specs: [
      { label: 'Render Budget', value: '< 1.4ms per frame (120 FPS)' },
      { label: 'Input Latency', value: 'Sub-4ms touch-to-photon' },
      { label: 'Spatial Physics', value: 'Spring mass-damper kinematics' }
    ],
    telemetryStream: [
      { metric: 'Display Bus Clock', status: 'Optimal', value: '120.0 Hz' },
      { metric: 'Frame Buffer Drop', status: 'Zero', value: '0.00%' },
      { metric: 'Input Poll Frequency', status: 'Active', value: '1000 Hz' }
    ]
  },
  {
    id: 'layer-02',
    index: '02',
    name: 'APPLICATION',
    category: 'Deterministic Core & State Orchestration',
    materialFinish: 'Hardened Anodized Aluminum / Laser-Etched Bus',
    description: 'The computational heartbeat. Manages state machines, offline-first local cache reconciliation, and high-throughput concurrent domain logic.',
    architectureNotes: 'Strict unidirectional state transitions with zero mutable leakages. Guaranteed idempotent actions and instantaneous optimistic updates.',
    specs: [
      { label: 'State Isolation', value: 'Isolated Event Store' },
      { label: 'Concurrent Workers', value: '8 Dedicated WebThreads' },
      { label: 'Memory Footprint', value: '14.2 MB Steady' }
    ],
    telemetryStream: [
      { metric: 'Core Event Loop', status: 'Stable', value: '0.18ms latency' },
      { metric: 'State Snapshot Delta', status: 'Synced', value: '0 bytes drift' },
      { metric: 'Worker Saturation', status: 'Normal', value: '14.8%' }
    ]
  },
  {
    id: 'layer-03',
    index: '03',
    name: 'DATA',
    category: 'Durable Ledger & Local-First Distributed Store',
    materialFinish: 'Milled Silicon / Thermal Graphite Backplane',
    description: 'Resilient, conflict-free replicated storage architecture guaranteeing continuous operation across zero-connectivity and high-jitter field environments.',
    architectureNotes: 'CRDT-based synchronization protocol paired with embedded indexed storage and cryptographic integrity validation on every local commit.',
    specs: [
      { label: 'Sync Protocol', value: 'State-based CRDT Mesh' },
      { label: 'Cold Storage Latency', value: '2.1ms Local Read' },
      { label: 'Conflict Resolution', value: 'Deterministic Vector Clock' }
    ],
    telemetryStream: [
      { metric: 'Local Read Throughput', status: 'Nominal', value: '840 MB/s' },
      { metric: 'Replication Queue', status: 'Clear', value: '0 pending' },
      { metric: 'Integrity Checksum', status: 'Verified', value: 'SHA-256 Valid' }
    ]
  },
  {
    id: 'layer-04',
    index: '04',
    name: 'AUTOMATION',
    category: 'Hardware Relays & Ambient Event Bridges',
    materialFinish: 'Oxidized Steel / Brass Pinout Contacts',
    description: 'Physical and logical actuation bridge connecting digital triggers directly to external environmental controllers, lighting relays, and industrial machinery.',
    architectureNotes: 'Hardware abstraction layer communicating over CAN bus, MQTT, and secure serial websockets with hard fail-safe mechanical fallbacks.',
    specs: [
      { label: 'Relay Actuation', value: '12ms Mechanical Cycle' },
      { label: 'Protocol Tolerance', value: 'CAN 2.0B / Modbus RTU' },
      { label: 'Fail-Safe Mode', value: 'Hardware Watchdog Reset' }
    ],
    telemetryStream: [
      { metric: 'Relay Bus Voltage', status: 'Nominal', value: '24.0V DC' },
      { metric: 'Physical Trigger Count', status: 'Tracking', value: '184.2K total' },
      { metric: 'Watchdog Ping', status: 'Healthy', value: 'Every 50ms' }
    ]
  },
  {
    id: 'layer-05',
    index: '05',
    name: 'INTELLIGENCE',
    category: 'Edge Neural Models & Contextual Inference',
    materialFinish: 'Die-Cast Zinc / Dark Ceramic Heat Sink',
    description: 'Autonomous neural inference layer operating directly at the perimeter to predict user intent, filter anomalous telemetry, and synthesize natural outputs.',
    architectureNotes: 'Quantized neural architectures executed locally on NPU hardware with zero reliance on cloud latency or external telemetry transmission.',
    specs: [
      { label: 'Quantization', value: 'INT8 / INT4 Hybrid Weights' },
      { label: 'Inference Speed', value: '62 tokens/sec local' },
      { label: 'Context Budget', value: '32k Token Sliding Window' }
    ],
    telemetryStream: [
      { metric: 'NPU Core Temperature', status: 'Nominal', value: '41.2°C' },
      { metric: 'Inference Confidence', status: 'High', value: '99.4%' },
      { metric: 'Context Buffer Load', status: 'Active', value: '12.8 KB' }
    ]
  }
];
