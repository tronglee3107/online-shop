import {v2 as cloudinary} from 'cloudinary';

const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
        console.log("Cloudinary connected!!!")
    } catch (error) {
        console.error("Error while connecting cloudinary:: ", error)
    }
}

export default connectCloudinary;