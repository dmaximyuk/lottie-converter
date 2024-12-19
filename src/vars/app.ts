export const LANG = (
  (localStorage.getItem("lang") || navigator.language || "en") as
    | string
    | undefined
)?.slice(0, 2);

export const THEME = (localStorage.getItem("theme") || "light") as
  | "dark"
  | "light";
