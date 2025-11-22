/**
 * Recursively searches for the first array in a JSON object.
 * If the input is already an array, returns it.
 * If it's an object, checks its values.
 * 
 * @param {any} json - The JSON data to search.
 * @returns {Array|null} - The found array or null if none found.
 */
export const findArrayInJson = (json) => {
    if (Array.isArray(json)) {
        return json;
    }

    if (typeof json === 'object' && json !== null) {
        // Prioritize "data" or "items" keys if they exist and are arrays
        const priorityKeys = ['data', 'items', 'results', 'list'];
        for (const key of priorityKeys) {
            if (Array.isArray(json[key])) {
                return json[key];
            }
        }

        // Otherwise, look for the first property that is an array
        for (const key in json) {
            if (Array.isArray(json[key])) {
                return json[key];
            }
        }

        // If no direct array property, we could potentially recurse, 
        // but for this specific requirement (finding "the" data), 
        // usually it's one level deep or the root. 
        // Let's stick to one level deep for now to avoid finding irrelevant deep arrays.
    }

    return null;
};
