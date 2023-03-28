<script lang="ts">
  import type { Skill } from "$lib/skills";

  export let title: string,
    skills: Skill[],
    lower = false;
  let className = "";
  export { className as class };
</script>

<div class="{className} relative {lower ? 'md:top-28' : ''} mb-[26rem] md:mb-[30rem]">
  <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full">
    <h3 class="flex-1 font-bold text-3xl">{title}</h3>
    <p class="text-sm pt-4">
      <slot />
    </p>
  </div>

  <noscript>
    <div class="absolute top-16 left-1/2 -translate-x-1/2">
      <ul>
        {#each skills as skill}
          <li>{skill.name}</li>
        {/each}
      </ul>
    </div>
  </noscript>
</div>
