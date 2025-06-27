import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useApiMutation } from '~/hooks/use-api';
import { toast } from 'sonner';
import { ACTION } from '~/constans';
import { useQueryRefreshKey } from '~/hooks/use-query';
import type { QueryKey } from '@tanstack/react-query';

interface DeleteModal {
  url?: string; // url call api delete
  open: boolean;
  title?: string;
  messageError?: string;
  messageSuccess?: string;
  setOpen: (open: boolean) => void;
  refreshQuerykey?: QueryKey;
  redirect?: string; // redirect to url after delete success
  children?: React.ReactNode;
}

export function DeleteModal({
  url,
  open,
  setOpen,
  title,
  messageError,
  messageSuccess,
  children,
  refreshQuerykey,
  redirect,
}: DeleteModal) {
  const { t } = useTranslation(['common']);
  const queryRefreshKey = useQueryRefreshKey();

  const api = useApiMutation(
    {
      method: 'delete',
      url: url,
    },
    {
      message: {
        default: messageError || t('delete.error', { ns: 'common' }),
      },
      onSuccess: () => {
        toast.success(messageSuccess || t('delete.success', { ns: 'common' }));
        setOpen(false);
        queryRefreshKey.call(refreshQuerykey);
      },
      redirect: redirect,
    }
  );

  const handleDelete = () => {
    api.mutation.mutate(null);
  };

  if (!url || !open) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title || t('delete.title', { ns: 'common' })}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div>{children}</div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" icon={ACTION.CANCEL}>
              {t('actions.cancel', { ns: 'common' })}
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            onClick={handleDelete}
            icon={ACTION.DELETE}
            loading={api.mutation.isPending}
          >
            {t('actions.delete', { ns: 'common' })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
