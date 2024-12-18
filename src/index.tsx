import "./styles/main.sass";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TranslationProvider } from "i18nano";
import { RouterProvider } from "react-router-dom";
import { Provider as Store } from "react-redux";

import { LANG } from "vars";
import { router } from "routes";

import { store } from "store/store";

import { ru, en } from "translation";

const translations = {
  ru: async () => ru,
  en: async () => en,
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <Store store={store}>
      <TranslationProvider
        translations={translations}
        language={LANG?.includes("ru") ? "ru" : "en"}
      >
        <RouterProvider router={router} />
      </TranslationProvider>
    </Store>
  </StrictMode>,
);
