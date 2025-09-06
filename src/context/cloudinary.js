const uploadOnCloudinary = async (file) => {
    if (!file) throw new Error("No file provided");
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Unsigned"); // your preset
    formData.append("folder", "assets"); // optional folder
  
    const res = await fetch("https://api.cloudinary.com/v1_1/dcmzv0c7l/image/upload", {
      method: "POST",
      body: formData,
    });
  
    const data = await res.json();
    if (!data.secure_url) throw new Error("Upload failed");
    
    return data.secure_url; // This is your public URL
  };
  
export { uploadOnCloudinary };