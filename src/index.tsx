import "./styles/main.sass";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TranslationProvider } from "i18nano";
import { RouterProvider } from "react-router-dom";
import { Provider as Store } from "react-redux";

import { store } from "store/store";

import { router } from "routes";

import { ru } from "translation";

const translations = {
  ru: async () => ru,
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <Store store={store}>
      <TranslationProvider translations={translations} language="ru">
        <RouterProvider router={router} />
      </TranslationProvider>
    </Store>
  </StrictMode>,
);
