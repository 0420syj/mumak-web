import { MainNav } from '@moomin-money/components/main-nav';
import { MobileNav } from '@moomin-money/components/mobile-nav';
import { ModeToggle } from '@moomin-money/components/mode-toggle';
import UserButton from './user-button';

export function Header(): React.ReactElement {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <nav className="flex items-center space-x-4">
            <UserButton />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
