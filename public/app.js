const LANGUAGE_KEY = "gt-legal-language";
const THEME_KEY = "gt-legal-theme";

const translations = {
  ar: {
    documentTitle: "المستشار: اسلام خالد السهمودي | محامٍ ومستشار قانوني",
    metaDescription: "بطاقة تواصل رقمية احترافية — اتصال مباشر، واتساب، والوصول إلى الموقع.",
    skipLink: "انتقل إلى المحتوى",
    headerName: "المستشار: اسلام خالد السهمودي",
    honorific: "المستشار:",
    personName: "اسلام خالد السهمودي",
    role: "محامٍ ومستشار قانوني",
    eyebrow: "بطاقة تواصل قانونية رقمية",
    description: "وصول سريع إلى وسائل التواصل الأساسية — اتصال مباشر، واتساب، والوصول إلى المكتب عبر الخريطة.",
    callNow: "اتصل الآن",
    call: "اتصال",
    whatsapp: "واتساب",
    openLocation: "افتح الموقع",
    location: "الموقع",
    contactEyebrow: "بيانات التواصل",
    contactTitle: "تواصل مباشرة بالطريقة المناسبة لك",
    phoneLabel: "رقم الهاتف",
    addressOneLabel: "العنوان الأول",
    addressOne: "الأقصر — مدينة طيبة الجديدة — حي النزهة",
    addressTwoLabel: "العنوان الثاني",
    addressTwo: "قنا — مركز قوص — قرية جراجوس بجوار كوبري نقطة الشرطة",
    mapKicker: "الوصول للمكتب",
    mapTitle: "الموقع محدد مباشرة على خرائط Google",
    mapDescription: "اضغط على الزر لفتح الاتجاهات من موقعك الحالي.",
    viewMap: "عرض الموقع على الخريطة",
    copyright: "© 2026 المستشار اسلام خالد السهمودي",
    emblemAlt: "شعار العدالة للمستشار اسلام خالد السهمودي",
    languageGroup: "اختيار اللغة",
    themeGroup: "اختيار نمط الألوان",
    themeDay: "النمط النهاري",
    themeSunset: "نمط الغروب",
    themeNight: "النمط الليلي",
    installApp: "تثبيت",
    installAria: "تثبيت التطبيق على الجهاز",
    contactActions: "إجراءات التواصل",
    mobileDock: "إجراءات التواصل السريعة",
    callAria: "اتصل بالمستشار اسلام خالد السهمودي",
    whatsappAria: "تواصل عبر واتساب",
    mapsAria: "افتح الموقع على خرائط Google"
  },
  en: {
    documentTitle: "Counselor Islam Khaled Al-Sahmoudi | Lawyer & Legal Consultant",
    metaDescription: "A professional digital contact card — direct call, WhatsApp, and office location.",
    skipLink: "Skip to content",
    headerName: "Counselor: Islam Khaled Al-Sahmoudi",
    honorific: "Counselor:",
    personName: "Islam Khaled Al-Sahmoudi",
    role: "Lawyer & Legal Consultant",
    eyebrow: "Professional Legal Contact Card",
    description: "Quick access to essential contact options — direct call, WhatsApp, and office directions on the map.",
    callNow: "Call now",
    call: "Call",
    whatsapp: "WhatsApp",
    openLocation: "Open map",
    location: "Location",
    contactEyebrow: "Contact details",
    contactTitle: "Connect directly in the way that suits you",
    phoneLabel: "Phone number",
    addressOneLabel: "First office",
    addressOne: "Luxor — New Tiba City — Al-Nuzha District",
    addressTwoLabel: "Second office",
    addressTwo: "Qena — Qus — Garagos village, beside the Police Point Bridge",
    mapKicker: "Office directions",
    mapTitle: "The office is pinned directly on Google Maps",
    mapDescription: "Open directions from your current location in one tap.",
    viewMap: "View on Google Maps",
    copyright: "© 2026 Counselor Islam Khaled Al-Sahmoudi",
    emblemAlt: "Legal justice emblem for Counselor Islam Khaled Al-Sahmoudi",
    languageGroup: "Choose language",
    themeGroup: "Choose color theme",
    themeDay: "Day theme",
    themeSunset: "Sunset theme",
    themeNight: "Night theme",
    installApp: "Install",
    installAria: "Install the app on this device",
    contactActions: "Contact actions",
    mobileDock: "Quick contact actions",
    callAria: "Call Counselor Islam Khaled Al-Sahmoudi",
    whatsappAria: "Contact via WhatsApp",
    mapsAria: "Open the office on Google Maps"
  }
};

const languageButtons = [...document.querySelectorAll("[data-language-value]")];
const themeButtons = [...document.querySelectorAll("[data-theme-value]")];
const installButton = document.querySelector("[data-install-app]");
let deferredInstallPrompt = null;

function readPreference(key, allowed, fallback) {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function setLanguage(language, persist = true) {
  const nextLanguage = language === "en" ? "en" : "ar";
  const copy = translations[nextLanguage];
  const root = document.documentElement;

  root.lang = nextLanguage;
  root.dir = nextLanguage === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[key]) element.textContent = copy[key];
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (copy[key]) element.setAttribute("aria-label", copy[key]);
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.dataset.i18nAlt;
    if (copy[key]) element.setAttribute("alt", copy[key]);
  });

  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.languageValue === nextLanguage));
  });

  document.title = copy.documentTitle;
  document.querySelector('meta[name="description"]')?.setAttribute("content", copy.metaDescription);
  const activeTheme = document.documentElement.dataset.theme;
  const activeThemeColor = activeTheme === "day" ? "#eaf1f8" : activeTheme === "sunset" ? "#100906" : "#050a12";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", activeThemeColor);

  if (persist) {
    try {
      localStorage.setItem(LANGUAGE_KEY, nextLanguage);
    } catch {}
  }
}

function setTheme(theme, persist = true) {
  const nextTheme = ["day", "sunset", "night"].includes(theme) ? theme : "night";
  document.documentElement.dataset.theme = nextTheme;
  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeValue === nextTheme));
  });

  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    nextTheme === "day" ? "#eaf1f8" : nextTheme === "sunset" ? "#100906" : "#050a12"
  );

  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, nextTheme);
    } catch {}
  }
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.languageValue));
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.themeValue));
});

function setInstallAvailability(isAvailable) {
  if (!installButton) return;
  installButton.classList.toggle("is-available", isAvailable);
  installButton.disabled = !isAvailable;
  installButton.setAttribute("aria-hidden", String(!isAvailable));
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  setInstallAvailability(true);
});

installButton?.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;

  const prompt = deferredInstallPrompt;
  deferredInstallPrompt = null;
  setInstallAvailability(false);
  await prompt.prompt();
  await prompt.userChoice;
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  setInstallAvailability(false);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => {});
  });
}

setTheme(readPreference(THEME_KEY, ["day", "sunset", "night"], "night"), false);
setLanguage(readPreference(LANGUAGE_KEY, ["ar", "en"], "ar"), false);
