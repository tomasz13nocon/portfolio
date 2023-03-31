<script>
  import Headline from "$lib/components/Headline.svelte";
  import Project from "./Project.svelte";
</script>

<Headline heading="Projects" />

<Project
  name="Star Wars Media Timeline"
  featured
  stack={["React", "Sass", "Node.js", "MongoDB", "Express.js", "AWS EC2", "AWS S3"]}
  gh="https://github.com/tomasz13nocon/starwarstl-client"
  website="https://starwarstl.com"
  img="/screenshots/starwarstl.png"
>
  <p>Virtualized timeline with lots of filters and search capabilities.</p>
  <p>Serving 500+ monthly active users.</p>
  <p>
    The contents are automatically fetched, parsed and transformed from the Star Wars wiki daily via
    a
    <a
      href="https://github.com/tomasz13nocon/starwarstl-fetch/blob/master/src/index.js"
      target="_blank"
      class="external"
    >
      Node.js data processing pipeline</a
    >.
  </p>
  <p>Currently working on adding authentication and refactoring the codebase.</p>
</Project>

<Project
  name="Photographer's portfolio"
  stack={["Astro", "Vanilla JS", "Tailwind", "NetlifyCMS"]}
  gh="https://github.com/tomasz13nocon/karolina"
  website="https://beta--cute-pixie-d384de.netlify.app/"
  img="/screenshots/karolina.png"
  more=""
  vertical
>
  <p>
    Simple portfolio website for a photographer. Statically generated with blogging capabilities and
    a basic CMS setup. Fullscreen image viewer written from scratch in vanilla JS.
  </p>
</Project>

<Project
  name="Software engineer's portfolio"
  stack={["Svelte", "SvelteKit", "TypeScript", "Tailwind"]}
  gh="https://github.com/tomasz13nocon/portfolio"
  more=""
  recursion
  vertical
>
  <p>Hey, that's this one!</p>
  <p>I had some fun with canvas and SVGs.</p>
  <p>
    And I even
    <a
      href="https://www.figma.com/file/882otEPHJxgiwsfCuA5Jyf/CyberCard?t=I3GNoCON63CiiW5T-6"
      class="external"
      target="_blank"
    >
      designed
    </a> these cards.
  </p>
</Project>
