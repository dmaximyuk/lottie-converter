import "./ModalProvider.sass";

import { FC } from "react";

import { useModal } from "hooks";
import { modals } from "routes";

const ModalProvider: FC = () => {
  const { activeModal, closeModal } = useModal();

  if (!activeModal) return null;

  return (
    <div className="ModalProvider" onClick={(e) => closeModal()}>
      {modals
        .filter((m) => m.key === activeModal)
        .map((m) => {
          return (
            <div
              key={m.key}
              className="ModalProvider__wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              {m.component}
            </div>
          );
        })}
    </div>
  );
};

export default ModalProvider;
