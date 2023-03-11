<script lang="ts">
  import { T, useFrame } from "@threlte/core";

  export let color: string;
  export let container: HTMLElement;

  let time = 0;
  useFrame((_, delta) => {
    time += delta;
  });

  let lightPos: [number, number, number] = [-0.3, 1, 0.4],
    innerWidth: number,
    innerHeight: number;
  function mouseMoved(e: MouseEvent) {
    lightPos[0] = e.clientX / innerWidth - 0.5;
    lightPos[1] = Math.max(-1.1, -(e.clientY / (container.getBoundingClientRect().top + 64) - 1));
  }
</script>

<svelte:window on:mousemove={mouseMoved} bind:innerWidth bind:innerHeight />
<T.DirectionalLight position={lightPos} castShadow />
<T.AmbientLight intensity={0.25} />
<T.Mesh
  rotation={[0, time, 0.05]}
  position={[0, Math.sin(time * 3.5) * 0.5, 0]}
  castShadow
  scale={[0.75, 1, 0.75]}
>
  <T.MeshPhysicalMaterial
    {color}
    metalness={0.8}
    roughness={0.55}
    reflectivity={0.9}
    transmission={0.1}
    thickness={0.5}
  />
  <T.CapsuleGeometry args={[1.33333, 2, 6, 16]} />
</T.Mesh>
