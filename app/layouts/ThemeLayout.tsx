import { Links, Meta, Scripts, ScrollRestoration } from 'react-router';

export function meta() {
  return [
    { title: 'Soda' },
    { name: 'description', content: 'Soda Web App' },
  ]
}

export function ThemeLayout({ children }: { children: React.ReactNode }) {
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
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
