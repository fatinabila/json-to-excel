import React from 'react';

const PropertySelector = ({ keys, selectedKeys, onSelectionChange }) => {
    if (!keys || keys.length === 0) return null;

    const handleCheckboxChange = (key) => {
        const newSelection = new Set(selectedKeys);
        if (newSelection.has(key)) {
            newSelection.delete(key);
        } else {
            newSelection.add(key);
        }
        onSelectionChange(newSelection);
    };

    const handleSelectAll = () => {
        onSelectionChange(new Set(keys));
    };

    const handleDeselectAll = () => {
        onSelectionChange(new Set());
    };

    return (
        <div className="space-y-4 p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">2. Select Columns</h2>
                <div className="space-x-2">
                    <button
                        onClick={handleSelectAll}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Select All
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                        onClick={handleDeselectAll}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Deselect All
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-2 border border-gray-100 rounded-md">
                {keys.map((key) => (
                    <label key={key} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                            type="checkbox"
                            checked={selectedKeys.has(key)}
                            onChange={() => handleCheckboxChange(key)}
                            className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4 border-gray-300"
                        />
                        <span className="text-sm text-gray-700 truncate" title={key}>{key}</span>
                    </label>
                ))}
            </div>

            <div className="text-sm text-gray-500 text-right">
                {selectedKeys.size} of {keys.length} selected
            </div>
        </div>
    );
};

export default PropertySelector;
