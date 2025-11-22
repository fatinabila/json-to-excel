# Lightweight JSON to Excel Converter

A fast, simple React application that converts JSON data into Excel files with customizable column selection. No bloat, no complexity - just results.

## Features

- 📤 **Multiple Input Methods**: Upload JSON files or paste JSON text directly
- 🎯 **Smart JSON Parsing**: Automatically detects arrays in nested JSON structures (e.g., `{ "data": [...] }`)
- ✅ **Column Selection**: Choose which properties to include in the exported Excel file
- 📊 **Excel Export**: Download data as `.xlsx` files using SheetJS
- 🎨 **Modern UI**: Clean, responsive interface built with Tailwind CSS
- 🔄 **Sample Data**: Quick-load sample data to test the application

## Installation

```bash
npm install
```

## Usage

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm preview
```

## How to Use

1. **Input JSON Data**
   - Upload a `.json` file, OR
   - Paste JSON text into the textarea
   - Click "Load Sample Data" to try it out

2. **Select Columns**
   - Check/uncheck the properties you want to include
   - Use "Select All" or "Deselect All" for bulk actions

3. **Export to Excel**
   - Click "Download Excel File"
   - Your file will be saved as `exported_data.xlsx`

## Supported JSON Formats

### Flat Array
```json
[
  {"id": 1, "name": "Alice", "role": "Admin"},
  {"id": 2, "name": "Bob", "role": "User"}
]
```

### Nested Object
```json
{
  "title": "Report",
  "data": [
    {"id": 1, "name": "Alice", "role": "Admin"},
    {"id": 2, "name": "Bob", "role": "User"}
  ]
}
```

The app automatically finds the array in your JSON structure.

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **SheetJS (xlsx)** - Excel file generation
- **JSON5** - Lenient JSON parsing

## License

MIT
