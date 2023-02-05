import { WidgetConfig } from "~/store/WidgetStore"
import { cssTheme } from "~/theme"

export const getDefaultTiles = (gridSize: number): WidgetConfig[] => {
  const sharedProps: Partial<WidgetConfig> = {
    minHeight: gridSize * 4,
    minWidth: gridSize * 4,
  }

  const defaultRect = {
    height: gridSize * 4,
    width: gridSize * 4,
    x: 0,
    y: 0,
  }

  return [
    {
      id: "1",
      orientation: { horizontal: "left", vertical: "top" },
      rect: defaultRect,
      ...sharedProps,
      customCss: `
        --tokens-accent: ${cssTheme.color.red};
      `,
    },
    {
      id: "2",
      orientation: { horizontal: "center", vertical: "top" },
      rect: { ...defaultRect, x: gridSize * -2 },
      ...sharedProps,
      customCss: `
        --tokens-accent: ${cssTheme.color.flamingo};
      `,
    },
    {
      id: "3",
      orientation: { horizontal: "right", vertical: "top" },
      rect: defaultRect,
      ...sharedProps,
      customCss: `
        --tokens-accent: ${cssTheme.color.yellow};
      `,
    },

    {
      id: "4",
      orientation: { horizontal: "left", vertical: "center" },
      rect: { ...defaultRect, y: gridSize * -2 },
      ...sharedProps,
    },
    {
      id: "5",
      orientation: { horizontal: "center", vertical: "center" },
      rect: { ...defaultRect, x: gridSize * -2, y: gridSize * -2 },
      ...sharedProps,
    },
    {
      id: "6",
      orientation: { horizontal: "right", vertical: "center" },
      rect: { ...defaultRect, y: gridSize * -2 },
      ...sharedProps,
    },

    {
      id: "7",
      orientation: { horizontal: "left", vertical: "bottom" },
      rect: defaultRect,
      ...sharedProps,
    },
    {
      id: "8",
      orientation: { horizontal: "center", vertical: "bottom" },
      rect: { ...defaultRect, x: gridSize * -2 },
      ...sharedProps,
    },
    {
      id: "9",
      orientation: { horizontal: "right", vertical: "bottom" },
      rect: defaultRect,
      ...sharedProps,
    },
  ]
}
