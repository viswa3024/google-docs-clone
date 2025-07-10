"use client";

import Image from "next/image";
import Link from "next/link";
import { 
    BoldIcon,
    FileIcon,
    FileJson,
    FilePenIcon,
    FilePlusIcon,
    FileTextIcon,
    GlobeIcon,
    ItalicIcon,
    PrinterIcon,
    Redo2Icon,
    RemoveFormattingIcon,
    StrikethroughIcon,
    TextIcon,
    TrashIcon,
    UnderlineIcon,
    Undo2Icon
} from "lucide-react";
import { 
    BsFilePdf
} from "react-icons/bs";

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar";
import { useEditorStore } from "@/store/use-editor-store";

import { DocumentInput } from "./document-input";

import { asBlob } from 'html-docx-ts'
import { saveAs } from 'file-saver'
import { FaFileWord, FaMarkdown } from "react-icons/fa";


export const Navbar = () => {

  const { editor } = useEditorStore();

  const exportEditorContentToDocx = async () => {

  if (!editor) return

  const html = editor.getHTML()

  const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            margin: 2cm;
          }
        </style>
      </head>
      <body>${html}</body>
    </html>
  `

  try {
    const blob = await asBlob(fullHtml)
    //ts-ignore
    //saveAs(blob, 'document.docx')
  } catch (error) {
    console.error('Failed to export DOCX:', error)
  }
}

  const insertTable = ({rows, cols}: {rows: number, cols: number}) => {
    editor?.chain().focus().insertTable({rows, cols, withHeaderRow: false}).run();
  }

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  const onSaveMarkdown = () => {
    if(!editor) return;

    const markdown = editor.storage.markdown.getMarkdown()

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
    saveAs(blob, 'document.md') // ✅ You can also make this dynamic

    // const content = editor.getJSON();
    // const blob = new Blob([JSON.stringify(content)], { type: "application/json" });
    // onDownload(blob, "document.json"); //TODO: Use document name
  }

  const onSaveJSON = () => {
    if(!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], { type: "application/json" });
    onDownload(blob, "document.json"); //TODO: Use document name
  }

  const onSaveHTML = () => {
    if(!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], { type: "text/html" });
    onDownload(blob, "document.html"); //TODO: Use document name
  }

   const onSaveText = () => {
    if(!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], { type: "text/plain" });
    onDownload(blob, "document.txt"); //TODO: Use document name
  }

  return (
    <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Link href="/">
                <Image
                    src="/logo.svg" alt="Logo"  
                    width={36}
                    height={36}
                    className="logo"
                /> 
            </Link>
            <div className="flex flex-col">
                <DocumentInput />
                <div className="flex">
                    <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                        <MenubarMenu >
                            <MenubarTrigger className="text-sm font-normal px-1 py-0.5 cursor-pointer rounded-sm hover:bg-neutral-200/80 h-auto focus:outline-none">
                                File
                            </MenubarTrigger>
                            <MenubarContent className="border-0.5 border-[#DDDDDD] shadow-[0px_0px_11px_#00000014] rounded-none print:hidden">  
                                <MenubarSub>
                                    <MenubarSubTrigger className="text-sm font-normal px-1 py-0.5 cursor-pointer rounded-sm hover:bg-neutral-200/80 h-auto focus:outline-none">
                                       <FileIcon className="size-4 mr-2" />
                                        Save
                                    </MenubarSubTrigger>
                                    <MenubarSubContent className="border-0.5 border-[#DDDDDD] shadow-[0px_0px_11px_#00000014] rounded-none">
                                        <MenubarItem className="cursor-pointer" onClick={onSaveJSON}>
                                            <FileJson className="size-4 mr-2" />
                                            JSON
                                        </MenubarItem>
                                        <MenubarItem className="cursor-pointer" onClick={onSaveHTML}>
                                            <GlobeIcon className="size-4 mr-2" />
                                            HTML
                                        </MenubarItem>
                                        <MenubarItem className="cursor-pointer" onClick={() => window.print()}>
                                            <BsFilePdf className="size-4 mr-2" />
                                            PDF
                                        </MenubarItem>
                                        <MenubarItem className="cursor-pointer" onClick={onSaveText}>
                                            <FileTextIcon className="size-4 mr-2" />
                                            Text
                                        </MenubarItem>
                                        {/* <MenubarItem className="cursor-pointer" onClick={exportEditorContentToDocx}>
                                            <FaFileWord className="size-4 mr-2" />
                                            DOCX
                                        </MenubarItem> */}
                                        <MenubarItem className="cursor-pointer" onClick={onSaveMarkdown}>
                                            <FaMarkdown className="size-4 mr-2" />
                                            Markdown
                                        </MenubarItem>
                                    </MenubarSubContent>    
                                </MenubarSub>
                                <MenubarItem className="cursor-pointer">
                                   <FilePlusIcon className="size-4 mr-2" />
                                   New Document
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="cursor-pointer">
                                    <FilePenIcon className="size-4 mr-2" />
                                    Rename 
                                </MenubarItem>
                                 <MenubarItem className="cursor-pointer">
                                    <TrashIcon className="size-4 mr-2" />
                                    Remove 
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="cursor-pointer" onClick={() => window.print()}>
                                    <PrinterIcon className="size-4 mr-2" />
                                    Print
                                    <MenubarShortcut>⌘P</MenubarShortcut>
                                </MenubarItem>

                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger className="text-sm font-normal px-1 py-0.5 cursor-pointer rounded-sm hover:bg-neutral-200/80 h-auto focus:outline-none">
                                Edit
                            </MenubarTrigger>
                            <MenubarContent className="border-0.5 border-[#DDDDDD] shadow-[0px_0px_11px_#00000014] rounded-none print:hidden">
                                <MenubarItem className="cursor-pointer" onClick={() => editor?.chain().focus().undo().run()}>
                                    <Undo2Icon className="size-4 mr-2" />
                                    Undo
                                    <MenubarShortcut>⌘Z</MenubarShortcut>
                                </MenubarItem>
                                 <MenubarItem className="cursor-pointer" onClick={() => editor?.chain().focus().redo().run()}>
                                    <Redo2Icon  className="size-4 mr-2" />
                                    Redo
                                    <MenubarShortcut>⌘Y</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>       
                        </MenubarMenu>  
                        <MenubarMenu>
                            <MenubarTrigger className="text-sm font-normal px-1 py-0.5 cursor-pointer rounded-sm hover:bg-neutral-200/80 h-auto focus:outline-none">
                                Insert
                            </MenubarTrigger>  
                             <MenubarContent className="border-0.5 border-[#DDDDDD] shadow-[0px_0px_11px_#00000014] rounded-none print:hidden">
                                <MenubarSub>
                                    <MenubarSubTrigger className="text-sm font-normal px-1 py-0.5 cursor-pointer rounded-sm hover:bg-neutral-200/80 h-auto focus:outline-none">
                                       <FileIcon className="size-4 mr-2" />
                                        Table
                                    </MenubarSubTrigger>
                                    <MenubarSubContent className="border-0.5 border-[#DDDDDD] shadow-[0px_0px_11px_#00000014] rounded-none">
                                        <MenubarItem className="cursor-pointer" onClick={() => insertTable({rows: 1, cols: 1})}>
                                            1 x 1
                                        </MenubarItem>
                                        <MenubarItem className="cursor-pointer" onClick={() => insertTable({rows: 2, cols: 2})}>
                                            2 x 2   
                                        </MenubarItem>
                                        <MenubarItem  className="cursor-pointer" onClick={() => insertTable({rows: 3, cols: 3})}>
                                            3 x 3
                                        </MenubarItem>
                                        <MenubarItem className="cursor-pointer" onClick={() => insertTable({rows: 4, cols: 5})}>
                                            4 x 4
                                        </MenubarItem>
                                    </MenubarSubContent>    
                                </MenubarSub>
                            </MenubarContent>       
                        </MenubarMenu>  
                         <MenubarMenu>
                            <MenubarTrigger className="text-sm font-normal px-1 py-0.5 cursor-pointer rounded-sm hover:bg-neutral-200/80 h-auto focus:outline-none">
                                Format
                            </MenubarTrigger>  
                             <MenubarContent className="border-0.5 border-[#DDDDDD] shadow-[0px_0px_11px_#00000014] rounded-none print:hidden">
                                <MenubarSub>
                                    <MenubarSubTrigger className="text-sm font-normal px-1 py-0.5 cursor-pointer rounded-sm hover:bg-neutral-200/80 h-auto focus:outline-none">
                                         <TextIcon className="size-4 mr-2" />
                                           Text
                                    </MenubarSubTrigger>
                                    <MenubarSubContent className="border-0.5 border-[#DDDDDD] shadow-[0px_0px_11px_#00000014] rounded-none">
                                        <MenubarItem className="cursor-pointer" onClick={() => editor?.chain().focus().toggleBold().run()}>
                                           <BoldIcon className="size-4 mr-2" />
                                            Bold
                                           <MenubarShortcut>⌘B</MenubarShortcut>
                                        </MenubarItem>
                                        <MenubarItem className="cursor-pointer" onClick={() => editor?.chain().focus().toggleItalic().run()}>
                                           <ItalicIcon className="size-4 mr-2" />
                                           Italic
                                           <MenubarShortcut>⌘I</MenubarShortcut>
                                        </MenubarItem>
                                        <MenubarItem className="cursor-pointer" onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                                           <UnderlineIcon className="size-4 mr-2" />
                                           Underline
                                           <MenubarShortcut>⌘U</MenubarShortcut>
                                        </MenubarItem>
                                        <MenubarItem className="cursor-pointer" onClick={() => editor?.chain().focus().toggleStrike().run()}>
                                           <StrikethroughIcon className="size-4 mr-2" />
                                           {/* <span className="truncate max-w-[50px]">Strikethrough</span> */}
                                           <span>Strikethrough&nbsp;&nbsp;</span>
                                           <MenubarShortcut>⌘S</MenubarShortcut>
                                        </MenubarItem>
                                    </MenubarSubContent>    
                                </MenubarSub>
                                <MenubarItem className="cursor-pointer" onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                                    <RemoveFormattingIcon className="size-4 mr-2" />
                                    Clear formatting
                                </MenubarItem>
                            </MenubarContent>       
                        </MenubarMenu>  
                    </Menubar>
                </div>
            </div>
        </div>
      
    </nav>
  );
}