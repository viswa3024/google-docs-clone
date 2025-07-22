'use client';

import { useState } from 'react';
import { Download, FileText } from 'lucide-react';

export default function GeneratePage() {
  const [documentGenerated, setDocumentGenerated] = useState(false);

  const handleGenerate = () => {
    setDocumentGenerated(true);
  };

  return (
    <div className="w-full h-full bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
      {/* Left Side - 60% */}
      <div className="w-full md:w-3/5 border-r border-gray-200 p-8">
        <h2 className="text-lg font-semibold mb-6">📄 Document Configuration</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Technology</label>
          <select className="w-full border border-gray-300 rounded px-3 py-2">
            <option>test modernization</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Phase</label>
          <select className="w-full border border-gray-300 rounded px-3 py-2">
            <option>2 - test</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Document</label>
          <select className="w-full border border-gray-300 rounded px-3 py-2">
            <option>test Strategy Guide</option>
          </select>
        </div>

        <button
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded flex items-center gap-2"
          onClick={handleGenerate}
        >
          ⚡ Generate Document
        </button>
      </div>

      {/* Right Side - 40% */}
      <div className="w-full md:w-2/5 p-8">
        <h2 className="text-lg font-semibold mb-6">📁 Generated Document</h2>

        {documentGenerated ? (
          <div className="bg-gray-50 border border-gray-300 rounded p-4">
            <div className="flex items-start gap-3">
              <FileText className="text-green-600 mt-1" />
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">
                  test Strategy Guide.Mainframe_modernization_2_-_Design.pdf
                </p>
                <p className="text-gray-500 text-sm">Size: 2.4 MB</p>
                <p className="text-gray-500 text-sm">
                  Generated: 7/22/2025, 12:33:17 PM
                </p>
              </div>
            </div>

            <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded flex items-center gap-2">
              <Download size={18} /> Download Document
            </button>
          </div>
        ) : (
          <p className="text-gray-400 italic">No document generated yet.</p>
        )}
      </div>
    </div>
  );
}
