import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface Global3DWorldProps {
  scrollProgress: number; // 0 to 1 across whole page
  activeChapterIndex: number;
  activeSystemLayerIndex?: number; // 0 to 4
  hoveredProjectIndex?: number | null; // 0, 1, 2
  pointerX: number;
  pointerY: number;
}

// =============================================================================
// CAMERA LERP STATE & FRAME CONTEXT INTERFACES
// =============================================================================
export interface CameraLerpState {
  // Current integrated physics position & look
  currentPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  posVelocity: THREE.Vector3;

  currentLook: THREE.Vector3;
  targetLook: THREE.Vector3;
  lookVelocity: THREE.Vector3;

  // Previous physics state for sub-frame alpha interpolation
  prevPos: THREE.Vector3;
  prevLook: THREE.Vector3;

  // Sub-frame interpolated vectors
  interpolatedPos: THREE.Vector3;
  interpolatedLook: THREE.Vector3;

  // Pointer smoothing physics
  currentPointerX: number;
  currentPointerY: number;
  pointerVelX: number;
  pointerVelY: number;

  // Camera Roll & Screen Dynamics
  currentRoll: number;
  screenVelX: number;
  screenVelY: number;
  radialSpeed: number;
  motionBlurIntensity: number;
}

export interface FrameContext {
  clock: THREE.Clock;
  deltaTime: number;
  elapsedTime: number;
  alpha: number; // Sub-frame interpolation factor [0, 1]
  lerpState: CameraLerpState;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  renderTarget: THREE.WebGLRenderTarget | null;
  postScene: THREE.Scene;
  postCamera: THREE.OrthographicCamera;
  motionBlurMaterial: THREE.ShaderMaterial;
  prefersReducedMotion: boolean;
}

export type FrameCallback = (context: FrameContext) => void;

/**
 * Critically-Damped Spring-Damper (SmoothDamp) physics solver
 * Frame-rate independent, zero overshoot jitter, realistic physical mass.
 */
export function smoothDampVec3(
  current: THREE.Vector3,
  target: THREE.Vector3,
  currentVelocity: THREE.Vector3,
  smoothTime: number,
  maxSpeed: number,
  deltaTime: number
): THREE.Vector3 {
  const st = Math.max(0.0001, smoothTime);
  const omega = 2.0 / st;
  const x = omega * deltaTime;
  const exp = 1.0 / (1.0 + x + 0.48 * x * x + 0.235 * x * x * x);

  let changeX = current.x - target.x;
  let changeY = current.y - target.y;
  let changeZ = current.z - target.z;

  const maxChange = maxSpeed * st;
  const changeSq = changeX * changeX + changeY * changeY + changeZ * changeZ;
  if (changeSq > maxChange * maxChange) {
    const changeDist = Math.sqrt(changeSq);
    changeX = (changeX / changeDist) * maxChange;
    changeY = (changeY / changeDist) * maxChange;
    changeZ = (changeZ / changeDist) * maxChange;
  }

  const tempTargetX = current.x - changeX;
  const tempTargetY = current.y - changeY;
  const tempTargetZ = current.z - changeZ;

  const tempVelX = (currentVelocity.x + omega * changeX) * deltaTime;
  const tempVelY = (currentVelocity.y + omega * changeY) * deltaTime;
  const tempVelZ = (currentVelocity.z + omega * changeZ) * deltaTime;

  currentVelocity.x = (currentVelocity.x - omega * tempVelX) * exp;
  currentVelocity.y = (currentVelocity.y - omega * tempVelY) * exp;
  currentVelocity.z = (currentVelocity.z - omega * tempVelZ) * exp;

  let outX = tempTargetX + (changeX + tempVelX) * exp;
  let outY = tempTargetY + (changeY + tempVelY) * exp;
  let outZ = tempTargetZ + (changeZ + tempVelZ) * exp;

  const origMinusTargetX = target.x - current.x;
  const origMinusTargetY = target.y - current.y;
  const origMinusTargetZ = target.z - current.z;
  const outMinusTargetX = outX - target.x;
  const outMinusTargetY = outY - target.y;
  const outMinusTargetZ = outZ - target.z;

  if (origMinusTargetX * outMinusTargetX + origMinusTargetY * outMinusTargetY + origMinusTargetZ * outMinusTargetZ > 0) {
    outX = target.x;
    outY = target.y;
    outZ = target.z;
    currentVelocity.set(0, 0, 0);
  }

  current.set(outX, outY, outZ);
  return current;
}

// Spline / Keyframe interpolation coordinates across 7 chapters
// Progress: 0.0 (Arrival) -> 0.16 (Reveal) -> 0.33 (Work) -> 0.50 (System) -> 0.67 (Studio) -> 0.83 (Approach) -> 1.0 (Invitation)
export const CAMERA_WAYPOINTS = [
  { p: 0.00, pos: [0.0, 0.4, 9.0], look: [0.0, 0.0, -6.0] },
  { p: 0.16, pos: [1.2, 0.8, -16.0], look: [2.5, 0.0, -32.0] },
  { p: 0.33, pos: [-0.5, 0.6, -48.0], look: [-2.0, 0.5, -68.0] },
  { p: 0.50, pos: [0.0, 1.2, -88.0], look: [0.0, 1.2, -104.0] },
  { p: 0.67, pos: [1.8, 0.3, -124.0], look: [3.4, -0.2, -138.0] },
  { p: 0.83, pos: [-2.5, 0.8, -156.0], look: [-6.5, 1.2, -172.0] },
  { p: 1.00, pos: [0.0, 1.4, -196.0], look: [0.0, 3.0, -225.0] },
];

export function getInterpolatedCamera(progress: number) {
  const clamped = Math.max(0, Math.min(1, progress));
  for (let i = 0; i < CAMERA_WAYPOINTS.length - 1; i++) {
    const wpA = CAMERA_WAYPOINTS[i];
    const wpB = CAMERA_WAYPOINTS[i + 1];
    if (clamped >= wpA.p && clamped <= wpB.p) {
      const t = (clamped - wpA.p) / (wpB.p - wpA.p);
      // Smooth cosine / cubic ease for filmic camera travel
      const easeT = 0.5 - Math.cos(t * Math.PI) * 0.5;

      const targetX = wpA.pos[0] + (wpB.pos[0] - wpA.pos[0]) * easeT;
      const targetY = wpA.pos[1] + (wpB.pos[1] - wpA.pos[1]) * easeT;
      const targetZ = wpA.pos[2] + (wpB.pos[2] - wpA.pos[2]) * easeT;

      const targetLookX = wpA.look[0] + (wpB.look[0] - wpA.look[0]) * easeT;
      const targetLookY = wpA.look[1] + (wpB.look[1] - wpA.look[1]) * easeT;
      const targetLookZ = wpA.look[2] + (wpB.look[2] - wpA.look[2]) * easeT;

      return { pos: [targetX, targetY, targetZ], look: [targetLookX, targetLookY, targetLookZ] };
    }
  }
  const last = CAMERA_WAYPOINTS[CAMERA_WAYPOINTS.length - 1];
  return { pos: last.pos, look: last.look };
}

export const Global3DWorld: React.FC<Global3DWorldProps> = ({
  scrollProgress,
  activeChapterIndex,
  activeSystemLayerIndex = 0,
  hoveredProjectIndex = null,
  pointerX,
  pointerY,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number | null>(null);

  // References to dynamic objects
  const systemPlatesRef = useRef<THREE.Mesh[]>([]);
  const exhibitGroupsRef = useRef<THREE.Group[]>([]);
  const studioLampLightRef = useRef<THREE.PointLight | null>(null);
  const approachCardsRef = useRef<THREE.Group[]>([]);
  const sunlightRef = useRef<THREE.DirectionalLight | null>(null);

  // Props refs for access inside RAF loop
  const propsRef = useRef({
    scrollProgress,
    activeChapterIndex,
    activeSystemLayerIndex,
    hoveredProjectIndex,
    pointerX,
    pointerY,
  });

  useEffect(() => {
    propsRef.current = {
      scrollProgress,
      activeChapterIndex,
      activeSystemLayerIndex,
      hoveredProjectIndex,
      pointerX,
      pointerY,
    };
  }, [scrollProgress, activeChapterIndex, activeSystemLayerIndex, hoveredProjectIndex, pointerX, pointerY]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. SCENE CREATION
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080808);
    // Exponential atmospheric depth fog
    scene.fog = new THREE.FogExp2(0x080808, 0.016);
    sceneRef.current = scene;

    // 2. CAMERA
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const initialFov = isMobile ? 48 : isTablet ? 42 : 38;
    const camera = new THREE.PerspectiveCamera(initialFov, width / height, 0.1, 300);
    camera.position.set(0, 0.4, 9.0);
    cameraRef.current = camera;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. TEXTURE GENERATORS (Procedural High-Precision Architectural Materials)
    const createNoiseTexture = (type: 'concrete' | 'paper' | 'metal' | 'grid' | 'drawing') => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      if (type === 'concrete') {
        ctx.fillStyle = '#1c1b18';
        ctx.fillRect(0, 0, 512, 512);
        // Add aggregate flecks and subtle concrete noise
        for (let i = 0; i < 20000; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const val = Math.random() * 40;
          ctx.fillStyle = `rgba(${val},${val},${val},0.08)`;
          ctx.fillRect(x, y, 1.5, 1.5);
        }
        // Score joints
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, 512, 512);
      } else if (type === 'paper') {
        ctx.fillStyle = '#f2efe9';
        ctx.fillRect(0, 0, 512, 512);
        for (let i = 0; i < 15000; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          ctx.fillStyle = 'rgba(100,90,75,0.03)';
          ctx.fillRect(x, y, 1, 1);
        }
        // Subtle blueprint drafting lines
        ctx.strokeStyle = 'rgba(0,0,0,0.06)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 512; i += 64) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, 512);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(512, i);
          ctx.stroke();
        }
      } else if (type === 'metal') {
        ctx.fillStyle = '#1e2022';
        ctx.fillRect(0, 0, 512, 512);
        // Linear brushing lines
        for (let i = 0; i < 800; i++) {
          const y = Math.random() * 512;
          const alpha = Math.random() * 0.15;
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(512, y);
          ctx.stroke();
        }
      } else if (type === 'drawing') {
        ctx.fillStyle = '#e8e3d8';
        ctx.fillRect(0, 0, 512, 512);
        ctx.strokeStyle = '#1a1917';
        ctx.lineWidth = 1.5;
        // Draw architectural floor plan schematic
        ctx.strokeRect(40, 40, 432, 432);
        ctx.strokeRect(80, 80, 200, 200);
        ctx.strokeRect(300, 80, 132, 312);
        ctx.beginPath();
        ctx.arc(180, 180, 60, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#1a1917';
        ctx.font = 'bold 16px monospace';
        ctx.fillText('PLAN REF: ISB-02 // 1:50', 50, 460);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return texture;
    };

    const concreteTex = createNoiseTexture('concrete');
    concreteTex.repeat.set(4, 20);
    const paperTex = createNoiseTexture('paper');
    const metalTex = createNoiseTexture('metal');
    const drawingTex = createNoiseTexture('drawing');

    // 5. GLOBAL CONTINUOUS ARCHITECTURAL FLOOR & CEILING
    // Continuous concrete floor extending all the way from z = 20 to z = -240
    const floorGeo = new THREE.PlaneGeometry(60, 260);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x121210,
      map: concreteTex,
      roughness: 0.82,
      metalness: 0.15,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -1.8, -110);
    floor.receiveShadow = true;
    scene.add(floor);

    // Deep architectural ambient ceiling plane with shadow baffles
    const ceilingGeo = new THREE.PlaneGeometry(60, 260);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a09,
      roughness: 0.95,
      metalness: 0.1,
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 9.5, -110);
    scene.add(ceiling);

    // Lateral architectural enclosure walls
    const leftWallGeo = new THREE.PlaneGeometry(260, 12);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x141412,
      roughness: 0.9,
      metalness: 0.1,
    });
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-18, 4.0, -110);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(leftWallGeo, wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(18, 4.0, -110);
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // 6. SHARED MATERIALS
    const blackenedSteelMat = new THREE.MeshStandardMaterial({
      color: 0x141413,
      metalness: 0.85,
      roughness: 0.38,
      map: metalTex,
    });

    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x1d1c1a,
      roughness: 0.88,
      metalness: 0.12,
    });

    const warmOakMat = new THREE.MeshStandardMaterial({
      color: 0x4a3622,
      roughness: 0.75,
      metalness: 0.05,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xa8b8c4,
      transparent: true,
      opacity: 0.28,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.75,
      ior: 1.52,
    });

    // =========================================================================
    // ZONE 01: ARRIVAL (Z ~ 8 to 0) — Monumental Entrance Portal
    // =========================================================================
    const arrivalGroup = new THREE.Group();
    arrivalGroup.position.set(0, 0, 0);
    scene.add(arrivalGroup);

    // Left monolithic pillar
    const pillarGeo = new THREE.BoxGeometry(2.6, 7.5, 3.2);
    const leftPillar = new THREE.Mesh(pillarGeo, concreteMat);
    leftPillar.position.set(-4.0, 1.9, 0);
    leftPillar.castShadow = true;
    leftPillar.receiveShadow = true;
    arrivalGroup.add(leftPillar);

    // Right monolithic pillar
    const rightPillar = new THREE.Mesh(pillarGeo, concreteMat);
    rightPillar.position.set(4.0, 1.9, 0);
    rightPillar.castShadow = true;
    rightPillar.receiveShadow = true;
    arrivalGroup.add(rightPillar);

    // Lintel beam spanning top
    const lintelGeo = new THREE.BoxGeometry(10.6, 1.8, 3.4);
    const lintel = new THREE.Mesh(lintelGeo, blackenedSteelMat);
    lintel.position.set(0, 5.6, 0);
    lintel.castShadow = true;
    lintel.receiveShadow = true;
    arrivalGroup.add(lintel);

    // Partially open massive steel pivot door
    const doorGeo = new THREE.BoxGeometry(0.2, 5.8, 2.5);
    const door = new THREE.Mesh(doorGeo, blackenedSteelMat);
    door.position.set(-2.0, 1.1, -0.6);
    door.rotation.y = -0.52;
    door.castShadow = true;
    door.receiveShadow = true;
    arrivalGroup.add(door);

    // Translucent glass side panel
    const glassGeo = new THREE.PlaneGeometry(2.2, 5.8);
    const glassPane = new THREE.Mesh(glassGeo, glassMat);
    glassPane.position.set(1.6, 1.1, -0.5);
    glassPane.rotation.y = 0.08;
    arrivalGroup.add(glassPane);

    // Arrival Directional Sunlight
    const arrivalSun = new THREE.DirectionalLight(0xfff2d6, 3.5);
    arrivalSun.position.set(-6, 7, 4);
    arrivalSun.target.position.set(2, 0, -5);
    arrivalSun.castShadow = !isMobile;
    if (arrivalSun.castShadow) {
      arrivalSun.shadow.mapSize.width = 1024;
      arrivalSun.shadow.mapSize.height = 1024;
      arrivalSun.shadow.camera.near = 0.5;
      arrivalSun.shadow.camera.far = 30;
      arrivalSun.shadow.bias = -0.0005;
    }
    scene.add(arrivalSun);
    scene.add(arrivalSun.target);
    sunlightRef.current = arrivalSun;

    // Distant pilot LED at corridor threshold
    const pilotGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const pilotMat = new THREE.MeshBasicMaterial({ color: 0xc8ff00 });
    const pilotLed = new THREE.Mesh(pilotGeo, pilotMat);
    pilotLed.position.set(0.4, -0.4, -6.5);
    scene.add(pilotLed);

    const pilotLight = new THREE.PointLight(0xc8ff00, 0.6, 2.5);
    pilotLight.position.set(0.4, -0.38, -6.4);
    scene.add(pilotLight);

    // =========================================================================
    // ZONE 02: REVEAL (Z ~ -18 to -36) — Daylight Architectural Workshop
    // =========================================================================
    const revealGroup = new THREE.Group();
    revealGroup.position.set(0, 0, -26);
    scene.add(revealGroup);

    // Vertical steel window mullions on left allowing daylight stream
    for (let i = 0; i < 5; i++) {
      const mullionGeo = new THREE.BoxGeometry(0.15, 8.0, 0.3);
      const mullion = new THREE.Mesh(mullionGeo, blackenedSteelMat);
      mullion.position.set(-11, 2.2, -6 + i * 3);
      revealGroup.add(mullion);

      const glassWinGeo = new THREE.PlaneGeometry(2.8, 8.0);
      const glassWin = new THREE.Mesh(glassWinGeo, glassMat);
      glassWin.rotation.y = Math.PI / 2;
      glassWin.position.set(-11.05, 2.2, -4.5 + i * 3);
      revealGroup.add(glassWin);
    }

    // Long architectural drafting table
    const tableTopGeo = new THREE.BoxGeometry(4.2, 0.18, 10.0);
    const tableTop = new THREE.Mesh(tableTopGeo, warmOakMat);
    tableTop.position.set(3.8, -0.8, 0);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    revealGroup.add(tableTop);

    // Heavy steel T-legs for table
    for (let legZ of [-3.8, 3.8]) {
      const legGeo = new THREE.BoxGeometry(3.6, 1.0, 0.2);
      const leg = new THREE.Mesh(legGeo, blackenedSteelMat);
      leg.position.set(3.8, -1.3, legZ);
      revealGroup.add(leg);
    }

    // Drafting paper sheets on table
    const paperSheetGeo = new THREE.PlaneGeometry(1.8, 2.6);
    const paperSheetMat = new THREE.MeshStandardMaterial({
      map: drawingTex,
      roughness: 0.9,
      metalness: 0.05,
    });
    const paperSheet1 = new THREE.Mesh(paperSheetGeo, paperSheetMat);
    paperSheet1.rotation.x = -Math.PI / 2;
    paperSheet1.rotation.z = 0.08;
    paperSheet1.position.set(3.5, -0.7, -1.5);
    paperSheet1.receiveShadow = true;
    revealGroup.add(paperSheet1);

    const paperSheet2 = new THREE.Mesh(paperSheetGeo, paperSheetMat);
    paperSheet2.rotation.x = -Math.PI / 2;
    paperSheet2.rotation.z = -0.15;
    paperSheet2.position.set(4.0, -0.69, 1.8);
    paperSheet2.receiveShadow = true;
    revealGroup.add(paperSheet2);

    // Material sample blocks (Marble / Timber / Brass) on table
    const sampleGeo = new THREE.BoxGeometry(0.5, 0.12, 0.8);
    const marbleMat = new THREE.MeshStandardMaterial({ color: 0xe0ddd5, roughness: 0.4 });
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xc89d42, roughness: 0.35, metalness: 0.85 });

    const sample1 = new THREE.Mesh(sampleGeo, marbleMat);
    sample1.position.set(2.4, -0.65, -0.2);
    revealGroup.add(sample1);

    const sample2 = new THREE.Mesh(sampleGeo, brassMat);
    sample2.position.set(2.5, -0.65, 0.8);
    revealGroup.add(sample2);

    // Daylight stream light for Zone 02
    const revealDaylight = new THREE.DirectionalLight(0xf5f0e6, 2.2);
    revealDaylight.position.set(-14, 8, -26);
    revealDaylight.target.position.set(3, 0, -26);
    scene.add(revealDaylight);
    scene.add(revealDaylight.target);

    // =========================================================================
    // ZONE 03: WORK (Z ~ -48 to -78) — Museum Gallery Exhibition Plinths
    // =========================================================================
    const workGroup = new THREE.Group();
    workGroup.position.set(0, 0, -62);
    scene.add(workGroup);

    // 3 Distinct Projects Plinths & Exhibition Framed Canvases
    const exhibitData = [
      {
        id: 'the-grill-house',
        title: 'THE GRILL HOUSE',
        pos: new THREE.Vector3(-4.2, 0, 10),
        color: 0xd97736,
        imgUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'synapse-ai-system',
        title: 'SYNAPSE AI ENGINE',
        pos: new THREE.Vector3(4.0, 0, -1),
        color: 0x8c9bae,
        imgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'aura-restaurant-os',
        title: 'AURA RESTAURANT OS',
        pos: new THREE.Vector3(-3.8, 0, -12),
        color: 0x9e9484,
        imgUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      },
    ];

    const textureLoader = new THREE.TextureLoader();

    exhibitData.forEach((ex, idx) => {
      const plinthGroup = new THREE.Group();
      plinthGroup.position.copy(ex.pos);
      workGroup.add(plinthGroup);
      exhibitGroupsRef.current.push(plinthGroup);

      // Monolithic Stone Plinth Base
      const plinthBaseGeo = new THREE.BoxGeometry(3.2, 1.4, 2.4);
      const plinthBaseMat = new THREE.MeshStandardMaterial({
        color: 0x161514,
        roughness: 0.85,
        metalness: 0.2,
      });
      const plinthBase = new THREE.Mesh(plinthBaseGeo, plinthBaseMat);
      plinthBase.position.y = -1.1;
      plinthBase.castShadow = true;
      plinthBase.receiveShadow = true;
      plinthGroup.add(plinthBase);

      // Museum Brass Plate Plaque on front of plinth
      const plaqueGeo = new THREE.PlaneGeometry(1.6, 0.45);
      const plaqueMat = new THREE.MeshStandardMaterial({
        color: ex.color,
        roughness: 0.4,
        metalness: 0.6,
      });
      const plaque = new THREE.Mesh(plaqueGeo, plaqueMat);
      plaque.position.set(0, -0.9, 1.22);
      plinthGroup.add(plaque);

      // Framed Physical Artwork Display Panel (Canvas Frame + Artwork Image)
      const frameGeo = new THREE.BoxGeometry(3.6, 2.6, 0.22);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x0e0e0d,
        roughness: 0.45,
        metalness: 0.7,
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.position.set(0, 1.2, 0);
      frame.castShadow = true;
      plinthGroup.add(frame);

      // Artwork Face
      const artGeo = new THREE.PlaneGeometry(3.3, 2.3);
      // Canvas with project texture or procedural backup
      const artCanvas = document.createElement('canvas');
      artCanvas.width = 512;
      artCanvas.height = 360;
      const actx = artCanvas.getContext('2d');
      if (actx) {
        actx.fillStyle = '#111110';
        actx.fillRect(0, 0, 512, 360);
        actx.strokeStyle = `#${ex.color.toString(16).padStart(6, '0')}`;
        actx.lineWidth = 4;
        actx.strokeRect(12, 12, 488, 336);
        actx.fillStyle = '#f5f3ee';
        actx.font = 'bold 24px monospace';
        actx.fillText(ex.title, 30, 60);
        actx.font = '14px sans-serif';
        actx.fillStyle = '#a6a39b';
        actx.fillText('ARCHITECTURAL COMMISSION // EXHIBIT 0' + (idx + 1), 30, 95);
        actx.fillText('BUILDIFO PHYSICAL PROOF // MUSEUM SPECIMEN', 30, 310);
      }
      const artTex = new THREE.CanvasTexture(artCanvas);

      // Attempt loading real photograph texture asynchronously
      textureLoader.load(
        ex.imgUrl,
        (loadedTex) => {
          loadedTex.generateMipmaps = true;
          artMat.map = loadedTex;
          artMat.needsUpdate = true;
        },
        undefined,
        () => {
          // Keep canvas fallback on network error
        }
      );

      const artMat = new THREE.MeshStandardMaterial({
        map: artTex,
        roughness: 0.5,
        metalness: 0.1,
      });
      const artMesh = new THREE.Mesh(artGeo, artMat);
      artMesh.position.set(0, 1.2, 0.12);
      plinthGroup.add(artMesh);

      // Dedicated Overhead Exhibition Spotlight
      const spot = new THREE.SpotLight(0xfffaed, 2.8, 12, Math.PI / 5, 0.45, 1.2);
      spot.position.set(ex.pos.x, 6.0, -62 + ex.pos.z + 1.5);
      spot.target.position.set(ex.pos.x, 1.0, -62 + ex.pos.z);
      spot.castShadow = !isMobile;
      scene.add(spot);
      scene.add(spot.target);
    });

    // =========================================================================
    // ZONE 04: SYSTEM (Z ~ -90 to -114) — Industrial Machine Room & 5 Plates
    // =========================================================================
    const systemGroup = new THREE.Group();
    systemGroup.position.set(0, 0, -102);
    scene.add(systemGroup);

    // Industrial Structural Steel Chassis Rack
    const chassisGeo = new THREE.BoxGeometry(8.5, 6.5, 4.5);
    const chassisFrameMat = new THREE.MeshStandardMaterial({
      color: 0x111110,
      roughness: 0.4,
      metalness: 0.8,
      wireframe: false,
    });

    // Chassis corner uprights
    for (let cx of [-4.0, 4.0]) {
      for (let cz of [-2.0, 2.0]) {
        const postGeo = new THREE.BoxGeometry(0.35, 6.5, 0.35);
        const post = new THREE.Mesh(postGeo, chassisFrameMat);
        post.position.set(cx, 1.5, cz);
        systemGroup.add(post);
      }
    }

    // Heavy Top & Bottom steel plates
    const slabGeo = new THREE.BoxGeometry(8.6, 0.3, 4.6);
    const topSlab = new THREE.Mesh(slabGeo, chassisFrameMat);
    topSlab.position.set(0, 4.8, 0);
    systemGroup.add(topSlab);

    const bottomSlab = new THREE.Mesh(slabGeo, chassisFrameMat);
    bottomSlab.position.set(0, -1.6, 0);
    systemGroup.add(bottomSlab);

    // 5 Interactive Physical Mechanical Plates (Stacked along depth Z)
    const plateNames = ['01_INTERFACE', '02_APPLICATION', '03_DATA', '04_AUTOMATION', '05_INTELLIGENCE'];
    systemPlatesRef.current = [];

    plateNames.forEach((pname, pIdx) => {
      const plateGeo = new THREE.BoxGeometry(7.0, 0.9, 0.45);
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 512;
      pCanvas.height = 128;
      const pctx = pCanvas.getContext('2d');
      if (pctx) {
        pctx.fillStyle = '#181816';
        pctx.fillRect(0, 0, 512, 128);
        pctx.strokeStyle = '#333330';
        pctx.lineWidth = 2;
        pctx.strokeRect(4, 4, 504, 120);
        pctx.fillStyle = '#c8ff00';
        pctx.font = 'bold 20px monospace';
        pctx.fillText(`TIER [${pname}] // HARDWARE BUS`, 20, 45);
        pctx.fillStyle = '#a6a39b';
        pctx.font = '14px monospace';
        pctx.fillText('STATUS: SYNCHRONIZED // 512-BIT EDGE NODE', 20, 85);
      }
      const pTex = new THREE.CanvasTexture(pCanvas);

      const plateMat = new THREE.MeshStandardMaterial({
        map: pTex,
        color: 0x222220,
        roughness: 0.4,
        metalness: 0.7,
      });

      const plateMesh = new THREE.Mesh(plateGeo, plateMat);
      // Position stacked vertically and stepped in depth
      const yPos = 3.6 - pIdx * 1.15;
      const zPos = -1.2 + pIdx * 0.6;
      plateMesh.position.set(0, yPos, zPos);
      plateMesh.castShadow = true;
      plateMesh.receiveShadow = true;

      // Small green pilot status LED on plate face
      const ledGeo = new THREE.SphereGeometry(0.035, 12, 12);
      const ledMat = new THREE.MeshBasicMaterial({ color: 0xc8ff00 });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(3.2, 0, 0.25);
      plateMesh.add(led);

      systemGroup.add(plateMesh);
      systemPlatesRef.current.push(plateMesh);
    });

    // Overhead Industrial Lamp
    const workshopLight = new THREE.PointLight(0xfff0d4, 3.2, 16);
    workshopLight.position.set(0, 6.0, -102);
    scene.add(workshopLight);

    // =========================================================================
    // ZONE 05: STUDIO (Z ~ -126 to -146) — Warm Tactile Atelier Workshop
    // =========================================================================
    const studioGroup = new THREE.Group();
    studioGroup.position.set(0, 0, -136);
    scene.add(studioGroup);

    // Natural Oiled Oak Crafting Desk
    const deskGeo = new THREE.BoxGeometry(5.2, 0.2, 3.2);
    const desk = new THREE.Mesh(deskGeo, warmOakMat);
    desk.position.set(3.6, -0.7, 0);
    desk.castShadow = true;
    desk.receiveShadow = true;
    studioGroup.add(desk);

    // Solid desk wooden legs
    for (let dx of [1.4, 5.8]) {
      for (let dz of [-1.2, 1.2]) {
        const dlegGeo = new THREE.BoxGeometry(0.2, 1.1, 0.2);
        const dleg = new THREE.Mesh(dlegGeo, warmOakMat);
        dleg.position.set(dx, -1.25, dz);
        studioGroup.add(dleg);
      }
    }

    // Classic Brass Task Lamp
    const lampBaseGeo = new THREE.CylinderGeometry(0.25, 0.28, 0.08, 16);
    const lampBrassMat = new THREE.MeshStandardMaterial({
      color: 0xcca658,
      roughness: 0.3,
      metalness: 0.85,
    });
    const lampBase = new THREE.Mesh(lampBaseGeo, lampBrassMat);
    lampBase.position.set(5.2, -0.55, -0.9);
    studioGroup.add(lampBase);

    // Lamp shade & bulb
    const lampShadeGeo = new THREE.ConeGeometry(0.32, 0.45, 16, 1, true);
    const lampShade = new THREE.Mesh(lampShadeGeo, lampBrassMat);
    lampShade.rotation.x = Math.PI / 4;
    lampShade.position.set(4.8, 0.25, -0.5);
    studioGroup.add(lampShade);

    // Warm 2700K Task Lamp Spotlight
    const lampLight = new THREE.PointLight(0xffbd69, 3.8, 8, 1.5);
    lampLight.position.set(4.8, 0.15, -0.45);
    studioGroup.add(lampLight);
    studioLampLightRef.current = lampLight;

    // Hardcover Architecture Books stack
    for (let b = 0; b < 3; b++) {
      const bookGeo = new THREE.BoxGeometry(1.2, 0.1, 1.6);
      const bookMat = new THREE.MeshStandardMaterial({
        color: b === 0 ? 0x242422 : b === 1 ? 0x6e3b26 : 0x8a7f6e,
        roughness: 0.8,
      });
      const book = new THREE.Mesh(bookGeo, bookMat);
      book.position.set(2.4, -0.55 + b * 0.11, -0.6);
      book.rotation.y = (b * 0.08) - 0.1;
      studioGroup.add(book);
    }

    // Open Paper Notebook
    const notebookGeo = new THREE.BoxGeometry(1.8, 0.06, 1.3);
    const notebookMat = new THREE.MeshStandardMaterial({
      map: paperTex,
      roughness: 0.9,
    });
    const notebook = new THREE.Mesh(notebookGeo, notebookMat);
    notebook.position.set(3.8, -0.57, 0.3);
    notebook.rotation.y = 0.12;
    studioGroup.add(notebook);

    // =========================================================================
    // ZONE 06: APPROACH (Z ~ -156 to -184) — Physical Process Pin-up Wall
    // =========================================================================
    const approachGroup = new THREE.Group();
    approachGroup.position.set(0, 0, -170);
    scene.add(approachGroup);

    // Monolithic Cork & Linen Pin-Up Wall Plane on Left
    const pinWallGeo = new THREE.PlaneGeometry(28, 7.5);
    const corkMat = new THREE.MeshStandardMaterial({
      color: 0x3d352b,
      roughness: 0.95,
      metalness: 0.05,
    });
    const pinWall = new THREE.Mesh(pinWallGeo, corkMat);
    pinWall.position.set(-6.5, 1.8, 0);
    pinWall.rotation.y = 0.15;
    pinWall.receiveShadow = true;
    approachGroup.add(pinWall);

    // 6 Pinned Process Stage Cards along the wall
    const stageNames = ['01 LOOK', '02 SHAPE', '03 DESIGN', '04 ENGINEER', '05 INTELLIGENCE', '06 EVOLVE'];
    approachCardsRef.current = [];

    stageNames.forEach((sname, sIdx) => {
      const cardGroup = new THREE.Group();
      // Distribute along X and Z of the angled wall
      const cardX = -17 + sIdx * 4.2;
      const cardZ = -3.5 + sIdx * 1.2;
      cardGroup.position.set(cardX, 1.8 + (sIdx % 2 === 0 ? 0.4 : -0.3), cardZ);
      cardGroup.rotation.y = 0.15;
      approachGroup.add(cardGroup);
      approachCardsRef.current.push(cardGroup);

      // Card paper sheet
      const cardGeo = new THREE.PlaneGeometry(2.4, 3.2);
      const cCanvas = document.createElement('canvas');
      cCanvas.width = 256;
      cCanvas.height = 340;
      const cctx = cCanvas.getContext('2d');
      if (cctx) {
        cctx.fillStyle = '#f5f1e9';
        cctx.fillRect(0, 0, 256, 340);
        cctx.strokeStyle = '#1e1c1a';
        cctx.lineWidth = 2;
        cctx.strokeRect(8, 8, 240, 324);
        cctx.fillStyle = '#1e1c1a';
        cctx.font = 'bold 22px monospace';
        cctx.fillText(sname, 20, 45);
        cctx.font = '12px sans-serif';
        cctx.fillStyle = '#7d766c';
        cctx.fillText('STAGE SPECIFICATION SHEET', 20, 75);
        cctx.fillText('FIELD PROOF // 1:1', 20, 310);
      }
      const cTex = new THREE.CanvasTexture(cCanvas);

      const cardMat = new THREE.MeshStandardMaterial({
        map: cTex,
        roughness: 0.85,
      });
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      cardMesh.castShadow = true;
      cardGroup.add(cardMesh);

      // 3D Brass Push-Pin at top
      const pinGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const pinMesh = new THREE.Mesh(pinGeo, brassMat);
      pinMesh.position.set(0, 1.45, 0.08);
      cardGroup.add(pinMesh);
    });

    // Soft lateral daylight for Approach wall
    const approachLight = new THREE.DirectionalLight(0xf7f4eb, 2.0);
    approachLight.position.set(10, 6, -170);
    approachLight.target.position.set(-6, 1, -170);
    scene.add(approachLight);
    scene.add(approachLight.target);

    // =========================================================================
    // ZONE 07: INVITATION (Z ~ -195 to -225) — Monumental Glass Horizon Exit
    // =========================================================================
    const invitationGroup = new THREE.Group();
    invitationGroup.position.set(0, 0, -210);
    scene.add(invitationGroup);

    // High Portal Frame
    const exitPillarGeo = new THREE.BoxGeometry(2.4, 10.0, 2.8);
    const exitLeftPillar = new THREE.Mesh(exitPillarGeo, blackenedSteelMat);
    exitLeftPillar.position.set(-4.5, 3.2, 0);
    invitationGroup.add(exitLeftPillar);

    const exitRightPillar = new THREE.Mesh(exitPillarGeo, blackenedSteelMat);
    exitRightPillar.position.set(4.5, 3.2, 0);
    invitationGroup.add(exitRightPillar);

    const exitLintelGeo = new THREE.BoxGeometry(11.4, 2.2, 3.0);
    const exitLintel = new THREE.Mesh(exitLintelGeo, blackenedSteelMat);
    exitLintel.position.set(0, 8.0, 0);
    invitationGroup.add(exitLintel);

    // Full-height structural architectural glass looking out to exterior
    const exitGlassGeo = new THREE.PlaneGeometry(7.0, 9.0);
    const exitGlass = new THREE.Mesh(exitGlassGeo, glassMat);
    exitGlass.position.set(0, 3.5, -0.4);
    invitationGroup.add(exitGlass);

    // Distant Warm Dusk / Horizon Glow Plane
    const horizonGeo = new THREE.PlaneGeometry(60, 30);
    const horizonCanvas = document.createElement('canvas');
    horizonCanvas.width = 512;
    horizonCanvas.height = 256;
    const hctx = horizonCanvas.getContext('2d');
    if (hctx) {
      const grad = hctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, '#0c0b0a');
      grad.addColorStop(0.5, '#2e2518');
      grad.addColorStop(0.85, '#d97736');
      grad.addColorStop(1, '#fff1db');
      hctx.fillStyle = grad;
      hctx.fillRect(0, 0, 512, 256);
    }
    const horizonTex = new THREE.CanvasTexture(horizonCanvas);
    const horizonMat = new THREE.MeshBasicMaterial({ map: horizonTex });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    horizonMesh.position.set(0, 6.0, -25);
    invitationGroup.add(horizonMesh);

    // Warm Exterior Light Flooding In
    const exitLight = new THREE.DirectionalLight(0xffeed6, 3.8);
    exitLight.position.set(2, 6, -225);
    exitLight.target.position.set(0, 0, -200);
    scene.add(exitLight);
    scene.add(exitLight.target);

    // =========================================================================
    // 7. POST-PROCESSING MOTION BLUR PIPELINE
    // =========================================================================
    // Motion blur render target
    let renderTarget: THREE.WebGLRenderTarget | null = new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      stencilBuffer: false,
    });

    // Fullscreen quad for post-processing
    const postScene = new THREE.Scene();
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postQuadGeo = new THREE.PlaneGeometry(2, 2);

    const motionBlurShader = {
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform sampler2D tDiffuse;
        uniform vec2 uVelocity;
        uniform float uRadialVelocity;
        uniform float uIntensity;
        uniform float uTime;
        varying vec2 vUv;

        // High-frequency pseudo-random dithering to prevent color banding
        float rand(vec2 co) {
          return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          vec2 uv = vUv;

          // Bypass if practically stationary
          if (uIntensity < 0.0005) {
            gl_FragColor = texture2D(tDiffuse, uv);
            return;
          }

          vec2 center = vec2(0.5, 0.5);
          vec2 radialDir = uv - center;

          // Combined screen translation + longitudinal radial streak vector
          vec2 pixelVel = (uVelocity + radialDir * uRadialVelocity * 0.65) * uIntensity;

          // Clamp maximum screen blur streak for stability & optical clarity
          float speed = length(pixelVel);
          float maxStreak = 0.038;
          if (speed > maxStreak) {
            pixelVel = (pixelVel / speed) * maxStreak;
            speed = maxStreak;
          }

          float dither = (rand(uv + fract(uTime * 17.0)) - 0.5) * 0.18;
          const int SAMPLES = 12;
          vec4 accum = vec4(0.0);
          float totalWeight = 0.0;

          // Subtle cinematic chromatic dispersion along motion vector
          float chromaSpread = speed * 0.4;

          for (int i = 0; i < SAMPLES; i++) {
            float t = (float(i) + dither) / float(SAMPLES - 1) - 0.5;
            // Gaussian kernel weighting
            float weight = exp(-3.2 * t * t);
            vec2 sampleUv = uv + pixelVel * t;

            float r = texture2D(tDiffuse, sampleUv + pixelVel * chromaSpread * t).r;
            float g = texture2D(tDiffuse, sampleUv).g;
            float b = texture2D(tDiffuse, sampleUv - pixelVel * chromaSpread * t).b;
            float a = texture2D(tDiffuse, sampleUv).a;

            accum += vec4(r, g, b, a) * weight;
            totalWeight += weight;
          }

          gl_FragColor = accum / totalWeight;
        }
      `,
    };

    const motionBlurMaterial = new THREE.ShaderMaterial({
      vertexShader: motionBlurShader.vertexShader,
      fragmentShader: motionBlurShader.fragmentShader,
      uniforms: {
        tDiffuse: { value: renderTarget.texture },
        uVelocity: { value: new THREE.Vector2(0, 0) },
        uRadialVelocity: { value: 0 },
        uIntensity: { value: 0 },
        uTime: { value: 0 },
      },
      depthTest: false,
      depthWrite: false,
    });

    const postQuad = new THREE.Mesh(postQuadGeo, motionBlurMaterial);
    postScene.add(postQuad);

    // =========================================================================
    // 8. RESIZE LISTENER
    // =========================================================================
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;

      camera.aspect = w / h;
      if (w < 768) {
        camera.fov = 48;
      } else if (w < 1024) {
        camera.fov = 42;
      } else {
        camera.fov = 38;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (renderTarget) {
        renderTarget.setSize(w, h);
      }
    };

    window.addEventListener('resize', handleResize);

    // =========================================================================
    // 9. ANIMATION & DECOUPLED USEFRAME LOOP ARCHITECTURE
    // =========================================================================
    // Persistent Camera Lerp State (independent of render cycles)
    const lerpState: CameraLerpState = {
      currentPos: new THREE.Vector3(0, 0.4, 9.0),
      targetPos: new THREE.Vector3(0, 0.4, 9.0),
      posVelocity: new THREE.Vector3(0, 0, 0),

      currentLook: new THREE.Vector3(0, 0, -4.0),
      targetLook: new THREE.Vector3(0, 0, -4.0),
      lookVelocity: new THREE.Vector3(0, 0, 0),

      prevPos: new THREE.Vector3(0, 0.4, 9.0),
      prevLook: new THREE.Vector3(0, 0, -4.0),

      interpolatedPos: new THREE.Vector3(0, 0.4, 9.0),
      interpolatedLook: new THREE.Vector3(0, 0, -4.0),

      currentPointerX: 0,
      currentPointerY: 0,
      pointerVelX: 0,
      pointerVelY: 0,

      currentRoll: 0,
      screenVelX: 0,
      screenVelY: 0,
      radialSpeed: 0,
      motionBlurIntensity: 0,
    };

    const clock = new THREE.Clock();
    let isRunning = true;
    let lastTime = performance.now();
    let accumulator = 0;
    const FIXED_TIMESTEP = 1 / 120; // 120Hz deterministic physics sub-step
    const MAX_ACCUMULATOR = 0.1; // Protect against lag spike death-spiral

    /**
     * Independent Physics Sub-Step:
     * Evaluates waypoint splines, pointer physics, and critically-damped camera lerp state
     * independently of render cycles to maintain high framerates and silky motion during transitions.
     */
    const updatePhysicsStep = (dt: number) => {
      const isMob = window.innerWidth < 768;
      const isTab = window.innerWidth >= 768 && window.innerWidth < 1024;
      const moveScale = prefersReducedMotion ? 0.08 : isMob ? 0.35 : isTab ? 0.65 : 1.0;

      const {
        scrollProgress: curScroll,
        activeSystemLayerIndex: curLayer,
        hoveredProjectIndex: curHoverProj,
        pointerX: pX,
        pointerY: pY,
      } = propsRef.current;

      // 1. Physically damped pointer parallax
      const targetPointerX = pX * 0.35 * moveScale;
      const targetPointerY = pY * 0.25 * moveScale;

      const pointerDampTime = 0.22;
      const pOmega = 2.0 / pointerDampTime;
      const pX_step = pOmega * dt;
      const pExp = 1.0 / (1.0 + pX_step + 0.48 * pX_step * pX_step);

      const pChangeX = lerpState.currentPointerX - targetPointerX;
      const pChangeY = lerpState.currentPointerY - targetPointerY;
      const pTempX = (lerpState.pointerVelX + pOmega * pChangeX) * dt;
      const pTempY = (lerpState.pointerVelY + pOmega * pChangeY) * dt;
      lerpState.pointerVelX = (lerpState.pointerVelX - pOmega * pTempX) * pExp;
      lerpState.pointerVelY = (lerpState.pointerVelY - pOmega * pTempY) * pExp;
      lerpState.currentPointerX = targetPointerX + (pChangeX + pTempX) * pExp;
      lerpState.currentPointerY = targetPointerY + (pChangeY + pTempY) * pExp;

      // 2. Trajectory Waypoint Spline Evaluation
      const { pos: rawPos, look: rawLook } = getInterpolatedCamera(curScroll);

      lerpState.targetPos.set(
        rawPos[0] + lerpState.currentPointerX * 0.8,
        rawPos[1] - lerpState.currentPointerY * 0.5,
        rawPos[2]
      );

      lerpState.targetLook.set(
        rawLook[0] + lerpState.currentPointerX * 0.4,
        rawLook[1] - lerpState.currentPointerY * 0.3,
        rawLook[2]
      );

      // 3. SmoothDamp Physics Solvers for Camera Trajectory
      const cameraSmoothTime = prefersReducedMotion ? 0.15 : isMob ? 0.30 : 0.38;
      const lookSmoothTime = prefersReducedMotion ? 0.15 : isMob ? 0.28 : 0.34;
      const maxCamSpeed = 220.0;

      smoothDampVec3(lerpState.currentPos, lerpState.targetPos, lerpState.posVelocity, cameraSmoothTime, maxCamSpeed, dt);
      smoothDampVec3(lerpState.currentLook, lerpState.targetLook, lerpState.lookVelocity, lookSmoothTime, maxCamSpeed, dt);

      // 4. Filmic roll on lateral acceleration & pointer tilt
      const targetRoll = -lerpState.currentPointerX * 0.018 - (lerpState.posVelocity.x * 0.0035);
      lerpState.currentRoll += (targetRoll - lerpState.currentRoll) * (dt * 12.0);

      // 5. Motion blur velocity metrics
      lerpState.radialSpeed = Math.abs(lerpState.posVelocity.z) * 0.014;
      lerpState.screenVelX = (lerpState.posVelocity.x * 0.012 + lerpState.lookVelocity.x * 0.008 + lerpState.pointerVelX * 0.04) * (isMob ? 0.6 : 1.0);
      lerpState.screenVelY = (-lerpState.posVelocity.y * 0.012 - lerpState.lookVelocity.y * 0.008 - lerpState.pointerVelY * 0.04) * (isMob ? 0.6 : 1.0);

      const totalVelocityMagnitude = Math.sqrt(lerpState.screenVelX * lerpState.screenVelX + lerpState.screenVelY * lerpState.screenVelY) + lerpState.radialSpeed;
      const targetMotionBlur = prefersReducedMotion ? 0 : Math.min(1.0, totalVelocityMagnitude * 1.8);

      lerpState.motionBlurIntensity += (targetMotionBlur - lerpState.motionBlurIntensity) * (targetMotionBlur > lerpState.motionBlurIntensity ? 0.25 : 0.12);

      // 6. Dynamic scene object actuations
      systemPlatesRef.current.forEach((plate, idx) => {
        const isSelected = idx === curLayer;
        const targetPlateZ = (-1.2 + idx * 0.6) + (isSelected ? 0.85 : 0);
        plate.position.z += (targetPlateZ - plate.position.z) * (dt * 8.0);
      });

      exhibitGroupsRef.current.forEach((grp, idx) => {
        const isHovered = curHoverProj === idx;
        const targetRotY = isHovered ? 0.08 : 0;
        const targetY = isHovered ? 0.15 : 0;
        grp.rotation.y += (targetRotY - grp.rotation.y) * (dt * 6.5);
        grp.position.y += (targetY - grp.position.y) * (dt * 6.5);
      });

      if (studioLampLightRef.current) {
        studioLampLightRef.current.intensity = 3.6 + Math.sin(Date.now() * 0.002) * 0.2;
      }
    };

    /**
     * Independent Render Pass:
     * Uses sub-frame alpha interpolation between physics states to guarantee maximum smoothness
     * at 60Hz, 120Hz, 144Hz, or during heavy transitions without hitching.
     */
    const renderFrame = (alpha: number) => {
      // 1. Sub-frame alpha interpolation between physics steps
      lerpState.interpolatedPos.lerpVectors(lerpState.prevPos, lerpState.currentPos, alpha);
      lerpState.interpolatedLook.lerpVectors(lerpState.prevLook, lerpState.currentLook, alpha);

      camera.position.copy(lerpState.interpolatedPos);
      camera.lookAt(lerpState.interpolatedLook);
      camera.rotation.z = lerpState.currentRoll;

      // 2. Motion blur & WebGL draw passes
      if (renderTarget && !prefersReducedMotion && lerpState.motionBlurIntensity > 0.001) {
        // Pass 1: Render 3D scene to offscreen HDR render target
        renderer.setRenderTarget(renderTarget);
        renderer.render(scene, camera);

        // Pass 2: Apply physical motion blur shader with directional + radial streaks
        motionBlurMaterial.uniforms.tDiffuse.value = renderTarget.texture;
        motionBlurMaterial.uniforms.uVelocity.value.set(lerpState.screenVelX, lerpState.screenVelY);
        motionBlurMaterial.uniforms.uRadialVelocity.value = lerpState.posVelocity.z * -0.015;
        motionBlurMaterial.uniforms.uIntensity.value = lerpState.motionBlurIntensity;
        motionBlurMaterial.uniforms.uTime.value = performance.now() * 0.001;

        renderer.setRenderTarget(null);
        renderer.render(postScene, postCamera);
      } else {
        // Direct render when stationary or reduced motion is active
        renderer.setRenderTarget(null);
        renderer.render(scene, camera);
      }
    };

    // Custom useFrame Loop Execution
    const customUseFrameLoop = (currentTime: number) => {
      if (!isRunning) return;
      frameIdRef.current = requestAnimationFrame(customUseFrameLoop);

      const rawDelta = Math.min((currentTime - lastTime) * 0.001, 0.1);
      lastTime = currentTime;

      accumulator += rawDelta;
      if (accumulator > MAX_ACCUMULATOR) {
        accumulator = MAX_ACCUMULATOR;
      }

      // Execute physics sub-steps independently of render cycles
      while (accumulator >= FIXED_TIMESTEP) {
        lerpState.prevPos.copy(lerpState.currentPos);
        lerpState.prevLook.copy(lerpState.currentLook);

        updatePhysicsStep(FIXED_TIMESTEP);
        accumulator -= FIXED_TIMESTEP;
      }

      // Render cycle with sub-frame alpha interpolation
      const alpha = accumulator / FIXED_TIMESTEP;
      renderFrame(alpha);
    };

    frameIdRef.current = requestAnimationFrame(customUseFrameLoop);

    // Cleanup
    return () => {
      isRunning = false;
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (renderTarget) {
        renderTarget.dispose();
        renderTarget = null;
      }
      postQuadGeo.dispose();
      motionBlurMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="global-3d-canvas-container"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
