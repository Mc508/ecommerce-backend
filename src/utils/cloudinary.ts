import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import dotenv from "dotenv";
dotenv.config();

const cname:string =  process.env.CLOUDINARY_CLOUD_NAME || ""
const key:string =  process.env.CLOUDINARY_API_KEY || ""
const secret:string =  process.env.CLOUDINARY_SECRET_KEY || ""

cloudinary.config({
	cloud_name: cname,
	api_key: key,
	api_secret: secret
});

//

const uploadOnCloudinary = async (localFilePath:string) => {
	try {
		if (!localFilePath) return console.log("nothing");

		//upload the file in cloudinary

		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: "auto",
		});
		//file hass veen uploaded
		console.log("file uploaded", response.url);
		fs.unlinkSync(localFilePath); // remove the locaaly saved temporary file if operation failed
		return response;
	} catch (error) {
		fs.unlinkSync(localFilePath); // remove the locaaly saved temporary file if operation failed
		return console.log("error");
	}
};


export default uploadOnCloudinary;
