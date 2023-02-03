import { Background } from "../store/General"
import { cssTheme, theme } from "../theme"

const base = cssTheme.tokens.background.base

export const solid: Background<"solid"> = {
  type: "solid",
  base,
}

export const pattern: Background<"pattern"> = {
  type: "pattern",
  base,
  height: 40,
  width: 40,
  scale: 100,
  pathColor: theme.tokens.accent,
  opacity: 25,
  path: "M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z",
}

export const image: Background<"image"> = {
  type: "image",
  base,
  opacity: 25,
  src: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6f06eea6-9641-4058-a308-164a50ea58a2/dew21r5-e18660c2-7a89-446f-bf35-f8e6265e036e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZmMDZlZWE2LTk2NDEtNDA1OC1hMzA4LTE2NGE1MGVhNThhMlwvZGV3MjFyNS1lMTg2NjBjMi03YTg5LTQ0NmYtYmYzNS1mOGU2MjY1ZTAzNmUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.tjhpG5OGko52ohohZ9l1rv4f1tKiHggsT5im4_YlGaU",
  filter: "blur(2px)",
}

export const custom: Background<"custom"> = {
  type: "custom",
  base,
  css: `/* * * * * * * * * *
 * Example Styles  *
 * * * * * * * * * */

opacity: 0.5;
background-image: linear-gradient(
  0deg,
  hsl(50, 100%, 49%) 50%,
  hsl(214, 54%, 48%) 50%
);
`,
}
