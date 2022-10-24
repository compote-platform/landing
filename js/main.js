const defaultLocale = "en";
const supportedLocales = ["en", "ua"];

let locale;
let translations = {};

document.addEventListener("DOMContentLoaded", () => {
	let initialLocale = supportedOrDefault(browserLocales(true));

	if (getCookie('website_language')) {
		initialLocale = getCookie('website_language');
	}
	setLocale(initialLocale);
	bindLocaleSwitcher(initialLocale);
});

async function setLocale(newLocale) {
	if (newLocale === locale) return;

	const newTranslations = await fetchTranslationsFor(newLocale);

	locale = newLocale;
	translations = newTranslations;
	translatePage();
	setCookie('website_language', newLocale, 7);
}

async function fetchTranslationsFor(newLocale) {
	const response = await fetch(`/i18n/${newLocale}.json`);

	return await response.json();
}

function bindLocaleSwitcher(initialValue) {
	const switcher = document.querySelector("[data-i18n-switcher]");
	switcher.value = initialValue;
	switcher.onchange = (e) => {
		setLocale(e.target.value);
	};
}

function translatePage() {
	document.querySelectorAll("[data-i18n-key]").forEach(translateElement);
	document.querySelectorAll("[data-i18n-placeholder]").forEach(translatePlaceholder);
	document.querySelectorAll("[data-i18n-value]").forEach(translateValue);
}

function translateElement(element) {
	const key = element.getAttribute("data-i18n-key");
	const translation = translations[key];

	if (translation) {
		element.innerHTML = translation;
	}
}

function translatePlaceholder(element) {
	const key = element.getAttribute("data-i18n-placeholder");
	const translation = translations[key];

	if (translation) {
		element.placeholder = translation;
	}
}

function translateValue(element) {
	const key = element.getAttribute("data-i18n-placeholder");
	const translation = translations[key];

	if (translation) {
		element.value = translation;
	}
}

/**
 * Retrieve user-preferred locales from the browser
 *
 * @param {boolean} languageCodeOnly - when true, returns
 * ["en", "fr"] instead of ["en-US", "fr-FR"]
 * @returns array | undefined
 */
function browserLocales(languageCodeOnly = false) {
	return navigator.languages.map((locale) =>
		languageCodeOnly ? locale.split("-")[0] : locale,
	);
}

function isSupported(locale) {
	return supportedLocales.indexOf(locale) > -1;
}

// Retrieve the first locale we support from the given
// array, or return our default locale
function supportedOrDefault(locales) {
	return locales.find(isSupported) || defaultLocale;
}

function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

