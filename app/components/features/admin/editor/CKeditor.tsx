import { useEffect, useRef, useState } from 'react';
import { Button } from '~/components/ui/button';
import { ScanEye } from 'lucide-react';
import { PreviewEditor } from './PreviewEditor';
import { useTranslation } from 'react-i18next';
import { Loading } from '~/components/common';

interface EditorRef {
  SDckeditor: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function CKeditor() {
  const { t } = useTranslation('common');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editorInstance, setEditorInstance] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const editorRef = useRef<EditorRef | null>(null);
  const { SDckeditor } = editorRef.current || {};

  useEffect(() => {
    // only import when client
    Promise.all([
      import('~/components/common/ckeditor/SDckeditor')
    ]).then(([{ SDckeditor }]) => {
      editorRef.current = {
        SDckeditor
      };
      // signal that editor is ready to render
      setIsClient(true);
    }).catch(error => {
      console.error("Error loading CKEditor modules", error);
    });
  }, []);


  const handlePreview = () => {
    if (!editorInstance) return;
    setOpen(true);
  };

  if (!isClient) {
    return <Loading />;
  }

  return (
    <div>
      <SDckeditor setEditorInstance={setEditorInstance} />

      <div className="mt-4">
        <Button onClick={handlePreview}>
          <ScanEye className="mr-2 h-4 w-4" />
          Preview
        </Button>
      </div>

      <PreviewEditor open={open} dataHmlt={editorInstance?.getData() || ''} setOpen={setOpen} />
    </div>
  );
}
