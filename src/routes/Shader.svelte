<script lang="ts">
  import { T, useFrame } from "@threlte/core";
  import fragmentShader from "$lib/shaders/boxTest.frag";
  import { afterUpdate, beforeUpdate } from "svelte";

  export let uniforms: { scrollY: { value: number } };
</script>

<!-- {#key uniforms} -->
<T.ShaderMaterial {fragmentShader} {uniforms} />
<!-- {/key} -->
