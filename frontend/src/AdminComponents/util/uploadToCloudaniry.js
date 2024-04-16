const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const api_url = process.env.REACT_APP_API_URL;

export const uploadImageToCloudinary = async (file) => {
  console.log("presets: ", upload_preset, cloud_name, api_url);
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", upload_preset);
  data.append("cloud_name", cloud_name);

  const response = await fetch(api_url, {
    method: "POST",
    body: data,
  });

  const fileData = await response.json();
  return fileData.url;
};
