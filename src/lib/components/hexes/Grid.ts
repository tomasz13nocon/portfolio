import { skills, type SkillImg, type SkillType } from "$lib/skills";

// I'm tightly coupling JS to CSS layout, which is bad, but the alternative
// which is having text content as part of the canvas makes it inaccessible.
// For a small project like this: Maintainability < Accessibility
// Actual long term solution: refactor all canvas code to SVGs.
// Not worth given the scale of this project.

type SkillPos = Record<SkillType, number>;
type ScreenSize = "sm" | "md";

const iconsStartY = 440,
  mdOffset = 500,
  smOffset = 450,
  yPos: Record<ScreenSize, SkillPos> = {
    // four one-long rows
    sm: {
      great: iconsStartY,
      good: iconsStartY + smOffset,
      mid: iconsStartY + smOffset * 2,
      tools: iconsStartY + smOffset * 3,
    },
    // two two-long rows
    md: {
      great: iconsStartY,
      good: iconsStartY + 100,
      mid: iconsStartY + mdOffset,
      tools: iconsStartY + mdOffset + 100,
    },
  };

// For a grid with given width and hexSize returns a function that:
// for a given position returns a `Skill` that should be placed there
// If a skill hex can't be placed, returns undefined
export function createSkillGetter(innerWidth: number, hexSize: number) {
  const screenSize: ScreenSize = innerWidth < 768 ? "sm" : "md",
    halfSkillsWidth = hexSize * 3,
    sectionWidth = Math.min(1080, innerWidth),
    leftCenter =
      sectionWidth * (screenSize === "sm" ? 0.5 : 0.25) + Math.max(0, (innerWidth - 1080) * 0.5),
    rightCenter =
      sectionWidth * (screenSize === "sm" ? 0.5 : 0.75) + Math.max(0, (innerWidth - 1080) * 0.5);

  let greatCount = 0,
    goodCount = 0,
    midCount = 0,
    toolsCount = 0;

  return function(x: number, y: number): SkillImg | undefined {
    const leftFit = x > leftCenter - halfSkillsWidth && x < leftCenter + halfSkillsWidth,
      rightFit = x > rightCenter - halfSkillsWidth && x < rightCenter + halfSkillsWidth;

    if (greatCount < skills.great.length && y > yPos[screenSize].great && leftFit) {
      return { ...skills.great[greatCount++], img: new Image() };
    } else if (goodCount < skills.good.length && y > yPos[screenSize].good && rightFit) {
      return { ...skills.good[goodCount++], img: new Image() };
    } else if (midCount < skills.mid.length && y > yPos[screenSize].mid && leftFit) {
      return { ...skills.mid[midCount++], img: new Image() };
    } else if (toolsCount < skills.tools.length && y > yPos[screenSize].tools && rightFit) {
      return { ...skills.tools[toolsCount++], img: new Image() };
    }
  };
}
