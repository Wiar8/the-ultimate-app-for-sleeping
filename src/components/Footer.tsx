import { Moon, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="flex flex-col gap-10 px-6 py-12 md:px-16 w-full ">
      {/* Divider */}
      <div className="w-full h-px bg-(--sc-border)" />

      {/* Main footer */}
      <div className="flex flex-col md:flex-row justify-between gap-10 w-full">
        {/* Left */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Moon className="w-5 h-5 text-(--sc-primary)" />
            <span className="font-['Playfair_Display'] text-lg font-semibold italic text-[#E8E6F0]">
              UAS
            </span>
          </div>
          <p className="text-sm text-(--sc-text-muted)">Sleep smarter. Wake refreshed.</p>
        </div>

        {/* Right */}
        <div className="flex gap-16">
          {/* Resources */}
          <div className="flex flex-col gap-3.5">
            <span className="text-xs font-semibold text-(--sc-text)">Resources</span>
            <a href="#science" className="text-xs text-(--sc-text-secondary) hover:text-(--sc-text) transition-colors">Sleep Science</a>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3.5">
            <span className="text-xs font-semibold text-(--sc-text)">Connect</span>
            <div className="flex items-center gap-4">
              <a href="https://github.com/Wiar8" target="_blank" rel="noopener noreferrer" className="text-(--sc-text-secondary) hover:text-(--sc-text) transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://x.com/wiar_8" target="_blank" rel="noopener noreferrer" className="text-(--sc-text-secondary) hover:text-(--sc-text) transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/wiar8/" target="_blank" rel="noopener noreferrer" className="text-(--sc-text-secondary) hover:text-(--sc-text) transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
               <a href="https://www.instagram.com/wiar_8/" target="_blank" rel="noopener noreferrer" className="text-(--sc-text-secondary) hover:text-(--sc-text) transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-5 border-t border-(--sc-border) w-full">
        <span className="text-xs text-(--sc-text-muted)">
          &copy; {new Date().getFullYear()} UAS. All rights reserved.
        </span>
        {/* <div className="flex gap-6">
          <a href="#" className="text-xs text-(--sc-text-muted) hover:text-(--sc-text-secondary) transition-colors">Terms</a>
          <a href="#" className="text-xs text-(--sc-text-muted) hover:text-(--sc-text-secondary) transition-colors">Privacy</a>
          <a href="#" className="text-xs text-(--sc-text-muted) hover:text-(--sc-text-secondary) transition-colors">Cookies</a>
        </div> */}
      </div>
    </footer>
  );
}
