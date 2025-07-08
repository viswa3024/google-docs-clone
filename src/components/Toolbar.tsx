'use client';

import React, { useState } from "react";

import { type ColorResult, CirclePicker, SketchPicker, CompactPicker, SwatchesPicker, TwitterPicker, MaterialPicker, AlphaPicker, BlockPicker, ChromePicker, PhotoshopPicker   } from "react-color";
import { type Level } from "@tiptap/extension-heading";

// AlphaPicker BlockPicker ChromePicker CirclePicker CompactPicker GithubPicker HuePicker MaterialPicker PhotoshopPicker SketchPicker SliderPicker SwatchesPicker TwitterPicker

import { 
    AlignCenterIcon,
    AlignJustifyIcon,
    AlignLeftIcon,
    AlignRightIcon,
    BoldIcon, 
    ChevronDownIcon, 
    CircleIcon, 
    HighlighterIcon, 
    ImageIcon, 
    ItalicIcon, 
    Link2Icon, 
    List, 
    ListCollapseIcon, 
    ListIcon, 
    ListOrderedIcon, 
    ListTodoIcon, 
    LucideIcon, 
    MessageSquarePlusIcon, 
    MinusIcon, 
    PlusIcon, 
    PrinterIcon, 
    Redo2Icon, 
    RemoveFormattingIcon, 
    SearchIcon, 
    SpellCheckIcon, 
    StrikethroughIcon, 
    UnderlineIcon, 
    Undo2Icon, 
    UploadIcon
} from "lucide-react";

import cn from 'classnames';
import { useEditorStore } from "@/store/use-editor-store";
import Separator from "./Separator";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const LineHeightButton = () => {
    const { editor } = useEditorStore();

    const lineHeights = [   
        { label: "Default", value: "normal"},
        { label: "Single", value: "1" },
        { label: "1.15", value: "1.15" },
        { label: "1.5", value: "1.5" },
        { label: "Double", value: "2" },
        { label: "2.5", value: "2.5" },
        { label: "3", value: "3" },
    ];

    return (<>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center ronded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    title="Line Height"
            >
                <ListCollapseIcon className="size-4" />
            </button>     
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1 border  rounded-none shadow-md">
           {lineHeights.map(({ label, value}) => (
            <button
                key={value}
                onClick={() => {
                     editor?.chain().focus().setLineHeight(value).run();
                }}
                className={cn(
                    "flex items-center cursor-pointer gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                    editor?.getAttributes("lineHeight").lineHeight === value && "bg-neutral-200/80"
                )}
            >
                <span className="text-sm">{label}</span>
            </button>
           ))}  
        </DropdownMenuContent>
        </DropdownMenu>
    </>)
};

const FontSizeButton = () => {
    const { editor } = useEditorStore();

    const currentFontSize = editor?.getAttributes("textStyle").fontSize ?
        editor.getAttributes("textStyle").fontSize.replace("px", "") : "16";

    const [fontSize, setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(fontSize);
    const [isEditing, setIsEditing] = useState(false);

    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize);
        if(!isNaN(size) && size > 0) {
            editor?.chain().setFontSize(`${size}px`).run();
            setFontSize(newSize);
            setInputValue(newSize);
            setIsEditing(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        updateFontSize(inputValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands.focus();
        }
    };
    
    const increment = () => {
        const newSize = parseInt(fontSize) + 1;
        updateFontSize(newSize.toString());
    };

    const decrement = () => {
        const newSize = parseInt(fontSize) - 1;
        if( newSize > 0) {
            updateFontSize(newSize.toString());
        }
        
    };

    return (<>
       <div className="flex items-center gap-x-0.5">
        <button 
            title="decrease font size"
            onClick={decrement}
            className="h-7 w-7 shrink-0 flex items-center justify-center ronded-sm hover:bg-neutral-200/80"
        >
            <MinusIcon className="size-4" />
        </button>
        {isEditing ? (
            <input 
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}    
                onKeyDown={handleKeyDown}
                className="h-7 w-10 text-sm text-center border border-neutral-400 ronded-sm bg-transparent focus:outline-none"
                // style={{ fontSize: `${fontSize}px` }}
                // autoFocus
                autoFocus
                
                />
        ) : (
            <button 
                onClick={() => {
                    setIsEditing(true);
                    setFontSize(currentFontSize);
                }}
                className="h-7 w-10 text-sm text-center border border-neutral-400 ronded-sm bg-transparent cursor-text"
            > 
                {currentFontSize}
            </button>
        )}

         <button 
            title="increase font size"
            onClick={increment}
            className="h-7 w-7 shrink-0 flex items-center justify-center ronded-sm hover:bg-neutral-200/80"
        >
            <PlusIcon className="size-4" />
        </button>
       </div>
    </>)
};

const ListButton = () => {
    const { editor } = useEditorStore();

    const lists = [
        { 
            label: "Bullet List",
            icon: ListIcon,
            isActive: () => editor?.isActive("bulletList"),
            onClick: () => editor?.chain().focus().toggleBulletList().run(),
        },
        {
            label: "Ordered List",
            icon: ListOrderedIcon,
            isActive: () => editor?.isActive("orderedList"),
            onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        },
        { 
            label: "Task List",
            icon: ListTodoIcon,
            isActive: () => editor?.isActive("taskList"),
            onClick: () => editor?.chain().focus().toggleTaskList().run(),  
        }
        
    ];

    return (<>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center ronded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    title="List Styles"
            >
                <ListIcon className="size-4" />
            </button>     
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1 border  rounded-none shadow-md">
           {lists.map(({ label, icon: Icon, onClick, isActive }) => (
            <button
                key={label}
                onClick={onClick}
                className={cn(
                    "flex items-center cursor-pointer gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                    isActive() && "bg-neutral-200/80"
                )}
            >
                <Icon className="size-4" />
                <span className="text-sm">{label}</span>
            </button>
           ))}  
        </DropdownMenuContent>
        </DropdownMenu>
    </>)
};

const AlignButton = () => {
    const { editor } = useEditorStore();

    const alignments = [
        { label: "Align Left", value: "left", icon: AlignLeftIcon },
        { label: "Align Center", value: "center", icon: AlignCenterIcon },
        { label: "Align Right", value: "right", icon: AlignRightIcon },
        { label: "Align Justify", value: "justify", icon: AlignJustifyIcon },
    ];

    return (<>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center ronded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    title="Text Alignment"
            >
                <AlignLeftIcon className="size-4" />
            </button>     
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1 border  rounded-none shadow-md">
           {alignments.map(({ label, value, icon: Icon }) => (
            <button
                key={value}
                onClick={() => {
                     editor?.chain().focus().setTextAlign(value).run();
                    // if (value === "justify") {
                    //     editor?.chain().focus().setTextAlign("justify").run();
                    // } else {
                    //     editor?.chain().focus().setTextAlign(value).run();
                    // }
                }}
                className={cn(
                    "flex items-center cursor-pointer gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                    editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
                )}
            >
                <Icon className="size-4" />
                <span className="text-sm">{label}</span>
            </button>
           ))}  
        </DropdownMenuContent>
        </DropdownMenu>
    </>)
};

const ImageButton = () => {
    const { editor } = useEditorStore();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();
    };

    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl);
            }
        };
        input.click();
    }

    const handleImageUrlSubmit = () => {
        if (imageUrl.trim()) {   
            onChange(imageUrl);
            setImageUrl("");
            setDialogOpen(false);
        }
    };

    return (<>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button
             className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center ronded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    title="Insert Image"
            >
                <ImageIcon className="size-4">
                    <title>Insert Image</title>
                </ImageIcon>
                {/* <ImageIcon className="size-4" /> */}
            </button>     
        </DropdownMenuTrigger>
        <DropdownMenuContent  className="p-2.5 border rounded-none shadow-md"
            style={{ borderColor: '#80f0bf' }}>
            <DropdownMenuItem onClick={onUpload}>
               <UploadIcon className="size-4 mr-2" />
                Upload
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                <SearchIcon className="size-4 mr-2" />
                Paste image URL   
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
         <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert Image URL</DialogTitle>
                    </DialogHeader>
                    <Input 
                        type="text" 
                        placeholder="Enter image URL" 
                        value={imageUrl} 
                        onChange={(e) => setImageUrl(e.target.value)} 
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleImageUrlSubmit();
                            }
                        }}
                        className="flex-1 border border-[#666666] text-sm focus:border-transparent focus:outline-none focus:ring-1 focus:ring-[#FF462D]"
                    />
                    
                    <DialogFooter>
                    <Button className="h-9 min-w-7 shrink-0 flex items-center justify-center ronded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm" onClick={() => setDialogOpen(false)}>
                        Cancel
                    </Button> 
                    <Button 
                        onClick={handleImageUrlSubmit}
                        className="h-9 min-w-7 shrink-0 flex items-center justify-center rounded-sm !bg-[#808080] !text-white !hover:bg-[#999999] px-1.5 overflow-hidden text-sm"
                        >
                        Insert
                    </Button>      
                </DialogFooter>
                </DialogContent>    
            </Dialog>
    </>)
};

const LinkButton = () => {
    const { editor } = useEditorStore();
    const [value, setValue] = useState("");

    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
        setValue("");
    };

    return (<>
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                setValue(editor?.getAttributes("link").href || "");
            }else{
                // Reset value when dropdown is closed
                setValue("");   
            }
        }}>
        <DropdownMenuTrigger asChild>
            <button
             className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center ronded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    title="Insert Link"
            >
                <Link2Icon className="size-4" />
            </button>     
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2.5 flex items-center gap-x-2 border  rounded-none shadow-md"
            style={{ borderColor: '#80f0bf' }}>
             <Input 
                type="text" 
                placeholder="https://example.com" 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                //style={{ borderColor: '#666666' }}
                // onFocus={(e) => {
                //     e.target.style.outline = '1px solid #FF462D';
                //     e.target.style.border = "none";
                // }}
                // onBlur={(e) => {
                //     e.target.style.border = "1px solid #666666";
                //     e.target.style.outline = 'none';
                // }}
                // className="flex-1"  
                className="flex-1 border border-[#666666] text-sm focus:border-transparent focus:outline-none focus:ring-1 focus:ring-[#FF462D]"    
            />
            <Button className="h-9 min-w-7 shrink-0 flex items-center justify-center ronded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm" onClick={() => onChange(value)}>
                Add Link
            </Button>
        </DropdownMenuContent>
        </DropdownMenu>
    </>)
};

const HighlightColorButton = () => {
    const { editor } = useEditorStore();

    const value = editor?.getAttributes("highlight")?.color || "#FFFF00"; // Default to yellow

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run();
    }

    return (<>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center ronded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    title="Highlight Color"
            >
                <HighlighterIcon className="size-4" />
            </button>     
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-0 p-0">
            <SketchPicker     
                color={value}
                onChange={onChange}
            />      
        </DropdownMenuContent>
        </DropdownMenu>
    </>)
}; 

const TextColorButton = () => {
    const { editor } = useEditorStore();

    const value = editor?.getAttributes("textStyle").color || "#000000";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    }

    return (<>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center ronded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    title="Text Color"
            >
                <span className="text-xs">A</span>
                <div className="h-0.5 w-full" style={{ backgroundColor: value}}/>
            </button>     
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-0 p-0">
            <SketchPicker     
                color={value}
                onChange={onChange}
            />      
        </DropdownMenuContent>
        </DropdownMenu>
    </>)
}; 


const HeadingLevelButton = () => {
    const { editor } = useEditorStore();

    const headings = [
        { label: "Normal text", value: 0, fontSize: "16px" },
        { label: "Heading 1", value: 1, fontSize: "32px" },
        { label: "Heading 2", value: 2, fontSize: "24px" },
        { label: "Heading 3", value: 3, fontSize: "20px" },
        { label: "Heading 4", value: 4, fontSize: "18px" },
        { label: "Heading 5", value: 5, fontSize: "16px" },
        { label: "Heading 6", value: 6, fontSize: "14px" },
    ];

    const getCurrentHeading = () => {
       for(let level =1; level <= 6; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`;
            }
        }
        return "Normal text";
    };

    return (<>
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={cn(
            "h-7 min-w-7 shrink-0 flex items-center justify-center ronded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm",
            )}>
            <span className="truncate">
              {getCurrentHeading()}
            </span>
            <ChevronDownIcon className="size-4 ml-2 shrink-0" />
          </Button>
          
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
            {headings.map(({label, value, fontSize}) => (
          <button
            // onClick={() => {
            //     editor?.chain().focus().setHeading({ level: value }).run();
            // }}
            onClick={() => {
                if (value === 0) {
                    editor?.chain().focus().setParagraph().run();
                } else {
                    editor?.chain().focus().toggleHeading({ level: value as Level }).run();
                }
            } }
            key={value}

             className={cn(
                "flex items-center cursor-pointer gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                (value === 0 && !editor?.isActive("heading")) ||
                editor?.isActive("heading", { level: value }) && "bg-neutral-200/80"
            )}
            style={{ fontSize }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
        </DropdownMenuContent>  
        </DropdownMenu>        
    </>);
}

const FontFamilyButton = () => {
    const { editor } = useEditorStore();

    const fonts = [
        { label: "Arial", value: "Arial" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Courier New", value: "Courier New" },
        { label: "Georgia", value: "Georgia" },
        { label: "Verdana", value: "Verdana" },
        { label: "Tahoma", value: "Tahoma" },
        { label: "Trebuchet MS", value: "Trebuchet MS" },
        { label: "Impact", value: "Impact" },
        { label: "Comic Sans MS", value: "Comic Sans MS" },
        { label: "Lucida Console", value: "Lucida Console" },
        { label: "Palatino Linotype", value: "Palatino Linotype" },
        { label: "Arial Black", value: "Arial Black" },
        { label: "Helvetica", value: "Helvetica" },
    ];

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={cn(
            "h-7 w-[120px] shrink-0 flex items-center justify-between ronded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm",
            )}>
            <span className="truncate">
              {editor?.getAttributes("textStyle").fontFamily || "Arial"}
              </span>
              <ChevronDownIcon className="size-4 ml-2 shrink-0" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
            {fonts.map(({label, value}) => (
          <button
            onClick={() => {
                editor?.chain().focus().setFontFamily(value).run();
            }}
            key={value}
            className={cn(
                "flex items-center cursor-pointer gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
        </DropdownMenuContent>
      </DropdownMenu>
  );
}

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
    label?: string;
};

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon,
    label
}: ToolbarButtonProps) => {
    return (<>
        <button 
            onClick={onClick}  
             className={cn(
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && 'bg-neutral-200/80'
             )}  

             {...(label ? { title: label } : {})}
        >
            <Icon className="size-4" />
        </button>
    </>)
}

export default function Toolbar() {

    const { editor } = useEditorStore();

    //console.log("Toolbar editor: ", {editor})

    const sections: { 
        label: string; 
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
        [
            {
                label: "Undo",
                icon: Undo2Icon,
                onClick: () => editor?.chain().focus().undo().run(),
            },
            {
                label: "Redo",
                icon: Redo2Icon,
                onClick: () => editor?.chain().focus().redo().run(),
            },
            {
                label: "Print",
                icon: PrinterIcon,
                onClick: () => window.print(),
            },
            {
                label: "Spell Check",
                icon: SpellCheckIcon,
                onClick: () => {
                    //console.log("Toolbar editor: ", {editor})
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false" )
                },
            },
        ],
        [
            {
                label: "Bold",
                icon: BoldIcon,
                isActive: editor?.isActive("bold"),
                onClick: () => editor?.chain().focus().toggleBold().run(),
            },
            {
                label: "Italic",
                icon: ItalicIcon,
                isActive: editor?.isActive("italic"),
                onClick: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
                label: "Underline",
                icon: UnderlineIcon,
                isActive: editor?.isActive("underline"),
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
            },
            {
                label: "Strike",
                icon: StrikethroughIcon,
                isActive: editor?.isActive("strike"),
                onClick: () => editor?.chain().focus().toggleStrike().run(),
            },
            {
                label: "Bullet List",
                icon: ListIcon,
                isActive: editor?.isActive("bulletList"),
                onClick: () => editor?.chain().focus().toggleBulletList().run(),
            },
            {
                label: "Ordered List",
                icon: ListOrderedIcon,
                isActive: editor?.isActive("orderedList"),
                onClick: () => editor?.chain().focus().toggleOrderedList().run(),
            },
        ],
        [
            {
                label: "Comment",
                icon: MessageSquarePlusIcon,
                isActive: false, // TODO: Enable this functionality 
                onClick: () => console.log("TODO: Comment") ,
            },
            {
                label: "List Todo",
                icon: ListTodoIcon,
                isActive: editor?.isActive("taskList"),
                onClick: () => editor?.chain().focus().toggleTaskList().run(),
            },
            {
                label: "Remove Formatting",
                icon: RemoveFormattingIcon,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
            },

        ],
    ];
  return (<>
   <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
    {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item}/>
    ))}
    <Separator orientation="vertical" className="h-6 bg-neutral-300" />

    <FontFamilyButton />
    <Separator orientation="vertical" className="h-6 bg-neutral-300" />

    <HeadingLevelButton />
    <Separator orientation="vertical" className="h-6 bg-neutral-300" />

    <FontSizeButton />
    <Separator orientation="vertical" className="h-6 bg-neutral-300" />
    {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item}/>
    ))}
    <TextColorButton />
    <HighlightColorButton />
    <Separator orientation="vertical" className="h-6 bg-neutral-300" />
    <LinkButton />
    <ImageButton />
    <AlignButton />
    <LineHeightButton />
    <ListButton />
    {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item}/>
    ))}
   </div>
  </>);
}
