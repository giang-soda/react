import { Loader2 } from 'lucide-react';

export function Loading({ message }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin" />

        {message && <span className="text-muted-foreground">{message}</span>}
      </div>
    </div>
  );
}
