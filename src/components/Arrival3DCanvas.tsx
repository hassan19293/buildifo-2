import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Arrival3DCanvasProps {
  scrollProgress: number; // 0 to 1
  pointerX: number;
  pointerY: number;
}

export const Arrival3DCanvas: React.FC<Arrival3DCanvasProps> = ({
  scrollProgress,
  pointerX,
  pointerY,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const portalRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080808);
    scene.fog = new THREE.FogExp2(0x080808, 0.035);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 8.5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Physical Lighting (One Directional Sunlight Source + Floor Bounce)
    const ambientLight = new THREE.AmbientLight(0x181816, 0.8);
    scene.add(ambientLight);

    // Directional Sunlight through doorway
    const sunLight = new THREE.DirectionalLight(0xFFF2D6, 3.8);
    sunLight.position.set(-4, 5, -3);
    sunLight.target.position.set(1.5, 0, 3);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    sunLight.shadow.camera.left = -6;
    sunLight.shadow.camera.right = 6;
    sunLight.shadow.camera.top = 6;
    sunLight.shadow.camera.bottom = -6;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);
    scene.add(sunLight.target);

    // Architectural Geometry Group
    const portalGroup = new THREE.Group();
    portalRef.current = portalGroup;
    scene.add(portalGroup);

    // Concrete floor with contact shadow reception
    const floorGeo = new THREE.PlaneGeometry(30, 40);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x121210,
      roughness: 0.85,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.6;
    floor.receiveShadow = true;
    portalGroup.add(floor);

    // Massive Concrete / Blackened Steel Threshold Portal Frame
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x181816,
      roughness: 0.9,
      metalness: 0.2,
    });

    // Left monolithic pillar
    const leftPillarGeo = new THREE.BoxGeometry(2.4, 6.5, 3.2);
    const leftPillar = new THREE.Mesh(leftPillarGeo, wallMat);
    leftPillar.position.set(-3.6, 1.6, 0);
    leftPillar.castShadow = true;
    leftPillar.receiveShadow = true;
    portalGroup.add(leftPillar);

    // Right monolithic pillar
    const rightPillarGeo = new THREE.BoxGeometry(2.4, 6.5, 3.2);
    const rightPillar = new THREE.Mesh(rightPillarGeo, wallMat);
    rightPillar.position.set(3.6, 1.6, 0);
    rightPillar.castShadow = true;
    rightPillar.receiveShadow = true;
    portalGroup.add(rightPillar);

    // Top lintel / beam
    const lintelGeo = new THREE.BoxGeometry(9.6, 1.8, 3.4);
    const lintel = new THREE.Mesh(lintelGeo, wallMat);
    lintel.position.set(0, 4.8, 0);
    lintel.castShadow = true;
    lintel.receiveShadow = true;
    portalGroup.add(lintel);

    // Partially Open Heavy Blackened Steel Door
    const steelDoorMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c0b,
      roughness: 0.45,
      metalness: 0.75,
    });
    const doorGeo = new THREE.BoxGeometry(0.18, 5.0, 2.2);
    const door = new THREE.Mesh(doorGeo, steelDoorMat);
    door.position.set(-1.8, 1.0, -0.6);
    door.rotation.y = -0.55; // Partially open pivot
    door.castShadow = true;
    door.receiveShadow = true;
    portalGroup.add(door);

    // Translucent glass plane with subtle refraction
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x9fb0bd,
      transparent: true,
      opacity: 0.22,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.7,
      ior: 1.5,
    });
    const glassGeo = new THREE.PlaneGeometry(2.0, 5.0);
    const glassPane = new THREE.Mesh(glassGeo, glassMat);
    glassPane.position.set(1.4, 1.0, -0.5);
    glassPane.rotation.y = 0.1;
    portalGroup.add(glassPane);

    // Distant Corridor Plinth with Pilot Signal LED
    const plinthGeo = new THREE.BoxGeometry(0.8, 1.2, 0.8);
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x1f1e1b,
      roughness: 0.6,
      metalness: 0.4,
    });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.set(0.6, -1.0, -5.5);
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    portalGroup.add(plinth);

    // Physical Signal LED dot (C8FF00)
    const ledGeo = new THREE.SphereGeometry(0.025, 16, 16);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xC8FF00 });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(0.6, -0.38, -5.1);
    portalGroup.add(led);

    // Tiny point light for the LED (very restrained, 0.3 intensity)
    const ledLight = new THREE.PointLight(0xC8FF00, 0.4, 1.5);
    ledLight.position.set(0.6, -0.36, -5.0);
    portalGroup.add(ledLight);

    // Resize observer
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      // Adjust FOV on mobile to scale 3D while keeping architectural composition intact
      if (w < 768) {
        camera.fov = 50;
      } else if (w < 1024) {
        camera.fov = 44;
      } else {
        camera.fov = 40;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      // Reduce movement by 50% on mobile as requested
      const movementMultiplier = isMobile ? 0.5 : isTablet ? 0.75 : 1.0;

      // Smooth pointer parallax
      currentX += (pointerX * (0.3 * movementMultiplier) - currentX) * 0.04;
      currentY += (pointerY * (0.2 * movementMultiplier) - currentY) * 0.04;

      if (camera && portalGroup) {
        // Slow cinematic forward push driven by scroll
        const baseZ = isMobile ? 10.5 : 8.5;
        const pushDistance = (isMobile ? 8.5 : 7.5) * (isMobile ? 0.75 : 1.0);
        const targetZ = baseZ - scrollProgress * pushDistance;
        const targetY = (isMobile ? 0.2 : 0.4) - (scrollProgress * 0.3 * movementMultiplier) + currentY * (0.2 * movementMultiplier);
        const targetX = currentX * (0.4 * movementMultiplier);

        camera.position.z += (targetZ - camera.position.z) * 0.08;
        camera.position.y += (targetY - camera.position.y) * 0.08;
        camera.position.x += (targetX - camera.position.x) * 0.08;

        camera.lookAt(currentX * 0.15 * movementMultiplier, -0.2 + scrollProgress * 0.2, -4);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      if (renderer.domElement && containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
    />
  );
};
