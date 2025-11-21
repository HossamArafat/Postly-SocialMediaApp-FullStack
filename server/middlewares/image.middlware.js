import { upload } from "../configs/multer.js";

// upload to disk
const uploadImage = (req, res, next) => {
  let uploader
  const route = req.originalUrl.split("/")[2]

  switch(route) {
    case 'user':
      uploader = upload.fields([{ name: "profile", maxCount: 1 }, { name: "cover", maxCount: 1 }]); break;
    case 'post':
      uploader = upload.array("images", 4); break;
    case 'story':
      uploader = upload.single("media"); break;
    case 'message':
      uploader = upload.single("image"); break;
    default:
      console.log("Unknown route")
  }

  uploader(req, res, (err) => {  // Parameters passed to uploader to be handled inside the composite function
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

export default uploadImage;
