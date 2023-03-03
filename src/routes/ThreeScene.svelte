<script lang="ts">
  import fragmentShader from "$lib/shaders/scene3.frag";
  import vertexShader from "$lib/shaders/scene3.vert";
  import * as THREE from "three";
  import type { Camera, Material, Scene, ShaderMaterial, WebGLRenderer } from "three";
  import { onMount } from "svelte";

  let camera: Camera, scene: Scene, renderer: WebGLRenderer, material: ShaderMaterial;

  let uniforms: {
    time: { value: number };
  };

  onMount(() => {
    init();
    animate();
  });

  function init() {
    const container = document.getElementById("container") as HTMLElement;

    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    scene = new THREE.Scene();

    const geometry = new THREE.PlaneGeometry(2, 2);

    uniforms = {
      time: { value: 1.0 },
    };

    material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    onWindowResize();

    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  //

  function animate() {
    requestAnimationFrame(animate);

    uniforms.time.value = performance.now() / 1000;
    // material.uniforms = { time: { value: performance.now() / 1000 } }; // this doesn't work

    renderer.render(scene, camera);
  }
</script>

<div id="container" />
