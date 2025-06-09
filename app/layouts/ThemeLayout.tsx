import { useTheme } from '../context/ThemeContext';
import { Links, Meta, Scripts, ScrollRestoration } from 'react-router';

export function ThemeLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <main className="flex-grow">{children}</main>
          <footer className="bg-muted/50 dark:bg-muted/70 border-border/50 dark:border-border/30 border-t">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Soda.</p>
                <div className="flex gap-4">
                  <button
                    onClick={toggleTheme}
                    className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 dark:hover:text-accent-foreground rounded-md px-4 py-2 text-sm font-medium transition-colors"
                  >
                    {theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
