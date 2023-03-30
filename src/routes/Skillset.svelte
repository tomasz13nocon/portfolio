<script lang="ts">
  import { skills } from "$lib/skills";
  import HexGrid from "$lib/components/hexes/HexGrid.svelte";
  import SkillsetSection from "./SkillsetSection.svelte";

  export let sectionRef: HTMLElement;

  let mouseMoved: (e: MouseEvent) => void;
</script>

<section
  class="home-section py-24 text-center h-[144rem] md:h-[94rem]"
  bind:this={sectionRef}
  on:mousemove={mouseMoved}
>
  <HexGrid bind:mouseMoved />

  <div class="z-10 relative max-w-6xl mx-auto px-8">
    <h2 class="home-section-title w-full col-span-full">Skillset</h2>

    <div class="gap-8 grid md:grid-cols-2 mt-56 xs:mt-48 md:mt-44 items-end">
      <SkillsetSection title="Used extensively" skills={skills.great}>
        Can use confidently at any scale.
      </SkillsetSection>

      <SkillsetSection title="Used frequently" skills={skills.good} lower>
        Can use confidently, but still need to master advanced use cases.
      </SkillsetSection>

      <SkillsetSection title="Used in the past" skills={skills.mid}>
        Can use confidently after refreshing my skills.
      </SkillsetSection>

      <SkillsetSection title="Tools I use" skills={skills.tools} lower>
        Feel free to roast
        <a href="https://github.com/tomasz13nocon/dotfiles" target="_blank" class="external">
          my config
        </a>
      </SkillsetSection>
    </div>
  </div>

  <div class="md:col-start-1 md:col-end-3 absolute bottom-24 w-full px-4 text-xl">
    ... and whatever else <em>You</em> need.<br />I learn <strong class="text-pri-2">fast</strong>.
  </div>
</section>
