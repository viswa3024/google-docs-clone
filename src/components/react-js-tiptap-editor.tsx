'use client';

import React, { useCallback, useRef, useState } from 'react';
import RichTextEditor, { BaseKit } from 'reactjs-tiptap-editor';
import * as mammoth from 'mammoth';
import { renderAsync } from 'docx-preview'

import { locale } from 'reactjs-tiptap-editor/locale-bundle'
import {
  BubbleMenuTwitter,
  BubbleMenuKatex,
  BubbleMenuExcalidraw,
  BubbleMenuMermaid,
  BubbleMenuDrawer
} from 'reactjs-tiptap-editor/bubble-extra';


import { Attachment } from 'reactjs-tiptap-editor/attachment';
import { Blockquote } from 'reactjs-tiptap-editor/blockquote';
import { Bold } from 'reactjs-tiptap-editor/bold';
import { BulletList } from 'reactjs-tiptap-editor/bulletlist';
import { Clear } from 'reactjs-tiptap-editor/clear';
import { Code } from 'reactjs-tiptap-editor/code';
//import { CodeBlock } from 'reactjs-tiptap-editor/codeblock';
import { Color } from 'reactjs-tiptap-editor/color';
import { ColumnActionButton } from 'reactjs-tiptap-editor/multicolumn';
import { Emoji } from 'reactjs-tiptap-editor/emoji';
import { ExportPdf } from 'reactjs-tiptap-editor/exportpdf';
import { ExportWord } from 'reactjs-tiptap-editor/exportword';
import { FontFamily } from 'reactjs-tiptap-editor/fontfamily';
import { FontSize } from 'reactjs-tiptap-editor/fontsize';
import { FormatPainter } from 'reactjs-tiptap-editor/formatpainter';
import { Heading } from 'reactjs-tiptap-editor/heading';
import { Highlight } from 'reactjs-tiptap-editor/highlight';
import { History } from 'reactjs-tiptap-editor/history';
import { HorizontalRule } from 'reactjs-tiptap-editor/horizontalrule';
import { Iframe } from 'reactjs-tiptap-editor/iframe';
import { Image } from 'reactjs-tiptap-editor/image';
//import { ImageGif } from 'reactjs-tiptap-editor/imagegif';
import { ImportWord } from 'reactjs-tiptap-editor/importword';
import { Indent } from 'reactjs-tiptap-editor/indent';
import { Italic } from 'reactjs-tiptap-editor/italic';
import { LineHeight } from 'reactjs-tiptap-editor/lineheight';
import { Link } from 'reactjs-tiptap-editor/link';
import { Mention } from 'reactjs-tiptap-editor/mention';
import { MoreMark } from 'reactjs-tiptap-editor/moremark';
import { OrderedList } from 'reactjs-tiptap-editor/orderedlist';
import { SearchAndReplace } from 'reactjs-tiptap-editor/searchandreplace';
import { SlashCommand } from 'reactjs-tiptap-editor/slashcommand';
import { Strike } from 'reactjs-tiptap-editor/strike';
import { Table } from 'reactjs-tiptap-editor/table';
import { TableOfContents } from 'reactjs-tiptap-editor/tableofcontent';
import { TaskList } from 'reactjs-tiptap-editor/tasklist';
import { TextAlign } from 'reactjs-tiptap-editor/textalign';
import { TextUnderline } from 'reactjs-tiptap-editor/textunderline';
import { Video } from 'reactjs-tiptap-editor/video';
import { TextDirection } from 'reactjs-tiptap-editor/textdirection';
import { Katex } from 'reactjs-tiptap-editor/katex';
import { Drawer } from 'reactjs-tiptap-editor/drawer';
import { Excalidraw } from 'reactjs-tiptap-editor/excalidraw';
import { Twitter } from 'reactjs-tiptap-editor/twitter';
import { Mermaid } from 'reactjs-tiptap-editor/mermaid';

// For version < 0.1.17:
// import { BaseKit } from 'reactjs-tiptap-editor/extension-bundle';

import 'reactjs-tiptap-editor/style.css';

// For syntax highlighting in code blocks
import 'prism-code-editor-lightweight/layout.css'
import 'prism-code-editor-lightweight/themes/github-dark.css'

// For mathematical formulas
import 'katex/dist/katex.min.css'

// For drawing functionality
import 'easydrawer/styles.css'

// For Excalidraw integration
import '@excalidraw/excalidraw/index.css'

const docxURL = 'https://calibre-ebook.com/downloads/demos/demo.docx';

const loadDocxFromNetwork = async () => {

  console.log('loadDocxFromNetwork');
  try {
    const response = await fetch('/api/docx');

    console.log('response', response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const result = [
    {
      src: objectUrl,        // required
      alt: 'demo.docx',      // optional
    },
  ]

  console.log('✅ Upload return value:', result);
  return result;
  } catch (error) {
    console.error('❌ Failed to fetch .docx from URL:', error);
    return [];
  }
};

function convertBase64ToBlob(base64: string) {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

// const extensions = [
//     BaseKit.configure({
//       placeholder: {
//         showOnlyCurrent: true,
//       },
//       characterCount: {
//         limit: 50000,
//       },
//     }),
//     History,
//   Heading,
//   Bold,
//   Italic,
//   BulletList,
//   OrderedList,
//   Link,
//   Image.configure({
//     upload: (file: File) => {
//       return new Promise((resolve) => {
//         // Your upload logic here
//         resolve(URL.createObjectURL(file))
//       })
//     },
//   })
//   ];

const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  History,
  SearchAndReplace,
  TableOfContents,
  FormatPainter.configure({ spacer: true }),
  Clear,
  FontFamily,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  TextUnderline,
  Strike,
  MoreMark,
  Emoji,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
  Indent,
  LineHeight,
  TaskList.configure({
    spacer: true,
    taskItem: {
      nested: true,
    },
  }),
  Link,
  Image.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files))
        }, 500)
      })
    },
  }),
  Video.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files))
        }, 500)
      })
    },
  }),
  // ImageGif.configure({
  //   GIPHY_API_KEY: import.meta.env.VITE_GIPHY_API_KEY as string,
  // }),
  Blockquote,
  SlashCommand,
  HorizontalRule,
  Code.configure({
    toolbar: false,
  }),
  //CodeBlock,
  ColumnActionButton,
  Table,
  Iframe,
  ExportPdf.configure({ spacer: true }),
  ImportWord.configure({
  upload: (files: File[]) => {
      const f = files.map(file => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }))
      return Promise.resolve(f)
    }, 
  }),
  ExportWord,
  TextDirection,
  Mention,
  Attachment.configure({
    upload: (file: any) => {
      // fake upload return base 64
      const reader = new FileReader()
      reader.readAsDataURL(file)

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string)
          resolve(URL.createObjectURL(blob))
        }, 300)
      })
    },
  }),

  Katex,
  Excalidraw,
  Mermaid.configure({
    upload: (file: any) => {
      // fake upload return base 64
      const reader = new FileReader()
      reader.readAsDataURL(file)

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string)
          resolve(URL.createObjectURL(blob))
        }, 300)
      })
    },
  }),
  Drawer.configure({
    upload: (file: any) => {
      // fake upload return base 64
      const reader = new FileReader()
      reader.readAsDataURL(file)

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string)
          resolve(URL.createObjectURL(blob))
        }, 300)
      })
    },
  }),
  Twitter,
]

const DEFAULT = `<div>Test</div>`

function debounce(func: any, wait: number) {
  let timeout: NodeJS.Timeout
  return function (...args: any[]) {
    clearTimeout(timeout)
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}


export default function ReactJsTipTapEditor() {

  const [content, setContent] = useState(DEFAULT)
  const [isLoading, setIsLoading] = useState(false);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [theme, setTheme] = useState('light')
  const [disable, setDisable] = useState(false)
  const [error, setError] = useState('');
  const viewerRef = useRef<HTMLDivElement>(null);

  const onValueChange = useCallback(
    debounce((value: any) => {
      setContent(value)
    }, 300),
    [],
  )

//  const loadDocx = async () => {
//     const res = await fetch('/api/docx');
//     const blob = await res.blob();
//     const arrayBuffer = await blob.arrayBuffer();

//     const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

//     const wrapped = `<div>${html}</div>`;

//     setContent(wrapped); // ✅ Injects content into controlled editor
//   };


const loadDocxMammoth = async () => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/docx');
      const blob = await res.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

      setContent(`<div>${html}</div>`);
      setIsEditorVisible(true);
    } catch (err) {
      console.error('❌ Failed to load DOCX:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDocx = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/docx');
      if (!res.ok) throw new Error('DOCX fetch failed');

      const blob = await res.blob();
      const arrayBuffer = await blob.arrayBuffer();

       if (!viewerRef.current) {
        setError('Viewer container not ready');
        return;
      }

      // Clear previous content
      viewerRef.current.innerHTML = '';

      // Render DOCX into hidden container
      await renderAsync(arrayBuffer, viewerRef.current).catch(() => {
        setError('An error occurred rendering the document');
      });

      const html = viewerRef.current.innerHTML;

      const fullHTML = `
      <html>
        <head>
          <title>Imported DOCX</title>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

      // console.log("html: ", html)
      // console.log("wrapped: ", fullHTML)

      // Set into Tiptap editor
      setContent(fullHTML);
      setIsEditorVisible(true);
    } catch (err) {
      console.error('❌ DOCX render failed:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (<>
  
  <div className="p-6 max-w-4xl mx-auto">

      <button onClick={loadDocx} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
        Load Remote DOCX
      </button>


      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

     {isEditorVisible && !isLoading && ( 
      <div
        className="p-[24px] flex flex-col w-full max-w-screen-lg gap-[24px] mx-[auto] my-0"
        style={{
          maxWidth: 1024,
          margin: '20px auto',
        }}
     > 
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginTop: '10px',
          marginBottom: 5,
        }}
      >
        <button type="button" className="cursor-pointer" onClick={() => locale.setLang('vi')}>Vietnamese</button>
        <button type="button" className="cursor-pointer" onClick={() => locale.setLang('en')}>English</button>
        {/* <button type="button" className="cursor-pointer" onClick={() => locale.setLang('zh_CN')}>Chinese</button>
        <button type="button" className="cursor-pointer" onClick={() => locale.setLang('pt_BR')}>Português</button>
        <button type="button" className="cursor-pointer" onClick={() => locale.setLang('hu_HU')}>Hungarian</button> */}
        <button type="button" className="cursor-pointer" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <button type="button" className="cursor-pointer" onClick={() => setDisable(!disable)}>{disable ? 'Editable' : 'Readonly'}</button>
      </div>
        <RichTextEditor
          output="html"
          content={content as any}
          onChangeContent={onValueChange}
          extensions={extensions}
          dark={theme === 'dark'}
          disabled={disable}
          bubbleMenu={{
            render({ extensionsNames, editor, disabled }, bubbleDefaultDom) {
              return <>
                {bubbleDefaultDom}

                {extensionsNames.includes('twitter') ? <BubbleMenuTwitter disabled={disabled}
                  editor={editor}
                  key="twitter"
                /> : null}
                {extensionsNames.includes('katex')  ? <BubbleMenuKatex disabled={disabled}
                  editor={editor}
                  key="katex"
                /> : null}
                {extensionsNames.includes('excalidraw')  ? <BubbleMenuExcalidraw disabled={disabled}
                  editor={editor}
                  key="excalidraw"
                /> : null}
                {extensionsNames.includes('mermaid')  ? <BubbleMenuMermaid disabled={disabled}
                  editor={editor}
                  key="mermaid"
                /> : null}
                {extensionsNames.includes('drawer')  ? <BubbleMenuDrawer disabled={disabled}
                  editor={editor}
                  key="drawer"
                /> : null}
              </>
            },
          }}
        />

      {typeof content === 'string' && (
        <textarea
          style={{
            marginTop: 20,
            height: 500,
          }}
          readOnly
          value={content}
        />
      )}

      {/*<h2 className="mt-6 font-semibold">Output:</h2>
      <pre className="p-2 bg-gray-100 mt-2 overflow-x-auto">{content}</pre>*/}
    </div>)}

        <div ref={viewerRef} style={{ display: 'none' }} />
    </div>
    
  </>);
}
