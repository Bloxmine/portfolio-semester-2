// three.js code with a lil help from the docs and troubleshooting
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// potential gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.domElement.className = 'earth';
// orbital controls for rotating the globe
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;


// spotlight for lighting, penumbra is the softness of the light's edge, that's a donkey bridge.
const spotlight = new THREE.SpotLight(0xffffff, 250, 100);
spotlight.position.set(-6, 4, 5);
// spotlight.color.setRGB(0, 0, 1);
spotlight.angle = Math.PI/4;
spotlight.penumbra = 1;
scene.add(spotlight);

// ambient light for the rest of the scene
// const ambientLight = new THREE.AmbientLight(0x404040);
// ambientLight.color.setRGB(0, 0, 1);
// scene.add(ambientLight);

// load textures
const textureLoader = new THREE.TextureLoader();
textureLoader.load('../images/earthmap1k.jpg', function(texture) {
    textureLoader.load('../images/earthbump1k.jpg', function(bumpMap) {
        textureLoader.load('../images/earthspec1k.jpg', function(specularMap) {
            textureLoader.load('../images/earthcloudmaptrans.jpg', function(cloudTexture) {
                // and on the 3rd day, god created the earth
                const geometry = new THREE.SphereGeometry(1, 32, 32);
                const material = new THREE.MeshPhongMaterial({ 
                    map: texture, 
                    bumpMap: bumpMap, 
                    bumpScale: 5,
                    specularMap: specularMap,
                    specular: new THREE.Color('grey'),
                    roughness: 0.2,
                });
                const earth = new THREE.Mesh(geometry, material);

                // don't know about this
                const cloudGeometry = new THREE.SphereGeometry(1.01, 32, 32);
                const cloudMaterial = new THREE.MeshPhongMaterial({
                    map: cloudTexture,
                    alphaMap: cloudTexture,
                    transparent: true,
                    opacity: 0.2
                });
                const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);

                scene.add(earth);
                scene.add(cloud);

                camera.position.z = 2;
                
                earth.addEventListener('mousedown', function() {
                    controls.autoRotate = false;
                });
                
                earth.addEventListener('mouseup', function() {
                    controls.autoRotate = true;
                });
                
                const animate = function () {
                    requestAnimationFrame(animate);
                
                    // controls
                    controls.update();
                
                    // speeeeen
                    if (!controls.autoRotate) {
                        earth.rotation.y += 0.01;
                        cloud.rotation.y += 0.01;
                    }
                
                    renderer.render(scene, camera);
                };
                
                animate();
            });
        });
    });
});

// gsap animations
// making a div, probably should be in the css 
const blackDiv = document.createElement('div');
blackDiv.style.position = 'fixed';
blackDiv.style.top = '0';
blackDiv.style.left = '0';
blackDiv.style.width = '100%';
blackDiv.style.height = '100px';
blackDiv.style.backgroundColor = 'black';
blackDiv.style.zIndex = '0';
document.body.appendChild(blackDiv);