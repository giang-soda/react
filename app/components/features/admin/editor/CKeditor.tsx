import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Download, ScanEye } from 'lucide-react';
import { PreviewEditor } from './PreviewEditor';
import { SDckeditor } from '~/components/common/ckeditor/SDckeditor';
import { ClassicEditor } from 'ckeditor5';
import { Input } from '~/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ckeditorSchema, type CKeditorFormData } from './ckeditor-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { useTranslation } from 'react-i18next';
import slugify from 'slugify';

export default function CKeditor() {
  const [editorInstance, setEditorInstance] = useState<ClassicEditor | null>(null);
  const [open, setOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<string>('');
  const [isHtml, setIsHtml] = useState(true);
  const { t } = useTranslation(['validate', 'users']);
  const [slugUrl, setSlugUrl] = useState('slug-url');

  // React Hook Form setup
  const form = useForm<CKeditorFormData>({
    resolver: zodResolver(ckeditorSchema(t)),
    defaultValues: {
      title: '',
      thumbnail: ''
    }
  });

  const handlePreview = (isHtml: boolean) => {
    if (!editorInstance) return;
    
    if (isHtml) {
      setPreviewContent(editorInstance.getData());
      setIsHtml(isHtml);
      setOpen(true);

      return;
    }

    // Validate form before preview
    form.handleSubmit((data) => {
      setPreviewContent(
        JSON.stringify(
          {
            title: data.title,
            thumbnail: data.thumbnail,
            content: editorInstance.getData(),
          },
          null,
          2
        )
      );
      setIsHtml(isHtml);
      setOpen(true);
    })();
  };

  const downloadJson = () => {
    if (!editorInstance) return;
    const content = editorInstance.getData();
    const json = { content };
    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'editor.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTitleChange = (title: string) => {
    setSlugUrl(slugify(title, { lower: true, strict: true }));
  };

  return (
    <div>
      <div className="mb-4">
        <Form {...form}>
          <form className="grid gap-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('editor.title', { ns: 'users' })}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleTitleChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Slug URL</FormLabel>
              <FormControl>
                <Input value={slugUrl} disabled/>
              </FormControl>
            </FormItem>
            
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('editor.thumbnail', { ns: 'users' })}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/image.jpg" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <div className="max-h-[500px] overflow-y-auto">
        <SDckeditor setEditorInstance={setEditorInstance} />
      </div>

      <div className="mt-4 flex gap-2">
        <Button onClick={() => handlePreview(true)}>
          <ScanEye className="mr-2 h-4 w-4" />
          {t('editor.preview', { ns: 'users' })}
        </Button>

        <Button onClick={downloadJson} variant="action">
          <Download className="mr-2 h-4 w-4" />
          {t('editor.download', { ns: 'users' })}
        </Button>

        <Button onClick={() => handlePreview(false)} variant="action">
          <ScanEye className="mr-2 h-4 w-4" />
          {t('editor.view_source_json', { ns: 'users' })}
        </Button>
      </div>

      <PreviewEditor open={open} content={previewContent} isHtml={isHtml} setOpen={setOpen} />
    </div>
  );
}
