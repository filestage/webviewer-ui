import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../../i18n/translation-en.json";
import de from "../../i18n/translation-de.json";
import fr from "../../i18n/translation-fr.json";

export default () => {
  const callback = (err, t) => {
    window.Annotations.Utilities.setAnnotationSubjectHandler((type) =>
      t(`annotation.${type}`)
    );

    window.Tools.SignatureCreateTool.setTextHandler(() =>
      t("message.signHere")
    );

    window.Tools.FreeTextCreateTool.setTextHandler(() =>
      t("message.insertTextHere")
    );

    window.Tools.CalloutCreateTool.setTextHandler(() =>
      t('message.insertTextHere'),
    );
  };

  i18next.use(initReactI18next).init(
    {
      resources: {
        en: { translation: en },
        de: { translation: de },
        fr: { translation: fr },
      },
      fallbackLng: "en",
      react: {
        useSuspense: false,
        wait: true,
      },
    },
    callback
  );
};
