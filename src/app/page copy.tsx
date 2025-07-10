'use client';

import DocxPreviewEditor from '@/components/docx-preview-editor';
import dynamic from 'next/dynamic';

const ReactJsTipTapEditor = dynamic(() => import('../components/react-js-tiptap-editor'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export default function HomePage() {

  return (
      <main>
        <ReactJsTipTapEditor />
        <DocxPreviewEditor />
      </main>
  );
}
