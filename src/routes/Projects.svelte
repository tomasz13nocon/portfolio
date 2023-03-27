<script lang="ts">
  import MainProjects from "./MainProjects.svelte";
  import OtherProjects from "./OtherProjects.svelte";
</script>

<section class="home-section">
  <div class="w-full xl:w-[76rem] mx-auto flex flex-wrap gap-y-16">
    <MainProjects />

    <div
      class="flex gap-16 md:gap-24 lg:gap-32 flex-col sm:flex-row mb-8 py-12 px-8 mx-auto text-center sm:text-left border-t-2 border-b-2 w-full justify-center"
    >
      <div>
        <h2 class="mb-2">Smaller code stuff</h2>
        <ul>
          <li>
            <a
              href="https://github.com/tomasz13nocon/twitch-sort-by-viewcount"
              target="_blank"
              class="external">Twitch userscript</a
            >
          </li>
          <li>
            <a
              href="https://github.com/tomasz13nocon/youtube-change-notification-wording"
              target="_blank"
              class="external">Youtube userscript</a
            >
          </li>
          <li>
            <a
              href="https://github.com/tomasz13nocon/camillemormal-recreation"
              target="_blank"
              class="external">Fancy website recreation (WIP)</a
            >
          </li>
        </ul>
      </div>
      <div>
        <h2 class="mb-2">OSS contributions</h2>
        <ul>
          <li>
            <a
              href="https://github.com/spencermountain/wtf_wikipedia/pull/459"
              target="_blank"
              class="external">wtf_wikipedia - bug fixes</a
            >
          </li>
          <li>
            <a
              href="https://github.com/spencermountain/wtf_wikipedia/pull/460"
              target="_blank"
              class="external">wtf_wikipedia - more bug fixes</a
            >
          </li>
          <li>
            <a href="https://github.com/xorg62/tty-clock/pull/44" target="_blank" class="external"
              >tty-clock - new feature</a
            >
          </li>
        </ul>
      </div>
    </div>

    <OtherProjects />
  </div>
</section>
