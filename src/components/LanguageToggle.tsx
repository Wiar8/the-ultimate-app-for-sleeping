import { useI18n } from '../i18n';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { lang, toggleLang } = useI18n();

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-(--sc-surface) border border-(--sc-border) text-sm text-(--sc-text-secondary) hover:text-(--sc-text) hover:border-(--sc-primary) transition-all cursor-pointer"
      aria-label={`Switch to ${lang === 'en' ? 'Spanish' : 'English'}`}
    >
      <Globe className="w-4 h-4 text-(--sc-primary)" />
      <span className="font-medium uppercase">{lang}</span>
    </button>
  );
}
