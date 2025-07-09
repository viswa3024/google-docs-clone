import { Editor, Node, mergeAttributes } from '@tiptap/core'

export interface PageOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    page: {
      addPage: () => ReturnType
    }
  }
}

export const Page = Node.create<PageOptions>({
  name: 'page',
  group: 'block',
  content: 'block+',
  selectable: false,
  draggable: false,
  isolating: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'tiptap-page',
        style: 'page-break-after: always; min-height: 1122px; padding: 40px; background: white; box-shadow: 0 0 8px #ccc; margin: 40px auto; width: 794px;'
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="page"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes({ 'data-type': 'page' }, this.options.HTMLAttributes, HTMLAttributes),
      0,
    ]
  },

  addCommands() {
    return {
      addPage:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            content: [
              {
                type: 'paragraph',
              },
            ],
          })
        },
    }
  },
})

// Usage in your Editor setup (example):
// import { Page } from './extensions/page'
// const editor = useEditor({
//   extensions: [Page, ...otherExtensions],
//   content: '<div data-type="page"><p>Hello World</p></div>',
// })

export function setupAutoPageBreak(editor: Editor) {
  editor.on('update', () => {
    const editorElement = editor.options.element as HTMLElement
    if (!editorElement) return

    // Find all page nodes
    const pages = Array.from(editorElement.querySelectorAll('div[data-type="page"]'))
    if (pages.length === 0) return

    // Check if the last page is overflowing
    const lastPage = pages[pages.length - 1] as HTMLElement
    const maxHeight = 1122 // px, as set in min-height

    if (lastPage.scrollHeight > maxHeight + 20) {
      // Insert a new page at the end
      editor.commands.addPage()
    }
  })
}