// Set up Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add a rotating cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add particle system
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({ size: 0.02, color: 0xffffff });
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Position the camera
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Move particles
  const positions = particlesGeometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] += (Math.random() - 0.5) * 0.01;
    positions[i + 1] += (Math.random() - 0.5) * 0.01;
    positions[i + 2] += (Math.random() - 0.5) * 0.01;
  }
  particlesGeometry.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
}

animate();

// GSAP animation for camera movement
gsap.to(camera.position, {
  z: 10,
  duration: 5,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});
