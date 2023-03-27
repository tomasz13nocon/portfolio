<script lang="ts">
  import Headline from "$lib/components/Headline.svelte";
  import Project from "./Project.svelte";
</script>

<Headline
  heading="More Projects"
  subheading="Older projects, shown for historical purposes. For a better idea of my current skills, please see the projects above."
/>

<Project
  name="Ultrakino"
  stack={["Java", "Spring", "Hibernate", "PostgreSQL", "AngularJS", "Sass"]}
  gh="https://github.com/tomasz13nocon/ultrakino"
  more=""
  website=""
  img=""
>
  <p>
    Almost finished, sizeable full stack website, where users (having declared they own the
    copyright of course) could upload links to 3rd party services hosting movies.
  </p>
  <p>There was voting, comments, and it pulled movie data from an API.</p>
  <br />
  <p>
    This was my first big project, made in 2016/2017 (when AngularJS - yes, the first one - was
    still cool), and altough it went nowhere, it taught me a lot about web dev and code
    architecture.
  </p>
</Project>

<Project
  name="Spikes"
  stack={["Java", "libGDX"]}
  gh="https://github.com/tomasz13nocon/spikes-clone"
  more=""
  website=""
  img="/screenshots/spikes.png"
  vertical
>
  <p>"Don't touch the spikes" clone. Made in 2017.</p>
  <p>
    <a
      href="https://user-images.githubusercontent.com/11395615/224403093-b117fecc-62eb-4c9e-8426-f8ddba4a0b82.webm"
      class="external"
      target="_blank"
    >
      Demo video
    </a>
  </p>
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
  <p>A very simple game made in a week. Made in 2016.</p>
</Project>
