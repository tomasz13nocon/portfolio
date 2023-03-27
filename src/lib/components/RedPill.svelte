<script lang="ts">
  import { interpolateLab } from "d3-interpolate";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  export let secondSection: HTMLElement;

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
