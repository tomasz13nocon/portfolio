<script lang="ts">
  import { T, useFrame, useTexture, useThrelte } from "@threlte/core";
  import { Float, HTML, Text } from "@threlte/extras";
  import type { Spring } from "svelte/motion";
  import vertexShader from "$lib/shaders/main.vert";
  import fragmentShader from "$lib/shaders/main.frag";
  import { afterUpdate } from "svelte";
  import { CanvasTexture } from "three";
  import { onMount } from "svelte";
  import { degToRad } from "three/src/math/MathUtils";

  export let scrollY: number;
  export let canvasTex: HTMLCanvasElement;

  ////////////////// MATIX //////////////////
  // Loosely based on https://codepen.io/syropian/pen/nJjZaE
  import { matrixChars } from "$lib/util";

  interface Strip {
    posX: number;
    posY: number;
    speed: number;
    fontSize: number;
    chars: string[];
  }

  const theColors = ["#cefbe4", "#81ec72", "#5cd646", "#54d13c", "#4ccc32", "#43c728"];
  const shadowColor = "#94f475";

  let canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    lastT: number,
    stripCount: number,
    stripHeight: number,
    strips: Strip[],
    rafId: number;

  function randomizeChar() {
    return matrixChars[Math.floor(Math.random() * matrixChars.length)];
  }

  function initStrip() {
    let chars = [];
    for (let i = 0; i < stripHeight; i++) {
      chars[i] = randomizeChar();
    }
    return {
      posX: Math.floor(Math.random() * canvas.width),
      posY: -100 - Math.random() * 400,
      speed: Math.floor(Math.random() * 6) + 4,
      fontSize: Math.floor(Math.random() * 12) + 14,
      chars: chars,
    };
  }

  function drawStrip(strip: Strip, dt: number) {
    let y = strip.posY;
    for (let j = 0; j < stripHeight; j++) {
      if (Math.random() < 0.0008 * dt) {
        strip.chars[j] = randomizeChar();
      }
      if (context.fillText) {
        switch (j) {
          case 0:
            context.fillStyle = theColors[0];
            break;
          case 1:
            context.fillStyle = theColors[1];
            break;
          case 3:
            context.fillStyle = theColors[2];
            break;
          case 7:
            context.fillStyle = theColors[3];
            break;
          case 13:
            context.fillStyle = theColors[4];
            break;
          case 17:
            context.fillStyle = theColors[5];
            break;
        }
        context.fillText(strip.chars[j], strip.posX, y);
      }
      y -= strip.fontSize + 4;
    }
  }

  function draw(t: number) {
    let dt = t - lastT;
    // clear the canvas and set the properties
    context.clearRect(0, 0, canvas.width, canvas.height);
    // context.shadowBlur = 8;
    // context.shadowColor = shadowColor;

    for (let i = 0; i < stripCount; i++) {
      let strip = strips[i];
      context.font = strip.fontSize + "px monospace"; // MatrixCode
      context.textBaseline = "top";
      context.textAlign = "center";

      if (strip.posY > canvas.height + (strip.fontSize + 4) * stripHeight) {
        strips[i] = initStrip();
        strip.posY = -100;
      }
      drawStrip(strip, dt);
      strip.posY += strip.speed * 0.01 * dt;
    }
    rafId = requestAnimationFrame(draw);
    lastT = t;
  }

  function resizeCanvas() {
    canvas.width = 300; //canvas.parentElement!.clientWidth;
    canvas.height = 300; //canvas.parentElement!.clientHeight;
  }

  canvas = document.createElement("canvas");
  context = canvas.getContext("2d") as CanvasRenderingContext2D;
  onMount(() => {
    // context.globalCompositeOperation = "lighter";
    resizeCanvas();
    lastT = 0;
    stripHeight = 21;
    stripCount = Math.floor(canvas.width / 30);
    strips = [];

    for (let i = 0; i < stripCount; i++) {
      strips[i] = initStrip();
    }

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  });

  //////////////////////////// MATRIX ////////////////////////////////

  const { pointer } = useThrelte();
  let tex1 = useTexture("/favicon.png");
  let tex2 = new CanvasTexture(canvasTex);
  let value: string;
  let rotation = 0;
  let uniforms = {
    scrollY: { value: 0 },
    t: { value: 0 },
    tex1: { value: tex2 },
  };
  uniforms.tex1.value = new CanvasTexture(canvas);
  useFrame((ctx, delta) => {
    rotation += delta * 0.5;
    uniforms.scrollY.value = scrollY;
    uniforms.t.value += delta;
    // tex2 = new CanvasTexture(document.getElementById("matrix-canvas")!);
    uniforms.tex1.value.needsUpdate = true;
    // console.log($pointer.x);
  });
</script>

<HTML position={{ x: -1, y: 2.5, z: -2 }} transform>
  <input type="text" bind:value />
</HTML>
<Text
  text={rotation.toFixed(1)}
  position={{ x: -1, y: 2.0, z: -2 }}
  color="#e90E11"
  fontSize={1}
  fillOpacity={0.9}
/>

<T.Mesh position={[2.0, 0.5, -0.5]} rotation.x={degToRad(-90)}>
  <!-- <T.BoxGeometry /> -->
  <T.PlaneGeometry args={[2, 2]} />
  <!-- <T.MeshStandardMaterial color="white" /> -->
  <!-- <T.MeshStandardMaterial map={tex2} /> -->
  <T.ShaderMaterial {fragmentShader} {vertexShader} uniformsNeedUpdate={true} {uniforms} />
</T.Mesh>
