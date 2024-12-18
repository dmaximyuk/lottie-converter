export const LANG = (localStorage.getItem("lang") ||
  navigator.language ||
  "en") as string | undefined;
