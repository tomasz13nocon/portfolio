<script lang="ts">
  import { skillsGood, skillsMid } from "$lib/data";
  import HexGrid from "./HexGrid.svelte";

  export let sectionRef: HTMLElement;

  let mouseMoved: (e: MouseEvent) => void;
</script>

<section
  class="home-section py-24 text-center h-[88rem] md:h-[64rem]"
  bind:this={sectionRef}
  on:mousemove={mouseMoved}
>
  <HexGrid bind:mouseMoved />

  <div class="z-10 relative gap-8 grid md:grid-cols-2 max-w-6xl mx-auto px-8">
    <h2 class="home-section-title w-full col-start-1 md:col-end-3">Skillset</h2>

    <!-- <noscript> -->
    <div class="">
      <h3 class="flex-1 font-bold text-3xl">Expertise</h3>
      <p class="text-sm pt-4">Used extensively in recent years</p>
    </div>

    <div class="row-start-3 min-h-[18rem]">
      <noscript>
        <ul>
          {#each skillsGood as skill}
            <li class="">{skill.name}</li>
          {/each}
        </ul>
      </noscript>
    </div>

    <div class="md:translate-y-[5.5rem]">
      <h3 class="flex-1 font-bold text-3xl ">Competence</h3>
      <p class="text-sm pt-4">
        Used in recent years, but not to the point of achieving expertise, or used extensively in
        the past
      </p>
    </div>

    <div class="md:translate-y-[5.5rem]">
      <noscript>
        <ul>
          {#each skillsMid as skill}
            <li class="">{skill.name}</li>
          {/each}
        </ul>
      </noscript>
    </div>
  </div>
  <div class="md:col-start-1 md:col-end-3 absolute bottom-24 w-full px-4 text-xl">
    ... and whatever else <em>You</em> need.<br />I learn <strong class="text-pri-2">fast</strong>.
  </div>
</section>
