<script lang="ts">
  import Project from "./Project.svelte";
</script>

<section class="home-section">
  <div class="w-full xl:w-[76rem] mx-auto flex flex-wrap gap-y-16">
    <h2 class="home-section-title mb-0 mx-auto">Projects</h2>

    <Project
      name="Star Wars Media Timeline"
      featured
      stack={["React", "Sass", "Node.js", "MongoDB", "Express.js", "AWS EC2", "AWS S3"]}
      gh="https://github.com/tomasz13nocon/swtimeline"
      website="https://starwarstl.com"
      img="/screenshots/starwarstl.png"
    >
      <!-- more="starwarstl" -->
      <p>Virtualized timeline with lots of filters and search capabilities.</p>
      <p>
        The contents are automatically fetched, parsed and transformed from the Star Wars wiki daily via a
        <a href="https://github.com/tomasz13nocon/swtimeline-server/blob/master/fetch_timeline.js" target="_blank" class="external">complex Node.js script</a>.
      </p>
      <p>Currently working on adding authentication and converting the SPA to NextJS.</p>
    </Project>

    <Project
      name="Karolina's portfolio"
      stack={["Astro", "Vanilla JS", "Tailwind", "NetlifyCMS"]}
      gh="https://github.com/tomasz13nocon/karolina"
      website="https://beta--cute-pixie-d384de.netlify.app/"
      img="/screenshots/karolina.png"
      more=""
      vertical
    >
      <p>
        Simple portfolio website for a photographer. Statically generated with blogging capabilities and a basic CMS setup. Fullscreen image viewer written from
        scratch in vanilla JS.
      </p>
    </Project>

    <Project
      name="Software engineer's portfolio"
      stack={["Svelte", "SvelteKit", "Tailwind"]}
      gh="https://github.com/tomasz13nocon/portfolio"
      more=""
      recursion
      vertical
    >
      <p>Hey, that's this one!</p>
      <p>I had some fun with canvas and SVGs.</p>
      <p>
        And I even
        <a href="https://www.figma.com/file/882otEPHJxgiwsfCuA5Jyf/CyberCard?t=I3GNoCON63CiiW5T-6" class="external" target="_blank"> designed </a> these cards.
      </p>
    </Project>

    <div class="flex gap-16 md:gap-24 lg:gap-32 flex-col sm:flex-row mb-16 px-8 mx-auto text-center sm:text-left">
      <div>
        <h2 class="mb-2">Smaller code stuff</h2>
        <ul>
          <li>
            <a href="https://github.com/tomasz13nocon/twitch-sort-by-viewcount" target="_blank" class="external">Twitch userscript</a>
          </li>
          <li>
            <a href="https://github.com/tomasz13nocon/youtube-change-notification-wording" target="_blank" class="external">Youtube userscript</a>
          </li>
          <li>
            <a href="https://github.com/tomasz13nocon/camillemormal-recreation" target="_blank" class="external">Fancy website recreation (WIP)</a>
          </li>
        </ul>
      </div>
      <div>
        <h2 class="mb-2">OSS contributions</h2>
        <ul>
          <li>
            <a href="https://github.com/spencermountain/wtf_wikipedia/pull/459" target="_blank" class="external">wtf_wikipedia - bug fixes</a>
          </li>
          <li>
            <a href="https://github.com/spencermountain/wtf_wikipedia/pull/460" target="_blank" class="external">wtf_wikipedia - more bug fixes</a>
          </li>
          <li>
            <a href="https://github.com/xorg62/tty-clock/pull/44" target="_blank" class="external">tty-clock - new feature</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="mx-auto">
      <h2 class="home-section-title mb-6">More Projects</h2>
      <h4 class="text-center px-4 text-lg">Older or unfinished projects</h4>
    </div>

    <Project
      name="Ultrakino"
      stack={["Java", "Spring", "Hibernate", "PostgreSQL", "AngularJS", "Sass"]}
      gh="https://github.com/tomasz13nocon/ultrakino"
      more=""
      website=""
      img=""
    >
      <p>
        Almost finished, sizeable full stack website, where users (having declared they own the copyright of course) could upload links to 3rd party services
        hosting movies.
      </p>
      <p>There was voting, comments, and it pulled movie data from an API.</p>
      <br />
      <p>
        This was my first big project, made in 2016/2017 (when AngularJS - yes, the first one - was still cool), and altough it went nowhere, it taught me a lot
        about web dev and code architecture.
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
        <a href="https://user-images.githubusercontent.com/11395615/224403093-b117fecc-62eb-4c9e-8426-f8ddba4a0b82.webm" class="external" target="_blank">
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
  </div>
</section>
