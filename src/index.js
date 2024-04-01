// three.js code with a lil help from the docs and troubleshooting shoutout to the AI revolution.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.domElement.className = 'earth';

const controls = new OrbitControls(camera, renderer.domElement);

// spotlight for lighting, penumbra is the softness of the light's edge, that's a donkey bridge.
const spotlight = new THREE.SpotLight(0xffffff, 250, 100, Math.PI/4, 1, 2);
spotlight.position.set(-6, 4, 5);
spotlight.angle = Math.PI/4;
spotlight.penumbra = 1;
scene.add(spotlight);

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
                    specular: new THREE.Color('grey')
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

                const controls = new OrbitControls(camera, renderer.domElement);
                
                window.addEventListener('mousedown', function() {
                    controls.autoRotate = false;
                });
                
                window.addEventListener('mouseup', function() {
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