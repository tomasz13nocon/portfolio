<script lang="ts">
  import { onMount } from "svelte";
  import { cubicOut, quadIn, quadOut, quintIn, quintOut } from "svelte/easing";
  import { questionMark, skillsGood, skillsMid } from "$lib/data";

  export function mouseMoved(e: MouseEvent) {
    mx = e.clientX;
    my = e.clientY - canvas.getBoundingClientRect().top;
    // console.log(mx, my);
  }

  interface Skill {
    name: string;
    color: string;
    src: string;
    img: HTMLImageElement;
    dark: boolean;
  }
  interface Hex {
    x: number;
    y: number;
    opacity: number;
    opacityT: number;
    skill?: Skill;
  }
  type SkillHex = Required<Hex>;

  const a = Math.PI / 3,
    hexSize = 40,
    iconSize = hexSize * 1.2,
    halfIconSize = iconSize * 0.5,
    hexDX = hexSize * (Math.cos(a) * 2) + hexSize * 2, //  \_/¯
    hexDY = hexSize * Math.sin(a), // \
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
    mx: number,
    my: number,
    hexes: Hex[] = [];

  function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    offscreenCanvas.width = canvas.clientWidth;
    offscreenCanvas.height = canvas.clientHeight;
    // No idea why this raf is needed. Without it maximizing window and opening devtools doesn't cause correct recalculations
    requestAnimationFrame(() => initHexes(canvas.clientWidth, canvas.clientHeight));
  }

  function initHexes(width: number, height: number) {
    hexes = [];
    let skillsGoodAssigned = 0;
    let skillsMidAssigned = 0;
    let leftQuestionAssigned = false;
    let rightQuestionAssigned = false;
    let imgsLoaded = 0;
    let initDone = false;
    const vertical = innerWidth < 768;
    const halfSkillsWidth = hexSize * 3;
    const sectionWidth = Math.min(1080, innerWidth);
    const leftCenter =
      sectionWidth * (vertical ? 0.5 : 0.25) + Math.max(0, (innerWidth - 1080) * 0.5);
    const rightCenter =
      sectionWidth * (vertical ? 0.5 : 0.75) + Math.max(0, (innerWidth - 1080) * 0.5);
    const iconsStartY = 440;

    function drawIfReady() {
      if (++imgsLoaded === skillsMid.length + skillsGood.length && initDone) {
        drawStaticHexes(offscreenCtx);
      }
    }

    for (let y = 0, i = 0; y < height; y += hexDY, i++) {
      // We need i to do `i % 2` below, because `y / hexDY % 2` would not work due to floating point arithmetic inaccuracies
      for (let x = i % 2 ? hexDX * 0.5 : 0; x < width + hexSize; x += hexDX) {
        let skill;

        // if (y > 232 && x > leftCenter + hexSize && !leftQuestionAssigned) {
        //   skill = questionMark;
        //   skill.name = "Used extensively in recent years";
        //   leftQuestionAssigned = true;
        // } else if (y > 232 && x > rightCenter + hexSize && !rightQuestionAssigned) {
        //   skill = questionMark;
        //   skill.name = "Used sparingly in recent years or extensively in the past";
        //   rightQuestionAssigned = true;
        // }

        if (
          y > iconsStartY &&
          // y < 550 &&
          x > leftCenter - halfSkillsWidth &&
          x < leftCenter + halfSkillsWidth &&
          skillsGoodAssigned < skillsGood.length
        ) {
          skill = skillsGood[skillsGoodAssigned++];
        } else if (
          y > (vertical ? iconsStartY + 450 : iconsStartY + 100) &&
          // y < 550 &&
          x > rightCenter - halfSkillsWidth &&
          x < rightCenter + halfSkillsWidth &&
          skillsMidAssigned < skillsMid.length
        ) {
          skill = skillsMid[skillsMidAssigned++];
        }

        if (skill) {
          let img = new Image();
          skill = { ...skill, img };
          img.onload = drawIfReady;
          img.src = skill.src;
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

    initDone = true;
    // Not called as img onload so don't count this invocation as a loaded image
    imgsLoaded--;
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
    const padding = 10,
      fontSize = 16,
      { width: textWidth } = ctx.measureText(text),
      rectHeight = fontSize + padding * 2;

    ctx.fillStyle = bg;
    ctx.fillRect(x, y - rectHeight * 0.5, textWidth + padding * 2, rectHeight);

    ctx.font = fontSize + "px monospace";
    ctx.textBaseline = "top";
    ctx.fillStyle = color;
    ctx.fillText(text, x + padding, y + padding - rectHeight * 0.5);
  }

  function drawStaticHexes(ctx: CanvasRenderingContext2D) {
    // Draw all hexes
    ctx.lineWidth = hexThickness;
    for (let hex of hexes) {
      if (hex.skill) {
        ctx.lineWidth = hexThickness + 2;
        drawHexagon(ctx, hex, hexSize, colors.default);
        ctx.lineWidth = hexThickness;
        drawSkillImg(ctx, hex as SkillHex, hex.skill.color);
      } else {
        drawHexagon(ctx, hex, hexSize, colors.default);
      }
    }
  }

  function drawHexagon(
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

  let perf = 0;
  let perfs = 0,
    frameN = 0;
  function draw(t: number) {
    perf = performance.now();
    rafId = requestAnimationFrame(draw);
    let dt = t - lastT;
    lastT = t;

    let drawTooltipSchedule = [];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Offscreen Canvas improved frame perf 20x 😍
    ctx.drawImage(offscreenCanvas, 0, 0);

    // ctx.font = "36px monospace";
    // ctx.fillStyle = "white";
    // ctx.fillText("Expertise", 100, 232);

    // Draw hover hexes
    for (let hex of hexes) {
      let opacityHexa = Math.floor(hex.opacity * 255)
        .toString(16)
        .padStart(2, "0");

      let mouseIn = Math.abs(hex.x - mx) < hexDY && Math.abs(hex.y - my) < hexDY;
      if (mouseIn) {
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
        drawHexagon(ctx, hex, hexSize, (hex.skill?.color ?? colors.hover) + opacityHexa);

        // Draw skill hex animation
        if (hex.skill) {
          drawSkillImg(ctx, hex as SkillHex, colors.bg + opacityHexa);
        }

        // Draw shadow
        ctx.shadowColor = hex.skill?.color ?? colors.shadow;
        ctx.shadowBlur = 10;
        ctx.lineWidth = 11;
        ctx.translate(dummyOffset, 0);
        ctx.shadowOffsetX = -dummyOffset;
        drawHexagon(ctx, hex, hexSize, "#000000" + opacityHexa);
        ctx.translate(-dummyOffset, 0);
        ctx.shadowBlur = 0;
        ctx.lineWidth = hexThickness;
        ctx.shadowOffsetX = 0;
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

    perfs += performance.now() - perf;
    frameN++;
    if (frameN > 60) {
      // console.log(perfs / 60);
      perfs = 0;
      frameN = 0;
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
