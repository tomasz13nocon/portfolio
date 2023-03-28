<script lang="ts">
  import CardBg from "$lib/components/cards/CardBg.svelte";
  import CardBgVertical from "$lib/components/cards/CardBgVertical.svelte";
  import RecursionJoke from "./RecursionJoke.svelte";
  import { baseSkills } from "$lib/skills";
  import IntersectionObserver from "svelte-intersection-observer";

  export let name: string,
    featured = false,
    stack: string[],
    gh: string,
    website = "",
    recursion = false,
    img = "",
    more = "",
    vertical = false;

  let rotateX = 0,
    rotateY = 0,
    deg = 0,
    innerWidth: number,
    innerHeight: number,
    intersecting: boolean,
    intersectingFull: boolean;

  let contentDiv: HTMLElement;
  const verticalCardWidth = 320; // Mutating this breaks CardBgVertical
  let verticalCardHeight = 350;

  $: verticalOrSmallScreen = vertical || innerWidth < 1280; // 1216
  $: if (contentDiv && verticalOrSmallScreen) {
    innerWidth;
    verticalCardHeight = verticalCardWidth * (contentDiv.offsetHeight / contentDiv.offsetWidth);
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
      animate={intersecting}
      class="absolute {vertical ? '' : 'cardbp:hidden'}"
      w={verticalCardWidth}
      h={verticalCardHeight}
      img={intersectingFull ? img : ""}
    />
  {/key}

  {#if !vertical}
    <CardBg
      animate={intersecting}
      class="absolute w-[76rem] h-[calc(0.48046875_*_76rem)] hidden cardbp:block"
      img={intersectingFull ? img : ""}
    />
  {/if}

  <!-- Two observers, diff thresholds: one for lazy images, the other for outline animation -->
  <IntersectionObserver element={contentDiv} bind:intersecting threshold={0.45} once>
    <IntersectionObserver
      element={contentDiv}
      bind:intersecting={intersectingFull}
      threshold={0}
      once
    >
      <div
        bind:this={contentDiv}
        class="h-full z-10 relative {vertical ? '' : 'cardbp:px-14 cardbp:py-20'} px-[12%] py-[13%]
        {img
          ? 'pb-60xx'
          : ''} flex flex-col justify-between  md:max-xl:drop-shadow-[1px_1px_4px_black]"
      >
        <div>
          <h3 class="text-4xl sm:text-5xl font-bold {featured ? 'text-sec-0' : ''}">{name}</h3>
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

        <div class="my-16 cardbp:my-8">
          <ul class="tech-stack-list flex flex-wrap gap-2">
            {#each stack as tech}
              <li class="text-xs text-center flex flex-col min-w-[4rem]">
                <img
                  src={baseSkills[tech].src}
                  alt="{tech} logo"
                  width="40"
                  height="40"
                  class="mx-auto {baseSkills[tech].bg ? 'p-1' : ''}
                  mb-2 max-w-[2.5rem] max-h-10 flex-1 rounded"
                  style:background-color={baseSkills[tech].bg}
                />
                {tech}
              </li>
            {/each}
          </ul>
        </div>

        <div>
          <div class="flex flex-wrap gap-x-8 gap-y-4">
            <a href={gh} target="_blank" class="external">Source code</a>
            {#if website}
              <a href={website} target="_blank" class="external">Live website</a>
            {:else if recursion}
              <RecursionJoke />
            {/if}
          </div>
        </div>
      </div>
    </IntersectionObserver>
  </IntersectionObserver>
</div>

<style>
  .tech-stack-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    grid-auto-flow: row;
  }
</style>
