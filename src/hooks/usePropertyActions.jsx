import propertyAxios from "../api/propertyAxios";

export const unlistProperty = async (id) => {
  await propertyAxios.post(`/properties/${id}/unlist`);
};

export const listProperty = async (id) => {
  const data = await propertyAxios.post(`/properties/${id}/list`);
  return data?.data?.message;
};

export const updateProperty = async (id, formDataToSend) => {
  // Renamed 'data' to 'formDataToSend' for clarity
  // Remove the creation of a new FormData object here.
  // The 'formDataToSend' argument *is* the FormData object you want to send.

  // This console.log should now show the correct data because it's iterating the passed formDataToSend
  for (let [key, value] of formDataToSend.entries()) {
    console.log(`${key}:`, value);
  }

  await propertyAxios.put(`/properties/${id}`, formDataToSend, {
    // Use formDataToSend directly
    headers: {
      "Content-Type": "multipart/form-data", // This is still important
    },
  });
};
