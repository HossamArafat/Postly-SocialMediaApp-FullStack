import imageKit from "../configs/imageKit.js"
import fs from "fs"

// upload to image kit
const uploadImg = async (img, folderName) => {
    const buffer = fs.readFileSync(img.path) //buffer from multer
    const response = await imageKit.upload({
        file: buffer,
        fileName: img.originalname,
        folder: folderName
    })
    console.log(response)

    if(!img.mimetype.startsWith("image")) return response.url // video

    const url = imageKit.url({   // processing image after uploading
        path: response.filePath,
        transformation: [
            {quality: "auto"},
            {format: "webp"},
            {width: "1280"}
        ]
    })
    return url
}

export default uploadImg