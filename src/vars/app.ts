export const LANG = (localStorage.getItem("lang") ||
  navigator.language ||
  navigator?.userLanguage ||
  "en") as string | undefined;
