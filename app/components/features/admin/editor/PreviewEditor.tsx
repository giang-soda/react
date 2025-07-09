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
import { EditorContent } from '~/components/common/ckeditor/EditorContent';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface PreviewEditorProps {
  open: boolean;
  content: string;
  isHtml: boolean;
  setOpen: (open: boolean) => void;
}

export function PreviewEditor({ open, content, isHtml, setOpen }: PreviewEditorProps) {
  const { t } = useTranslation(['common']);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCopy = (content: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(content);
      toast.success(t('copy.success', { ns: 'common' }));
    } else {
      toast.error(t('copy.error', { ns: 'common' }));
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="m-0 w-[90%] p-6 sm:max-w-none lg:w-[60%]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="h-[calc(100vh-200px)] w-full overflow-y-auto rounded border p-4">
            {isHtml ? (
              <EditorContent content={content} />
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex justify-end">
                  <Button variant="action" onClick={() => handleCopy(content)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </div>
                <pre className="whitespace-pre-wrap">{content}</pre>
              </div>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button>{t('actions.close', { ns: 'common' })}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
