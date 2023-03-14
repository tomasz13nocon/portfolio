<script lang="ts">
  import CardBg from "$lib/components/CardBg.svelte";
  import { circIn } from "svelte/easing";
  import CardBgVertical from "$lib/components/CardBgVertical.svelte";
  import RecursionJoke from "./RecursionJoke.svelte";
  import { onMount } from "svelte";
  import { skills } from "$lib/data";

  export let name: string,
    featured = false,
    stack: string[],
    gh: string,
    website = "",
    recursion = false,
    img = "",
    more = "",
    vertical = false;

  let mx = 0,
    my = 0,
    section: HTMLElement,
    rotateX = 0,
    rotateY = 0,
    deg = 0,
    innerWidth: number,
    innerHeight: number;

  let mouseMovedProjects = (e: MouseEvent) => {
    mx = e.clientX;
    my = e.clientY - section.getBoundingClientRect().top;
    let yRel = (2 * my) / innerHeight - 1;
    let xRel = (2 * mx) / innerWidth - 1;
    rotateX = Math.sign(yRel) * circIn(yRel);
    rotateY = -Math.sign(xRel) * circIn(xRel);
    deg = Math.max(Math.abs(xRel), Math.abs(yRel)) * 4;
  };

  let animate = true;

  let contentDiv: HTMLElement;
  const verticalCardWidth = 320; // Mutating this breaks CardBgVertical
  let verticalCardHeight = 350;

  $: verticalOrSmallScreen = vertical || innerWidth < 1280; // 1216
  $: if (contentDiv && verticalOrSmallScreen) {
    innerWidth;
    verticalCardHeight = verticalCardWidth * (contentDiv.offsetHeight / contentDiv.offsetWidth);
    if (name === "Star Wars Media Timeline") {
      console.log(contentDiv.offsetWidth, contentDiv.offsetHeight);
      console.log(contentDiv.offsetHeight / contentDiv.offsetWidth);
    }
    // verticalCardHeight = contentDiv.offsetHeight;
  }
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div
  class="{vertical
    ? 'cardbp:w-1/2 inline-block cardbp:min-h-[36rem] cardbp:-mt-[3.5rem]'
    : 'cardbp:h-[calc(0.48046875_*_76rem)]'}
    w-full text-pri-1 relative card"
  style:transform="rotate3d({rotateX}, {rotateY}, 0, {deg}deg)"
>
  {#key verticalCardHeight}
    <CardBgVertical
      {animate}
      class="absolute {vertical ? '' : 'cardbp:hidden'}"
      w={verticalCardWidth}
      h={verticalCardHeight}
      {img}
      log={name === "Star Wars Media Timeline"}
    />
  {/key}
  {#if !vertical}
    <CardBg
      {animate}
      class="absolute w-[76rem] h-[calc(0.48046875_*_76rem)] hidden cardbp:block"
      {img}
    />
  {/if}
  <div
    bind:this={contentDiv}
    class="h-full z-10 relative {vertical ? '' : 'cardbp:px-14 cardbp:py-20'} px-[12%] py-[13%]
    {img ? 'pb-60xx' : ''} flex flex-col justify-between  md:max-xl:drop-shadow-[1px_1px_4px_black]"
  >
    <div>
      <h3 class="text-4xl sm:text-5xl font-bold">{name}</h3>
      {#if featured}
        <div
          class="mt-2 w-fit relative font-bold text-pri-6 before:bg-sec-0 before:border-2 before:border-sec-2 before:skew-x-[15deg] before:content-[''] before:block before:absolute before:w-full before:h-full before:-z-10"
        >
          <div class="px-4 py-1">Featured</div>
        </div>
      {/if}
      <p class="{vertical ? '' : 'cardbp:w-[67%]'} mt-8">
        <slot />
      </p>
      {#if more}
        <a href="/{more}" class="w-fit block mt-4">READ MORE</a>
      {/if}
    </div>

    <!-- <div class="my-16 cardbp:my-8 flex flex-wrap items-center gap-6"> -->
    <div class="my-16 cardbp:my-8">
      <!-- <div class="inline-block">Tech stack:</div> -->
      <ul class="inline-grid gap-2 grid-flow-col auto-cols-[minmax(4rem,_1fr)] justify-center">
        {#each stack as tech}
          <li class="text-xs flex-1 basis-0 text-center flex flex-col">
            <img
              src={skills[tech].src}
              alt="{tech} logo"
              width="40"
              height="40"
              class="mx-auto {skills[tech].bg ? 'p-1' : ''}
                  mb-2 max-w-[2.5rem] max-h-10 flex-1 rounded"
              style:background-color={skills[tech].bg}
            />
            {tech}
          </li>
        {/each}
      </ul>
    </div>

    <div>
      <div class="">
        <a href={gh} target="_blank" class="external mr-4">Source code</a>
        {#if website}
          <a href={website} target="_blank" class="external">Live website</a>
        {:else if recursion}
          <RecursionJoke />
        {/if}
      </div>
    </div>
  </div>
</div>
