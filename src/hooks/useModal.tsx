import { useSearchParams } from "react-router-dom";

import { ModalID } from "models";

export const useModal = () => {
  const key = "modal";
  const [urlParams, setUrlParams] = useSearchParams();

  return {
    activeModal: urlParams.get(key),
    openModal(modal: ModalID) {
      setUrlParams((s) => {
        s.set(key, modal);
        return s;
      });
    },
    closeModal() {
      setUrlParams(
        (s) => {
          s.delete(key);
          return s;
        },
        { replace: true },
      );
    },
  };
};
