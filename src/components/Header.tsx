import { Moon } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5 md:px-16 w-full">
      <div className="flex items-center gap-2.5">
        <Moon className="w-6 h-6 text-(--sc-primary)" />
        <span className="font-['Playfair_Display'] text-xl font-semibold italic text-(--sc-text)">
          UAS
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-8">
        <a href="#science" className="text-sm text-(--sc-text-secondary) hover:text-(--sc-text) transition-colors">
          Sleep Science
        </a>
       
      </nav>
    </header>
  );
}
