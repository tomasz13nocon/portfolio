<script lang="ts">
  import { onMount } from "svelte";
  import { matrixChars } from "$lib/util";
  import { interpolateLab } from "d3-interpolate";
  import { tweened } from "svelte/motion";
  import Matrix from "./Matrix.svelte";
  import { cubicOut } from "svelte/easing";

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

  $: if (!pillTaken && secondSection?.offsetTop < scrollY + 350) takePill();

  let lightPos = { x: 10, y: 25 };
  function mouseMovedWindow(e: MouseEvent) {
    lightPos.x = (e.clientX / innerWidth) * 60 - 10;
    lightPos.y = e.clientY / (pillContainer.getBoundingClientRect().top + 50);
    // 0 - top of screen, 1 - middle of the pill, 1+ - below the pill
    lightPos.y = Math.min(lightPos.y * 50, 100);
  }
</script>

<svelte:window bind:scrollY bind:innerWidth bind:innerHeight on:mousemove={mouseMovedWindow} />

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Matrix class="absolute -z-20 h-screen w-full" />

<svg width="0" height="0">
  <defs>
    <filter
      id="distort"
      color-interpolation-filters="sRGB"
      x="0%"
      y="0%"
      height="100%"
      width="100%"
    >
      <feTurbulence type="turbulence" baseFrequency=".105" numOctaves="5" seed="24" />

      <feColorMatrix type="hueRotate" values="0" />

      <feDisplacementMap in="SourceGraphic" scale="20" xChannelSelector="R" yChannelSelector="G" />
    </filter>

    <filter
      id="distort-text"
      color-interpolation-filters="sRGB"
      x="0%"
      y="0%"
      height="100%"
      width="100%"
    >
      <feTurbulence type="turbulence" baseFrequency=".052" numOctaves="5" seed="24" />

      <feColorMatrix type="hueRotate" values="0">
        <animate attributeName="values" from="0" to="360" dur="5s" repeatCount="indefinite" />
      </feColorMatrix>

      <feColorMatrix type="matrix" values="3 0 0 0 -1 3 0 0 0 -1 3 0 0 0 -1 1 0 0 0 0" />

      <feGaussianBlur stdDeviation="3" />

      <feDisplacementMap in="SourceGraphic" scale="6" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
</svg>

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

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="absolute left-1/2 -translate-x-1/2 pill-bob bottom-16 cursor-pointer"
    on:pointerenter={() => pillTaken || ($pillColor = "#E31F1F")}
    on:pointerleave={() => pillTaken || ($pillColor = "#1E40DA")}
    on:click={() => {
      takePill();
      window.scrollTo({ top: secondSection.offsetTop, behavior: "smooth" });
    }}
    bind:this={pillContainer}
    style:backdrop-filter="blur(3px)"
    style:clip-path="inset(0 0 0 0 round 36%"
  >
    <svg width="40" height="100" viewBox="0 0 40 100">
      <defs>
        <filter id="lighting">
          <!-- <feGaussianBlur in="SourceAlpha" stdDeviation="10" /> -->
          <feSpecularLighting
            specularExponent="60"
            specularConstant="2"
            surfaceScale="0"
            lighting-color="#ccc"
          >
            <fePointLight {...lightPos} z="60" />
          </feSpecularLighting>
          <!-- <feComposite in="SourceGraphic" operator="arithmetic" k1="10" k2="0.5" k3="0.2" k4="0" /> -->
          <feComposite
            in="SourceGraphic"
            operator="arithmetic"
            k1="6.0"
            k2="0.7"
            k3="0.3"
            k4="0.00"
            result="qwe"
          />
          <feComposite operator="atop" in2="SourceGraphic" />
          <!-- <feBlend in="qwe" in2="SourceGraphic" mode="hard-light" /> -->
        </filter>
      </defs>
      <rect
        id="pill-rect"
        x="0"
        y="0"
        width="40"
        height="100"
        ry="30"
        rx="50"
        fill={$pillColor}
        filter="url(#lighting)"
        style:opacity="0.86"
      />
    </svg>
  </div>
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
