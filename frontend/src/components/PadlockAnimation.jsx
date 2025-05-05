import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const PadlockAnimation = () => {
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

    // Create padlock body
    const bodyGeometry = new THREE.BoxGeometry(2, 2.5, 1);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x3b82f6, // Blue color
      shininess: 100,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -0.5;
    scene.add(body);

    // Create padlock shackle (the U-shaped part)
    const shackleGeometry = new THREE.TorusGeometry(0.8, 0.2, 16, 32, Math.PI);
    const shackleMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x10b981, // Green color
      shininess: 100 
    });
    const shackle = new THREE.Mesh(shackleGeometry, shackleMaterial);
    shackle.position.y = 1;
    shackle.rotation.x = Math.PI;
    scene.add(shackle);

    // Create keyhole
    const keyholeOuterGeometry = new THREE.CircleGeometry(0.3, 32);
    const keyholeMaterial = new THREE.MeshBasicMaterial({ color: 0x1e3a8a });
    const keyholeOuter = new THREE.Mesh(keyholeOuterGeometry, keyholeMaterial);
    keyholeOuter.position.set(0, -0.5, 0.51);
    scene.add(keyholeOuter);

    const keyholeInnerGeometry = new THREE.BoxGeometry(0.15, 0.3, 0.1);
    const keyholeInner = new THREE.Mesh(keyholeInnerGeometry, keyholeMaterial);
    keyholeInner.position.set(0, -0.7, 0.51);
    scene.add(keyholeInner);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create particles for a "secure" effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x10b981
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate padlock slightly
      body.rotation.y += 0.005;
      shackle.rotation.y += 0.005;
      keyholeOuter.rotation.y += 0.005;
      keyholeInner.rotation.y += 0.005;
      
      // Make particles move
      particlesMesh.rotation.y += 0.001;
      
      // Pulse effect on the padlock
      const pulse = Math.sin(Date.now() * 0.001) * 0.05 + 1;
      body.scale.set(pulse, pulse, pulse);
      
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

export default PadlockAnimation;