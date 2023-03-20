<script lang="ts">
  const max = 10;
  let n = 0,
    intervalId: number;

  function start() {
    n++;
    intervalId = window.setInterval(() => {
      if (++n > max) {
        window.clearInterval(intervalId);
      }
    }, 30);
  }
  function stop() {
    n = 0;
    window.clearInterval(intervalId);
  }
</script>

<div class="relative hidden sm:inline-block" on:mouseenter={start} on:mouseleave={stop} aria-hidden="true">
  {#each Array(n) as _, i}
    <span class="link absolute -z-10" style:transform="translate({i * 18}px, {i * 18}px)">Live website</span>
  {/each}
  <span class="link">Live website</span>
  {#if n > max}
    <span class="text-red-600 absolute whitespace-nowrap left-0 bottom-full">Error: infinite recursion!</span>
  {/if}
</div>
