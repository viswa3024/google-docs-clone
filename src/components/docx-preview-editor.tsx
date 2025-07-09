'use client';

import React, { useRef, useState } from 'react'
 
import { renderAsync } from 'docx-preview'

const DocxPreviewEditor = () => {    
    const [error,setError] = useState("")
     const viewerRef = useRef<any>(null)

     const handleFileChange = async (e: any) => {
    // read the docx file which is selected
    const file = e.target.files[0]
 
    if (!file || file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setError("Please upload a valid .docx file.");
      return;
    }
 
    setError("")
 
    const arrayBuffer = await file.arrayBuffer()
 
    renderAsync(arrayBuffer,viewerRef.current).catch(() => {
      setError("An error occured rendering the document")
    })
  }

  return (
  <div className="mt-4 px-4 max-w-4xl mx-auto">
    {/* Header */}
    <div className="mb-3">
      <h1 className="text-2xl font-bold">Word Document Viewer</h1>
    </div>

    {/* Upload Form */}
    <div className="mb-3">
      <label className="block text-sm font-medium mb-2">
        Upload a Word Document (.docx)
      </label>
      <input
        type="file"
        accept=".docx"
        onChange={handleFileChange}
        //className="block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

        className="block w-full border border-gray-300 rounded px-3 py-2 text-sm 
             file:mr-4 file:py-2 file:px-4
             file:rounded file:border-0
             file:bg-neutral-500 file:text-white
             hover:file:bg-neutral-600
             focus:outline-none"
      />
    </div>

    {/* Viewer Output */}
    <div>
      <div
        ref={viewerRef}
        className="border border-gray-300 p-4 h-[500px] overflow-scroll rounded bg-white shadow-sm"
      >
        {/* Rendered .docx HTML will appear here */}
      </div>
    </div>
  </div>
);

  //return (
//     <div className='p-6 max-w-5xl mx-auto'>
//       <Row className='mb-3'>
//         <Col>
//           <h1>Word Document Viewer</h1>
//         </Col>
//       </Row>
//       <Row className='mb-3'>
//         <Col>
//           <Form>
//             <Form.Group>
//               <Form.Label>Upload a Word Document(.docx)</Form.Label>
//               <Form.Control
//               type='file'
//               accept='.docx'
//               onChange={handleFileChange}
//               />
//             </Form.Group>
//           </Form>
//         </Col>
//       </Row>
 
//       <Row>
//         <Col>
//           <div ref={viewerRef}
//           style={{
//             border:"1px solid #ccc",
//             padding:"16px",
//             height:"500px",
//             overflow:"scroll"
//           }}
//           >
//           {/* here the docx file will show */}
//           </div>
//         </Col>
//       </Row>
//     </div>
//   )
}

export default DocxPreviewEditor
