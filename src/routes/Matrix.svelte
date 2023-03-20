<script lang="ts">
  // Loosely based on https://codepen.io/syropian/pen/nJjZaE

  import { matrixChars } from "$lib/util";
  import { afterUpdate, onMount } from "svelte";

  interface Strip {
    posX: number;
    posY: number;
    speed: number;
    fontSize: number;
    height: number;
    chars: string[];
  }

  const theColors = ["#D3FBE7ff", "#81ec72ff", "#5cd646ff", "#54d13cee", "#4ccc32ba", "#4ccc329a", "#43c72878", "#43c72858", "#43c72838"];
  const shadowColor = "#94f475";

  let canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, lastT: number, stripCount: number, strips: Strip[], rafId: number;

  function randomizeChar() {
    return matrixChars[Math.floor(Math.random() * matrixChars.length)];
  }

  function initStrip() {
    let chars = [];
    let height = Math.random() * 20 + 25;
    for (let i = 0; i < height; i++) {
      chars[i] = randomizeChar();
    }
    return {
      posX: Math.floor(Math.random() * canvas.width),
      posY: -100 - Math.random() * 1200,
      speed: Math.floor(Math.random() * 6) + 6,
      fontSize: Math.floor(Math.random() * 16) + 14,
      height,
      chars,
    };
  }

  function drawStrip(strip: Strip, dt: number) {
    let y = strip.posY;
    for (let j = 0; j < strip.height; j++) {
      if (Math.random() < 0.0003 * dt) {
        strip.chars[j] = randomizeChar();
      }
      if (context.fillText) {
        switch (j) {
          case 0:
            context.fillStyle = theColors[0];
            // context.shadowBlur = 8;
            break;
          case 1:
            context.fillStyle = theColors[1];
            break;
          case 7:
            context.fillStyle = theColors[2];
            break;
          case 11:
            context.fillStyle = theColors[3];
            // context.shadowBlur = 0;
            break;
          case 17:
            context.fillStyle = theColors[4];
            break;
          case 23:
            context.fillStyle = theColors[5];
            break;
          case 28:
            context.fillStyle = theColors[5];
            break;
          case 33:
            context.fillStyle = theColors[6];
            break;
          case 37:
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
    context.shadowBlur = 0;
    context.shadowColor = shadowColor;

    for (let i = 0; i < stripCount; i++) {
      let strip = strips[i];
      context.font = strip.fontSize + "px monospace"; // MatrixCode
      context.textBaseline = "top";
      context.textAlign = "center";

      if (strip.posY > canvas.height + (strip.fontSize + 4) * strip.height) {
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
    canvas.width = canvas.clientWidth; //canvas.parentElement!.clientWidth;
    canvas.height = canvas.clientHeight; //canvas.parentElement!.clientHeight;
  }

  onMount(() => {
    context = canvas.getContext("2d") as CanvasRenderingContext2D;
    // context.globalCompositeOperation = "lighter";
    resizeCanvas();
    lastT = 0;
    stripCount = Math.floor(canvas.width / 26);
    strips = [];

    for (let i = 0; i < stripCount; i++) {
      strips[i] = initStrip();
    }

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  });
</script>

<svelte:window on:resize={resizeCanvas} />
<canvas bind:this={canvas} class={$$props.class} />
<!-- style:transform="translateY({offset}px)" -->
