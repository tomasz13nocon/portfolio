<script lang="ts">
  import Project from "./Project.svelte";
</script>

<!-- TODO: changed perspective to custom TW, confirm this works -->
<section class="home-section [perspective:1000px]">
  <!-- on:mousemove={mouseMovedProjects} -->
  <!-- bind:this={section} -->
  <div class=" w-[76rem] mx-auto">
    <h2 class="text-7xl pb-16 text-center">Projects</h2>

    <div class="flex flex-col gap-16">
      <Project
        name="Star Wars Media Timeline"
        featured
        stack={["React", "Sass", "Node.js", "MongoDB", "AWS EC2", "AWS S3"]}
        gh="https://github.com/tomasz13nocon/swtimeline"
        website="https://starwarstl.com"
        img="/screenshots/starwarstl.png"
        more="starwarstl"
      >
        Virtualized timeline with lots of filters and search capabilities.
        <br />
        The contents are automatically fetched, parsed and transformed from the Star Wars wiki daily
        via a
        <a
          href="https://github.com/tomasz13nocon/swtimeline-server/blob/master/fetch_timeline.js"
          target="_blank"
          class="external">complex Node.js script</a
        >.
        <br />
        Currently working on even more filtering options and adding authentication for users to track
        media they watch and read, as well as converting the SPA to NextJS.
      </Project>

      <Project
        name="Karolina's portfolio"
        stack={["Astro", "Vanilla JS", "NetlifyCMS"]}
        gh="https://github.com/tomasz13nocon/karolina"
        website="https://beta--cute-pixie-d384de.netlify.app/"
        img="/screenshots/karolina.png"
        more=""
      >
        Simple portfolio website for a photographer. Statically generated with blogging capabilities
        and a basic CMS setup. Fullscreen image viewer written from scratch in vanilla JS.
      </Project>

      <Project
        name="Software engineer's portfolio"
        stack={["Svelte", "SvelteKit", "Tailwind"]}
        gh="https://github.com/tomasz13nocon/portfolio"
        more=""
        recursion
      >
        Hey, that's this one!
        <br />
        I had some fun with canvas.
        <br />
        And I even
        <a
          href="https://www.figma.com/file/882otEPHJxgiwsfCuA5Jyf/CyberCard?t=I3GNoCON63CiiW5T-6"
          class="external"
          target="_blank"
        >
          designed
        </a> these cards.
      </Project>
    </div>

    <h2 class="text-7xl pt-16 text-center">More Projects</h2>
    <h4 class="text-center pt-6 pb-16 text-lg">Older or unfinished projects</h4>

    <Project
      name="Ultrakino"
      stack={["Java", "Spring", "Hibernate", "PostgreSQL", "AngularJS", "Sass"]}
      gh="https://github.com/tomasz13nocon/ultrakino"
      more=""
      website=""
      img=""
    >
      Almost finished, sizeable full stack website, where users (having declared they own the
      copyright of course) could upload links to 3rd party services hosting movies.
      <br />
      There was voting, comments, and it pulled movie data from an API.
      <br />
      <br />
      This was my first big project, made in 2016/2017 (when AngularJS - yes, the first one - was still
      cool), and altough it went nowhere, it taught me a lot about web dev and code architecture.
    </Project>

    <div class="whitespace-nowrap">
      <Project
        name="Spikes"
        stack={["Java", "libGDX"]}
        gh="https://github.com/tomasz13nocon/spikes-clone"
        more=""
        website=""
        img="/screenshots/spikes.png"
        vertical
      >
        "Don't touch the spikes" clone. Made in 2017.
        <br />
        <a
          href="https://user-images.githubusercontent.com/11395615/224403093-b117fecc-62eb-4c9e-8426-f8ddba4a0b82.webm"
          class="external"
          target="_blank"
        >
          Demo video
        </a>
      </Project>

      <Project
        name="Silly shooting game"
        stack={["Java", "libGDX"]}
        gh="https://github.com/tomasz13nocon/silly-shooting-game"
        more=""
        website=""
        img="/screenshots/shooting-game.png"
        vertical
      >
        A very simple game made in a week. Made in 2016.
      </Project>
    </div>
  </div>
</section>
