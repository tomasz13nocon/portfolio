<script lang="ts">
  import { onMount } from "svelte";

  export let animate = false,
    img = "";

  let animateTag: SVGAnimationElement;
  let mounted = false;

  onMount(() => (mounted = true));

  $: if (animate && mounted) {
    animateTag.beginElement();
  }
</script>

{#if img}
  <svg
    width="512"
    height="246"
    viewBox="0 0 512 246"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={`${$$props.class} absolute right-0`}
  >
    <defs>
      <clipPath id="clip">
        <path
          d="M294.535 5.5H19.1338L5.50009 19.1337L5.5 212.733L19.1338 226.366H190.919L203.871 233.183L216.823 240H492.224L505.858 226.366L505.858 32.7674L492.224 19.1337H320.439L294.535 5.5Z"
        />
      </clipPath>
      <linearGradient id="gradient">
        <stop offset="0%" stop-color="#0F0F0EFF" />
        <stop offset="30%" stop-color="#0F0F0ECC" />
        <stop offset="55%" stop-color="#0F0F0E99" />
      </linearGradient>
    </defs>
    <image
      x="250"
      width="262"
      height="246"
      clip-path="url(#clip)"
      href={img}
      preserveAspectRatio="xMinYMid slice"
    />
    <rect x="249" width="263" height="246" clip-path="url(#clip)" fill="url(#gradient)" />
  </svg>
{/if}

<svg
  width="512"
  height="246"
  viewBox="0 0 512 246"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class={$$props.class}
>
  <style>
    .text2 {
      font: 6px sans-serif;
      fill: #007900;
    }
    .text {
      font: 5px sans-serif;
      fill: #007900;
      letter-spacing: 0.5px;
    }
  </style>
  <g filter="url(#filter0_d_51_11)">
    <path
      d="M294.535 5.5H19.1338L5.50009 19.1337L5.5 212.733L19.1338 226.366H190.919L203.871 233.183L216.823 240H492.224L505.858 226.366L505.858 32.7674L492.224 19.1337H320.439L294.535 5.5Z"
      stroke="#007900"
      stroke-dasharray="0,0,0,1417.239990234375"
    >
      <animate
        bind:this={animateTag}
        attributeType="XML"
        attributeName="stroke-dasharray"
        begin="indefinite"
        repeatCount="1"
        dur="2000ms"
        values="0,0,0,1417.239990234375; 
          0,708.6199951171875,708.6199951171875,0; 
          1417.239990234375,0,0,0"
        keyTimes="0; 0.5; 1"
        fill="freeze"
      />
    </path>
    <path d="M492.401 234H281.5" stroke="#007900" stroke-width="2" />
    <path d="M492.401 228H269.5" stroke="#007900" stroke-width="2" />
    <path
      d="M279 8.50004L293.5 16.1338M257 8.50004L271.5 16.1338M268 8.5L282.5 16.1337M246 8.5L260.5 16.1337"
      stroke="#007900"
      stroke-width="2"
    />
    <path
      d="M479.272 5.5L487.452 13.6802H322.484L306.805 5.5H479.272Z"
      fill="url(#paint0_linear_51_11)"
      stroke="#007900"
    />
    <path
      d="M32.7674 240L24.5872 231.82H189.555L205.234 240H32.7674Z"
      fill="url(#paint1_linear_51_11)"
      stroke="#007900"
    />
  </g>
  <text x="23" y="15" class="text"
    >INIT &nbsp; 这是一个占位符文本 你好说中文的朋友 我其实不会说中文 这是来自谷歌翻译</text
  >
  <text x="217" y="233" class="text2">通量电容器率</text>
  <defs>
    <filter
      id="filter0_d_51_11"
      x="0"
      y="0"
      width="511.358"
      height="245.5"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset />
      <feGaussianBlur stdDeviation="2.5" />
      <feComposite in2="hardAlpha" operator="out" />
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.47451 0 0 0 0 0 0 0 0 1 0" />
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_51_11" />
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_51_11" result="shape" />
    </filter>
    <linearGradient
      id="paint0_linear_51_11"
      x1="397.129"
      y1="5.5"
      x2="397.129"
      y2="13.6802"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#184218" />
      <stop offset="0.911458" stop-color="#007900" />
    </linearGradient>
    <linearGradient
      id="paint1_linear_51_11"
      x1="114.911"
      y1="231.82"
      x2="114.911"
      y2="240"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#184218" />
      <stop offset="0.911458" stop-color="#007900" />
    </linearGradient>
  </defs>
  <setting>{`{"type":"direct","speed":44,"random":1,"shift":1,"size":1,"rupture":50}`}</setting>
</svg>
