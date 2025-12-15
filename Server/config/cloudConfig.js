// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRECT_KEY,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "Car_rental",
//     allowedFormats: ["png", "jpg", "jpeg"],
//   },
// });

// module.exports = {
//   cloudinary,
//   storage,
// };



const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRECT,
});

// Storage for car images
const carImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Car_rental",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

// Storage for user images
const userImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Car_rental_users",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

module.exports = {
  cloudinary,
  carImageStorage,
  userImageStorage,
};
