<script lang="ts">
  import { T, useFrame } from "@threlte/core";
  import { HTML, Text } from "@threlte/extras";
  import { spring, type Spring } from "svelte/motion";
  import fragmentShader from "$lib/shaders/boxTest.frag";
  import { afterUpdate } from "svelte";
  import { degToRad } from "three/src/math/MathUtils";
  import Shader from "./Shader.svelte";

  let scr = spring(0);
  $: $scr = scrollY;

  let value: boolean;
  let time = 0;
  let uniforms = {
    scrollY: { value: Math.abs(Math.sin(time)) },
  };
  useFrame((ctx, delta) => {
    time += delta * 0.5;
    // uniforms = {
    //   scrollY: { value: time },
    // };
    uniforms.scrollY.value = time;
  });
</script>

<HTML position={{ x: 1, y: -2.3, z: 3 }} transform>
  <input type="checkbox" bind:checked={value} style:z-index={20} />
</HTML>
<Text
  text={time.toFixed(1)}
  position={{ x: -1, y: 2.0, z: -2 }}
  color="#e90E11"
  fontSize={1}
  fillOpacity={0.9}
/>
<T.Mesh position={[2.0, 0.5, -0.5]} rotation={[degToRad(45), time + $scr * 0.003, degToRad(45)]}>
  <T.BoxGeometry />
  <!-- <T.MeshStandardMaterial color="#333333" /> -->
  <Shader {uniforms} />
  <!-- <T.ShaderMaterial {fragmentShader} uniformsNeedUpdate={true} {uniforms} wireframe /> -->
</T.Mesh>
