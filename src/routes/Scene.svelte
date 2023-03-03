<script lang="ts">
  import { T, useFrame, useThrelte } from "@threlte/core";
  import vertexShader from "$lib/shaders/main.vert";
  import fragmentShader from "$lib/shaders/main.frag";
  import { CanvasTexture } from "three";
  import { onMount } from "svelte";

  export let scrollY: number;
  export let width: number;
  export let height: number;

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
    context.shadowBlur = 8;
    context.shadowColor = shadowColor;

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
    canvas.width = width; //canvas.parentElement!.clientWidth;
    canvas.height = height; //canvas.parentElement!.clientHeight;
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
  let uniforms = {
    scrollY: { value: 0 },
    t: { value: 0 },
    tex1: { value: new CanvasTexture(canvas) },
  };
  useFrame((_, delta) => {
    uniforms.scrollY.value = scrollY;
    uniforms.t.value += delta;
    uniforms.tex1.value.needsUpdate = true;
    // console.log($pointer.x);
  });
  $: resizeCanvas();
</script>

<T.Mesh>
  <T.PlaneGeometry args={[(7.6 * width) / height, 7.66]} />
  <T.ShaderMaterial {fragmentShader} {vertexShader} uniformsNeedUpdate={true} {uniforms} />
  <!-- <T.MeshBasicMaterial wireframe /> -->
</T.Mesh>
