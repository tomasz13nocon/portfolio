<script lang="ts">
  import welcome from "$lib/images/svelte-welcome.webp";
  import welcome_fallback from "$lib/images/svelte-welcome.png";
  import { onMount } from "svelte";
  import { matrixChars } from "$lib/util";

  import { Canvas, InteractiveObject, OrbitControls, T, useFrame } from "@threlte/core";
  import { spring } from "svelte/motion";
  import { degToRad } from "three/src/math/MathUtils";
  import Scene from "./Scene.svelte";
  import Matrix from "./Matrix.svelte";
  import fragmentShader from "$lib/shaders/main.frag";
  import testVert from "$lib/shaders/test.vert";
  import testFrag from "$lib/shaders/test.frag";

  const scale = spring(1);

  let show = false;
  onMount(() => (show = true));

  function typewriter(node: HTMLElement, { speed = 1.8, delay = 0 } = {}) {
    const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;
    if (!valid) {
      throw new Error(`This transition only works on elements with a single text node child`);
    }

    const matrixLength = 5;
    const text = node.textContent as string;
    const duration = (text.length + matrixLength) / (speed * 0.01);

    return {
      duration,
      delay,
      tick: (t: number, u: number) => {
        const i = ~~(text.length * t);
        const matrixN = Math.min(
          matrixLength,
          (text.length + matrixLength) * u,
          (text.length + matrixLength) * t
        );
        let matrix = "";
        for (var j = 0; j < matrixN; j++) {
          matrix += matrixChars[~~(((i + j) * 17 * i) % matrixChars.length)];
        }
        node.textContent = text.slice(0, Math.max(0, i - matrixN)) + matrix;
      },
    };
  }

  let scrollY = 0;
  let scr = spring(0);
  $: $scr = scrollY;

  let testCanvas: HTMLCanvasElement;
  onMount(() => {
    testCanvas.width = 300;
    testCanvas.height = 300;
    let ctx = testCanvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = "purple";
    ctx?.fillRect(0, 0, 200, 200);
  });
</script>

<svelte:head>
  <title>Tomasz Nocoń - Software Engineer</title>
  <meta name="description" content="Tomasz Nocoń - Software Engineer portfolio." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<svelte:window bind:scrollY />

<!-- <Matrix class="absolute -z-10" /> -->
<section
  class="text-left text-white drop-shadow-[0_0_5px_#94f475] flex flex-col justify-center gap-4 my-64 px-48 py-12 backdrop-blur shadow-[0_0_8px_black]"
>
  <noscript>
    <h1 class="text-3xl">Tomasz Nocoń;</h1>
    <h2 class="text-7xl">Software Engineer;</h2>
  </noscript>
  {#if show}
    <h1 in:typewriter class="text-3xl h-[2ch]">Tomasz Nocoń</h1>
    <h2 in:typewriter={{ delay: 1200 }} class="text-7xl h-[2ch]">Software_Engineer;</h2>
  {/if}
</section>

<section class="border-t-2 border-white text-center pt-16 bg-bg">
  <h2>Skillset</h2>
  <!-- <h3>Expertise</h3> -->
  <!-- <h3>Familiarity</h3> -->
</section>

<div class="relative flex flex-[0.8] h-[800px]">
  <Canvas>
    <T.OrthographicCamera args={[-1, 1, 1, -1, 0, 1]}>
      <OrbitControls maxPolarAngle={degToRad(80)} enableZoom={false} target={{ y: 0.5 }} />
    </T.OrthographicCamera>

    <T.DirectionalLight castShadow position={[3, 10, 10]} />
    <T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
    <T.AmbientLight intensity={0.2} />

    <Scene {scrollY} canvasTex={testCanvas} />
    <!-- Cube -->
    <T.Group scale={$scale}>
      <T.Mesh position.y={0.5} castShadow let:ref>
        <!-- Add interaction -->
        <InteractiveObject
          object={ref}
          interactive
          on:pointerenter={() => ($scale = 2)}
          on:pointerleave={() => ($scale = 1)}
        />

        <T.BoxGeometry />
        <T.MeshStandardMaterial color="red" />
      </T.Mesh>
    </T.Group>

    <!-- Floor -->
    <T.Mesh receiveShadow rotation.x={degToRad(-90)}>
      <T.CircleGeometry args={[3.4, 72]} />
      <T.MeshStandardMaterial color="white" />
    </T.Mesh>
  </Canvas>
</div>

<canvas bind:this={testCanvas} />

<a href="qwe">qwe</a>

<style>
</style>
