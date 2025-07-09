import { Extension } from '@tiptap/core';
import mammoth from 'mammoth';
import { Document, Packer, Paragraph, TextRun } from 'docx';

/**
 * Custom TipTap extension for importing and exporting DOCX files.
 */
export const ImportExportDocx = Extension.create({
  name: 'importExportDocx',

  addCommands() {
    return {
      /**
       * Import a DOCX file and set the editor content.
       * @param file File object (from input[type="file"])
       */
      importDocx: (file: File) => async ({ commands }) => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
          // You may want to convert HTML to TipTap JSON here
          // For now, set HTML directly (TipTap can parse HTML)
          return commands.setContent(html);
        } catch (e) {
          console.error('Failed to import DOCX:', e);
          return false;
        }
      },

      /**
       * Export the editor content as a DOCX file and trigger download.
       */
      exportDocx: () => async ({ editor }) => {
        try {
          // Get plain text from editor (for demo; you can improve this to handle formatting)
          const text = editor.getText();
          const doc = new Document({
            sections: [
              {
                properties: {},
                children: [new Paragraph({ children: [new TextRun(text)] })],
              },
            ],
          });
          const blob = await Packer.toBlob(doc);
          // Trigger download in browser
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'document.docx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          return true;
        } catch (e) {
          console.error('Failed to export DOCX:', e);
          return false;
        }
      },
    };
  },
});
