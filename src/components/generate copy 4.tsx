'use client';

import { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import Select from './Select';

const technologies = [
  { key: 'mainframe', label: 'test modernization' },
  { key: 'cloud', label: 'Cloud Migration' },
  { key: 'data', label: 'Data Platform Upgrade' },
];

const phases = [
  { key: '1-init', label: '1 - Initiation' },
  { key: '2-design', label: '2 - test' },
  { key: '3-implement', label: '3 - Implementation' },
];

const documents = [
  { key: 'migration-guide', label: 'test Strategy Guide' },
  { key: 'architecture-plan', label: 'Architecture Plan' },
  { key: 'risk-report', label: 'Risk Assessment Report' },
];

export default function GeneratePage() {
  const [documentGenerated, setDocumentGenerated] = useState(false);

  const [technology, setTechnology] = useState('mainframe');
  const [phase, setPhase] = useState('2-design');
  const [documentType, setDocumentType] = useState('migration-guide');

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleGenerate = () => {
    setDocumentGenerated(true);
  };

  return (
    <div className="h-screen bg-gray-100">
        {/* Header */}
        <div className="h-[50px] bg-white shadow-md rounded-md px-6 flex items-center justify-between mb-[2px]">
            <h1 className="text-lg font-semibold text-gray-800">Title</h1>
            <span className="text-gray-600">Data sets</span>
        </div>


        {/* Main Panel */}
         <div className="w-full h-[calc(100%-66px)] bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="md:w-[60%] w-full border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-6">📄 Document Configuration</h2>

        <Select
          label="Technology"
          options={technologies}
          value={technology}
          onChange={setTechnology}
          isOpen={openDropdown === 'technology'}
          onToggle={() =>
            setOpenDropdown(openDropdown === 'technology' ? null : 'technology')
          }
          onClose={() => openDropdown === 'technology' && setOpenDropdown(null)}
        />

        <Select
          label="Phase"
          options={phases}
          value={phase}
          onChange={setPhase}
          isOpen={openDropdown === 'phase'}
          onToggle={() => setOpenDropdown(openDropdown === 'phase' ? null : 'phase')}
          onClose={() => openDropdown === 'phase' && setOpenDropdown(null)}
        />

        <Select
          label="Document"
          options={documents}
          value={documentType}
          onChange={setDocumentType}
          isOpen={openDropdown === 'document'}
          onToggle={() =>
            setOpenDropdown(openDropdown === 'document' ? null : 'document')
          }
          onClose={() => openDropdown === 'document' && setOpenDropdown(null)}
        />

        <button
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded flex items-center gap-2 mt-4"
          onClick={handleGenerate}
        >
          ⚡ Generate Document
        </button>
      </div>

      {/* Right Side */}
      <div className="md:w-[40%] w-full p-4">
        <h2 className="text-lg font-semibold mb-6">📁 Generated Document</h2>

        {documentGenerated ? (
          <div className="bg-gray-50 border border-gray-300 rounded p-4">
            <div className="flex items-start gap-3">
              <FileText className="text-green-600 mt-1" />
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">
                  {`${documents.find((d) => d.key === documentType)?.label}.${technologies.find((t) => t.key === technology)?.label}_${phases.find((p) => p.key === phase)?.label}.pdf`}
                </p>
                <p className="text-gray-500 text-sm">Size: 2.4 MB</p>
                <p className="text-gray-500 text-sm">Generated: 7/22/2025, 12:33:17 PM</p>
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

    </div>
  );
}
