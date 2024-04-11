const upload_preset = process.env.UPLOAD_PRESET;
const cloud_name = process.env.CLOUD_NAME;
const api_url = process.env.API_URL;

export const uploadImageToCloudinary = async (file) => {
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
