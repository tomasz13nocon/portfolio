<script lang="ts">
  export let heading: string,
    subheading = "";
</script>

<div class="mx-auto">
  <h2 class="home-section-title mb-0">{heading}</h2>
  {#if subheading}
    <h4 class="text-center px-4 sm:px-24 md:px-40 lg:px-60 mt-8 text-lg">{subheading}</h4>
  {/if}
</div>
