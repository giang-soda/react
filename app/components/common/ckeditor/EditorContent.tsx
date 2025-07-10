import { useEffect, useRef } from 'react';
import ckeditorCss from 'ckeditor5/ckeditor5.css?url';

interface EditorContentProps {  
  content: string;
}

export function EditorContent({ content }: EditorContentProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<ShadowRoot | null>(null);

  useEffect(() => {
    if (!hostRef.current || shadowRef.current) return;

    // Shadow Root
    shadowRef.current = hostRef.current.attachShadow({ mode: 'open' });
    // shadowRef.current = shadow;

    // Container for content
    const container = document.createElement('div');
    container.className = 'ck-content';
    container.innerHTML = content;
    shadowRef.current.appendChild(container);

    // Add CSS to Shadow Root
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = ckeditorCss;
    shadowRef.current.appendChild(link);
  }, [content]);

  return <div ref={hostRef} id="content-host" />;
}
