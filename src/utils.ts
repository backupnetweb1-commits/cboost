import axios from "axios";

/**
 * Uploads one or more files (image/video) to Cloudinary
 * @param {File[]} files - Array of File objects from input
 * @param {string} cloudName - Your Cloudinary cloud name
 * @param {string} uploadPreset - Unsigned upload preset name
 * @returns {Promise<string[]>} - List of uploaded file URLs
 */
interface UploadToCloudinaryParams {
    files: File[];
    cloudName: string;
    uploadPreset: string;
}

interface CloudinaryUploadResponse {
    secure_url: string;
    [key: string]: any;
}
// cloudName: dzfqiaf3v
// uploadPreset: investboost
// API_KEY: 724494275782599
// API_SECRET: gBeiAdYTjJsd-WPEqv2yOFt7im4
// E:CLOUDINARY_URL=cloudinary://724494275782599:gBeiAdYTjJsd-WPEqv2yOFt7im4@dzfqiaf3v
// preset:crypto-boost

export const uploadToCloudinary = async (
    files: UploadToCloudinaryParams["files"],
    cloudName: UploadToCloudinaryParams["cloudName"],
    uploadPreset: UploadToCloudinaryParams["uploadPreset"]
): Promise<string[]> => {
    const uploaders: Promise<{ data: CloudinaryUploadResponse }>[] = [];
    console.log("Starting Cloudinary upload...");
    if (!files || files.length === 0) {
        throw new Error("No files provided for upload");
    } 

    for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const resourceType = file.type.startsWith("video") ? "video" : "image";

        const uploader = axios.post<CloudinaryUploadResponse>(
            `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
            formData
        );
        console.log(`Uploading ${file.name} to Cloudinary...`);
        uploaders.push(uploader);
    }

    try {
        const responses = await Promise.all(uploaders);
        console.log("All files uploaded successfully");
        return responses.map((res) => res.data.secure_url);
    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        throw error;
    }
};