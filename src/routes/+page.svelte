<script lang="ts">
  import Projects from "./Projects.svelte";
  import About from "./About.svelte";
  import Skillset from "./Skillset.svelte";
  import Hero from "./Hero.svelte";

  let secondSection: HTMLElement;
</script>

<svelte:head>
  <title>Tomasz Nocoń - Software Engineer</title>
  <meta name="description" content="Tomasz Nocoń - Software Engineer portfolio." />
</svelte:head>

<noscript>
  <div class="fixed z-50 p-2 left-1/2 -translate-x-1/2 w-full text-sm text-center bg-sec-5">
    Javascript is disabled. You're viewing a barebones version of this website.
  </div>
</noscript>

<Hero {secondSection} />

<Skillset bind:sectionRef={secondSection} />

<Projects />

<About />
