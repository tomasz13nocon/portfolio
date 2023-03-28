<script lang="ts">
  import { onMount } from "svelte";
  import { quadIn } from "svelte/easing";
  import { skillCount, type SkillImg } from "$lib/skills";
  import { createSkillGetter } from "./Grid";

  export function mouseMoved(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY - canvas.getBoundingClientRect().top;
  }

  interface Hex {
    x: number;
    y: number;
    opacity: number;
    opacityT: number;
    skill?: SkillImg;
  }

  type SkillHex = Required<Hex>;

  const a = Math.PI / 3, // 60 deg = hex inside angle
    hexSize = 40,
    iconSize = hexSize * 1.2,
    halfIconSize = iconSize * 0.5,
    hexDX = hexSize * (Math.cos(a) * 2) + hexSize * 2, // distance visually:  \_/¯
    hexDY = hexSize * Math.sin(a), // distance visually: \
    colors = { default: "#232721", hover: "#007900", shadow: "green", bg: "#0F0F0E" },
    dummyOffset = -9999,
    duration = 700,
    hexThickness = 2;
  let canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    offscreenCanvas: HTMLCanvasElement,
    offscreenCtx: CanvasRenderingContext2D,
    rafId: number,
    innerWidth: number,
    lastT = 0,
    mouseX: number,
    mouseY: number,
    hexes: Hex[] = [];

  function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    offscreenCanvas.width = canvas.clientWidth;
    offscreenCanvas.height = canvas.clientHeight;
    // Without this raf maximizing window or opening devtools doesn't cause correct recalculations
    requestAnimationFrame(() => initHexes(canvas.clientWidth, canvas.clientHeight));
  }

  function initHexes(width: number, height: number) {
    hexes = [];
    let imgsLoaded = 0;

    // Draw if both: all icons loaded and we've finished initializing
    function drawIfReady() {
      if (++imgsLoaded === skillCount + 1) {
        drawStaticHexes(offscreenCtx);
      }
    }

    let getNextSkill = createSkillGetter(innerWidth, hexSize);
    for (let y = 0, i = 0; y < height; y += hexDY, i++) {
      // We need to do `i % 2` below, because `y / hexDY % 2` would not work
      // due to floating point arithmetic inaccuracies
      for (let x = i % 2 ? hexDX * 0.5 : 0; x < width + hexSize; x += hexDX) {
        let skill = getNextSkill(x, y);
        if (skill) {
          skill.img.onload = drawIfReady;
          skill.img.src = skill.src;
        }
        hexes.push({
          x,
          y,
          opacity: 0,
          opacityT: 0,
          skill,
        });
      }
    }

    drawIfReady();
  }

  function drawSkillImg(ctx: CanvasRenderingContext2D, hex: SkillHex, color: string) {
    ctx.fillStyle = color;
    ctx.fill();

    ctx.drawImage(hex.skill.img, hex.x - halfIconSize, hex.y - halfIconSize, iconSize, iconSize);

    ctx.fillStyle = "";
  }

  function drawTooltip(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    text: string,
    bg: string,
    color: string
  ) {
    const padding = 8,
      fontSize = 13,
      { width: textWidth } = ctx.measureText(text),
      rectHeight = fontSize + padding * 2;

    // draw to the left if the tooltip overflows screen
    if (x + textWidth + padding * 2 > innerWidth) {
      x = x - textWidth - hexSize * 3.5;
      // draw below if it still overflows
      if (x < 0) {
        x = innerWidth - textWidth - padding * 2 - 12;
        y += hexSize * 1.6;
      }
    }

    ctx.fillStyle = bg;
    ctx.roundRect(x, y - rectHeight * 0.5, textWidth + padding * 2, rectHeight, 4);
    ctx.fill();

    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textBaseline = "top";
    ctx.fillStyle = color;
    ctx.fillText(text, x + padding, y + padding - rectHeight * 0.5 + 1);
  }

  function drawStaticHexes(ctx: CanvasRenderingContext2D) {
    // Draw all hexes
    ctx.lineWidth = hexThickness;
    for (let hex of hexes) {
      if (hex.skill) {
        ctx.lineWidth = hexThickness + 2;
        drawHex(ctx, hex, hexSize, colors.default);
        ctx.lineWidth = hexThickness;
        drawSkillImg(ctx, hex as SkillHex, hex.skill.color);
      } else {
        drawHex(ctx, hex, hexSize, colors.default);
      }
    }
  }

  function drawHex(
    ctx: CanvasRenderingContext2D,
    hex: { x: number; y: number },
    r: number,
    color: string
  ) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      ctx.lineTo(hex.x + r * Math.cos(a * i), hex.y + r * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.stroke();
  }

  function drawShadow(ctx: CanvasRenderingContext2D, hex: Hex, color: string) {
    ctx.shadowColor = hex.skill?.color ?? colors.shadow;
    ctx.shadowBlur = 10;
    ctx.lineWidth = 11;
    ctx.translate(dummyOffset, 0);
    ctx.shadowOffsetX = -dummyOffset;
    drawHex(ctx, hex, hexSize, color);
    ctx.translate(-dummyOffset, 0);
    ctx.shadowBlur = 0;
    ctx.lineWidth = hexThickness;
    ctx.shadowOffsetX = 0;
  }

  function draw(t: number) {
    rafId = requestAnimationFrame(draw);
    let dt = t - lastT;
    lastT = t;

    let drawTooltipSchedule = [];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Offscreen Canvas improved frame perf 20x 😍
    ctx.drawImage(offscreenCanvas, 0, 0);

    // allow only one hex to be hovered. Easier than figuring out intersection with hexes, and good enough
    let hovered = false;
    // Draw hover hexes
    for (let hex of hexes) {
      let opacityHexa = Math.floor(hex.opacity * 255)
        .toString(16)
        .padStart(2, "0");

      let mouseIn = Math.abs(hex.x - mouseX) < hexDY && Math.abs(hex.y - mouseY) < hexDY;
      if (mouseIn && !hovered) {
        hovered = true;
        hex.opacity = 1;
        hex.opacityT = 0;
        if (hex.skill) {
          // Can't draw in this loop because we want it on top of everything
          drawTooltipSchedule.push(hex);
        }
      }
      if (hex.opacity !== 0) {
        // Calc opacity
        hex.opacityT = Math.min(hex.opacityT + dt, duration);
        hex.opacity = quadIn(1 - hex.opacityT / duration);

        // Draw hover border
        if (hex.skill) {
          ctx.lineWidth = hexThickness + 2;
        }
        drawHex(ctx, hex, hexSize, (hex.skill?.color ?? colors.hover) + opacityHexa);

        // Draw skill hex animation
        if (hex.skill) {
          drawSkillImg(ctx, hex as SkillHex, colors.bg + opacityHexa);
        }

        drawShadow(ctx, hex, "#000000" + opacityHexa);
      }
    }

    // Draw tooltip
    for (let hex of drawTooltipSchedule) {
      if (hex.skill) {
        drawTooltip(
          ctx,
          hex.x + hexSize * 1.5,
          hex.y,
          hex.skill.name.toUpperCase(),
          hex.skill.color,
          hex.skill.dark ? "white" : "black"
        );
      }
    }
  }

  onMount(() => {
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    offscreenCanvas = document.createElement("canvas");
    offscreenCtx = offscreenCanvas.getContext("2d") as CanvasRenderingContext2D;

    resizeCanvas();

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  });
</script>

<svelte:window on:resize={resizeCanvas} bind:innerWidth />
<canvas bind:this={canvas} class="absolute inset-0 w-full h-full" />
