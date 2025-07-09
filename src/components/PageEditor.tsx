"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Page } from "@/extensions/page";
import { useEffect } from "react";
import "@/app/globals.css";

export default function PageEditor() {
  const editor = useEditor({
    extensions: [StarterKit, Page],
    content: `
      <div class="page">
        <p>This is page 1. Start typing...</p>
      </div>
      <div class="page">
        <p>This is page 2.</p>
      </div>
    `,
  });

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const pages = document.querySelectorAll(".page");
      pages.forEach((page) => {
        if (page.scrollHeight > 1122) {
          const para = document.createElement("p");
          para.innerText = "\u200B"; // zero-width space

          const newPage = document.createElement("div");
          newPage.className = "page";
          newPage.appendChild(para);

          page.parentElement?.appendChild(newPage);
        }
      });
    });

    document.querySelectorAll(".page").forEach((page) => observer.observe(page));

    return () => observer.disconnect();
  }, [editor]);

  return (
    <div className="bg-gray-100 py-8 px-2 min-h-screen">
      <div className="max-w-[850px] mx-auto">
        <EditorContent editor={editor} className="tiptap" />
      </div>
    </div>
  );
}