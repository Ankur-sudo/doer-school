/**
 * Function to create a FormData object from an object with key-value pairs,
 * including handling file objects from Ant Design's Upload component and nested JSON objects.
 * @param data - The object containing key-value pairs (including file objects and JSON-encoded strings).
 * @returns FormData instance with appended key-value pairs.
 */
const makeFormData = (
  data: { [key: string]: any },
  isEdit?: boolean
): FormData => {
  const formData = new FormData();

  // Loop through the object keys and append each key-value pair to the FormData
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (value) {
        // Check if the value is an array (e.g., for file uploads or other list data)
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            // Handle files in Ant Design's Upload component format
            if (item?.originFileObj) {
              formData.append(key, item.originFileObj);
            } else {
              // If it's a non-file array, append each item as a new entry
              formData.append(key + `[${index}]`, item);
            }
          });
        } else if (typeof value === "object" && !(value instanceof File)) {
          // For nested objects, JSON-stringify and append
          formData.append(key, JSON.stringify(value));
        } else {
          // Append other non-file fields (including JSON-encoded strings)
          formData.append(key, value);
        }
      } else {
        // Skip adding the key if isEdit is false
        if (!isEdit) continue;
        // Append an empty string as a placeholder for null values
        formData.append(key, "");
      }
    }
  }

  return formData;
};

export default makeFormData;
