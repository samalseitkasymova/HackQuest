export type Lang = "ru" | "kz" | "en";

export const translations = {
  ru: {
    profile: "Профиль",
    accountProgress: "Аккаунт и учебный прогресс",
    editProfile: "Редактировать профиль",
    language: "Язык",
    role: "Роль",
    points: "Общие очки",
    level: "Уровень",
    rank: "Ранг",
    progress: "Прогресс",
  },
  kz: {
    profile: "Профиль",
    accountProgress: "Аккаунт және оқу прогресі",
    editProfile: "Профильді өзгерту",
    language: "Тіл",
    role: "Рөлі",
    points: "Жалпы ұпай",
    level: "Деңгей",
    rank: "Дәреже",
    progress: "Прогресс",
  },
  en: {
    profile: "Profile",
    accountProgress: "Account and learning progress",
    editProfile: "Edit Profile",
    language: "Language",
    role: "Role",
    points: "Total Points",
    level: "Level",
    rank: "Rank",
    progress: "Progress",
  },
};

export function getLang(): Lang {
  return (localStorage.getItem("hq_lang") as Lang) || "ru";
}

export function setLang(lang: Lang) {
  localStorage.setItem("hq_lang", lang);
  window.dispatchEvent(new Event("languageChanged"));
}

export function t(key: keyof typeof translations.ru) {
  return translations[getLang()][key];
}