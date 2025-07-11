export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-2 md:px-4 lg:px-0 space-y-8">
      {children}
    </div>
  );
}