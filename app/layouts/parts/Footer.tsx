import { SwitchTheme } from './SwitchTheme';

export function Footer() {
  return (
    <footer className="bg-muted/50 dark:bg-muted/70 border-border/50 dark:border-border/30 border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Soda.</p>
          <SwitchTheme />
        </div>
      </div>
    </footer>
  );
}
