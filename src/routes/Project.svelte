<script lang="ts">
  import CardBg from "$lib/components/CardBg.svelte";
  import { circIn } from "svelte/easing";
  import CardBgVertical from "$lib/components/CardBgVertical.svelte";
  import RecursionJoke from "./RecursionJoke.svelte";
  import { onMount } from "svelte";

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
  let verticalCardWidth = 320;
  let verticalCardHeight = 350;
  onMount(() => {
    if (vertical) {
      verticalCardHeight = verticalCardWidth * (contentDiv.offsetHeight / contentDiv.offsetWidth);
      // verticalCardHeight = 300;
      console.log(verticalCardHeight);
    }
  });
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div
  class="{vertical
    ? 'w-[38rem] inline-block min-h-[38rem]'
    : 'h-[calc(0.48046875_*_76rem)]'} text-pri-1 relative card whitespace-normal"
  style:transform="rotate3d({rotateX}, {rotateY}, 0, {deg}deg)"
>
  {#if vertical}
    {#key verticalCardHeight}
      <CardBgVertical
        {animate}
        class="absolute"
        w={verticalCardWidth}
        h={verticalCardHeight}
        {img}
      />
    {/key}
  {:else}
    <CardBg {animate} class="absolute w-[76rem] h-[calc(0.48046875_*_76rem)]" {img} />
  {/if}
  <div
    bind:this={contentDiv}
    class="h-full z-10 relative {vertical ? 'p-20' : 'px-14 py-20'}
    {img ? 'pb-60' : ''} flex flex-col justify-between"
  >
    <div>
      <h3 class="text-5xl font-bold">{name}</h3>
      {#if featured}
        <div
          class="mt-2 w-fit relative text-pri-6 before:bg-sec-0 before:border-2 before:border-sec-2 before:skew-x-[15deg] before:content-[''] before:block before:absolute before:w-full before:h-full before:-z-10"
        >
          <div class=" px-4 py-1">Featured</div>
        </div>
      {/if}
      <p class="{vertical ? '' : 'w-[60%]'} mt-8">
        <slot />
        <br />
      </p>
      {#if more}
        <a href="/{more}" class="w-fit block mt-4">READ MORE</a>
      {/if}
    </div>
    <div class={vertical ? "my-12" : ""}>
      <div class="inline-block text-sm">TECH STACK:</div>
      <ul class="inline-flex gap-4">
        {#each stack as tech}
          <li class="">{tech}</li>
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
