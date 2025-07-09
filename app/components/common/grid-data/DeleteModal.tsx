import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { Loading } from '..';

interface DeleteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onDelete: () => Promise<void>;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function DeleteModal({
  open,
  setOpen,
  onDelete,
  title,
  description,
  children,
}: DeleteModalProps) {
  const { t } = useTranslation(['common']);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
      setOpen(false);
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || t('delete.title', { ns: 'common' })}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description || t('delete.description', { ns: 'common' })}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {children && <div className="py-4">{children}</div>}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            {t('actions.cancel', { ns: 'common' })}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <Loading />
                {t('actions.deleting', { ns: 'common' })}
              </div>
            ) : (
              t('actions.delete', { ns: 'common' })
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 