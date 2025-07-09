'use client';

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'

import ImageResize from 'tiptap-extension-resize-image';

import { useEditorStore } from '@/store/use-editor-store';
import { FontSizeExtension } from '@/extensions/font-size';
import { LineHeightExtension } from '@/extensions/line-height';
//import { Page, setupAutoPageBreak } from "@/extensions/page";

//import { Pagination } from 'tiptap-pagination-breaks';

import { Ruler } from './ruler';
//import { useEffect } from 'react';

export default function Editor() {

    const { setEditor } = useEditorStore();

    const editor = useEditor({
        onCreate({ editor }) {
            setEditor(editor);
        },
        onDestroy(){
            setEditor(null);
        },
        onUpdate({ editor }) {
            setEditor(editor);
        },
        onSelectionUpdate({ editor }) {
            setEditor(editor);
        },
        onTransaction({ editor }) {
            setEditor(editor);
        },
        onFocus({ editor }) {
            setEditor(editor);
        },
        onBlur({ editor }) {
            setEditor(editor);
        },
        onContentError({ editor }) {
            setEditor(editor);
        },
        editorProps: {
            attributes: {
                style: "padding-left: 56px; padding-right: 56px;",
                //style: 'background: #eee; min-height: 100vh;',
                class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
            }
        },
        immediatelyRender: false,
        extensions: [
            StarterKit,
            //Pagination,
            FontSizeExtension,
            LineHeightExtension.configure({
                types: ['heading', 'paragraph'],
                defaultLineHeight: 'normal',
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Color,
            Highlight.configure({ multicolor: true }),
            TextStyle, 
            FontFamily,
            Underline,
            //Image,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            ImageResize,
            Table.configure({
                HTMLAttributes: {
                    class: 'my-custom-class',
                },
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            //Dropcursor,
            Dropcursor.configure({
                color: '#ff0000',
                //width: 2, //Default: 1
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
                protocols: ['http', 'https'],
                isAllowedUri: (url, ctx) => {
                try {
                    // construct URL
                    const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

                    // use default validation
                    if (!ctx.defaultValidate(parsedUrl.href)) {
                    return false
                    }

                    // disallowed protocols
                    const disallowedProtocols = ['ftp', 'file', 'mailto']
                    const protocol = parsedUrl.protocol.replace(':', '')

                    if (disallowedProtocols.includes(protocol)) {
                    return false
                    }

                    // only allow protocols specified in ctx.protocols
                    const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

                    if (!allowedProtocols.includes(protocol)) {
                    return false
                    }

                    // disallowed domains
                    const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
                    const domain = parsedUrl.hostname

                    if (disallowedDomains.includes(domain)) {
                    return false
                    }

                    // all checks have passed
                    return true
                } catch {
                    return false
                }
                },
                shouldAutoLink: url => {
                try {
                    // construct URL
                    const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

                    // only auto-link if the domain is not in the disallowed list
                    const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
                    const domain = parsedUrl.hostname

                    return !disallowedDomains.includes(domain)
                } catch {
                    return false
                }
                },

            }),
        ],
        content: '<div data-type="page"><p>Hello World</p></div>',
        // content: `<div><p>Hello World! 🌎️</p>
        //             <table>
        //                 <tbody>
        //                     <tr>
        //                     <th>Name</th>
        //                     <th colspan="3">Description</th>
        //                     </tr>
        //                     <tr>
        //                     <td>Cyndi Lauper</td>
        //                     <td>Singer</td>
        //                     <td>Songwriter</td>
        //                     <td>Actress</td>
        //                     </tr>
        //                 </tbody>
        //             </table>
        //             <p>This is a basic example of implementing images. Drag to re-order.</p>
        //             <img src="https://placehold.co/800x400" />
        //             <img src="https://placehold.co/800x400/6A00F5/white" />
        //         </div>`,
    })

//     useEffect(() => {
//     if (editor) {
//       setupAutoPageBreak(editor)
//     }
//   }, [editor])

  return (<>
   <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
    <Ruler />
    <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
    </div>
   </div>
  </>);
}
