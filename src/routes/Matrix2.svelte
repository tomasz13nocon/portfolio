<script lang="ts">
  // Loosely based on https://codepen.io/syropian/pen/nJjZaE

  import { matrixChars } from "$lib/util";
  import { afterUpdate, onMount } from "svelte";

  interface Strip {
    posX: number;
    posY: number;
    speed: number;
    fontSize: number;
    chars: string[];
  }

  const theColors = [
    "#D3FBE7ff",
    "#81ec72ff",
    "#5cd646ff",
    "#54d13cee",
    "#4ccc32ba",
    "#4ccc329a",
    "#43c72878",
    "#43c72858",
    "#43c72838",
  ];
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
      posY: -100 - Math.random() * 800,
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
          case 4:
            context.fillStyle = theColors[2];
            break;
          case 8:
            context.fillStyle = theColors[3];
            break;
          case 15:
            context.fillStyle = theColors[4];
            break;
          case 19:
            context.fillStyle = theColors[5];
            break;
          case 23:
            context.fillStyle = theColors[5];
            break;
          case 26:
            context.fillStyle = theColors[6];
            break;
          case 29:
            context.fillStyle = theColors[7];
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
    canvas.width = canvas.parentElement!.clientWidth;
    canvas.height = canvas.parentElement!.clientHeight;
  }

  onMount(() => {
    context = canvas.getContext("2d") as CanvasRenderingContext2D;
    // context.globalCompositeOperation = "lighter";
    resizeCanvas();
    lastT = 0;
    stripHeight = 32;
    stripCount = Math.floor(canvas.width / 28);
    strips = [];

    for (let i = 0; i < stripCount; i++) {
      strips[i] = initStrip();
    }

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  });

  // afterUpdate(() => console.log("hey"));

  let scrollY: number, innerWidth: number, innerHeight: number;
  $: offset = scrollY * 0.5;
</script>

<svelte:window bind:scrollY bind:innerWidth bind:innerHeight on:resize={resizeCanvas} />
<canvas bind:this={canvas} class={$$props.class} />
<!-- style:transform="translateY({offset}px)" -->
