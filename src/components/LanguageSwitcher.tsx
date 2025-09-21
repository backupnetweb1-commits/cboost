import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type LangOption = {
  code: string;
  labelKey: string; // translation key
  flag: string; // emoji or image url
};

const languageOptions: LangOption[] = [
  { code: "en", labelKey: "english", flag: "🇬🇧" },
  { code: "de", labelKey: "german", flag: "🇩🇪" },
  { code: "es", labelKey: "spanish", flag: "🇪🇸" },
  { code: "fr", labelKey: "french", flag: "🇫🇷" },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const selected =
    languageOptions.find((opt) => opt.code === i18n.language) ||
    languageOptions[0];

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  const selectLanguage = (code: string) => {
    if (code !== i18n.language) i18n.changeLanguage(code);
    close();
  };

  // close on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative inline-block" ref={ref} >
      <button
        type="button"
        title="Select language"
        onClick={toggle}
        className="w-10 h-10 rounded-full bg-background border border-gray-300 shadow flex items-center justify-center hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
      >
        {/* circle content: flag or code */}
        <span className="text-xl">
          {selected.flag || selected.code.toUpperCase()}
        </span>
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-44 rounded-md bg-background shadow-lg border border-gray-200 z-50 py-1">
          {languageOptions.map((opt) => {
            const isSelected = opt.code === selected.code;
            return (
              <li
                key={opt.code}
                onClick={() => selectLanguage(opt.code)}
                className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-primary ${
                  isSelected ? "font-semibold" : "font-normal"
                }`}
              >
                <span className="text-xl">{opt.flag}</span>
                <span className="flex-1">{t(opt.labelKey)}</span>
                {isSelected && (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 010 1.4l-7.3 7.3a1 1 0 01-1.4 0L3.3 10.1a1 1 0 111.4-1.4l3.3 3.3 6.6-6.6a1 1 0 011.4 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
