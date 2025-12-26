const canvas = document.getElementById("scene");
const tooltip = document.getElementById("tooltip");

/* SCENE */
const scene = new THREE.Scene();

/* CAMERA */
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 12);

/* RENDERER */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

/* LIGHTS */
scene.add(new THREE.AmbientLight(0x404040, 2));
const pointLight = new THREE.PointLight(0x38bdf8, 2, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

/* METRICS DATA */
const metrics = [
  { name: "EC2 CPU", value: "42%", color: 0xef4444, x: -4, y: 2 },
  { name: "Memory", value: "68%", color: 0x22c55e, x: 0, y: 2 },
  { name: "Network I/O", value: "22 Mbps", color: 0x3b82f6, x: 4, y: 2 },
  { name: "Latency", value: "120 ms", color: 0xfacc15, x: -4, y: -2 },
  { name: "Errors", value: "0.02%", color: 0xf87171, x: 0, y: -2 },
  { name: "Requests", value: "1.3K", color: 0xa78bfa, x: 4, y: -2 }
];

const cubes = [];

/* CREATE METRIC CUBES */
metrics.forEach(m => {
  const geo = new THREE.BoxGeometry(1.3, 1.3, 1.3);
  const mat = new THREE.MeshStandardMaterial({
    color: m.color,
    emissive: m.color,
    emissiveIntensity: 0.35,
    metalness: 0.6,
    roughness: 0.2
  });
  const cube = new THREE.Mesh(geo, mat);
  cube.position.set(m.x, m.y, 0);
  cube.userData = m;
  cubes.push(cube);
  scene.add(cube);
});

/* ARCHITECTURE NODES (EC2, ALB, RDS) */
const archNodes = [
  { label: "EC2", x: -6, y: 0 },
  { label: "ALB", x: 0, y: 4 },
  { label: "RDS", x: 6, y: 0 }
];

archNodes.forEach(n => {
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 32, 32),
    new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.25
    })
  );
  sphere.position.set(n.x, n.y, -2);
  scene.add(sphere);
});

/* RAYCASTER FOR HOVER */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", e => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

/* CAMERA CINEMATIC MOTION */
let t = 0;

/* ANIMATION LOOP */
function animate() {
  requestAnimationFrame(animate);

  t += 0.003;
  camera.position.x = Math.sin(t) * 1.5;
  camera.position.y = Math.cos(t * 0.8) * 0.8;
  camera.lookAt(0, 0, 0);

  cubes.forEach((cube, i) => {
    cube.rotation.x += 0.003;
    cube.rotation.y += 0.004;
    cube.position.z = Math.sin(Date.now() * 0.001 + i) * 0.4;
  });

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cubes);

  if (intersects.length > 0) {
    const obj = intersects[0].object.userData;
    tooltip.style.display = "block";
    tooltip.style.left = event.clientX + 15 + "px";
    tooltip.style.top = event.clientY + 15 + "px";
    tooltip.innerHTML = `<b>${obj.name}</b><br>${obj.value}`;
  } else {
    tooltip.style.display = "none";
  }

  renderer.render(scene, camera);
}

animate();

/* RESIZE */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
