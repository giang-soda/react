import { Footer } from '~/layouts/parts/Footer';

export default function ErrorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary-foreground flex min-h-screen flex-col">
      <div className="mb-10 flex flex-1 items-center justify-center">{children}</div>

      <Footer />
    </div>
  );
}
