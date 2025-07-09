import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';

interface ButtonReloadProps {
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  actionBeforeReload?: () => void;
  onReload?: () => void;
}

export function ButtonReload({
  isLoading = false,
  isError = false,
  error = null,
  actionBeforeReload,
  onReload,
}: ButtonReloadProps) {
  const { t } = useTranslation(['common']);

  const handleReload = () => {
    if (actionBeforeReload) {
      actionBeforeReload();
    }
    if (onReload) {
      onReload();
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleReload}
      disabled={isLoading}
      title={t('actions.reload', { ns: 'common' })}
    >
      <RotateCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
    </Button>
  );
} 