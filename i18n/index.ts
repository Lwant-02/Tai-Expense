import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { loadLanguage } from "../utils/storage";

// namespaces
import en_budget from "../locales/en/budget.json";
import en_common from "../locales/en/common.json";
import en_create from "../locales/en/create.json";
import en_getstarted from "../locales/en/getstarted.json";
import en_home from "../locales/en/home.json";
import en_notification from "../locales/en/notification.json";
import en_onboarding from "../locales/en/onboarding.json";
import en_settings from "../locales/en/settings.json";
import en_statistic from "../locales/en/statistic.json";
import shn_budget from "../locales/shn/budget.json";
import shn_common from "../locales/shn/common.json";
import shn_create from "../locales/shn/create.json";
import shn_getstarted from "../locales/shn/getstarted.json";
import shn_home from "../locales/shn/home.json";
import shn_notification from "../locales/shn/notification.json";
import shn_onboarding from "../locales/shn/onboarding.json";
import shn_settings from "../locales/shn/settings.json";
import shn_statistic from "../locales/shn/statistic.json";

const resources = {
  en: {
    onboarding: en_onboarding,
    home: en_home,
    getstarted: en_getstarted,
    statistic: en_statistic,
    create: en_create,
    budget: en_budget,
    settings: en_settings,
    notification: en_notification,
    common: en_common,
  },
  shn: {
    onboarding: shn_onboarding,
    home: shn_home,
    getstarted: shn_getstarted,
    statistic: shn_statistic,
    create: shn_create,
    budget: shn_budget,
    settings: shn_settings,
    notification: shn_notification,
    common: shn_common,
  },
};

const initI18n = async () => {
  const savedLang = await loadLanguage();

  await i18n.use(initReactI18next).init({
    resources,
    lng: savedLang || "shn",
    fallbackLng: "shn",
    ns: [
      "onboarding",
      "home",
      "getstarted",
      "statistic",
      "create",
      "budget",
      "settings",
      "notification",
      "common",
    ],
    defaultNS: "onboarding",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
