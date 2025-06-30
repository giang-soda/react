import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import ckeditorCss from 'ckeditor5/ckeditor5.css?url';

interface PreviewEditorProps {
  open: boolean;
  dataHmlt: string;
  setOpen: (open: boolean) => void;
}

export function PreviewEditor({ open, dataHmlt, setOpen }: PreviewEditorProps) {
  const { t } = useTranslation(['common']);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="m-0 w-[90%] p-6 sm:max-w-none lg:w-[60%]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <iframe
            srcDoc={`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <title>Preview</title>
                <link rel="stylesheet" href="${ckeditorCss}">
              </head>
              <body style="margin: 0; padding: 1rem;">
                <div class="ck ck-content">
                  ${dataHmlt}
                </div>
              </body>
            </html>
          `}
            className="h-[calc(100vh-200px)] w-full rounded border"
            title="Preview"
            sandbox="allow-same-origin"
          ></iframe>

          <DialogFooter>
            <DialogClose asChild className="mt-6">
              <Button>{t('actions.cancel', { ns: 'common' })}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
