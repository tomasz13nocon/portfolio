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
  let innerWidth: number, innerHeight: number;
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

<svelte:window bind:scrollY bind:innerWidth bind:innerHeight />
<svelte:body class="overflow-hidden relative" />

<Matrix class="absolute -z-10" />
<!-- <div class="absolute -z-10 w-full h-screen"> -->
<!--   <Canvas> -->
<!--     <Scene {scrollY} width={innerWidth} height={innerHeight} /> -->
<!--   </Canvas> -->
<!-- </div> -->

<section
  class="text-shadow-green text-left text-white flex flex-col justify-center gap-4 my-64 px-48 py-12 backdrop-blur shadow-[0_0_8px_black]"
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

<section class="border-t-2 border-white text-center pt-16 bg-bg h-screen ">
  <h2>Skillset</h2>
  <!-- <h3>Expertise</h3> -->
  <!-- <h3>Familiarity</h3> -->
</section>

<a href="qwe">qwe</a>

<style>
  .text-shadow-green {
    text-shadow: 0 0 10px #94f475;
  }
</style>
