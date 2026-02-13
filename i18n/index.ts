import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { loadLanguage } from "../utils/storage";

// namespaces
import en_home from "../locales/en/home.json";
import en_onboarding from "../locales/en/onboarding.json";
import shn_home from "../locales/shn/home.json";
import shn_onboarding from "../locales/shn/onboarding.json";

const resources = {
  en: {
    onboarding: en_onboarding,
    home: en_home,
  },
  shn: {
    onboarding: shn_onboarding,
    home: shn_home,
  },
};

const initI18n = async () => {
  const savedLang = await loadLanguage();

  await i18n.use(initReactI18next).init({
    resources,
    lng: savedLang || "shn",
    fallbackLng: "shn",
    ns: ["onboarding", "home"],
    defaultNS: "onboarding",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
