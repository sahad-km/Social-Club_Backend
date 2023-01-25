const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name: 'dupfwiwnp',
    api_key: 617818738813738,
    api_secret: '9cOLkBh6MXB14RxWqG6OPIithtw'
});
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Admin-User',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
})
module.exports = {
    cloudinary, storage
}
