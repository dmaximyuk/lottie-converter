import "./TranslationChange.sass";

import { type FC } from "react";
import { useTranslationChange } from "i18nano";

const TranslationChange: FC = () => {
  const translation = useTranslationChange();

  return (
    <select
      className="TranslationChange"
      value={translation.lang}
      onChange={(event) => {
        localStorage.setItem("lang", event.target.value);
        window.location.reload();
      }}
    >
      {translation.all.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};

export default TranslationChange;
