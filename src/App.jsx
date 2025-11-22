import React, { useState } from 'react';
import JsonInput from './components/JsonInput';
import PropertySelector from './components/PropertySelector';
import ExportButton from './components/ExportButton';
import { findArrayInJson } from './utils/jsonHelpers';

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [message, setMessage] = useState(null);

  const handleJsonLoaded = (rawJson) => {
    const dataArray = findArrayInJson(rawJson);

    if (!dataArray || dataArray.length === 0) {
      setMessage({ type: 'error', text: 'No array data found in the provided JSON.' });
      setJsonData([]);
      setKeys([]);
      setSelectedKeys(new Set());
      return;
    }

    // Extract all unique keys from the first few objects (or all to be safe, but let's do all for accuracy)
    const allKeys = new Set();
    dataArray.forEach(item => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(k => allKeys.add(k));
      }
    });

    const keysArray = Array.from(allKeys);

    setJsonData(dataArray);
    setKeys(keysArray);
    setSelectedKeys(allKeys); // Select all by default
    setMessage({ type: 'success', text: `Successfully loaded ${dataArray.length} records.` });
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Lightweight JSON to Excel Converter</h1>
          <p className="mt-2 text-gray-600">Fast & simple. Convert your JSON data to Excel with custom column selection.</p>
        </header>

        <section aria-label="JSON Input Section">
          <JsonInput onJsonLoaded={handleJsonLoaded} />
        </section>

        {message && (
          <div
            role="alert"
            className={`p-4 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}
          >
            {message.text}
          </div>
        )}

        {jsonData.length > 0 && (
          <>
            <section aria-label="Column Selection Section">
              <PropertySelector
                keys={keys}
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
              />
            </section>

            <section aria-label="Export Section">
              <ExportButton
                data={jsonData}
                selectedKeys={selectedKeys}
                disabled={selectedKeys.size === 0}
              />
            </section>
          </>
        )}

        <footer className="text-center pt-8 pb-4">
          <a
            href="https://github.com/fatinabila"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="View on GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">fatinabila</span>
          </a>
        </footer>
      </div>
    </main>
  );
}

export default App;
