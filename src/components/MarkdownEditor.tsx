'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex border-b bg-gray-50">
        <button
          type="button"
          onClick={() => setShowPreview(false)}
          className={`px-4 py-2 text-sm font-medium ${!showPreview ? 'bg-white border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className={`px-4 py-2 text-sm font-medium ${showPreview ? 'bg-white border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          Preview
        </button>
      </div>

      <div className="p-4 min-h-[400px]">
        {!showPreview ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full min-h-[400px] p-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
            placeholder="Write your content in Markdown..."
          />
        ) : (
          <div className="prose max-w-none markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value || '*No content yet*'}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
