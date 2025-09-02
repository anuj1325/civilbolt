import React, { useState } from 'react';

const DocumentEditor = () => {
  const [content, setContent] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h3 className="text-heading-2 font-heading-2 text-default-font">Document Editor</h3>
      </div>
      <div className="p-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing your document..."
          className="w-full h-96 p-3 border border-neutral-border rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-body text-body text-default-font"
        />
      </div>
    </div>
  );
};

export default DocumentEditor;