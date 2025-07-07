import Editor from "@/components/Editor";
import Toolbar from "@/components/Toolbar";
import Image from "next/image";

export default function Home() {
  return (<>
  <div className="min-h-screen bg-[#FAFBFD]">
    <Toolbar />
    <Editor />
  </div>
  </>);
}
