//import Editor from "@/components/Editor";
import GeneratePage  from "@/components/generate";
// import { Navbar } from "@/components/navbar";
// import { SearchInput } from "@/components/search-input";
//import PageEditor from "@/components/PageEditor";
//import Toolbar from "@/components/Toolbar";

export default function Home() {
  return (<>
  <GeneratePage />
  {/* <div className="min-h-screen bg-[#FAFBFD]">
    <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFC] print:hidden">
       <Navbar />
       <Toolbar />
    </div>
    <div className="pt-[114px] print:pt-0 ">
      <Editor />
    </div>
    <div className="pt-[20px] pb-[20px]">
      <SearchInput />
    </div>
  </div> */}
  </>);
}

// 'use client';

// import DocxPreviewEditor from '@/components/docx-preview-editor';
// import dynamic from 'next/dynamic';

// const ReactJsTipTapEditor = dynamic(() => import('../components/react-js-tiptap-editor'), {
//   ssr: false,
//   loading: () => <p>Loading editor...</p>,
// });

// export default function HomePage() {

//   return (
//       <main>
//         <ReactJsTipTapEditor />
//         <DocxPreviewEditor />
//       </main>
//   );
// }
