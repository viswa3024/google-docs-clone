'use client';

import React, { useState } from 'react';
import RichTextEditor, { BaseKit } from 'reactjs-tiptap-editor';
import { Bold } from 'reactjs-tiptap-editor/bold'
import { Italic } from 'reactjs-tiptap-editor/italic'
import { History } from 'reactjs-tiptap-editor/history'
import { Heading } from 'reactjs-tiptap-editor/heading'
import { BulletList } from 'reactjs-tiptap-editor/bulletlist'
import { OrderedList } from 'reactjs-tiptap-editor/orderedlist'
import { Link } from 'reactjs-tiptap-editor/link'
import { Image } from 'reactjs-tiptap-editor/image'

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

import { locale } from 'reactjs-tiptap-editor/locale-bundle'

 // Change language
locale.setLang('en')    // English
locale.setLang('vi')    // Vietnamese  
locale.setLang('zh_CN') // Chinese
locale.setLang('pt_BR') // Portuguese


export default function HomePage() {

 

  const [content, setContent] = useState('');

  const extensions = [
    BaseKit.configure({
      placeholder: {
        showOnlyCurrent: true,
      },
      characterCount: {
        limit: 50000,
      },
    }),
    History,
  Heading,
  Bold,
  Italic,
  BulletList,
  OrderedList,
  Link,
  Image.configure({
    upload: (file: File) => {
      return new Promise((resolve) => {
        // Your upload logic here
        resolve(URL.createObjectURL(file))
      })
    },
  })
  ];

  return (
    <main className="max-w-3xl mx-auto mt-10 p-4">
<div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <RichTextEditor
        output="html"
        content={content}
        onChangeContent={(val) => setContent(val)}
        extensions={extensions}
        dark={false}
        disabled={false}
        bubbleMenu={{
          render({ extensionsNames, editor, disabled }, bubbleDefaultDom) {
            return <>
              {bubbleDefaultDom}
              {/* Custom bubble menu items */}
            </>
          },
  }}
      />

      <h2 className="mt-6 font-semibold">Output:</h2>
      <pre className="p-2 bg-gray-100 mt-2 overflow-x-auto">{content}</pre>
      </div>
    </main>
    
  );
}




// import Editor from "@/components/Editor";
// import { Navbar } from "@/components/navbar";
// //import PageEditor from "@/components/PageEditor";
// import Toolbar from "@/components/Toolbar";
// import MyEditor from "@/components/MyEditor";

// export default function Home() {
//   return (<>
//   <div className="min-h-screen bg-[#FAFBFD]">

//      <MyEditor />
//     {/* <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFC] print:hidden">
//        <Navbar />
//        <Toolbar />
//     </div>
//     <div className="pt-[114px] print:pt-0 ">
//       <Editor />
//     </div> */}
//     {/* <PageEditor /> */}
//   </div>
//   </>);
// }
