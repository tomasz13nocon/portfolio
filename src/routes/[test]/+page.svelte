<script lang="ts">
  import { page } from "$app/stores";
  export let data: { name: string };
</script>

<h2>test page at url: {data.name}</h2>
<a href="{$page.params.test}/child">Child</a>
