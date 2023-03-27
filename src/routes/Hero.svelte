<script lang="ts">
  import { onMount } from "svelte";
  import { matrixChars } from "$lib/util";
  import DistortFilters from "$lib/components/DistortFilters.svelte";
  import RedPill from "$lib/components/RedPill.svelte";
  import Matrix from "./Matrix.svelte";

  export let secondSection: HTMLElement;

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
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Matrix class="absolute -z-20 h-screen w-full" />

<DistortFilters />

<section class="flex flex-col content-around justify-center min-h-screen relative">
  <div
    class="group text-shadow-green text-left text-white relative
    px-4 min-[372px]:px-8 sm:px-16 xl:px-48 py-8 md:py-12 my-64"
  >
    <div
      style:filter="url(#distort)"
      class="absolute inset-0 -z-10
    backdrop-blur shadow-[0_0_12px_4px_hsl(110,_6%,_6%)]
      "
    />
    <noscript>
      <h1 class="text-2xl">Tomasz Nocoń</h1>
      <h2 class="text-5xl xs:text-6xl md:text-7xl mt-4">Software engineer;</h2>
    </noscript>
    {#if show}
      <h1
        in:typewriter
        class="z-10 text-xl md:text-2xl h-[1em] group-hover:[filter:url(#distort-text)]"
      >
        Tomasz Nocoń
      </h1>
      <div class="flex">
        <h2
          in:typewriter={{ delay: 1200 }}
          class="text-5xl xs:text-6xl md:text-7xl min-h-[1em] mt-4 group-hover:[filter:url(#distort-text)]"
        >
          Software engineer;
        </h2>
      </div>
    {:else}
      <div class="text-2xl h-8" />
      <div class="text-7xl h-[4.5rem]" />
    {/if}
  </div>

  <RedPill {secondSection} />
</section>

<style>
  .text-shadow-green {
    text-shadow: 0 0 10px #94f475;
  }
  .pill-bob {
    animation: bob 1.2s infinite alternate ease-in-out;
  }
  @keyframes bob {
    0% {
      transform: translate(-50%, -17%);
    }
    100% {
      transform: translate(-50%, 17%);
    }
  }
</style>
