<script lang="ts">
  import welcome from "$lib/images/svelte-welcome.webp";
  import welcome_fallback from "$lib/images/svelte-welcome.png";
  import { skillsMid, skillsGood } from "$lib/data";
  import { onMount } from "svelte";
  import { matrixChars } from "$lib/util";
  import { interpolateLab } from "d3-interpolate";
  import { Canvas, InteractiveObject, OrbitControls, T, useFrame } from "@threlte/core";
  import { spring, tweened } from "svelte/motion";
  import { degToRad } from "three/src/math/MathUtils";
  import Scene from "./Scene.svelte";
  import Matrix from "./Matrix.svelte";
  import fragmentShader from "$lib/shaders/main.frag";
  import testVert from "$lib/shaders/test.vert";
  import testFrag from "$lib/shaders/test.frag";
  import ThreeScene from "./ThreeScene.svelte";
  import ClockScene from "./ClockScene.svelte";
  import { Float } from "@threlte/extras";
  import RedPill from "./RedPill.svelte";
  import { cubicOut } from "svelte/easing";
  import HexGrid from "./HexGrid.svelte";
  import CardBg from "$lib/components/CardBg.svelte";
  import Projects from "./Projects.svelte";

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

  let scrollY = 0,
    pillContainer: HTMLElement,
    innerWidth: number,
    innerHeight: number,
    pillColor = tweened("#1E40DA", {
      duration: 300,
      interpolate: interpolateLab,
      easing: cubicOut,
    });
  let pillTaken = false;
  function takePill() {
    pillTaken = true;
    $pillColor = "#ff0000";
  }
  let secondSection: HTMLElement;
  $: if (!pillTaken && secondSection?.offsetTop < scrollY + 350) takePill();

  let mouseMoved: (e: MouseEvent) => void;
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
<!-- <svelte:body class="overflow-hidden relative" /> -->

<noscript>
  <div class="fixed z-50 p-4 left-1/2 -translate-x-1/2 w-80 sm:w-[36rem] text-center bg-sec-4">
    You're viewing a barebones version of this website. Please enable JavaScript for optimal
    experience.
  </div>
</noscript>

<Matrix class="absolute -z-10 h-screen w-full" />

<section class="flex flex-col content-around justify-center min-h-screen">
  <div
    class="text-shadow-green text-left text-white backdrop-blur shadow-[0_0_12px_4px_hsl(110,_6%,_6%)] px-48 py-12 flex flex-col gap-4"
  >
    <noscript>
      <h1 class="text-2xl h-8">Tomasz Nocoń</h1>
      <h2 class="text-7xl h-[4.5rem]">software_engineer;</h2>
    </noscript>
    {#if show}
      <h1 in:typewriter class="text-2xl h-[2ch]">Tomasz Nocoń</h1>
      <h2 in:typewriter={{ delay: 1200 }} class="text-7xl h-[2ch]">software_engineer;</h2>
    {:else}
      <div class="text-2xl h-8" />
      <div class="text-7xl h-[4.5rem]" />
    {/if}
  </div>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="w-24 h-40 mx-auto absolute left-1/2 -translate-x-1/2 bottom-8 cursor-pointer"
    on:pointerenter={() => pillTaken || ($pillColor = "#E31F1F")}
    on:pointerleave={() => pillTaken || ($pillColor = "#1E40DA")}
    on:click={() => {
      takePill();
      window.scrollTo({ top: secondSection.offsetTop, behavior: "smooth" });
    }}
    bind:this={pillContainer}
  >
    <Canvas>
      <RedPill color={$pillColor} container={pillContainer} />
    </Canvas>
  </div>
</section>

<!-- <Canvas> -->
<!--   <ClockScene /> -->
<!-- </Canvas> -->

<!-- <Canvas> -->
<!--   <T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={24}> -->
<!--     <OrbitControls enableZoom={false} /> -->
<!--   </T.PerspectiveCamera> -->
<!--   <T.DirectionalLight /> -->
<!--   <T.AmbientLight intensity={0.3} /> -->
<!--   <ClockScene /> -->
<!-- </Canvas> -->

<section
  class="home-section py-24 text-center h-[72rem] md:h-[60rem]"
  bind:this={secondSection}
  on:mousemove={mouseMoved}
>
  <HexGrid bind:mouseMoved />

  <div class="z-10 relative gap-8 grid md:grid-cols-2 max-w-6xl mx-auto px-8">
    <h2 class="text-7xl w-full col-start-1 md:col-end-3 mb-16">Skillset</h2>

    <!-- <noscript> -->
    <div class="">
      <h3 class="flex-1 font-bold text-3xl">Expertise</h3>
      <p class="text-sm pt-4">Used extensively in recent years</p>
    </div>

    <div class="row-start-3 min-h-[15rem]">
      <noscript>
        <ul>
          {#each skillsGood as skill}
            <li class="">{skill.name}</li>
          {/each}
        </ul>
      </noscript>
    </div>

    <div class="md:translate-y-28">
      <h3 class="flex-1 font-bold text-3xl ">Competence</h3>
      <p class="text-sm pt-4">
        Used in recent years, but not to the point of achieving expertise, or used extensively in
        the past
      </p>
    </div>

    <div class="md:translate-y-28">
      <noscript>
        <ul>
          {#each skillsMid as skill}
            <li class="">{skill.name}</li>
          {/each}
        </ul>
      </noscript>
    </div>
    <!-- </noscript> -->
  </div>
  <div class="md:col-start-1 md:col-end-3 absolute bottom-24 w-full px-4 text-xl">
    ... and whatever else <em>You</em> need.<br />I learn <strong class="text-pri-2">fast</strong>.
  </div>
</section>

<Projects />

<section class="home-section bg-[url('bg4.svg')] bg-no-repeat bg-cover">
  <div class="inset-0 absolute bg-[#0009] my-blur" />
  <div class="z-10 relative">
    <h2 class="text-7xl pb-16 text-center">About me</h2>

    <div class="w-[40rem] mx-auto leading-7 flex flex-col gap-6">
      <p>
        I've been writing code for about 10 years now with some breaks here and there. I was first
        introduced to C++ in a high school programming class, and instantly fell in love with the
        process of programming.
      </p>
      <p>
        Besides that I enjoy travelling, I can solve a rubik's cube in under 30 seconds (PB 19s),
        and can play
        <!-- svelte-ignore security-anchor-rel-noreferrer -->
        <a href="https://www.youtube.com/watch?v=p2ct4xXak24" class="external" target="_blank">
          The Phantom of the Opera
        </a> at the original speed (even the Iron Maiden usually play it slower live!)
      </p>
      <p>Currently I'm looking for a passionate team of developers to write great software with.</p>
    </div>
  </div>
</section>

<style>
  .my-blur {
    /* backdrop-filter: blur(4px); */
  }
  .text-shadow-green {
    text-shadow: 0 0 10px #94f475;
  }
</style>
