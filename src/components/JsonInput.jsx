import React, { useState } from 'react';
import JSON5 from 'json5';

const JsonInput = ({ onJsonLoaded }) => {
    const [textInput, setTextInput] = useState('');
    const [error, setError] = useState(null);

    const handleTextChange = (e) => {
        setTextInput(e.target.value);
        setError(null);
    };

    const processJson = (jsonString) => {
        try {
            // Use JSON5 to be more lenient with input (comments, unquoted keys, etc.)
            const parsed = JSON5.parse(jsonString);
            onJsonLoaded(parsed);
            setError(null);
        } catch (err) {
            console.error(err);
            setError(`Invalid JSON format: ${err.message}`);
        }
    };

    const handleLoadText = () => {
        if (!textInput.trim()) return;
        processJson(textInput);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            processJson(event.target.result);
        };
        reader.readAsText(file);
    };

    const loadSampleData = () => {
        const sample = `{
  "title": "Sample Report",
  "data": [
    { "id": 1, "name": "Alice", "role": "Admin" },
    { "id": 2, "name": "Bob", "role": "User" },
    { "id": 3, "name": "Charlie", "role": "User" }
  ]
}`;
        setTextInput(sample);
        setError(null);
    };

    return (
        <div className="space-y-4 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">1. Input JSON Data</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload JSON File</label>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
                />
            </div>

            <div className="text-center text-gray-500">- OR -</div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">Paste JSON Text</label>
                    <button
                        onClick={loadSampleData}
                        className="text-xs text-blue-600 hover:underline"
                    >
                        Load Sample Data
                    </button>
                </div>
                <textarea
                    className="w-full h-40 p-2 border border-gray-300 rounded-md font-mono text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder='[{"id": 1, "name": "Example"}, ...]'
                    value={textInput}
                    onChange={handleTextChange}
                />
            </div>

            <button
                onClick={handleLoadText}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
            >
                Load JSON
            </button>

            {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm whitespace-pre-wrap">
                    {error}
                </div>
            )}
        </div>
    );
};

export default JsonInput;
