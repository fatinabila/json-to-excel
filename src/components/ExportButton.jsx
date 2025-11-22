import React from 'react';
import * as XLSX from 'xlsx';

const ExportButton = ({ data, selectedKeys, disabled }) => {
    const handleExport = () => {
        if (!data || data.length === 0 || selectedKeys.size === 0) return;

        // Filter data to include only selected keys
        const filteredData = data.map(item => {
            const newItem = {};
            selectedKeys.forEach(key => {
                // Handle nested objects if necessary, but for now simple property access
                // If the key doesn't exist in an item, it will be undefined (empty cell in Excel)
                newItem[key] = item[key];
            });
            return newItem;
        });

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(filteredData);

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data");

        // Generate Excel file
        XLSX.writeFile(wb, "exported_data.xlsx");
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Export</h2>
            <button
                onClick={handleExport}
                disabled={disabled}
                className={`w-full py-3 px-4 rounded-md font-bold text-white shadow-md transition duration-200
          ${disabled
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 shadow-green-200'}`}
            >
                Download Excel File
            </button>
        </div>
    );
};

export default ExportButton;
