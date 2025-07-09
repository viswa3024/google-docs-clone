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
import { DocumentInput } from "./document-input";

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


export const Navbar = () => {

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
                                        <MenubarItem>
                                            <FileJson className="size-4 mr-2" />
                                            JSON
                                        </MenubarItem>
                                        <MenubarItem>
                                            <GlobeIcon className="size-4 mr-2" />
                                            HTML
                                        </MenubarItem>
                                        <MenubarItem>
                                            <BsFilePdf className="size-4 mr-2" />
                                            PDF
                                        </MenubarItem>
                                        <MenubarItem>
                                            <FileTextIcon className="size-4 mr-2" />
                                            Text
                                        </MenubarItem>
                                    </MenubarSubContent>    
                                </MenubarSub>
                                <MenubarItem>
                                   <FilePlusIcon className="size-4 mr-2" />
                                   New Document
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>
                                    <FilePenIcon className="size-4 mr-2" />
                                    Rename 
                                </MenubarItem>
                                 <MenubarItem>
                                    <TrashIcon className="size-4 mr-2" />
                                    Remove 
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem onClick={() => window.print()}>
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
                                <MenubarItem>
                                    <Undo2Icon  className="size-4 mr-2" />
                                    Undo
                                    <MenubarShortcut>⌘Z</MenubarShortcut>
                                </MenubarItem>
                                 <MenubarItem>
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
                                        <MenubarItem>
                                            1 x 1
                                        </MenubarItem>
                                        <MenubarItem>
                                            2 x 2   
                                        </MenubarItem>
                                        <MenubarItem>
                                            3 x 3
                                        </MenubarItem>
                                        <MenubarItem>
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
                                        <MenubarItem>
                                           <BoldIcon className="size-4 mr-2" />
                                            Bold
                                           <MenubarShortcut>⌘B</MenubarShortcut>
                                        </MenubarItem>
                                        <MenubarItem>
                                           <ItalicIcon className="size-4 mr-2" />
                                           Italic
                                           <MenubarShortcut>⌘I</MenubarShortcut>
                                        </MenubarItem>
                                        <MenubarItem>
                                           <UnderlineIcon className="size-4 mr-2" />
                                           Underline
                                           <MenubarShortcut>⌘U</MenubarShortcut>
                                        </MenubarItem>
                                        <MenubarItem>
                                           <StrikethroughIcon className="size-4 mr-2" />
                                           {/* <span className="truncate max-w-[50px]">Strikethrough</span> */}
                                           <span>Strikethrough&nbsp;&nbsp;</span>
                                           <MenubarShortcut>⌘S</MenubarShortcut>
                                        </MenubarItem>
                                    </MenubarSubContent>    
                                </MenubarSub>
                                <MenubarItem>
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