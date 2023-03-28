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

    <div class="gap-8 grid md:grid-cols-2 xl:grid-cols-2 mt-56 xs:mt-52 md:mt-48 items-end">
      <SkillsetSection title="Expertise" skills={skills.great}>
        Used extensively in recent years.
        <br />
        Can use confidently at any scale.
      </SkillsetSection>

      <SkillsetSection title="Competence" skills={skills.good} lower>
        Used in recent years.
        <br />
        Can use confidently, but still need to master advanced use cases.
      </SkillsetSection>

      <SkillsetSection title="Familiarity" skills={skills.mid}>
        Used in the past.
        <br />
        Can use after refreshing my skills.
      </SkillsetSection>

      <SkillsetSection title="Tools I use" skills={skills.tools} lower>
        Feel free to roast my config!
        <br />
        <a href="https://github.com/tomasz13nocon/dotfiles" target="_blank" class="external">
          Dotfiles
        </a>
      </SkillsetSection>
    </div>
  </div>

  <div class="md:col-start-1 md:col-end-3 absolute bottom-24 w-full px-4 text-xl">
    ... and whatever else <em>You</em> need.<br />I learn <strong class="text-pri-2">fast</strong>.
  </div>
</section>
