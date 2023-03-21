<script lang="ts">
  // Handwritten because why not

    import { onMount } from "svelte";

  export let h = 620, w = 320, img = "", animate = false;

  let color = "green";
  let theta = 45 * (Math.PI/180);
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  let c = 15; // corner length
  let hc = c * 0.5; // half corner length
  let hchyp = hc / cosT; // half corner lenght hypotenuse
  let x = c - hchyp;
  let p = 10; // padding
  let sw = w - c*2 - p*2; // segment width
  let sh = (h - c*4 - p*2) / 3; // segment height
  let g = hc; // gap for side panels
  let g2 = g / cosT;

  let imgH = 200;

  let mainPath: SVGPathElement;
  $: pathLength = mainPath?.getTotalLength();

  let animateTag: SVGAnimationElement;
  $: if (animate && animateTag) {
    animateTag.beginElement();
  }

  const uid = Math.random(); // For 1 in every 18 quintillion users this UI will break.
</script>

{#if img}
  <!-- <div class="w-full h-full absolute inset-0" style:background-image="url({img})" style:clip-path="url(#clip-{uid})"></div> -->
  <svg
    viewBox="0 0 {w} {h}"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={`${$$props.class} absolute`}
  >
    <defs>
      <clipPath id="clip-{uid}">
        <path
          d="M{p+c} {p} h {sw} l {c} {c}
          v {sh} l {-c} {c} v {sh} l {c} {c} v {sh}
          l {-c} {c} h {-sw} l {-c} {-c}
          v {-sh} l {c} {-c} v {-sh} l {-c} {-c} v {-sh} Z
          "
        />
      </clipPath>
      <linearGradient id="gradient-{uid}" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0F0F0EFF" />
        <stop offset="40%" stop-color="#0F0F0ECC" />
        <stop offset="65%" stop-color="#0F0F0E99" />
      </linearGradient>
    </defs>
    <image
      y={h - p - imgH}
      width={w}
      height={imgH}
      clip-path="url(#clip-{uid})"
      href={img}
      preserveAspectRatio="xMidYMid slice"
    />
    <rect y={h - p - imgH} width={w} height={imgH} clip-path="url(#clip-{uid})" fill="url(#gradient-{uid})" />
  </svg>
{/if}

<svg viewBox="0 0 {w} {h}"
  filter="url(#shadow-{uid})"
  class={$$props.class}
>
  <g
    stroke={color}
    stroke-width="1"
    fill="none"
  >
    <path
      d="M{p+c} {p} h {sw} l {c} {c}
      v {sh} l {-c} {c} v {sh} l {c} {c} v {sh}
      l {-c} {c} h {-sw} l {-c} {-c}
      v {-sh} l {c} {-c} v {-sh} l {-c} {-c} v {-sh} Z
      "
      bind:this={mainPath}
      stroke-dasharray="0,0,0,{pathLength ?? 9999}"
    >
      {#if pathLength}
        <animate
          bind:this={animateTag}
          attributeType="XML"
          attributeName="stroke-dasharray"
          begin="indefinite"
          repeatCount="1"
          dur="2000ms"
          values="0,0,0,{pathLength}; 
          0,{pathLength * 0.5},{pathLength * 0.5},0; 
          {pathLength},0,0,0"
          keyTimes="0; 0.5; 1"
          fill="freeze"
        />
      {/if}
    </path>
    <path
      d="M{p+hc} {p+hc} l {hc} {hc} l {x} {-x} h {hc}
      m{-hc-x} {x} l {-x} {x} v{hc}"
    />
    <path
      d="M{w-p-hc} {p+hc} l {-hc} {hc} l {-x} {-x} h {-hc}
      m{hc+x} {x} l {x} {x} v{hc}"
    />
    <path
      d="M{p+c} {h-p-c-c} v {c} h {c}
      m{-c} 0 l {-hc} {hc}"
    />
    <path
      d="M{w-p-c} {h-p-c-c} v {c} h {-c}
      m{c} 0 l {hc} {hc}"
    />
  />
  {#if h > 280}
    <g
      stroke={color}
      stroke-width="2"
    >
      <path
        d="M{p+c} {h-p-c-sh} l {-(c-g)} {c-g}
          m{c-g} 1 l {-(c-g)} {c-g}
          m{c-g} 1 l {-(c-g)} {c-g}
          m{c-g} 1 l {-(c-g)} {c-g}
        "
      />
      <path
        d="M{w-p-c} {h-p-c-sh} l {c-g} {c-g}
          m{-(c-g)} 1 l {c-g} {c-g}
          m{-(c-g)} 1 l {c-g} {c-g}
          m{-(c-g)} 1 l {c-g} {c-g}
        "
      />
    </g>
  {/if}
  <g
    stroke={color}
  >
    <path
      fill="url(#green-gradient-{uid})"
      d="M{p} {p+c+sh+g2} l {c-g} {c-g}
      v {sh-2*(g2-g)}
      l {-(c-g)} {c-g}
      Z"
    />
    <path
      transform="rotate(180 {w-p} {h*0.5})"
      fill="url(#green-gradient-{uid})"
      d="M{w-p} {p+c+sh+g2} l {c-g} {c-g}
      v {sh-2*(g2-g)}
      l {-(c-g)} {c-g}
      Z"
    />
    <!-- <path -->
    <!--   fill="url(#green-gradient-{uid})" -->
    <!--   d="M{w-p} {p+c+sh+g2} l {-(c-g)} {c-g} -->
    <!--   v {sh-2*(g2-g)} -->
    <!--   l {c-g} {c-g} -->
    <!--   Z -->
    <!--   " -->
    <!-- /> -->
    <!-- <path stroke="skyblue" d="M{p+c-g} {p+c+sh+c} v {g2-g} h {g} v {-g2+g}" /> -->
  </g>
  <defs>
    <filter id="shadow-{uid}">
      <feDropShadow dx=0 dy=0 stdDeviation="4.0" flood-color={color} />
    </filter>
    <linearGradient id="green-gradient-{uid}">
      <stop stop-color="#184218" />
      <stop offset="0.911458" stop-color="#007900" />
    </linearGradient>
  </defs>
</svg>

<style>
  svg {
    /* border: 1px solid red; */
  }
</style>
