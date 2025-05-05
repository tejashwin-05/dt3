import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const EnhancedShieldAnimation = () => {
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
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Create shield geometry - using a shape that matches the image
    const shieldShape = new THREE.Shape();
    
    // Top point
    shieldShape.moveTo(0, 2.5);
    
    // Right curve and side
    shieldShape.bezierCurveTo(1.5, 2.3, 2, 1.8, 2, 1);
    shieldShape.lineTo(2, -1);
    
    // Bottom curve
    shieldShape.bezierCurveTo(2, -2, 1, -2.5, 0, -2.5);
    
    // Left side and curve
    shieldShape.bezierCurveTo(-1, -2.5, -2, -2, -2, -1);
    shieldShape.lineTo(-2, 1);
    shieldShape.bezierCurveTo(-2, 1.8, -1.5, 2.3, 0, 2.5);

    const extrudeSettings = {
      steps: 1,
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 3
    };

    const shieldGeometry = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    
    // Create shield material with blue gradient like in the image
    const shieldMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4a9ff5, // Light blue color
      shininess: 100,
      specular: 0x6baeff,
      side: THREE.DoubleSide
    });
    
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shield.castShadow = true;
    shield.receiveShadow = true;
    scene.add(shield);

    // Create metallic border
    const borderShape = new THREE.Shape();
    
    // Make the border slightly larger than the shield
    borderShape.moveTo(0, 2.6);
    borderShape.bezierCurveTo(1.6, 2.4, 2.1, 1.9, 2.1, 1);
    borderShape.lineTo(2.1, -1);
    borderShape.bezierCurveTo(2.1, -2.1, 1.1, -2.6, 0, -2.6);
    borderShape.bezierCurveTo(-1.1, -2.6, -2.1, -2.1, -2.1, -1);
    borderShape.lineTo(-2.1, 1);
    borderShape.bezierCurveTo(-2.1, 1.9, -1.6, 2.4, 0, 2.6);

    // Create a hole in the border shape (for the shield)
    const holeShape = new THREE.Shape();
    holeShape.moveTo(0, 2.4);
    holeShape.bezierCurveTo(1.4, 2.2, 1.9, 1.7, 1.9, 0.9);
    holeShape.lineTo(1.9, -0.9);
    holeShape.bezierCurveTo(1.9, -1.9, 0.9, -2.4, 0, -2.4);
    holeShape.bezierCurveTo(-0.9, -2.4, -1.9, -1.9, -1.9, -0.9);
    holeShape.lineTo(-1.9, 0.9);
    holeShape.bezierCurveTo(-1.9, 1.7, -1.4, 2.2, 0, 2.4);
    
    borderShape.holes.push(holeShape);

    const borderExtrudeSettings = {
      steps: 1,
      depth: 0.25,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 2
    };

    const borderGeometry = new THREE.ExtrudeGeometry(borderShape, borderExtrudeSettings);
    
    // Silver metallic material for the border
    const borderMaterial = new THREE.MeshPhongMaterial({
      color: 0xc0c0c0, // Silver color
      shininess: 120,
      specular: 0xffffff
    });
    
    const border = new THREE.Mesh(borderGeometry, borderMaterial);
    border.position.z = -0.15;
    border.castShadow = true;
    scene.add(border);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light from top-right (like in the image)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add a point light for the shine effect
    const pointLight = new THREE.PointLight(0x6baeff, 1, 10);
    pointLight.position.set(-2, 2, 3);
    scene.add(pointLight);

    // Create a highlight effect on the shield (like in the image)
    const highlightGeometry = new THREE.PlaneGeometry(3, 3);
    const highlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    });
    
    const highlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
    highlight.position.z = 0.3;
    highlight.position.x = -0.5;
    highlight.position.y = 0.5;
    highlight.rotation.z = Math.PI / 4;
    highlight.scale.set(0.5, 0.5, 0.5);
    scene.add(highlight);

    // Create a subtle glow effect
    const glowGeometry = new THREE.SphereGeometry(2.7, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4a9ff5,
      transparent: true,
      opacity: 0.1
    });
    
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Gentle floating motion
      const floatY = Math.sin(Date.now() * 0.001) * 0.1;
      shield.position.y = floatY;
      border.position.y = floatY;
      highlight.position.y = 0.5 + floatY;
      
      // Subtle rotation
      shield.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
      border.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
      
      // Light movement to create shine effect
      pointLight.position.x = Math.sin(Date.now() * 0.001) * 2;
      pointLight.position.y = Math.cos(Date.now() * 0.001) * 2;
      
      // Pulse the glow effect
      const glowPulse = Math.sin(Date.now() * 0.001) * 0.05 + 0.95;
      glow.scale.set(glowPulse, glowPulse, glowPulse);
      
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

export default EnhancedShieldAnimation;
