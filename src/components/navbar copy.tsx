import Image from "next/image";
import Link from "next/link";
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
import { FileIcon } from "lucide-react";

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
                        <MenubarMenu>
                            <MenubarTrigger className="text-sm font-normal py-0.5 rounded-sm hover:bg-muted h-auto">
                                File
                            </MenubarTrigger>
                            <MenubarContent>  
                                <MenubarItem>
                                    <FileIcon className="size-4 mr-2" />
                                    Save
                                    {/* <MenubarShortcut>Ctrl+S</MenubarShortcut> */}
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>
                                    Open
                                    <MenubarShortcut>Ctrl+O</MenubarShortcut>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>
                                    Save
                                    <MenubarShortcut>Ctrl+S</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Save As
                                    <MenubarShortcut>Ctrl+Shift+S</MenubarShortcut>
                                </MenubarItem>      

                                <MenubarSeparator />
                                <MenubarItem>
                                    Print
                                    <MenubarShortcut>Ctrl+P</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Exit
                                    <MenubarShortcut>Ctrl+Q</MenubarShortcut>


                                </MenubarItem>  

                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger className="text-sm font-normal py-0.5 rounded-sm hover:bg-muted h-auto">
                                Edit
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    Undo
                                    <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Redo
                                    <MenubarShortcut>Ctrl+Y</MenubarShortcut>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>
                                    Cut
                                    <MenubarShortcut>Ctrl+X</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Copy
                                    <MenubarShortcut>Ctrl+C</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Paste
                                    <MenubarShortcut>Ctrl+V</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>       
                </MenubarMenu>
                        <MenubarMenu>

                            <MenubarTrigger className="text-sm font-normal">
                                View
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    Zoom In
                                    <MenubarShortcut>Ctrl++</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Zoom Out
                                    <MenubarShortcut>Ctrl+-</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Reset Zoom
                                    <MenubarShortcut>Ctrl+0</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger className="text-sm font-normal">
                                Insert
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    Image
                                    <MenubarShortcut>Ctrl+Shift+I</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Table
                                    <MenubarShortcut>Ctrl+Shift+T</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Link
                                    <MenubarShortcut>Ctrl+K</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>

                            <MenubarTrigger className="text-sm font-normal">
                                Format
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    Bold
                                    <MenubarShortcut>Ctrl+B</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Italic
                                    <MenubarShortcut>Ctrl+I</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Underline
                                    <MenubarShortcut>Ctrl+U</MenubarShortcut>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarSub>
                                    <MenubarSubTrigger>Text Size</MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>Small</MenubarItem>
                                        <MenubarItem>Medium</MenubarItem>
                                        <MenubarItem>Large</MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>   
                            <MenubarTrigger className="text-sm font-normal">
                                Help
                            </MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    Documentation
                                    <MenubarShortcut>F1</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Support
                                    <MenubarShortcut>F2</MenubarShortcut>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>
                                    About
                                    <MenubarShortcut>F3</MenubarShortcut>
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