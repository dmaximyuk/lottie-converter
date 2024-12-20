export const LANG = (
  (localStorage.getItem("lang") || navigator.language || "en") as
    | string
    | undefined
)?.slice(0, 2);

export const themes = ["light", "dark"] as const;
export const THEME = (localStorage.getItem("theme") ||
  "light") as (typeof themes)[number];
