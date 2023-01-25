const express = require("express");
const router = express.Router();
const detailsModel = require('../models/user/userModel');
const multer = require('multer');
const { storage } = require('../cloudinary/cloudinary');
const upload = multer({ storage });


router.post(('/insertproduct'),upload.array('image'), async function (req,res){
  console.log(email);
  const userDetails = await user.findOne({email:req.body.email});
  const img = req.files.map(f => ({url:f.path,filename:f.filename}))
  userDetails.image.unshift(...img)
  await userDetails.save();
} );

router.post("/fileupload", upload.single("image"), function (req, res, next) {
  console.log(req.file);
  const filename = req.file.filename;
  res.json({
    message: "Image Uploaded Successfully",
    filename: filename,
  });
});

module.exports = router;
