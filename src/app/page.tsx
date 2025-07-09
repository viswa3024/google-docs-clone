import Editor from "@/components/Editor";
import { Navbar } from "@/components/navbar";
//import PageEditor from "@/components/PageEditor";
import Toolbar from "@/components/Toolbar";

export default function Home() {
  return (<>
  <div className="min-h-screen bg-[#FAFBFD]">
    <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFC] print:hidden">
       <Navbar />
       <Toolbar />
    </div>
    <div className="pt-[114px] print:pt-0 ">
      <Editor />
    </div>
    {/* <PageEditor /> */}
  </div>
  </>);
}
