import { LanguageModal, ThemeModal } from "modals";

import { ModalID } from "models";

const modals = [
  { key: ModalID.Language, component: <LanguageModal /> },
  { key: ModalID.Theme, component: <ThemeModal /> },
];

export { modals };
