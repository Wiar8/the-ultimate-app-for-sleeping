import { Moon } from 'lucide-react';
import { useI18n } from '../i18n';
import { LanguageToggle } from './LanguageToggle';

export function Header() {
  const { t } = useI18n();

  return (
    <header className="flex items-center justify-between px-6 py-5 md:px-16 w-full">
      <div className="flex items-center gap-2.5">
        <Moon className="w-6 h-6 text-(--sc-primary)" />
        <span className="font-['Playfair_Display'] text-xl font-semibold italic text-(--sc-text)">
          {t.app.title}
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-8">
        <a href="#science" className="text-sm text-(--sc-text-secondary) hover:text-(--sc-text) transition-colors">
          {t.app.sleepScience}
        </a>
      </nav>
      <LanguageToggle />
    </header>
  );
}
