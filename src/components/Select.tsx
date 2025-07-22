'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

type Option = {
  key: string;
  label: string;
};

type SelectProps = {
  label: string;
  options: Option[];
  value: string;
  onChange: (key: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export default function Select({
  label,
  options,
  value,
  onChange,
  isOpen,
  onToggle,
  onClose,
}: SelectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((opt) => opt.key === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="mb-4 relative" ref={ref}>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <button
        type="button"
        onClick={onToggle}
        className="w-full border border-gray-300 rounded px-3 py-2 text-left flex justify-between items-center bg-white"
      >
        <span>{selected?.label || 'Select...'}</span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-md max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.key}
              onClick={() => {
                onChange(option.key);
                onClose();
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-teal-100 ${
                option.key === value ? 'bg-teal-50 font-semibold' : ''
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
