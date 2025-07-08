import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { ScanEye } from 'lucide-react';
import { PreviewEditor } from './PreviewEditor';
import { SDckeditor } from '~/components/common/ckeditor/SDckeditor';
import { ClassicEditor } from 'ckeditor5';

export default function CKeditor() {
  const [editorInstance, setEditorInstance] = useState<ClassicEditor | null>(null);
  const [open, setOpen] = useState(false);

  const handlePreview = () => {
    if (!editorInstance) return;
    setOpen(true);
  };

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
