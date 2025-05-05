import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ShieldAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f5ff);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create shield geometry
    const shieldGeometry = new THREE.CircleGeometry(2, 32);
    const shieldMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x3b82f6, // Blue color
      shininess: 100,
      side: THREE.DoubleSide
    });
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    scene.add(shield);

    // Add lock icon in the center
    const lockGeometry = new THREE.BoxGeometry(0.8, 1, 0.2);
    const lockMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x10b981, // Green color
      shininess: 100 
    });
    const lock = new THREE.Mesh(lockGeometry, lockMaterial);
    lock.position.y = 0;
    scene.add(lock);

    // Add lock shackle
    const shackleGeometry = new THREE.TorusGeometry(0.4, 0.1, 16, 32, Math.PI);
    const shackle = new THREE.Mesh(shackleGeometry, lockMaterial);
    shackle.position.y = 0.5;
    shackle.rotation.x = Math.PI;
    scene.add(shackle);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate shield slightly
      shield.rotation.z += 0.005;
      
      // Make lock "float" up and down
      lock.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      shackle.position.y = 0.5 + Math.sin(Date.now() * 0.001) * 0.1;
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '400px' }} />;
};

export default ShieldAnimation;